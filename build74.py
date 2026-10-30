#!/usr/bin/env python3
"""Preview Body v74, from live Home v64 = Body v73: no growing box (Cece, 30 Oct). Notes stay uncut.
When a side of labels still runs off the bottom, the body is drawn slightly smaller (10% steps, at most ~27%)
so the label columns get wider and shorter, and lays out again at once. Box size never changes.
Writes home/b74/index.html."""
import pathlib, sys, re
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
i=src.index(" /* v72: phones never cut notes;"); j=src.index(" t.innerHTML=placed.map(({r,M,y0,side,x0,x1,w})=>{",i)
src=src[:i]+(" /* v74: notes never cut; a column that runs off draws the body slightly smaller (box size stays) and lays out again */\n"
 " if(s.id!==\"cell\"&&st.view===\"body\"&&st.comp){let need=0;placed.forEach(p=>{need=Math.max(need,p.y0+p.M.h-bot);});if(need>k&&(s.__shrk||1)<1.25){cancelAnimationFrame(anim);s.__shrk=(s.__shrk||1)*1.08;s.setAttribute(\"viewBox\",sumFrame(s).join(\" \"));return drawTags(s);}}\n")+src[j:]
sub('function openComp(c){{const app=$("app");if(app&&app.__grow){app.__grow=0;app.style.removeProperty("height");}}',
    'function openComp(c){["fem","mal"].forEach(id=>{const e=document.getElementById(id);if(e)e.__shrk=1;});')
sub("function sumFrame(s){const on=s.__on||[];let t=frame(s,on);",
    "function sumFrame(s){const on=s.__on||[];let t=frame(s,on);{const sk=s.__shrk||1;if(sk>1){let [x,y,w,h]=t;const cx=x+w/2;w*=sk;h*=sk;t=[cx-w/2,y-(h-h/sk)*.5,w,h];}}")
old=re.match(r"<!doctype html><!-- Home v64 = Body v73 \(30 Oct 2026\):",src); assert old
src=src.replace("<!doctype html><!-- Home v64 = Body v73 (30 Oct 2026):","<!doctype html><!-- Preview Body v74 (30 Oct 2026, not live): no growing box; crowded compounds draw the body slightly smaller instead; notes never cut. Built from Home v64 = Body v73 (30 Oct 2026):",1)
o=R/"home"/"b74"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
