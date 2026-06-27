import { prisma } from '../lib/prisma.js'

export function createClient(data) {
  return prisma.client.create({ data })
}

export function listClients({ search, status } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { document: { contains: search } },
      { company: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (status) where.status = status

  return prisma.client.findMany({ where, orderBy: { id: 'asc' } })
}

export function findClientById(id) {
  return prisma.client.findUnique({ where: { id } })
}

export function findClientByEmail(email) {
  return prisma.client.findUnique({ where: { email } })
}

export function findClientByDocument(document) {
  return prisma.client.findUnique({ where: { document } })
}

export function updateClient(id, data) {
  return prisma.client.update({ where: { id }, data })
}

export function deleteClient(id) {
  return prisma.client.delete({ where: { id } })
}

export function deleteAllClients() {
  return prisma.$transaction(async (transaction) => {
    const [deletedClients, deletedContracts, deletedCarts, deletedOrders, deletedPayments] = await Promise.all([
      transaction.client.count(),
      transaction.contract.count(),
      transaction.cart.count(),
      transaction.order.count(),
      transaction.payment.count(),
    ])
    await transaction.$executeRawUnsafe(
      'TRUNCATE TABLE "Payment", "OrderItem", "Order", "CartItem", "Cart", "Contract", "Client" RESTART IDENTITY',
    )

    return { deletedClients, deletedContracts, deletedCarts, deletedOrders, deletedPayments, nextClientId: 1 }
  })
}
