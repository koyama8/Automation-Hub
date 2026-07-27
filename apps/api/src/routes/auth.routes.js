import { Router } from 'express'
import * as authController from '../controllers/auth.controller.js'
import { requireAuthentication } from '../middlewares/authentication.js'

export const authRouter = Router()

authRouter.post('/login', authController.login)
authRouter.post('/refresh', authController.refresh)
authRouter.get('/me', requireAuthentication, authController.me)
authRouter.post('/logout', requireAuthentication, authController.logout)
