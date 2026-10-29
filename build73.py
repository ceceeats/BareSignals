#!/usr/bin/env python3
"""Preview Body v73 = preview Body v72 (notes never cut on phones; box grows) + rule 6, lines never cross:
on each side, labels are stacked top to bottom in the same order as their dots (higher dot = higher label,
it has right of way), keeping the same slots, spacing and obstacle rules. Writes home/b73/index.html."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b72"/"index.html").read_text(encoding="utf-8")
anchor=" /* v72: phones never cut notes;"
assert src.count(anchor)==1
rule6=(" /* v73 rule 6: on each side the labels follow their dots' order top to bottom (higher dot, higher label), kept only when it means fewer crossing lines */\n"
 " if(s.id!==\"cell\"){const thh=q=>q.M.tl.length*fs*1.35+pad*.6,seg=q=>[q.r.ax,q.r.ay,q.side<0?q.x1:q.x0,q.y0+Math.min(thh(q)/2,fs*1.1)];\n"
 "  const crs=(A,B)=>{const d=(p,q,r)=>(q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]);const a=[A[0],A[1]],b=[A[2],A[3]],c=[B[0],B[1]],e=[B[2],B[3]];return d(a,b,c)*d(a,b,e)<0&&d(c,e,a)*d(c,e,b)<0;};\n"
 "  const thr=(A,q)=>{for(let t=.05;t<.95;t+=.05){const x=A[0]+(A[2]-A[0])*t,y=A[1]+(A[3]-A[1])*t;if(x>q.x0+k&&x<q.x1-k&&y>q.y0+k&&y<q.y0+q.M.h-k)return true;}return false;};\n"
 "  const bad=()=>{let n=0;const S2=placed.map(seg);for(let i=0;i<S2.length;i++){for(let j=i+1;j<S2.length;j++)if(crs(S2[i],S2[j]))n++;placed.forEach((q,j)=>{if(j!==i&&thr(S2[i],q))n++;});}return n;};\n"
 "  [-1,1].forEach(sd=>{const Q=placed.filter(p=>p.side===sd);if(Q.length<2)return;const byY=Q.slice().sort((a,b)=>a.y0-b.y0),byDot=Q.slice().sort((a,b)=>a.r.ay-b.r.ay);if(byY.every((q,i)=>q===byDot[i]))return;\n"
 "   const before=bad(),snap=Q.map(q=>({q,y0:q.y0,x0:q.x0,x1:q.x1,w:q.w,M:q.M}));const slots=byY.map(q=>q.y0);let y=-1e9;\n"
 "   byDot.forEach((q,i)=>{let ny=Math.max(slots[i],y);for(let j=0;j<4;j++){const o=hitOB(q.x0,q.x1,ny,ny+q.M.h);if(!o)break;ny=o.y1+VG;}const [ga,gb]=gw(sd,ny,ny+q.M.h);const w2=Math.max(minW*.8,Math.min(q.w,gb-ga));if(w2<q.w-1){q.w=w2;q.M=measure(q.r,w2);}q.x0=sd<0?gb-q.w:ga;q.x0=Math.max(V.x+m,Math.min(q.x0,V.x+V.w-m-q.w));q.x1=q.x0+q.w;q.y0=ny;y=ny+q.M.h+VG;});\n"
 "   if(bad()>=before||Math.max(...Q.map(q=>q.y0+q.M.h))>bot+1)snap.forEach(z=>Object.assign(z.q,{y0:z.y0,x0:z.x0,x1:z.x1,w:z.w,M:z.M}));});}\n")
src=src.replace(anchor,rule6+anchor,1)
old="<!doctype html><!-- Preview Body v72 (30 Oct 2026, not live):"; assert src.startswith(old)
src=src.replace(old,"<!doctype html><!-- Preview Body v73 (30 Oct 2026, not live): rule 6, labels follow their dots' order on each side so lines never cross; plus v72:",1)
o=R/"home"/"b73"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
