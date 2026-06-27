import * as cartsRepository from '../repositories/carts.repository.js'
import * as clientsRepository from '../repositories/clients.repository.js'
import * as productsRepository from '../repositories/products.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId } from '../utils/validation.js'

function normalizeQuantity(value) {
  const quantity = Number(value)

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError(400, 'Quantity must be a positive integer!')
  }

  return quantity
}

function formatCart(cart) {
  if (!cart) return null
  const items = cart.items || []
  const subtotalCents = items.reduce((total, item) => total + item.subtotalCents, 0)

  return {
    ...cart,
    subtotalCents,
    totalItems: items.reduce((total, item) => total + item.quantity, 0),
  }
}

async function ensureClientExists(clientId) {
  const client = await clientsRepository.findClientById(clientId)
  if (!client) throw new AppError(404, 'Client not found!')
}

async function getActiveProduct(productId) {
  const product = await productsRepository.findProductById(productId)
  if (!product) throw new AppError(404, 'Product not found!')
  if (product.status !== 'active') throw new AppError(400, 'Product is inactive!')
  return product
}

export async function getCart(rawClientId) {
  const clientId = parsePositiveId(rawClientId, 'Invalid client id!')
  await ensureClientExists(clientId)
  const cart = await cartsRepository.getOrCreateActiveCart(clientId)
  return formatCart(cart)
}

export async function addCartItem(payload = {}) {
  const clientId = parsePositiveId(payload.clientId, 'Invalid client id!')
  const productId = parsePositiveId(payload.productId, 'Invalid product id!')
  const quantity = normalizeQuantity(payload.quantity)
  await ensureClientExists(clientId)
  const product = await getActiveProduct(productId)
  const cart = await cartsRepository.getOrCreateActiveCart(clientId)

  if (product.stock < quantity) {
    throw new AppError(400, 'Insufficient product stock!')
  }

  return formatCart(
    await cartsRepository.addItemToCart({
      cartId: cart.id,
      productId: product.id,
      quantity,
      unitPriceCents: product.priceCents,
    }),
  )
}

export async function updateCartItemQuantity(rawItemId, payload = {}) {
  const itemId = parsePositiveId(rawItemId, 'Invalid cart item id!')
  const quantity = normalizeQuantity(payload.quantity)
  const item = await cartsRepository.findCartItemById(itemId)

  if (!item) throw new AppError(404, 'Cart item not found!')
  if (item.product.status !== 'active') throw new AppError(400, 'Product is inactive!')
  if (item.product.stock < quantity) throw new AppError(400, 'Insufficient product stock!')

  return formatCart(await cartsRepository.updateCartItem(itemId, { quantity, unitPriceCents: item.product.priceCents }))
}

export async function removeCartItem(rawItemId) {
  const itemId = parsePositiveId(rawItemId, 'Invalid cart item id!')
  const item = await cartsRepository.findCartItemById(itemId)

  if (!item) throw new AppError(404, 'Cart item not found!')
  return formatCart(await cartsRepository.deleteCartItem(itemId))
}

export async function clearClientCart(rawClientId) {
  const clientId = parsePositiveId(rawClientId, 'Invalid client id!')
  await ensureClientExists(clientId)
  const cart = await cartsRepository.getOrCreateActiveCart(clientId)
  return formatCart(await cartsRepository.clearCart(cart.id))
}
