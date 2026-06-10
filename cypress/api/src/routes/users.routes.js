import { Router } from 'express'
import { create, destroy, destroyAll, index, show, update } from '../controllers/users.controller.js'

export const userRoutes = Router()

userRoutes.post('/register', create)
userRoutes.get('/', index)
userRoutes.get('/:id', show)
userRoutes.put('/:id', update)
userRoutes.delete('/', destroyAll)
userRoutes.delete('/:id', destroy)
