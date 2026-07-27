import { Router } from 'express'
import * as ordersController from '../controllers/orders.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const ordersRouter = Router()

ordersRouter.use(requireAuthentication)
ordersRouter.post('/', requirePermission('orders:write'), ordersController.create)
ordersRouter.get('/', requirePermission('orders:read'), ordersController.index)
ordersRouter.get('/:id', requirePermission('orders:read'), ordersController.show)
ordersRouter.patch('/:id/status', requirePermission('orders:write'), ordersController.updateStatus)
ordersRouter.patch('/:id/cancel', requirePermission('orders:write'), ordersController.cancel)
