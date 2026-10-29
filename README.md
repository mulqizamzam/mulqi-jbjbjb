# Mulqi JBJBJB

**DeepSeek Harness bundle `0.2.1-rc.2`**

A skills-first DeepSeek Harness (DSH) bundle for reliable software engineering and everyday developer productivity. It organizes reusable workflows for code review, debugging, feature implementation, focused fixes, refactoring, migrations, prompt design, and verification.

> **Scope:** This is a DSH-native plugin bundle, not an AI model, jailbreak bypass, or permission escalation. It provides instruction skills; it does not grant filesystem, shell, network, or deployment permissions, alter provider routing, or disable host policies.

**New to DSH?** Start with the [Indonesian beginner guide](README.id.md). English setup, update, and removal instructions: [INSTALL_DSH.md](INSTALL_DSH.md).

## What is included

| Skill | Use it for |
|---|---|
| `mulqi-review` | Review a diff for actionable correctness, security, and regression issues |
| `mulqi-debug` | Diagnose the root cause before editing |
| `mulqi-feature` | Implement bounded features with acceptance criteria and tests |
| `mulqi-fix` | Make the narrowest evidence-based bug fix |
| `mulqi-refactor` | Restructure code while preserving behavior |
| `mulqi-migrate` | Plan compatibility-aware, reversible migrations |
| `mulqi-verify` | Verify deliverables and report evidence accurately |
| `mulqi-commit` | Draft Conventional Commit messages without executing Git mutations |
| `mulqi-workspace` | Inspect and update files using host-native workspace tools when available |
| `mulqi-prompt-design` | Design and evaluate task-specific prompts without relying on policy bypasses |
| `mulqi-help` | List skills and usage guidance |

## Quick start

### Requirements

- DeepSeek Harness **`0.2.1-rc.2`**.
- Node.js `^22.19.0 || >=24.0.0`.
- A working DSH profile with skills support and a model/provider configured normally.

Check your setup:

```bash
node --version
dsh --version
dsh --profile web "Say hello in one sentence."
```

### Install from GitHub

```bash
dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

If you use DSH through npx rather than a global CLI:

```bash
npx @deepseek-ai/dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

Use your own profile name instead of `web` when needed. Follow DSH's prompts and restart the profile or open a fresh session if requested.

## Use a skill

In a DSH session, request the skill with a slash command if your selected profile's skill consumer supports it:

```text
/mulqi-review Review the current diff for correctness and security issues.

/mulqi-debug Diagnose this intermittent test failure. Do not edit until the cause is supported by evidence.

/mulqi-feature Add pagination with explicit acceptance criteria and regression tests.

/mulqi-verify Check the acceptance criteria and report the exact commands run.
```

Skill slash-command availability depends on the DSH profile's skill consumer. If a slash command is not recognized, ask the agent to load the named skill from the available skill catalog, or explicitly state the workflow name in your request.

## Configuration

The bundle uses DSH's `dsh.bundle.patch` mechanism and registers one enabled bundle row. It requires no extra API key, telemetry service, or external backend. DSH still needs its usual model/provider configuration.

The bundle is instruction-only. Any file edits, shell commands, network operations, Git mutations, or deployments remain governed by the host tools, project instructions, and required authorizations.

## Development and verification

```bash
npm test
npm run validate
python3 scripts/validate.py
python3 scripts/package.py /tmp/mulqi-jbjbjb.zip
```

Local tests do not replace a smoke test in a running DSH `0.2.1-rc.2` instance.

## License and attribution

Licensed under MIT. This is an independent, reconciled port of selected engineering and productivity workflows inspired by [togg53192-cmd/jailbreaks](https://github.com/togg53192-cmd/jailbreaks). See [NOTICE.md](NOTICE.md) for scope and attribution details.

This project is not an official DeepSeek release and does not guarantee identical behavior across models, profiles, or DSH versions.
