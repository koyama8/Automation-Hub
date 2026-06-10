import { Router } from 'express'
import { createContact } from '../controllers/forms.controller.js'

export const formRoutes = Router()

formRoutes.post('/contact', createContact)
