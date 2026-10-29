#!/usr/bin/env python3
"""Build a deterministic source ZIP with fixed timestamps, order, and permissions."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED, ZipInfo
import hashlib
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT.parent / "mulqi-jbjbjb-0.2.1-rc.2.zip"
files = sorted(
    p for p in ROOT.rglob("*")
    if p.is_file()
    and not p.is_symlink()
    and ".git" not in p.parts
    and "__pycache__" not in p.parts
    and p.suffix not in {".pyc", ".pyo"}
    and p.name != ".env"
)
with ZipFile(OUTPUT, "w") as archive:
    for p in files:
        relative = p.relative_to(ROOT).as_posix()
        info = ZipInfo(f"mulqi-jbjbjb/{relative}", date_time=(2026, 1, 1, 0, 0, 0))
        info.compress_type = ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, p.read_bytes(), compress_type=ZIP_DEFLATED, compresslevel=9)
digest = hashlib.sha256(OUTPUT.read_bytes()).hexdigest()
print(f"PACKAGE={OUTPUT}")
print(f"FILES={len(files)}")
print(f"SIZE={OUTPUT.stat().st_size}")
print(f"SHA256={digest}")
