#!/usr/bin/env python3
"""Preview Body v72 (from live Home v63 = Body v70): on phones, label notes are never cut to make room.
Instead, when a side of labels runs off the bottom, the page's body box grows taller just enough (up to 80% of the
screen extra) and lays out again; it goes back to normal on the next compound. Laptop unchanged.
Writes home/b72/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
# 1. phones: never shorten notes to fit
sub("for(let g=0;g<S[side].length*3&&P2.over>0;g++)", "for(let g=0;!ph&&g<S[side].length*3&&P2.over>0;g++)")
# 2. phones: grow the body box when a column still runs off
anchor=" t.innerHTML=placed.map(({r,M,y0,side,x0,x1,w})=>{"
assert src.count(anchor)==1
grow=(" /* v72: phones never cut notes; a column that runs off makes the body box taller instead, then lays out again */\n"
 " if(ph&&s.id!==\"cell\"&&st.view===\"body\"&&st.comp){let need=0;[-1,1].forEach(sd=>{placed.filter(p=>p.side===sd).forEach(p=>{need=Math.max(need,p.y0+p.M.h-bot);});});const px=need/k;const app=$(\"app\");\n"
 "  if(px>2&&app){const g=(app.__grow||0)+px/.67+14;if(g<innerHeight*.8){app.__grow=g;app.style.setProperty(\"height\",`calc(100svh - var(--bsnav-h0,0px) + ${Math.round(g)}px)`,\"important\");requestAnimationFrame(()=>render());return;}}}\n")
src=src.replace(anchor,grow+anchor,1)
sub("function openComp(c){", "function openComp(c){{const app=$(\"app\");if(app&&app.__grow){app.__grow=0;app.style.removeProperty(\"height\");}}")
old="<!doctype html><!-- Home v63 = Body v70 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Preview Body v72 (30 Oct 2026, not live): phones never cut label notes; a column that runs off makes the body box taller instead. Built from Home v63 = Body v70 (30 Oct 2026):",1)
o=R/"home"/"b72"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
