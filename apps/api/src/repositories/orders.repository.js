import { prisma } from '../lib/prisma.js'

const orderInclude = {
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
  payments: {
    orderBy: { id: 'asc' },
  },
}

export function createOrderWithItems({ clientId, status, totalCents, notes, items }) {
  return prisma.$transaction(async (transaction) => {
    for (const item of items) {
      await transaction.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return transaction.order.create({
      data: {
        clientId,
        status,
        totalCents,
        notes,
        items: {
          create: items,
        },
      },
      include: orderInclude,
    })
  })
}

export function listOrders({ search, status, clientId } = {}) {
  const where = {}

  if (status) where.status = status
  if (clientId) where.clientId = clientId
  if (search) {
    where.OR = [
      { notes: { contains: search, mode: 'insensitive' } },
      { client: { is: { name: { contains: search, mode: 'insensitive' } } } },
      { client: { is: { email: { contains: search, mode: 'insensitive' } } } },
    ]
  }

  return prisma.order.findMany({ where, include: orderInclude, orderBy: { id: 'asc' } })
}

export function findOrderById(id) {
  return prisma.order.findUnique({ where: { id }, include: orderInclude })
}

export function updateOrderStatus(id, status) {
  return prisma.order.update({ where: { id }, data: { status }, include: orderInclude })
}
