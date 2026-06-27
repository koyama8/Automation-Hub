import * as clientsRepository from '../repositories/clients.repository.js'
import * as ordersRepository from '../repositories/orders.repository.js'
import * as productsRepository from '../repositories/products.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId } from '../utils/validation.js'

const ORDER_STATUSES = ['pending', 'processing', 'paid', 'canceled']

function normalizeStatus(value = 'pending') {
  if (!ORDER_STATUSES.includes(value)) {
    throw new AppError(400, 'Status must be pending, processing, paid or canceled!')
  }

  return value
}

function normalizeQuantity(value) {
  const quantity = Number(value)

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError(400, 'Quantity must be a positive integer!')
  }

  return quantity
}

function normalizeOrderItems(items) {
  if (!Array.isArray(items) || !items.length) {
    throw new AppError(400, 'Order must contain at least one item!')
  }

  const groupedItems = new Map()

  for (const item of items) {
    const productId = parsePositiveId(item?.productId, 'Invalid product id!')
    const quantity = normalizeQuantity(item?.quantity)
    groupedItems.set(productId, (groupedItems.get(productId) || 0) + quantity)
  }

  return Array.from(groupedItems, ([productId, quantity]) => ({ productId, quantity }))
}

async function ensureClientExists(clientId) {
  const client = await clientsRepository.findClientById(clientId)
  if (!client) throw new AppError(404, 'Client not found!')
}

async function buildOrderItems(items) {
  const orderItems = []

  for (const item of items) {
    const product = await productsRepository.findProductById(item.productId)
    if (!product) throw new AppError(404, 'Product not found!')
    if (product.status !== 'active') throw new AppError(400, 'Product is inactive!')
    if (product.stock < item.quantity) throw new AppError(400, 'Insufficient product stock!')

    orderItems.push({
      productId: product.id,
      productName: product.name,
      quantity: item.quantity,
      unitPriceCents: product.priceCents,
      subtotalCents: product.priceCents * item.quantity,
    })
  }

  return orderItems
}

export async function createOrder(payload = {}) {
  const clientId = parsePositiveId(payload.clientId, 'Invalid client id!')
  await ensureClientExists(clientId)
  const items = await buildOrderItems(normalizeOrderItems(payload.items))
  const totalCents = items.reduce((total, item) => total + item.subtotalCents, 0)

  return ordersRepository.createOrderWithItems({
    clientId,
    status: normalizeStatus(payload.status),
    totalCents,
    notes: typeof payload.notes === 'string' && payload.notes.trim() ? payload.notes.trim() : null,
    items,
  })
}

export function getOrders(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const status = query.status ? normalizeStatus(query.status) : undefined
  const clientId = query.clientId ? parsePositiveId(query.clientId, 'Invalid client id!') : undefined
  return ordersRepository.listOrders({ search, status, clientId })
}

export async function getOrder(rawId) {
  const id = parsePositiveId(rawId, 'Invalid order id!')
  const order = await ordersRepository.findOrderById(id)

  if (!order) throw new AppError(404, 'Order not found!')
  return order
}

export async function changeOrderStatus(rawId, payload = {}) {
  const id = parsePositiveId(rawId, 'Invalid order id!')
  await getOrder(id)
  return ordersRepository.updateOrderStatus(id, normalizeStatus(payload.status))
}

export async function cancelOrder(rawId) {
  const id = parsePositiveId(rawId, 'Invalid order id!')
  await getOrder(id)
  return ordersRepository.updateOrderStatus(id, 'canceled')
}
