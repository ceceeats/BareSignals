#!/usr/bin/env python3
"""Home v66 = Body v76, from live Home v65 = Body v74: (1) fix: when the body is drawn smaller to fit labels, the labels
stay visible (Body v74 cancelled the zoom that turns them on, so on small phones they could vanish);
(2) phones get a 1 cm taller body box (fixed, not growing). Home v65 kept at /home/v65/."""
import pathlib, sys, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b75"/"index.html").read_text(encoding="utf-8")
a='cancelAnimationFrame(anim);s.__shrk=(s.__shrk||1)*1.08;s.setAttribute("viewBox",sumFrame(s).join(" "));return drawTags(s);}'
assert src.count(a)==1
src=src.replace(a,'cancelAnimationFrame(anim);s.__shrk=(s.__shrk||1)*1.08;s.setAttribute("viewBox",sumFrame(s).join(" "));s.classList.add("show");return drawTags(s);}')
old="<!doctype html><!-- Preview Body v75 (30 Oct 2026, not live):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Home v66 = Body v76 (30 Oct 2026): labels stay visible when the body is drawn smaller to fit (v74 bug); phone body box 1 cm taller, fixed. Home v65 kept at /home/v65/. From preview Body v75:",1)
o=R/"home"/"b76"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
