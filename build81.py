#!/usr/bin/env python3
"""Home v81 = Body v81, from Home v80: research round 11 (gonadorelin, bromantane, pinealon). 4 study tags in studies.json,
7 community entries in community.json. Page code unchanged. Home v80 kept at /home/v80/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v80").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v80"/"index.html")
old = "<!doctype html><!-- Home v80 = Body v80 (31 Oct 2026):"; assert src.startswith(old)
src = src.replace(old, "<!doctype html><!-- Home v81 = Body v81 (31 Oct 2026): research round 11, 4 study tags (gonadorelin pituitary + sperm making, bromantane amygdala, pinealon neurons) and community data for all three. Home v80 kept at /home/v80/. Earlier: Home v80 = Body v80 (31 Oct 2026):", 1)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
