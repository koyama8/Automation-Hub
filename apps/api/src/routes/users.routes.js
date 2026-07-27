import { Router } from 'express'
import * as usersController from '../controllers/users.controller.js'
import { requireAuthentication, requirePermission } from '../middlewares/authentication.js'

export const usersRouter = Router()

usersRouter.post('/register', usersController.register)
usersRouter.use(requireAuthentication)
usersRouter.get('/', requirePermission('users:read'), usersController.index)
usersRouter.get('/:id', requirePermission('users:read'), usersController.show)
usersRouter.put('/:id', requirePermission('users:manage'), usersController.update)
usersRouter.patch('/:id/status', requirePermission('users:manage'), usersController.updateStatus)
usersRouter.delete('/:id', requirePermission('users:manage'), usersController.destroy)
usersRouter.delete('/', requirePermission('system:reset'), usersController.clear)
