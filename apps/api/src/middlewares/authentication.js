import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { AppError } from '../utils/app-error.js'

export function requireAuthentication(req, res, next) {
  const authorization = req.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError(401, 'Authentication token is required!'))
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    req.auth = { userId: Number(payload.sub), role: payload.role }
    return next()
  } catch (error) {
    return next(new AppError(401, 'Invalid or expired authentication token!'))
  }
}

export function requireAdministrator(req, res, next) {
  if (req.auth?.role !== 'admin') {
    return next(new AppError(403, 'Administrator permission is required!'))
  }

  return next()
}
