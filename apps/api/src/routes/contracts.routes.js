import { Router } from 'express'
import * as contractsController from '../controllers/contracts.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const contractsRouter = Router()

contractsRouter.use(requireAuthentication)
contractsRouter.post('/', contractsController.create)
contractsRouter.get('/', contractsController.index)
contractsRouter.get('/:id', contractsController.show)
contractsRouter.put('/:id', contractsController.update)
contractsRouter.patch('/:id/cancel', contractsController.cancel)
contractsRouter.patch('/:id/activate', contractsController.activate)
contractsRouter.delete('/:id', contractsController.destroy)
