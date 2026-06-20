import * as usersService from '../services/users.service.js'

export async function register(req, res) {
  const user = await usersService.registerUser(req.body)
  return res.status(201).json({ message: 'User created successfully', data: user })
}

export async function index(req, res) {
  const users = await usersService.getUsers(req.query)
  return res.status(200).json(users)
}

export async function show(req, res) {
  const user = await usersService.getUser(req.params.id)
  return res.status(200).json({ data: user })
}

export async function update(req, res) {
  const user = await usersService.editUser(req.params.id, req.body)
  return res.status(200).json({ message: 'User updated successfully', data: user })
}

export async function updateStatus(req, res) {
  const user = await usersService.changeUserStatus(req.params.id, req.body)
  return res.status(200).json({ message: 'User status updated successfully', data: user })
}

export async function destroy(req, res) {
  const user = await usersService.removeUser(req.params.id)
  return res.status(200).json({ message: 'User deleted successfully', data: user })
}

export async function clear(req, res) {
  const result = await usersService.clearUsers()
  return res.status(200).json({ message: 'User data reset successfully', data: result })
}
