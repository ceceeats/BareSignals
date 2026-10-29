#!/usr/bin/env python3
"""Home v51 = Body v59, built from live Home v50 (kept at /home/v50/).
- study card: credit line under the study title (lead author, journal, year, country, language)
- summary on laptop too: nickname plus the first two whole sentences (the rest repeats the labels); full text in Read more
"""
import pathlib, sys, shutil
R = pathlib.Path(__file__).resolve().parent
keep = R / "home" / "v50"
if not keep.exists():
    keep.mkdir(parents=True); shutil.copy(R / "index.html", keep / "index.html")
src = (keep / "index.html").read_text(encoding="utf-8")
def sub(a, b):
    global src
    if src.count(a) != 1: sys.exit(f"expected 1 of {a[:70]!r}, found {src.count(a)}")
    src = src.replace(a, b)
sub('<p class="spn">${esc(z.t||"")}</p>', '<p class="spn">${esc(z.t||"")}</p>${z.cr?`<p class="spr">${esc(z.cr)}</p>`:""}')
sub(".stpop .spn{margin:0 0 7px;font-size:10px;color:#5A6390}",
    ".stpop .spn{margin:0 0 2px;font-size:10px;color:#5A6390}.stpop .spr{margin:0 0 7px;font:500 8.5px/1.35 var(--mono);letter-spacing:.04em;color:#8A8FB3}")
sub("if(isPhone()&&c.in){", "if(c.in){")
i = src.index("<!doctype html><!-- ") + len("<!doctype html><!-- ")
src = src[:i] + "Home v51 = Body v59 (29 Oct 2026): study cards credit the lead author, journal, year, country and language; summary on laptop also stops at two whole sentences (the rest repeats the labels). Home v50 kept at /home/v50/. Earlier: " + src[i:]
(R / "index.html").write_text(src, encoding="utf-8")
print("wrote index.html", len(src))
