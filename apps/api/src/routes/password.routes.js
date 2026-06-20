import { Router } from 'express'
import * as passwordController from '../controllers/password.controller.js'

export const passwordRouter = Router()

passwordRouter.post('/forgot', passwordController.forgot)
passwordRouter.post('/reset', passwordController.reset)
