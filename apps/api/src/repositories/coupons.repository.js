import { prisma } from '../lib/prisma.js'

const couponInclude = {
  _count: {
    select: {
      usages: true,
      orders: true,
    },
  },
}

const orderCouponInclude = {
  client: {
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
    },
  },
  items: {
    orderBy: { id: 'asc' },
  },
  coupon: {
    select: {
      id: true,
      code: true,
      type: true,
      value: true,
      status: true,
    },
  },
}

export function createCoupon(data) {
  return prisma.coupon.create({ data, include: couponInclude })
}

export function listCoupons({ search, status } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { code: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (status) where.status = status

  return prisma.coupon.findMany({ where, include: couponInclude, orderBy: { id: 'asc' } })
}

export function findCouponById(id) {
  return prisma.coupon.findUnique({ where: { id }, include: couponInclude })
}

export function findCouponByCode(code) {
  return prisma.coupon.findUnique({ where: { code }, include: couponInclude })
}

export function updateCoupon(id, data) {
  return prisma.coupon.update({ where: { id }, data, include: couponInclude })
}

export function deleteCoupon(id) {
  return prisma.$transaction(async (transaction) => {
    const coupon = await transaction.coupon.findUnique({ where: { id }, include: couponInclude })

    if (!coupon) return null

    await transaction.$executeRaw`
      UPDATE "Order"
      SET
        "totalCents" = "totalCents" + "discountCents",
        "discountCents" = 0,
        "couponId" = NULL,
        "couponCode" = NULL
      WHERE "couponId" = ${id}
    `
    await transaction.coupon.delete({ where: { id } })

    return coupon
  })
}

export function applyCouponToOrder({ couponId, code, orderId, discountCents, finalTotalCents }) {
  return prisma.$transaction(async (transaction) => {
    await transaction.couponUsage.create({
      data: {
        couponId,
        orderId,
        discountCents,
      },
    })

    await transaction.coupon.update({
      where: { id: couponId },
      data: {
        usedCount: { increment: 1 },
      },
    })

    return transaction.order.update({
      where: { id: orderId },
      data: {
        couponId,
        couponCode: code,
        discountCents,
        totalCents: finalTotalCents,
      },
      include: orderCouponInclude,
    })
  })
}

export function findCouponUsage(couponId, orderId) {
  return prisma.couponUsage.findUnique({
    where: {
      couponId_orderId: {
        couponId,
        orderId,
      },
    },
  })
}

export function deleteAllCoupons() {
  return prisma.$transaction(async (transaction) => {
    const [deletedCoupons, deletedUsages] = await Promise.all([
      transaction.coupon.count(),
      transaction.couponUsage.count(),
    ])

    await transaction.$executeRawUnsafe(
      'UPDATE "Order" SET "totalCents" = "totalCents" + "discountCents", "discountCents" = 0, "couponId" = NULL, "couponCode" = NULL WHERE "couponId" IS NOT NULL',
    )
    await transaction.couponUsage.deleteMany()
    await transaction.coupon.deleteMany()
    await transaction.$executeRawUnsafe('ALTER SEQUENCE "Coupon_id_seq" RESTART WITH 1')
    await transaction.$executeRawUnsafe('ALTER SEQUENCE "CouponUsage_id_seq" RESTART WITH 1')

    return { deletedCoupons, deletedUsages, nextCouponId: 1 }
  })
}
