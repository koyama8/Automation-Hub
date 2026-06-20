import * as clientsRepository from '../repositories/clients.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId, requireEmail, requireText } from '../utils/validation.js'

const CLIENT_STATUSES = ['active', 'inactive']

function normalizeDocument(value) {
  const document = requireText(value, 'Document is required!').replace(/\D/g, '')

  if (![11, 14].includes(document.length)) {
    throw new AppError(400, 'Document must contain 11 or 14 digits!')
  }

  return document
}

function normalizePhone(value) {
  const phone = requireText(value, 'Phone is required!').replace(/\D/g, '')

  if (![10, 11].includes(phone.length)) {
    throw new AppError(400, 'Phone must contain 10 or 11 digits!')
  }

  return phone
}

function normalizeStatus(value = 'active') {
  if (!CLIENT_STATUSES.includes(value)) {
    throw new AppError(400, 'Status must be active or inactive!')
  }

  return value
}

function normalizeClient(payload = {}) {
  return {
    name: requireText(payload.name, 'Name is required!'),
    email: requireEmail(payload.email),
    document: normalizeDocument(payload.document),
    phone: normalizePhone(payload.phone),
    company: typeof payload.company === 'string' && payload.company.trim() ? payload.company.trim() : null,
    status: normalizeStatus(payload.status),
  }
}

export function createClient(payload) {
  return clientsRepository.createClient(normalizeClient(payload))
}

export function getClients(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const status = query.status ? normalizeStatus(query.status) : undefined
  return clientsRepository.listClients({ search, status })
}

export async function getClient(rawId) {
  const id = parsePositiveId(rawId, 'Invalid client id!')
  const client = await clientsRepository.findClientById(id)

  if (!client) throw new AppError(404, 'Client not found!')
  return client
}

export async function editClient(rawId, payload) {
  const id = parsePositiveId(rawId, 'Invalid client id!')
  await getClient(id)
  return clientsRepository.updateClient(id, normalizeClient(payload))
}

export async function changeClientStatus(rawId, payload = {}) {
  const id = parsePositiveId(rawId, 'Invalid client id!')
  await getClient(id)
  return clientsRepository.updateClient(id, { status: normalizeStatus(payload.status) })
}

export async function removeClient(rawId) {
  const id = parsePositiveId(rawId, 'Invalid client id!')
  await getClient(id)
  return clientsRepository.deleteClient(id)
}

export function clearClients() {
  return clientsRepository.deleteAllClients()
}
