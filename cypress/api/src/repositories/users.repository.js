import { prisma } from '../lib/prisma.js'

export function createUser(data) {
  return prisma.user.create({ data })
}

export function listUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { id: 'asc' },
  })
}

export function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } })
}

export function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      active: true,
      updatedAt: true,
    },
  })
}

export function deleteUser(id) {
  return prisma.user.delete({ where: { id } })
}

export async function deleteAllUsers() {
  const users = await prisma.user.count()
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "PasswordResetToken", "FormSubmission", "User" RESTART IDENTITY CASCADE')
  return users
}
