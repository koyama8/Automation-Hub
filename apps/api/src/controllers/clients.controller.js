import * as clientsService from '../services/clients.service.js'

export async function create(req, res) {
  const client = await clientsService.createClient(req.body)
  return res.status(201).json({ message: 'Client created successfully', data: client })
}

export async function index(req, res) {
  const clients = await clientsService.getClients(req.query)
  return res.status(200).json(clients)
}

export async function show(req, res) {
  const client = await clientsService.getClient(req.params.id)
  return res.status(200).json({ data: client })
}

export async function update(req, res) {
  const client = await clientsService.editClient(req.params.id, req.body)
  return res.status(200).json({ message: 'Client updated successfully', data: client })
}

export async function updateStatus(req, res) {
  const client = await clientsService.changeClientStatus(req.params.id, req.body)
  return res.status(200).json({ message: 'Client status updated successfully', data: client })
}

export async function destroy(req, res) {
  const client = await clientsService.removeClient(req.params.id)
  return res.status(200).json({ message: 'Client deleted successfully', data: client })
}

export async function clear(req, res) {
  const result = await clientsService.clearClients()
  return res.status(200).json({ message: 'All clients deleted successfully', data: result })
}
