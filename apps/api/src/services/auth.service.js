import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import * as usersRepository from '../repositories/users.repository.js'
import { AppError } from '../utils/app-error.js'
import { hashPassword, isPasswordHash, verifyPassword } from '../utils/password.js'
import { requireEmail, requirePassword } from '../utils/validation.js'

function toPublicUser(user) {
  const { password, ...publicUser } = user
  return publicUser
}

export async function authenticate(payload = {}) {
  const email = requireEmail(payload.email)
  const password = requirePassword(payload.password)
  const user = await usersRepository.findUserByEmail(email)

  if (!user || !(await verifyPassword(password, user.password))) {
    throw new AppError(401, 'Invalid email or password!')
  }

  if (!user.active) {
    throw new AppError(403, 'User account is inactive!')
  }

  if (!isPasswordHash(user.password)) {
    await usersRepository.updateUserPassword(user.id, await hashPassword(password))
  }

  const token = jwt.sign({ role: user.role }, env.jwtSecret, {
    subject: String(user.id),
    expiresIn: env.jwtExpiresIn,
  })

  return { token, user: toPublicUser(user) }
}

export async function getAuthenticatedUser(userId) {
  const user = await usersRepository.findUserById(userId)

  if (!user) {
    throw new AppError(404, 'User not found!')
  }

  return user
}
