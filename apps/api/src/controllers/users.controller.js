import { failure, success } from '../utils/response.js'
import {
  changeUser,
  getUser,
  getUsers,
  registerUser,
  removeAllUsers,
  removeUser,
} from '../services/users.service.js'

function validateRequiredUserFields(req, res) {
  const { name, email, password } = req.body

  if (!name || name.trim() === '') return failure(res, 400, 'Name is required')
  if (!email || email.trim() === '') return failure(res, 400, 'Email is required')
  if (!password || password.trim() === '') return failure(res, 400, 'Password is required')

  return null
}

export async function create(req, res, next) {
  try {
    const invalid = validateRequiredUserFields(req, res)
    if (invalid) return invalid

    const user = await registerUser(req.body)

    return success(res, 201, 'User created successfully', {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } catch (error) {
    return next(error)
  }
}

export async function index(req, res, next) {
  try {
    const users = await getUsers()
    return success(res, 200, 'Users listed successfully', users)
  } catch (error) {
    return next(error)
  }
}

export async function show(req, res, next) {
  try {
    const user = await getUser(Number(req.params.id))
    if (!user) return failure(res, 404, 'User not found')

    return success(res, 200, 'User found successfully', user)
  } catch (error) {
    return next(error)
  }
}

export async function update(req, res, next) {
  try {
    const user = await changeUser(Number(req.params.id), req.body)
    return success(res, 200, 'User updated successfully', user)
  } catch (error) {
    return next(error)
  }
}

export async function destroy(req, res, next) {
  try {
    await removeUser(Number(req.params.id))
    return success(res, 200, 'User deleted successfully')
  } catch (error) {
    return next(error)
  }
}

export async function destroyAll(req, res, next) {
  try {
    const deleted = await removeAllUsers()
    return success(res, 200, 'Users deleted successfully', { deleted })
  } catch (error) {
    return next(error)
  }
}
