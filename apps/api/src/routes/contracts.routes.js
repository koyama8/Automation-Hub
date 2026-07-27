import { Router } from 'express'
import * as contractsController from '../controllers/contracts.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const contractsRouter = Router()

contractsRouter.use(requireAuthentication)
contractsRouter.post('/', requirePermission('contracts:write'), contractsController.create)
contractsRouter.get('/', requirePermission('contracts:read'), contractsController.index)
contractsRouter.get('/:id', requirePermission('contracts:read'), contractsController.show)
contractsRouter.put('/:id', requirePermission('contracts:write'), contractsController.update)
contractsRouter.patch('/:id/cancel', requirePermission('contracts:write'), contractsController.cancel)
contractsRouter.patch('/:id/activate', requirePermission('contracts:write'), contractsController.activate)
contractsRouter.delete('/:id', requirePermission('contracts:delete'), contractsController.destroy)
