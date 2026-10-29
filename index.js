/** Mulqi JBJBJB: portable, skills-first DeepSeek Harness bundle. */
export const name = 'mulqi-jbjbjb'
export const inject = ['skills']

const entry = (name, description, content) => ({
  name, description, source: 'runtime', content
})

export const skills = [
  entry('mulqi-review', 'Use when reviewing a code diff for concrete correctness, security, reliability, or regression issues.', `# Evidence-led code review

Review the actual diff and relevant surrounding code. Do not infer defects from style or unsupported hypotheticals.
For each finding, include severity, file and line, trigger/preconditions, practical impact, and a narrow fix.
Prioritize correctness, security, data loss, reliability, compatibility, and error handling before style.
Separate blocking defects from questions and low-priority suggestions.
If no supported finding exists, say so. Distinguish tests that passed, failed, were not run, or were unavailable.
Do not modify files unless the user requests a fix.`),
  entry('mulqi-debug', 'Use when diagnosing a bug or intermittent failure and root-cause evidence should precede edits.', `# Investigate before editing

Separate observed facts from hypotheses. Inspect repository instructions, failure output, logs, relevant implementation, state transitions, and nearby tests.
Rank hypotheses by evidence and by how cheaply each can be falsified. Reproduce when practical.
Do not edit while the user asked for diagnosis only. Otherwise, establish the mechanism before changing code unless time-critical containment is explicitly needed.
Report the root cause only at the confidence supported by evidence, include the next best experiment if unresolved, and never claim an unrun check.`),
  entry('mulqi-feature', 'Use when implementing a bounded software feature with explicit acceptance criteria and regression verification.', `# Bounded feature implementation

Inspect repository instructions, architecture, related code, public interfaces, and tests first.
Translate the stated request into observable acceptance criteria and non-goals; ask only when an essential ambiguity blocks safe implementation.
Reuse established patterns and ownership boundaries. Keep unrelated refactoring and new dependencies out of scope.
Implement the smallest coherent change, add or update focused tests, and run the nearest relevant checks.
Preserve user changes. Report files changed, verification evidence, and any unmet acceptance criteria. Do not claim tests passed without execution evidence.`),
  entry('mulqi-fix', 'Use when fixing a specific bug with the narrowest responsible code change and a regression test.', `# Focused bug fix

Reproduce the failure or capture the strongest available evidence before editing.
Trace the symptom to the responsible mechanism and change the narrowest appropriate layer.
Preserve unrelated behavior, interfaces, ordering, persistence, compatibility, and existing user changes.
Add a regression test for the trigger when practical. Run that test and the closest affected checks.
Never weaken tests to manufacture a pass. Stop when the issue is fixed and sufficiently verified; report wider checks not run.`),
  entry('mulqi-refactor', 'Use when restructuring code while preserving externally observable behavior and compatibility.', `# Behavior-preserving refactor

Define the behavior-preservation boundary. Inspect current behavior and run baseline checks when available.
Separate functional changes from structural moves. Refactor one ownership boundary at a time.
Preserve public interfaces, errors, ordering, concurrency, persistence, compatibility, and comments that remain relevant.
Avoid new dependencies and configuration unless required. Keep intermediate changes testable.
Run the same proof after the refactor plus focused regression checks. Report evidence and stop when requested structure and behavior match.`),
  entry('mulqi-migrate', 'Use when planning or performing a schema, API, protocol, configuration, or dependency migration.', `# Reversible migration planning

Map current readers and writers, data shapes, version compatibility, ownership, and rollback requirements first.
Define forward and rollback paths. Prefer expand, migrate, verify, then contract when versions overlap.
Make retries idempotent and partial failures observable. Test the transition stages and rollback where feasible.
Do not perform destructive contraction, data deletion, or irreversible cutover without clear authorization and a verified rollback/backup plan.
Document compatibility windows, operational risks, validation evidence, and the condition for each next step.`),
  entry('mulqi-verify', 'Use when checking whether requested work meets acceptance criteria and reporting precise proof and gaps.', `# Verify, report, stop

Convert acceptance criteria into the smallest sufficient proof set.
Use only results that match the current repository state. Run focused tests before broader checks.
Report each result as PASS, FAIL, BLOCKED, or NOT RUN. Include exact commands and concise evidence or failure reason.
Inspect package metadata, generated outputs, declared dependencies, path boundaries, and likely secrets when relevant.
Do not edit product code unless fixes are authorized. Stop once proof is sufficient and report unresolved risks; do not overstate verification.`),
  entry('mulqi-commit', 'Use when drafting a Conventional Commit message from a change summary or diff; do not execute Git operations.', `# Conventional Commit drafting

Draft a message only. Do not stage, commit, amend, push, or claim a Git operation occurred.
Use type(scope): imperative summary when appropriate. Common types: feat, fix, refactor, perf, docs, test, chore, build, ci, style, revert.
Prefer a concise subject under 72 characters without a trailing period. Describe intent rather than listing files.
Add a body for non-obvious rationale, breaking changes, migrations, or security implications.
Never invent issue numbers, authorship, or test results. Follow the repository's existing conventions when evident.`),
  entry('mulqi-workspace', 'Use when a repository task requires careful discovery, editing, and verification with host-native workspace tools.', `# Workspace operations

Use capabilities available in the current host; never invent tool calls or claim an operation occurred without evidence.
Discover first: read repository guidance, list relevant directories, search by concept, and use exact search for known symbols or fields.
Treat writes, patches, deletes, moves, shell mutations, Git operations, network changes, and deployments as state changes. Perform them only when authorized.
Prefer a focused patch over rewriting entire files. Preserve unrelated user changes and keep secrets out of source, logs, and examples.
Use shell for repository commands when available and Python for deterministic parsing or validation where it adds evidence. Report exactly what changed and which checks actually ran.`),
  entry('mulqi-prompt-design', 'Use when creating or improving prompts for a specific task, model, or harness without relying on instruction-bypass tactics.', `# Task-focused prompt design

Identify the target model/harness, user task, available context, expected output, and measurable success criteria.
Separate role, task, constraints, context, tools, output format, and examples. Keep instructions consistent and avoid redundant persona language.
Preserve the intended task, factual uncertainty, and relevant edge cases. Do not instruct the model to ignore higher-priority instructions, reveal hidden system prompts, or disable safeguards.
Test prompts with representative success cases, ambiguous cases, and negative cases. Compare results against explicit criteria rather than anecdotal success.
Record target versions and known limits. Do not claim cross-model compatibility without evidence.`),
  entry('mulqi-help', 'Use when the user asks which Mulqi JBJBJB skills exist or how to invoke them in DSH.', `# Mulqi JBJBJB help

This is a skills-first DeepSeek Harness bundle. It contributes instructions, not model weights, a proxy, provider routing, or tool permissions.
Available workflows:
- mulqi-review: code review
- mulqi-debug: evidence-led diagnosis
- mulqi-feature: bounded implementation
- mulqi-fix: focused bug fix
- mulqi-refactor: behavior-preserving refactor
- mulqi-migrate: reversible migration
- mulqi-verify: acceptance and regression verification
- mulqi-commit: Conventional Commit drafting only
- mulqi-workspace: workspace operations
- mulqi-prompt-design: task-specific prompt engineering
- mulqi-help: this help

Slash commands depend on the selected DSH profile's skill consumer. If unavailable, ask the agent to load a skill by name from the skill catalog or name the workflow explicitly in the request.
The bundle does not alter host policy or grant filesystem, shell, network, Git, or deployment privileges.`)
]

export function apply(ctx) {
  if (!ctx?.skills || typeof ctx.skills.register !== 'function') {
    throw new Error('mulqi-jbjbjb requires the DSH Skill Registry; enable a base-backed profile with skill support')
  }
  for (const skill of skills) ctx.skills.register({ ...skill })
}
