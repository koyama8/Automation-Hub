import * as cartsService from '../services/carts.service.js'

export async function show(req, res) {
  const cart = await cartsService.getCart(req.params.clientId)
  return res.status(200).json({ data: cart })
}

export async function addItem(req, res) {
  const cart = await cartsService.addCartItem(req.body)
  return res.status(201).json({ message: 'Cart item added successfully', data: cart })
}

export async function updateItem(req, res) {
  const cart = await cartsService.updateCartItemQuantity(req.params.itemId, req.body)
  return res.status(200).json({ message: 'Cart item updated successfully', data: cart })
}

export async function removeItem(req, res) {
  const cart = await cartsService.removeCartItem(req.params.itemId)
  return res.status(200).json({ message: 'Cart item removed successfully', data: cart })
}

export async function clear(req, res) {
  const cart = await cartsService.clearClientCart(req.params.clientId)
  return res.status(200).json({ message: 'Cart cleared successfully', data: cart })
}
