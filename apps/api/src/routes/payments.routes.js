import { Router } from 'express'
import * as paymentsController from '../controllers/payments.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const paymentsRouter = Router()

paymentsRouter.use(requireAuthentication)
paymentsRouter.post('/', paymentsController.create)
paymentsRouter.get('/', paymentsController.index)
paymentsRouter.get('/:id', paymentsController.show)
paymentsRouter.patch('/:id/confirm', paymentsController.confirm)
paymentsRouter.patch('/:id/decline', paymentsController.decline)
paymentsRouter.patch('/:id/refund', paymentsController.refund)
