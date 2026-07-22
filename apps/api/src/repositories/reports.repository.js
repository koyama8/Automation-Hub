import { prisma } from '../lib/prisma.js'

export async function getSummary() {
  const [
    clients,
    orders,
    payments,
    activeClients,
    paidOrders,
    approvedPayments,
    orderTotals,
    paymentTotals,
  ] = await Promise.all([
    prisma.client.count(),
    prisma.order.count(),
    prisma.payment.count(),
    prisma.client.count({ where: { status: 'active' } }),
    prisma.order.count({ where: { status: 'paid' } }),
    prisma.payment.count({ where: { status: 'approved' } }),
    prisma.order.aggregate({ _sum: { totalCents: true, discountCents: true } }),
    prisma.payment.aggregate({ where: { status: 'approved' }, _sum: { amountCents: true } }),
  ])

  return {
    clients,
    orders,
    payments,
    activeClients,
    paidOrders,
    approvedPayments,
    orderTotalCents: orderTotals._sum.totalCents || 0,
    discountTotalCents: orderTotals._sum.discountCents || 0,
    approvedPaymentTotalCents: paymentTotals._sum.amountCents || 0,
  }
}

export async function listClients({ where, orderBy, skip, take }) {
  const [data, total] = await prisma.$transaction([
    prisma.client.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        company: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.client.count({ where }),
  ])

  return { data, total }
}

export async function listOrders({ where, orderBy, skip, take }) {
  const [data, total] = await prisma.$transaction([
    prisma.order.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        status: true,
        totalCents: true,
        discountCents: true,
        couponCode: true,
        createdAt: true,
        updatedAt: true,
        client: { select: { id: true, name: true, email: true } },
        _count: { select: { items: true, payments: true } },
      },
    }),
    prisma.order.count({ where }),
  ])

  return { data, total }
}

export async function listPayments({ where, orderBy, skip, take }) {
  const [data, total] = await prisma.$transaction([
    prisma.payment.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        orderId: true,
        method: true,
        status: true,
        amountCents: true,
        transactionCode: true,
        expiresAt: true,
        paidAt: true,
        refundedAt: true,
        createdAt: true,
        updatedAt: true,
        order: { select: { client: { select: { id: true, name: true, email: true } } } },
      },
    }),
    prisma.payment.count({ where }),
  ])

  return { data, total }
}
