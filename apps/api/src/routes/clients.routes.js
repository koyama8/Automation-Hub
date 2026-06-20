import { Router } from 'express'
import * as clientsController from '../controllers/clients.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const clientsRouter = Router()

clientsRouter.use(requireAuthentication)
clientsRouter.post('/', clientsController.create)
clientsRouter.get('/', clientsController.index)
clientsRouter.get('/:id', clientsController.show)
clientsRouter.put('/:id', clientsController.update)
clientsRouter.patch('/:id/status', clientsController.updateStatus)
clientsRouter.delete('/:id', clientsController.destroy)
clientsRouter.delete('/', requireAdministrator, clientsController.clear)
