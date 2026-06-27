import { prisma } from '../lib/prisma.js'
import { publicUserSelect } from './users.repository.js'

export function resetLabData(adminData) {
  return prisma.$transaction(async (transaction) => {
    const [
      deletedClients,
      deletedContracts,
      deletedCarts,
      deletedOrders,
      deletedPayments,
      deletedProducts,
      deletedUsers,
      deletedTokens,
    ] = await Promise.all([
      transaction.client.count(),
      transaction.contract.count(),
      transaction.cart.count(),
      transaction.order.count(),
      transaction.payment.count(),
      transaction.product.count(),
      transaction.user.count(),
      transaction.passwordResetToken.count(),
    ])

    await transaction.$executeRawUnsafe(
      'TRUNCATE TABLE "PasswordResetToken", "Payment", "OrderItem", "Order", "CartItem", "Cart", "Contract", "Product", "Client", "User" RESTART IDENTITY CASCADE',
    )

    const admin = await transaction.user.create({
      data: adminData,
      select: publicUserSelect,
    })

    return {
      deletedClients,
      deletedContracts,
      deletedCarts,
      deletedOrders,
      deletedPayments,
      deletedProducts,
      deletedUsers,
      deletedTokens,
      admin,
      nextClientId: 1,
      nextUserId: 2,
    }
  })
}
