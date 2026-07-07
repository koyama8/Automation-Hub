import { prisma } from '../lib/prisma.js'

const evidenceSelect = {
  id: true,
  title: true,
  fileName: true,
  mimeType: true,
  sizeBytes: true,
  storageKey: true,
  checksum: true,
  entityType: true,
  clientId: true,
  orderId: true,
  notes: true,
  status: true,
  uploadedAt: true,
  updatedAt: true,
  client: {
    select: {
      id: true,
      name: true,
      email: true,
      company: true,
    },
  },
  order: {
    select: {
      id: true,
      status: true,
      totalCents: true,
    },
  },
}

export function createEvidence(data) {
  return prisma.evidence.create({ data, select: evidenceSelect })
}

export function listEvidences({ search, entityType, clientId, orderId, status } = {}) {
  const where = {}

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { fileName: { contains: search, mode: 'insensitive' } },
      { notes: { contains: search, mode: 'insensitive' } },
      { storageKey: { contains: search, mode: 'insensitive' } },
    ]
  }

  if (entityType) where.entityType = entityType
  if (clientId) where.clientId = clientId
  if (orderId) where.orderId = orderId
  if (status) where.status = status

  return prisma.evidence.findMany({
    where,
    select: evidenceSelect,
    orderBy: { id: 'asc' },
  })
}

export function findEvidenceById(id) {
  return prisma.evidence.findUnique({ where: { id }, select: evidenceSelect })
}

export function findEvidenceFileById(id) {
  return prisma.evidence.findUnique({ where: { id } })
}

export function deleteEvidence(id) {
  return prisma.evidence.delete({ where: { id }, select: evidenceSelect })
}

export function deleteAllEvidences() {
  return prisma.$transaction(async (transaction) => {
    const deletedEvidences = await transaction.evidence.count()
    await transaction.$executeRawUnsafe('TRUNCATE TABLE "Evidence" RESTART IDENTITY CASCADE')
    return { deletedEvidences, nextEvidenceId: 1 }
  })
}
