import { prisma } from '../lib/prisma.js'
import { publicUserSelect } from './users.repository.js'

const auditUserSelect = {
  id: true,
  name: true,
  email: true,
}

export function listProfiles() {
  return prisma.accessProfile.findMany({
    include: {
      permissions: {
        select: { permission: true },
        orderBy: { permission: 'asc' },
      },
    },
    orderBy: { id: 'asc' },
  })
}

export function findProfileByName(name) {
  return prisma.accessProfile.findUnique({
    where: { name },
    include: {
      permissions: {
        select: { permission: true },
        orderBy: { permission: 'asc' },
      },
    },
  })
}

export function updateProfilePermissions({ name, version, permissions, audit }) {
  return prisma.$transaction(async (transaction) => {
    const result = await transaction.accessProfile.updateMany({
      where: { name, version },
      data: { version: { increment: 1 } },
    })
    if (result.count === 0) return null

    const profile = await transaction.accessProfile.findUnique({ where: { name } })
    await transaction.profilePermission.deleteMany({ where: { profileId: profile.id } })
    await transaction.profilePermission.createMany({
      data: permissions.map((permission) => ({ profileId: profile.id, permission })),
    })
    await transaction.permissionAudit.create({ data: audit })

    return transaction.accessProfile.findUnique({
      where: { name },
      include: {
        permissions: {
          select: { permission: true },
          orderBy: { permission: 'asc' },
        },
      },
    })
  })
}

export async function listManagedUsers({ where, orderBy, skip, take }) {
  const [data, total, users, admins, qa, blocked] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: publicUserSelect,
      orderBy,
      skip,
      take,
    }),
    prisma.user.count({ where }),
    prisma.user.count({ where: { deletedAt: null } }),
    prisma.user.count({ where: { deletedAt: null, role: 'admin', status: 'active' } }),
    prisma.user.count({ where: { deletedAt: null, role: 'qa', status: 'active' } }),
    prisma.user.count({ where: { deletedAt: null, status: 'blocked' } }),
  ])

  return {
    data,
    total,
    summary: { users, admins, qa, blocked },
  }
}

export function findManagedUserById(id) {
  return prisma.user.findFirst({
    where: { id, deletedAt: null },
    select: publicUserSelect,
  })
}

export function findManagedUserByEmail(email) {
  return prisma.user.findFirst({
    where: { email, deletedAt: null },
    select: publicUserSelect,
  })
}

export function countActiveAdministrators() {
  return prisma.user.count({
    where: {
      role: 'admin',
      status: 'active',
      active: true,
      deletedAt: null,
    },
  })
}

export function createManagedUser({ userData, audit, invitation }) {
  return prisma.$transaction(async (transaction) => {
    const user = await transaction.user.create({
      data: userData,
      select: publicUserSelect,
    })

    if (invitation) {
      await transaction.userInvitation.create({
        data: {
          ...invitation,
          userId: user.id,
        },
      })
    }

    await transaction.permissionAudit.create({
      data: {
        ...audit,
        targetUserId: user.id,
      },
    })

    return user
  })
}

export function updateManagedUserProfile({ id, version, profile, audit }) {
  return prisma.$transaction(async (transaction) => {
    const before = await transaction.user.findFirst({
      where: { id, deletedAt: null },
      select: publicUserSelect,
    })
    if (!before) return { outcome: 'not_found' }

    const result = await transaction.user.updateMany({
      where: { id, version, deletedAt: null },
      data: {
        role: profile,
        version: { increment: 1 },
        authVersion: { increment: 1 },
      },
    })
    if (result.count === 0) return { outcome: 'version_conflict', current: before }

    await transaction.authSession.updateMany({
      where: { userId: id, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    const user = await transaction.user.findUnique({
      where: { id },
      select: publicUserSelect,
    })
    await transaction.permissionAudit.create({
      data: {
        ...audit,
        targetUserId: id,
        before: { role: before.role, version: before.version },
        after: { role: user.role, version: user.version },
      },
    })

    return { outcome: 'updated', user }
  })
}

export function updateManagedUserAccess({ id, version, status, active, audit }) {
  return prisma.$transaction(async (transaction) => {
    const before = await transaction.user.findFirst({
      where: { id, deletedAt: null },
      select: publicUserSelect,
    })
    if (!before) return { outcome: 'not_found' }

    const result = await transaction.user.updateMany({
      where: { id, version, deletedAt: null },
      data: {
        status,
        active,
        version: { increment: 1 },
        authVersion: { increment: 1 },
      },
    })
    if (result.count === 0) return { outcome: 'version_conflict', current: before }

    await transaction.authSession.updateMany({
      where: { userId: id, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    const user = await transaction.user.findUnique({
      where: { id },
      select: publicUserSelect,
    })
    await transaction.permissionAudit.create({
      data: {
        ...audit,
        targetUserId: id,
        before: { status: before.status, active: before.active, version: before.version },
        after: { status: user.status, active: user.active, version: user.version },
      },
    })

    return { outcome: 'updated', user }
  })
}

export function softDeleteManagedUser({ id, version, audit }) {
  return prisma.$transaction(async (transaction) => {
    const before = await transaction.user.findFirst({
      where: { id, deletedAt: null },
      select: publicUserSelect,
    })
    if (!before) return { outcome: 'not_found' }

    const result = await transaction.user.updateMany({
      where: { id, version, deletedAt: null },
      data: {
        status: 'deleted',
        active: false,
        deletedAt: new Date(),
        version: { increment: 1 },
        authVersion: { increment: 1 },
      },
    })
    if (result.count === 0) return { outcome: 'version_conflict', current: before }

    await transaction.authSession.updateMany({
      where: { userId: id, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    const user = await transaction.user.findUnique({
      where: { id },
      select: publicUserSelect,
    })
    await transaction.permissionAudit.create({
      data: {
        ...audit,
        targetUserId: id,
        before: { status: before.status, deletedAt: before.deletedAt, version: before.version },
        after: { status: user.status, deletedAt: user.deletedAt, version: user.version },
      },
    })

    return { outcome: 'deleted', user }
  })
}

export function hardDeleteAllManagedUsers({ actorId, reason }) {
  return prisma.$transaction(async (transaction) => {
    const users = await transaction.user.findMany({
      where: {
        role: { not: 'admin' },
      },
      select: { id: true },
      orderBy: { id: 'asc' },
    })
    const userIds = users.map((user) => user.id)
    const deleted = await transaction.user.deleteMany({
      where: { role: { not: 'admin' } },
    })
    const deletedIdempotencyRecords = await transaction.idempotencyRecord.deleteMany()
    const highestUser = await transaction.user.aggregate({
      _max: { id: true },
    })
    const highestUserId = highestUser._max.id || 1
    await transaction.$queryRaw`
      SELECT setval(pg_get_serial_sequence('"User"', 'id'), ${highestUserId}, true)
    `
    await transaction.permissionAudit.create({
      data: {
        actorId,
        action: 'USERS_BULK_DELETED',
        reason,
        metadata: {
          deletedCount: deleted.count,
          deletedUserIds: userIds,
          preservedAdministrators: true,
          deletedIdempotencyRecords: deletedIdempotencyRecords.count,
          nextUserId: highestUserId + 1,
        },
      },
    })

    return {
      deletedCount: deleted.count,
      deletedUserIds: userIds,
      preservedAdministrators: true,
      deletedIdempotencyRecords: deletedIdempotencyRecords.count,
      nextUserId: highestUserId + 1,
    }
  })
}

export function revokeManagedUserSessions({ id, actorId, reason }) {
  return prisma.$transaction(async (transaction) => {
    const user = await transaction.user.findFirst({
      where: { id, deletedAt: null },
      select: publicUserSelect,
    })
    if (!user) return null

    const revoked = await transaction.authSession.updateMany({
      where: { userId: id, revokedAt: null },
      data: { revokedAt: new Date() },
    })
    const updated = await transaction.user.update({
      where: { id },
      data: {
        authVersion: { increment: 1 },
        version: { increment: 1 },
      },
      select: publicUserSelect,
    })
    await transaction.permissionAudit.create({
      data: {
        actorId,
        targetUserId: id,
        action: 'SESSIONS_REVOKED',
        reason,
        metadata: { revokedSessions: revoked.count },
      },
    })

    return { user: updated, revokedSessions: revoked.count }
  })
}

export function findIdempotencyRecord(key) {
  return prisma.idempotencyRecord.findUnique({ where: { key } })
}

export function createIdempotencyRecord(data) {
  return prisma.idempotencyRecord.create({ data })
}

export function createAudit(data) {
  return prisma.permissionAudit.create({ data })
}

export async function listAudit({ where, orderBy, skip, take }) {
  const [data, total] = await prisma.$transaction([
    prisma.permissionAudit.findMany({
      where,
      include: {
        actor: { select: auditUserSelect },
        targetUser: { select: auditUserSelect },
      },
      orderBy,
      skip,
      take,
    }),
    prisma.permissionAudit.count({ where }),
  ])
  return { data, total }
}

export function findAuditById(id) {
  return prisma.permissionAudit.findUnique({
    where: { id },
    include: {
      actor: { select: auditUserSelect },
      targetUser: { select: auditUserSelect },
    },
  })
}

export async function clearAudit() {
  const result = await prisma.permissionAudit.deleteMany()
  return result.count
}

export function findInvitationByTokenHash(tokenHash) {
  return prisma.userInvitation.findUnique({
    where: { tokenHash },
    include: { user: true },
  })
}

export function acceptInvitation({ invitationId, userId, password }) {
  return prisma.$transaction(async (transaction) => {
    await transaction.userInvitation.update({
      where: { id: invitationId },
      data: { acceptedAt: new Date() },
    })
    const user = await transaction.user.update({
      where: { id: userId },
      data: {
        password,
        status: 'active',
        active: true,
        version: { increment: 1 },
        authVersion: { increment: 1 },
      },
      select: publicUserSelect,
    })
    await transaction.permissionAudit.create({
      data: {
        targetUserId: userId,
        action: 'INVITATION_ACCEPTED',
        reason: 'Invitation accepted by user',
      },
    })
    return user
  })
}

export function replaceInvitation({ userId, tokenHash, expiresAt, actorId, reason }) {
  return prisma.$transaction(async (transaction) => {
    await transaction.userInvitation.deleteMany({
      where: { userId, acceptedAt: null },
    })
    const invitation = await transaction.userInvitation.create({
      data: { userId, tokenHash, expiresAt },
    })
    await transaction.permissionAudit.create({
      data: {
        actorId,
        targetUserId: userId,
        action: 'INVITATION_RESENT',
        reason,
      },
    })
    return invitation
  })
}
