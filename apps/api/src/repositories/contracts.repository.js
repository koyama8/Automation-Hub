import { prisma } from '../lib/prisma.js'

const contractInclude = {
  client: {
    select: {
      id: true,
      name: true,
      email: true,
      document: true,
      company: true,
      status: true,
    },
  },
}

export function createContract(data) {
  return prisma.contract.create({ data, include: contractInclude })
}

export function listContracts({ search, status, clientId } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { plan: { contains: search, mode: 'insensitive' } },
      { notes: { contains: search, mode: 'insensitive' } },
      { client: { is: { name: { contains: search, mode: 'insensitive' } } } },
      { client: { is: { email: { contains: search, mode: 'insensitive' } } } },
    ]
  }

  if (status) where.status = status
  if (clientId) where.clientId = clientId

  return prisma.contract.findMany({ where, include: contractInclude, orderBy: { id: 'asc' } })
}

export function findContractById(id) {
  return prisma.contract.findUnique({ where: { id }, include: contractInclude })
}

export function updateContract(id, data) {
  return prisma.contract.update({ where: { id }, data, include: contractInclude })
}

export function deleteContract(id) {
  return prisma.contract.delete({ where: { id }, include: contractInclude })
}
