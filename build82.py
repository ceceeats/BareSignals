#!/usr/bin/env python3
"""Home v82 = Body v82, from Home v81: Random and Undo no longer scroll the page down to the peptide's chip
(that pushed the body box up under the nav, covering the head). The body stays put; only the list's own box scrolls to the chip.
Home v81 kept at /home/v81/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v81").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v81"/"index.html")
old = "<!doctype html><!-- Home v81 = Body v81 (31 Oct 2026):"; assert src.startswith(old)
src = src.replace(old, "<!doctype html><!-- Home v82 = Body v82 (2 Nov 2026): Random and Undo keep the page still (no jump down to the list chip, which slid the body box up under the nav and covered the head). Home v81 kept at /home/v81/. Earlier: Home v81 = Body v81 (31 Oct 2026):", 1)
jump = 'const b=document.querySelector(`#list .cchip[data-s="${c.s}"]`);if(b)b.scrollIntoView({block:"nearest",behavior:"smooth"});};'
assert src.count(jump) == 2, src.count(jump)
fix = 'const b=document.querySelector(`#list .cchip[data-s="${c.s}"]`),LB=$("list");if(b&&LB){const r=b.getBoundingClientRect(),q=LB.getBoundingClientRect(),vb=Math.min(q.bottom,innerHeight-90),vt=Math.max(q.top,0);if(vb-vt>r.height&&(r.top<vt||r.bottom>vb))LB.scrollTo({top:LB.scrollTop+r.top-vt-(vb-vt-r.height)/2,behavior:"smooth"});}};'
src = src.replace(jump, fix)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
