#!/usr/bin/env python3
"""Static validator for the Mulqi JBJBJB DSH bundle."""
from pathlib import Path
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
required = [
    "README.md", "README.en.md", "INSTALL_DSH.md", "NOTICE.md", "LICENSE",
    "package.json", "index.js", "cordis.patch.yml", "assets/icon.svg",
    "docs/DISCOVERY.md", "tests/plugin.spec.mjs",
]
errors = []
for item in required:
    if not (ROOT / item).is_file():
        errors.append(f"missing required file: {item}")
try:
    pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
except Exception as exc:
    print(f"FAIL: package.json: {exc}")
    sys.exit(1)

checks = {
    "package name": pkg.get("name") == "mulqi-jbjbjb",
    "version": pkg.get("version") == "0.2.1-rc.2",
    "DSH engine": pkg.get("engines", {}).get("dsh") == "0.2.1-rc.2",
    "Node engine": pkg.get("engines", {}).get("node") == "^22.19.0 || >=24.0.0",
    "bundle patch": pkg.get("dsh", {}).get("bundle", {}).get("patch") == "./cordis.patch.yml",
    "entry point": pkg.get("main") == "./index.js",
    "license": pkg.get("license") == "MIT",
}
for label, ok in checks.items():
    if not ok:
        errors.append(f"metadata check failed: {label}")

source = (ROOT / "index.js").read_text(encoding="utf-8") if (ROOT / "index.js").is_file() else ""
skills = [
    "mulqi-review", "mulqi-debug", "mulqi-feature", "mulqi-fix",
    "mulqi-refactor", "mulqi-migrate", "mulqi-verify", "mulqi-commit",
    "mulqi-workspace", "mulqi-prompt-design", "mulqi-help",
]
for skill in skills:
    if not re.search(r"entry\('" + re.escape(skill) + r"'", source):
        errors.append(f"missing skill declaration: {skill}")
if "export const inject = ['skills']" not in source:
    errors.append("missing DSH Skill Registry injection")
for file in ["index.js", "cordis.patch.yml", "README.md", "INSTALL_DSH.md", "assets/icon.svg"]:
    if file not in pkg.get("files", []):
        errors.append(f"package files omit {file}")

for path in ROOT.rglob("*"):
    if path.is_symlink():
        errors.append(f"symlink not allowed: {path.relative_to(ROOT)}")
    if path.name == ".env" or path.suffix in {".pyc", ".pyo"} or "__pycache__" in path.parts:
        errors.append(f"transient or secret-shaped file not allowed: {path.relative_to(ROOT)}")

if errors:
    for error in errors:
        print(f"FAIL: {error}")
    sys.exit(1)
print(f"PASS: required files ({len(required)})")
print(f"PASS: package metadata ({len(checks)} checks)")
print(f"PASS: expected skill declarations ({len(skills)})")
print("PASS: required runtime and beginner docs are packaged")
print("PASS: no detected symlinks, bytecode, or .env files")
