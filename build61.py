#!/usr/bin/env python3
"""Home v53 = Body v61, from live Home v52 (kept at /home/v52/).
- ears are part of the skin: each ear gets a skin shape (same fill and outline as the body) that lights with the skin; ear outlines use the body outline colour
- cell corner square fits the whole cell (it was cut off at the bottom)"""
import pathlib, sys, shutil, re
R = pathlib.Path(__file__).resolve().parent
keep = R / "home" / "v52"
if not keep.exists():
    keep.mkdir(parents=True); shutil.copy(R / "index.html", keep / "index.html")
src = (keep / "index.html").read_text(encoding="utf-8")
def sub(a, b, n=1):
    global src
    if src.count(a) != n: sys.exit(f"expected {n} of {a[:70]!r}, found {src.count(a)}")
    src = src.replace(a, b)
# 1. ear skin shapes, placed right after each body's skin shape
ears = re.findall(r'<path class="dl ear" d="([^"]*)"', src)
assert len(ears) == 4, len(ears)
skins = [m for m in re.finditer(r'<path d="[^"]*" class="skin film" data-k="skin" data-n="Skin" fill="#FFEEEE" stroke="#F2B8B4"/>', src)
         if re.match(r'<svg (hidden )?id="(fem|mal)"', src[src.rfind('<svg', 0, m.start()):])]
assert len(skins) == 2, len(skins)
for k, m in reversed(list(enumerate(skins))):
    add = "".join(f'<path class="skin film earskin" data-k="skin" data-n="Skin" fill="#FFEEEE" stroke="#F2B8B4" d="{d}"/>' for d in ears[2*k:2*k+2])
    src = src[:m.end()] + add + src[m.end():]
# 2. ear outline = body outline (same colour as .xray .skinline, same lit colour)
sub(".details .dl.ear{fill:#FDEFE6;stroke:#3B416E;stroke-width:1.15;opacity:.62}",
    ".details .dl.ear{fill:none;stroke:#E3C6D0;stroke-width:1;opacity:.9;vector-effect:non-scaling-stroke}")
sub("svg:has(.film.skin.on) .details .dl.ear{stroke:#E58A8E!important;stroke-width:1.4}",
    "svg:has(.film.skin.on) .details .dl.ear{stroke:var(--skc,#F2A0A0)!important;opacity:1}svg.xray.tanning:has(.film.skin.on) .details .dl.ear{stroke:#B27205!important}")
# 3. whole cell inside its corner square
sub("miniLabels(cs,ct,rows,350,-15,-15,350)", "miniLabels(cs,ct,rows,445,-62,-60,445)")
i = src.index("<!doctype html><!-- ") + len("<!doctype html><!-- ")
src = src[:i] + "Home v53 = Body v61 (29 Oct 2026): ears are part of the skin (same fill and outline as the body, light up with the skin); cell corner square shows the whole cell. Home v52 kept at /home/v52/. Earlier: " + src[i:]
(R / "index.html").write_text(src, encoding="utf-8"); print("wrote", len(src))
