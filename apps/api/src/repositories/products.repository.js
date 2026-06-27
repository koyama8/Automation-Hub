import { prisma } from '../lib/prisma.js'

export function createProduct(data) {
  return prisma.product.create({ data })
}

export function listProducts({ search, status } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { sku: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (status) where.status = status

  return prisma.product.findMany({ where, orderBy: { id: 'asc' } })
}

export function findProductById(id) {
  return prisma.product.findUnique({ where: { id } })
}

export function findProductByName(name) {
  return prisma.product.findUnique({ where: { name } })
}

export function findProductBySku(sku) {
  return prisma.product.findUnique({ where: { sku } })
}

export function updateProduct(id, data) {
  return prisma.product.update({ where: { id }, data })
}

export function deleteProduct(id) {
  return prisma.product.delete({ where: { id } })
}
