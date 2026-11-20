"""Library v114 (20 Nov 2026, live), built on v113 (kept). Proposal A from list mockup v2:
1. Toolbar like Finder: search, then two joined icons (cards | list), then one sort icon that opens Sort by with a check.
   The old 'Sort Popular' bar and density buttons, and the 'Browse by' chip row, are gone (all inside the sort menu now).
   'What do you want help with?' role chips stay.
2. List view: every name, no cards. Peptides grouped by the chosen sort, then Supplements, Cases, Goals. Remembered.
   Tap a name: its card opens above the list; closing it returns you where you were.
3. Search under All searches everything: matching Cases, Goals and Supplements show as rows above the peptide results
   (cards view), and the list view filters all four sections."""
import os, shutil, json
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v113', f'{R}/v114'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
IC = {'grid': '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="5.5" height="5.5"/><rect x="10.5" y="2" width="5.5" height="5.5"/><rect x="2" y="10.5" width="5.5" height="5.5"/><rect x="10.5" y="10.5" width="5.5" height="5.5"/></svg>',
      'list': '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h10M6 9h10M6 14h10"/><circle cx="2.6" cy="4" r=".9" fill="currentColor"/><circle cx="2.6" cy="9" r=".9" fill="currentColor"/><circle cx="2.6" cy="14" r=".9" fill="currentColor"/></svg>',
      'sort': '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3v12M2 12l3 3 3-3M13 15V3M10 6l3-3 3 3"/></svg>'}
rep('<input id="q" type="search" placeholder="Search a feeling, a goal or a name" aria-label="Search compounds" autocomplete="off"><span class="count qc" id="count"></span></div></div>',
    '<input id="q" type="search" placeholder="Search everything: a name, a goal, a feeling" aria-label="Search the Library" autocomplete="off"><span class="count qc" id="count"></span></div>'
    f'<div class="seg114" role="group" aria-label="View"><button type="button" class="ib114" data-v114="grid" aria-label="Cards" aria-pressed="true">{IC["grid"]}</button><button type="button" class="ib114" data-v114="list" aria-label="List" aria-pressed="false">{IC["list"]}</button></div>'
    f'<button type="button" class="ib114 sq114" id="sb114" aria-label="Sort" aria-haspopup="menu" aria-expanded="false">{IC["sort"]}</button><div class="menu114" id="m114" role="menu" hidden></div></div>')
rep('<div class="alsoin" id="alsoin" hidden></div>', '<div class="alsoin" id="alsoin" hidden></div><div id="ar114" hidden></div><div id="lv114" hidden></div>')
ALIAS = {'tennis-elbow': 'elbow tendon tendonitis lateral epicondylitis', 'achilles': 'achilles tendon heel', 'knee': 'knee acl meniscus',
         'gut': 'gut ibs leaky bloating colitis', 'endometriosis': 'endometriosis endo', 'pcos': 'pcos polycystic',
         'period-pain': 'period cramps menstrual pain', 'glp-1': 'glp ozempic wegovy weight'}
JS = r"""
/* v114: Finder-style toolbar, list view, search everything */
const LV114K='bs-view';let LV=false,LVY=0;try{LV=localStorage.getItem(LV114K)==='list'}catch(e){}
const EMB114=document.documentElement.classList.contains('emb104')||new URLSearchParams(location.search).get('embed')==='1';
const CKW114=%s;
const SN114={pop:'Popular',role:'What it does',origin:'Peptide or not',blend:'Blends',ev:'Evidence',route:'How it’s taken',az:'A to Z',size:'Size'};
const idOf114=n=>String(n).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const nm114=x=>String(x||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9+ ]/g,' ').replace(/\s+/g,' ');
const qm114=t=>{const q=nm114(st.q).trim();return !q||nm114(t).includes(q)};
function others114(){const S=(window.SUPP||[]),C=(window.BS_CARDS||{});
  return {sup:S.filter(x=>qm114([x.n,x.aka,x.s,x.cat].join(' '))),cas:(C.cases||[]).filter(x=>qm114([x.name,x.line,CKW114[x.id]||''].join(' '))),goa:(C.goals||[]).filter(x=>qm114([x.name,x.line,x.stat].join(' ')))}}
const li114=o=>`<li><a href="#/${o.slug}" data-lv="${o.slug}"><span class="n">${esc(o.name)}</span>${o.fda?'<span class="t">FDA</span>':''}<span class="d">${(o.roles||[]).slice(0,3).map(r=>`<i style="background:${HEX[r]||'#FFFFF4'}"></i>`).join('')}</span></a></li>`;
const grp114=(label,col,n,inner)=>`<div class="grp"><p class="gh"><i style="background:${col}"></i>${esc(label)} <b>${n}</b></p><ul>${inner}</ul></div>`;
const row114=x=>`<li><a href="${x.url}"><span class="n">${esc(x.name)}</span><span class="t">${esc(x.stat||'')}</span></a></li>`;
const suppSec114=(S,title)=>{if(!S.length)return '';const C=window.SUPP_CATC||{},cats=(window.SUPP_CATS||[...new Set(S.map(x=>x.cat))]);
  return `<section class="lvs"><div class="sh"><h2>${title||'Supplements'}</h2><span>${S.length}</span></div><div class="cols">${cats.map(c=>{const L=S.filter(x=>x.cat===c);return L.length?grp114(c,C[c]||'#FFFFF4',L.length,L.map(x=>`<li><a href="/supplements/#/${idOf114(x.n)}"><span class="n">${esc(x.n)}</span></a></li>`).join('')):''}).join('')}</div></section>`};
const rowSec114=(L,title,sub)=>L.length?`<section class="lvs"><div class="sh"><h2>${title}</h2><span>${L.length}${sub?' · '+sub:''}</span></div><ul class="cols rows">${L.map(row114).join('')}</ul></section>`:'';
function renderLV(){const box=$('#lv114');if(!box)return;if(!LV||EMB114){box.hidden=true;return}
  const L=filtered().filter(o=>!isW(o)),az=(a,b)=>a.name.localeCompare(b.name);let g='';
  if(st.sort==='role'){const by={};L.forEach(o=>{const r=(o.roles||[])[0]||'other';(by[r]=by[r]||[]).push(o)});g=Object.keys(by).sort((a,b)=>by[b].length-by[a].length).map(r=>grp114(LONG[r]||r,HEX[r]||'#FFFFF4',by[r].length,by[r].map(li114).join(''))).join('')}
  else if(st.sort==='az'){const by={};L.slice().sort(az).forEach(o=>{const c=/[a-z]/i.test(o.name[0])?o.name[0].toUpperCase():'#';(by[c]=by[c]||[]).push(o)});g=Object.keys(by).map(c=>grp114(c,'#FFFFF4',by[c].length,by[c].map(li114).join(''))).join('')}
  else if(GROUP[st.sort]){const by=new Map();L.forEach(o=>{const k=GROUP[st.sort](o);const id=k[0]+'|'+k[1];if(!by.has(id))by.set(id,{k,L:[]});by.get(id).L.push(o)});g=[...by.values()].sort((a,b)=>(a.k[0]>b.k[0])-(a.k[0]<b.k[0])).map(v=>grp114(v.k[1],v.k[2]||'#FFFFF4',v.L.length,v.L.map(li114).join(''))).join('')}
  else g=grp114('Most looked at first','#FFDE59',L.length,L.map(li114).join(''));
  const O=others114();
  box.innerHTML=`<section class="lvs" id="lvpep"><div class="sh"><h2>Peptides</h2><span>${L.length}</span></div><div class="cols">${g||'<p class="note">No peptide matches.</p>'}</div></section>`+suppSec114(O.sup)+rowSec114(O.cas,'Cases','a problem to heal')+rowSec114(O.goa,'Goals','what you want more of');
  box.hidden=false}
function renderAR(){const box=$('#ar114');if(!box)return;const on=!LV&&!EMB114&&st.q.trim().length>=2;if(!on){box.hidden=true;box.innerHTML='';return}
  const O=others114();const h=rowSec114(O.cas,'Cases')+rowSec114(O.goa,'Goals')+suppSec114(O.sup);
  const np=filtered().filter(o=>!isW(o)).length;
  box.innerHTML=h;box.hidden=!h}
function setV114(v){LV=v==='list';try{localStorage.setItem(LV114K,LV?'list':'grid')}catch(e){}
  document.body.classList.toggle('lv114',LV);document.querySelectorAll('[data-v114]').forEach(b=>{const on=(b.dataset.v114==='list')===LV;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  renderLV();renderAR()}
function menu114(open){const m=$('#m114'),b=$('#sb114');if(!m)return;if(open===undefined)open=m.hidden;
  if(open)m.innerHTML=`<p>Sort by</p>`+Object.keys(SN114).map(k=>`<button type="button" role="menuitemradio" aria-checked="${st.sort===k}" data-s114="${k}"><span class="ck">${st.sort===k?'✓':''}</span>${SN114[k]}</button>`).join('');
  m.hidden=!open;b.setAttribute('aria-expanded',open)}
document.addEventListener('click',e=>{const t=e.target;
  const v=t.closest&&t.closest('[data-v114]');if(v){setV114(v.dataset.v114);return}
  if(t.closest&&t.closest('#sb114')){menu114();return}
  const s=t.closest&&t.closest('[data-s114]');if(s){const k=s.dataset.s114,b=document.querySelector(`#smenu [data-sort="${k}"]`);if(b)b.click();else{st.sort=k;render()}menu114(false);return}
  if(!(t.closest&&t.closest('#m114')))menu114(false);
  const a=t.closest&&t.closest('#lv114 a[data-lv]');if(a&&narrow()){LVY=scrollY}},true);
{const _r=renderGrid;renderGrid=function(){_r.apply(this,arguments);renderLV();renderAR()}}
{const _p=placeCard;placeCard=function(scroll){if(LV&&narrow()&&cur){const cw=$('#cardwrap'),box=$('#lv114');if(box&&box.previousElementSibling!==cw)box.before(cw);
  if(scroll!==false){const r=cw.getBoundingClientRect();scrollTo({top:scrollY+r.top-6-topOff(),behavior:'auto'})}return}return _p.apply(this,arguments)}}
{const _c=closeCard;closeCard=function(){const r=_c.apply(this,arguments);if(LV&&narrow()&&LVY){const y=LVY;LVY=0;setTimeout(()=>scrollTo(0,y),30)}return r}}
addEventListener('load',()=>{if(typeof loadSupp==='function')loadSupp().then(()=>{renderLV();renderAR()});setV114(LV?'list':'grid')});
""" % json.dumps(ALIAS)
rep('function page65(o){', JS + '\nfunction page65(o){')
CSS = """
/* v114: Finder toolbar + list view */
#tools .sbar{display:none!important}
.brw .bh:first-child,.brw .br1{display:none!important}
.seg114{display:flex;border:1.5px solid var(--ink);background:var(--chip);flex:none}
.ib114{all:unset;box-sizing:border-box;cursor:pointer;width:40px;display:grid;place-items:center;color:var(--ink);flex:none;-webkit-tap-highlight-color:transparent;min-height:40px}
.seg114 .ib114+.ib114{border-left:1.5px solid var(--ink)}
.ib114.on{background:var(--ink);color:#fff}
.ib114 svg{width:17px;height:17px;display:block}
.sq114{border:1.5px solid var(--ink);background:var(--chip)}
.sq114[aria-expanded=true]{background:#FFDE59}
.trow{position:relative}
.menu114{position:absolute;right:0;top:calc(100% + 6px);z-index:60;min-width:230px;background:#FFFFF4;border:1.5px solid var(--ink);box-shadow:4px 4px 0 var(--rule);padding:4px 0}
.menu114 p{margin:6px 12px 2px;font:600 9.5px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}
.menu114 button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;padding:9px 12px;font-size:15px;color:var(--ink)}
.menu114 button:hover{background:#FFFFE2}
.menu114 .ck{width:14px;flex:none;color:var(--accent);font-weight:700}
#alsoin{display:none!important}
body.lv114 #shelf,body.lv114 #allp,body.lv114 #grid,body.lv114 #fbar,body.lv114 .more111,body.lv114 #brw{display:none!important}
#lv114 .lvs,#ar114 .lvs{margin:12px 0 0}
#lv114 .sh,#ar114 .sh{display:flex;align-items:baseline;gap:8px;border-bottom:1.5px solid var(--ink);padding:0 0 4px}
#lv114 .sh h2,#ar114 .sh h2{font:700 calc(14px*var(--k))/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;margin:0}
#lv114 .sh span,#ar114 .sh span{font:500 calc(11px*var(--k)) var(--mono);color:var(--ink-soft)}
#ar114 .pph{margin:14px 0 6px}
#lv114 .grp,#ar114 .grp{break-inside:avoid;margin:10px 0 2px}
#lv114 .gh,#ar114 .gh{display:flex;align-items:center;gap:6px;font:600 calc(10px*var(--k))/1.2 var(--mono);letter-spacing:.07em;text-transform:uppercase;margin:0 0 3px}
#lv114 .gh i,#ar114 .gh i{width:11px;height:11px;border:1px solid rgba(62,74,128,.45);flex:none}
#lv114 .gh b,#ar114 .gh b{font-weight:500;color:var(--ink-soft)}
#lv114 .cols,#ar114 .cols{columns:2;column-gap:14px}
@media (min-width:700px){#lv114 .cols,#ar114 .cols{columns:3}}
@media (min-width:1300px){#lv114 .cols,#ar114 .cols{columns:4;column-gap:22px}}
#lv114 ul,#ar114 ul{list-style:none;margin:0;padding:0}
#lv114 li a,#ar114 li a{display:flex;align-items:flex-start;gap:6px;padding:5px 0;border-bottom:1px solid rgba(62,74,128,.12);color:var(--ink);text-decoration:none;font-size:calc(14px*var(--k));line-height:1.2;min-width:0;break-inside:avoid}
#lv114 li a .n,#ar114 li a .n{flex:1 1 auto;min-width:0}
#lv114 li a .d{flex:none;display:flex;gap:2px;margin-top:2px}
#lv114 li a .d i{width:6px;height:12px;border:1px solid rgba(62,74,128,.25)}
#lv114 li a .t,#ar114 li a .t{flex:none;font:500 calc(9px*var(--k)) var(--mono);color:var(--ink-soft);letter-spacing:.04em;margin-top:2px}
#lv114 .rows li a .t,#ar114 .rows li a .t{font-size:calc(11px*var(--k));color:var(--accent);font-weight:600}
#lv114 li a:hover,#ar114 li a:hover{background:var(--chip)}
.libq #brw,body.libq #brw,body.lv114 #gpanel{display:none!important}
@media (max-width:899px){#count{display:none}}
.emb104 .seg114,.emb104 #sb114,.emb104 #lv114,.emb104 #ar114{display:none!important}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v114 (20 Nov 2026, built on v113, kept): Finder-style toolbar (cards | list icons and one sort button with a Sort by menu, replacing the Sort bar, density buttons and Browse by row); list view of every name grouped by the sort, plus Supplements, Cases and Goals; search under All finds Cases, Goals and Supplements too. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
