#!/usr/bin/env python3
"""Preview Body v65 = preview Body v64 (ear glow) + long names wrap: the name box never reaches past the
summary column, which already stops before the head (Tesamorelin + Ipamorelin and other long names wrap to
two lines instead of running into the head). Writes home/b65/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b64"/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub(".ctags .nhead .nchip{border-top:0}", ".ctags .nhead .nchip{border-top:0}.ctags .nhead{max-width:100%!important}")
sub("<!-- Preview Body v64 (29 Oct 2026, not live): ears glow with the skin, nothing else changed.", "<!-- Preview Body v65 (29 Oct 2026, not live): long compound names wrap inside the summary column so they never reach the head; plus Body v64 ear glow.")
o=R/"home"/"b65"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
