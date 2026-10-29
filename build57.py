#!/usr/bin/env python3
"""Body v52 = Body v51 with a quiet study line. Live as Home v43 = Body v52; built from Home v42 = Body v49 (Home v42, /index.html) + studies.
- loads /studies.json (slug, r, at, t, url, type, checked)
- tiny evidence tag under each label name: PHASE 3/2/1 TRIAL, HUMAN STUDY (blues), ANIMAL, LAB (greys), USERS (orange)
- the whole label box is tappable and opens the study when it has a link; no "STUDY" text
Writes home/b51/index.html (preview). Live index.html is not touched.
"""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = ((R / "home" / "v42" / "index.html") if (R / "home" / "v42" / "index.html").exists() else (R / "index.html")).read_text(encoding="utf-8")

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
 return x&&STAG[x.type]&&okUrl(x.url)?x:null;}
const okUrl=u=>/^https:\/\/(pubmed\.ncbi\.nlm\.nih\.gov|pmc\.ncbi\.nlm\.nih\.gov|clinicaltrials\.gov|doi\.org|www\.biorxiv\.org|www\.medrxiv\.org)\//.test(u||"");
'''+ src[j+1:]

# 3. each label row remembers its study
sub("note:notes?shortN(mm.note||\"\"):\"\",els,mm};", "note:notes?shortN(mm.note||\"\"):\"\",els,mm,stu:studyOf(mm)};")

# 4. measure: room for the tag under the name
sub("return {tl,nl,ch,chH,w:Math.max(tw,nw,chW,r.tapin?19*fs*.68:0),tw,h:(r.tapin?lh*1.6:0)+tl.length*fs*1.35+pad*.6+chH+(nl.length?nl.length*lh+pad*.4:0)};};",
    "const sg=r.stu?STAG[r.stu.type]:null,tf=fs*.6,tgH=sg?tf*1.45:0,tgW=sg?Math.min(W,sg[0].length*tf*.62+pad*.4):0;"
    "return {tl,nl,ch,chH,sg,tf,tgH,tgW,w:Math.max(tw,nw,chW,tgW,r.tapin?19*fs*.68:0),tw,h:(r.tapin?lh*1.6:0)+tl.length*fs*1.35+pad*.6+tgH+chH+(nl.length?nl.length*lh+pad*.4:0)};};")

# 5. draw: tag pill under the name, chips and note move down, whole box in one tappable group
sub("const bx=side<0?x1-Math.min(w,M.tw):x0;h+=`<rect x=\"${bx}\" y=\"${y0}\" width=\"${Math.min(w,M.tw)}\" height=\"${th}\" fill=\"${col}\"",
    "const lk=r.stu&&okUrl(r.stu.url);h+=`<g class=\"lb${lk?\" lk\":\"\"}\"${lk?` data-u=\"${esc(r.stu.url)}\" role=\"link\" aria-label=\"${esc((r.stu.t||\"Study\")+\" (\"+M.sg[0].toLowerCase()+\")\")}\"`:\"\"}>`;"
    "if(lk)h+=`<rect class=\"lbhit\" x=\"${x0}\" y=\"${y0}\" width=\"${x1-x0}\" height=\"${M.h}\" fill=\"transparent\" pointer-events=\"all\"/>`;"
    "const bx=side<0?x1-Math.min(w,M.tw):x0;h+=`<rect class=\"lbt\" x=\"${bx}\" y=\"${y0}\" width=\"${Math.min(w,M.tw)}\" height=\"${th}\" fill=\"${col}\"")
sub("if(M.ch&&M.ch.length){const cy=y0+th+2.5*k,",
    "if(M.sg){const ty=y0+th+M.tf*1.12;h+=`<text x=\"${side<0?x1:x0+pad*.2}\" y=\"${ty}\" text-anchor=\"${side<0?\"end\":\"start\"}\" font-family=\"JetBrains Mono,monospace\" font-size=\"${M.tf}\" letter-spacing=\"${.25*k}\" fill=\"#6A6BC2\" text-decoration=\"underline\">${M.sg[0]}</text>`;}"
    "if(M.ch&&M.ch.length){const cy=y0+th+(M.tgH||0)+2.5*k,")
sub("if(M.nl.length){const ny=y0+th+(M.chH||0);", "if(M.nl.length){const ny=y0+th+(M.tgH||0)+(M.chH||0);")
sub("fill=\"#3E4A80\" stroke=\"#FFFFF4\" stroke-width=\"${2.6*k}\" stroke-linejoin=\"round\" paint-order=\"stroke\" text-anchor=\"${side<0?\"end\":\"start\"}\">${M.nl.map((x,i)=>`<tspan x=\"${side<0?x1:x0+pad*.2}\" y=\"${ny+lh*(i+.86)}\">${esc(x)}</tspan>`).join(\"\")}</text>`;}\n  return h;}",
    "fill=\"#3E4A80\" stroke=\"#FFFFF4\" stroke-width=\"${2.6*k}\" stroke-linejoin=\"round\" paint-order=\"stroke\" text-anchor=\"${side<0?\"end\":\"start\"}\">${M.nl.map((x,i)=>`<tspan x=\"${side<0?x1:x0+pad*.2}\" y=\"${ny+lh*(i+.86)}\">${esc(x)}</tspan>`).join(\"\")}</text>`;}\n  h+=`</g>`;return h;}")

sub('if(head.L!=="Brain"){head.sub=[{L:head.L,role:head.role},...(head.sub||[])];head.L="Brain";}',
    'if(head.L!=="Brain"){head.sub=[{L:head.L,role:head.role},...(head.sub||[])];head.L="Brain";head.stu=null;}')

# v55: summary text smaller and shown in full (no 4-line cut); summary box as wide as the body allows beside it
sub("@media (max-width:899px){.ctags .pl{font-size:11.5px;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}",
    "@media (max-width:899px){.ctags .pl{font-size:10.5px;line-height:1.32;display:block;-webkit-line-clamp:unset;overflow:visible}")
sub(".ctags .pl{margin:0;font:500 12px/1.36 var(--body);", ".ctags .pl{margin:0;font:500 11.5px/1.36 var(--body);")
sub('const left=ex?(ex[0]-V.x)/V.k:sr.width*.3;el.style.maxWidth=Math.max(120,left-14)+"px";el.style.width=Math.max(120,left-14)+"px";placeMinis();}',
    'let left=ex?(ex[0]-V.x)/V.k:sr.width*.3;for(let i=0;i<2;i++){const w=Math.max(120,left-14);el.style.maxWidth=w+"px";el.style.width=w+"px";const b=el.getBoundingClientRect(),e2=extAt(s,V.y,V.y+(b.bottom-sr.top+6)*V.k);if(!e2)break;left=Math.max(left,(e2[0]-V.x)/V.k);}placeMinis();}')
# v55: zoom + and - centred over the F/M switch, evenly spaced right above it
sub(".fl .zb.ico{padding:2px 0!important;justify-content:flex-end!important}",
    ".fl .zb.ico{padding:1px 0!important;justify-content:center!important;align-self:stretch}#zctl.fl{align-items:flex-end;gap:4px}.fl .segfl{margin-top:0!important}")

# 6. a tap on a linked label opens its study (before the body tap and double tap)
sub("if(moved<8&&e.type===\"pointerup\"){const now=performance.now(),xy=[e.clientX,e.clientY];",
    "if(moved<8&&e.type===\"pointerup\"){const now=performance.now(),xy=[e.clientX,e.clientY];"
    "{const hit=document.elementsFromPoint(xy[0],xy[1]).map(x=>x.closest&&x.closest(\".lb.lk\")).find(Boolean);if(hit&&okUrl(hit.dataset.u)){clearTimeout(tapTimer);lastTap=0;window.open(hit.dataset.u,\"_blank\",\"noopener\");return;}}")

# v56: study card (see build56_extra.py)
import build56_extra
def _get(): return src
def _put(v):
    global src
    src = v
build56_extra.apply(sub, _get, _put)
import build57_extra
build57_extra.apply(sub, _get, _put)

# 7. version marks
sub("<!doctype html><!-- Home v42 = Body v49 (29 Oct 2026).",
    "<!doctype html><!-- Home v48 = Body v57 (29 Oct 2026): study card text one step smaller; top summary shows the nickname plus the full plain intro in smaller text, box reaching to the shoulder joint. Home v47 (Body v56) kept at /home/v47/. Body v56 (29 Oct 2026): tapping a label with a study opens a small study card (what the page claims, who was studied, what it found, evidence level, source name) with the link at the bottom; zoom buttons tighter above F/M. Home v46 (Body v55) kept at /home/v46/. Body v55 (29 Oct 2026): summary text smaller and shown in full, summary box as wide as the body allows; zoom + and - centred right above F/M. Home v45 (Body v54) kept at /home/v45/. Body v54 (29 Oct 2026): study line in a soft blue-violet link colour. Home v44 (Body v53) kept at /home/v44/. Body v53 (29 Oct 2026): folded phone brain box no longer borrows one part's study line. Home v43 (Body v52) kept at /home/v43/. Body v52: each body label with a checked study (studies.json) shows a tiny underlined evidence line under its name and the whole label opens the study; no study, no line. Home v42 (Body v49) kept at /home/v42/. Earlier: Home v42 = Body v49 (29 Oct 2026).")

import shutil
keep = R / "home" / "v42"
if not keep.exists():
    keep.mkdir(parents=True)
    shutil.copy(R / "index.html", keep / "index.html")
(R / "index.html").write_text(src, encoding="utf-8")
print("wrote index.html", len(src))
