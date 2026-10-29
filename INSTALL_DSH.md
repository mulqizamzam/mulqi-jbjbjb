# Install and use Mulqi JBJBJB in DeepSeek Harness

Target: **DeepSeek Harness 0.2.1-rc.2**.

## 1. Prerequisites

- Node.js `^22.19.0 || >=24.0.0`.
- DSH `0.2.1-rc.2` with a base-backed profile that exposes the Skill Registry.
- A normal DSH model/provider configuration.

Verify the environment:

```bash
node --version
dsh --version
```

## 2. Install

Run:

```bash
dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

If DSH is not installed as a global command:

```bash
npx @deepseek-ai/dsh plugin --profile web add https://github.com/mulqizamzam/mulqi-jbjbjb
```

Replace `web` with your profile name. Follow the prompts and restart DSH or open a fresh session if requested.

## 3. Check the plugin was loaded

Inspect the composed configuration:

```bash
dsh web --dump-config
```

Look for the `mulqi-jbjbjb` plugin row. If it is missing, confirm the bundle was added to the same profile and review DSH's package loading errors.

This bundle needs the DSH skill registry. If there is no skills catalog, check that your profile uses a base-backed DSH setup with the skill services enabled.

## 4. Use a skill

Try these prompts in a DSH session:

```text
/mulqi-review Review the current diff for correctness, security, and regressions.
/mulqi-debug Diagnose why this test intermittently fails. Do not edit yet.
/mulqi-feature Add pagination with acceptance criteria and regression tests.
/mulqi-verify Verify the requested behavior and report exact commands and results.
```

Depending on the DSH profile's skill consumer, direct slash invocation may not be enabled. If a command is not recognized, ask the agent to load the named skill from its skill catalog or explicitly describe the workflow in the request.

## 5. Update

Use the installed DSH version's supported plugin command:

```bash
dsh plugin --profile web update mulqi-jbjbjb
```

If this command is unavailable in your DSH version, consult `dsh plugin --help` and use that version's documented update flow.

## 6. Remove

```bash
dsh plugin --profile web remove mulqi-jbjbjb
```

Restart the profile or open a new session after removal if required. Verify the package name against the profile's plugin listing.

## 7. Develop and verify

From a local checkout:

```bash
npm test
npm run validate
```

These package checks do not replace a smoke test against a live DSH 0.2.1-rc.2 runtime.

## Troubleshooting

- **`dsh` not found:** use the official DSH installation method or invoke the CLI with `npx`.
- **Compatibility rejected:** verify `dsh --version` and the `engines` field in `package.json`.
- **No skill catalog:** use a base-backed profile where the DSH Skill Registry is enabled.
- **Slash command not recognized:** check profile skill-consumer support, then load the named skill from the catalog.
- **Skill seems ignored:** start a fresh session and ask for the workflow explicitly; these are instructions, not a model capability or permission toggle.

## Safety and scope

This package does not change provider routing, grant tool permissions, or bypass DSH policies. Any write, shell, network, Git, or deployment action remains subject to the permissions and authorization rules of the host environment.
