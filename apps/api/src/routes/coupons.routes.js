import { Router } from 'express'
import * as couponsController from '../controllers/coupons.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const couponsRouter = Router()

couponsRouter.use(requireAuthentication)
couponsRouter.post('/', requirePermission('coupons:write'), couponsController.create)
couponsRouter.get('/', requirePermission('coupons:read'), couponsController.index)
couponsRouter.post('/validate', requirePermission('coupons:read'), couponsController.validate)
couponsRouter.post('/apply', requirePermission('coupons:write'), couponsController.apply)
couponsRouter.get('/:id', requirePermission('coupons:read'), couponsController.show)
couponsRouter.put('/:id', requirePermission('coupons:write'), couponsController.update)
couponsRouter.patch('/:id/expire', requirePermission('coupons:write'), couponsController.expire)
couponsRouter.delete('/:id', requirePermission('coupons:delete'), couponsController.destroy)
couponsRouter.delete('/', requirePermission('system:reset'), couponsController.clear)
