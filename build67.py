#!/usr/bin/env python3
"""Preview Body v67 = preview Body v66 (ear glow + Pairs well with) + labels never run off the bottom of the
body box: after the final label widths are set, any column that ends below the bottom slides up into the free
space above it. Columns that already fit are untouched. Writes home/b67/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b66"/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub("placed.push({...B,side,x0,x1:x0+w,w});});});\n",
    "placed.push({...B,side,x0,x1:x0+w,w});});});\n"
    " [-1,1].forEach(side=>{const Q=placed.filter(p=>p.side===side).sort((a,b)=>a.y0-b.y0);if(!Q.length||Q[Q.length-1].y0+Q[Q.length-1].M.h<=bot)return;for(let i=Q.length-1;i>=0;i--){const lim=(i===Q.length-1?bot:Q[i+1].y0-VG)-Q[i].M.h;if(Q[i].y0>lim)Q[i].y0=Math.max(top,lim);}});\n")
sub("<!-- Preview Body v66 (30 Oct 2026, not live):", "<!-- Preview Body v67 (30 Oct 2026, not live): labels never run off the bottom of the body box (a column that ends below the bottom slides up into free space; columns that fit are untouched). Plus Body v66:")
o=R/"home"/"b67"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
