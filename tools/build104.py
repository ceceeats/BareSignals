"""Library v104 (19 Nov 2026, preview, built on v103 which stays live):
1. Page kind label: every card says Quick look, every full page says Full read (and in the browser tab title).
2. Why on every list: synergies (existing why), In blends (each part's job from the blend record), Supplements
   (the supplement's own pairing line), Blood work tests (the compound's reason plus what the test measures).
   Tapping a blood test opens its Why in place, with Open in Blood Work inside, instead of leaving the page.
3. Supplement links go to the Supplements page (they dropped readers on an empty Library list).
4. The Guide body sits at the top of every full read ("Where it acts"), lit for that compound.
5. Embed mode (?embed=1) so the Guide can show this exact card and full read in a sheet.
6. questions.html: every missing Why, per compound, as the research queue."""
import os, shutil, json, re, subprocess
R = '/home/claude/baresignals'
SRC, DST = f'{R}/library/v103', f'{R}/library/v104'
GUIDE = '/home/v86/'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

# what each blood test measures, first two sentences (from Blood Work data)
node = r"""
global.window={};const fs=require('fs');eval(fs.readFileSync('%s/blood/v20/data.js','utf8'));
const out={};for(const t of window.BW.tests){const w=String(t.what||'').replace(/\s+/g,' ').trim();const ss=w.match(/[^.!?]+[.!?]+/g)||[w];out[t.id]=ss.slice(0,2).join(' ').trim().slice(0,320)}
eval(fs.readFileSync('%s/library/v103/data.js','utf8'));
const G=fs.readFileSync('%s/home/v85/index.html','utf8');const i=G.indexOf('const C=[');const j=G.indexOf('];',i);const C=JSON.parse(G.slice(i+8,j+1));
console.log(JSON.stringify({tw:out,guide:C.map(x=>x.s)}));
""" % (R, R, R)
res = json.loads(subprocess.run(['node', '-e', node], capture_output=True, text=True, check=True).stdout)
TW, GUIDE_SLUGS = res['tw'], res['guide']

js104 = "/* v104 why, kinds, body, embed */\nwindow.BS_TW=" + json.dumps(TW, ensure_ascii=False) + ";\nwindow.BS_GSL=" + json.dumps(GUIDE_SLUGS) + ";\n"
open(f'{DST}/tw.js', 'w', encoding='utf8').write(js104)

s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    assert s.count(old) >= 1, 'missing: ' + old[:90]
    s = s.replace(old, new, n)

# 1. kind labels
rep("<div class=\"nmb\"><h3>${cardName(o)}</h3>${o.blend?`<p class=\"bpl\">${bpHTML(o,null,'card')}</p>`:''}<p class=\"sub\">",
    "<div class=\"nmb\"><p class=\"pk104\">Quick look</p><h3>${cardName(o)}</h3>${o.blend?`<p class=\"bpl\">${bpHTML(o,null,'card')}</p>`:''}<p class=\"sub\">")
rep("<div class=\"nmb\"><h3>${cardName(o)}</h3>${aka}", "<div class=\"nmb\"><p class=\"pk104 fr\">Full read</p><h3>${cardName(o)}</h3>${aka}")
rep("document.title=o.name+' · Bare Signals Library';scrollTo(0,0);after65(o);", "document.title=o.name+' · Full read · Bare Signals';scrollTo(0,0);after65(o);why104(o,$('#pagev'));body104(o);setTimeout(()=>why104(o,$('#pagev')),900);")
rep("document.title=o.name+' · Bare Signals Library';\n  playChain(cw);", "document.title=o.name+' · Quick look · Bare Signals';\n  playChain(cw);why104(o,cw);")
rep('<script src="rx.js"></script>', '<script src="rx.js"></script>\n<script src="tw.js"></script>')

JS = r"""
/* ===== v104: Why on every list, page kinds, Guide body on the full read, embed mode ===== */
const GUIDE104='__GUIDE__';
let SUPP104=null;
function supp104(){if(SUPP104)return SUPP104;SUPP104=new Promise(res=>{const sc=document.createElement('script');sc.src='/supplements/v16/data.js';sc.onload=()=>res(window.SUPP||[]);sc.onerror=()=>res([]);document.head.appendChild(sc)});return SUPP104}
const sent104=t=>{const m=String(t||'').replace(/\s+/g,' ').match(/[^.!?]+[.!?]+/g);return m?m.slice(0,2).join(' ').trim():String(t||'')};
function whyBox(txt,extra){return `<button type="button" class="wy104" aria-expanded="false">Why</button><div class="wyx104" hidden><p>${txt}</p>${extra||''}</div>`}
function wireWhy(root){root.querySelectorAll('.wy104:not([data-w])').forEach(b=>{b.dataset.w=1;b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const x=b.nextElementSibling;const o=x.hidden;x.hidden=!o;b.setAttribute('aria-expanded',o);b.classList.toggle('on',o)})})}
function why104(o,root){if(!root)return;
  /* synergies: the existing tap-to-open why gets a visible Why label */
  root.querySelectorAll('.sxc').forEach(b=>{if(!b.querySelector('.wyl104'))b.insertAdjacentHTML('beforeend','<em class="wyl104">Why</em>')});
  /* in blends: each part's job, from the blend record */
  root.querySelectorAll('.k-inb .chx a, .chx a[href^="#/p/"]').forEach(a=>{if(a.parentElement.classList.contains('row104'))return;const sl=(a.getAttribute('href')||'').replace('#/p/','');const b=BYS0(sl);if(!b||!b.blend)return;
    const me=b.blend.why&&b.blend.why.find(w=>{const p=b.blend.parts.find(q=>q[0]===o.slug);return p&&(w[0]===p[2]||p[2].indexOf(w[0])===0||w[0].indexOf(o.name)===0)});
    const parts=(b.blend.why||[]).filter(w=>w!==me).map(w=>`<b>${esc(w[0])}</b> ${esc(w[1])}`).join(' · ');
    const txt=(me?`<b>${esc(o.name)} brings:</b> ${esc(me[1])}. `:'')+(parts?`<b>${me?'With':'In '+esc(b.name)+':'}</b> ${parts}`:'');
    const w=document.createElement('div');w.className='row104';a.before(w);w.appendChild(a);w.insertAdjacentHTML('beforeend',whyBox(txt))});
  /* supplements: link to the Supplements page, Why = the supplement's pairing line */
  const SP=[...root.querySelectorAll('.k-sup .spx a, .spx a[href^="#/s-"]')];
  if(SP.length)supp104().then(S=>{root.querySelectorAll('.k-sup .spx a, .spx a[href^="#/s-"]').forEach(a=>{if(a.parentElement.classList.contains('row104'))return;const id=(a.getAttribute('href')||'').replace(/^#\/s-/,'');a.setAttribute('href','/supplements/#/'+id);
    const nm=(a.querySelector('b')||a).textContent.trim();const so=S.find(x=>x.n===nm)||S.find(x=>x.n.toLowerCase()===nm.toLowerCase());
    let t=so&&so.does?sent104(so.does):(a.getAttribute('title')||'');if(!t)return;
    const w=document.createElement('div');w.className='row104';a.before(w);w.appendChild(a);w.insertAdjacentHTML('beforeend',whyBox(esc(t),`<a class="wyo104" href="/supplements/#/${id}">Open ${esc(nm)} in Supplements →</a>`))});wireWhy(root)});
  /* blood tests: the compound's reason + what the test measures; tap opens the why in place */
  const C=(BWL&&BWL.comps||{})[o.slug];
  root.querySelectorAll('a.bwt, span.bwt').forEach(a=>{if(a.dataset.w104)return;a.dataset.w104=1;
    const href=a.getAttribute('href')||'';let id=(href.match(/#\/t\/([^/?#]+)/)||[])[1];const nm=a.textContent.replace(/⁠/g,'').trim();
    let own='';if(C){const b=(C.before||[]).concat(C.monitor||[]).find(x=>x[0]===id);if(b&&b[5])own=b[5];const mk=(C.mk||[]).find(x=>x[1]&&(x[1].toLowerCase().indexOf(nm.toLowerCase())===0||(x[3]&&id&&x[3]==='t/'+id)));if(mk){if(!id&&mk[3])id=mk[3].replace('t/','');own=[own,mk[2],mk[11]].filter(Boolean).join('. ')}}
    const gen=id&&window.BS_TW?BS_TW[id]:'';
    const txt=(own?`<b>For ${esc(o.name)}:</b> ${esc(own.replace(/\.\s*\./g,'.'))}${/[.!?]$/.test(own)?'':'.'} `:'')+(gen?`<b>What it measures:</b> ${esc(gen)}`:'');
    if(!txt)return;
    const box=document.createElement('div');box.className='bwy104';box.hidden=true;box.innerHTML=`<p>${txt}</p>${id?`<a class="wyo104" href="/blood/#/t/${id}">Open ${esc(nm)} in Blood Work →</a>`:''}`;
    const list=a.parentElement;list.after(box);a.classList.add('bwq104');
    a.addEventListener('click',e=>{e.preventDefault();const open=box.hidden||box.dataset.id!==nm;list.parentElement.querySelectorAll('.bwy104').forEach(x=>x.hidden=true);list.querySelectorAll('.bwq104').forEach(x=>x.classList.remove('on'));if(open){box.hidden=false;box.dataset.id=nm;a.classList.add('on')}})});
  wireWhy(root)}
function body104(o){if(!(window.BS_GSL||[]).includes(o.slug))return;const hd=document.querySelector('#pagev .hd65');if(!hd||document.querySelector('#pagev .k-body104'))return;
  const sec=document.createElement('section');sec.className='s65 k-body104';sec.innerHTML=`<h2 class="t65">Where it acts <small>tap a label for its study</small></h2><div class="b65"><iframe title="${esc(o.name)} on the body" loading="lazy" src="${GUIDE104}?p=${encodeURIComponent(o.slug)}&embed=body"></iframe></div>`;
  hd.after(sec)}
addEventListener('message',ev=>{const m=ev.data;if(m&&m.bsbodyh){document.querySelectorAll('.k-body104 iframe').forEach(f=>{if(f.contentWindow===ev.source)f.style.height=m.bsbodyh+'px'})}});
/* embed mode: the Guide shows this card and full read inside its sheet */
(function(){const E=new URLSearchParams(location.search).get('embed');if(!E)return;document.documentElement.classList.add('emb104');
  const tell=()=>{const h=location.hash;const m=h.match(/^#\/(p\/)?([a-z0-9-]+)$/);if(m)parent.postMessage({bs104:1,kind:m[1]?'full':'quick',slug:m[2]},'*')};
  addEventListener('hashchange',tell);setTimeout(tell,300);
  document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(a){const h=a.getAttribute('href');if(h&&h[0]!=='#'&&!a.target){a.target='_top'}}
    if(e.target.closest&&e.target.closest('#cardwrap .x')){e.preventDefault();e.stopPropagation();parent.postMessage({bs104:1,close:1},'*')}},true)})();
"""
JS = JS.replace('__GUIDE__', GUIDE)
rep('function page65(o){', JS + '\nfunction page65(o){')

CSS = """
/* v104 */
.pk104{font:600 calc(8.5px*var(--k))/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#DB6830;margin:0 0 4px;display:inline-block;border:1px solid #DB6830;padding:3px 5px 2px}
.pk104.fr{color:#fff;background:#3E4A80;border-color:#3E4A80}
.wyl104{font-style:normal;font:600 calc(8px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#5271FF;margin-left:6px;border-bottom:1px solid #5271FF}
.row104{display:flex;flex-wrap:wrap;align-items:center;gap:4px 6px}
.row104>a{flex:1 1 0;min-width:0}
.row104>.wy104{flex:none}
.wy104{all:unset;cursor:pointer;font:600 calc(8.5px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#5271FF;border:1px solid #5271FF;padding:4px 5px 3px;background:#FFFFF4}
.wy104.on{background:#5271FF;color:#fff}
.wyx104{flex:1 0 100%;background:#EEF0FA;border-left:3px solid #5271FF;padding:7px 9px;margin:2px 0 6px;font-size:calc(12.5px*var(--k));line-height:1.45}
.wyx104 p{margin:0}
.wyo104{display:inline-block;margin-top:5px;color:#5271FF;text-decoration:underline;font-weight:600;font-size:calc(12px*var(--k))}
.spx:has(.row104){display:flex!important;flex-direction:column;gap:6px}
.chx:has(.row104){display:flex!important;flex-direction:column;align-items:stretch;gap:6px}
.bwq104{cursor:pointer;position:relative}
.bwq104::after{content:'?';font:700 8px/1 var(--mono);margin-left:4px;color:#5271FF}
.bwq104.on{outline:2px solid #5271FF;outline-offset:1px}
.bwy104{background:#EEF0FA;border-left:3px solid #5271FF;padding:7px 9px;margin:4px 0 8px;font-size:calc(12.5px*var(--k));line-height:1.45}
.bwy104 p{margin:0}
.k-body104{--sb:#FF99D8;--sbg:#FFF6FB;--sh:#8A2E62}
.k-body104 iframe{display:block;width:100%;height:560px;border:0;background:transparent}
@media (min-width:900px){.k-body104 iframe{height:620px}}
/* embed mode: only the card or the full read */
.emb104 .bsn,.emb104 .bsn-sp,.emb104 #bs-prog,.emb104 .lhead,.emb104 .lhd,.emb104 #shelf,.emb104 #toolsph,.emb104 #alsoin,.emb104 .allh,.emb104 #grid>.tl,.emb104 .vlog,.emb104 .foot,.emb104 .pbar,.emb104 .sw68,.emb104 .cnav,.emb104 #fbar{display:none!important}
.emb104 body{padding-top:0!important}
.emb104 .pk104{display:none!important}
.emb104 #grid{display:block!important}
.emb104 .wrap{padding-top:4px!important}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v104 (19 Nov 2026, preview, built on v103 which stays live): Quick look / Full read labels; Why on synergies, blends, supplements and blood tests (blood tests open their why in place); supplement links go to the Supplements page; Guide body at the top of every full read; embed mode for the Guide sheet; questions.html lists every missing Why. -->\n', 1)
s = s.replace('103 versions · last updated 19 Nov 2026', '104 versions · last updated 19 Nov 2026')
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
print('built v104')
