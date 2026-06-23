import { AppError } from '../utils/app-error.js'

export function notFoundHandler(req, res) {
  return res.status(404).json({ error: 'Route not found!' })
}

export function errorHandler(error, req, res, next) {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  if (error.code === 'P2002') {
    const conflictMetadata = JSON.stringify(error.meta || {}).toLowerCase()
    const field = conflictMetadata.includes('document') ? 'Document' : 'Email'
    return res.status(409).json({ error: `${field} already exists!` })
  }

  if (error.code === 'P2025') {
    return res.status(404).json({ error: 'Record not found!' })
  }

  console.error(error)
  return res.status(500).json({ error: 'Internal server error' })
}
