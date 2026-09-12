param(
  [ValidateSet('smoke', 'load')]
  [string]$Profile = 'load',
  [string]$BaseUrl = 'http://localhost:3030'
)

$ErrorActionPreference = 'Stop'
$repositoryRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..'))
$scriptPath = Join-Path $PSScriptRoot 'api-performance.js'
$resultsPath = Join-Path $PSScriptRoot 'results'

if (-not (Get-Command k6 -ErrorAction SilentlyContinue)) {
  throw 'k6 nao encontrado. Instale com: winget install k6 --source winget'
}

try {
  $health = Invoke-RestMethod -Uri "$($BaseUrl.TrimEnd('/'))/api/health" -TimeoutSec 5
  if ($health.status -ne 'ok' -or $health.database -ne 'connected') {
    throw 'A API respondeu, mas o ambiente nao esta operacional.'
  }
} catch {
  throw "API indisponivel em $BaseUrl. Inicie PostgreSQL e API antes do k6. $($_.Exception.Message)"
}

New-Item -ItemType Directory -Force -Path $resultsPath | Out-Null
$env:K6_PROFILE = $Profile
$env:BASE_URL = $BaseUrl
$env:K6_RESULTS_DIR = 'performance/k6/results'

Push-Location $repositoryRoot
try {
  & k6 run $scriptPath
  if ($LASTEXITCODE -ne 0) {
    throw "O teste k6 terminou com codigo $LASTEXITCODE. Consulte performance/k6/results/summary.md."
  }
} finally {
  Pop-Location
}
