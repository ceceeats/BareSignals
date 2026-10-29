#!/usr/bin/env python3
"""Preview Body v68 = preview Body v66 (ear glow + Pairs well with) + bottom-right controls on the margin lines:
F/M and the zoom glass right-aligned with Random at the same 7 px margin the summary and legend use, with even 4 px gaps.
(Body v67's label slide-up guard is dropped: it did not stop the overflow.) Writes home/b68/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b66"/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub(".bscard .syn li{margin-bottom:4px}", ".bscard .syn li{margin-bottom:4px}#zctl.fl{right:6px!important;bottom:41px!important;gap:4px!important}#zctl.fl>.zb.ico{align-self:flex-end!important}")
sub("<!-- Preview Body v66 (30 Oct 2026, not live):", "<!-- Preview Body v68 (30 Oct 2026, not live): bottom-right controls (zoom glass, F/M) right-aligned with Random on the 7 px margin, even 4 px gaps. Plus Body v66:")
o=R/"home"/"b68"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
