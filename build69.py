#!/usr/bin/env python3
"""Preview Body v69 (from live Home v60 = Body v68):
1. Labels balance: if one side still runs off the bottom after placing, its labels move one at a time to the
   other side while that lowers the run-off (only runs when a side overflows; all other compounds untouched).
2. If it still runs off, the longest notes on that side are dropped one at a time and the column closes up.
3. Read more card: Pairs well with shows partner chips like the supplement chips (colour square + name),
   each with its one-line reason; tapping a chip opens that compound on the body.
Writes home/b69/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
anchor=" t.innerHTML=placed.map(({r,M,y0,side,x0,x1,w})=>{"
assert src.count(anchor)==1
guard=(" /* v69: after the final stacking, a side that runs off the bottom first hands its lowest label to the other side when it fits there, otherwise drops the longest note on that side and closes up, until everything fits */\n"
 " if(s.id!==\"cell\"&&st.view===\"body\"){const sideQ=sd=>placed.filter(p=>p.side===sd).sort((a,b)=>a.y0-b.y0),botOf=sd=>{const Q=sideQ(sd);return Q.length?Q[Q.length-1].y0+Q[Q.length-1].M.h:top-VG;};\n"
 "  const restack=sd=>{const Q=sideQ(sd);let lim=bot;for(let i=Q.length-1;i>=0;i--){const q=Q[i];let y=Math.min(q.y0,lim-q.M.h);for(let j=0;j<4;j++){const o=hitOB(q.x0,q.x1,y,y+q.M.h);if(!o)break;y=o.y0-VG-q.M.h;}q.y0=y;lim=y-VG;}};\n"
 "  const bad=sd=>{const Q=sideQ(sd);return Q.length&&(botOf(sd)>bot+1||Q[0].y0<top-1);};\n"
 "  const snap=placed.map(p=>({p,y0:p.y0,M:p.M,side:p.side,x0:p.x0,x1:p.x1,w:p.w,note:p.r.note}));if(bad(-1)||bad(1)){\n"
 "  for(let it=0;it<24;it++){let from=null;[-1,1].forEach(sd=>{if(bad(sd)&&from===null)from=sd;});if(from===null)break;if(it===0){restack(from);if(!bad(from))continue;}const to=-from,Q=sideQ(from),q=Q[Q.length-1];let moved=false;\n"
 "   if(usable(to)&&!q.r.fixA){const y=Math.max(top,botOf(to)+VG);let W=Math.min(maxW,Math.max(minW,capW(to))),M=measure(q.r,W);const [a,b]=gw(to,y,y+M.h);W=Math.max(minW*.8,Math.min(W,b-a));M=measure(q.r,W);const xa=to<0?b-W:a;if(y+M.h<=bot&&!hitOB(xa,xa+W,y,y+M.h)){q.side=to;q.M=M;q.w=W;q.x0=xa;q.x1=xa+W;q.y0=y;moved=true;}}\n"
 "   if(!moved){const lng=Q.filter(p=>p.r.note).sort((p,r)=>r.r.note.length-p.r.note.length)[0];if(!lng){restack(from);break;}lng.r.note=\"\";lng.M=measure(lng.r,lng.w);restack(from);}}\n"
 "  if(bad(-1)||bad(1))snap.forEach(z=>{Object.assign(z.p,{y0:z.y0,M:z.M,side:z.side,x0:z.x0,x1:z.x1,w:z.w});z.p.r.note=z.note;});}}\n")
src=src.replace(anchor,guard+anchor,1)
# synergy chips
sub("el.innerHTML=`<h4>Pairs well with</h4><ul class=\"syn\">${names.map(n=>{const t=C.find(x=>x.n===n);return `<li>${t?`<button type=\"button\" class=\"synb\" data-syn=\"${esc(t.s)}\">${esc(n)}</button>`:`<b>${esc(n)}</b>`} ${esc(first(sx[n]))}</li>`;}).join(\"\")}</ul>`;",
    "el.innerHTML=`<h4>Pairs well with</h4><ul class=\"syn\">${names.map(n=>{const t=C.find(x=>x.n===n),col=t?((P[t.p]||P[t.r[0]]||[\"\",\"#E3E0BF\"])[1]):\"#E3E0BF\";return `<li>${t?`<button type=\"button\" class=\"xs synb\" data-syn=\"${esc(t.s)}\"><span class=\"sq\" style=\"background:${col}\"></span>${esc(n)}</button>`:`<span class=\"xs\"><span class=\"sq\" style=\"background:${col}\"></span>${esc(n)}</span>`}<span class=\"synw\">${esc(first(sx[n]))}</span></li>`;}).join(\"\")}</ul>`;")
sub(".bscard .synb{all:unset;cursor:pointer;font-weight:600;text-decoration:underline;text-underline-offset:2px}","")
sub(".bscard .syn li{margin-bottom:4px}",
    ".bscard .syn{list-style:none;padding:0;margin:0}.bscard .syn li{margin:0 0 8px;display:flex;flex-direction:column;align-items:flex-start;gap:3px}.bscard .syn .synb{font:inherit;cursor:pointer}.bscard .syn .synw{font-size:11.5px;line-height:1.35;color:#5A6390}")
sub("<!doctype html><!-- Home v60 = Body v68 (30 Oct 2026):", "<!doctype html><!-- Preview Body v69 (30 Oct 2026, not live): labels move to the other side when a side runs off, then drop the longest notes on that side if still needed; Pairs well with as chips like Goes well with, tap opens the compound. Built from Home v60 = Body v68 (30 Oct 2026):")
o=R/"home"/"b69"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
