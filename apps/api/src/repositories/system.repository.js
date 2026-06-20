import { prisma } from '../lib/prisma.js'
import { publicUserSelect } from './users.repository.js'

export function resetLabData(adminData) {
  return prisma.$transaction(async (transaction) => {
    const [deletedClients, deletedUsers, deletedTokens] = await Promise.all([
      transaction.client.count(),
      transaction.user.count(),
      transaction.passwordResetToken.count(),
    ])

    await transaction.$executeRawUnsafe(
      'TRUNCATE TABLE "PasswordResetToken", "Client", "User" RESTART IDENTITY CASCADE',
    )

    const admin = await transaction.user.create({
      data: adminData,
      select: publicUserSelect,
    })

    return {
      deletedClients,
      deletedUsers,
      deletedTokens,
      admin,
      nextClientId: 1,
      nextUserId: 2,
    }
  })
}
