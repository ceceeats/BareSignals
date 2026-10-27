/* Bare Signals Scan v7 (27 Oct 2026): stripes give the main role about 70%; camera and Scan another removed (vials open from their QR link, the code list stays); the empty log box beside each protocol line removed; small cycle line on each protocol line (cycle length, off time, until date from the start date or today); swipe a line left to remove it, with Undo; ready-made liquids (Cerebrolysin 10 mL · 30 mg, Lipo-C, MIC + B12) draw in mL with the right syringe size (1, 3, 5 or 10 mL), show mg per draw and doses per vial, no insulin units above 1 mL.
   Bare Signals Scan v6 (26 Oct 2026): Reconstitute is a plain line (no box) with a small "+ Add to protocol" rectangle beside it; spec boxes share space evenly by content (auto grid); protocol line: sun/moon and Fasted/Pre/Post food picks up on the name row, days on the vial row, Remove moved inside + Details (away from the days); Open in Protocol and Copy list boxes removed (Copy moved to the bottom bar); a ghosted mini list of the rest of your protocol under every scanned vial; scanner tries several centre crops, upscaled and contrast-boosted, so tilted, sideways and upside-down codes read. v5 kept at /scan/v5/.
   Bare Signals Scan v5 (26 Oct 2026): back to the compact list. Each protocol line: name, code, blue Vial size (tap to change), ghost day squares and sun/moon in the empty right side (light up when tapped), dose chips with a ghost "+ more doses", syringe icon by the units, "+ Add details" (start date, food timing, note, blood check) with an OK tick that folds it back into one quiet summary line. "Not logged yet" removed. Blood drop per compound once blood checks are switched on. Starting-dose chips moved off the vial card. Reconstitute full width again. Stripes now strongest role widest on the left (49/25/15/11 ratio like the Library). v3 and v4 were previews only and are folded in here; v2 kept at /scan/v2/.
   Bare Signals Scan v4 (26 Oct 2026): blue action colour (no orange on this page), Read full page as a small blue link above the stripe, dashed "In my protocol" box replaced by soft starting-dose chips with a ghost "+ more dosages" line, Reconstitute (calculator icon) and Add to my protocol side by side and smaller, scanner reads the centre of the frame at full resolution and zooms in for small vial QRs. v3 (preview only).
   Bare Signals Scan v3 (26 Oct 2026): titrated compounds (GLP-1 family) get a step-up dose ladder in My protocol and the mix card, first-time start step marked, an own-dose box, and timing picks (Morning/Night, Fasted/Before food/After food) saved per item and in Copy list. v2 kept at /scan/v2/.
   Bare Signals Scan v2.4 (25 Oct 2026): real syringe icon (needle, barrel with ticks, flange, plunger, thumb press) for the injection stamp and the draw sticker, replacing the pen-like line. Scan v2 (24 Oct 2026): community doses only (built into data.js), a peptide diary on this phone (ask first; log now or earlier, dose, other stack doses taken, note), My diary view with copy and CSV. v1 kept at /scan/v1/.
   Scan v1 (24 Oct 2026). Opened by a vial QR: baresignals.co/S/<CODE>.
   Welcome card (mini Library card) + Reconstitute (prefilled: stock vial, 2 ml BAC, recommended start dose; Guide me / copy / screenshot)
   + Add to my protocol (recommended dose; builds a checklist across scans, with a Taken log; opens in the Protocol builder)
   + Scan another (live camera; BarcodeDetector, else jsQR; photo and typed-code fallbacks).
   Data: /scan/v1/data.js built by scan/tools/build.js from the live Library and Protocol pages. */
(function(){
'use strict';
const DATA=window.BS_SCAN||{items:{},pal:{}},IT=DATA.items,PAL=DATA.pal,CODES=window.BS_CODES||{},ALIAS=window.BS_CODE_ALIAS||{};
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const app=$('#app');
const BASE='/S/';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const track=(n,t)=>{try{window.bsTrack&&window.bsTrack(n,t)}catch(e){}};
const LKEY='bs-scan-v1';
/* v7: ready-made liquid vials (Uther labels, Oct 2026 order); ml = vial volume, mg = active in the vial when the label gives it */
const LQ={CRB:{ml:10,mg:30},LPC:{ml:10},MIC:{ml:10}};
const liqSyr=ml=>ml<=1?1:ml<=3?3:ml<=5?5:10;
/* titration ladders: start step first (lowest common start), then step-ups; e = when to step */
const LAD={
 RTA:{u:'mg',s:[0.5,0.75,1,1.25,1.5,2,3,4,6,8],e:'step up slowly, every 4 wk'},
 SEM:{u:'mg',s:[0.25,0.5,1,1.7,2.4],e:'step up every 4 wk'},
 TRZ:{u:'mg',s:[2.5,5,7.5,10],e:'+2.5 mg every 4 wk'},
 CAG:{u:'mg',s:[0.25,0.5,1,1.7,2.4],e:'step up every 4 wk'},
 RTC:{u:'mg',s:[1,2,3,4],e:'retatrutide part, step up slowly'},
 AMY:{u:'mcg',s:[15,30,45,60],e:'+15 mcg steps'},
 ELO:{u:'mg',s:[1,3,6,9],e:'step up every 4 wk'},
 SRV:{u:'mg',s:[0.6,1.2,2.4,3.6,4.8,6],e:'slow steps over ~20 wk'},
 UBT:{u:'mg',s:[1,2,4,6],e:'step up every 4 wk'},
 MAZ:{u:'mg',s:[4,6],e:'step up every 4 wk'},
 GHK:{u:'mg',s:[1,1.5,2],e:'start at 1 mg, up to 2 mg'}
};
const DN=['M','T','W','T','F','S','S'],DL=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const DDEF={D:[0,1,2,3,4,5,6],D2:[0,1,2,3,4,5,6],D3:[0,1,2,3,4,5,6],EOD:[0,2,4,6],'5on2':[0,1,2,3,4],'3W':[0,2,4],'2W':[0,3],'1W':[0],PRN:[]};
function daysOf(it){return Array.isArray(it.dy)?it.dy:(DDEF[it.f]||[])}
function whenTxt(it){const d=daysOf(it),tm=it.tm||{};const ds=d.length===7?'Every day':d.map(i=>DL[i]).join(', ');return [ds,tm.a,tm.b].filter(Boolean).join(' · ')}
let NOTE_OPEN={};
const TM1=['☀ AM','☾ PM'],TM2=['Fasted','Before food','After food'];
const FL={D:'Daily',D2:'2× daily',D3:'3× daily',EOD:'Every other day','5on2':'5 on, 2 off','5on5':'5 on, 5 off','3W':'3× a week','2W':'2× a week','1W':'Weekly',PRN:'As needed'};

/* ---------- code lookup ---------- */
function resolve(raw){
 if(!raw)return '';
 let s=String(raw).trim();
 const m=s.match(/\/S\/([A-Za-z0-9-]{2,40})/i);if(m)s=m[1];
 const up=s.toUpperCase().replace(/[^A-Z0-9-]/g,'');
 if(CODES[up])return up;
 const flat=up.replace(/-/g,'');
 if(CODES[flat])return flat;
 if(ALIAS[flat])return ALIAS[flat];
 const low=s.toLowerCase();for(const c in CODES)if(CODES[c]===low)return c;
 for(const c in IT){const n=IT[c].n.toUpperCase().replace(/[^A-Z0-9]/g,'');if(n===flat)return c}
 return '';
}
let ASKED=window.BS_CODE||'';try{ASKED=ASKED||new URLSearchParams(location.search).get('c')||''}catch(e){}
const CODE=resolve(ASKED);
const X=CODE?IT[CODE]:null;
let vialHint=0;
try{const h=location.hash.match(/v=([\d.]+)/);if(h)vialHint=+h[1]}catch(e){}

/* ---------- colours, tags, stamps ---------- */
function col(r){return (PAL[r]||[r,'#ccc'])[1]}
function rname(r){return (PAL[r]||[r])[0]}
function ink(hex){const h=hex.replace('#','');const n=parseInt(h.length===3?h.replace(/./g,'$&$&'):h,16);const r=n>>16&255,g=n>>8&255,b=n&255;const L=(0.299*r+0.587*g+0.114*b)/255;return L>0.58?'#3E4A80':'#FFFFFF'}
function tag(r,dash){const c=col(r);return `<span class="tag${dash?' dash':''}" style="background:${c};color:${ink(c)}">${esc(rname(r))}</span>`}
var bs70=function(L){L=L.slice().sort(function(a,b){return b[1]-a[1]});if(L.length<2)return L;var mx=L[0][1],A=[],B=[],ha=0,hb=0;L.forEach(function(x){if(x[1]>=mx*.9){A.push(x);ha+=x[1]}else{B.push(x);hb+=x[1]}});if(!B.length)return L;return A.map(function(x){return[x[0],70*x[1]/ha]}).concat(B.map(function(x){return[x[0],30*x[1]/hb]}))};/* 27 Oct 2026: main role about 70% of every stripe, the rest share 30%; roles that are a main role of a blend part share the 70% */
function weights(x){const out=[];const seen={};const add=(k,w)=>{if(!PAL[k]||seen[k])return;seen[k]=1;out.push([k,w])};add(x.p,5);(x.r||[]).forEach(k=>add(k,2));(x.rp||[]).forEach(k=>add(k,1));const R=[49,25,15,11,8,6,4,3];return bs70(out.sort((a,b)=>b[1]-a[1]).map((w,i)=>[w[0],R[i]||2]))}
function stripe(x,cls){return `<div class="${cls||'stripe'}" aria-hidden="true">${weights(x).map(w=>`<i style="background:${col(w[0])};flex:${w[1]}"></i>`).join('')}</div>`}
const SVG={
 copy:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="5" width="8.5" height="9"/><path d="M3 11V2.5h8"/></svg>',
 sun:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="8" cy="8" r="3"/><path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1"/></svg>',
 moon:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12.8 10.2A5.5 5.5 0 0 1 5.8 3.2a5.5 5.5 0 1 0 7 7z"/></svg>',
 blood:'<svg viewBox="0 0 16 16"><path d="M8 1.6C6.8 3.9 4.2 7.1 4.2 10a3.8 3.8 0 0 0 7.6 0C11.8 7.1 9.2 3.9 8 1.6z" fill="currentColor"/></svg>',
 calc:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="1.5" width="10" height="13"/><rect x="5" y="3.5" width="6" height="2.5"/><path d="M5.5 8.5h0M8 8.5h0M10.5 8.5h0M5.5 11h0M8 11h0M10.5 11h0" stroke-width="1.9" stroke-linecap="round"/></svg>',
 plus:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3v10M3 8h10"/></svg>',
 inj:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(-45 12 12)"><path d="M1 12h4"/><rect x="5" y="10.6" width="2" height="2.8"/><rect x="7" y="9" width="9" height="6"/><path d="M10 9v2.2M12.5 9v2.2"/><path d="M16 7v10"/><path d="M16 12h4"/><path d="M20 8.5v7"/></g></svg>',
 oral:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5.5" width="12" height="5" rx="2.5" transform="rotate(-35 8 8)"/><path d="M6.2 4.6l3.6 6.8" transform="rotate(-35 8 8) translate(0 0)"/></svg>',
 nasal:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v3l-2 6h8l-2-6V2zM5 14h6"/></svg>',
 iv:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 1.5h6v6l-3 2-3-2zM8 9.5V15"/></svg>',
 topical:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2s4 4.5 4 7.5a4 4 0 0 1-8 0C4 6.5 8 2 8 2z"/></svg>',
 drop:'<svg viewBox="0 0 12 12" fill="currentColor"><path d="M6 .8S10 5 10 7.6A4 4 0 0 1 2 7.6C2 5 6 .8 6 .8z"/></svg>',
 D:'<svg viewBox="0 0 12 12"><text x="6" y="10" text-anchor="middle" font-family="JetBrains Mono,monospace" font-weight="800" font-size="11" fill="currentColor">D</text></svg>',
 syr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(-45 12 12)"><path d="M1 12h4"/><rect x="5" y="10.6" width="2" height="2.8"/><rect x="7" y="9" width="9" height="6"/><path d="M10 9v2.2M12.5 9v2.2"/><path d="M16 7v10"/><path d="M16 12h4"/><path d="M20 8.5v7"/></g></svg>',
 bin:'<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3h8M4.5 3V1.6h3V3M3 3l.6 7.5h4.8L9 3"/></svg>',
 cyc:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 10a6 6 0 1 1-2-4.5"/><path d="M15 2.5v3.5h-3.5"/></svg>',
 cam:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 6V3h3M15 3h3v3M18 14v3h-3M5 17H2v-3M6 7h3v3H6zM11 7h3v3h-3zM6 12h3M11 12h3v2"/></svg>',
 list:'<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 5l1.5 1.5L7 4M9 5.5h8M3 10l1.5 1.5L7 9M9 10.5h8M9 15.5h8M3.5 15.5h3"/></svg>'
};
function routeKey(r){r=String(r||'').toLowerCase();if(/nasal/.test(r))return 'nasal';if(/^oral|sublingual|tablet|capsule/.test(r))return 'oral';if(/^iv/.test(r))return 'iv';if(/topical|serum/.test(r))return 'topical';return 'inj'}
function stamp(r){if(!r)return '—';return `<span class="stamp">${SVG[routeKey(r)]}${esc(r)}</span>`}

/* ---------- dose maths ---------- */
const nf=(v,d)=>{if(!isFinite(v))return '';const p=Math.pow(10,d==null?2:d);return String(Math.round(v*p)/p)};
function parseDose(s){
 const t=String(s||'').replace(/(\d),(\d{3})/g,'$1$2').replace(/^~\s*/,'');
 const m=t.match(/^([\d.]+)\s*(mcg|µg|mg|g|IU|mL|ml|units?|U)\b/i);if(!m)return null;
 let u=m[2].toLowerCase();if(u==='µg')u='mcg';if(/^unit|^u$/.test(u))u='U';if(u==='iu')u='IU';if(u==='ml')u='mL';
 return {v:+m[1],u};
}
const toMg=(v,u)=>u==='mcg'?v/1000:u==='g'?v*1000:v;
function fmtMass(mg){if(mg<1)return nf(mg*1000,0)+' mcg';return nf(mg,2)+' mg'}
/* mix state for this compound */
function startMix(x){
 const p=parseDose(x.st)||{v:0,u:'mg'};
 let kind=p.u==='U'?'units':p.u==='IU'?'iu':p.u==='mL'?'liquid':'mass';
 if(!x.st)kind='mass';
 const vial=vialHint||x.vm||(kind==='iu'?5000:10);
 return {kind,vial,water:x.vw||2,dose:p.v||'',unit:kind==='mass'?(p.u==='mcg'?'mcg':'mg'):p.u,syr:100};
}
function calc(m,x){
 const r={ok:false};const vial=+m.vial,water=+m.water,dose=+m.dose;
 if(m.kind==='liquid'){r.ok=dose>0;r.units=dose*100;r.ml=dose;const q=LQ[(x&&x.c)||'']||{};r.vml=q.ml||0;r.mg=q.mg&&q.ml?dose*q.mg/q.ml:0;r.per=q.ml&&dose>0?Math.floor(q.ml/dose+1e-9):0;r.syr=liqSyr(dose);return r}
 if(!(vial>0&&water>0))return r;
 r.conc=vial/water;
 if(m.kind==='units'){if(!(dose>0))return r;r.units=dose;r.ml=dose/100;r.amt=r.ml*r.conc;r.per=Math.floor(vial/r.amt+1e-9);r.ok=true}
 else if(m.kind==='iu'){if(!(dose>0))return r;r.ml=dose/r.conc;r.units=r.ml*100;r.per=Math.floor(vial/dose+1e-9);r.ok=true}
 else{const mg=toMg(dose,m.unit);if(!(mg>0))return r;r.mg=mg;r.ml=mg/r.conc;r.units=r.ml*100;r.per=Math.floor(vial/mg+1e-9);r.ok=true}
 return r;
}
function vialUnit(m){return m.kind==='iu'?'IU':'mg'}
function doseLabel(m){if(m.kind==='units')return nf(+m.dose,1)+' U';if(m.kind==='liquid')return nf(+m.dose,2)+' mL';return nf(+m.dose,3)+' '+m.unit}
function warns(m,r){const w=[];if(!r.ok||m.kind==='liquid')return w;
 if(r.units<2)w.push('Under 2 units is hard to measure. Mix with less water so each dose is bigger.');
 if(r.units>m.syr)w.push('That is more than one '+m.syr+' U syringe. Use more water, a bigger syringe, or split the shot.');
 if(r.per===0)w.push('The dose is bigger than the whole vial. Check the vial size and the dose.');
 return w}
function roundDraws(m,r){if(!r.ok||m.kind==='liquid'||m.kind==='units')return [];
 const amt=m.kind==='iu'?+m.dose:r.mg;const out=[];
 [5,10,15,20,25,30,40,50].forEach(u=>{const ml=u/100*(+m.vial)/amt;if(ml>=0.5&&ml<=5&&Math.abs(ml*4-Math.round(ml*4))<1e-6)out.push([u,ml])});
 return out.sort((a,b)=>Math.abs(a[0]-10)-Math.abs(b[0]-10)).slice(0,3).sort((a,b)=>a[0]-b[0])}
function syringe(units,cap){
 const W=320,H=54,x0=34,x1=286,len=x1-x0,f=Math.max(0,Math.min(1,units/cap));const fx=x0+len*f;
 let ticks='';const step=cap<=30?1:cap<=50?1:2;const major=cap<=30?5:10;
 for(let u=0;u<=cap;u+=step){const tx=x0+len*u/cap;const mj=u%major===0;ticks+=`<line x1="${tx}" y1="${mj?14:18}" x2="${tx}" y2="26" stroke="#3E4A80" stroke-width="${mj?1.2:.7}"/>`;if(mj)ticks+=`<text x="${tx}" y="10" font-family="JetBrains Mono,monospace" font-size="7.5" font-weight="600" text-anchor="middle" fill="#6B76A8">${u}</text>`}
 return `<svg class="syr" viewBox="0 0 ${W} ${H}" role="img" aria-label="Syringe filled to ${nf(units,1)} of ${cap} units">
 <rect x="${x0}" y="14" width="${len}" height="22" fill="#fff" stroke="#3E4A80" stroke-width="1.5"/>
 <rect x="${x0}" y="14" width="${Math.max(0,fx-x0)}" height="22" fill="#E8701F" opacity=".85"/>
 ${ticks}
 <rect x="${Math.min(fx,x1)-2}" y="11" width="4" height="28" fill="#3E4A80"/>
 <line x1="${Math.min(fx,x1)}" y1="25" x2="${x1+26}" y2="25" stroke="#3E4A80" stroke-width="2"/>
 <rect x="${x1+24}" y="15" width="5" height="20" fill="#3E4A80"/>
 <line x1="6" y1="25" x2="${x0}" y2="25" stroke="#3E4A80" stroke-width="1.2"/>
 <rect x="${x0-6}" y="20" width="6" height="10" fill="#3E4A80"/>
 <text x="${x0}" y="50" font-family="JetBrains Mono,monospace" font-size="8" font-weight="600" fill="#6B76A8">U-100 · ${cap} U · ${nf(cap/100,2)} ml</text>
 </svg>`}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return d}
const fdate=d=>d.toLocaleDateString('en-GB',{day:'numeric',month:'short'});

/* ---------- my protocol list (this phone only) ---------- */
function loadL(){let v=null;try{v=JSON.parse(localStorage.getItem(LKEY)||'null')}catch(e){}
 if(!v||!Array.isArray(v.items))v={items:[]};if(!Array.isArray(v.log))v.log=[];if(v.consent===undefined)v.consent=null;
 /* v1 ticks become diary entries once */
 v.items.forEach(i=>{(i.taken||[]).forEach(t=>v.log.push({id:t+':'+i.c,t,c:i.c,dose:i.dose||'',note:''}));i.taken=[]});
 return v}
let L=loadL();
function saveL(){try{localStorage.setItem(LKEY,JSON.stringify(L))}catch(e){}}
const inList=c=>L.items.find(i=>i.c===c);
function addToList(c,m){const x=IT[c];if(!x)return;let it=inList(c);
 if(!it){it={c,dose:x.st||'',f:x.f||'D',vm:x.vm||'',vw:x.vw||'',added:Date.now(),taken:[]};L.items.push(it)}
 if(m&&m.dose){it.dose=doseLabel(m);it.vm=m.vial;it.vw=m.water}
 saveL();return it}
function ago(ts){const s=(Date.now()-ts)/1000;if(s<90)return 'just now';if(s<3600)return Math.round(s/60)+' min ago';const d=new Date(ts),t=d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
 const day=new Date();day.setHours(0,0,0,0);const dd=new Date(ts);dd.setHours(0,0,0,0);const diff=Math.round((day-dd)/864e5);
 if(diff===0)return 'today '+t;if(diff===1)return 'yesterday '+t;if(diff<7)return d.toLocaleDateString('en-GB',{weekday:'short'})+' '+t+' · '+diff+' days ago';return fdate(d)+' '+t}
function itemDraw(it){const x=IT[it.c];if(!x)return '';const p=parseDose(it.dose);if(!p)return '';
 const m={kind:p.u==='U'?'units':p.u==='IU'?'iu':p.u==='mL'?'liquid':'mass',vial:+it.vm||x.vm,water:+it.vw||x.vw||2,dose:p.v,unit:p.u,syr:100};
 if(m.kind==='mass'&&!(m.vial>0))return '';const r=calc(m,x);if(r.ok&&m.kind==='liquid'&&r.syr>1)return r.syr+' mL syringe';return r.ok&&x.rt==='inj'||r.ok&&m.kind!=='mass'?nf(r.units,1)+' U':''}
function protoLink(){const s=L.items.filter(i=>IT[i.c]).map(i=>{const x=IT[i.c];return [x.s,i.dose||'',i.f||'',0,x.go?1:0,'','','','',i.vm?String(i.vm):'',i.vw?String(i.vw):'','',i.dose?1:0,0,1,'',0,'']});
 const o={v:4,o:0,n:L.name||'',s,r:[],q:'',g:0,d:'',b:'',nt:[],tm:{AM:'08:00',MID:'12:30',PM:'15:00',EVE:'19:00',BED:'22:00'},it:'',vr:0};
 const b=btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
 return '/protocol/#s='+b}
function listText(){return (L.name?L.name+'’s protocol':'My protocol')+' (Bare Signals)\n'+L.items.filter(i=>IT[i.c]).map(i=>{const x=IT[i.c];const d=itemDraw(i);const ll=lastLog(i.c),last=ll&&ll.t;
 return '· '+x.n+' — '+(i.dose||'dose not set')+(d?' ('+d+')':'')+' · '+(FL[i.f]||'')+(whenTxt(i)?' · '+whenTxt(i):'')+(i.vm?' · vial '+i.vm+' mg':'')+(i.sd?' · starts '+i.sd:'')+(i.nt?' · note: '+i.nt.replace(/\s+/g,' '):'')+(last?' · last '+ago(last):'')}).join('\n')}

/* ---------- diary (this phone only) ---------- */
const DIARY_ON=()=>L.consent==='device';
const logsFor=c=>L.log.filter(e=>e.c===c).sort((a,b)=>a.t-b.t);
const lastLog=c=>logsFor(c).slice(-1)[0];
function addLog(c,t,dose,note){if(!IT[c])return;L.log.push({id:t+':'+c+':'+Math.random().toString(36).slice(2,6),t,c,dose:dose||'',note:(note||'').slice(0,300)});L.log=L.log.sort((a,b)=>a.t-b.t).slice(-1000);
 if(!inList(c))addToList(c);const it=inList(c);if(dose)it.dose=dose;saveL()}
const hm=t=>new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
const localDT=t=>{const d=new Date(t-new Date(t).getTimezoneOffset()*6e4);return d.toISOString().slice(0,16)};
let LG=null;/* open log form state */
let PENDING=null;/* action waiting for the diary question */
function consentHTML(){return `<section class="box panel" id="ask" aria-label="Keep a diary">
 <div class="ph"><h2>Keep a peptide diary?</h2></div>
 <p style="margin:0 0 8px">Each time you scan a vial, it can log <b>when you took it</b>, the dose, anything else from your stack, and a note. Next scan it remembers your last dose and time.</p>
 <p class="side" style="margin:0 0 12px">Saved on this phone, in this browser. Clearing your browser data wipes it, so copy or export it now and then.</p>
 <div class="acts" style="margin:0"><button class="btn main" data-go="consent-yes"><b>Yes, keep my diary</b><span>On this phone</span></button>
 <button class="btn full" data-go="consent-no"><b>Not now</b><span>Use the page without a diary. You can turn it on later.</span></button></div></section>`}
function logHTML(x){
 const it=inList(x.c)||{};const last=lastLog(x.c);const f=LG||{};
 const doses=[...new Set([it.dose,last&&last.dose,x.st].concat(x.ch||[]).filter(Boolean))].slice(0,5);
 const others=L.items.filter(i=>i.c!==x.c&&IT[i.c]);
 return `<section class="box panel" id="log" aria-label="Log a dose">
 <div class="ph"><h2>Log a dose</h2><button class="x" data-go="closelog">Close</button></div>
 ${last?`<p class="side" style="margin:0 0 10px">Last: <b>${esc(ago(last.t))}</b>${last.dose?' · '+esc(last.dose):''}${it.f?' · you take it '+esc((FL[it.f]||'').toLowerCase()):''}</p>`:''}
 <div class="row"><div class="k">When</div><div class="chips"><span class="seg"><button data-when="now" aria-pressed="${!f.earlier}">Now · ${hm(Date.now())}</button><button data-when="earlier" aria-pressed="${!!f.earlier}">Earlier</button></span>
 ${f.earlier?`<label class="inp"><input type="datetime-local" data-lg="t" value="${esc(f.t||localDT(Date.now()-60*60*1000))}" max="${localDT(Date.now())}" style="width:13em" aria-label="When you took it"></label>`:''}</div></div>
 <div class="row"><div class="k"><i style="background:var(--dose)"></i>Dose</div><div class="chips">${doses.map(d=>`<button class="cp" data-lgdose="${esc(d)}" aria-pressed="${f.dose===d}">${esc(d)}</button>`).join('')}
 <label class="inp"><input data-lg="dose" value="${esc(doses.indexOf(f.dose)<0?f.dose||'':'')}" placeholder="other" style="width:6em" aria-label="Other dose"></label></div></div>
 ${others.length?`<div class="row"><div class="k">Also took from your stack</div><div class="chips">${others.map(o=>{const on=(f.also||[]).indexOf(o.c)>=0;return `<button class="cp" data-also="${esc(o.c)}" aria-pressed="${on}">${on?'✓ ':''}${esc(IT[o.c].n)}${o.dose?' · '+esc(o.dose):''}</button>`}).join('')}</div></div>`:''}
 <div class="row"><div class="k">Note</div><textarea data-lg="note" rows="2" maxlength="300" placeholder="How you feel, injection site, side effects…" style="all:unset;box-sizing:border-box;width:100%;background:#fff;border:1.5px solid var(--act);padding:8px;font:500 .92rem/1.35 var(--body);color:var(--ink)">${esc(f.note||'')}</textarea></div>
 <div class="acts" style="margin:4px 0 0"><button class="btn main" data-go="savelog"><b>Log it</b><span class="prev">${esc(x.n)}${f.dose?' · '+esc(f.dose):''} · ${f.earlier?'earlier':'now'}${(f.also||[]).length?' + '+(f.also||[]).length+' more':''}</span></button></div>
 </section>`}
function openLog(){const it=inList(CODE)||{};const last=lastLog(CODE);LG={dose:it.dose||(last&&last.dose)||X.st||'',also:[],note:'',earlier:false,t:''};go('#log')}
function diaryHTML(full){
 const es=L.log.filter(e=>IT[e.c]).slice().sort((a,b)=>b.t-a.t);const show=full?es:es.slice(0,6);
 let day='',rows='';show.forEach(e=>{const d=new Date(e.t).toDateString();if(d!==day){day=d;const dd=new Date(e.t);rows+=`<div class="lab" style="margin:12px 0 4px">${esc(dd.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short'}))}</div>`}
  rows+=`<div class="li" style="grid-template-columns:3.4em 1fr auto"><div class="m" style="padding-top:2px"><b style="color:var(--ink)">${hm(e.t)}</b></div><div><div class="t"><a href="/S/${esc(e.c)}/" style="text-decoration:none">${esc(IT[e.c].n)}</a>${e.dose?`<small>${esc(e.dose)}</small>`:''}</div>${e.note?`<div class="m" style="font-family:var(--body);font-size:.88rem">${esc(e.note)}</div>`:''}</div>${full?`<button class="rm" data-dellog="${esc(e.id)}">Delete</button>`:''}</div>`});
 return `<section class="box panel" id="${full?'diary':'diaryp'}" aria-label="My diary">
 <div class="ph"><h2>My diary</h2>${full?'<button class="x" data-go="closediary">Close</button>':`<a class="x" href="#diary" data-go="diary">All ${es.length}</a>`}</div>
 ${es.length?rows:`<p class="empty">No doses logged yet. Scan a vial and tap <b>Log a dose</b>.</p>`}
 ${full?`<div class="tools"><button class="btn sm" data-go="copydiary"><b>Copy diary</b><span>As text</span></button><button class="btn sm" data-go="csv"><b>Export CSV</b><span>For a spreadsheet</span></button></div>
 <p class="side">Diary is on, saved on this phone only. <a href="#" data-go="diaryoff">Turn it off</a> · <a href="#" data-go="cleardiary">Delete every entry</a></p>`:''}
 </section>`}
function diaryRows(){return L.log.filter(e=>IT[e.c]).slice().sort((a,b)=>a.t-b.t)}
function diaryText(){return 'My peptide diary (Bare Signals)\n'+diaryRows().map(e=>{const d=new Date(e.t);return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})+' '+hm(e.t)+' · '+IT[e.c].n+(e.dose?' · '+e.dose:'')+(e.note?' · '+e.note:'')}).join('\n')}
function csv(){const q=v=>'"'+String(v).replace(/"/g,'""')+'"';const t='date,time,compound,code,dose,note\n'+diaryRows().map(e=>{const d=new Date(e.t);return [localDT(e.t).slice(0,10),hm(e.t),IT[e.c].n,e.c,e.dose,e.note].map(q).join(',')}).join('\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='Bare Signals Diary '+localDT(Date.now()).slice(0,10)+'.csv';document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)}
function needConsent(action){if(L.consent==='device')return false;PENDING=action;go('#ask');return true}

/* ---------- toast, copy ---------- */
let tT;function toast(t){let el=$('.toast');if(!el){el=document.createElement('div');el.className='toast';el.setAttribute('role','status');document.body.appendChild(el)}el.textContent=t;el.classList.add('on');clearTimeout(tT);tT=setTimeout(()=>el.classList.remove('on'),2200)}
async function copy(t){try{await navigator.clipboard.writeText(t);toast('Copied')}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Copied')}catch(x){toast('Could not copy')}a.remove()}}

/* ---------- render: compound page ---------- */
let M=X?startMix(X):null,G=-1;
const canMix=x=>x&&!x.kind&&(x.rt==='inj'||x.rt==='nasal');
function cardHTML(x){
 const roles=[x.p].concat((x.r||[]).filter(r=>r!==x.p)).filter(r=>PAL[r]).slice(0,3);
 const it=inList(x.c);const ll=lastLog(x.c),last=ll&&ll.t;
 return `<section class="box card" aria-label="${esc(x.n)}">
 <div class="ch"><h1 class="nm">${esc(x.n)}${x.fda?'<span class="fda" title="Approved somewhere as a medicine">FDA ✓</span>':''}</h1>
 <div class="cnt">${esc(x.cl)}<small>${esc(x.c)}</small></div></div>
 <p class="sub">${esc([x.o,x.u].filter(Boolean).join(' · '))}</p>
 <a class="rd" href="/library/#/p/${esc(x.s)}" data-t="read">Read full page →</a>
 ${stripe(x)}
 <div class="roles">${roles.map(r=>`<div class="rl">${tag(r)}<span>${esc(x.ds[r]||'')}</span></div>`).join('')}</div>
 ${x.kind?'':`<div class="spec"><div><div class="k">${esc(/^Community/.test(x.d.src)?'Community dose':x.d.src==='Bare Signals start'?'Start dose':'Typical dose')}</div><div class="v big">${esc(x.d.dose||'Not set')}</div></div><div><div class="k">How often</div><div class="v">${esc(x.d.freq||'—')}</div></div><div><div class="k">Route</div><div class="v">${stamp(x.d.route)}</div></div></div>`}

 </section>`}
let MORE=false;
function doseOpts(x){const l=LAD[x.c];if(l)return l.s.map(v=>nf(v,3)+' '+l.u);return (x.ch||[]).slice()}
function curDose(x,it){if(it&&it.dose)return it.dose;return M&&M.dose?doseLabel(M):(x.st||'')}
function startsHTML(x,it){
 if(x.kind)return '';const o=doseOpts(x);if(!o.length)return '';
 const show=MORE?o:o.slice(0,LAD[x.c]?3:2),cur=curDose(x,it);
 return `<div class="sd"><span class="sdk">${LAD[x.c]?'Starting doses':'Doses people use'}</span>${show.map((d,i)=>`<button class="sc${i===0?' first':''}" data-pick="${esc(d)}" aria-pressed="${cur===d}">${esc(d)}${i===0&&LAD[x.c]?'<i>first time</i>':''}</button>`).join('')}${o.length>show.length?`<button class="ghost" data-go="more">+ more dosages</button>`:MORE&&o.length>3?`<button class="ghost" data-go="more">less</button>`:''}</div>
 ${it?`<p class="sl">In my protocol · ${esc(it.dose||'dose not set')}${(()=>{const ll=lastLog(x.c);return ll&&ll.t?' · last taken '+esc(ago(ll.t)):''})()}</p>`:''}`}
function preview(x){if(!canMix(x))return '';const r=calc(M,x);if(!r.ok)return 'Set vial, water and dose';
 if(M.kind==='liquid'){const q=LQ[x.c]||{};return 'Ready vial'+(q.ml?' '+q.ml+' mL':'')+' · '+doseLabel(M)+(r.mg?' = '+fmtMass(r.mg):'')+' · '+(r.syr>1?r.syr+' mL syringe':nf(r.units,0)+' U')}
 if(M.kind==='units')return nf(+M.vial,2)+' mg + '+nf(+M.water,2)+' ml · draw '+nf(r.units,1)+' U';
 return nf(+M.vial,2)+' '+vialUnit(M)+' + '+nf(+M.water,2)+' ml · '+doseLabel(M)+' = '+nf(r.units,1)+' U'}
function actsHTML(x){
 const it=inList(x.c);
 if(x.kind==='water')return `<div class="acts"><a class="btn full" href="/water/" style="text-decoration:none"><b>Read about this water</b><span>What it is, pH, how long it keeps</span></a>
  <div class="note">This is the mixing water. <b>Scan the peptide vial</b> to get its mixing and dose worked out.</div></div>`;
 const left=canMix(x)?`<button class="rcl" data-go="mix" aria-expanded="${location.hash==='#mix'}"><b>${SVG.calc}${M.kind==='liquid'?'Dose and draw':'Reconstitute'} <i>›</i></b><span>${esc(preview(x)).replace(/([\d.]+ U)$/,SVG.syr+'$1')}</span></button>`
  :`<div class="rcl note2"><b>${x.rt==='oral'?'Taken by mouth':x.rt==='topical'?'Used on the skin':'Not mixed'}</b><span>${esc(x.d.dose?'Typical: '+x.d.dose+(x.d.freq?', '+x.d.freq:''):'')}</span></div>`;
 const logb=it&&L.consent!=='off'?`<button class="addp log" data-go="log">Log dose</button>`:'';
 return `<div class="act2">${left}<div class="addw">${logb}<button class="addp${it?' on':''}" data-go="add">${it?'✓ In protocol':'+ Add to protocol'}</button></div></div>${miniHTML(x)}`}
function miniHTML(x){
 if(location.hash==='#list')return '';const items=L.items.filter(i=>IT[i.c]);if(!items.length)return '';
 return `<button class="mini" data-go="list"><span class="mh">My protocol <b>${items.length}</b><i>Open ›</i></span>${items.map(it=>{const y=IT[it.c];const d=itemDraw(it);
  return `<span class="mr${y.c===x.c?' cur':''}"><i style="background:${col(y.p)}"></i><b>${esc(y.n)}</b><em>${esc(it.dose||'')}${d?' · '+SVG.syr+esc(d):''}</em></span>`}).join('')}</button>`}
function chipsFor(x){
 const m=M;if(LAD[x.c]&&m.kind==='mass'){const l=LAD[x.c];return l.s.map(v=>l.u===m.unit?v:l.u==='mg'?v*1000:v/1000)}const ch=new Set();(x.ch||[]).forEach(c=>{const p=parseDose(c);if(p)ch.add(p.v)});
 if(m.kind==='mass'&&ch.size){const vals=[...ch].map(v=>toMg(v,m.unit==='mcg'?'mcg':'mg'));const lo=Math.min(...vals),hi=Math.max(...vals);
  const L1=[0.05,0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.75,1,1.5,2,2.5,3,4,5,6,7.5,8,10,12,15,20,25,50,100,200];L1.forEach(v=>{if(v>lo&&v<hi&&ch.size<6)ch.add(m.unit==='mcg'?v*1000:v)})}
 return [...ch].sort((a,b)=>a-b)}
function mixHTML(x){
 const m=M,r=calc(m,x),w=warns(m,r);
 const vialChips=m.kind==='iu'?[2000,5000,10000]:[...new Set([x.vm,5,10,20,30,50].filter(v=>v>0))].sort((a,b)=>a-b).slice(0,6);
 const waterChips=[1,2,3,5];
 const nasal=x.rt==='nasal'?`<p class="side">Using it as a nasal spray instead? <a href="/nasal/">Nasal calculator →</a></p>`:'';
 const liquid=m.kind==='liquid';
 const LQx=LQ[x.c]||{};const rows=liquid?`<p class="side" style="margin-top:0">Ready-made liquid, nothing to mix.${LQx.ml?` <b>${LQx.ml} mL</b> vial${LQx.mg?`, <b>${LQx.mg} mg</b> in it (${nf(LQx.mg/LQx.ml,2)} mg per mL)`:''}.`:''}</p>`:`
 <div class="row"><div class="k"><i style="background:#FFFFF0"></i>Vial</div><div class="chips">${vialChips.map(v=>`<button class="cp" data-vial="${v}" aria-pressed="${+m.vial===v}">${v}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="vial" value="${esc(m.vial)}" aria-label="Vial size"><span>${vialUnit(m)}</span></label></div></div>
 <div class="row"><div class="k"><i style="background:var(--water)"></i>BAC water</div><div class="chips">${waterChips.map(v=>`<button class="cp" data-water="${v}" aria-pressed="${+m.water===v}">${v}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="water" value="${esc(m.water)}" aria-label="Water"><span>ml</span></label></div></div>`;
 const dc=chipsFor(x);
 const doseRow=`<div class="row"><div class="k"><i style="background:var(--dose)"></i>Dose${x.st?' · recommended start '+esc(x.st):''}</div><div class="chips">${dc.map(v=>`<button class="cp" data-dose="${v}" aria-pressed="${+m.dose===v}">${nf(v,3)}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="dose" value="${esc(m.dose)}" aria-label="Dose" placeholder="dose"><span>${esc(m.kind==='units'?'U':m.kind==='iu'?'IU':m.kind==='liquid'?'mL':m.unit)}</span></label>${m.kind==='mass'?`<span class="seg">${['mcg','mg'].map(u=>`<button data-unit="${u}" aria-pressed="${m.unit===u}">${u}</button>`).join('')}</span>`:''}</div></div>`;
 const syrRow=`<div class="row"><div class="k"><i style="background:var(--draw)"></i>Syringe</div><div class="chips">${[100,50,30].map(v=>`<button class="cp" data-syr="${v}" aria-pressed="${m.syr===v}">${v} U</button>`).join('')}</div></div>`;
 const full=m.kind==='mass'&&r.ok?`/draw/?n=${encodeURIComponent(x.n)}&dose=${encodeURIComponent(m.dose)}&u=${m.unit}`:'/draw/';
 return `<section class="box panel" id="mix" aria-label="Reconstitute">
 <div class="ph"><h2>${liquid?'Dose and draw':'Reconstitute'}</h2><button class="x" data-go="close">Close</button></div>
 ${rows}${doseRow}${liquid?'':syrRow}<div id="mres">${resHTML(x)}</div>
 <div class="tools"><button class="btn sm${G>=0?' on':''}" data-go="guide"><b>${G>=0?'Hide guide':'Guide me'}</b><span>Step by step, first time</span></button>
 <button class="btn sm" data-go="copy"><b>Copy</b><span>The mix and draw as text</span></button>
 <button class="btn sm" data-go="shot"><b>Screenshot</b><span>One clean card to save</span></button>
 <a class="btn sm" id="fullcalc" href="${full}" style="text-decoration:none"><b>Full calculator</b><span>Every syringe and option</span></a></div>
 <div id="mguide">${G>=0?guideHTML(x,r):''}</div>
 ${nasal}
 </section>`}
function resHTML(x){
 const m=M,r=calc(m,x),w=warns(m,r),liquid=m.kind==='liquid';
 if(!r.ok)return '<div class="res"><p class="math">Fill in vial, water and dose.</p></div>';
 const rd=roundDraws(m,r);
 const amt=m.kind==='units'?`<b>${nf(r.units,1)} U</b> holds <b>${fmtMass(r.amt)}</b> of the blend${x.bl&&x.bl.length?' ('+x.bl.map(p=>esc(p[0])+' '+fmtMass(r.amt*p[1]/x.bl.reduce((a,q)=>a+q[1],0))).join(' + ')+')':''}`:'';
 return `<div class="res" aria-live="polite">
  ${liquid&&r.syr>1?`<div class="draw"><span class="k">DRAW</span><span class="n">${nf(r.ml,2)}</span><span class="u">mL</span><span class="ml">${r.mg?'= '+fmtMass(r.mg)+' · ':''}${r.syr} mL syringe</span></div>`:`<div class="draw"><span class="k">DRAW</span><span class="n">${nf(r.units,1)}</span><span class="u">U</span><span class="ml">= ${nf(r.ml,2)} ml${liquid&&r.mg?' = '+fmtMass(r.mg):''}</span></div>`}
  ${liquid&&r.vml?`<p class="math"><b>${r.vml} mL</b> vial ÷ <b>${nf(r.ml,2)} mL</b> = about <b>${r.per}</b> dose${r.per===1?'':'s'} per vial</p>`:''}
  ${liquid?'':`<p class="math"><b>${nf(+m.vial,2)} ${vialUnit(m)}</b> ÷ <b>${nf(+m.water,2)} ml</b> = <b>${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)}</b> per ml${m.kind==='units'?'<br>'+amt:`<br>${esc(doseLabel(m))} ÷ ${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)} per ml = <b>${nf(r.ml,3)} ml</b> = <b>${nf(r.units,1)} units</b>`}<br>About <b>${r.per}</b> dose${r.per===1?'':'s'} in this vial</p>`}
  ${liquid&&r.syr>1?'':syringe(Math.min(r.units,m.syr),m.syr)}
  ${w.map(t=>`<p class="warn">${esc(t)}</p>`).join('')}
  <div class="stk">${liquid?'':`<span class="sk w">${SVG.drop}${nf(+m.water,2)} ML</span>`}<span class="sk d">${SVG.D}${esc(doseLabel(m)).toUpperCase()}</span><span class="sk s">${SVG.syr}${m.kind==='liquid'&&r.syr>1?nf(r.ml,2)+' ML':nf(r.units,1)+' U'}</span>${liquid?'':`<span class="sk e">${SVG.bin}${fdate(addDays(28)).toUpperCase()}</span>`}</div>
  ${rd.length?`<p class="round">Rounder draws for this dose: ${rd.map(a=>`<button class="cp" data-water="${a[1]}" title="Mix with ${a[1]} ml">${a[0]} U · ${a[1]} ml</button>`).join('')}</p>`:''}
  </div>`}
function soft(){/* update results without rebuilding the inputs, so typing keeps the keyboard open */
 const r=calc(M,X);const el=$('#mres');if(el)el.innerHTML=resHTML(X);
 $$('[data-vial]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.vial===+M.vial));
 $$('#mix [data-water]').forEach(b=>{if(b.closest('.round'))return;b.setAttribute('aria-pressed',+b.dataset.water===+M.water)});
 $$('[data-dose]').forEach(b=>b.setAttribute('aria-pressed',+b.dataset.dose===+M.dose));
 const pv=$('.btn.main .prev');if(pv)pv.textContent=preview(X);
 const fc=$('#fullcalc');if(fc)fc.href=M.kind==='mass'&&r.ok?`/draw/?n=${encodeURIComponent(X.n)}&dose=${encodeURIComponent(M.dose)}&u=${M.unit}`:'/draw/';
 const g=$('#mguide');if(g&&G>=0)g.innerHTML=guideHTML(X,r)}
function steps(x,r){const m=M;const u=r.ok?nf(r.units,1):'?';const wml=nf(+m.water,2);
 if(m.kind==='liquid')return [
  ['Wipe the top','Wipe the rubber top with an alcohol swab and let it dry.'],
  r.ok&&r.syr>1?['Draw '+nf(r.ml,2)+' mL',`Use a <b>${r.syr} mL</b> syringe, not an insulin syringe: ${nf(r.ml,2)} mL is ${nf(r.units,0)} insulin units, more than one insulin syringe holds. Pull to the <b>${nf(r.ml,2)} mL</b> line. Tap out air bubbles.`]:['Draw '+u+' units',`Pull the plunger to <b>${u} U</b> on a U-100 syringe (${nf(r.ml,2)} ml). Tap out air bubbles.`],
  ...(/IM/.test(x.d&&x.d.route||'')?[['Into the muscle','This one goes into a muscle (IM). The label puts <b>up to 5 mL</b> into one spot (thigh or buttock); bigger amounts go into a vein, diluted, given by a clinician.']]:[]),
  ['Store it','Back in the fridge, upright, out of light.']];
 return [
 ['Get it ready',`You need this vial, <b>${wml} ml</b> of bacteriostatic (BAC) water, alcohol swabs, and a syringe to mix with. Wash your hands.`],
 ['Wipe both tops','Swab the rubber top of the peptide vial and the BAC water. Let them air dry; don’t blow on them.'],
 ['Draw the water',`Draw <b>${wml} ml</b> of BAC water. On a 1 ml (100 U) insulin syringe that is ${+m.water>1?'<b>'+Math.ceil(+m.water)+' fills</b> of up to 100 U each':'<b>'+nf(+m.water*100,0)+' U</b>'}.`],
 ['Add it slowly','Push the needle in and let the water run down the inside wall of the vial, not straight onto the powder. Go slow.'],
 ['Swirl, don’t shake','Roll the vial gently between your fingers until it is clear. Some take a few minutes. Cloudy or with bits that stay: don’t use it.'],
 ['Label it',`Mixed today, use within about 28 days (by <b>${fdate(addDays(28))}</b>). Stick on the water, dose, draw and date stickers.`],
 ['Store it','Fridge, upright, out of light. Never freeze it once mixed.'],
 ['Draw your dose',`For <b>${esc(doseLabel(m))}</b>, use a new insulin syringe and draw to <b>${u} U</b> (${r.ok?nf(r.ml,2):'?'} ml). Tap out air bubbles before you use it.`]]}
function guideHTML(x,r){const S=steps(x,r);G=Math.min(G,S.length-1);const s=S[G];
 return `<div class="guide" aria-live="polite"><div class="gstep">Step ${G+1} of ${S.length}</div><h3>${esc(s[0])}</h3><p>${s[1]}</p>
 <div class="dots">${S.map((_,i)=>`<i class="${i<=G?'on':''}"></i>`).join('')}</div>
 <div class="gnav"><button class="btn sm" data-go="gback" ${G===0?'disabled style="opacity:.45"':''}><b>Back</b></button><button class="btn sm" data-go="gnext"><b>${G===S.length-1?'Done':'Next'}</b></button></div></div>`}
function rangeOpts(x){const l=LAD[x.c];if(l)return l.s.map(v=>nf(v,3)+' '+l.u);
 const m=String(x.d&&x.d.dose||'').match(/^([\d.]+)\s*[–-]\s*([\d.]+)\s*(mcg|mg)\b/i);const base=(x.ch||[]).slice();
 if(!m)return base;const lo=+m[1],hi=+m[2],u=m[3].toLowerCase();const L1=u==='mcg'?[50,100,150,200,250,300,400,500,600,750,1000,1500,2000]:[0.1,0.25,0.5,0.75,1,1.5,2,2.5,3,4,5,6,8,10,12,15,20,25,50,100,150,200,250,500,1000];
 const o=[lo].concat(L1.filter(v=>v>lo&&v<hi)).concat([hi]);return o.map(v=>nf(v,3)+' '+u)}
let EXP={};
/* v7: cycle line. Low end of the Library cycle (cycles start at the lower end), counted from the start date or today */
function cycHTML(x,it){const c=String(x.d&&x.d.cycle||'').trim();if(!c)return '';
 const show=c.replace(/weeks?\b/g,'wk').replace(/months?\b/g,'mo').replace(/\bdays?\b/g,'days');
 if(/ongoing|as needed|continuous/i.test(c))return `<div class="cyc">${SVG.cyc}Cycle ${esc(show)}</div>`;
 const m=c.match(/([\d.]+)\s*(?:[–-]\s*[\d.]+)?\s*(days?|d\b|wk|weeks?|mo|months?)/i);let end='';
 if(m){const n=+m[1],u=m[2].toLowerCase(),d=u[0]==='d'?n:u[0]==='w'?n*7:n*30;const s0=it.sd?new Date(it.sd+'T12:00').getTime():(it.added||Date.now());end=fdShort(s0+d*864e5)}
 return `<div class="cyc">${SVG.cyc}Cycle ${esc(show)}${end?` · <b>until ${esc(end)}</b>`:''}</div>`}
const VIALS=[2,5,10,15,20,30,50];
function itemHTML(it,ix,x){
 const d=itemDraw(it);const ll=lastLog(it.c),last=ll&&ll.t;const today=last&&new Date(last).toDateString()===new Date().toDateString();
 const dy=daysOf(it),tm=it.tm||{},e=EXP[ix]||'',vm=+it.vm||x.vm;const opts=rangeOpts(x),base=LAD[x.c]?opts.slice(0,2):(x.ch||[]).slice(0,2);if(!base.length&&x.st)base.push(x.st);
 const mixable=canMix(x)&&!x.kind;
 const sum=[it.sd?'Starts '+fdShort(new Date(it.sd+'T12:00').getTime()):'',L.bw&&it.bd?'Blood done '+fdShort(it.bd):'',it.nt?'“'+it.nt.slice(0,40)+(it.nt.length>40?'…':'')+'”':''].filter(Boolean).join(' · ');
 let h=`<div class="li v5${e?' open':''}" data-ix="${ix}">
 <div class="mn"><div class="t"><a href="${BASE}${esc(x.c)}/" style="text-decoration:none">${esc(x.n)}</a><small>${esc(x.c)}</small>${L.bw?`<button class="bd${it.bd?' on':''}" data-bd="${ix}" aria-pressed="${!!it.bd}" title="Blood work done">${SVG.blood}</button>`:''}</div>
  ${LQ[x.c]?`<span class="vl lq">Vial ${LQ[x.c].ml} mL${LQ[x.c].mg?' · '+LQ[x.c].mg+' mg':''}</span>`:mixable?`<button class="vl" data-ex="${ix}|vial">Vial ${nf(vm,2)} ${esc(vialUnit({kind:x.st&&/IU/.test(x.st)?'iu':'mass'}))}</button>`:''}
  ${stripe(x,'mst')}</div>
 <div class="pk"><div class="ap"><button class="sun" data-tm="${ix}|a|☀ AM" aria-pressed="${tm.a==='☀ AM'}" aria-label="Morning">${SVG.sun}</button><button class="moon" data-tm="${ix}|a|☾ PM" aria-pressed="${tm.a==='☾ PM'}" aria-label="Night">${SVG.moon}</button>${TM2.map((t,k)=>`<button class="fd" data-tm="${ix}|b|${t}" aria-pressed="${tm.b===t}" aria-label="${t}">${['Fast','Pre','Post'][k]}</button>`).join('')}</div>
  <div class="dys">${DN.map((n,i)=>`<button data-dy="${ix}|${i}" aria-pressed="${dy.indexOf(i)>=0}" aria-label="${DL[i]}">${n}</button>`).join('')}</div></div>
 <div class="m mrow">${esc(it.dose||'Dose not set')}${d?' · <b>'+SVG.syr+esc(d)+'</b>':''} · ${esc(FL[it.f]||'')}${last?' · last taken '+esc(ago(last)):''}</div>
 ${cycHTML(x,it)}
 <div class="row2">${base.map(c=>`<button class="cp" data-setdose="${ix}|${esc(c)}" aria-pressed="${it.dose===c}">${esc(c)}</button>`).join('')}${it.dose&&base.indexOf(it.dose)<0?`<button class="cp cu" data-ex="${ix}|dose" aria-pressed="true">${esc(it.dose)}<i>${opts.indexOf(it.dose)>=0?'step':'custom'}</i></button>`:''}${opts.length>base.length||1?`<button class="ghost" data-ex="${ix}|dose">${e==='dose'?'− fewer':'+ more doses'}</button>`:''}<button class="ghost det" data-ex="${ix}|det">${e==='det'?'':'+ Details'}</button></div>`;
 if(sum&&e!=='det')h+=`<div class="sm3">${esc(sum)}</div>`;
 if(e==='vial')h+=`<div class="xp"><div class="lk">Vial size</div><div class="chips">${VIALS.map(v=>`<button class="cp" data-vm="${ix}|${v}" aria-pressed="${vm===v}">${v}</button>`).join('')}<label class="inp own"><input inputmode="decimal" data-ownvm="${ix}" placeholder="own" aria-label="Own vial size"><span>mg</span></label><button class="ok" data-ex="${ix}|">OK ✓</button></div></div>`;
 if(e==='dose'){const l=LAD[x.c],p=parseDose(it.dose),u=(l&&l.u)||(p&&p.u)||'mg';
  h+=`<div class="xp">${l?`<div class="lk">${esc(l.e)}</div>`:'<div class="lk">Doses people report</div>'}<div class="chips">${opts.map((c,i)=>`<button class="cp${i===0&&l?' st':''}" data-setdose="${ix}|${esc(c)}" aria-pressed="${it.dose===c}">${esc(c.replace(/ (mg|mcg|units?|IU)$/,''))}</button>`).join('')}<label class="inp own"><input inputmode="decimal" data-own="${ix}|${esc(u)}" placeholder="own" aria-label="Own dose"><span>${esc(u)}</span></label><button class="ok" data-ex="${ix}|">OK ✓</button></div>${l?`<div class="lk sm">First time trying? Start at <b>${esc(opts[0])}</b> and hold each step until it feels steady.</div>`:''}</div>`}
 if(e==='det')h+=`<div class="xp"><div class="dr"><span class="lk">Start</span><input type="date" data-sd="${ix}" value="${esc(it.sd||'')}"></div>
  ${L.bw?`<div class="dr"><span class="lk">Blood</span><button class="ghost" data-bd="${ix}">${it.bd?'Done '+fdShort(it.bd)+' · undo':'Mark baseline done today'}</button></div>`:''}
  <textarea data-nt="${ix}" rows="2" placeholder="Notes: site, how it felt, anything to remember">${esc(it.nt||'')}</textarea>
  <div class="okr"><button class="rmx" data-rm="${ix}">Remove from protocol</button><button class="ok" data-ex="${ix}|">OK ✓</button></div></div>`;
 return h+'</div>'}
/* supporting blood work + supplements: from /blood/v21/lib.js, loaded only when asked */
function loadBW(){return window.BW_LIB?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src='/blood/v21/lib.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
let SUPMORE={b:false,s:false};
const fdShort=ts=>new Date(ts).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
function supHTML(items){
 return L.bw?`<p class="side sm2"><span class="bi">${SVG.blood}</span> Blood checks on: tap the drop when your baseline test is done. <a href="#" data-go="unbw">Turn off</a></p>`
  :`<button class="ghost addsup" data-go="bw">+ Add blood work checks</button>`}
function listHTML(){
 const items=L.items.filter(i=>IT[i.c]);
 return `<section class="box panel" id="list" aria-label="My protocol">
 <div class="ph"><h2>My protocol</h2><button class="x" data-go="closelist">Close</button></div>
 ${items.length?`<label class="who"><span>Name</span><input data-name value="${esc(L.name||'')}" placeholder="whose protocol" maxlength="40" autocomplete="given-name"></label>`:''}
 ${items.length?items.map((it,ix)=>itemHTML(it,ix,IT[it.c])).join('')
  :`<p class="empty">Nothing here yet. Tap <b>Add to my protocol</b> on any vial you scan and it builds up here, on this phone only.</p>`}
 ${items.length?'<p class="side swh">Swipe a line left to remove it.</p>':''}
 ${items.length?supHTML(items):''}
 ${items.length?` <p class="side">Saved on this phone only. Nothing is sent anywhere. <a href="#" data-go="clear">Clear the list</a></p>`:''}
 </section>`+(DIARY_ON()?diaryHTML(false):'')}
function barHTML(){const n=L.items.filter(i=>IT[i.c]).length;
 return `<div class="bar"><div class="in">
 ${n?`<button class="btn cpy" data-go="copylist" aria-label="Copy my protocol">${SVG.copy}</button>`:''}
 <button class="btn" data-go="list">${SVG.list}<b>My protocol</b>${n?`<span class="badge">${n}</span>`:''}</button></div></div>`}

function indexHTML(){
 const all=Object.keys(IT).sort((a,b)=>IT[a].n.localeCompare(IT[b].n));
 return `<section class="box hero"><p class="lab">Bare Signals · Vials</p><h1>Find a vial.</h1>
 <p>Every Bare Signals vial has a small QR code that opens its page here: what it is, the mix and the draw, your protocol and your diary. Or find it by name or code below.</p></section>
 ${location.hash==='#diary'?diaryHTML(true):location.hash==='#ask'?consentHTML():L.items.length||location.hash==='#list'?listHTML():''}
 <section class="box panel"><div class="ph"><h2>Every code</h2><span class="lab" style="margin:0">${all.length}</span></div>
 <p class="side" style="margin-top:0">The letters under each vial QR. Typing one works too: baresignals.co/S/<b>RTA</b>.</p>
 <input class="find" type="search" placeholder="Find a compound or code" aria-label="Find a compound or code" data-find>
 <div class="codes">${all.map(c=>`<a href="/S/${c}/" data-n="${esc((IT[c].n+' '+c).toLowerCase())}"><b>${c}</b><span>${esc(IT[c].n)}</span></a>`).join('')}</div></section>`}

function render(){
 if(!CODE){app.innerHTML=(ASKED?`<p class="lab">No vial found for <b>${esc(ASKED)}</b> · check the letters under the QR</p>`:'')+indexHTML()+barHTML();return}
 const h=location.hash;
 if(h==='#log'&&!LG){const it=inList(CODE)||{};const l=lastLog(CODE);LG={dose:it.dose||(l&&l.dose)||X.st||'',also:[],note:'',earlier:false,t:''}}
 app.innerHTML=`<p class="lab">Scanned vial · <b>${esc(CODE)}</b></p>`+cardHTML(X)+actsHTML(X)+(h==='#mix'&&canMix(X)?mixHTML(X):'')+(h==='#ask'?consentHTML():'')+(h==='#log'?logHTML(X):'')+(h==='#list'?listHTML():'')+(h==='#diary'?diaryHTML(true):'')+barHTML();
}
function go(h){if(location.hash!==h)history.pushState(null,'',h||location.pathname);render();if(h){const el=$(h);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}}
window.addEventListener('popstate',render);

/* ---------- events ---------- */
app.addEventListener('click',e=>{
 const b=e.target.closest('[data-when],[data-lgdose],[data-also],[data-dellog],[data-go],[data-vial],[data-water],[data-dose],[data-unit],[data-syr],[data-tick],[data-rm],[data-setdose],[data-tm],[data-dy],[data-note],[data-pick],[data-ck],[data-ex],[data-vm],[data-bd],[data-t]');if(!b)return;
 const g=b.dataset.go;
 if(b.dataset.t){track('scan-'+b.dataset.t+':'+CODE);return}
 if(b.dataset.when){LG.earlier=b.dataset.when==='earlier';if(LG.earlier&&!LG.t)LG.t=localDT(Date.now()-60*60*1000);return render()}
 if(b.dataset.lgdose){LG.dose=b.dataset.lgdose;return render()}
 if(b.dataset.also){const a=LG.also=LG.also||[];const i=a.indexOf(b.dataset.also);i>=0?a.splice(i,1):a.push(b.dataset.also);return render()}
 if(b.dataset.dellog){if(confirm('Delete this entry?')){L.log=L.log.filter(x=>x.id!==b.dataset.dellog);saveL();render()}return}
 if(b.dataset.vial){M.vial=+b.dataset.vial;return render()}
 if(b.dataset.water){M.water=+b.dataset.water;return render()}
 if(b.dataset.dose){M.dose=+b.dataset.dose;return render()}
 if(b.dataset.unit){const u=b.dataset.unit;if(u!==M.unit&&+M.dose>0)M.dose=u==='mcg'?+M.dose*1000:+M.dose/1000;M.unit=u;return render()}
 if(b.dataset.syr){M.syr=+b.dataset.syr;return render()}
 if(b.dataset.tick){const it=L.items.filter(i=>IT[i.c])[+b.dataset.tick];if(!it)return;if(needConsent({tick:it.c}))return;
  const ll=lastLog(it.c);if(ll&&Date.now()-ll.t<10*60*1000&&b.getAttribute('aria-pressed')==='true'){L.log=L.log.filter(x=>x!==ll);toast('Undone')}else{addLog(it.c,Date.now(),it.dose,'');toast(IT[it.c].n+' logged '+hm(Date.now()));track('scan-log-quick')}
  saveL();return render()}
 if(b.dataset.rm){return removeAt(+b.dataset.rm)}
 if(b.dataset.ex!==undefined){const [ix,k]=b.dataset.ex.split('|');EXP[ix]=EXP[ix]===k?'':k;return render()}
 if(b.dataset.vm){const [ix,v]=b.dataset.vm.split('|');const it=L.items.filter(i=>IT[i.c])[+ix];if(it){it.vm=+v;saveL();render()}return}
 if(b.dataset.bd){const it=L.items.filter(i=>IT[i.c])[+b.dataset.bd];if(it){it.bd=it.bd?0:Date.now();saveL();render()}return}
 if(b.dataset.ck){const [k,id]=b.dataset.ck.split('|');const o=k==='b'?(L.bd=L.bd||{}):(L.sd=L.sd||{});if(o[id])delete o[id];else o[id]=Date.now();saveL();return render()}
 if(b.dataset.pick){const d=b.dataset.pick,p=parseDose(d);if(p&&M&&M.kind==='mass'&&(p.u==='mg'||p.u==='mcg')){M.dose=p.v;M.unit=p.u}const it=inList(CODE);if(it){it.dose=d;saveL()}track('scan-pick:'+CODE);return render()}
 if(b.dataset.dy){const [ix,d]=b.dataset.dy.split('|').map(Number);const it=L.items.filter(i=>IT[i.c])[ix];if(it){const a=daysOf(it).slice();const k=a.indexOf(d);k>=0?a.splice(k,1):a.push(d);it.dy=a.sort();saveL();render()}return}
 if(b.dataset.note){NOTE_OPEN[b.dataset.note]=1;render();const t=$(`textarea[data-nt="${b.dataset.note}"]`);if(t)t.focus();return}
 if(b.dataset.tm){const [ix,k,t]=b.dataset.tm.split('|');const it=L.items.filter(i=>IT[i.c])[+ix];if(it){it.tm=it.tm||{};it.tm[k]=it.tm[k]===t?'':t;saveL();render()}return}
 if(b.dataset.setdose){const [ix,d]=b.dataset.setdose.split('|');const it=L.items.filter(i=>IT[i.c])[+ix];if(it){it.dose=d;saveL();render()}return}
 e.preventDefault();
 if(g==='consent-yes'){L.consent='device';saveL();track('diary-on');const p=PENDING;PENDING=null;if(p&&p.add){addToList(CODE,p.m);toast('Added · diary on')}if(p&&p.tick){addLog(p.tick,Date.now(),(inList(p.tick)||{}).dose,'');toast('Logged '+hm(Date.now()))}if(p&&p.log&&CODE)return openLog();return go(p&&p.add?'#list':CODE?'':'#list')}
 if(g==='consent-no'){L.consent='off';saveL();track('diary-no');const p=PENDING;PENDING=null;if(p&&p.add){addToList(CODE,p.m);toast('Added · no diary')}return go(p&&p.add?'#list':'')}
 if(g==='log'){if(needConsent({log:1}))return;track('scan-logopen:'+CODE);return openLog()}
 if(g==='closelog'){LG=null;return go('')}
 if(g==='savelog'){const f=LG||{};let t=Date.now();if(f.earlier){const v=Date.parse(f.t||'');if(!isFinite(v))return toast('Pick when you took it');t=Math.min(v,Date.now())}
  addLog(CODE,t,f.dose,f.note);(f.also||[]).forEach(c=>addLog(c,t,(inList(c)||{}).dose,''));track('scan-log:'+CODE,'Log '+CODE);
  toast('Logged '+hm(t)+(f.dose?' · '+f.dose:'')+((f.also||[]).length?' + '+f.also.length+' more':''));LG=null;return go('')}
 if(g==='diary')return go('#diary');
 if(g==='closediary')return go('');
 if(g==='copydiary')return copy(diaryText());
 if(g==='csv'){track('diary-csv');return csv()}
 if(g==='diaryoff'){if(confirm('Turn the diary off? Your entries stay on this phone until you delete them.')){L.consent='off';saveL();go('')}return}
 if(g==='cleardiary'){if(confirm('Delete every diary entry on this phone? This cannot be undone.')){L.log=[];saveL();render()}return}
 if(g==='mix'){if(location.hash==='#mix')return go('');track('scan-mix:'+CODE);return go('#mix')}
 if(g==='close'||g==='closelist'){G=-1;return go('')}
 if(g==='add'){if(!inList(CODE)){if(L.consent===null){PENDING={add:1,m:Object.assign({},M)};return go('#ask')}addToList(CODE,M);toast('Added · '+(inList(CODE).dose||'set your dose'));track('scan-add:'+CODE)}return go('#list')}
 if(g==='bw'){L.bw=1;saveL();track('scan-bw');return render()}
 if(g==='unbw'){L.bw=0;saveL();return render()}
 if(g==='sup'){L.sup=1;saveL();track('scan-sup');return render()}
 if(g==='unsup'){L.sup=0;saveL();return render()}
 if(g==='moreb'){SUPMORE.b=1;return render()}
 if(g==='mores'){SUPMORE.s=1;return render()}
 if(g==='more'){MORE=!MORE;return render()}
 if(g==='list'){if(location.hash==='#list')return go('');return go('#list')}
 if(g==='guide'){G=G>=0?-1:0;track('scan-guide:'+CODE);render();const el=$('.guide');if(el)el.scrollIntoView({behavior:'smooth',block:'center'});return}
 if(g==='gnext'){const S=steps(X,calc(M,X));if(G>=S.length-1){G=-1;toast('All set')}else G++;return render()}
 if(g==='gback'){G=Math.max(0,G-1);return render()}
 if(g==='copy'){const r=calc(M,X);if(!r.ok)return toast('Fill in the dose first');track('scan-copy:'+CODE);return copy(mixText(r))}
 if(g==='shot'){const r=calc(M,X);if(!r.ok)return toast('Fill in the dose first');track('scan-shot:'+CODE);return shot(r)}
 if(g==='copylist')return copy(listText());
 if(g==='clear'){if(confirm('Clear your protocol list on this phone?')){L={items:[]};saveL();render()}return}
});
app.addEventListener('change',e=>{const i=e.target;if(!i.dataset)return;
 if(i.dataset.sd!==undefined){const it=L.items.filter(x=>IT[x.c])[+i.dataset.sd];if(it){it.sd=i.value;saveL()}return}
 if(i.dataset.ownvm!==undefined){const it=L.items.filter(x=>IT[x.c])[+i.dataset.ownvm];const v=parseFloat(String(i.value).replace(',','.'));if(it&&v>0){it.vm=v;saveL();render()}return}
 if(!i.dataset.own)return;
 const [ix,u]=i.dataset.own.split('|');const it=L.items.filter(x=>IT[x.c])[+ix];const v=parseFloat(String(i.value).replace(',','.'));
 if(it&&isFinite(v)&&v>0){it.dose=nf(v,3)+' '+u;saveL();render();track('own-dose',IT[it.c].c)}});
app.addEventListener('input',e=>{
 const i=e.target;
 if(i.dataset.name!==undefined){L.name=i.value.trim();saveL();return}
 if(i.dataset.nt!==undefined){const it=L.items.filter(x=>IT[x.c])[+i.dataset.nt];if(it){it.nt=i.value;saveL()}return}
 if(i.dataset.in){const v=parseFloat(String(i.value).replace(',','.'));M[i.dataset.in]=isFinite(v)?v:'';soft();return}
 if(i.dataset.lg){LG=LG||{};LG[i.dataset.lg]=i.value;const pv=$('#log .btn.main .prev');if(pv&&i.dataset.lg==='dose')pv.textContent=X.n+' · '+i.value;return}
 if(i.dataset.find!==undefined){const q=i.value.trim().toLowerCase();$$('.codes a').forEach(a=>a.hidden=q&&a.dataset.n.indexOf(q)<0)}
});
function mixText(r){const x=X,m=M;
 if(m.kind==='liquid')return `${x.n} (${x.c})\nReady-made liquid · ${doseLabel(m)} = draw ${nf(r.units,0)} U on a U-100 syringe\nbaresignals.co/S/${x.c}`;
 return `${x.n} (${x.c})\n${nf(+m.vial,2)} ${vialUnit(m)} vial + ${nf(+m.water,2)} ml BAC water = ${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)} per ml\nDose ${doseLabel(m)} = draw ${nf(r.units,1)} U (${nf(r.ml,2)} ml) on a U-100 syringe\nAbout ${r.per} doses per vial · mixed ${fdate(new Date())}, use by ${fdate(addDays(28))}\nbaresignals.co/S/${x.c}`}

/* ---------- screenshot view ---------- */
function shot(r){const x=X,m=M;const el=document.createElement('div');el.className='shot';el.setAttribute('role','dialog');el.setAttribute('aria-label','Screenshot card');
 el.innerHTML=`<div class="hint"><span>Take a screenshot now</span><button class="x" data-close>Close</button></div>
 <div class="box sc"><div class="ch"><h2 class="nm" style="font-size:1.6rem">${esc(x.n)}</h2><div class="cnt">${esc(x.c)}</div></div>
 <p class="sub" style="margin-bottom:8px">${esc(x.u||'')}</p>${stripe(x)}
 <div class="res" style="margin-top:0"><div class="draw"><span class="k">DRAW</span><span class="n">${nf(r.units,1)}</span><span class="u">U</span><span class="ml">= ${nf(r.ml,2)} ml</span></div>
 ${m.kind==='liquid'?'':`<p class="math"><b>${nf(+m.vial,2)} ${vialUnit(m)}</b> + <b>${nf(+m.water,2)} ml BAC</b> = ${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)}/ml · ${r.per} doses</p>`}
 ${syringe(Math.min(r.units,m.syr),m.syr)}
 <div class="stk">${m.kind==='liquid'?'':`<span class="sk w">${SVG.drop}${nf(+m.water,2)} ML</span>`}<span class="sk d">${SVG.D}${esc(doseLabel(m)).toUpperCase()}</span><span class="sk s">${SVG.syr}${m.kind==='liquid'&&r.syr>1?nf(r.ml,2)+' ML':nf(r.units,1)+' U'}</span>${m.kind==='liquid'?'':`<span class="sk e">${SVG.bin}${fdate(addDays(28)).toUpperCase()}</span>`}</div></div>
 <div class="ft"><span>Mixed ${fdate(new Date())}</span><span>baresignals.co/S/${esc(x.c)}</span></div></div>`;
 document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-close]'))el.remove()});
 const k=e=>{if(e.key==='Escape'){el.remove();removeEventListener('keydown',k)}};addEventListener('keydown',k)}

/* ---------- v7: swipe a protocol line left to remove it ---------- */
let SW=null,UNDO=null,uT=0;
function undoBar(name){let el=$('.undo');if(!el){el=document.createElement('div');el.className='undo';el.setAttribute('role','status');document.body.appendChild(el)}
 el.innerHTML=`<span>${esc(name)} removed</span><button type="button">Undo</button>`;el.classList.add('on');clearTimeout(uT);uT=setTimeout(()=>{el.classList.remove('on');UNDO=null},5000);
 el.querySelector('button').onclick=()=>{if(UNDO){L.items.splice(Math.min(UNDO.pos,L.items.length),0,UNDO.it);saveL();UNDO=null;render();toast('Back in')}el.classList.remove('on')}}
function removeAt(ix){const items=L.items.filter(i=>IT[i.c]);const it=items[ix];if(!it)return;UNDO={it,pos:L.items.indexOf(it)};L.items=L.items.filter(i=>i!==it);EXP={};saveL();track('scan-swipe-rm');render();undoBar(IT[it.c].n)}
app.addEventListener('touchstart',e=>{const li=e.target.closest('#list .li');if(!li||e.target.closest('input,textarea'))return;const t=e.touches[0];SW={li,x:t.clientX,y:t.clientY,dx:0,on:false}},{passive:true});
app.addEventListener('touchmove',e=>{if(!SW)return;const t=e.touches[0],dx=t.clientX-SW.x,dy=t.clientY-SW.y;
 if(!SW.on){if(Math.abs(dy)>10&&Math.abs(dy)>Math.abs(dx)){SW=null;return}if(dx<-12&&Math.abs(dx)>Math.abs(dy)*1.3){SW.on=true;SW.li.classList.add('sw')}else return}
 SW.dx=Math.min(0,dx);SW.li.style.transform=`translateX(${SW.dx}px)`;SW.li.classList.toggle('go',SW.dx<-SW.li.offsetWidth*.35);e.preventDefault()},{passive:false});
app.addEventListener('touchend',()=>{if(!SW)return;const s=SW;SW=null;if(!s.on)return;
 if(s.dx<-s.li.offsetWidth*.35){s.li.style.transition='transform .18s ease-in';s.li.style.transform='translateX(-110%)';setTimeout(()=>removeAt(+s.li.dataset.ix),170)}
 else{s.li.style.transition='transform .2s';s.li.style.transform='';setTimeout(()=>{s.li.classList.remove('sw','go');s.li.style.transition=''},210)}},{passive:true});
app.addEventListener('touchcancel',()=>{if(SW){SW.li.style.transform='';SW.li.classList.remove('sw','go');SW=null}});
/* rm inside Details also gets Undo */

/* ---------- boot ---------- */
if(X){document.title=X.n+' · Bare Signals';track('scan:'+CODE,'Scan '+CODE)}else track('scan:index','Scan index');
render();
if(/^#(mix|list|log|diary|ask)$/.test(location.hash)){const el=$(location.hash);if(el)setTimeout(()=>el.scrollIntoView({block:'start'}),50)}
})();
