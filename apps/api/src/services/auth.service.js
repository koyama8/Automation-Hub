import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import * as usersRepository from '../repositories/users.repository.js'
import { AppError } from '../utils/app-error.js'
import { hashPassword, isPasswordHash, verifyPassword } from '../utils/password.js'
import { createOpaqueToken, createSessionId, hashSecurityToken } from '../utils/security-token.js'
import { requireEmail, requirePassword } from '../utils/validation.js'
import { getPermissionsForRole } from './permissions.service.js'

function toPublicUser(user) {
  const { password, authVersion, ...publicUser } = user
  return publicUser
}

export async function authenticate(payload = {}) {
  const email = requireEmail(payload.email)
  const password = requirePassword(payload.password)
  const user = await usersRepository.findUserByEmail(email)

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new AppError(401, 'Invalid email or password!')
  }

  if (!user.active || user.status !== 'active' || user.deletedAt) {
    throw new AppError(403, 'User account does not have active access!')
  }

  if (!isPasswordHash(user.password)) {
    await usersRepository.updateUserPassword(user.id, await hashPassword(password))
  }

  const sessionId = createSessionId()
  const refreshToken = createOpaqueToken()
  const sessionExpiresAt = new Date(Date.now() + env.refreshTokenDays * 24 * 60 * 60 * 1000)
  await usersRepository.createAuthSession({
    id: sessionId,
    userId: user.id,
    refreshTokenHash: hashSecurityToken(refreshToken),
    authVersion: user.authVersion,
    expiresAt: sessionExpiresAt,
  })

  const token = jwt.sign({ role: user.role, ver: user.authVersion, sid: sessionId }, env.jwtSecret, {
    subject: String(user.id),
    expiresIn: env.jwtExpiresIn,
  })

  return {
    token,
    refreshToken,
    refreshTokenExpiresAt: sessionExpiresAt,
    user: {
      ...toPublicUser(user),
      profile: user.role === 'user' ? 'viewer' : user.role,
      permissions: await getPermissionsForRole(user.role),
    },
  }
}

export async function getAuthenticatedUser(userId) {
  const user = await usersRepository.findUserById(userId)

  if (!user) {
    throw new AppError(404, 'User not found!')
  }

  return {
    ...user,
    profile: user.role === 'user' ? 'viewer' : user.role,
    permissions: await getPermissionsForRole(user.role),
  }
}

export async function refreshAuthentication(payload = {}) {
  const refreshToken = requirePassword(payload.refreshToken, 'Refresh token')
  const session = await usersRepository.findAuthSessionByRefreshTokenHash(hashSecurityToken(refreshToken))
  const now = new Date()

  if (
    !session ||
    session.revokedAt ||
    session.expiresAt <= now ||
    !session.user.active ||
    session.user.status !== 'active' ||
    session.user.deletedAt ||
    session.authVersion !== session.user.authVersion
  ) {
    throw new AppError(401, 'Invalid, expired or revoked refresh token!')
  }

  const nextRefreshToken = createOpaqueToken()
  const nextExpiresAt = new Date(Date.now() + env.refreshTokenDays * 24 * 60 * 60 * 1000)
  await usersRepository.rotateAuthSession(session.id, {
    refreshTokenHash: hashSecurityToken(nextRefreshToken),
    authVersion: session.user.authVersion,
    expiresAt: nextExpiresAt,
  })

  const token = jwt.sign(
    { role: session.user.role, ver: session.user.authVersion, sid: session.id },
    env.jwtSecret,
    {
      subject: String(session.user.id),
      expiresIn: env.jwtExpiresIn,
    },
  )

  return {
    token,
    refreshToken: nextRefreshToken,
    refreshTokenExpiresAt: nextExpiresAt,
  }
}

export async function logout(sessionId) {
  if (sessionId) await usersRepository.revokeAuthSession(sessionId)
}
