import * as ordersRepository from '../repositories/orders.repository.js'
import * as paymentsRepository from '../repositories/payments.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId } from '../utils/validation.js'

const PAYMENT_METHODS = ['pix', 'card', 'boleto']
const PAYMENT_STATUSES = ['pending', 'approved', 'declined', 'refunded', 'expired']

function normalizeMethod(value) {
  if (!PAYMENT_METHODS.includes(value)) {
    throw new AppError(400, 'Payment method must be pix, card or boleto!')
  }

  return value
}

function normalizeStatus(value) {
  if (!PAYMENT_STATUSES.includes(value)) {
    throw new AppError(400, 'Payment status is invalid!')
  }

  return value
}

function normalizeAmount(value, fallbackAmountCents) {
  const amountCents = value === undefined || value === null || value === '' ? fallbackAmountCents : Number(value)

  if (!Number.isInteger(amountCents) || amountCents <= 0) {
    throw new AppError(400, 'Payment amount must be a positive integer in cents!')
  }

  return amountCents
}

function normalizeExpiresAt(value, method) {
  if (value) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) throw new AppError(400, 'Expiration date must be valid!')
    return date
  }

  if (method === 'pix') return new Date(Date.now() + 15 * 60 * 1000)
  if (method === 'boleto') return new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  return null
}

function normalizeCard(payload = {}) {
  if (payload.method !== 'card') return null
  const cardNumber = String(payload.cardNumber || '').replace(/\D/g, '')

  if (cardNumber.length < 13 || cardNumber.length > 19 || /^0+$/.test(cardNumber)) {
    throw new AppError(400, 'Invalid card number!')
  }

  return cardNumber.slice(-4)
}

function generateTransactionCode(method) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${method.toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${random}`
}

function generatePixCode(transactionCode) {
  return `PIX-${transactionCode}-QA-AUTOMATION-LAB`
}

function generateBoletoCode() {
  const chunks = Array.from({ length: 5 }, () => Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'))
  return chunks.join(' ')
}

export async function createPayment(payload = {}) {
  const orderId = parsePositiveId(payload.orderId, 'Invalid order id!')
  const order = await ordersRepository.findOrderById(orderId)
  if (!order) throw new AppError(404, 'Order not found!')
  if (order.status === 'canceled') throw new AppError(400, 'Canceled order cannot receive payments!')

  const method = normalizeMethod(payload.method)
  const transactionCode = generateTransactionCode(method)
  const cardLast4 = normalizeCard({ ...payload, method })
  const expiresAt = normalizeExpiresAt(payload.expiresAt, method)

  return paymentsRepository.createPayment({
    orderId,
    method,
    status: 'pending',
    amountCents: normalizeAmount(payload.amountCents, order.totalCents),
    transactionCode,
    pixCode: method === 'pix' ? generatePixCode(transactionCode) : null,
    boletoCode: method === 'boleto' ? generateBoletoCode() : null,
    cardLast4,
    expiresAt,
  })
}

export function getPayments(query = {}) {
  const status = query.status ? normalizeStatus(query.status) : undefined
  const method = query.method ? normalizeMethod(query.method) : undefined
  const orderId = query.orderId ? parsePositiveId(query.orderId, 'Invalid order id!') : undefined
  return paymentsRepository.listPayments({ status, method, orderId })
}

export async function getPayment(rawId) {
  const id = parsePositiveId(rawId, 'Invalid payment id!')
  const payment = await paymentsRepository.findPaymentById(id)

  if (!payment) throw new AppError(404, 'Payment not found!')
  return payment
}

export async function confirmPayment(rawId) {
  const id = parsePositiveId(rawId, 'Invalid payment id!')
  const payment = await getPayment(id)

  const isExpiredPix =
    payment.method === 'pix' &&
    payment.expiresAt &&
    payment.expiresAt < new Date() &&
    ['pending', 'expired'].includes(payment.status)

  if (isExpiredPix) {
    if (payment.status === 'pending') await paymentsRepository.updatePayment(id, { status: 'expired' })
    throw new AppError(400, 'Pix expired!')
  }
  if (payment.status !== 'pending') throw new AppError(400, 'Only pending payments can be confirmed!')

  return paymentsRepository.approvePayment(id)
}

export async function declinePayment(rawId) {
  const id = parsePositiveId(rawId, 'Invalid payment id!')
  const payment = await getPayment(id)

  if (!['pending', 'expired'].includes(payment.status)) throw new AppError(400, 'Only pending payments can be declined!')
  return paymentsRepository.updatePayment(id, { status: 'declined' })
}

export async function refundPayment(rawId) {
  const id = parsePositiveId(rawId, 'Invalid payment id!')
  const payment = await getPayment(id)

  if (payment.status !== 'approved') throw new AppError(400, 'Only approved payments can be refunded!')
  return paymentsRepository.refundPayment(id)
}
