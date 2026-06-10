import { Router } from 'express'
import { forgot, reset } from '../controllers/password.controller.js'

export const passwordRoutes = Router()

passwordRoutes.post('/forgot', forgot)
passwordRoutes.post('/reset', reset)
