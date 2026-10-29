#!/usr/bin/env python3
"""Body v51 = live Body v49 (Home v42, /index.html) + studies.
- loads /studies.json (slug, r, at, t, url, type, checked)
- tiny evidence tag under each label name: PHASE 3/2/1 TRIAL, HUMAN STUDY (blues), ANIMAL, LAB (greys), USERS (orange)
- the whole label box is tappable and opens the study when it has a link; no "STUDY" text
Writes home/b51/index.html (preview). Live index.html is not touched.
"""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R / "index.html").read_text(encoding="utf-8")

def sub(a, b, n=1):
    global src
    c = src.count(a)
    if c != n:
        sys.exit(f"expected {n} of: {a[:80]!r}, found {c}")
    src = src.replace(a, b)

# 1. CSS
sub(".tagl .tapin{pointer-events:auto;cursor:pointer}",
    ".tagl .tapin{pointer-events:auto;cursor:pointer}.tagl .lb.lk{pointer-events:auto;cursor:pointer}.tagl .lb.lk:hover .lbt{filter:brightness(.94)}")

# 2. data + loader, right after BASE
i = src.index("const BASE=")
j = src.index("\n", i)
src = src[:j+1] + r'''const STAG={P3:["PHASE 3 TRIAL","#1F3D8F","#FFFFFF"],P2:["PHASE 2 TRIAL","#3A5FC8","#FFFFFF"],P1:["PHASE 1 TRIAL","#6F8FE6","#FFFFFF"],HUMAN:["HUMAN STUDY","#B3C7F5","#1D2B5C"],ANIMAL:["ANIMAL","#8C8C8C","#FFFFFF"],LAB:["LAB","#C4C4C4","#2B2B2B"],USERS:["USERS","#F28C28","#FFFFFF"]};
let STUD={};
{const sb=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":BASE;
 fetch(sb+"/studies.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).then(a=>{(a||[]).forEach(x=>{if(x&&x.slug)STUD[x.slug+"|"+x.r+"|"+x.at]=x;});try{const s=svgOf();if(s&&s.__list&&s.__list.length)drawTags(s);}catch(_){}}).catch(()=>{});}
function studyOf(mm){const c=st.comp;if(!c||!mm||!mm.role)return null;let x=STUD[c.s+"|"+mm.role+"|"+(mm.label||"")];
 if(!x){const o=(c.o||[]).filter(e=>e.r===mm.role&&e.k===mm.k);if(o.length===1)x=STUD[c.s+"|"+o[0].r+"|"+o[0].at];}
 return x&&STAG[x.type]?x:null;}
const okUrl=u=>/^https:\/\/(pubmed\.ncbi\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|clinicaltrials\.gov|doi\.org|www\.biorxiv\.org|www\.medrxiv\.org)\//.test(u||"");
'''+ src[j+1:]

# 3. each label row remembers its study
sub("note:notes?shortN(mm.note||\"\"):\"\",els,mm};", "note:notes?shortN(mm.note||\"\"):\"\",els,mm,stu:studyOf(mm)};")

# 4. measure: room for the tag under the name
sub("return {tl,nl,ch,chH,w:Math.max(tw,nw,chW,r.tapin?19*fs*.68:0),tw,h:(r.tapin?lh*1.6:0)+tl.length*fs*1.35+pad*.6+chH+(nl.length?nl.length*lh+pad*.4:0)};};",
    "const sg=r.stu?STAG[r.stu.type]:null,tf=fs*.72,tgH=sg?tf*1.55+2.4*k:0,tgW=sg?Math.min(W,sg[0].length*tf*.64+tf*1.1):0;"
    "return {tl,nl,ch,chH,sg,tf,tgH,tgW,w:Math.max(tw,nw,chW,tgW,r.tapin?19*fs*.68:0),tw,h:(r.tapin?lh*1.6:0)+tl.length*fs*1.35+pad*.6+tgH+chH+(nl.length?nl.length*lh+pad*.4:0)};};")

# 5. draw: tag pill under the name, chips and note move down, whole box in one tappable group
sub("const bx=side<0?x1-Math.min(w,M.tw):x0;h+=`<rect x=\"${bx}\" y=\"${y0}\" width=\"${Math.min(w,M.tw)}\" height=\"${th}\" fill=\"${col}\"",
    "const lk=r.stu&&okUrl(r.stu.url);h+=`<g class=\"lb${lk?\" lk\":\"\"}\"${lk?` data-u=\"${esc(r.stu.url)}\" role=\"link\" aria-label=\"${esc((r.stu.t||\"Study\")+\" (\"+M.sg[0].toLowerCase()+\")\")}\"`:\"\"}>`;"
    "if(lk)h+=`<rect class=\"lbhit\" x=\"${x0}\" y=\"${y0}\" width=\"${x1-x0}\" height=\"${M.h}\" fill=\"transparent\" pointer-events=\"all\"/>`;"
    "const bx=side<0?x1-Math.min(w,M.tw):x0;h+=`<rect class=\"lbt\" x=\"${bx}\" y=\"${y0}\" width=\"${Math.min(w,M.tw)}\" height=\"${th}\" fill=\"${col}\"")
sub("if(M.ch&&M.ch.length){const cy=y0+th+2.5*k,",
    "if(M.sg){const ty=y0+th+1.2*k,tw2=M.tgW,tx=side<0?x1-tw2:x0,th2=M.tf*1.55;h+=`<rect x=\"${tx}\" y=\"${ty}\" width=\"${tw2}\" height=\"${th2}\" rx=\"${th2*.22}\" fill=\"${M.sg[1]}\"/><text x=\"${tx+tw2/2}\" y=\"${ty+th2*.72}\" text-anchor=\"middle\" font-family=\"JetBrains Mono,monospace\" font-size=\"${M.tf}\" font-weight=\"700\" letter-spacing=\"${.3*k}\" fill=\"${M.sg[2]}\">${M.sg[0]}</text>`;}"
    "if(M.ch&&M.ch.length){const cy=y0+th+(M.tgH||0)+2.5*k,")
sub("if(M.nl.length){const ny=y0+th+(M.chH||0);", "if(M.nl.length){const ny=y0+th+(M.tgH||0)+(M.chH||0);")
sub("fill=\"#3E4A80\" stroke=\"#FFFFF4\" stroke-width=\"${2.6*k}\" stroke-linejoin=\"round\" paint-order=\"stroke\" text-anchor=\"${side<0?\"end\":\"start\"}\">${M.nl.map((x,i)=>`<tspan x=\"${side<0?x1:x0+pad*.2}\" y=\"${ny+lh*(i+.86)}\">${esc(x)}</tspan>`).join(\"\")}</text>`;}\n  return h;}",
    "fill=\"#3E4A80\" stroke=\"#FFFFF4\" stroke-width=\"${2.6*k}\" stroke-linejoin=\"round\" paint-order=\"stroke\" text-anchor=\"${side<0?\"end\":\"start\"}\">${M.nl.map((x,i)=>`<tspan x=\"${side<0?x1:x0+pad*.2}\" y=\"${ny+lh*(i+.86)}\">${esc(x)}</tspan>`).join(\"\")}</text>`;}\n  h+=`</g>`;return h;}")

# 6. a tap on a linked label opens its study (before the body tap and double tap)
sub("if(moved<8&&e.type===\"pointerup\"){const now=performance.now(),xy=[e.clientX,e.clientY];",
    "if(moved<8&&e.type===\"pointerup\"){const now=performance.now(),xy=[e.clientX,e.clientY];"
    "{const hit=document.elementsFromPoint(xy[0],xy[1]).map(x=>x.closest&&x.closest(\".lb.lk\")).find(Boolean);if(hit&&okUrl(hit.dataset.u)){clearTimeout(tapTimer);lastTap=0;window.open(hit.dataset.u,\"_blank\",\"noopener\");return;}}")

# 7. version marks
sub("<!doctype html><!-- Home v42 = Body v49 (29 Oct 2026).",
    "<!doctype html><!-- Preview Body v51 (29 Oct 2026, not live): studies.json evidence tags under each label name, whole label box opens its study. Built from Home v42 = Body v49 (29 Oct 2026).")

out = R / "home" / "b51"
out.mkdir(parents=True, exist_ok=True)
(out / "index.html").write_text(src, encoding="utf-8")
print("wrote", out / "index.html", len(src))
