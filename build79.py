#!/usr/bin/env python3
"""Home v69 = Body v79, from live Home v68 = Body v78: the default body view gets more room above the head and
below the feet inside the box (home view padding top 0.4% -> 2.3%, total height 101.6% -> 104.6%), so the figure no longer
nearly touches the box. Home v68 kept at /home/v68/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v68").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v68"/"index.html")
a="VB0[id]=[x-px,y-h*.004,w+2*px,h*1.016];"
assert src.count(a)==1
src=src.replace(a,"VB0[id]=[x-px,y-h*.023,w+2*px,h*1.046];")
old="<!doctype html><!-- Home v68 = Body v78 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Home v69 = Body v79 (30 Oct 2026): default body view has more margin above the head and below the feet. Home v68 kept at /home/v68/. Earlier: Home v68 = Body v78 (30 Oct 2026):",1)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
