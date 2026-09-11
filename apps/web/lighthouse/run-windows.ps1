$ErrorActionPreference = 'Stop'

$webRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$reportsPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'reports'))
$tempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$profilePath = [System.IO.Path]::GetFullPath((Join-Path $tempRoot ('qa-lighthouse-profile-{0}' -f [guid]::NewGuid().ToString('N'))))
$chromeOutput = [System.IO.Path]::GetFullPath((Join-Path $webRoot '.lighthouseci\chrome-output.log'))
$chromeError = [System.IO.Path]::GetFullPath((Join-Path $webRoot '.lighthouseci\chrome-error.log'))
$lighthouseCli = Join-Path $webRoot 'node_modules\lighthouse\cli\index.js'
$serveCli = 'node_modules\serve\build\main.js'
$targetUrl = 'http://localhost:3000/admin/login'
$chromePort = Get-Random -Minimum 9223 -Maximum 19999
$webServer = $null
$chrome = $null

if (-not $reportsPath.StartsWith($webRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'O diretorio de relatorios esta fora da pasta Web.'
}

if (-not $profilePath.StartsWith($tempRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'O perfil temporario do Chrome esta fora da pasta temporaria do Windows.'
}

New-Item -ItemType Directory -Force -Path $reportsPath, $profilePath | Out-Null
Get-ChildItem -LiteralPath $reportsPath -File -ErrorAction SilentlyContinue | Remove-Item -Force

$chromePath = $env:CHROME_PATH
if (-not $chromePath) {
  $chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
}

if (-not (Test-Path -LiteralPath $chromePath)) {
  throw 'Google Chrome nao encontrado. Defina CHROME_PATH com o caminho do executavel.'
}

try {
  try {
    Invoke-WebRequest -Uri $targetUrl -UseBasicParsing -TimeoutSec 2 | Out-Null
  } catch {
    $webServer = Start-Process -FilePath 'node' -ArgumentList $serveCli, '-s', 'dist', '-l', '3000' -WorkingDirectory $webRoot -PassThru -WindowStyle Hidden

    $serverReady = $false
    1..30 | ForEach-Object {
      if (-not $serverReady) {
        try {
          Invoke-WebRequest -Uri $targetUrl -UseBasicParsing -TimeoutSec 1 | Out-Null
          $serverReady = $true
        } catch {
          Start-Sleep -Milliseconds 500
        }
      }
    }

    if (-not $serverReady) {
      throw 'A aplicacao Web nao respondeu em http://localhost:3000.'
    }
  }

  $chromeArguments = @(
    '--headless=new'
    '--disable-gpu'
    '--disable-gpu-sandbox'
    '--disable-gpu-shader-disk-cache'
    '--disable-gpu-program-cache'
    '--no-sandbox'
    '--disable-dev-shm-usage'
    '--remote-debugging-address=127.0.0.1'
    "--remote-debugging-port=$chromePort"
    "--user-data-dir=`"$profilePath`""
    '--no-first-run'
    '--no-default-browser-check'
  )
  $chrome = Start-Process -FilePath $chromePath -ArgumentList $chromeArguments -RedirectStandardOutput $chromeOutput -RedirectStandardError $chromeError -PassThru -WindowStyle Hidden

  $chromeReady = $false
  1..30 | ForEach-Object {
    if (-not $chromeReady) {
      try {
        if ($chrome.HasExited) {
          throw "Chrome foi encerrado antes de disponibilizar o DevTools (codigo $($chrome.ExitCode))."
        }

        $devTools = Invoke-WebRequest -Uri "http://127.0.0.1:$chromePort/json/version" -UseBasicParsing -TimeoutSec 1
        $chromeReady = $devTools.StatusCode -eq 200
      } catch {
        $chromeReady = $false
      }

      if (-not $chromeReady) {
        Start-Sleep -Milliseconds 500
      }
    }
  }

  if (-not $chromeReady) {
    throw "O Chrome headless nao respondeu na porta $chromePort."
  }

  1..3 | ForEach-Object {
    Write-Host "Executando auditoria Lighthouse $_/3..." -ForegroundColor Cyan
    $outputBase = Join-Path $reportsPath "run-$_"
    & node $lighthouseCli $targetUrl "--port=$chromePort" '--output=json' '--output=html' "--output-path=$outputBase" '--preset=desktop' '--quiet'

    if ($LASTEXITCODE -ne 0) {
      throw "A execucao $_ do Lighthouse falhou."
    }

    Write-Host "Auditoria $_/3 concluida." -ForegroundColor Green
  }
} finally {
  if ($chrome -and -not $chrome.HasExited) {
    Stop-Process -Id $chrome.Id -Force -ErrorAction SilentlyContinue
    $chrome.WaitForExit(5000) | Out-Null
  }

  if ($webServer -and -not $webServer.HasExited) {
    Stop-Process -Id $webServer.Id -Force -ErrorAction SilentlyContinue
  }

  if (Test-Path -LiteralPath $profilePath) {
    Remove-Item -LiteralPath $profilePath -Recurse -Force -ErrorAction SilentlyContinue
  }
}

& node (Join-Path $PSScriptRoot 'summarize.cjs')
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host 'Auditoria Lighthouse concluida. Relatorios disponiveis em lighthouse/reports.' -ForegroundColor Green
