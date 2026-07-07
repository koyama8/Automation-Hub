import crypto from 'node:crypto'
import * as clientsRepository from '../repositories/clients.repository.js'
import * as evidencesRepository from '../repositories/evidences.repository.js'
import * as ordersRepository from '../repositories/orders.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId, requireText } from '../utils/validation.js'

const EVIDENCE_TYPES = ['client', 'order']
const EVIDENCE_STATUSES = ['active', 'archived']
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'text/plain',
  'text/csv',
  'application/json',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]
const MAX_FILE_SIZE_BYTES = 1024 * 1024

function normalizeEntityType(value) {
  if (!EVIDENCE_TYPES.includes(value)) {
    throw new AppError(400, 'Evidence entity type must be client or order!')
  }

  return value
}

function normalizeStatus(value = 'active') {
  if (!EVIDENCE_STATUSES.includes(value)) {
    throw new AppError(400, 'Evidence status must be active or archived!')
  }

  return value
}

function normalizeMimeType(value) {
  const mimeType = requireText(value, 'MIME type is required!').toLowerCase()

  if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
    throw new AppError(400, 'Evidence file type is not allowed!')
  }

  return mimeType
}

function normalizeFileBase64(value) {
  const fileBase64 = requireText(value, 'Evidence file is required!').replace(/^data:[^;]+;base64,/, '')
  const buffer = Buffer.from(fileBase64, 'base64')

  if (!buffer.length) {
    throw new AppError(400, 'Evidence file is required!')
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new AppError(400, 'Evidence file exceeds maximum size of 1MB!')
  }

  return {
    fileBase64,
    sizeBytes: buffer.length,
    checksum: crypto.createHash('sha256').update(buffer).digest('hex'),
  }
}

async function ensureClientExists(clientId) {
  const client = await clientsRepository.findClientById(clientId)
  if (!client) throw new AppError(404, 'Client not found!')
  return client
}

async function ensureOrderExists(orderId) {
  const order = await ordersRepository.findOrderById(orderId)
  if (!order) throw new AppError(404, 'Order not found!')
  return order
}

async function normalizeEvidence(payload = {}) {
  const entityType = normalizeEntityType(payload.entityType)
  const title = requireText(payload.title, 'Evidence title is required!')
  const fileName = requireText(payload.fileName, 'File name is required!')
  const mimeType = normalizeMimeType(payload.mimeType)
  const { fileBase64, sizeBytes, checksum } = normalizeFileBase64(payload.fileBase64)
  const clientId = payload.clientId ? parsePositiveId(payload.clientId, 'Invalid client id!') : null
  const orderId = payload.orderId ? parsePositiveId(payload.orderId, 'Invalid order id!') : null

  if (entityType === 'client' && !clientId) {
    throw new AppError(400, 'Client evidence must have a client id!')
  }

  if (entityType === 'order' && !orderId) {
    throw new AppError(400, 'Order evidence must have an order id!')
  }

  let order = null

  if (clientId) {
    await ensureClientExists(clientId)
  }

  if (orderId) {
    order = await ensureOrderExists(orderId)
  }

  if (clientId && order && order.clientId !== clientId) {
    throw new AppError(400, 'Evidence client does not match order client!')
  }

  return {
    title,
    fileName,
    mimeType,
    sizeBytes,
    storageKey: `evidence-${Date.now()}-${crypto.randomBytes(6).toString('hex')}`,
    fileBase64,
    checksum,
    entityType,
    clientId,
    orderId,
    notes: typeof payload.notes === 'string' && payload.notes.trim() ? payload.notes.trim() : null,
    status: normalizeStatus(payload.status),
  }
}

export async function createEvidence(payload) {
  return evidencesRepository.createEvidence(await normalizeEvidence(payload))
}

export function getEvidences(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const entityType = query.entityType ? normalizeEntityType(query.entityType) : undefined
  const clientId = query.clientId ? parsePositiveId(query.clientId, 'Invalid client id!') : undefined
  const orderId = query.orderId ? parsePositiveId(query.orderId, 'Invalid order id!') : undefined
  const status = query.status ? normalizeStatus(query.status) : undefined
  return evidencesRepository.listEvidences({ search, entityType, clientId, orderId, status })
}

export async function getEvidence(rawId) {
  const id = parsePositiveId(rawId, 'Invalid evidence id!')
  const evidence = await evidencesRepository.findEvidenceById(id)

  if (!evidence) {
    throw new AppError(404, 'Evidence not found!')
  }

  return evidence
}

export async function downloadEvidence(rawId) {
  const id = parsePositiveId(rawId, 'Invalid evidence id!')
  const evidence = await evidencesRepository.findEvidenceFileById(id)

  if (!evidence) {
    throw new AppError(404, 'Evidence not found!')
  }

  return {
    id: evidence.id,
    title: evidence.title,
    fileName: evidence.fileName,
    mimeType: evidence.mimeType,
    sizeBytes: evidence.sizeBytes,
    checksum: evidence.checksum,
    storageKey: evidence.storageKey,
    fileBase64: evidence.fileBase64,
  }
}

export async function removeEvidence(rawId) {
  const evidence = await getEvidence(rawId)
  return evidencesRepository.deleteEvidence(evidence.id)
}

export function clearEvidences() {
  return evidencesRepository.deleteAllEvidences()
}
