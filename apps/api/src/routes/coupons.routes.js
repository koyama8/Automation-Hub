import { Router } from 'express'
import * as couponsController from '../controllers/coupons.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const couponsRouter = Router()

couponsRouter.use(requireAuthentication)
couponsRouter.post('/', couponsController.create)
couponsRouter.get('/', couponsController.index)
couponsRouter.post('/validate', couponsController.validate)
couponsRouter.post('/apply', couponsController.apply)
couponsRouter.get('/:id', couponsController.show)
couponsRouter.put('/:id', couponsController.update)
couponsRouter.patch('/:id/expire', couponsController.expire)
couponsRouter.delete('/:id', couponsController.destroy)
couponsRouter.delete('/', requireAdministrator, couponsController.clear)
