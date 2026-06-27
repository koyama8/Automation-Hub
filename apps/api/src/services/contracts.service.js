import * as clientsRepository from '../repositories/clients.repository.js'
import * as contractsRepository from '../repositories/contracts.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId, requireText } from '../utils/validation.js'

const CONTRACT_STATUSES = ['active', 'canceled']

function normalizeStatus(value = 'active') {
  if (!CONTRACT_STATUSES.includes(value)) {
    throw new AppError(400, 'Status must be active or canceled!')
  }

  return value
}

function normalizeAmountCents(value) {
  const amountCents = Number(value)

  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new AppError(400, 'Amount must be a positive integer in cents!')
  }

  return amountCents
}

function normalizeDate(value, fieldName) {
  const text = requireText(value, `${fieldName} is required!`)
  const date = new Date(text)

  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, `${fieldName} must be a valid date!`)
  }

  return date
}

function normalizeOptionalDate(value, fieldName) {
  if (value === undefined || value === null || value === '') return null
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, `${fieldName} must be a valid date!`)
  }

  return date
}

function normalizeContract(payload = {}) {
  const startDate = normalizeDate(payload.startDate, 'Start date')
  const endDate = normalizeOptionalDate(payload.endDate, 'End date')

  if (endDate && endDate < startDate) {
    throw new AppError(400, 'End date must be greater than or equal to start date!')
  }

  return {
    clientId: parsePositiveId(payload.clientId, 'Invalid client id!'),
    title: requireText(payload.title, 'Title is required!'),
    plan: requireText(payload.plan, 'Plan is required!'),
    amountCents: normalizeAmountCents(payload.amountCents),
    startDate,
    endDate,
    status: normalizeStatus(payload.status),
    notes: typeof payload.notes === 'string' && payload.notes.trim() ? payload.notes.trim() : null,
  }
}

async function ensureClientExists(clientId) {
  const client = await clientsRepository.findClientById(clientId)
  if (!client) throw new AppError(404, 'Client not found!')
}

export async function createContract(payload) {
  const contract = normalizeContract(payload)
  await ensureClientExists(contract.clientId)
  return contractsRepository.createContract(contract)
}

export function getContracts(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const status = query.status ? normalizeStatus(query.status) : undefined
  const clientId = query.clientId ? parsePositiveId(query.clientId, 'Invalid client id!') : undefined
  return contractsRepository.listContracts({ search, status, clientId })
}

export async function getContract(rawId) {
  const id = parsePositiveId(rawId, 'Invalid contract id!')
  const contract = await contractsRepository.findContractById(id)

  if (!contract) throw new AppError(404, 'Contract not found!')
  return contract
}

export async function editContract(rawId, payload) {
  const id = parsePositiveId(rawId, 'Invalid contract id!')
  await getContract(id)
  const contract = normalizeContract(payload)
  await ensureClientExists(contract.clientId)
  return contractsRepository.updateContract(id, contract)
}

export async function cancelContract(rawId) {
  const id = parsePositiveId(rawId, 'Invalid contract id!')
  await getContract(id)
  return contractsRepository.updateContract(id, { status: 'canceled' })
}

export async function activateContract(rawId) {
  const id = parsePositiveId(rawId, 'Invalid contract id!')
  await getContract(id)
  return contractsRepository.updateContract(id, { status: 'active' })
}

export async function removeContract(rawId) {
  const id = parsePositiveId(rawId, 'Invalid contract id!')
  await getContract(id)
  return contractsRepository.deleteContract(id)
}
