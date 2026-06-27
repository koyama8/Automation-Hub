import { Router } from 'express'
import * as cartsController from '../controllers/carts.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const cartsRouter = Router()

cartsRouter.use(requireAuthentication)
cartsRouter.get('/:clientId', cartsController.show)
cartsRouter.post('/items', cartsController.addItem)
cartsRouter.patch('/items/:itemId', cartsController.updateItem)
cartsRouter.delete('/items/:itemId', cartsController.removeItem)
cartsRouter.delete('/:clientId', cartsController.clear)
