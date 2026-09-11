const path = require('path')
const { spawnSync } = require('child_process')

const webDirectory = path.resolve(__dirname, '..')
const isWindows = process.platform === 'win32'
const command = isWindows ? 'powershell.exe' : process.execPath
const args = isWindows
  ? ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', path.join(__dirname, 'run-windows.ps1')]
  : [path.join(webDirectory, 'node_modules', '@lhci', 'cli', 'src', 'cli.js'), 'autorun']

const audit = spawnSync(command, args, {
  cwd: webDirectory,
  env: process.env,
  stdio: 'inherit',
})

if (audit.error) throw audit.error
if (audit.status !== 0) process.exit(audit.status || 1)

if (!isWindows) {
  const summary = spawnSync(process.execPath, [path.join(__dirname, 'summarize.cjs')], {
    cwd: webDirectory,
    env: process.env,
    stdio: 'inherit',
  })

  if (summary.error) throw summary.error
  if (summary.status !== 0) process.exit(summary.status || 1)
}
