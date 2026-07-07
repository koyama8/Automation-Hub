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
      deletedCoupons,
      deletedCouponUsages,
      deletedEvidences,
      deletedUsers,
      deletedTokens,
    ] = await Promise.all([
      transaction.client.count(),
      transaction.contract.count(),
      transaction.cart.count(),
      transaction.order.count(),
      transaction.payment.count(),
      transaction.product.count(),
      transaction.coupon.count(),
      transaction.couponUsage.count(),
      transaction.evidence.count(),
      transaction.user.count(),
      transaction.passwordResetToken.count(),
    ])

    await transaction.$executeRawUnsafe(
      'TRUNCATE TABLE "PasswordResetToken", "Evidence", "CouponUsage", "Payment", "OrderItem", "Order", "CartItem", "Cart", "Contract", "Coupon", "Product", "Client", "User" RESTART IDENTITY CASCADE',
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
      deletedCoupons,
      deletedCouponUsages,
      deletedEvidences,
      deletedUsers,
      deletedTokens,
      admin,
      nextClientId: 1,
      nextCouponId: 1,
      nextEvidenceId: 1,
      nextUserId: 2,
    }
  })
}
