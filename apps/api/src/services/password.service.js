import crypto from 'node:crypto'
import { env } from '../config/env.js'
import * as passwordRepository from '../repositories/password.repository.js'
import * as usersRepository from '../repositories/users.repository.js'
import { AppError } from '../utils/app-error.js'
import { hashPassword } from '../utils/password.js'
import { requireEmail, requirePassword, requireText } from '../utils/validation.js'

export async function requestPasswordReset(payload = {}) {
  const email = requireEmail(payload.email)
  const user = await usersRepository.findUserByEmail(email)

  if (!user) {
    throw new AppError(404, 'Email is not registered!')
  }

  const token = crypto.randomBytes(24).toString('hex')
  const expiresAt = new Date(Date.now() + env.resetTokenMinutes * 60 * 1000)
  await passwordRepository.replacePendingToken(user.id, token, expiresAt)

  return { email: user.email, token, expiresAt }
}

export async function resetPassword(payload = {}) {
  const token = requireText(payload.token, 'Reset token is required!')
  const newPassword = requirePassword(payload.newPassword, 'New password')
  const resetToken = await passwordRepository.findToken(token)

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt <= new Date()) {
    throw new AppError(400, 'Invalid or expired reset token!')
  }

  await passwordRepository.consumeToken(resetToken.id, resetToken.userId, await hashPassword(newPassword))
  return { email: resetToken.user.email }
}
