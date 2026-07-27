import { Router } from 'express'
import * as paymentsController from '../controllers/payments.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const paymentsRouter = Router()

paymentsRouter.use(requireAuthentication)
paymentsRouter.post('/', requirePermission('payments:write'), paymentsController.create)
paymentsRouter.get('/', requirePermission('payments:read'), paymentsController.index)
paymentsRouter.get('/:id', requirePermission('payments:read'), paymentsController.show)
paymentsRouter.patch('/:id/confirm', requirePermission('payments:write'), paymentsController.confirm)
paymentsRouter.patch('/:id/decline', requirePermission('payments:write'), paymentsController.decline)
paymentsRouter.patch('/:id/refund', requirePermission('payments:write'), paymentsController.refund)
