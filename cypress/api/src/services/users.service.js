import {
  createUser,
  deleteAllUsers,
  deleteUser,
  findUserByEmail,
  findUserById,
  listUsers,
  updateUser,
} from '../repositories/users.repository.js'

function normalizeUser(user) {
  return {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password.trim(),
    role: user.role || 'user',
  }
}

export async function registerUser(user) {
  const normalizedUser = normalizeUser(user)
  return createUser(normalizedUser)
}

export async function getUsers() {
  return listUsers()
}

export async function getUser(id) {
  return findUserById(id)
}

export async function changeUser(id, user) {
  const data = {}

  if (user.name) data.name = user.name.trim()
  if (user.email) data.email = user.email.trim().toLowerCase()
  if (user.password) data.password = user.password.trim()
  if (typeof user.active === 'boolean') data.active = user.active
  if (user.role) data.role = user.role

  return updateUser(id, data)
}

export async function removeUser(id) {
  return deleteUser(id)
}

export async function removeAllUsers() {
  return deleteAllUsers()
}

export async function authenticate(email, password) {
  const user = await findUserByEmail(email.trim().toLowerCase())

  if (!user || user.password !== password) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: `local-token-${user.id}`,
  }
}
