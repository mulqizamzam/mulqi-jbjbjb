import test from 'node:test'
import assert from 'node:assert/strict'
import * as pluginModule from '../index.js'
import { skills, apply, name, inject } from '../index.js'

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

test('declares DSH bundle identity and skills injection', () => {
  assert.equal(name, 'mulqi-jbjbjb')
  assert.deepEqual(inject, ['skills'])
  assert.equal('default' in pluginModule, false)
})

test('registers unique and well-formed workflow skills', () => {
  const expected = [
    'mulqi-review', 'mulqi-debug', 'mulqi-feature', 'mulqi-fix',
    'mulqi-refactor', 'mulqi-migrate', 'mulqi-verify', 'mulqi-commit',
    'mulqi-workspace', 'mulqi-prompt-design', 'mulqi-help'
  ]
  assert.deepEqual(skills.map(skill => skill.name), expected)
  assert.equal(new Set(skills.map(skill => skill.name)).size, expected.length)
  for (const skill of skills) {
    assert.match(skill.name, kebab)
    assert.ok(skill.description.trim().length >= 15)
    assert.equal(typeof skill.source, 'string')
    assert.equal(skill.source, 'runtime')
    assert.ok(skill.content.trim().length >= 100)
  }
})

test('apply registers every skill through the DSH registry', () => {
  const registered = []
  apply({ skills: { register(skill) { registered.push(skill) } } })
  assert.deepEqual(registered.map(skill => skill.name), skills.map(skill => skill.name))
})

test('apply fails clearly when DSH Skill Registry is absent', () => {
  assert.throws(() => apply({}), /requires the DSH Skill Registry/)
  assert.throws(() => apply(null), /requires the DSH Skill Registry/)
})

test('workflow text preserves honest verification and authorization boundaries', () => {
  const all = skills.map(skill => skill.content).join('\n')
  assert.match(all, /PASS, FAIL, BLOCKED, or NOT RUN/)
  assert.match(all, /only when authorized/)
  assert.match(all, /Do not perform destructive contraction/)
  assert.match(all, /higher-priority instructions/)
  assert.match(all, /Do not stage, commit, amend, push/)
})
