import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.get('/me', requireAuthentication, authController.me)
