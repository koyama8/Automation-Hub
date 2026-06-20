import { prisma } from '../lib/prisma.js'

export async function replacePendingToken(userId, token, expiresAt) {
  await prisma.passwordResetToken.deleteMany({
    where: { userId, usedAt: null },
  })

  return prisma.passwordResetToken.create({
    data: { userId, token, expiresAt },
  })
}

export function findToken(token) {
  return prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  })
}

export function consumeToken(tokenId, userId, password) {
  return prisma.$transaction([
    prisma.user.update({ where: { id: userId }, data: { password } }),
    prisma.passwordResetToken.update({ where: { id: tokenId }, data: { usedAt: new Date() } }),
  ])
}
