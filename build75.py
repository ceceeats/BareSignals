#!/usr/bin/env python3
"""Preview Body v75, from live Home v65 = Body v74: on phones the body box is 1 cm taller (+60 px, iPhone CSS px ~ 1/153 in),
always the same size (not growing per compound). Writes home/b75/index.html."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
css="<style>/* v75: phones get a 1 cm taller body box (stage row is 67% of the extra, so +100 px total) */@media (max-width:899px){html body .app{height:calc(100svh - var(--bsnav-h0,0px) + 100px)!important}}</style>\n</head>"
assert src.count("</head>")==1
src=src.replace("</head>",css,1)
old="<!doctype html><!-- Home v65 = Body v74 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Preview Body v75 (30 Oct 2026, not live): phone body box 1 cm taller, fixed. Built from Home v65 = Body v74 (30 Oct 2026):",1)
o=R/"home"/"b75"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
