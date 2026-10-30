#!/usr/bin/env python3
"""Home v67 = Body v77, from live Home v66 = Body v76: the organ category boxes on top of the body box
(Brain 77, Heart & vessels 42, Lungs, Liver, Gut...) are removed on phone and laptop; tapping the body still picks a part.
Home v66 kept at /home/v66/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v66").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v66"/"index.html")
assert src.count("</head>")==1
src=src.replace("</head>","<style>/* v77: organ category boxes above the body removed */#topsys{display:none!important}</style>\n</head>",1)
old="<!doctype html><!-- Home v66 = Body v76 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Home v67 = Body v77 (30 Oct 2026): organ category boxes above the body removed (phone and laptop). Home v66 kept at /home/v66/. Earlier: Home v66 = Body v76 (30 Oct 2026):",1)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
