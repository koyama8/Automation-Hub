import { env } from '../config/env.js'
import * as usersRepository from '../repositories/users.repository.js'
import { AppError } from '../utils/app-error.js'
import { hashPassword } from '../utils/password.js'
import { parseBoolean, parsePositiveId, requireEmail, requirePassword, requireText } from '../utils/validation.js'

export async function registerUser(payload = {}) {
  const password = requirePassword(payload.password)

  return usersRepository.createUser({
    name: requireText(payload.name, 'Name is required!'),
    email: requireEmail(payload.email),
    password: await hashPassword(password),
  })
}

export function getUsers(query = {}) {
  const active = query.active === undefined ? undefined : parseBoolean(query.active, 'Invalid active filter!')
  const search = typeof query.search === 'string' ? query.search.trim() : ''
  return usersRepository.listUsers({ search, active })
}

export async function getUser(rawId) {
  const id = parsePositiveId(rawId, 'Invalid user id!')
  const user = await usersRepository.findUserById(id)

  if (!user) {
    throw new AppError(404, 'User not found!')
  }

  return user
}

export async function editUser(rawId, payload = {}) {
  const id = parsePositiveId(rawId, 'Invalid user id!')
  const data = {
    name: requireText(payload.name, 'Name is required!'),
    email: requireEmail(payload.email),
  }

  if (payload.password !== undefined && payload.password !== '') {
    data.password = await hashPassword(requirePassword(payload.password))
  }

  return usersRepository.updateUser(id, data)
}

export function changeUserStatus(rawId, payload = {}) {
  const id = parsePositiveId(rawId, 'Invalid user id!')
  const active = parseBoolean(payload.active, 'Active must be true or false!')
  return usersRepository.updateUser(id, { active })
}

export async function removeUser(rawId) {
  const id = parsePositiveId(rawId, 'Invalid user id!')
  const user = await getUser(id)

  if (user.email === env.adminEmail.toLowerCase()) {
    throw new AppError(403, 'Administrator user cannot be deleted!')
  }

  return usersRepository.deleteUser(id)
}

export async function clearUsers() {
  const password = await hashPassword(env.adminPassword)

  return usersRepository.resetUsers({
    name: 'QA Admin',
    email: env.adminEmail.toLowerCase(),
    password,
    role: 'admin',
    active: true,
  })
}
