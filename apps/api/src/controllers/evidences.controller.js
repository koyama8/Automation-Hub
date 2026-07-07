import * as evidencesService from '../services/evidences.service.js'

export async function create(req, res) {
  const evidence = await evidencesService.createEvidence(req.body)
  return res.status(201).json({ message: 'Evidence uploaded successfully', data: evidence })
}

export async function index(req, res) {
  const evidences = await evidencesService.getEvidences(req.query)
  return res.status(200).json(evidences)
}

export async function show(req, res) {
  const evidence = await evidencesService.getEvidence(req.params.id)
  return res.status(200).json({ data: evidence })
}

export async function download(req, res) {
  const evidence = await evidencesService.downloadEvidence(req.params.id)
  return res.status(200).json({ message: 'Evidence metadata downloaded successfully', data: evidence })
}

export async function destroy(req, res) {
  const evidence = await evidencesService.removeEvidence(req.params.id)
  return res.status(200).json({ message: 'Evidence deleted successfully', data: evidence })
}

export async function clear(req, res) {
  const result = await evidencesService.clearEvidences()
  return res.status(200).json({ message: 'All evidences deleted successfully', data: result })
}
