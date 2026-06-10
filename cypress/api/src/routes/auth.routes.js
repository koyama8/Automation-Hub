import { Router } from 'express'
import { login, me } from '../controllers/auth.controller.js'

export const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.get('/me', me)
