#!/usr/bin/env python3
"""Home v68 = Body v78, from live Home v67 = Body v77: on phones the search box sits 16 px under the body box,
the same margin as the top and sides (was 26 px: three empty rows with 6 px gaps above it); the peptide list gains the space.
Home v67 kept at /home/v67/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v67").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v67"/"index.html")
assert src.count("</head>")==1
src=src.replace("</head>","<style>/* v78: phone search box margin = top and side margin (16 px) */@media (max-width:899px){html body .side{row-gap:0!important}html body .side>#panel{margin-top:8px}}</style>\n</head>",1)
old="<!doctype html><!-- Home v67 = Body v77 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Home v68 = Body v78 (30 Oct 2026): phone search box 16 px under the body box, same as top and side margins; peptide list gets the space. Home v67 kept at /home/v67/. Earlier: Home v67 = Body v77 (30 Oct 2026):",1)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
