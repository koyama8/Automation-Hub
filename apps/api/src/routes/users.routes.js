import { Router } from 'express'
import * as usersController from '../controllers/users.controller.js'
import { requireAdministrator, requireAuthentication } from '../middlewares/authentication.js'

export const usersRouter = Router()

usersRouter.post('/register', usersController.register)
usersRouter.use(requireAuthentication)
usersRouter.get('/', usersController.index)
usersRouter.get('/:id', usersController.show)
usersRouter.put('/:id', usersController.update)
usersRouter.patch('/:id/status', usersController.updateStatus)
usersRouter.delete('/:id', usersController.destroy)
usersRouter.delete('/', requireAdministrator, usersController.clear)
