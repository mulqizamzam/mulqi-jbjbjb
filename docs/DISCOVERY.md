# Plugin Autopilot — Discovery and Conversion Brief

## Source inspected

- Repository: https://github.com/togg53192-cmd/jailbreaks
- Default branch inspected: `main`
- Primary README and representative DeepSeek, unified assistant-policy, and coding-agent instruction files reviewed.

## Findings

The source is a curated prompt collection with model-specific system prompts, workspace policies, agent operating specifications, and configuration examples. It is not an executable plugin with one API surface. The port therefore compiles repeated engineering behaviours into task-oriented DSH skills rather than copying every model-specific prompt.

## Candidate disposition

| Candidate workflow | Disposition | Rationale |
|---|---|---|
| Code review | preserve_skill | Repeatable task with evidence-based findings and narrow fixes |
| Diagnose/debug | preserve_skill | Requires a clear trigger, hypothesis ranking, evidence and stop condition |
| Feature implementation | compile_skill | Bounded requirements, acceptance criteria and focused tests |
| Focused bug fix | compile_skill | Narrow implementation workflow with regression proof |
| Behaviour-preserving refactor | compile_skill | Distinct completion condition: same observable behaviour |
| Schema/API/config migration | compile_skill | Reversible stages and explicit authorization for destructive cutover |
| Verification/reporting | preserve_skill | Evidence categories and honest test status are valuable reusable logic |
| Conventional Commit drafting | preserve_skill | Useful productivity task; explicitly does not mutate Git |
| Workspace/repository operations | compile_skill | Portable host-capability guidance; discovery separated from mutation |
| Prompt design | compile_skill | Model/version-aware prompt development without instruction bypasses |
| Help/skill inventory | preserve_skill | Discoverability for first-time users |
| Generic style/persona-only prompts | reference_only | Not necessary for the primary engineering/productivity job |
| Instructions to ignore higher-priority policies or disable safeguards | discard | Excluded from public package |
| Unbounded credential theft, persistence, exploitation or malware instructions | discard | Not required for the selected legitimate productivity product |
| Model-specific speculative capabilities/version claims | reference_only | No unverified claims made in the DSH-native bundle |
| Runtime network/backend dependency | discard | The product operates as instruction-only DSH skills |

## Architecture

- **Recommendation:** DSH-native skills-first bundle.
- **Confidence:** High for a workflow/prompt port; no external runtime is needed for the selected jobs.
- **Target:** DeepSeek Harness `0.2.1-rc.2`.
- **Runtime dependencies:** DSH Skill Registry supplied by a base-backed profile; Node.js range matches the target profile requirements.
- **Files:** `index.js`, `package.json`, `cordis.patch.yml`, README/installation guides, tests, static validator and icon.
- **Workspace profile:** read/list/search/grep for discovery; write/patch only when authorized; shell for tests/verification; Python for deterministic checks when available.
- **Mutation boundary:** no automatic destructive operations, Git commits, deployments, or permission changes.
- **External apps/MCP:** not required.

## Public exclusions

The package excludes source text whose operational purpose is to override higher-priority instructions, suppress safeguards, or direct harmful activity without bounds. It does not ship any upstream repository wholesale. See `NOTICE.md`.

## Evidence limits

A repository README and representative files were inspected via GitHub. No claim is made that all source prompts were tested against their target models. A running DSH `0.2.1-rc.2` integration smoke test remains a release gate.
