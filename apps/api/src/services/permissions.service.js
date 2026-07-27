import { env } from '../config/env.js'
import * as permissionsRepository from '../repositories/permissions.repository.js'
import { AppError } from '../utils/app-error.js'
import { hashPassword } from '../utils/password.js'
import { createOpaqueToken, hashPayload, hashSecurityToken } from '../utils/security-token.js'
import { parsePositiveId, requireEmail, requirePassword, requireText } from '../utils/validation.js'

export const PERMISSION_CATALOG = [
  'users:read',
  'users:manage',
  'profiles:read',
  'profiles:manage',
  'audit:read',
  'clients:read',
  'clients:write',
  'clients:delete',
  'contracts:read',
  'contracts:write',
  'contracts:delete',
  'products:read',
  'products:write',
  'products:delete',
  'cart:read',
  'cart:write',
  'cart:delete',
  'orders:read',
  'orders:write',
  'payments:read',
  'payments:write',
  'coupons:read',
  'coupons:write',
  'coupons:delete',
  'evidences:read',
  'evidences:write',
  'evidences:delete',
  'reports:read',
  'reports:export',
  'system:reset',
]

const VALID_PROFILES = ['admin', 'qa', 'viewer']
const VALID_ACCESS_STATUSES = ['active', 'blocked']
const USER_SORT_FIELDS = ['id', 'name', 'email', 'role', 'status', 'createdAt', 'updatedAt']
const AUDIT_ACTIONS = [
  'USER_CREATED',
  'PROFILE_CHANGED',
  'USER_BLOCKED',
  'USER_UNBLOCKED',
  'USER_DELETED',
  'SESSIONS_REVOKED',
  'PERMISSION_DENIED',
  'PROFILE_PERMISSIONS_CHANGED',
  'INVITATION_ACCEPTED',
  'INVITATION_RESENT',
]

function normalizeProfile(value) {
  const profile = requireText(value, 'Profile is required!').toLowerCase()
  if (!VALID_PROFILES.includes(profile)) {
    throw new AppError(400, `Profile must be one of: ${VALID_PROFILES.join(', ')}!`)
  }
  return profile
}

function normalizeReason(value) {
  const reason = requireText(value, 'Administrative reason is required!')
  if (reason.length < 5 || reason.length > 240) {
    throw new AppError(400, 'Administrative reason must contain between 5 and 240 characters!')
  }
  return reason
}

function parseInteger(value, fallback, field, minimum, maximum) {
  if (value === undefined || value === '') return fallback
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new AppError(400, `${field} must be an integer between ${minimum} and ${maximum}!`)
  }
  return parsed
}

function parseVersion(value) {
  return parseInteger(value, undefined, 'version', 1, 1000000)
}

function parseDate(value, field, endOfDay = false) {
  if (!value) return undefined
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new AppError(400, `${field} must use YYYY-MM-DD format!`)
  }
  const date = new Date(`${value}${endOfDay ? 'T23:59:59.999Z' : 'T00:00:00.000Z'}`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new AppError(400, `${field} must be a valid date!`)
  }
  return date
}

function normalizeSortOrder(value = 'asc') {
  const sortOrder = String(value).toLowerCase()
  if (!['asc', 'desc'].includes(sortOrder)) {
    throw new AppError(400, 'sortOrder must be asc or desc!')
  }
  return sortOrder
}

function toProfile(profile) {
  return {
    id: profile.id,
    name: profile.name,
    description: profile.description,
    version: profile.version,
    permissions: profile.permissions.map((item) => item.permission),
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  }
}

function toManagedUser(user) {
  if (!user) return null
  return {
    ...user,
    profile: user.role === 'user' ? 'viewer' : user.role,
  }
}

async function ensureProfileExists(profile) {
  const result = await permissionsRepository.findProfileByName(profile)
  if (!result) throw new AppError(404, 'Access profile not found!')
  return result
}

async function protectLastAdministrator(user, nextProfileOrStatus) {
  if (user.role !== 'admin' || user.status !== 'active') return
  const remainsActiveAdmin = nextProfileOrStatus === 'admin' || nextProfileOrStatus === 'active'
  if (remainsActiveAdmin) return
  const activeAdministrators = await permissionsRepository.countActiveAdministrators()
  if (activeAdministrators <= 1) {
    throw new AppError(409, 'The last active administrator cannot be changed or blocked!')
  }
}

function resolveVersion(bodyVersion, headerVersion) {
  const header = typeof headerVersion === 'string' ? headerVersion.replace(/^W\//, '').replace(/"/g, '') : headerVersion
  return parseVersion(bodyVersion ?? header)
}

function handleMutationOutcome(result) {
  if (result?.outcome === 'not_found') throw new AppError(404, 'Managed user not found!')
  if (result?.outcome === 'version_conflict') {
    throw new AppError(409, `User version conflict! Current version is ${result.current.version}.`)
  }
  return result
}

export async function getProfiles() {
  return (await permissionsRepository.listProfiles()).map(toProfile)
}

export async function getProfile(rawProfile) {
  const profile = normalizeProfile(rawProfile)
  return toProfile(await ensureProfileExists(profile))
}

export function getPermissionCatalog() {
  return {
    profiles: VALID_PROFILES,
    permissions: PERMISSION_CATALOG,
    auditActions: AUDIT_ACTIONS,
  }
}

export async function editProfilePermissions(rawProfile, payload, auth) {
  const profile = normalizeProfile(rawProfile)
  const current = await ensureProfileExists(profile)
  const reason = normalizeReason(payload.reason)
  const version = parseVersion(payload.version)
  const permissions = Array.isArray(payload.permissions) ? [...new Set(payload.permissions)] : null

  if (!permissions?.length) throw new AppError(400, 'At least one permission is required!')
  const invalid = permissions.filter((permission) => permission !== '*' && !PERMISSION_CATALOG.includes(permission))
  if (invalid.length) throw new AppError(400, `Unknown permissions: ${invalid.join(', ')}!`)
  if (profile === 'admin' && !permissions.includes('*')) {
    throw new AppError(409, 'Administrator profile must retain full access!')
  }
  if (profile !== 'admin' && permissions.includes('*')) {
    throw new AppError(409, 'Wildcard permission is reserved for the administrator profile!')
  }

  const updated = await permissionsRepository.updateProfilePermissions({
    name: profile,
    version,
    permissions,
    audit: {
      actorId: auth.userId,
      action: 'PROFILE_PERMISSIONS_CHANGED',
      reason,
      before: { profile, version: current.version, permissions: current.permissions.map((item) => item.permission) },
      after: { profile, version: version + 1, permissions },
    },
  })
  if (!updated) throw new AppError(409, `Profile version conflict! Current version is ${current.version}.`)
  return toProfile(updated)
}

export async function getManagedUsers(query = {}) {
  const page = parseInteger(query.page, 1, 'page', 1, 1000000)
  const limit = parseInteger(query.limit, 10, 'limit', 1, 100)
  const profile = query.profile ? normalizeProfile(query.profile) : ''
  const status = typeof query.status === 'string' ? query.status.trim().toLowerCase() : ''
  if (status && !['invited', 'active', 'blocked'].includes(status)) {
    throw new AppError(400, 'status must be one of: invited, active, blocked!')
  }
  const sortBy = query.sortBy || 'id'
  if (!USER_SORT_FIELDS.includes(sortBy)) {
    throw new AppError(400, `sortBy must be one of: ${USER_SORT_FIELDS.join(', ')}!`)
  }
  const sortOrder = normalizeSortOrder(query.sortOrder)
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const where = {
    deletedAt: null,
    ...(profile ? { role: profile } : {}),
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {}),
  }

  const result = await permissionsRepository.listManagedUsers({
    where,
    orderBy: { [sortBy === 'profile' ? 'role' : sortBy]: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    data: result.data.map(toManagedUser),
    summary: result.summary,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
    filters: {
      search: search || null,
      profile: profile || null,
      status: status || null,
      sortBy,
      sortOrder,
    },
  }
}

export async function getManagedUser(rawId) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  const user = await permissionsRepository.findManagedUserById(id)
  if (!user) throw new AppError(404, 'Managed user not found!')
  return toManagedUser(user)
}

export async function createManagedUser(payload, auth, idempotencyKey) {
  const profile = normalizeProfile(payload.profile)
  await ensureProfileExists(profile)
  const reason = normalizeReason(payload.reason)
  const status = String(payload.status || 'active').toLowerCase()
  if (!['active', 'invited'].includes(status)) {
    throw new AppError(400, 'New user status must be active or invited!')
  }

  const email = requireEmail(payload.email)
  if (idempotencyKey !== undefined) {
    const normalizedKey = requireText(idempotencyKey, 'Idempotency-Key cannot be empty!')
    if (normalizedKey.length > 120) {
      throw new AppError(400, 'Idempotency-Key must contain at most 120 characters!')
    }
    idempotencyKey = normalizedKey
  }
  const requestSnapshot = {
    name: payload.name,
    email,
    profile,
    status,
    reason,
    password: payload.password || null,
  }
  const requestHash = hashPayload(requestSnapshot)

  if (idempotencyKey) {
    const existing = await permissionsRepository.findIdempotencyRecord(idempotencyKey)
    if (existing && existing.expiresAt > new Date()) {
      if (existing.requestHash !== requestHash) {
        throw new AppError(409, 'Idempotency key was already used with a different payload!')
      }
      return { ...existing.response, idempotentReplay: true }
    }
  }

  const invitationToken = status === 'invited' ? createOpaqueToken() : null
  const password = status === 'active' ? requirePassword(payload.password) : createOpaqueToken()
  const user = await permissionsRepository.createManagedUser({
    userData: {
      name: requireText(payload.name, 'Name is required!'),
      email,
      password: await hashPassword(password),
      role: profile,
      status,
      active: status === 'active',
    },
    invitation: invitationToken
      ? {
          tokenHash: hashSecurityToken(invitationToken),
          expiresAt: new Date(Date.now() + env.invitationTokenHours * 60 * 60 * 1000),
        }
      : null,
    audit: {
      actorId: auth.userId,
      action: 'USER_CREATED',
      reason,
      after: { email, profile, status },
    },
  })

  const response = {
    data: toManagedUser(user),
    ...(invitationToken ? { invitation: { token: invitationToken, expiresInHours: env.invitationTokenHours } } : {}),
    idempotentReplay: false,
  }

  if (idempotencyKey) {
    await permissionsRepository.createIdempotencyRecord({
      key: idempotencyKey,
      requestHash,
      statusCode: 201,
      response,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })
  }
  return response
}

export async function changeManagedUserProfile(rawId, payload, auth, headerVersion) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  if (id === auth.userId) throw new AppError(409, 'Administrators cannot change their own profile!')
  const user = await getManagedUser(id)
  const profile = normalizeProfile(payload.profile)
  await ensureProfileExists(profile)
  await protectLastAdministrator(user, profile)
  const version = resolveVersion(payload.version, headerVersion)
  const result = handleMutationOutcome(
    await permissionsRepository.updateManagedUserProfile({
      id,
      version,
      profile,
      audit: {
        actorId: auth.userId,
        action: 'PROFILE_CHANGED',
        reason,
      },
    }),
  )
  return toManagedUser(result.user)
}

export async function changeManagedUserAccess(rawId, payload, auth, headerVersion) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  if (id === auth.userId) throw new AppError(409, 'Administrators cannot block their own account!')
  const user = await getManagedUser(id)
  const status = requireText(payload.status, 'Access status is required!').toLowerCase()
  if (!VALID_ACCESS_STATUSES.includes(status)) {
    throw new AppError(400, `Access status must be one of: ${VALID_ACCESS_STATUSES.join(', ')}!`)
  }
  await protectLastAdministrator(user, status)
  const version = resolveVersion(payload.version, headerVersion)
  const reason = normalizeReason(payload.reason)
  const result = handleMutationOutcome(
    await permissionsRepository.updateManagedUserAccess({
      id,
      version,
      status,
      active: status === 'active',
      audit: {
        actorId: auth.userId,
        action: status === 'blocked' ? 'USER_BLOCKED' : 'USER_UNBLOCKED',
        reason,
      },
    }),
  )
  return toManagedUser(result.user)
}

export async function deleteManagedUser(rawId, payload, auth, headerVersion) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  if (id === auth.userId) throw new AppError(409, 'Administrators cannot delete their own account!')
  const user = await getManagedUser(id)
  await protectLastAdministrator(user, 'deleted')
  const version = resolveVersion(payload.version, headerVersion)
  const reason = normalizeReason(payload.reason)
  const result = handleMutationOutcome(
    await permissionsRepository.softDeleteManagedUser({
      id,
      version,
      audit: {
        actorId: auth.userId,
        action: 'USER_DELETED',
        reason,
      },
    }),
  )
  return toManagedUser(result.user)
}

export async function revokeManagedUserSessions(rawId, payload, auth) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  const reason = normalizeReason(payload.reason)
  const result = await permissionsRepository.revokeManagedUserSessions({
    id,
    actorId: auth.userId,
    reason,
  })
  if (!result) throw new AppError(404, 'Managed user not found!')
  return {
    user: toManagedUser(result.user),
    revokedSessions: result.revokedSessions,
  }
}

export async function getEffectivePermissions(rawId) {
  const user = await getManagedUser(rawId)
  const profileName = user.profile
  const profile = await ensureProfileExists(profileName)
  return {
    userId: user.id,
    profile: profileName,
    status: user.status,
    profileVersion: profile.version,
    permissions: profile.permissions.map((item) => item.permission),
  }
}

export async function getPermissionsForRole(role) {
  const profileName = role === 'user' ? 'viewer' : role
  const profile = await permissionsRepository.findProfileByName(profileName)
  return profile ? profile.permissions.map((item) => item.permission) : []
}

export async function registerPermissionDenied({ actorId, permission, method, path }) {
  return permissionsRepository.createAudit({
    actorId,
    action: 'PERMISSION_DENIED',
    reason: `Missing permission: ${permission}`,
    metadata: { permission, method, path },
  })
}

export async function getAudit(query = {}) {
  const page = parseInteger(query.page, 1, 'page', 1, 1000000)
  const limit = parseInteger(query.limit, 10, 'limit', 1, 100)
  const sortOrder = normalizeSortOrder(query.sortOrder || 'desc')
  const actorId = query.actorId ? parsePositiveId(query.actorId, 'Invalid actor id!') : undefined
  const targetUserId = query.targetUserId ? parsePositiveId(query.targetUserId, 'Invalid target user id!') : undefined
  const action = typeof query.action === 'string' ? query.action.trim().toUpperCase() : ''
  if (action && !AUDIT_ACTIONS.includes(action)) {
    throw new AppError(400, `action must be one of: ${AUDIT_ACTIONS.join(', ')}!`)
  }
  const startDate = parseDate(query.startDate, 'startDate')
  const endDate = parseDate(query.endDate, 'endDate', true)
  if (startDate && endDate && startDate > endDate) {
    throw new AppError(400, 'startDate must be before or equal to endDate!')
  }
  const where = {
    ...(actorId ? { actorId } : {}),
    ...(targetUserId ? { targetUserId } : {}),
    ...(action ? { action } : {}),
    ...(startDate || endDate
      ? {
          createdAt: {
            ...(startDate ? { gte: startDate } : {}),
            ...(endDate ? { lte: endDate } : {}),
          },
        }
      : {}),
  }
  const result = await permissionsRepository.listAudit({
    where,
    orderBy: { createdAt: sortOrder },
    skip: (page - 1) * limit,
    take: limit,
  })
  return {
    data: result.data,
    pagination: {
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    },
  }
}

export async function getAuditEvent(rawId) {
  const id = parsePositiveId(rawId, 'Invalid audit event id!')
  const event = await permissionsRepository.findAuditById(id)
  if (!event) throw new AppError(404, 'Audit event not found!')
  return event
}

export async function acceptInvitation(rawToken, payload) {
  const token = requireText(rawToken, 'Invitation token is required!')
  const invitation = await permissionsRepository.findInvitationByTokenHash(hashSecurityToken(token))
  if (!invitation || invitation.acceptedAt || invitation.expiresAt <= new Date()) {
    throw new AppError(400, 'Invitation token is invalid or expired!')
  }
  if (invitation.user.status !== 'invited') {
    throw new AppError(409, 'User is not waiting for invitation acceptance!')
  }
  const password = await hashPassword(requirePassword(payload.password))
  return toManagedUser(
    await permissionsRepository.acceptInvitation({
      invitationId: invitation.id,
      userId: invitation.userId,
      password,
    }),
  )
}

export async function resendInvitation(rawId, payload, auth) {
  const id = parsePositiveId(rawId, 'Invalid managed user id!')
  const user = await getManagedUser(id)
  if (user.status !== 'invited') throw new AppError(409, 'Only invited users can receive a new invitation!')
  const reason = normalizeReason(payload.reason)
  const token = createOpaqueToken()
  await permissionsRepository.replaceInvitation({
    userId: id,
    tokenHash: hashSecurityToken(token),
    expiresAt: new Date(Date.now() + env.invitationTokenHours * 60 * 60 * 1000),
    actorId: auth.userId,
    reason,
  })
  return {
    user,
    invitation: {
      token,
      expiresInHours: env.invitationTokenHours,
    },
  }
}
