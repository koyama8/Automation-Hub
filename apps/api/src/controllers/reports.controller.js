import * as reportsService from '../services/reports.service.js'

export async function summary(req, res) {
  const data = await reportsService.getSummary()
  return res.status(200).json({ data })
}

export async function index(req, res) {
  const report = await reportsService.getReport(req.params.type, req.query)
  return res.status(200).json(report)
}

export async function exportCsv(req, res) {
  const report = await reportsService.exportReport(req.params.type, req.query)
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="${report.fileName}"`)
  return res.status(200).send(report.csv)
}
