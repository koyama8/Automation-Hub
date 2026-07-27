import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import * as usersRepository from '../repositories/users.repository.js'
import { AppError } from '../utils/app-error.js'
import { getPermissionsForRole, registerPermissionDenied } from '../services/permissions.service.js'

export async function requireAuthentication(req, res, next) {
  const authorization = req.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError(401, 'Authentication token is required!'))
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret)
    const userId = Number(payload.sub)
    const user = await usersRepository.findUserForAuthenticationById(userId)
    const session = payload.sid ? await usersRepository.findAuthSessionById(payload.sid) : null

    if (
      !user ||
      !user.active ||
      user.status !== 'active' ||
      user.deletedAt ||
      !session ||
      session.userId !== userId ||
      session.revokedAt ||
      session.expiresAt <= new Date() ||
      session.authVersion !== user.authVersion ||
      payload.ver !== user.authVersion
    ) {
      throw new AppError(401, 'Authentication session is no longer valid!')
    }

    req.auth = {
      userId,
      role: user.role,
      sessionId: session.id,
      authVersion: user.authVersion,
    }
    return next()
  } catch (error) {
    if (error instanceof AppError) return next(error)
    return next(new AppError(401, 'Invalid or expired authentication token!'))
  }
}

export function requireAdministrator(req, res, next) {
  if (req.auth?.role !== 'admin') {
    return next(new AppError(403, 'Administrator permission is required!'))
  }

  return next()
}

export function requirePermission(permission) {
  return async (req, res, next) => {
    const permissions = await getPermissionsForRole(req.auth?.role)
    if (permissions.includes('*') || permissions.includes(permission)) return next()

    await registerPermissionDenied({
      actorId: req.auth?.userId,
      permission,
      method: req.method,
      path: req.originalUrl,
    })
    return next(new AppError(403, `Permission required: ${permission}!`))
  }
}
