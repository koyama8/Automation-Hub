import * as systemService from '../services/system.service.js'

export async function reset(req, res) {
  const result = await systemService.resetLab()
  return res.status(200).json({ message: 'Lab data reset successfully', data: result })
}
