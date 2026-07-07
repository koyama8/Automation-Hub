import * as couponsRepository from '../repositories/coupons.repository.js'
import * as ordersRepository from '../repositories/orders.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId, requireText } from '../utils/validation.js'

const COUPON_TYPES = ['percentage', 'fixed']
const COUPON_STATUSES = ['active', 'inactive', 'expired']

function normalizeCode(value) {
  const code = requireText(value, 'Coupon code is required!').toUpperCase().replace(/\s+/g, '-')

  if (!/^[A-Z0-9-]{3,24}$/.test(code)) {
    throw new AppError(400, 'Coupon code must contain 3 to 24 letters, numbers or hyphens!')
  }

  return code
}

function normalizeType(value) {
  if (!COUPON_TYPES.includes(value)) {
    throw new AppError(400, 'Coupon type must be percentage or fixed!')
  }

  return value
}

function normalizeStatus(value = 'active') {
  if (!COUPON_STATUSES.includes(value)) {
    throw new AppError(400, 'Coupon status must be active, inactive or expired!')
  }

  return value
}

function normalizePositiveInteger(value, fieldName) {
  const number = Number(value)

  if (!Number.isInteger(number) || number <= 0) {
    throw new AppError(400, `${fieldName} must be a positive integer!`)
  }

  return number
}

function normalizeNonNegativeInteger(value = 0, fieldName) {
  const number = Number(value)

  if (!Number.isInteger(number) || number < 0) {
    throw new AppError(400, `${fieldName} must be zero or a positive integer!`)
  }

  return number
}

function normalizeOptionalPositiveInteger(value, fieldName) {
  if (value === undefined || value === null || value === '') return null
  return normalizePositiveInteger(value, fieldName)
}

function normalizeOptionalDate(value, fieldName) {
  if (value === undefined || value === null || value === '') return null
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new AppError(400, `${fieldName} must be a valid date!`)
  }

  return date
}

function normalizeCoupon(payload = {}) {
  const type = normalizeType(payload.type)
  const value = normalizePositiveInteger(payload.value, 'Coupon value')
  const startsAt = normalizeOptionalDate(payload.startsAt, 'Start date')
  const expiresAt = normalizeOptionalDate(payload.expiresAt, 'Expiration date')

  if (type === 'percentage' && value > 100) {
    throw new AppError(400, 'Percentage coupon value cannot be greater than 100!')
  }

  if (startsAt && expiresAt && expiresAt <= startsAt) {
    throw new AppError(400, 'Expiration date must be greater than start date!')
  }

  return {
    code: normalizeCode(payload.code),
    description: typeof payload.description === 'string' && payload.description.trim() ? payload.description.trim() : null,
    type,
    value,
    minOrderCents: normalizeNonNegativeInteger(payload.minOrderCents, 'Minimum order amount'),
    maxDiscountCents: normalizeOptionalPositiveInteger(payload.maxDiscountCents, 'Maximum discount'),
    startsAt,
    expiresAt,
    usageLimit: normalizeOptionalPositiveInteger(payload.usageLimit, 'Usage limit'),
    status: normalizeStatus(payload.status),
  }
}

async function getExistingCoupon(rawId) {
  const id = parsePositiveId(rawId, 'Invalid coupon id!')
  const coupon = await couponsRepository.findCouponById(id)

  if (!coupon) {
    throw new AppError(404, 'Coupon not found!')
  }

  return coupon
}

function ensureCouponCanBeUsed(coupon) {
  const now = new Date()

  if (coupon.status !== 'active') {
    throw new AppError(400, 'Coupon is not active!')
  }

  if (coupon.startsAt && coupon.startsAt > now) {
    throw new AppError(400, 'Coupon is not available yet!')
  }

  if (coupon.expiresAt && coupon.expiresAt <= now) {
    throw new AppError(400, 'Coupon is expired!')
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    throw new AppError(400, 'Coupon usage limit reached!')
  }
}

function getOrderOriginalTotal(order) {
  return Number(order.totalCents) + Number(order.discountCents || 0)
}

function calculateDiscount(coupon, orderTotalCents) {
  if (orderTotalCents < coupon.minOrderCents) {
    throw new AppError(400, 'Order total is below coupon minimum amount!')
  }

  const rawDiscount =
    coupon.type === 'percentage'
      ? Math.floor((orderTotalCents * coupon.value) / 100)
      : coupon.value

  const cappedDiscount = coupon.maxDiscountCents ? Math.min(rawDiscount, coupon.maxDiscountCents) : rawDiscount
  return Math.min(cappedDiscount, orderTotalCents)
}

async function getOrderForCoupon(rawOrderId) {
  const orderId = parsePositiveId(rawOrderId, 'Invalid order id!')
  const order = await ordersRepository.findOrderById(orderId)

  if (!order) {
    throw new AppError(404, 'Order not found!')
  }

  if (order.status === 'canceled') {
    throw new AppError(400, 'Canceled order cannot receive coupons!')
  }

  return order
}

export async function createCoupon(payload) {
  const coupon = normalizeCoupon(payload)
  const existingCoupon = await couponsRepository.findCouponByCode(coupon.code)

  if (existingCoupon) {
    throw new AppError(409, 'Coupon code already exists!')
  }

  return couponsRepository.createCoupon(coupon)
}

export function getCoupons(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const status = query.status ? normalizeStatus(query.status) : undefined
  return couponsRepository.listCoupons({ search, status })
}

export function getCoupon(rawId) {
  return getExistingCoupon(rawId)
}

export async function editCoupon(rawId, payload) {
  const id = parsePositiveId(rawId, 'Invalid coupon id!')
  await getExistingCoupon(id)
  const coupon = normalizeCoupon(payload)
  const couponWithCode = await couponsRepository.findCouponByCode(coupon.code)

  if (couponWithCode && couponWithCode.id !== id) {
    throw new AppError(409, 'Coupon code already exists!')
  }

  return couponsRepository.updateCoupon(id, coupon)
}

export async function expireCoupon(rawId) {
  const coupon = await getExistingCoupon(rawId)
  return couponsRepository.updateCoupon(coupon.id, { status: 'expired', expiresAt: new Date() })
}

export async function removeCoupon(rawId) {
  const coupon = await getExistingCoupon(rawId)
  return couponsRepository.deleteCoupon(coupon.id)
}

export async function validateCoupon(payload = {}) {
  const code = normalizeCode(payload.code)
  const order = await getOrderForCoupon(payload.orderId)
  const coupon = await couponsRepository.findCouponByCode(code)

  if (!coupon) {
    throw new AppError(404, 'Coupon not found!')
  }

  ensureCouponCanBeUsed(coupon)

  if (order.couponId && order.couponId !== coupon.id) {
    throw new AppError(400, 'Order already has another coupon applied!')
  }

  const originalTotalCents = getOrderOriginalTotal(order)
  const discountCents = calculateDiscount(coupon, originalTotalCents)

  return {
    valid: true,
    coupon,
    orderId: order.id,
    originalTotalCents,
    discountCents,
    finalTotalCents: originalTotalCents - discountCents,
  }
}

export async function applyCoupon(payload = {}) {
  const validation = await validateCoupon(payload)
  const existingUsage = await couponsRepository.findCouponUsage(validation.coupon.id, validation.orderId)

  if (existingUsage) {
    throw new AppError(400, 'Coupon was already applied to this order!')
  }

  const order = await couponsRepository.applyCouponToOrder({
    couponId: validation.coupon.id,
    code: validation.coupon.code,
    orderId: validation.orderId,
    discountCents: validation.discountCents,
    finalTotalCents: validation.finalTotalCents,
  })

  return {
    ...validation,
    order,
  }
}

export function clearCoupons() {
  return couponsRepository.deleteAllCoupons()
}
