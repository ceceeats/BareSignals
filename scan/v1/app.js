/* Bare Signals Scan v1 (24 Oct 2026). Opened by a vial QR: baresignals.co/S/<CODE>.
   Welcome card (mini Library card) + Reconstitute (prefilled: stock vial, 2 ml BAC, recommended start dose; Guide me / copy / screenshot)
   + Add to my protocol (recommended dose; builds a checklist across scans, with a Taken log; opens in the Protocol builder)
   + Scan another (live camera; BarcodeDetector, else jsQR; photo and typed-code fallbacks).
   Data: /scan/v1/data.js built by scan/tools/build.js from the live Library and Protocol pages. */
(function(){
'use strict';
const DATA=window.BS_SCAN||{items:{},pal:{}},IT=DATA.items,PAL=DATA.pal,CODES=window.BS_CODES||{},ALIAS=window.BS_CODE_ALIAS||{};
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>Array.from((r||document).querySelectorAll(s));
const app=$('#app');
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const track=(n,t)=>{try{window.bsTrack&&window.bsTrack(n,t)}catch(e){}};
const LKEY='bs-scan-v1';
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
function weights(x){const out=[];const seen={};const add=(k,w)=>{if(!PAL[k]||seen[k])return;seen[k]=1;out.push([k,w])};add(x.p,5);(x.r||[]).forEach(k=>add(k,2));(x.rp||[]).forEach(k=>add(k,1));return out.sort((a,b)=>a[1]-b[1])}
function stripe(x,cls){return `<div class="${cls||'stripe'}" aria-hidden="true">${weights(x).map(w=>`<i style="background:${col(w[0])};flex:${w[1]}"></i>`).join('')}</div>`}
const SVG={
 inj:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2l3 3M12.5 3.5L5 11l-2 .5.5-2L11 2M7 6l3 3M2 14l1.5-1.5"/></svg>',
 oral:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5.5" width="12" height="5" rx="2.5" transform="rotate(-35 8 8)"/><path d="M6.2 4.6l3.6 6.8" transform="rotate(-35 8 8) translate(0 0)"/></svg>',
 nasal:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2v3l-2 6h8l-2-6V2zM5 14h6"/></svg>',
 iv:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 1.5h6v6l-3 2-3-2zM8 9.5V15"/></svg>',
 topical:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 2s4 4.5 4 7.5a4 4 0 0 1-8 0C4 6.5 8 2 8 2z"/></svg>',
 drop:'<svg viewBox="0 0 12 12" fill="currentColor"><path d="M6 .8S10 5 10 7.6A4 4 0 0 1 2 7.6C2 5 6 .8 6 .8z"/></svg>',
 D:'<svg viewBox="0 0 12 12"><text x="6" y="10" text-anchor="middle" font-family="JetBrains Mono,monospace" font-weight="800" font-size="11" fill="currentColor">D</text></svg>',
 syr:'<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M8.5 1l2.5 2.5M9.7 2.3L3.8 8.2l-1.6.4.4-1.6L8.5 1M5.3 4.5l2.2 2.2M1 11l1.2-1.2"/></svg>',
 bin:'<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 3h8M4.5 3V1.6h3V3M3 3l.6 7.5h4.8L9 3"/></svg>',
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
 if(m.kind==='liquid'){r.ok=dose>0;r.units=dose*100;r.ml=dose;return r}
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
function loadL(){try{const v=JSON.parse(localStorage.getItem(LKEY)||'null');if(v&&Array.isArray(v.items))return v}catch(e){}return {items:[]}}
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
 if(m.kind==='mass'&&!(m.vial>0))return '';const r=calc(m,x);return r.ok&&x.rt==='inj'||r.ok&&m.kind!=='mass'?nf(r.units,1)+' U':''}
function protoLink(){const s=L.items.filter(i=>IT[i.c]).map(i=>{const x=IT[i.c];return [x.s,i.dose||'',i.f||'',0,x.go?1:0,'','','','',i.vm?String(i.vm):'',i.vw?String(i.vw):'','',i.dose?1:0,0,1,'',0,'']});
 const o={v:4,o:0,n:'',s,r:[],q:'',g:0,d:'',b:'',nt:[],tm:{AM:'08:00',MID:'12:30',PM:'15:00',EVE:'19:00',BED:'22:00'},it:'',vr:0};
 const b=btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
 return '/protocol/#s='+b}
function listText(){return 'My protocol (Bare Signals)\n'+L.items.filter(i=>IT[i.c]).map(i=>{const x=IT[i.c];const d=itemDraw(i);const last=(i.taken||[]).slice(-1)[0];
 return '· '+x.n+' — '+(i.dose||'dose not set')+(d?' ('+d+')':'')+' · '+(FL[i.f]||'')+(last?' · last '+ago(last):'')}).join('\n')}

/* ---------- toast, copy ---------- */
let tT;function toast(t){let el=$('.toast');if(!el){el=document.createElement('div');el.className='toast';el.setAttribute('role','status');document.body.appendChild(el)}el.textContent=t;el.classList.add('on');clearTimeout(tT);tT=setTimeout(()=>el.classList.remove('on'),2200)}
async function copy(t){try{await navigator.clipboard.writeText(t);toast('Copied')}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Copied')}catch(x){toast('Could not copy')}a.remove()}}

/* ---------- render: compound page ---------- */
let M=X?startMix(X):null,G=-1;
const canMix=x=>x&&!x.kind&&(x.rt==='inj'||x.rt==='nasal');
function cardHTML(x){
 const roles=[x.p].concat((x.r||[]).filter(r=>r!==x.p)).filter(r=>PAL[r]).slice(0,3);
 const it=inList(x.c);const last=it&&(it.taken||[]).slice(-1)[0];
 return `<section class="box card" aria-label="${esc(x.n)}">
 <div class="ch"><h1 class="nm">${esc(x.n)}${x.fda?'<span class="fda" title="Approved somewhere as a medicine">FDA ✓</span>':''}</h1>
 <div class="cnt">${esc(x.cl)}<small>${esc(x.c)}</small></div></div>
 <p class="sub">${esc([x.o,x.u].filter(Boolean).join(' · '))}</p>
 ${stripe(x)}
 <div class="roles">${roles.map(r=>`<div class="rl">${tag(r)}<span>${esc(x.ds[r]||'')}</span></div>`).join('')}</div>
 ${x.kind?'':`<div class="spec"><div><div class="k">Typical dose</div><div class="v big">${esc(x.d.dose||'Not set')}</div></div><div><div class="k">How often</div><div class="v">${esc(x.d.freq||'—')}</div></div><div><div class="k">Route</div><div class="v">${stamp(x.d.route)}</div></div></div>`}
 ${it?`<div class="mine"><span>In my protocol · <b>${esc(it.dose||'dose not set')}</b></span><span>${last?'Last taken '+esc(ago(last)):'Not taken yet'}</span></div>`:''}
 </section>`}
function preview(x){if(!canMix(x))return '';const r=calc(M,x);if(!r.ok)return 'Set vial, water and dose';
 if(M.kind==='liquid')return 'Ready-made · '+doseLabel(M)+' = '+nf(r.units,0)+' U';
 if(M.kind==='units')return nf(+M.vial,2)+' mg + '+nf(+M.water,2)+' ml · draw '+nf(r.units,1)+' U';
 return nf(+M.vial,2)+' '+vialUnit(M)+' + '+nf(+M.water,2)+' ml · '+doseLabel(M)+' = '+nf(r.units,1)+' U'}
function actsHTML(x){
 const it=inList(x.c);
 if(x.kind==='water')return `<div class="acts"><a class="btn full" href="/water/" style="text-decoration:none"><b>Read about this water</b><span>What it is, pH, how long it keeps</span></a>
  <div class="note">This is the mixing water. <b>Scan the peptide vial</b> to get its mixing and dose worked out.</div></div>`;
 const mix=canMix(x)?`<button class="btn main" data-go="mix" aria-expanded="${location.hash==='#mix'}"><b>${M.kind==='liquid'?'Dose and draw':'Reconstitute'}</b><span class="prev">${esc(preview(x))}</span></button>`
  :`<div class="note"><b>${x.rt==='oral'?'Taken by mouth':x.rt==='topical'?'Used on the skin':'Not mixed'}</b>, so there is nothing to reconstitute. ${esc(x.d.dose?'Typical: '+x.d.dose+(x.d.freq?', '+x.d.freq:'')+'.':'')}</div>`;
 return `<div class="acts">${mix}
 <a class="btn" href="/library/#/p/${esc(x.s)}" style="text-decoration:none" data-t="read"><b>Read the full page</b><span>Library entry</span></a>
 <button class="btn${it?' on':''}" data-go="add"><b>${it?'In my protocol ✓':'Add to my protocol'}</b><span>${it?'Open the checklist':'Recommended: '+esc(x.st||'set dose')+(x.st?' · '+(FL[x.f]||''):'')}</span></button></div>`}
function chipsFor(x){
 const m=M;const ch=new Set();(x.ch||[]).forEach(c=>{const p=parseDose(c);if(p)ch.add(p.v)});
 if(m.kind==='mass'&&ch.size){const vals=[...ch].map(v=>toMg(v,m.unit==='mcg'?'mcg':'mg'));const lo=Math.min(...vals),hi=Math.max(...vals);
  const L1=[0.05,0.1,0.15,0.2,0.25,0.3,0.4,0.5,0.75,1,1.5,2,2.5,3,4,5,6,7.5,8,10,12,15,20,25,50,100,200];L1.forEach(v=>{if(v>lo&&v<hi&&ch.size<6)ch.add(m.unit==='mcg'?v*1000:v)})}
 return [...ch].sort((a,b)=>a-b)}
function mixHTML(x){
 const m=M,r=calc(m,x),w=warns(m,r);
 const vialChips=m.kind==='iu'?[2000,5000,10000]:[...new Set([x.vm,5,10,20,30,50].filter(v=>v>0))].sort((a,b)=>a-b).slice(0,6);
 const waterChips=[1,2,3,5];
 const nasal=x.rt==='nasal'?`<p class="side">Using it as a nasal spray instead? <a href="/nasal/">Nasal calculator →</a></p>`:'';
 const liquid=m.kind==='liquid';
 const rows=liquid?`<p class="side" style="margin-top:0">This comes as a ready-made liquid, so there is no powder to mix.</p>`:`
 <div class="row"><div class="k"><i style="background:#FFFFF0"></i>Vial</div><div class="chips">${vialChips.map(v=>`<button class="cp" data-vial="${v}" aria-pressed="${+m.vial===v}">${v}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="vial" value="${esc(m.vial)}" aria-label="Vial size"><span>${vialUnit(m)}</span></label></div></div>
 <div class="row"><div class="k"><i style="background:var(--water)"></i>BAC water</div><div class="chips">${waterChips.map(v=>`<button class="cp" data-water="${v}" aria-pressed="${+m.water===v}">${v}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="water" value="${esc(m.water)}" aria-label="Water"><span>ml</span></label></div></div>`;
 const dc=chipsFor(x);
 const doseRow=`<div class="row"><div class="k"><i style="background:var(--dose)"></i>Dose${x.st?' · recommended start '+esc(x.st):''}</div><div class="chips">${dc.map(v=>`<button class="cp" data-dose="${v}" aria-pressed="${+m.dose===v}">${nf(v,3)}</button>`).join('')}<label class="inp"><input inputmode="decimal" data-in="dose" value="${esc(m.dose)}" aria-label="Dose" placeholder="dose"><span>${esc(m.kind==='units'?'U':m.kind==='iu'?'IU':m.kind==='liquid'?'mL':m.unit)}</span></label>${m.kind==='mass'?`<span class="seg">${['mcg','mg'].map(u=>`<button data-unit="${u}" aria-pressed="${m.unit===u}">${u}</button>`).join('')}</span>`:''}</div></div>`;
 const syrRow=`<div class="row"><div class="k"><i style="background:var(--draw)"></i>Syringe</div><div class="chips">${[100,50,30].map(v=>`<button class="cp" data-syr="${v}" aria-pressed="${m.syr===v}">${v} U</button>`).join('')}</div></div>`;
 const full=m.kind==='mass'&&r.ok?`/draw/?n=${encodeURIComponent(x.n)}&dose=${encodeURIComponent(m.dose)}&u=${m.unit}`:'/draw/';
 return `<section class="box panel" id="mix" aria-label="Reconstitute">
 <div class="ph"><h2>Reconstitute</h2><button class="x" data-go="close">Close</button></div>
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
  <div class="draw"><span class="k">DRAW</span><span class="n">${nf(r.units,1)}</span><span class="u">U</span><span class="ml">= ${nf(r.ml,2)} ml</span></div>
  ${liquid?'':`<p class="math"><b>${nf(+m.vial,2)} ${vialUnit(m)}</b> ÷ <b>${nf(+m.water,2)} ml</b> = <b>${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)}</b> per ml${m.kind==='units'?'<br>'+amt:`<br>${esc(doseLabel(m))} ÷ ${m.kind==='iu'?nf(r.conc,0)+' IU':fmtMass(r.conc)} per ml = <b>${nf(r.ml,3)} ml</b> = <b>${nf(r.units,1)} units</b>`}<br>About <b>${r.per}</b> dose${r.per===1?'':'s'} in this vial</p>`}
  ${syringe(Math.min(r.units,m.syr),m.syr)}
  ${w.map(t=>`<p class="warn">${esc(t)}</p>`).join('')}
  <div class="stk">${liquid?'':`<span class="sk w">${SVG.drop}${nf(+m.water,2)} ML</span>`}<span class="sk d">${SVG.D}${esc(doseLabel(m)).toUpperCase()}</span><span class="sk s">${SVG.syr}${nf(r.units,1)} U</span>${liquid?'':`<span class="sk e">${SVG.bin}${fdate(addDays(28)).toUpperCase()}</span>`}</div>
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
  ['Draw '+u+' units',`Pull the plunger to <b>${u} U</b> on a U-100 syringe (${nf(r.ml,2)} ml). Tap out air bubbles.`],
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
function listHTML(){
 const items=L.items.filter(i=>IT[i.c]);
 return `<section class="box panel" id="list" aria-label="My protocol">
 <div class="ph"><h2>My protocol</h2><button class="x" data-go="closelist">Close</button></div>
 ${items.length?items.map((it,ix)=>{const x=IT[it.c];const d=itemDraw(it);const last=(it.taken||[]).slice(-1)[0];const today=last&&new Date(last).toDateString()===new Date().toDateString();
  const dc=(x.ch||[]).slice(0,4);
  return `<div class="li"><button class="tick" data-tick="${ix}" aria-pressed="${!!today}" aria-label="Mark ${esc(x.n)} taken now">${today?'✓':''}</button>
  <div><div class="t"><a href="/S/${esc(x.c)}/" style="text-decoration:none">${esc(x.n)}</a><small>${esc(x.c)}</small></div>${stripe(x,'mst')}
  <div class="m">${esc(it.dose||'Dose not set')}${d?' · <b>'+esc(d)+'</b>':''} · ${esc(FL[it.f]||'')}<br>${last?'Last taken '+esc(ago(last)):'Not taken yet'}</div></div>
  <button class="rm" data-rm="${ix}">Remove</button>
  ${dc.length>1?`<div class="ed chips">${dc.map(c=>`<button class="cp" data-setdose="${ix}|${esc(c)}" aria-pressed="${it.dose===c}">${esc(c)}</button>`).join('')}</div>`:''}</div>`}).join('')
  :`<p class="empty">Nothing here yet. Tap <b>Add to my protocol</b> on any vial you scan and it builds up here, on this phone only.</p>`}
 ${items.length?`<div class="tools"><a class="btn sm" href="${protoLink()}" style="text-decoration:none" data-t="proto"><b>Open in Protocol</b><span>Calendar, cycles, blood work</span></a>
 <button class="btn sm" data-go="copylist"><b>Copy list</b><span>Paste it anywhere</span></button></div>
 <p class="side">Saved on this phone only. Nothing is sent anywhere. <a href="#" data-go="clear">Clear the list</a></p>`:''}
 </section>`}
function barHTML(){const n=L.items.filter(i=>IT[i.c]).length;
 return `<div class="bar"><div class="in"><button class="btn main" data-go="cam">${SVG.cam}<b>Scan another</b></button>
 <button class="btn" data-go="list">${SVG.list}<b>My protocol</b>${n?`<span class="badge">${n}</span>`:''}</button></div></div>`}

function indexHTML(){
 const all=Object.keys(IT).sort((a,b)=>IT[a].n.localeCompare(IT[b].n));
 return `<section class="box hero"><p class="lab">Bare Signals · Scan</p><h1>Scan a vial.</h1>
 <p>Every Bare Signals vial has a small QR code. Scan it to see what it is, work out the mix and the draw, and build your protocol as you go.</p>
 <div class="acts" style="margin:0"><button class="btn main" data-go="cam"><b>Open the camera</b><span>Point it at the vial QR</span></button></div></section>
 ${L.items.length||location.hash==='#list'?listHTML():''}
 <section class="box panel"><div class="ph"><h2>Every code</h2><span class="lab" style="margin:0">${all.length}</span></div>
 <p class="side" style="margin-top:0">The letters under each vial QR. Typing one works too: baresignals.co/S/<b>RTA</b>.</p>
 <input class="find" type="search" placeholder="Find a compound or code" aria-label="Find a compound or code" data-find>
 <div class="codes">${all.map(c=>`<a href="/S/${c}/" data-n="${esc((IT[c].n+' '+c).toLowerCase())}"><b>${c}</b><span>${esc(IT[c].n)}</span></a>`).join('')}</div></section>`}

function render(){
 if(!CODE){app.innerHTML=(ASKED?`<p class="lab">No vial found for <b>${esc(ASKED)}</b> · check the letters under the QR</p>`:'')+indexHTML()+barHTML();return}
 const h=location.hash;
 app.innerHTML=`<p class="lab">Scanned vial · <b>${esc(CODE)}</b></p>`+cardHTML(X)+actsHTML(X)+(h==='#mix'&&canMix(X)?mixHTML(X):'')+(h==='#list'?listHTML():'')+barHTML();
}
function go(h){if(location.hash!==h)history.pushState(null,'',h||location.pathname);render();if(h){const el=$(h);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})}}
window.addEventListener('popstate',render);

/* ---------- events ---------- */
app.addEventListener('click',e=>{
 const b=e.target.closest('[data-go],[data-vial],[data-water],[data-dose],[data-unit],[data-syr],[data-tick],[data-rm],[data-setdose],[data-t]');if(!b)return;
 const g=b.dataset.go;
 if(b.dataset.t){track('scan-'+b.dataset.t+':'+CODE);return}
 if(b.dataset.vial){M.vial=+b.dataset.vial;return render()}
 if(b.dataset.water){M.water=+b.dataset.water;return render()}
 if(b.dataset.dose){M.dose=+b.dataset.dose;return render()}
 if(b.dataset.unit){const u=b.dataset.unit;if(u!==M.unit&&+M.dose>0)M.dose=u==='mcg'?+M.dose*1000:+M.dose/1000;M.unit=u;return render()}
 if(b.dataset.syr){M.syr=+b.dataset.syr;return render()}
 if(b.dataset.tick){const it=L.items.filter(i=>IT[i.c])[+b.dataset.tick];if(!it)return;it.taken=it.taken||[];
  const last=it.taken.slice(-1)[0];if(last&&Date.now()-last<10*60*1000&&b.getAttribute('aria-pressed')==='true'){it.taken.pop();toast('Undone')}else{it.taken.push(Date.now());it.taken=it.taken.slice(-30);toast(IT[it.c].n+' marked taken');track('scan-taken')}
  saveL();return render()}
 if(b.dataset.rm){const items=L.items.filter(i=>IT[i.c]);const it=items[+b.dataset.rm];L.items=L.items.filter(i=>i!==it);saveL();toast('Removed');return render()}
 if(b.dataset.setdose){const [ix,d]=b.dataset.setdose.split('|');const it=L.items.filter(i=>IT[i.c])[+ix];if(it){it.dose=d;saveL();render()}return}
 e.preventDefault();
 if(g==='mix'){if(location.hash==='#mix')return go('');track('scan-mix:'+CODE);return go('#mix')}
 if(g==='close'||g==='closelist'){G=-1;return go('')}
 if(g==='add'){if(!inList(CODE)){addToList(CODE,location.hash==='#mix'?M:null);toast('Added · '+(inList(CODE).dose||'set your dose'));track('scan-add:'+CODE)}return go('#list')}
 if(g==='list'){if(location.hash==='#list')return go('');return go('#list')}
 if(g==='guide'){G=G>=0?-1:0;track('scan-guide:'+CODE);render();const el=$('.guide');if(el)el.scrollIntoView({behavior:'smooth',block:'center'});return}
 if(g==='gnext'){const S=steps(X,calc(M,X));if(G>=S.length-1){G=-1;toast('All set')}else G++;return render()}
 if(g==='gback'){G=Math.max(0,G-1);return render()}
 if(g==='copy'){const r=calc(M,X);if(!r.ok)return toast('Fill in the dose first');track('scan-copy:'+CODE);return copy(mixText(r))}
 if(g==='shot'){const r=calc(M,X);if(!r.ok)return toast('Fill in the dose first');track('scan-shot:'+CODE);return shot(r)}
 if(g==='copylist')return copy(listText());
 if(g==='clear'){if(confirm('Clear your protocol list on this phone?')){L={items:[]};saveL();render()}return}
 if(g==='cam')return openCam();
});
app.addEventListener('input',e=>{
 const i=e.target;
 if(i.dataset.in){const v=parseFloat(String(i.value).replace(',','.'));M[i.dataset.in]=isFinite(v)?v:'';soft();return}
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
 <div class="stk">${m.kind==='liquid'?'':`<span class="sk w">${SVG.drop}${nf(+m.water,2)} ML</span>`}<span class="sk d">${SVG.D}${esc(doseLabel(m)).toUpperCase()}</span><span class="sk s">${SVG.syr}${nf(r.units,1)} U</span>${m.kind==='liquid'?'':`<span class="sk e">${SVG.bin}${fdate(addDays(28)).toUpperCase()}</span>`}</div></div>
 <div class="ft"><span>Mixed ${fdate(new Date())}</span><span>baresignals.co/S/${esc(x.c)}</span></div></div>`;
 document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-close]'))el.remove()});
 const k=e=>{if(e.key==='Escape'){el.remove();removeEventListener('keydown',k)}};addEventListener('keydown',k)}

/* ---------- camera: scan another ---------- */
let camEl=null,stream=null,raf=0,det=null,busy=false;
function loadJsQR(){return window.jsQR?Promise.resolve():new Promise((ok,no)=>{const s=document.createElement('script');s.src='/scan/v1/jsqr.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)})}
async function makeDetector(){try{if('BarcodeDetector' in window){const f=await window.BarcodeDetector.getSupportedFormats();if(f.indexOf('qr_code')>=0)return new window.BarcodeDetector({formats:['qr_code']})}}catch(e){}return null}
function closeCam(){cancelAnimationFrame(raf);raf=0;if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}if(camEl){camEl.remove();camEl=null}document.documentElement.style.overflow=''}
function hit(text){
 const c=resolve(text);
 if(c&&/baresignals\.co\/S\//i.test(text)||c&&!/[.:]/.test(text)){track('scan-cam-hit:'+c);if(navigator.vibrate)navigator.vibrate(40);closeCam();if(c===CODE){toast('Same vial');return true}location.href='/S/'+c+'/';return true}
 const msg=camEl&&$('.msg',camEl);if(msg)msg.textContent=/^https?:/i.test(text)?'That QR is not a Bare Signals vial.':'Not a Bare Signals code: '+String(text).slice(0,40);
 return false}
async function decodeFrame(src,w,h){
 if(det){try{const r=await det.detect(src);if(r&&r[0])return r[0].rawValue}catch(e){}return ''}
 if(!window.jsQR)return '';
 const s=Math.min(1,640/Math.max(w,h));const cw=Math.round(w*s),ch=Math.round(h*s);
 const cv=decodeFrame.cv||(decodeFrame.cv=document.createElement('canvas'));cv.width=cw;cv.height=ch;const cx=cv.getContext('2d',{willReadFrequently:true});cx.drawImage(src,0,0,cw,ch);
 const d=cx.getImageData(0,0,cw,ch);const r=window.jsQR(d.data,cw,ch,{inversionAttempts:'attemptBoth'});return r?r.data:''}
async function openCam(){
 track('scan-cam');closeCam();
 camEl=document.createElement('div');camEl.className='cam';camEl.setAttribute('role','dialog');camEl.setAttribute('aria-label','Scan a vial');
 camEl.innerHTML=`<video playsinline muted autoplay></video><div class="frame" aria-hidden="true"></div>
 <div class="top"><b>Scan a vial</b><button class="x" data-close>Close</button></div>
 <div class="bot"><p class="msg">Opening the camera…</p>
 <label class="btn" style="text-align:center"><b>Take a photo instead</b><input type="file" accept="image/*" capture="environment" hidden data-photo></label>
 <form class="typ" data-type><input placeholder="or type the code: RTA" aria-label="Type the vial code" maxlength="12" autocapitalize="characters" autocomplete="off"><button class="btn sm" style="min-width:64px;justify-content:center"><b>Go</b></button></form></div>`;
 document.body.appendChild(camEl);document.documentElement.style.overflow='hidden';
 camEl.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeCam()});
 $('[data-type]',camEl).addEventListener('submit',e=>{e.preventDefault();const v=$('[data-type] input',camEl).value;const c=resolve(v);if(c){closeCam();location.href='/S/'+c+'/'}else $('.msg',camEl).textContent='No vial with the code '+v.toUpperCase()});
 $('[data-photo]',camEl).addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;$('.msg',camEl).textContent='Reading the photo…';
  try{if(!det)await loadJsQR();const img=await createImageBitmap(f);const t=await decodeFrame(img,img.width,img.height);if(!t||!hit(t))$('.msg',camEl).textContent=t?$('.msg',camEl).textContent:'No QR found in that photo. Get closer and keep it sharp.'}catch(x){$('.msg',camEl).textContent='Could not read that photo.'}});
 det=await makeDetector();
 if(!det){try{await loadJsQR()}catch(e){}}
 const v=$('video',camEl);
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$('.msg',camEl).textContent='This browser can’t open the camera here. Take a photo or type the code.';return}
 try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280},height:{ideal:720}},audio:false})}
 catch(e){$('.msg',camEl).textContent=e&&e.name==='NotAllowedError'?'Camera blocked. Allow it in your browser settings, or take a photo instead.':'No camera found. Take a photo or type the code.';return}
 if(!camEl){stream.getTracks().forEach(t=>t.stop());return}
 v.srcObject=stream;try{await v.play()}catch(e){}
 $('.msg',camEl).textContent='Point at the QR on the vial. Hold it close.';
 let lastT=0;
 const loop=async t=>{if(!camEl)return;raf=requestAnimationFrame(loop);if(busy||t-lastT<140||v.readyState<2)return;lastT=t;busy=true;
  try{const txt=await decodeFrame(v,v.videoWidth,v.videoHeight);if(txt)hit(txt)}catch(e){}busy=false};
 raf=requestAnimationFrame(loop);
}
addEventListener('keydown',e=>{if(e.key==='Escape'&&camEl)closeCam()});
addEventListener('pagehide',closeCam);

/* ---------- boot ---------- */
if(X){document.title=X.n+' · Bare Signals';track('scan:'+CODE,'Scan '+CODE)}else track('scan:index','Scan index');
render();
if(location.hash==='#mix'||location.hash==='#list'){const el=$(location.hash);if(el)setTimeout(()=>el.scrollIntoView({block:'start'}),50)}
})();
