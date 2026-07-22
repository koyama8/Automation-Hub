import * as reportsRepository from '../repositories/reports.repository.js'
import { AppError } from '../utils/app-error.js'

const REPORT_CONFIG = {
  clients: {
    statuses: ['active', 'inactive'],
    sortFields: ['id', 'name', 'email', 'status', 'createdAt', 'updatedAt'],
    repository: reportsRepository.listClients,
  },
  orders: {
    statuses: ['pending', 'processing', 'paid', 'canceled'],
    sortFields: ['id', 'status', 'totalCents', 'discountCents', 'createdAt', 'updatedAt'],
    repository: reportsRepository.listOrders,
  },
  payments: {
    statuses: ['pending', 'approved', 'declined', 'refunded', 'expired'],
    sortFields: ['id', 'status', 'method', 'amountCents', 'createdAt', 'updatedAt'],
    repository: reportsRepository.listPayments,
  },
}

function parseInteger(value, fallback, field, minimum, maximum) {
  if (value === undefined || value === '') return fallback
  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < minimum || parsed > maximum) {
    throw new AppError(400, `${field} must be an integer between ${minimum} and ${maximum}!`)
  }
  return parsed
}

function parseDate(value, field, endOfDay = false) {
  if (!value) return undefined
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new AppError(400, `${field} must use YYYY-MM-DD format!`)
  }

  const suffix = endOfDay ? 'T23:59:59.999Z' : 'T00:00:00.000Z'
  const date = new Date(`${value}${suffix}`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new AppError(400, `${field} must be a valid date!`)
  }
  return date
}

function normalizeQuery(type, query = {}, exportMode = false) {
  const config = REPORT_CONFIG[type]
  if (!config) throw new AppError(404, 'Report type not found!')

  const startDate = parseDate(query.startDate, 'startDate')
  const endDate = parseDate(query.endDate, 'endDate', true)
  if (startDate && endDate && startDate > endDate) {
    throw new AppError(400, 'startDate must be before or equal to endDate!')
  }

  const status = typeof query.status === 'string' ? query.status.trim().toLowerCase() : ''
  if (status && !config.statuses.includes(status)) {
    throw new AppError(400, `status must be one of: ${config.statuses.join(', ')}!`)
  }

  const sortBy = query.sortBy || 'createdAt'
  if (!config.sortFields.includes(sortBy)) {
    throw new AppError(400, `sortBy must be one of: ${config.sortFields.join(', ')}!`)
  }

  const sortOrder = String(query.sortOrder || 'desc').toLowerCase()
  if (!['asc', 'desc'].includes(sortOrder)) {
    throw new AppError(400, 'sortOrder must be asc or desc!')
  }

  const page = parseInteger(query.page, 1, 'page', 1, 1000000)
  const limit = exportMode ? undefined : parseInteger(query.limit, 10, 'limit', 1, 100)
  const where = {}
  if (status) where.status = status
  if (startDate || endDate) {
    where.createdAt = {
      ...(startDate ? { gte: startDate } : {}),
      ...(endDate ? { lte: endDate } : {}),
    }
  }

  return {
    config,
    filters: {
      startDate: query.startDate || null,
      endDate: query.endDate || null,
      status: status || null,
      sortBy,
      sortOrder,
    },
    page,
    limit,
    where,
    orderBy: { [sortBy]: sortOrder },
  }
}

export function getSummary() {
  return reportsRepository.getSummary()
}

export async function getReport(type, query = {}) {
  const normalized = normalizeQuery(type, query)
  const { data, total } = await normalized.config.repository({
    where: normalized.where,
    orderBy: normalized.orderBy,
    skip: (normalized.page - 1) * normalized.limit,
    take: normalized.limit,
  })

  return {
    data,
    pagination: {
      page: normalized.page,
      limit: normalized.limit,
      total,
      totalPages: Math.ceil(total / normalized.limit),
    },
    filters: normalized.filters,
  }
}

function protectSpreadsheetFormula(value) {
  const text = String(value ?? '')
  return /^[=+\-@]/.test(text) ? `'${text}` : text
}

function csvCell(value) {
  const text = protectSpreadsheetFormula(value).replace(/"/g, '""')
  return `"${text}"`
}

function toCsv(headers, rows) {
  return `\uFEFF${[headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n')}`
}

function buildCsv(type, data) {
  if (type === 'clients') {
    return toCsv(
      ['id', 'name', 'email', 'document', 'phone', 'company', 'status', 'createdAt'],
      data.map((item) => [item.id, item.name, item.email, item.document, item.phone, item.company, item.status, item.createdAt.toISOString()]),
    )
  }

  if (type === 'orders') {
    return toCsv(
      ['id', 'clientId', 'clientName', 'clientEmail', 'items', 'payments', 'totalCents', 'discountCents', 'couponCode', 'status', 'createdAt'],
      data.map((item) => [item.id, item.client.id, item.client.name, item.client.email, item._count.items, item._count.payments, item.totalCents, item.discountCents, item.couponCode, item.status, item.createdAt.toISOString()]),
    )
  }

  return toCsv(
    ['id', 'orderId', 'clientId', 'clientName', 'method', 'amountCents', 'status', 'transactionCode', 'paidAt', 'createdAt'],
    data.map((item) => [item.id, item.orderId, item.order.client.id, item.order.client.name, item.method, item.amountCents, item.status, item.transactionCode, item.paidAt?.toISOString() || '', item.createdAt.toISOString()]),
  )
}

export async function exportReport(type, query = {}) {
  const normalized = normalizeQuery(type, query, true)
  const { data } = await normalized.config.repository({
    where: normalized.where,
    orderBy: normalized.orderBy,
    skip: undefined,
    take: undefined,
  })

  return {
    csv: buildCsv(type, data),
    fileName: `report-${type}-${new Date().toISOString().slice(0, 10)}.csv`,
  }
}
