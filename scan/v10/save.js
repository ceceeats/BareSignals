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
 phone:{W:360,H:780,m:18,top:20,bot:34,cols:1,gap:10,k:1},
 paper:{W:595.28,H:841.89,m:34,top:34,bot:40,cols:2,gap:14,k:1.06}
};

/* ---------- blocks: {h, draw(ops,x,y)} measured for a width ---------- */
function T(ops,x,y,t,f,s,col){ops.push({k:'t',x,y,t,f,s,c:col})}
function R(ops,x,y,w,h,fill,stroke,lw,dash){ops.push({k:'r',x,y,w,h,fill,stroke,lw:lw||1,dash})}
function Ln(ops,x1,y1,x2,y2,col,lw,dash){ops.push({k:'l',x1,y1,x2,y2,c:col,lw:lw||1,dash})}

function headerBlock(M,m,w,k){const ti=wrap(M,m.title,'h',22*k,w);const n=m.items.length;
 const sub=m.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+' · '+n+(n===1?' compound':' compounds');
 const h=12+ti.length*25*k+16+12;
 return {h,draw(o,x,y){T(o,x,y+8,'BARE SIGNALS · MY PROTOCOL','mb',7.5,C.draw);let yy=y+12+20*k;ti.forEach(l=>{T(o,x,yy,l,'h',22*k,C.ink);yy+=25*k});
  T(o,x,yy-5,sub,'r',10*k,C.soft);
  const band=m.items.map(i=>i.col[0]?i.col[0][0]:C.rule);const bw=w/Math.max(1,band.length);band.forEach((c,i)=>R(o,x+i*bw,yy+3,bw,6,c));R(o,x,yy+3,w,6,null,C.ink,1)}}}

function glanceBlock(M,m,w,k){const rows=m.items.map((it,i)=>{const right=[it.dose,it.freq].filter(Boolean).join(' · ');const nameW=w-26-M.w(right,'b',9.5*k)-8;
  const one=M.w(it.n,'b',10*k)<=nameW;return {it,i,right,one,h:one?17*k:29*k}});
 const h=16+rows.reduce((a,r)=>a+r.h,0)+4;
 return {h,draw(o,x,y){T(o,x,y+9,'AT A GLANCE','mb',7.5,C.soft);let yy=y+16;
  rows.forEach(r=>{Ln(o,x,yy,x+w,yy,C.rule,.8);const c=r.it.col[0]?r.it.col[0][0]:C.rule;R(o,x,yy+4*k,9,9,c,C.ink,.8);
   T(o,x+14,yy+11.5*k,String(r.i+1),'mb',7,C.soft);T(o,x+26,yy+12*k,r.it.n,'b',10*k,C.ink);
   const rx=x+w-M.w(r.right,'b',9.5*k);T(o,r.one?rx:x+26,r.one?yy+12*k:yy+24*k,r.right,'b',9.5*k,r.it.set?C.dose:C.soft);yy+=r.h});
  Ln(o,x,yy,x+w,yy,C.rule,.8)}}}

function cardBlock(M,it,i,w,k){const pad=10,iw=w-pad*2;const nameL=wrap(M,it.n,'h',13.5*k,iw-30-M.w(it.c,'mb',7.5));
 /* dose line as runs */
 const runs=[[it.dose,'b',13*k,it.set?C.dose:C.soft]];if(it.draw)runs.push(['  '+it.draw,'b',12*k,C.draw]);if(it.freq)runs.push(['  '+it.freq,'r',10.5*k,C.ink]);
 const det=[['WHEN',[it.days,it.time].filter(Boolean).join(' · ')],['VIAL',it.vial],['CYCLE',(it.cycle||'').replace(/^Cycle /,'')],['START',it.start],['ROUTE',it.route],['NOTE',it.note]].filter(r=>r[1]);
 const lw=40,vw=iw-lw;const detL=det.map(([l,v])=>[l,wrap(M,v,'r',9.5*k,vw)]);
 const doseL=(()=>{const lines=[[]];let cur=0;runs.forEach(([t,f,s,c])=>{const ww=M.w(t,f,s);if(cur+ww>iw-18&&lines[lines.length-1].length){lines.push([]);cur=0;t=t.replace(/^ +/,'')}lines[lines.length-1].push([t,f,s,c]);cur+=M.w(t,f,s)});return lines})();
 const h=5+pad+nameL.length*16*k+4+doseL.length*17*k+4+detL.reduce((a,d)=>a+d[1].length*12.5*k+3,0)+pad-2;
 return {h,keep:true,draw(o,x,y){R(o,x,y,w,h,C.chip,C.ink,1);const bw=it.col.reduce((a,c)=>a+c[1],0)||1;let sx=x;it.col.forEach(([c,wt])=>{const ww=w*wt/bw;R(o,sx,y,ww,5,c);sx+=ww});Ln(o,x,y+5,x+w,y+5,C.ink,1);
  let yy=y+5+pad+11*k;R(o,x+pad,yy-9.5*k,16,12*k,C.ink);T(o,x+pad+(i+1>9?2:4.6),yy-.5,String(i+1),'mb',8,C.white);
  nameL.forEach((l,j)=>{T(o,x+pad+22,yy+j*16*k,l,'h',13.5*k,C.ink)});T(o,x+w-pad-M.w(it.c,'mb',7.5),yy-1,it.c,'mb',7.5,C.soft);
  yy+=(nameL.length-1)*16*k+8+13*k;
  doseL.forEach((line,j)=>{let xx=x+pad;if(j===0){R(o,xx,yy-10*k,13,13*k,C.dose);T(o,xx+3.2,yy-.5,'D','mb',9,C.cream);xx+=18}else xx+=18;line.forEach(([t,f,s,c])=>{T(o,xx,yy,t,f,s,c);xx+=M.w(t,f,s)});yy+=17*k});
  yy+=1;detL.forEach(([l,lines])=>{T(o,x+pad,yy,l,'mb',6.8,C.soft);lines.forEach((t,j)=>T(o,x+pad+lw,yy+j*12.5*k,t,'r',9.5*k,C.ink));yy+=lines.length*12.5*k+3})}}}

function sectionHead(M,title,sentence,col,w,k){const sl=wrap(M,sentence,'r',9.5*k,w);const h=24+sl.length*12.5*k+4;
 return {h,keepNext:true,draw(o,x,y){R(o,x,y+4,10,10,col);T(o,x+16,y+13,title,'mb',9,col);sl.forEach((l,j)=>T(o,x,y+28+j*12.5*k,l,'r',9.5*k,C.soft))}}}
function listRow(M,r,col,w,k){const nl=wrap(M,r.n,'b',10*k,w-16);const fl=r.w&&r.w.length?wrap(M,'for '+r.w.join(', '),'r',8.5*k,w-16):[];const h=nl.length*13*k+fl.length*11*k+6;
 return {h,draw(o,x,y){R(o,x,y+3.5,8,8,col);nl.forEach((l,j)=>T(o,x+15,y+11*k+j*13*k,l,'b',10*k,C.ink));fl.forEach((l,j)=>T(o,x+15,y+11*k+nl.length*13*k+j*11*k-2,l,'r',8.5*k,C.soft))}}}
/* a copy box: label + mono lines; split into pieces that fit (continued) */
function copyPieces(M,label,lines,w,avail,full,k){const lh=11.5*k,pad=9;const L=[];lines.forEach(t=>wrap(M,t,'m',8.4*k,w-pad*2).forEach(x=>L.push(x)));
 const pieces=[];let i=0,first=true;while(i<L.length){const room=Math.max(3,Math.floor(((first?avail:full)-pad*2-16)/lh));const part=L.slice(i,i+room);
  const lab=first?label:label+' (continued)';const h=pad*2+14+part.length*lh;
  pieces.push({h,draw(o,x,y){R(o,x,y,w,h,C.white,C.ink,1,[3,2]);T(o,x+pad,y+pad+7,lab,'mb',7,C.draw);part.forEach((t,j)=>T(o,x+pad,y+pad+19+j*lh,t,'m',8.4*k,C.ink))}});i+=room;first=false}
 return pieces}

/* ---------- the AI text (also on its own as Copy for your AI) ---------- */
function aiText(m){const d=m.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
 const L=[(m.title.toUpperCase())+' (Bare Signals, '+d+')','Keep track of this for me. Rules:',
 '1. This is my plan. Don’t change any dose unless I ask.',
 '2. When I say I took something, log it with the date, time and dose.',
 '3. Each week, show what I took, what I missed and what’s coming up.',
 '4. Remind me about the blood tests below: before I start, then as listed.',
 '5. If something sounds unsafe, say so and tell me to check with a doctor. This is not medical advice.','','COMPOUNDS'];
 m.items.forEach((it,i)=>{L.push((i+1)+'. '+it.n+' ('+it.c+'): '+[it.dose,it.freq+(it.days&&it.days!=='Every day'?' ('+it.days+')':''),it.time,it.vial&&it.vial+(it.draw?', draw '+it.draw:''),it.cycle,it.start&&'starts '+it.start,it.note&&'note: '+it.note].filter(Boolean).join('. ')+'.')});
 if(m.blood.length){L.push('');L.push('BLOOD WORK: '+m.blood.map(b=>b.n).join('; '))}
 if(m.supp.length){L.push('');L.push('SUPPLEMENTS: '+m.supp.map(b=>b.n).join('; '))}
 return L.join('\n')}

/* ---------- page layout ---------- */
function layout(M,fmt,m){const F=FMT[fmt],k=F.k,W=F.W,H=F.H,x0=F.m,full=W-F.m*2,cw=F.cols>1?(full-F.gap)/2:full,top=F.top,bottom=H-F.bot;
 const pages=[];let pg,y;const newPage=()=>{pg={ops:[]};pages.push(pg);y=top};newPage();
 const room=()=>bottom-y;
 const put=(b,x,w)=>{b.draw(pg.ops,x,y);y+=b.h+F.gap};
 const putFull=b=>{if(b.h>room()&&y>top)newPage();put(b,x0,full)};
 /* cards: one column on the phone; on paper, each card goes to the shorter column (no holes) */
 const cards=(list)=>{if(F.cols===1){list.forEach(b=>putFull(b));return}
  let cy=[y,y];list.forEach(b=>{let c=cy[0]<=cy[1]?0:1;if(cy[c]+b.h>bottom){c=1-c;if(cy[c]+b.h>bottom){newPage();cy=[top,top];c=0}}b.draw(pg.ops,x0+c*(cw+F.gap),cy[c]);cy[c]+=b.h+F.gap});y=Math.max(cy[0],cy[1])};
 const rows=(head,list,copyLabel,copyLines)=>{const hb=head;const first=list[0];
  if(hb.h+(first?first.h:0)>room()&&y>top)newPage();put(hb,x0,full);y-=F.gap-4;
  if(F.cols===1)list.forEach(b=>{if(b.h>room())newPage();b.draw(pg.ops,x0,y);y+=b.h});
  else{let cy=[y,y];list.forEach(b=>{let c=cy[0]<=cy[1]?0:1;if(cy[c]+b.h>bottom){c=1-c;if(cy[c]+b.h>bottom){newPage();cy=[top,top];c=0}}b.draw(pg.ops,x0+c*(cw+F.gap),cy[c]);cy[c]+=b.h});y=Math.max(cy[0],cy[1])}
  y+=6;copyPieces(M,copyLabel,copyLines,full,room(),bottom-top,k).forEach((p,j)=>{if(p.h>room())newPage();put(p,x0,full)})};
 putFull(headerBlock(M,m,full,k));
 putFull(glanceBlock(M,m,full,k));
 cards(m.items.map((it,i)=>cardBlock(M,it,i,cw,k)));
 /* lists and the AI block flow down the columns (two on paper, one on the phone), in reading order, no half-empty pages */
 const num={};m.items.forEach((it,i)=>{num[it.n]=i+1});
 const lines=arr=>arr.map(r=>r.n+(r.w&&r.w.length?'  · for '+r.w.map(n=>num[n]).filter(Boolean).sort((a,b)=>a-b).join(', '):''));
 const fw=F.cols>1?cw:full,colX=c=>x0+c*(cw+F.gap);let col=0,flowTop=y,fy=y;
 const nextCol=()=>{col++;if(col>=F.cols){newPage();col=0;flowTop=top;fy=top}else fy=flowTop};
 const flow=(head,label,text)=>{
  if(head.h+70>bottom-fy&&fy>flowTop)nextCol();head.draw(pg.ops,colX(col),fy);fy+=head.h+2;
  const pad=9,lh0=11.5*k,over=pad*2+16;const L=[];text.forEach(t=>wrap(M,t,'m',8.4*k,fw-pad*2).forEach(x=>L.push(x)));
  let i=0,first=true;
  while(i<L.length){let room=bottom-fy;let n=Math.floor((room-over)/lh0);if(n<3){nextCol();continue}
   let lh=lh0;const left=L.length-i;
   if(left>n&&left-n<=5){const lh2=(room-over)/left;if(lh2>=lh0*.84){lh=lh2;n=left}}
   const part=L.slice(i,i+n),lab=first?label:label+' (continued)',h=over+part.length*lh,X=colX(col),Y=fy;
   R(pg.ops,X,Y,fw,h,C.white,C.ink,1,[3,2]);T(pg.ops,X+pad,Y+pad+7,lab,'mb',7,C.draw);part.forEach((t,j)=>T(pg.ops,X+pad,Y+pad+19+j*lh,t,'m',8.4*k,C.ink));
   fy+=h+F.gap;i+=n;first=false;if(i<L.length)nextCol()}};
 if(m.blood.length)flow(sectionHead(M,'BLOOD WORK','Tests to do before you start, so later results have something to compare to. The numbers are your cards. Not medical advice.',C.blood,fw,k),'BLOOD WORK · '+m.blood.length+' TESTS',lines(m.blood));
 if(m.supp.length)flow(sectionHead(M,'SUPPLEMENTS','What people take alongside these compounds. The numbers are your cards.',C.supp,fw,k),'SUPPLEMENTS · '+m.supp.length,lines(m.supp));
 flow(sectionHead(M,'FOR YOUR AI','Paste this into ChatGPT or Claude, or send it this whole file. The rules for keeping track are already written in.',C.water,fw,k),'COPY FOR YOUR AI',aiText(m).split('\n'));
 /* footers */
 pages.forEach((p,i)=>{const fy=H-F.bot+18;Ln(p.ops,x0,fy-11,W-x0,fy-11,C.rule,.8);T(p.ops,x0,fy,'Bare Signals · baresignals.co','mb',7,C.soft);const n=(i+1)+' / '+pages.length;T(p.ops,W-x0-M.w(n,'mb',7),fy,n,'mb',7,C.soft)});
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
  kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W.toFixed(2)} ${H.toFixed(2)}] /Resources << /Font << /F1 ${fonts[0]} 0 R /F2 ${fonts[1]} 0 R /F3 ${fonts[2]} 0 R /F4 ${fonts[3]} 0 R >> >> /Contents ${cid} 0 R >>`))});
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
 if(kind==='img'){await fontsReady();const L=layout(canvasMeasure(),'phone',m);const blobs=await toPNGs(L,3);
  return deliver(blobs.map((b,i)=>new File([b],`Bare Signals ${name} ${i+1} of ${blobs.length}.png`,{type:'image/png'})),blobs.length>1?blobs.length+' pictures':'Picture')}}
window.BSSave={run,aiText,_layout:layout,_toPDF:toPDF,_toPNGs:toPNGs,_pdfMeasure:pdfMeasure,_canvasMeasure:canvasMeasure,_fontsReady:fontsReady};
})();
