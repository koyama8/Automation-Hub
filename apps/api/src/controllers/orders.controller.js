import * as ordersService from '../services/orders.service.js'

export async function create(req, res) {
  const order = await ordersService.createOrder(req.body)
  return res.status(201).json({ message: 'Order created successfully', data: order })
}

export async function index(req, res) {
  const orders = await ordersService.getOrders(req.query)
  return res.status(200).json(orders)
}

export async function show(req, res) {
  const order = await ordersService.getOrder(req.params.id)
  return res.status(200).json({ data: order })
}

export async function updateStatus(req, res) {
  const order = await ordersService.changeOrderStatus(req.params.id, req.body)
  return res.status(200).json({ message: 'Order status updated successfully', data: order })
}

export async function cancel(req, res) {
  const order = await ordersService.cancelOrder(req.params.id)
  return res.status(200).json({ message: 'Order canceled successfully', data: order })
}
