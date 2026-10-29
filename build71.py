#!/usr/bin/env python3
"""Preview Body v71 (from live Home v61 = Body v70): labels never run off the bottom.
Runs only when a side runs off: first tries to hand the lowest label to the other side, then drops the longest
note on that side and closes the column up from the top (never above the top, stepping below the legend and
corner buttons), until it fits. If it still cannot fit, the original layout is kept. Writes home/b71/index.html."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
anchor=" t.innerHTML=placed.map(({r,M,y0,side,x0,x1,w})=>{"
assert src.count(anchor)==1
guard=(" /* v71: a side that runs off the bottom: hand the lowest label to the other side if it fits there, else drop the longest note and close up from the top; keep the old layout if it still cannot fit */\n"
 " if(s.id!==\"cell\"&&st.view===\"body\"){const sideQ=sd=>placed.filter(p=>p.side===sd).sort((a,b)=>a.y0-b.y0),botOf=sd=>{const Q=sideQ(sd);return Q.length?Q[Q.length-1].y0+Q[Q.length-1].M.h:top-VG;},runs=sd=>botOf(sd)>bot+1;\n"
 "  const close=sd=>{const Q=sideQ(sd);let y=top-VG;Q.forEach(q=>{let ny=Math.max(y+VG,q.y0);for(let j=0;j<4;j++){const o=hitOB(q.x0,q.x1,ny,ny+q.M.h);if(!o)break;ny=o.y1+VG;}q.y0=ny;y=ny+q.M.h;});\n"
 "   if(runs(sd)){y=top-VG;Q.forEach(q=>{let ny=y+VG;for(let j=0;j<4;j++){const o=hitOB(q.x0,q.x1,ny,ny+q.M.h);if(!o)break;ny=o.y1+VG;}q.y0=ny;y=ny+q.M.h;});}};\n"
 "  if(runs(-1)||runs(1)){const snap=placed.map(p=>({p,y0:p.y0,M:p.M,side:p.side,x0:p.x0,x1:p.x1,w:p.w,note:p.r.note}));\n"
 "   for(let it=0;it<30;it++){const from=runs(-1)?-1:runs(1)?1:null;if(from===null)break;const to=-from,Q=sideQ(from),q=Q[Q.length-1];let moved=false;\n"
 "    if(usable(to)&&!q.r.fixA){const y=Math.max(top,botOf(to)+VG);let W=Math.min(maxW,Math.max(minW,capW(to))),M=measure(q.r,W);const [a,b]=gw(to,y,y+M.h);W=Math.max(minW*.8,Math.min(W,b-a));M=measure(q.r,W);const xa=to<0?b-W:a;if(y+M.h<=bot&&!hitOB(xa,xa+W,y,y+M.h)){q.side=to;q.M=M;q.w=W;q.x0=xa;q.x1=xa+W;q.y0=y;moved=true;}}\n"
 "    if(!moved){const lng=Q.filter(p=>p.r.note).sort((p,r)=>r.r.note.length-p.r.note.length)[0];if(!lng)break;lng.r.note=\"\";lng.M=measure(lng.r,lng.w);close(from);}}\n"
 "   if(runs(-1)||runs(1))snap.forEach(z=>{Object.assign(z.p,{y0:z.y0,M:z.M,side:z.side,x0:z.x0,x1:z.x1,w:z.w});z.p.r.note=z.note;});}}\n")
src=src.replace(anchor,guard+anchor,1)
old="<!doctype html><!-- Home v61 = Body v70 (30 Oct 2026):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Preview Body v71 (30 Oct 2026, not live): labels never run off the bottom (hand to other side, else drop longest notes and close up; else keep old layout). Built from Home v61 = Body v70 (30 Oct 2026):",1)
o=R/"home"/"b71"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
