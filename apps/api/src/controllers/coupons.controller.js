import * as couponsService from '../services/coupons.service.js'

export async function create(req, res) {
  const coupon = await couponsService.createCoupon(req.body)
  return res.status(201).json({ message: 'Coupon created successfully', data: coupon })
}

export async function index(req, res) {
  const coupons = await couponsService.getCoupons(req.query)
  return res.status(200).json(coupons)
}

export async function show(req, res) {
  const coupon = await couponsService.getCoupon(req.params.id)
  return res.status(200).json({ data: coupon })
}

export async function update(req, res) {
  const coupon = await couponsService.editCoupon(req.params.id, req.body)
  return res.status(200).json({ message: 'Coupon updated successfully', data: coupon })
}

export async function validate(req, res) {
  const validation = await couponsService.validateCoupon(req.body)
  return res.status(200).json({ message: 'Coupon is valid', data: validation })
}

export async function apply(req, res) {
  const result = await couponsService.applyCoupon(req.body)
  return res.status(200).json({ message: 'Coupon applied successfully', data: result })
}

export async function expire(req, res) {
  const coupon = await couponsService.expireCoupon(req.params.id)
  return res.status(200).json({ message: 'Coupon expired successfully', data: coupon })
}

export async function destroy(req, res) {
  const coupon = await couponsService.removeCoupon(req.params.id)
  return res.status(200).json({ message: 'Coupon deleted successfully', data: coupon })
}

export async function clear(req, res) {
  const result = await couponsService.clearCoupons()
  return res.status(200).json({ message: 'All coupons deleted successfully', data: result })
}
