import { Router } from 'express'
import * as cartsController from '../controllers/carts.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const cartsRouter = Router()

cartsRouter.use(requireAuthentication)
cartsRouter.get('/:clientId', requirePermission('cart:read'), cartsController.show)
cartsRouter.post('/items', requirePermission('cart:write'), cartsController.addItem)
cartsRouter.patch('/items/:itemId', requirePermission('cart:write'), cartsController.updateItem)
cartsRouter.delete('/items/:itemId', requirePermission('cart:delete'), cartsController.removeItem)
cartsRouter.delete('/:clientId', requirePermission('cart:delete'), cartsController.clear)
