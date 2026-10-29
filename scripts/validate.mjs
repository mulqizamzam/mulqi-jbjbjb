import { readFile, readdir, lstat } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const required = [
  'README.md', 'README.en.md', 'INSTALL_DSH.md', 'NOTICE.md', 'LICENSE',
  'package.json', 'index.js', 'cordis.patch.yml', 'assets/icon.svg',
  'docs/DISCOVERY.md', 'tests/plugin.spec.mjs'
]
const errors = []
for (const file of required) {
  try { await readFile(path.join(root, file)) }
  catch { errors.push(`missing required file: ${file}`) }
}

let pkg
try { pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8')) }
catch (err) {
  console.error(`FAIL: package.json: ${err.message}`)
  process.exit(1)
}
const checks = [
  ['package name', pkg.name === 'mulqi-jbjbjb'],
  ['target version', pkg.version === '0.2.1-rc.2'],
  ['DSH range', pkg.engines?.dsh === '0.2.1-rc.2'],
  ['bundle patch', pkg.dsh?.bundle?.patch === './cordis.patch.yml'],
  ['entry point', pkg.main === './index.js'],
  ['license', pkg.license === 'MIT']
]
for (const [label, ok] of checks) if (!ok) errors.push(`metadata failed: ${label}`)

let source = ''
try { source = await readFile(path.join(root, 'index.js'), 'utf8') }
catch {}
const expectedSkills = [
  'mulqi-review', 'mulqi-debug', 'mulqi-feature', 'mulqi-fix',
  'mulqi-refactor', 'mulqi-migrate', 'mulqi-verify', 'mulqi-commit',
  'mulqi-workspace', 'mulqi-prompt-design', 'mulqi-help'
]
for (const skill of expectedSkills) {
  if (!source.includes(`entry('${skill}'`)) errors.push(`missing skill: ${skill}`)
}
if (!source.includes("export const inject = ['skills']")) errors.push('DSH skills injection declaration missing')
if (!source.includes('ctx.skills.register')) errors.push('Skill Registry registration missing')

async function walk(dir) {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    const rel = path.relative(root, full)
    const st = await lstat(full)
    if (st.isSymbolicLink()) errors.push(`symlink not allowed: ${rel}`)
    if (ent.isDirectory()) {
      if (['node_modules', '.git', '__pycache__'].includes(ent.name)) errors.push(`unexpected directory: ${rel}`)
      await walk(full)
    } else if (ent.name.endsWith('.pyc') || ent.name.endsWith('.pyo') || ent.name === '.env') {
      errors.push(`unexpected transient/secret-shaped file: ${rel}`)
    }
  }
}
await walk(root)

if (errors.length) {
  for (const error of errors) console.error(`FAIL: ${error}`)
  process.exit(1)
}
console.log(`PASS: required files (${required.length})`)
console.log(`PASS: package metadata (${checks.length} checks)`)
console.log(`PASS: DSH Skill Registry and skill declarations (${expectedSkills.length} skills)`)
console.log('PASS: no detected symlinks, bytecode, node_modules, or .env files')
