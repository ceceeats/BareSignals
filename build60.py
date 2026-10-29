#!/usr/bin/env python3
"""Home v52 = Body v60, from live Home v51 (kept at /home/v51/): six-pack redrawn as organic rectus abdominis
(one smooth outer contour, wider linea alba above the navel, slanted tendinous lines, rounded pillow segments)."""
import pathlib, sys, shutil, re
R = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(R)); from abs_gen import column
keep = R / "home" / "v51"
if not keep.exists():
    keep.mkdir(parents=True); shutil.copy(R / "index.html", keep / "index.html")
src = (keep / "index.html").read_text(encoding="utf-8")
els = list(re.finditer(r'<path [^>]*data-n="Abdominals"[^>]*>', src))
assert len(els) == 8, len(els)
P = {557.3: (340.5, 557.3, 766.7, 31.5), 521.3: (341.0, 521.3, 792.7, 38.5)}
out = src
for m in reversed(els):
    e = m.group(0); d = re.search(r' d="([^"]*)"', e).group(1)
    nums = list(map(float, re.findall(r'-?\d+\.?\d*', d)))
    xs = nums[0::2]; ys = nums[1::2]
    mid, top, bot, w = P[round(min(ys), 1)]
    side = -1 if max(xs) < mid else 1
    nd = column(mid, side, top, bot, w, seed=(0.0 if side < 0 else 1.3))
    out = out[:m.start()] + e.replace(f' d="{d}"', f' d="{nd}"') + out[m.end():]
src = out
i = src.index("<!doctype html><!-- ") + len("<!doctype html><!-- ")
src = src[:i] + "Home v52 = Body v60 (29 Oct 2026): six-pack redrawn as natural rectus abdominis (smooth outer contour, wider midline above the navel, slanted tendinous lines, rounded segments). Home v51 kept at /home/v51/. Earlier: " + src[i:]
(R / "index.html").write_text(src, encoding="utf-8"); print("wrote index.html", len(src))
