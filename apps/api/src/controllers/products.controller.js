import * as productsService from '../services/products.service.js'

export async function create(req, res) {
  const product = await productsService.createProduct(req.body)
  return res.status(201).json({ message: 'Product created successfully', data: product })
}

export async function index(req, res) {
  const products = await productsService.getProducts(req.query)
  return res.status(200).json(products)
}

export async function show(req, res) {
  const product = await productsService.getProduct(req.params.id)
  return res.status(200).json({ data: product })
}

export async function update(req, res) {
  const product = await productsService.editProduct(req.params.id, req.body)
  return res.status(200).json({ message: 'Product updated successfully', data: product })
}

export async function updateStatus(req, res) {
  const product = await productsService.changeProductStatus(req.params.id, req.body)
  return res.status(200).json({ message: 'Product status updated successfully', data: product })
}

export async function destroy(req, res) {
  const product = await productsService.removeProduct(req.params.id)
  return res.status(200).json({ message: 'Product deleted successfully', data: product })
}

export async function clear(req, res) {
  const result = await productsService.clearProducts()
  return res.status(200).json({ message: 'All products deleted successfully', data: result })
}
