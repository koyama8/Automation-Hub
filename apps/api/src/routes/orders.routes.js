import { Router } from 'express'
import * as ordersController from '../controllers/orders.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const ordersRouter = Router()

ordersRouter.use(requireAuthentication)
ordersRouter.post('/', ordersController.create)
ordersRouter.get('/', ordersController.index)
ordersRouter.get('/:id', ordersController.show)
ordersRouter.patch('/:id/status', ordersController.updateStatus)
ordersRouter.patch('/:id/cancel', ordersController.cancel)
