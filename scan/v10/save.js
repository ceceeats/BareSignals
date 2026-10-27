/* Bare Signals Scan v10 save (28 Oct 2026): Save your protocol as a phone PDF (pages the size of a phone screen),
   a paper PDF (A4, two columns of cards) or PNG pictures (the phone pages, 3x sharp). One layout, drawn two ways:
   our own small PDF writer with real, selectable text (Helvetica, Courier), and a canvas for the pictures.
   A compound card is never cut across pages; long lists and the AI block continue with "continued". */
(function(){
'use strict';
const HV=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584,350,556,350,222,556,333,1000,556,556,333,1000,667,333,1000,350,611,350,350,222,222,333,333,350,556,1000,333,1000,500,333,944,350,500,667,278,333,556,556,556,556,260,556,333,737,370,556,584,333,737,333,400,584,333,333,333,556,537,278,333,333,365,556,834,834,834,611,667,667,667,667,667,667,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,500,556,556,556,556,278,278,278,278,556,556,556,556,556,556,556,584,611,556,556,556,556,500,556,500],HB=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,333,278,333,584,556,333,556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,389,280,389,584,350,556,350,278,556,500,1000,556,556,333,1000,667,333,1000,350,611,350,350,278,278,500,500,350,556,1000,333,1000,556,333,944,350,500,667,278,333,556,556,556,556,280,556,333,737,370,556,584,333,737,333,400,584,333,333,333,611,556,278,333,333,365,556,834,834,834,611,722,722,722,722,722,722,1000,722,667,667,667,667,278,278,278,278,722,722,778,778,778,778,778,584,778,722,722,722,722,667,667,611,556,556,556,556,556,556,889,556,556,556,556,556,278,278,278,278,611,611,611,611,611,611,611,584,611,611,611,611,611,556,611,556];
const C={ink:'#3E4A80',soft:'#6B76A8',paper:'#FFFFE2',chip:'#FFFFF4',cream:'#FFFFF0',rule:'#E3E0BF',dose:'#2F6B46',draw:'#E8701F',water:'#5271FF',flag:'#C02626',blood:'#C02626',supp:'#2F6B46',white:'#FFFFFF'};
/* ---------- text cleaning for the PDF's WinAnsi fonts ---------- */
const WIN={0x20AC:128,0x201A:130,0x0192:131,0x201E:132,0x2026:133,0x2020:134,0x2021:135,0x02C6:136,0x2030:137,0x0160:138,0x2039:139,0x0152:140,0x017D:142,0x2018:145,0x2019:146,0x201C:147,0x201D:148,0x2022:149,0x2013:150,0x2014:151,0x02DC:152,0x2122:153,0x0161:154,0x203A:155,0x0153:156,0x017E:158,0x0178:159};
const SWAP={'→':'->','←':'<-','≈':'~','β':'b','α':'a','γ':'g','✓':'','☀':'','☾':'','▾':'','▴':'','›':'>','‹':'<','≤':'<=','≥':'>=',' ':' ',' ':' ',' ':' '};
function clean(t){let o='';for(const ch of String(t==null?'':t)){const c=ch.codePointAt(0);if(c<256&&c!==0x7F)o+=ch;else if(WIN[c])o+=ch;else if(SWAP[ch]!==undefined)o+=SWAP[ch];else o+='?'}return o}
function winCode(ch){const c=ch.charCodeAt(0);return c<256?c:(WIN[c]||63)}

/* ---------- measuring ---------- */
function pdfMeasure(){return {w(t,f,s){t=clean(t);if(f==='m'||f==='mb')return t.length*600*s/1000;const T=f==='r'?HV:HB;let n=0;for(const ch of t)n+=T[winCode(ch)]||556;return n*s/1000},clean}}
const CF={r:'500 {s}px "Hanken Grotesk",Arial,sans-serif',b:'600 {s}px "Hanken Grotesk",Arial,sans-serif',h:'700 {s}px "Bricolage Grotesque","Hanken Grotesk",Arial,sans-serif',m:'500 {s}px "JetBrains Mono",ui-monospace,monospace',mb:'700 {s}px "JetBrains Mono",ui-monospace,monospace'};
const cfont=(f,s)=>CF[f].replace('{s}',s);
function canvasMeasure(){const cx=document.createElement('canvas').getContext('2d');return {w(t,f,s){cx.font=cfont(f,s);return cx.measureText(String(t)).width},clean:t=>String(t==null?'':t)}}

/* word wrap; very long words break by letters */
function wrap(M,t,f,s,maxW){t=M.clean(t);const out=[];String(t).split('\n').forEach(par=>{const words=par.split(/ +/);let line='';
 words.forEach(w=>{const tryL=line?line+' '+w:w;if(M.w(tryL,f,s)<=maxW){line=tryL;return}if(line)out.push(line);
  if(M.w(w,f,s)<=maxW){line=w;return}let part='';for(const ch of w){if(M.w(part+ch,f,s)>maxW){out.push(part);part=ch}else part+=ch}line=part});
 out.push(line)});return out}

/* ---------- formats ---------- */
const FMT={
 phone:{W:360,H:780,m:16,top:18,bot:30,cols:1,gap:10,k:1},
 paper:{W:595.28,H:841.89,m:34,top:34,bot:40,cols:2,gap:14,k:1.06}
};

/* ---------- blocks: {h, draw(ops,x,y)} measured for a width ---------- */
function T(ops,x,y,t,f,s,col){ops.push({k:'t',x,y,t,f,s,c:col})}
function R(ops,x,y,w,h,fill,stroke,lw,dash){ops.push({k:'r',x,y,w,h,fill,stroke,lw:lw||1,dash})}
function Ln(ops,x1,y1,x2,y2,col,lw,dash){ops.push({k:'l',x1,y1,x2,y2,c:col,lw:lw||1,dash})}

/* page 1 heading: small, the protocol is the point */
function headerBlock(M,m,w,k){const n=m.items.length;
 const sub=m.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+' · '+n+(n===1?' compound':' compounds');
 const ti=wrap(M,m.title,'h',17*k,w-M.w(sub,'r',8.5*k)-10);const h=10+ti.length*19*k+6;
 return {h,draw(o,x,y){T(o,x,y+7,'BARE SIGNALS · MY PROTOCOL','mb',6.8,C.draw);ti.forEach((l,j)=>T(o,x,y+10+15*k+j*19*k,l,'h',17*k,C.ink));
  T(o,x+w-M.w(sub,'r',8.5*k),y+10+15*k,sub,'r',8.5*k,C.soft)}}}

/* the protocol table: every value in its own column */
function tableRows(M,m,w,k){const S=w/324;
 const cols=[['#',16],['COMPOUND',86],['DOSE',50],['HOW OFTEN',62],['DRAW',38],['MIX',72]].map(([h,cw])=>[h,cw*S]);
 const fs=8.6*k,lh=10.6*k,pad=5;
 const cell=(i,t,f)=>wrap(M,t,f,fs,cols[i][1]-6);
 const rows=m.items.map((it,i)=>{const c=[
   [String(i+1)],cell(1,it.n,'b'),cell(2,it.dose,'b'),
   [].concat(cell(3,it.freq,'r'),it.time?cell(3,it.time,'r'):[]),
   cell(4,it.draw||'—','b'),
   it.mixA?[].concat(cell(5,it.mixA,'r'),it.mixB?cell(5,it.mixB,'r'):[]):['—']];
  const h=Math.max(...c.map(x=>x.length))*lh+pad*2;return {it,i,c,h}});
 const head={h:16,draw(o,x,y){let xx=x;cols.forEach(([t,cw])=>{T(o,xx+3,y+11,t,'mb',6.4,C.soft);xx+=cw});Ln(o,x,y+16,x+w,y+16,C.ink,1)}};
 const blocks=rows.map(r=>({h:r.h,draw(o,x,y){let xx=x;
   const col=r.it.col[0]?r.it.col[0][0]:C.rule;R(o,x,y,3,r.h,col);
   r.c.forEach((lines,ci)=>{const cw=cols[ci][1];
    const f=ci===0?'mb':ci===1||ci===2||ci===4?'b':'r';const color=ci===0?C.soft:ci===2?(r.it.set?C.dose:C.soft):ci===4?C.draw:C.ink;
    lines.forEach((t,j)=>T(o,xx+(ci===0?6:3),y+pad+8*k+j*lh,t,ci===3&&j>0?'r':f,ci===3&&j>0?7.8*k:fs,ci===3&&j>0?C.soft:ci===5&&j>0?C.water:color));xx+=cw});
   Ln(o,x,y+r.h,x+w,y+r.h,C.rule,.8)}}));
 return {head,blocks}}

/* the week: the same day blocks as the screen, one row per compound, needles counted per day */
const DAYS=['M','T','W','T','F','S','S'];
const shot=it=>!/oral|capsule|tablet|nasal|topical|cream|serum/i.test(it.route||'');
function weekBlock(M,m,w,k,from,to){const items=m.items.slice(from,to);const wide=w>400,lab=wide?190:w-7*24;const bs=wide?21:19,step=(w-lab)/7,rh=(wide?27:27)*k;
 const per=[0,0,0,0,0,0,0];m.items.forEach(it=>{if(!shot(it))return;(it.dy||[]).forEach(d=>{per[d]+=it.times||1})});
 const h=18+items.length*rh+(to>=m.items.length?rh+4:0);
 return {h,draw(o,x,y){DAYS.forEach((d,j)=>{const cx=x+lab+j*step+(step-bs)/2;T(o,cx+bs/2-M.w(d,'mb',7.5)/2,y+11,d,'mb',7.5,C.soft)});
  let yy=y+18;items.forEach((it,ii)=>{const i=from+ii;const col=it.col[0]?it.col[0][0]:C.rule;
   R(o,x,yy+4,8,8,col,C.ink,.8);const nm=wrap(M,(i+1)+'  '+it.n,'b',9*k,lab-14)[0];T(o,x+13,yy+11,nm,'b',9*k,C.ink);
   T(o,x+13,yy+21*k,wrap(M,[it.dose,it.times>1?it.times+'× a day':'',shot(it)?'':it.route.split(/[ ,(]/)[0]].filter(Boolean).join(' · '),'r',7.6*k,lab-14)[0],'r',7.6*k,C.soft);
   const on=new Set(it.dy||[]);
   DAYS.forEach((d,j)=>{const bx=x+lab+j*step+(step-bs)/2,by=yy+2;if(on.has(j)){R(o,bx,by,bs,bs,C.ink);T(o,bx+bs/2-M.w(d,'mb',8)/2,by+bs/2+3,d,'mb',8,C.cream);if(it.times>1)T(o,bx+bs-6,by+6.5,String(it.times),'mb',5.5,C.cream)}else{R(o,bx,by,bs,bs,C.chip,C.rule,1);T(o,bx+bs/2-M.w(d,'mb',8)/2,by+bs/2+3,d,'mb',8,C.rule)}});
   if(!on.size)T(o,x+lab+4,yy+15,'as needed','r',8*k,C.soft);
   Ln(o,x,yy+rh-1,x+w,yy+rh-1,C.rule,.6);yy+=rh});
  if(to>=m.items.length){T(o,x,yy+15,'Needles a day','mb',7,C.draw);DAYS.forEach((d,j)=>{const t=String(per[j]);const cx=x+lab+j*step+step/2;T(o,cx-M.w(t,'mb',11*k)/2,yy+16,t,'mb',11*k,per[j]?C.draw:C.rule)})}}}}

function sectionHead(M,title,sentence,col,w,k){const sl=sentence?wrap(M,sentence,'r',8.6*k,w):[];const h=17+sl.length*11*k+(sl.length?3:0);
 return {h,draw(o,x,y){R(o,x,y+3,9,9,col);T(o,x+14,y+11,title,'mb',8.4,col);sl.forEach((l,j)=>T(o,x,y+24+j*11*k,l,'r',8.6*k,C.soft))}}}

/* ---------- the AI text (also on its own as Copy for your AI) ---------- */
function aiText(m){const d=m.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
 const L=[(m.title.toUpperCase())+' (Bare Signals, '+d+')','Keep track of this for me. Rules:',
 '1. This is my plan. Don’t change any dose unless I ask.',
 '2. When I say I took something, log it with the date, time and dose.',
 '3. Each week, show what I took, what I missed and what’s coming up.',
 '4. Remind me about the blood tests below: before I start, then as listed.',
 '5. If something sounds unsafe, say so and tell me to check with a doctor. This is not medical advice.','','COMPOUNDS'];
 m.items.forEach((it,i)=>{L.push((i+1)+'. '+it.n+': '+[it.dose,it.freq+(it.days&&it.days!=='Every day'?' ('+it.days+')':''),it.time,it.mixA&&[it.mixA,it.mixB].filter(Boolean).join(' ')+(it.draw?', draw '+it.draw:''),it.cycle,it.start&&'starts '+it.start,it.note&&'note: '+it.note].filter(Boolean).join('. ')+'.')});
 if(m.blood.length){L.push('');L.push('BLOOD WORK: '+m.blood.map(b=>b.n).join(', ')+'.')}
 if(m.supp.length){L.push('');L.push('SUPPLEMENTS: '+m.supp.map(b=>b.n).join(', ')+'.')}
 return L.join('\n')}

/* ---------- page layout ---------- */
function layout(M,fmt,m,forImage){const F=FMT[fmt],k=F.k,W=F.W,H=F.H,x0=F.m,full=W-F.m*2,top=F.top,bottom=H-F.bot;
 const pages=[];let pg,y;const newPage=()=>{pg={ops:[]};pages.push(pg);y=top};newPage();
 const room=()=>bottom-y;
 const put=b=>{if(b.h>room()&&y>top)newPage();b.draw(pg.ops,x0,y);y+=b.h};
 /* 1. the protocol: what you inject */
 put(headerBlock(M,m,full,k));y+=8;
 const tb=tableRows(M,m,full,k);put(tb.head);
 tb.blocks.forEach(b=>{if(b.h>room()){newPage();put(tb.head)}b.draw(pg.ops,x0,y);y+=b.h});
 /* 2. the week, on its own page on the phone (10 compounds to a page) */
 const wk=sectionHead(M,'YOUR WEEK','Dark squares are the days you take it, Monday to Sunday.',C.ink,full,k);
 if(fmt==='phone')newPage();else{y+=16;}
 for(let i=0;i<m.items.length;i+=10){const b=weekBlock(M,m,full,k,i,Math.min(i+10,m.items.length));
  if(wk.h+b.h>room()&&y>top)newPage();if(i===0){wk.draw(pg.ops,x0,y);y+=wk.h+4}b.draw(pg.ops,x0,y);y+=b.h+8}
 /* 3. blood work and supplements: one paragraph each, ready to highlight and send; one link to the full plan */
 const para=(head,label,text,link)=>{const pad=9,fs=9*k,lh=12.5*k;const L=wrap(M,text,'r',fs,full-pad*2);
  let i=0,first=true;y+=14;if(head.h+60>room())newPage();head.draw(pg.ops,x0,y);y+=head.h+2;
  while(i<L.length){let n=Math.floor((room()-pad*2-14-(link?18:0))/lh);if(n<2){newPage();continue}
   const part=L.slice(i,i+n),h=pad*2+12+part.length*lh,X=x0,Y=y;
   R(pg.ops,X,Y,full,h,C.white,C.ink,1,[3,2]);T(pg.ops,X+pad,Y+pad+6,first?label:label+' (continued)','mb',6.6,C.draw);
   part.forEach((t,j)=>T(pg.ops,X+pad,Y+pad+17+j*lh,t,'r',fs,C.ink));y+=h;i+=n;first=false;if(i<L.length)newPage()}
  if(link){const t=forImage?link.short:link.label;y+=4;T(pg.ops,x0,y+9,link.lead,'r',8.4*k,C.soft);const lx=x0+M.w(link.lead,'r',8.4*k)+4;
   T(pg.ops,lx,y+9,t,'b',8.4*k,C.water);Ln(pg.ops,lx,y+11,lx+M.w(t,'b',8.4*k),y+11,C.water,.7);if(!forImage)pg.ops.push({k:'a',x:lx,y:y,w:M.w(t,'b',8.4*k),h:12,url:link.url});y+=14}};
 if(m.blood.length)para(sectionHead(M,'BLOOD WORK',null,C.blood,full,k),'COPY THIS LIST · '+m.blood.length+' TESTS',m.blood.map(b=>b.n).join(', ')+'.',
  {lead:'When to test each one:',label:'open your full plan',short:'baresignals.co/blood',url:m.link||'https://baresignals.co/blood/'});
 if(m.supp.length)para(sectionHead(M,'SUPPLEMENTS',null,C.supp,full,k),'COPY THIS LIST · '+m.supp.length,m.supp.map(b=>b.n).join(', ')+'.');
 /* 4. for your AI */
 const ah=sectionHead(M,'FOR YOUR AI','Paste this into ChatGPT or Claude, or send it this whole file. The rules for keeping track are written in.',C.water,full,k);
 y+=14;if(ah.h+100>room())newPage();ah.draw(pg.ops,x0,y);y+=ah.h+2;
 {const pad=9,lh=10.6*k,fs=7.8*k;const L=[];aiText(m).split('\n').forEach(t=>wrap(M,t,'m',fs,full-pad*2).forEach(x=>L.push(x)));let i=0,first=true;
  while(i<L.length){let n=Math.floor((room()-pad*2-14)/lh);if(n<3){newPage();continue}let l2=lh;const left=L.length-i;if(left>n&&left-n<=5){const t=(room()-pad*2-14)/left;if(t>=lh*.85){l2=t;n=left}}
   const part=L.slice(i,i+n),h=pad*2+12+part.length*l2;R(pg.ops,x0,y,full,h,C.white,C.ink,1,[3,2]);T(pg.ops,x0+pad,y+pad+6,first?'COPY FOR YOUR AI':'COPY FOR YOUR AI (continued)','mb',6.6,C.draw);
   part.forEach((t,j)=>T(pg.ops,x0+pad,y+pad+16+j*l2,t,'m',fs,C.ink));y+=h;i+=n;first=false;if(i<L.length)newPage()}}
 /* footers: just the name and the page */
 pages.forEach((p,i)=>{const fy=H-F.bot+18;Ln(p.ops,x0,fy-11,W-x0,fy-11,C.rule,.8);T(p.ops,x0,fy,'Bare Signals','mb',7,C.soft);const n=(i+1)+' / '+pages.length;T(p.ops,W-x0-M.w(n,'mb',7),fy,n,'mb',7,C.soft)});
 return {pages,W,H}}

/* ---------- PDF writer ---------- */
function hex(c){const n=parseInt(c.slice(1),16);return [(n>>16&255)/255,(n>>8&255)/255,(n&255)/255].map(v=>v.toFixed(3)).join(' ')}
function pstr(t){let o='';for(const ch of clean(t)){const b=winCode(ch);const c=String.fromCharCode(b);o+=(c==='('||c===')'||c==='\\')?'\\'+c:c}return '('+o+')'}
const PF={r:'F1',b:'F2',h:'F2',m:'F3',mb:'F4'};
function toPDF(L,title){const {pages,W,H}=L;const objs=[];const add=s=>{objs.push(s);return objs.length};
 const fonts=['Helvetica','Helvetica-Bold','Courier','Courier-Bold'].map(n=>add(`<< /Type /Font /Subtype /Type1 /BaseFont /${n} /Encoding /WinAnsiEncoding >>`));
 const pagesId=objs.length+1;add('');const kids=[];
 pages.forEach(p=>{let s=`${hex(C.paper)} rg 0 0 ${W.toFixed(2)} ${H.toFixed(2)} re f\n`;
  p.ops.forEach(o=>{if(o.k==='r'){const y=H-o.y-o.h;if(o.fill)s+=`${hex(o.fill)} rg ${o.x.toFixed(2)} ${y.toFixed(2)} ${o.w.toFixed(2)} ${o.h.toFixed(2)} re f\n`;if(o.stroke)s+=`${o.dash?'['+o.dash.join(' ')+'] 0 d ':''}${hex(o.stroke)} RG ${o.lw} w ${o.x.toFixed(2)} ${y.toFixed(2)} ${o.w.toFixed(2)} ${o.h.toFixed(2)} re S${o.dash?' [] 0 d':''}\n`}
   else if(o.k==='l')s+=`${o.dash?'['+o.dash.join(' ')+'] 0 d ':''}${hex(o.c)} RG ${o.lw} w ${o.x1.toFixed(2)} ${(H-o.y1).toFixed(2)} m ${o.x2.toFixed(2)} ${(H-o.y2).toFixed(2)} l S${o.dash?' [] 0 d':''}\n`;
   else if(o.k==='t'&&o.t!=='')s+=`BT /${PF[o.f]} ${o.s.toFixed(2)} Tf ${hex(o.c)} rg ${o.x.toFixed(2)} ${(H-o.y).toFixed(2)} Td ${pstr(o.t)} Tj ET\n`});
  const cid=add(`<< /Length ${s.length} >>\nstream\n${s}endstream`);
  const an=p.ops.filter(o=>o.k==='a').map(o=>add(`<< /Type /Annot /Subtype /Link /Rect [${o.x.toFixed(2)} ${(H-o.y-o.h).toFixed(2)} ${(o.x+o.w).toFixed(2)} ${(H-o.y).toFixed(2)}] /Border [0 0 0] /A << /S /URI /URI ${pstr(o.url)} >> >>`));
  kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W.toFixed(2)} ${H.toFixed(2)}] /Resources << /Font << /F1 ${fonts[0]} 0 R /F2 ${fonts[1]} 0 R /F3 ${fonts[2]} 0 R /F4 ${fonts[3]} 0 R >> >> /Contents ${cid} 0 R${an.length?' /Annots ['+an.map(a=>a+' 0 R').join(' ')+']':''} >>`))});
 objs[pagesId-1]=`<< /Type /Pages /Kids [${kids.map(k=>k+' 0 R').join(' ')}] /Count ${kids.length} >>`;
 const info=add(`<< /Title ${pstr(title)} /Producer (Bare Signals) >>`);const cat=add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
 let out='%PDF-1.4\n%âãÏÓ\n';const off=[];objs.forEach((o,i)=>{off.push(out.length);out+=`${i+1} 0 obj\n${o}\nendobj\n`});
 const xref=out.length;out+=`xref\n0 ${objs.length+1}\n0000000000 65535 f \n`+off.map(n=>String(n).padStart(10,'0')+' 00000 n \n').join('');
 out+=`trailer\n<< /Size ${objs.length+1} /Root ${cat} 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF`;
 const u=new Uint8Array(out.length);for(let i=0;i<out.length;i++)u[i]=out.charCodeAt(i)&255;return new Blob([u],{type:'application/pdf'})}

/* ---------- canvas pictures ---------- */
async function fontsReady(){try{await Promise.all(['500 12px "Hanken Grotesk"','600 12px "Hanken Grotesk"','700 12px "Bricolage Grotesque"','500 12px "JetBrains Mono"','700 12px "JetBrains Mono"'].map(f=>document.fonts.load(f)));await document.fonts.ready}catch(e){}}
function toPNGs(L,S){const {pages,W,H}=L;return Promise.all(pages.map(p=>new Promise(res=>{const cv=document.createElement('canvas');cv.width=Math.round(W*S);cv.height=Math.round(H*S);const cx=cv.getContext('2d');cx.scale(S,S);
 cx.fillStyle=C.paper;cx.fillRect(0,0,W,H);cx.textBaseline='alphabetic';
 p.ops.forEach(o=>{if(o.k==='r'){if(o.fill){cx.fillStyle=o.fill;cx.fillRect(o.x,o.y,o.w,o.h)}if(o.stroke){cx.setLineDash(o.dash||[]);cx.strokeStyle=o.stroke;cx.lineWidth=o.lw;cx.strokeRect(o.x,o.y,o.w,o.h);cx.setLineDash([])}}
  else if(o.k==='l'){cx.setLineDash(o.dash||[]);cx.strokeStyle=o.c;cx.lineWidth=o.lw;cx.beginPath();cx.moveTo(o.x1,o.y1);cx.lineTo(o.x2,o.y2);cx.stroke();cx.setLineDash([])}
  else if(o.k==='t'){cx.font=cfont(o.f,o.s);cx.fillStyle=o.c;cx.fillText(o.t,o.x,o.y)}});
 cv.toBlob(b=>res(b),'image/png')}))) }

/* ---------- handing the files over ---------- */
const stamp=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
function download(files){files.forEach((f,i)=>setTimeout(()=>{const a=document.createElement('a');a.href=URL.createObjectURL(f);a.download=f.name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000)},i*300))}
async function deliver(files,what){const touch=matchMedia('(pointer:coarse)').matches;
 if(touch&&navigator.canShare&&navigator.canShare({files})){try{await navigator.share({files,title:'Bare Signals protocol'});return}catch(e){if(e&&e.name==='AbortError')return;if(e&&e.name==='NotAllowedError')return readyTap(files,what)}}
 download(files);const t=window.BS_SCANX&&window.BS_SCANX.toast;if(t)t(what+' downloaded')}
/* Safari only lets the share sheet open straight from a tap; if building the file took too long, one more tap opens it */
function readyTap(files,what){const pane=document.querySelector('.sheet10 .pane');if(!pane)return download(files);let b=pane.querySelector('.ready10');if(!b){b=document.createElement('button');b.className='btn main ready10';b.style.marginTop='12px';pane.appendChild(b)}
 b.innerHTML=`<b>${what} ready · tap to save</b><span>${files.length>1?files.length+' files':files[0].name}</span>`;
 b.onclick=async()=>{try{await navigator.share({files,title:'Bare Signals protocol'})}catch(e){if(!(e&&e.name==='AbortError'))download(files)}b.remove()}}

async function run(kind,m){const name=(m.title.replace(/[’']/g,'').replace(/[^A-Za-z0-9 ]+/g,' ').trim()||'Protocol')+' '+stamp();
 if(kind==='phone'||kind==='paper'){const L=layout(pdfMeasure(),kind,m);const blob=toPDF(L,m.title);
  return deliver([new File([blob],'Bare Signals '+name+(kind==='phone'?' phone':' A4')+'.pdf',{type:'application/pdf'})],kind==='phone'?'Phone PDF':'Paper PDF')}
 if(kind==='img'){await fontsReady();const L=layout(canvasMeasure(),'phone',m,true);const blobs=await toPNGs(L,3);
  return deliver(blobs.map((b,i)=>new File([b],`Bare Signals ${name} ${i+1} of ${blobs.length}.png`,{type:'image/png'})),blobs.length>1?blobs.length+' pictures':'Picture')}}
window.BSSave={run,aiText,_layout:layout,_toPDF:toPDF,_toPNGs:toPNGs,_pdfMeasure:pdfMeasure,_canvasMeasure:canvasMeasure,_fontsReady:fontsReady};
})();
