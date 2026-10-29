import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const required = [
  'README.md', 'README.id.md', 'README.en.md', 'INSTALL_DSH.md',
  'NOTICE.md', 'LICENSE', 'CHANGELOG.md', 'package.json', 'index.js',
  'cordis.patch.yml', 'assets/icon.svg', 'docs/DISCOVERY.md',
  'scripts/validate.mjs', 'scripts/validate.py', 'scripts/package.py',
  'tests/plugin.spec.mjs', '.github/workflows/validate.yml'
]
const errors = []
for (const file of required) {
  try { await readFile(path.join(root, file)) }
  catch { errors.push(`missing file: ${file}`) }
}

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
if (pkg.version !== '0.2.1-rc.2') errors.push('wrong version')
if (pkg.name !== 'mulqi-jbjbjb') errors.push('wrong package name')
if (pkg.dsh?.bundle?.patch !== './cordis.patch.yml') errors.push('wrong DSH bundle patch path')

const test = spawnSync(process.execPath, ['--test', 'tests/plugin.spec.mjs'], {
  cwd: root, encoding: 'utf8'
})
if (test.status !== 0) errors.push('unit tests failed: ' + (test.stderr || test.stdout))

const validate = spawnSync(process.execPath, ['scripts/validate.mjs'], {
  cwd: root, encoding: 'utf8'
})
if (validate.status !== 0) errors.push('validator failed: ' + (validate.stderr || validate.stdout))

if (errors.length) {
  for (const error of errors) console.error('FAIL: ' + error)
  process.exit(1)
}
console.log('PASS: required release files (' + required.length + ')')
console.log('PASS: unit tests')
console.log('PASS: static validator')
