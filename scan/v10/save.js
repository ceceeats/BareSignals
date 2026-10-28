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
function headerBlock(M,m,w,k,forImage){const n=m.items.length;
 const sub=m.date.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})+' · '+n+(n===1?' compound':' compounds');
 const ti=wrap(M,m.title,'h',17*k,w-M.w(sub,'r',8.5*k)-10);const h=10+ti.length*19*k+6+(m.link?14:0);
 return {h,draw(o,x,y){T(o,x,y+7,'BARE SIGNALS · SUMMARY PROTOCOL','mb',6.8,C.draw);ti.forEach((l,j)=>T(o,x,y+10+15*k+j*19*k,l,'h',17*k,C.ink));
  T(o,x+w-M.w(sub,'r',8.5*k),y+10+15*k,sub,'r',8.5*k,C.soft);
  if(m.link){const yy=y+10+15*k+(ti.length-1)*19*k+14,lead=forImage?'Edit it any time: ':'Edit it any time on the website: ',t=forImage?'baresignals.co/protocol':'open your protocol →';
   T(o,x,yy,lead,'r',8*k,C.soft);const lx=x+M.w(lead,'r',8*k);T(o,lx,yy,t,'b',8*k,C.water);Ln(o,lx,yy+2,lx+M.w(t,'b',8*k),yy+2,C.water,.6);if(!forImage)o.push({k:'a',x:lx,y:yy-9,w:M.w(t,'b',8*k),h:12,url:m.link})}}}}

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

/* the week: one row per compound in its own colour, grouped by when you take it (morning, night, anytime) */
const DAYS=['M','T','W','T','F','S','S'];
const shot=it=>it.rk==='inj';
function lum(h){const n=parseInt(h.slice(1),16);return (0.299*(n>>16&255)+0.587*(n>>8&255)+0.114*(n&255))/255}
const onCol=h=>lum(h)>0.6?C.ink:C.white;
function Ci(ops,x,y,r,fill,stroke,lw){ops.push({k:'c',x,y,r,fill,stroke,lw:lw||1})}
function Pg(ops,pts,fill,stroke,lw){ops.push({k:'p',pts,fill,stroke,lw:lw||1})}
/* small route and time symbols, drawn as shapes so they work in the PDF and the pictures */
function icon(o,kind,x,y,s,col,bg){const c=col||C.ink;
 if(kind==='inj'){const cy=y+s/2;Ln(o,x,cy,x+s*.22,cy,c,.9);R(o,x+s*.22,cy-s*.17,s*.5,s*.34,null,c,.9);Ln(o,x+s*.36,cy-s*.17,x+s*.36,cy-s*.04,c,.6);Ln(o,x+s*.5,cy-s*.17,x+s*.5,cy-s*.04,c,.6);Ln(o,x+s*.72,cy,x+s*.92,cy,c,.9);Ln(o,x+s*.92,cy-s*.22,x+s*.92,cy+s*.22,c,1.1)}
 else if(kind==='nasal'){Pg(o,[[x+s*.38,y],[x+s*.62,y],[x+s*.62,y+s*.3],[x+s*.8,y+s*.95],[x+s*.2,y+s*.95],[x+s*.38,y+s*.3]],null,c,.9)}
 else if(kind==='oral'){const cy=y+s/2;R(o,x,cy-s*.2,s*.5,s*.4,c);R(o,x+s*.5,cy-s*.2,s*.5,s*.4,C.white,c,.9);R(o,x,cy-s*.2,s,s*.4,null,c,.9)}
 else if(kind==='sun'){const cx=x+s/2,cy=y+s/2;Ci(o,cx,cy,s*.2,c);for(let i=0;i<8;i++){const a=i*Math.PI/4;Ln(o,cx+Math.cos(a)*s*.32,cy+Math.sin(a)*s*.32,cx+Math.cos(a)*s*.47,cy+Math.sin(a)*s*.47,c,.9)}}
 else if(kind==='moon'){const cx=x+s/2,cy=y+s/2;Ci(o,cx,cy,s*.42,c);Ci(o,cx+s*.2,cy-s*.12,s*.36,bg||C.paper)}
 else if(kind==='any'){const cx=x+s/2,cy=y+s/2;Ci(o,cx,cy,s*.42,null,c,.9);Ln(o,cx,cy,cx,cy-s*.28,c,.9);Ln(o,cx,cy,cx+s*.2,cy,c,.9)}}
const GROUPS=[['AM','MORNING','sun'],['PM','NIGHT','moon'],['','ANYTIME','any']];
function weekParts(M,m,w,k){const wide=w>400,lab=wide?200:w-7*23;const bs=wide?21:18,step=(w-lab)/7,rh=27*k;
 const head={h:14,draw(o,x,y){DAYS.forEach((d,j)=>{const cx=x+lab+j*step+step/2;T(o,cx-M.w(d,'mb',7.5)/2,y+10,d,'mb',7.5,C.soft)})}};
 const rows=[];
 GROUPS.forEach(([key,label,ic])=>{const its=m.items.map((it,i)=>[it,i]).filter(([it])=>(it.tmA||'')===key);if(!its.length)return;
  rows.push({h:17,keepNext:true,draw(o,x,y){icon(o,ic,x,y+4,10,C.draw);T(o,x+14,y+12,label,'mb',7.6,C.draw);Ln(o,x+18+M.w(label,'mb',7.6),y+9,x+w,y+9,C.rule,.6)}});
  its.forEach(([it,i])=>{const col=it.col[0]?it.col[0][0]:C.rule;const on=new Set(it.dy||[]);
   const tag=[it.times>1?it.times+'× a day':'',it.tmB?it.tmB.toLowerCase():'',it.rk==='nasal'?'nasal':it.rk==='oral'?'by mouth':''].filter(Boolean).join(' · ');
   rows.push({h:rh,draw(o,x,y){const nm=wrap(M,(i+1)+'  '+it.n,'b',9*k,lab-8)[0];T(o,x,y+10,nm,'b',9*k,C.ink);
     icon(o,it.rk==='nasal'?'nasal':it.rk==='oral'?'oral':'inj',x,y+13.5,9,C.ink);
     const a=wrap(M,it.dose,'b',8.2*k,lab-20)[0]||'';T(o,x+12,y+21*k,a,'b',8.2*k,it.set?C.dose:C.soft);let ax=x+12+M.w(a,'b',8.2*k);
     if(it.draw&&it.rk==='inj'){const dt=' · '+it.draw;T(o,ax,y+21*k,dt,'b',8.2*k,C.draw);ax+=M.w(dt,'b',8.2*k)}
     if(tag){const tx=ax+5,room=lab-8-(tx-x);const t=wrap(M,'· '+tag,'r',7.6*k,Math.max(20,room))[0];if(M.w(t,'r',7.6*k)<=room)T(o,tx,y+21*k,t,'r',7.6*k,C.soft)}
     DAYS.forEach((d,j)=>{const bx=x+lab+j*step+(step-bs)/2,by=y+(rh-bs)/2-1;
      if(on.has(j)){R(o,bx,by,bs,bs,col,C.ink,.8);T(o,bx+bs/2-M.w(d,'mb',8)/2,by+bs/2+3,d,'mb',8,onCol(col));if(it.times>1)T(o,bx+bs-5.5,by+6,String(it.times),'mb',5.5,onCol(col))}
      else{R(o,bx,by,bs,bs,C.chip,C.rule,.8);T(o,bx+bs/2-M.w(d,'mb',8)/2,by+bs/2+3,d,'mb',8,C.rule)}});
     if(!on.size)T(o,x+lab+4,y+15,'as needed','r',8*k,C.soft);
     Ln(o,x,y+rh-.5,x+w,y+rh-.5,C.rule,.5)}})})});
 const per=[0,0,0,0,0,0,0];m.items.forEach(it=>{if(!shot(it))return;(it.dy||[]).forEach(d=>{per[d]+=it.times||1})});
 const foot={h:24,draw(o,x,y){icon(o,'inj',x,y+8,10,C.draw);T(o,x+14,y+16,'Needles a day','mb',7,C.draw);DAYS.forEach((d,j)=>{const t=String(per[j]);const cx=x+lab+j*step+step/2;T(o,cx-M.w(t,'mb',11*k)/2,y+17,t,'mb',11*k,per[j]?C.draw:C.rule)})}};
 return {head,rows,foot}}

/* two months ahead, as weeks 1-4 and 5-8 from the start week. Each compound keeps its own slot in every day
   (1-5 top row, 6-10 bottom): its colour while the first vial covers it, amber once they need to buy more, a red square on the last day of its cycle. */
const AMBER='#E8A33A';
function monthPlan(m){const day0=new Date(m.date);day0.setHours(0,0,0,0);const mon=new Date(day0);mon.setDate(mon.getDate()-((mon.getDay()+6)%7));
 const endD=new Date(mon);endD.setDate(endD.getDate()+76);const map={};
 m.items.forEach((it,ix)=>{const col=it.col[0]?it.col[0][0]:C.rule;const s=new Date(it.start||day0);s.setHours(0,0,0,0);const dy=new Set(it.dy||[]);let n=0;
  for(let d=new Date(s),i=0;d<=endD;d.setDate(d.getDate()+1),i++){if(it.cyc&&i>=it.cyc)break;
   const key=d.toDateString();let st=null;
   if(dy.has((d.getDay()+6)%7)){const before=n;n+=it.times||1;st=it.per&&before>0&&Math.floor((before-1)/it.per)<Math.floor((n-1)/it.per)?'buy':'ok'}
   if(it.cyc&&i===it.cyc-1)st='stop';
   if(st)(map[key]=map[key]||{})[ix]={col,st}}});
 return {map,day0,mon}}
function monthBlock(M,m,plan,w,k,wk0,label){const cw=w/7,big=cw>40,ch=big?40:34,n=m.items.length,per=5;
 const start=new Date(plan.mon);start.setDate(start.getDate()+wk0*7);const end=new Date(start);end.setDate(end.getDate()+27);
 const fd=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});const range=fd(start)+' – '+fd(end);const h=18+12+4*ch;
 return {h,draw(o,x,yy){T(o,x,yy+11,label,'h',11*k,C.ink);T(o,x+M.w(label,'h',11*k)+6,yy+11,range.toUpperCase(),'mb',6.6,C.soft);
  DAYS.forEach((d,j)=>T(o,x+j*cw+3,yy+26,d,'mb',6.4,C.soft));const top=yy+30;
  for(let i=0;i<28;i++){const dt=new Date(start);dt.setDate(dt.getDate()+i);const r=Math.floor(i/7),c=i%7,cx=x+c*cw,cy=top+r*ch;
   const past=dt<plan.day0,isStart=dt.getTime()===plan.day0.getTime();
   R(o,cx+.5,cy+.5,cw-1,ch-1,past?C.paper:C.chip,C.rule,.6);
   const lab=dt.getDate()===1||i===0?fd(dt):String(dt.getDate());T(o,cx+3,cy+8,lab,isStart?'mb':'m',6.4,isStart?C.draw:past?C.rule:C.soft);
   const D=plan.map[dt.toDateString()]||{};const ds=big?5.6:4.4,gap=(cw-6)/per;
   for(let ix=0;ix<Math.min(n,10);ix++){const q=D[ix];if(!q)continue;const px=cx+3+(ix%per)*gap+gap/2,py=cy+15+Math.floor(ix/per)*(ds+3.4)+ds/2;
    if(q.st==='stop')Ci(o,px,py,ds/2,C.white,C.flag,1);else if(q.st==='buy')Ci(o,px,py,ds/2,mix(q.col,.62),C.soft,.5);else Ci(o,px,py,ds/2,q.col,C.ink,.4)}}}}}
/* Option A, calendar: five weeks to a page, every day lists its compounds by name, one per line (zoom in for detail).
   Solid = a dose; faded = this dose starts a new vial (buy before this day); red outline "Ends" = last dose of the cycle. */
function mix(h,a){const n=parseInt(h.slice(1),16),r=n>>16&255,g=n>>8&255,b=n&255,f=v=>Math.round(v+(255-v)*a).toString(16).padStart(2,'0');return '#'+f(r)+f(g)+f(b)}
/* one text size for every tag; blends shortened (BPC-157 + TB-500 -> BPC + TB), anything still long is trimmed */
const tagName=n=>/ \+ /.test(n)?n.split(' + ').map(p=>p.replace(/-\d+$/,'').replace(/ \(.*\)$/,'')).join(' + '):n;
function trim(M,t,f,fs,w){if(M.w(t,f,fs)<=w)return t;let s=t;while(s.length>3&&M.w(s+'…',f,fs)>w)s=s.slice(0,-1);return s+'…'}
function drawTag(o,M,x,y,w,h,name,q,fs){const pad=2.2,ty=y+h/2+fs*.36;name=tagName(name);
 if(q.st==='stop'){R(o,x,y,w,h,C.white,C.rule,.6);const r=Math.min(h*.34,3);Ci(o,x,y+h/2,r,C.white,C.flag,1.1);T(o,x+pad+r*.7,ty,trim(M,name,'b',fs,w-pad*2-r*.7),'b',fs,C.ink);return}
 if(q.st==='buy'){R(o,x,y,w,h,mix(q.col,.62),C.soft,.5,[1.4,1]);T(o,x+pad,ty,trim(M,name,'b',fs,w-pad*2),'b',fs,C.soft);return}
 R(o,x,y,w,h,q.col,C.ink,.35);T(o,x+pad,ty,trim(M,name,'b',fs,w-pad*2),'b',fs,onCol(q.col))}
function calBlock(M,m,plan,w,k,wk0,label,avail){const cw=w/7,n=m.items.length;
 const start=new Date(plan.mon);start.setDate(start.getDate()+wk0*7);const end=new Date(start);end.setDate(end.getDate()+34);
 const fd=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
 const ch=Math.max(50,Math.min(130,(avail-34)/5));const th=Math.max(5.5,Math.min(10,(ch-14)/Math.max(1,n)-1.1));
 let fsMax=Math.min(6.4,th*.72);const fitW=cw-5-4.4;m.items.forEach(it=>{const t=tagName(it.n);if(t.length<=14)while(fsMax>5.4&&M.w(t,'b',fsMax)>fitW)fsMax-=.1});const h=18+12+5*ch;
 return {h,draw(o,x,yy){T(o,x,yy+11,label,'h',11*k,C.ink);T(o,x+M.w(label,'h',11*k)+6,yy+11,(fd(start)+' – '+fd(end)).toUpperCase(),'mb',6.6,C.soft);
  DAYS.forEach((d,j)=>T(o,x+j*cw+3,yy+26,d,'mb',6.4,C.soft));const top=yy+30;
  for(let i=0;i<35;i++){const dt=new Date(start);dt.setDate(dt.getDate()+i);const r=Math.floor(i/7),c=i%7,cx=x+c*cw,cy=top+r*ch;
   const past=dt<plan.day0,isStart=dt.getTime()===plan.day0.getTime();
   R(o,cx+.5,cy+.5,cw-1,ch-1,past?C.paper:(c>4?'#FBF8E4':C.chip),C.rule,.6);
   const lab=dt.getDate()===1||i===0?fd(dt):String(dt.getDate());T(o,cx+3,cy+8.5,lab,isStart?'mb':'m',6.6,isStart?C.draw:past?C.rule:C.soft);
   const D=plan.map[dt.toDateString()]||{};let s=0;
   for(let ix=0;ix<n;ix++){const q=D[ix];if(!q)continue;drawTag(o,M,cx+2.5,cy+12+s*(th+1.1),cw-5,th,m.items[ix].n,q,fsMax);s++}}}}}
/* Option B, tracker: one row per compound, one column per day, 30 days to a strip, two strips to a page */
function trackBlock(M,m,plan,w,k,d0,label){const n=m.items.length,lab=Math.min(110,w*.32),nd=30,cw=(w-lab)/nd,rh=17*k;
 const start=new Date(plan.day0);start.setDate(start.getDate()+d0);const end=new Date(start);end.setDate(end.getDate()+nd-1);
 const fd=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});const h=18+20+n*rh+2;
 return {h,draw(o,x,yy){T(o,x,yy+11,label,'h',11*k,C.ink);T(o,x+M.w(label,'h',11*k)+6,yy+11,(fd(start)+' – '+fd(end)).toUpperCase(),'mb',6.6,C.soft);
  const top=yy+38;
  for(let j=0;j<nd;j++){const dt=new Date(start);dt.setDate(dt.getDate()+j);const cx=x+lab+j*cw,wd=(dt.getDay()+6)%7;
   if(wd>4)R(o,cx,top-2,cw,n*rh+2,'#F6F1D2');
   const t=dt.getDate()===1?dt.toLocaleDateString('en-GB',{month:'short'}):String(dt.getDate());if(wd===0||dt.getDate()===1||j===0)T(o,cx+1,top-12,t,dt.getDate()===1?'mb':'m',6,dt.getDate()===1?C.draw:C.soft);
   T(o,cx+cw/2-M.w(DAYS[wd],'m',5)/2,top-4,DAYS[wd],'m',5,C.rule);if(wd===0&&j)Ln(o,cx,top-2,cx,top+n*rh,C.rule,.6)}
  m.items.forEach((it,ix)=>{const ry=top+ix*rh;const col=it.col[0]?it.col[0][0]:C.rule;
   T(o,x,ry+rh*.62,wrap(M,(ix+1)+' '+it.n,'b',7.6*k,lab-6)[0],'b',7.6*k,C.ink);
   for(let j=0;j<nd;j++){const dt=new Date(start);dt.setDate(dt.getDate()+j);const q=(plan.map[dt.toDateString()]||{})[ix];if(!q)continue;
    const s=Math.min(cw-1.6,rh-5),cx=x+lab+j*cw+(cw-s)/2,cy=ry+(rh-s)/2;
    if(q.st==='stop'){Ci(o,cx+s/2,cy+s/2,s/2-.4,C.white,C.flag,1)}else if(q.st==='buy')R(o,cx,cy,s,s,mix(col,.62),C.soft,.5,[1.2,.8]);else R(o,cx,cy,s,s,col,C.ink,.35)}
   Ln(o,x,ry+rh,x+w,ry+rh,C.rule,.4)})}}}
function monthKey(M,m,w,k,style){const chips=style==='cal'?[]:m.items.map((it,i)=>[(i+1)+' '+it.n,it.col[0]?it.col[0][0]:C.rule]);const fs=7.4*k;
 const lines=[[]];let cur=0;chips.forEach(c=>{const ww=M.w(c[0],'r',fs)+16;if(cur+ww>w&&lines[lines.length-1].length){lines.push([]);cur=0}lines[lines.length-1].push(c);cur+=ww});
 const h=lines.length*12+60;
 return {h,draw(o,x,y){lines.forEach((ln,li)=>{let xx=x;ln.forEach(([t,c])=>{Ci(o,xx+3,y+li*12+5,2.6,c,C.ink,.4);T(o,xx+8,y+li*12+7.5,t,'r',fs,C.ink);xx+=M.w(t,'r',fs)+16})});
  let ly=y+(chips.length?lines.length*12+10:6);const sw=[['dot','A dose'],['buy','Faded: new vial from this dose, buy before'],['stop','Cycle ends, then rest']];let xx=x;
  sw.forEach(([st,t])=>{const c='#E1DE62';if(st==='stop'){R(o,xx,ly-6,22,8,C.white,C.rule,.6);Ci(o,xx,ly-2,2.8,C.white,C.flag,1.1)}else if(st==='buy')R(o,xx,ly-6,22,8,mix(c,.62),C.soft,.5,[1.4,1]);else R(o,xx,ly-6,22,8,c,C.ink,.35);
   T(o,xx+27,ly,t,'r',7.2*k,C.soft);xx+=27+M.w(t,'r',7.2*k)+14;if(xx>x+w-110){xx=x;ly+=13}});
  {const rs=m.items.filter(it=>it.cyc&&it.rest).map(it=>tagName(it.n)+' '+it.rest);if(rs.length){ly+=13;wrap(M,'Rest after the cycle: '+rs.join(' · '),'r',7.2*k,w).forEach((l,j)=>{T(o,x,ly+j*9.5,l,'r',7.2*k,C.ink)});ly+=(wrap(M,'Rest after the cycle: '+rs.join(' · '),'r',7.2*k,w).length-1)*9.5}}
  wrap(M,style==='cal'?'Zoom in to read a day. Counted from today or the start date you set.':style==='track'?'One row per compound, one column per day. Shaded columns are weekends. Counted from today or the start date you set.':'Each day shows compounds 1 to 5 on the top row, 6 to 10 below, from today or the start date you set.','r',7*k,w).forEach((l,j)=>T(o,x,ly+13+j*9.5,l,'r',7*k,C.soft))}}}

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
 /* 1. your week first: what you take, when, how much */
 put(headerBlock(M,m,full,k,forImage));y+=6;
 const wk=sectionHead(M,'YOUR WEEK','Coloured squares are the days you take it. Morning, night or anytime, with how much to draw.',C.ink,full,k);put(wk);
 const P=weekParts(M,m,full,k);put(P.head);
 P.rows.forEach((r,ri)=>{const need=r.h+(r.keepNext&&P.rows[ri+1]?P.rows[ri+1].h:0);if(need>room()){newPage();put(P.head)}r.draw(pg.ops,x0,y);y+=r.h});
 if(P.foot.h>room())newPage();P.foot.draw(pg.ops,x0,y);y+=P.foot.h;
 /* gentle warnings right under the week */
 (m.warn||[]).forEach(t=>{const L=wrap(M,t,'r',8.4*k,full-110);const h=L.length*11*k+12;if(h>room())newPage();y+=6;
  R(pg.ops,x0,y,full,h,'#FFF6E5');R(pg.ops,x0,y,3,h,AMBER);T(pg.ops,x0+9,y+10.5,'GENTLE WARNING','mb',6.6,'#B9741A');L.forEach((l,j)=>T(pg.ops,x0+92,y+10.5+j*11*k,l,'r',8.4*k,C.ink));y+=h});
 /* two months ahead: 'cal' = calendar with vial codes (one page per five weeks), 'track' = rows per compound (two 30-day strips), 'dots' = the compact grid */
 {const plan=monthPlan(m),style=m.monthStyle||'cal',kk=()=>monthKey(M,m,full,k,style);
  if(style==='cal'){[0,5].forEach((w0,i)=>{if(fmt==='phone'||i===0)newPage();else y+=14;const head=sectionHead(M,i?'WEEKS 6–10':'YOUR NEXT TWO MONTHS',null,C.ink,full,k);put(head);
    const key=kk();const b=calBlock(M,m,plan,full,k,w0,i?'Weeks 6–10':'Weeks 1–5',room()-key.h-10);b.draw(pg.ops,x0,y);y+=b.h+8;key.draw(pg.ops,x0,y);y+=key.h})}
  else if(style==='track'){newPage();put(sectionHead(M,'YOUR NEXT TWO MONTHS',null,C.ink,full,k));[0,30].forEach((d0,i)=>{const b=trackBlock(M,m,plan,full,k,d0,i?'Days 31–60':'Days 1–30');if(b.h>room())newPage();b.draw(pg.ops,x0,y);y+=b.h+10});const key=kk();if(key.h>room())newPage();key.draw(pg.ops,x0,y);y+=key.h}
  else{const head=sectionHead(M,'TWO MONTHS AHEAD',null,C.ink,full,k);
   if(fmt==='phone'){newPage();put(head);[0,4].forEach((w0,i)=>{const b=monthBlock(M,m,plan,full,k,w0,i?'Weeks 5–8':'Weeks 1–4');if(b.h>room())newPage();b.draw(pg.ops,x0,y);y+=b.h+8});const key=kk();if(key.h>room())newPage();key.draw(pg.ops,x0,y);y+=key.h}
   else{const hw=(full-16)/2,bs=[0,4].map((w0,i)=>monthBlock(M,m,plan,hw,k,w0,i?'Weeks 5–8':'Weeks 1–4'));const key=kk();const need=head.h+Math.max(bs[0].h,bs[1].h)+key.h+20;
    if(need>room())newPage();else y+=14;put(head);bs.forEach((b,i)=>b.draw(pg.ops,x0+i*(hw+16),y));y+=Math.max(bs[0].h,bs[1].h)+8;key.draw(pg.ops,x0,y);y+=key.h}}}
 /* 2. the details (dose, how often, draw, mix) with blood work and supplements right under.
    Phone: its own page. Paper: the table is never split; if it won't fit under the week, the two lists fill that space first. */
 const doTable=()=>{
 put(sectionHead(M,'MY PROTOCOL',null,C.ink,full,k));
 const tb=tableRows(M,m,full,k);put(tb.head);
 tb.blocks.forEach(b=>{if(b.h>room()){newPage();put(tb.head)}b.draw(pg.ops,x0,y);y+=b.h});
 };
 const doLists=()=>{  /* blood work and supplements: one paragraph each, ready to highlight and send; one link to the full plan */
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
 };
 const tbH=17+16+tableRows(M,m,full,k).blocks.reduce((a,b)=>a+b.h,0);
 if(fmt==='phone'){newPage();doTable();doLists()}
 else if(tbH+16<=room()){y+=16;doTable();doLists()}
 else{doLists();newPage();doTable()}
 /* 4. for your AI */
 const ah=sectionHead(M,'EASY COPY-PASTE','Keep it in your notes, or send this file to your AI to remember.',C.water,full,k);
 y+=14;if(ah.h+100>room())newPage();ah.draw(pg.ops,x0,y);y+=ah.h+2;
 {const pad=9,lh=(fmt==='paper'?9.2:10.6)*k,fs=(fmt==='paper'?7.1:7.8)*k;const L=[];aiText(m).split('\n').forEach(t=>wrap(M,t,'m',fs,full-pad*2).forEach(x=>L.push(x)));let i=0,first=true;
  while(i<L.length){let n=Math.floor((room()-pad*2-14)/lh);if(n<3){newPage();continue}let l2=lh;const left=L.length-i;if(left>n&&left-n<=5){const t=(room()-pad*2-14)/left;if(t>=lh*.85){l2=t;n=left}}
   const part=L.slice(i,i+n),h=pad*2+12+part.length*l2;R(pg.ops,x0,y,full,h,C.white,C.ink,1,[3,2]);T(pg.ops,x0+pad,y+pad+6,first?'COPY THIS':'COPY THIS (continued)','mb',6.6,C.draw);
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
   else if(o.k==='c'){const K=.5523*o.r,cx=o.x,cy=H-o.y,r=o.r;const path=`${(cx+r).toFixed(2)} ${cy.toFixed(2)} m ${(cx+r).toFixed(2)} ${(cy+K).toFixed(2)} ${(cx+K).toFixed(2)} ${(cy+r).toFixed(2)} ${cx.toFixed(2)} ${(cy+r).toFixed(2)} c ${(cx-K).toFixed(2)} ${(cy+r).toFixed(2)} ${(cx-r).toFixed(2)} ${(cy+K).toFixed(2)} ${(cx-r).toFixed(2)} ${cy.toFixed(2)} c ${(cx-r).toFixed(2)} ${(cy-K).toFixed(2)} ${(cx-K).toFixed(2)} ${(cy-r).toFixed(2)} ${cx.toFixed(2)} ${(cy-r).toFixed(2)} c ${(cx+K).toFixed(2)} ${(cy-r).toFixed(2)} ${(cx+r).toFixed(2)} ${(cy-K).toFixed(2)} ${(cx+r).toFixed(2)} ${cy.toFixed(2)} c`;if(o.fill)s+=`${hex(o.fill)} rg ${path} f\n`;if(o.stroke)s+=`${hex(o.stroke)} RG ${o.lw} w ${path} S\n`}
   else if(o.k==='p'){const path=o.pts.map((q,i)=>`${q[0].toFixed(2)} ${(H-q[1]).toFixed(2)} ${i?'l':'m'}`).join(' ')+' h';if(o.fill)s+=`${hex(o.fill)} rg ${path} f\n`;if(o.stroke)s+=`${hex(o.stroke)} RG ${o.lw} w ${path} S\n`}
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
  else if(o.k==='c'){cx.beginPath();cx.arc(o.x,o.y,o.r,0,Math.PI*2);if(o.fill){cx.fillStyle=o.fill;cx.fill()}if(o.stroke){cx.strokeStyle=o.stroke;cx.lineWidth=o.lw;cx.stroke()}}
  else if(o.k==='p'){cx.beginPath();o.pts.forEach((q,i)=>i?cx.lineTo(q[0],q[1]):cx.moveTo(q[0],q[1]));cx.closePath();if(o.fill){cx.fillStyle=o.fill;cx.fill()}if(o.stroke){cx.strokeStyle=o.stroke;cx.lineWidth=o.lw;cx.stroke()}}
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
