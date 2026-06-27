import * as productsRepository from '../repositories/products.repository.js'
import { AppError } from '../utils/app-error.js'
import { parsePositiveId, requireText } from '../utils/validation.js'

const PRODUCT_STATUSES = ['active', 'inactive']

function normalizeStatus(value = 'active') {
  if (!PRODUCT_STATUSES.includes(value)) {
    throw new AppError(400, 'Status must be active or inactive!')
  }

  return value
}

function normalizePriceCents(value) {
  const priceCents = Number(value)

  if (!Number.isInteger(priceCents) || priceCents <= 0) {
    throw new AppError(400, 'Price must be a positive integer in cents!')
  }

  return priceCents
}

function normalizeStock(value = 0) {
  const stock = Number(value)

  if (!Number.isInteger(stock) || stock < 0) {
    throw new AppError(400, 'Stock must be zero or a positive integer!')
  }

  return stock
}

function normalizeSku(value) {
  return requireText(value, 'SKU is required!').toUpperCase()
}

function normalizeProduct(payload = {}) {
  return {
    name: requireText(payload.name, 'Name is required!'),
    sku: normalizeSku(payload.sku),
    description: typeof payload.description === 'string' && payload.description.trim() ? payload.description.trim() : null,
    priceCents: normalizePriceCents(payload.priceCents),
    stock: normalizeStock(payload.stock),
    status: normalizeStatus(payload.status),
  }
}

async function ensureUniqueProduct({ name, sku }, ignoredProductId) {
  const [productWithName, productWithSku] = await Promise.all([
    productsRepository.findProductByName(name),
    productsRepository.findProductBySku(sku),
  ])

  if (productWithName && productWithName.id !== ignoredProductId) {
    throw new AppError(409, 'Product name already exists!')
  }

  if (productWithSku && productWithSku.id !== ignoredProductId) {
    throw new AppError(409, 'Product SKU already exists!')
  }
}

export async function createProduct(payload) {
  const product = normalizeProduct(payload)
  await ensureUniqueProduct(product)
  return productsRepository.createProduct(product)
}

export function getProducts(query = {}) {
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  const status = query.status ? normalizeStatus(query.status) : undefined
  return productsRepository.listProducts({ search, status })
}

export async function getProduct(rawId) {
  const id = parsePositiveId(rawId, 'Invalid product id!')
  const product = await productsRepository.findProductById(id)

  if (!product) throw new AppError(404, 'Product not found!')
  return product
}

export async function editProduct(rawId, payload) {
  const id = parsePositiveId(rawId, 'Invalid product id!')
  await getProduct(id)
  const product = normalizeProduct(payload)
  await ensureUniqueProduct(product, id)
  return productsRepository.updateProduct(id, product)
}

export async function changeProductStatus(rawId, payload = {}) {
  const id = parsePositiveId(rawId, 'Invalid product id!')
  await getProduct(id)
  return productsRepository.updateProduct(id, { status: normalizeStatus(payload.status) })
}

export async function removeProduct(rawId) {
  const id = parsePositiveId(rawId, 'Invalid product id!')
  await getProduct(id)
  return productsRepository.deleteProduct(id)
}
