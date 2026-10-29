#!/usr/bin/env python3
"""Home v58 = Body v63, from live Home v57 (kept at /home/v57/): fixes the zoom.
Since Body v62 the ear skin sat before the body skin, so the body-width measure (skinExt) took the first skin shape, an ear,
and the camera framing: the body zoomed into the chest and labels landed on organs.
Skin shapes are now listed body first, ears last; ears still light and glow."""
import pathlib, sys, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v57").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v57"/"index.html")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub("const sk=s.querySelector('.film[data-k=\"skin\"]')||", "const sk=s.querySelector('.film[data-k=\"skin\"]:not(.earskin)')||")
sub("<!doctype html><!-- Home v57 = Body v62 (29 Oct 2026):",
    "<!doctype html><!-- Home v58 = Body v63 (29 Oct 2026): zoom fixed: the body-width measure skips the ear skin, so the camera frames on the body again (Body v62 had framed on an ear, zooming into the chest with labels over organs). Home v57 kept at /home/v57/. Earlier: Home v57 = Body v62 (29 Oct 2026):")
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
