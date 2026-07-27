import { Router } from 'express'
import * as productsController from '../controllers/products.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const productsRouter = Router()

productsRouter.use(requireAuthentication)
productsRouter.post('/', requirePermission('products:write'), productsController.create)
productsRouter.get('/', requirePermission('products:read'), productsController.index)
productsRouter.get('/:id', requirePermission('products:read'), productsController.show)
productsRouter.put('/:id', requirePermission('products:write'), productsController.update)
productsRouter.patch('/:id/status', requirePermission('products:write'), productsController.updateStatus)
productsRouter.delete('/:id', requirePermission('products:delete'), productsController.destroy)
productsRouter.delete('/', requirePermission('system:reset'), productsController.clear)
