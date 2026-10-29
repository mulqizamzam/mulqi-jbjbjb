# Mulqi JBJBJB

A skills-first plugin bundle for DeepSeek Harness `0.2.1-rc.2`, focused on reliable software engineering, developer productivity, and evidence-based verification.

## Install

```bash
dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

Requires Node.js `^22.19.0 || >=24.0.0`, DSH `0.2.1-rc.2`, and a profile with Skill Registry support.

## Skills

`mulqi-review`, `mulqi-debug`, `mulqi-feature`, `mulqi-fix`, `mulqi-refactor`, `mulqi-migrate`, `mulqi-verify`, `mulqi-commit`, `mulqi-workspace`, `mulqi-prompt-design`, and `mulqi-help`.

See [README.md](README.md) for the full beginner guide and [INSTALL_DSH.md](INSTALL_DSH.md) for installation, updates, removal, and troubleshooting.

## Scope

This bundle contributes instructions and does not grant host permissions, change model routing, or disable DSH policies. It is an independent port inspired by selected engineering and productivity workflows in [togg53192-cmd/jailbreaks](https://github.com/togg53192-cmd/jailbreaks). See [NOTICE.md](NOTICE.md). Not an official DeepSeek release.

## Development

```bash
npm test
npm run validate
```

Local checks do not replace a live DSH integration smoke test.
