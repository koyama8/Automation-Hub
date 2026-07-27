import { Router } from 'express'
import * as clientsController from '../controllers/clients.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const clientsRouter = Router()

clientsRouter.use(requireAuthentication)
clientsRouter.post('/', requirePermission('clients:write'), clientsController.create)
clientsRouter.get('/', requirePermission('clients:read'), clientsController.index)
clientsRouter.get('/:id', requirePermission('clients:read'), clientsController.show)
clientsRouter.put('/:id', requirePermission('clients:write'), clientsController.update)
clientsRouter.patch('/:id/status', requirePermission('clients:write'), clientsController.updateStatus)
clientsRouter.delete('/:id', requirePermission('clients:delete'), clientsController.destroy)
clientsRouter.delete('/', requirePermission('system:reset'), clientsController.clear)
