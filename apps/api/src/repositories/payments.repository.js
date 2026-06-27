import { prisma } from '../lib/prisma.js'

const paymentInclude = {
  order: {
    include: {
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
    },
  },
}

export function createPayment(data) {
  return prisma.payment.create({ data, include: paymentInclude })
}

export function listPayments({ status, method, orderId } = {}) {
  const where = {}

  if (status) where.status = status
  if (method) where.method = method
  if (orderId) where.orderId = orderId

  return prisma.payment.findMany({ where, include: paymentInclude, orderBy: { id: 'asc' } })
}

export function findPaymentById(id) {
  return prisma.payment.findUnique({ where: { id }, include: paymentInclude })
}

export function updatePayment(id, data) {
  return prisma.payment.update({ where: { id }, data, include: paymentInclude })
}

export function approvePayment(id) {
  return prisma.$transaction(async (transaction) => {
    const payment = await transaction.payment.update({
      where: { id },
      data: {
        status: 'approved',
        paidAt: new Date(),
      },
    })

    await transaction.order.update({
      where: { id: payment.orderId },
      data: { status: 'paid' },
    })

    return transaction.payment.findUnique({ where: { id }, include: paymentInclude })
  })
}

export function refundPayment(id) {
  return prisma.$transaction(async (transaction) => {
    const payment = await transaction.payment.update({
      where: { id },
      data: {
        status: 'refunded',
        refundedAt: new Date(),
      },
    })

    await transaction.order.update({
      where: { id: payment.orderId },
      data: { status: 'canceled' },
    })

    return transaction.payment.findUnique({ where: { id }, include: paymentInclude })
  })
}
