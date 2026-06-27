import * as contractsService from '../services/contracts.service.js'

export async function create(req, res) {
  const contract = await contractsService.createContract(req.body)
  return res.status(201).json({ message: 'Contract created successfully', data: contract })
}

export async function index(req, res) {
  const contracts = await contractsService.getContracts(req.query)
  return res.status(200).json(contracts)
}

export async function show(req, res) {
  const contract = await contractsService.getContract(req.params.id)
  return res.status(200).json({ data: contract })
}

export async function update(req, res) {
  const contract = await contractsService.editContract(req.params.id, req.body)
  return res.status(200).json({ message: 'Contract updated successfully', data: contract })
}

export async function cancel(req, res) {
  const contract = await contractsService.cancelContract(req.params.id)
  return res.status(200).json({ message: 'Contract canceled successfully', data: contract })
}

export async function activate(req, res) {
  const contract = await contractsService.activateContract(req.params.id)
  return res.status(200).json({ message: 'Contract activated successfully', data: contract })
}

export async function destroy(req, res) {
  const contract = await contractsService.removeContract(req.params.id)
  return res.status(200).json({ message: 'Contract deleted successfully', data: contract })
}
