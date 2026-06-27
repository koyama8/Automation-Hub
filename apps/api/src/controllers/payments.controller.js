import * as paymentsService from '../services/payments.service.js'

export async function create(req, res) {
  const payment = await paymentsService.createPayment(req.body)
  return res.status(201).json({ message: 'Payment created successfully', data: payment })
}

export async function index(req, res) {
  const payments = await paymentsService.getPayments(req.query)
  return res.status(200).json(payments)
}

export async function show(req, res) {
  const payment = await paymentsService.getPayment(req.params.id)
  return res.status(200).json({ data: payment })
}

export async function confirm(req, res) {
  const payment = await paymentsService.confirmPayment(req.params.id)
  return res.status(200).json({ message: 'Payment confirmed successfully', data: payment })
}

export async function decline(req, res) {
  const payment = await paymentsService.declinePayment(req.params.id)
  return res.status(200).json({ message: 'Payment declined successfully', data: payment })
}

export async function refund(req, res) {
  const payment = await paymentsService.refundPayment(req.params.id)
  return res.status(200).json({ message: 'Payment refunded successfully', data: payment })
}
