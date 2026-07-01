import { Router } from 'express'
import * as productsController from '../controllers/products.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const productsRouter = Router()

productsRouter.use(requireAuthentication)
productsRouter.post('/', productsController.create)
productsRouter.get('/', productsController.index)
productsRouter.get('/:id', productsController.show)
productsRouter.put('/:id', productsController.update)
productsRouter.patch('/:id/status', productsController.updateStatus)
productsRouter.delete('/:id', productsController.destroy)
productsRouter.delete('/', requireAdministrator, productsController.clear)
