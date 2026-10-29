import test from 'node:test'
import assert from 'node:assert/strict'
import { skills, apply, name, inject } from '../index.js'

test('declares DSH bundle identity and skills injection', () => {
  assert.equal(name, 'mulqi-jbjbjb')
  assert.deepEqual(inject, ['skills'])
})

test('registers all unique documented workflows', () => {
  const expected = [
    'mulqi-review', 'mulqi-debug', 'mulqi-feature', 'mulqi-fix',
    'mulqi-refactor', 'mulqi-migrate', 'mulqi-verify', 'mulqi-commit',
    'mulqi-workspace', 'mulqi-prompt-design', 'mulqi-help'
  ]
  assert.deepEqual(skills.map(skill => skill.name), expected)
  assert.equal(new Set(skills.map(skill => skill.name)).size, expected.length)
  for (const skill of skills) {
    assert.ok(skill.description.length > 20, `description too short for ${skill.name}`)
    assert.ok(skill.content.length > 80, `skill content too short for ${skill.name}`)
    assert.equal(skill.source, 'runtime')
  }
})

test('apply registers every skill through the DSH registry', () => {
  const registered = []
  apply({ skills: { register: item => registered.push(item) } })
  assert.deepEqual(registered.map(item => item.name), skills.map(item => item.name))
})

test('apply fails clearly when DSH skill registry is absent', () => {
  assert.throws(() => apply({}), /requires the DSH Skill Registry/)
  assert.throws(() => apply(null), /requires the DSH Skill Registry/)
})

test('workflow instructions preserve honest verification and authorization boundaries', () => {
  const byName = Object.fromEntries(skills.map(skill => [skill.name, skill.content]))
  assert.match(byName['mulqi-verify'], /PASS, FAIL, BLOCKED, or NOT RUN/)
  assert.match(byName['mulqi-workspace'], /only when authorized/)
  assert.match(byName['mulqi-migrate'], /Do not perform destructive contraction/)
  assert.match(byName['mulqi-prompt-design'], /higher-priority instructions/)
  assert.match(byName['mulqi-commit'], /Do not stage, commit, amend, push/)
})
