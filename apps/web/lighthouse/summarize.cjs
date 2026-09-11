const fs = require('fs')
const path = require('path')

const reportsDirectory = path.resolve(__dirname, 'reports')
const summaryPath = path.join(reportsDirectory, 'summary.md')

function median(values) {
  const sortedValues = [...values].sort((first, second) => first - second)
  const middle = Math.floor(sortedValues.length / 2)

  return sortedValues.length % 2
    ? sortedValues[middle]
    : (sortedValues[middle - 1] + sortedValues[middle]) / 2
}

function formatMilliseconds(value) {
  return `${Math.round(value)} ms`
}

function readReports() {
  if (!fs.existsSync(reportsDirectory)) {
    throw new Error(`Diretório de relatórios não encontrado: ${reportsDirectory}`)
  }

  return fs
    .readdirSync(reportsDirectory)
    .filter((fileName) => fileName.endsWith('.json') && fileName !== 'manifest.json')
    .map((fileName) => {
      const contents = fs.readFileSync(path.join(reportsDirectory, fileName), 'utf8')
      const report = JSON.parse(contents)
      report.__sourceFile = fileName
      return report
    })
    .filter((report) => report.lighthouseVersion && report.categories && report.audits)
}

function getMedianReport(reports) {
  const orderedReports = [...reports].sort(
    (first, second) => first.categories.performance.score - second.categories.performance.score,
  )

  return orderedReports[Math.floor(orderedReports.length / 2)]
}

function getCategoryRows(reports) {
  const categories = [
    ['performance', 'Performance'],
    ['accessibility', 'Acessibilidade'],
    ['best-practices', 'Boas práticas'],
    ['seo', 'SEO'],
  ]

  return categories.map(([categoryId, label]) => {
    const score = median(reports.map((report) => report.categories[categoryId].score * 100))
    return `| ${label} | ${Math.round(score)}% |`
  })
}

function getMetricRows(reports) {
  const metrics = [
    ['first-contentful-paint', 'First Contentful Paint'],
    ['largest-contentful-paint', 'Largest Contentful Paint'],
    ['total-blocking-time', 'Total Blocking Time'],
    ['cumulative-layout-shift', 'Cumulative Layout Shift'],
  ]

  return metrics.map(([auditId, label]) => {
    const value = median(reports.map((report) => report.audits[auditId].numericValue))
    const formattedValue =
      auditId === 'cumulative-layout-shift' ? value.toFixed(3) : formatMilliseconds(value)

    return `| ${label} | ${formattedValue} |`
  })
}

function getOpportunities(report) {
  return Object.values(report.audits)
    .filter((audit) => audit.details?.type === 'opportunity')
    .map((audit) => ({
      title: audit.title,
      savings: audit.details.overallSavingsMs || 0,
    }))
    .filter((audit) => audit.savings > 0)
    .sort((first, second) => second.savings - first.savings)
    .slice(0, 5)
}

function getFailedAudits(report) {
  const categoryIds = ['accessibility', 'best-practices', 'seo']
  const relevantAuditIds = new Set(
    categoryIds.flatMap((categoryId) =>
      report.categories[categoryId].auditRefs
        .filter((reference) => reference.weight > 0)
        .map((reference) => reference.id),
    ),
  )

  return [...relevantAuditIds]
    .map((auditId) => report.audits[auditId])
    .filter((audit) => audit && audit.score !== null && audit.score < 1)
    .sort((first, second) => first.score - second.score)
    .slice(0, 8)
}

function buildSummary(reports) {
  const medianReport = getMedianReport(reports)
  const opportunities = getOpportunities(medianReport)
  const failedAudits = getFailedAudits(medianReport)
  const lines = [
    '# Lighthouse CI — resumo da auditoria',
    '',
    `- URL: ${medianReport.finalDisplayedUrl || medianReport.finalUrl}`,
    `- Execuções analisadas: ${reports.length}`,
    `- Lighthouse: ${medianReport.lighthouseVersion}`,
    '',
    '## Pontuações medianas',
    '',
    '| Categoria | Resultado |',
    '| --- | ---: |',
    ...getCategoryRows(reports),
    '',
    '## Métricas medianas',
    '',
    '| Métrica | Resultado |',
    '| --- | ---: |',
    ...getMetricRows(reports),
    '',
    '## Principais oportunidades de desempenho',
    '',
    ...(opportunities.length
      ? opportunities.map(
          (audit) => `- ${audit.title}: economia estimada de ${formatMilliseconds(audit.savings)}.`,
        )
      : ['- Nenhuma oportunidade com economia mensurável foi identificada.']),
    '',
    '## Pontos de melhoria',
    '',
    ...(failedAudits.length
      ? failedAudits.map((audit) => `- ${audit.title}`)
      : [
          '- Nenhuma reprovação ponderada foi identificada em acessibilidade, boas práticas ou SEO.',
        ]),
    '',
  ]

  return lines.join('\n')
}

const reports = readReports()

if (!reports.length) {
  throw new Error('Nenhum relatório JSON válido do Lighthouse foi encontrado.')
}

const summary = buildSummary(reports)
fs.writeFileSync(summaryPath, summary, 'utf8')

const representativeReport = getMedianReport(reports)
const representativeHtml = path.join(
  reportsDirectory,
  representativeReport.__sourceFile.replace(/\.json$/, '.html'),
)

if (fs.existsSync(representativeHtml)) {
  fs.copyFileSync(representativeHtml, path.join(reportsDirectory, 'index.html'))
}

process.stdout.write(`${summary}\nResumo salvo em ${summaryPath}\n`)

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`, 'utf8')
}
