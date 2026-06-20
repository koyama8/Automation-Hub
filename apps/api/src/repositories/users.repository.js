import { prisma } from '../lib/prisma.js'

export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  active: true,
  createdAt: true,
  updatedAt: true,
}

export function createUser(data) {
  return prisma.user.create({ data, select: publicUserSelect })
}

export function listUsers({ search, active } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (typeof active === 'boolean') {
    where.active = active
  }

  return prisma.user.findMany({
    where,
    select: publicUserSelect,
    orderBy: { id: 'asc' },
  })
}

export function findUserById(id) {
  return prisma.user.findUnique({ where: { id }, select: publicUserSelect })
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } })
}

export function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: publicUserSelect,
  })
}

export function updateUserPassword(id, password) {
  return prisma.user.update({
    where: { id },
    data: { password },
    select: publicUserSelect,
  })
}

export function deleteUser(id) {
  return prisma.user.delete({
    where: { id },
    select: publicUserSelect,
  })
}

export function resetUsers(adminData) {
  return prisma.$transaction(async (transaction) => {
    const deletedUsers = await transaction.user.count()
    const deletedTokens = await transaction.passwordResetToken.count()

    await transaction.$executeRawUnsafe('TRUNCATE TABLE "PasswordResetToken", "User" RESTART IDENTITY CASCADE')

    const admin = await transaction.user.create({
      data: adminData,
      select: publicUserSelect,
    })

    return {
      deletedUsers,
      deletedTokens,
      admin,
      nextUserId: 2,
    }
  })
}
