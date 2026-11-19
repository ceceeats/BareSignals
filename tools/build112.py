"""Library v112 (20 Nov 2026, live), built on v111 (kept).
1. Deep read opens inside the Full read: 'Read the deep read' now expands in place under Taking it right (tap again to fold).
   Old #/d/ links land on the Full read with the deep read already open. The Full read is now the full thing.
2. A Why on every 'Mixing it with' row and every 'Taking it right' step for the four medicines (rxw.js), in the same
   tap-to-open style as What it does."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v111', f'{R}/v112'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
shutil.copy(f'{R}/rxw.js', f'{DST}/rxw.js')
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
rep('<script src="rx.js"></script>', '<script src="rx.js"></script><script src="rxw.js"></script>')
# Why on interaction rows
rep("return `<li>${rxTag(x[2])}<div><b>${ln}</b><span>${esc(x[3])}${x[5]?` <em class=\"rxc\">${RXC[x[5]]||''}</em>`:''}</span></div></li>`}",
    "const W=((window.BS_RXW||{})[o.slug]||{}).ix,wy=W&&W[R.ix.indexOf(x)];return `<li>${rxTag(x[2])}<div><b>${ln}</b><span>${esc(x[3])}${x[5]?` <em class=\"rxc\">${RXC[x[5]]||''}</em>`:''}${wy?`<details class=\"why\"><summary>Why</summary><span>${esc(wy)}</span></details>`:''}</span></div></li>`}")
# Why on take steps + deep read in place
rep("`<ol class=\"rxs\">${R.take.map(t=>`<li><span><b>${esc(t[0])}.</b> ${esc(t[1])}</span></li>`).join('')}</ol>${(window.BS_DEEP||{})[o.slug]||o.hasDeep?`<a class=\"rxdr\" href=\"#/d/${o.slug}\">Read the deep read →</a>`:''}`",
    "`<ol class=\"rxs\">${R.take.map((t,i)=>{const W=((window.BS_RXW||{})[o.slug]||{}).take,wy=W&&W[i];return `<li><span><b>${esc(t[0])}.</b> ${esc(t[1])}${wy?`<details class=\"why\"><summary>Why</summary><span>${esc(wy)}</span></details>`:''}</span></li>`}).join('')}</ol>${(window.BS_DEEP||{})[o.slug]||o.hasDeep?`<button type=\"button\" class=\"rxdr dx112b\" data-dx=\"${o.slug}\" aria-expanded=\"false\"><span>Read the deep read</span><i class=\"dt\" aria-hidden=\"true\"></i></button><div class=\"dx112\" hidden></div>`:''}`")
JS = r"""
/* v112: the deep read opens inside the Full read */
let OPEN112=null;
function dx112(b,force){const box=b.nextElementSibling;if(!box||!box.classList.contains('dx112'))return;const o=BYS0(b.dataset.dx);if(!o)return;
  const on=force===true?true:box.hidden;
  if(on&&!box.dataset.ok){const t=document.createElement('div');t.innerHTML=deepHTML(o);const a=t.querySelector('.dart');if(a){const h=a.querySelector('.dhd');if(h)h.remove();box.innerHTML=a.innerHTML}box.dataset.ok=1}
  box.hidden=!on;b.setAttribute('aria-expanded',on?'true':'false');b.querySelector('span').textContent=on?'Fold the deep read':'Read the deep read';
  if(on&&force===true){const r=b.getBoundingClientRect();scrollTo({top:scrollY+r.top-10-(typeof topOff==='function'?topOff():0),behavior:'auto'})}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.dx112b');if(b){e.preventDefault();dx112(b);return}
  const a=e.target.closest&&e.target.closest('a[href^="#/d/"]');if(a){e.preventDefault();OPEN112=a.getAttribute('href').slice(4);location.hash='#/p/'+OPEN112}},true);
function chk112(){const m=location.hash.match(/^#\/d\/([a-z0-9-]+)/);if(m){OPEN112=m[1];location.replace('#/p/'+m[1]);return}
  if(OPEN112&&location.hash==='#/p/'+OPEN112){const sl=OPEN112;OPEN112=null;setTimeout(()=>{const b=document.querySelector(`#pagev .dx112b[data-dx="${sl}"]`);if(b)dx112(b,true)},350)}}
addEventListener('hashchange',chk112);addEventListener('load',()=>setTimeout(chk112,50));
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
CSS = """
/* v112: deep read in place + whys */
.rxdr.dx112b{width:100%!important;text-decoration:none!important;display:flex!important}
.dx112b{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:10px;margin:10px 0 0;padding:9px 12px;border:1.5px solid #3E4A80;background:#FFFFF4;color:#3E4A80;font:600 calc(11px*var(--k))/1.2 var(--mono);letter-spacing:.08em;text-transform:uppercase}
.dx112b .dt{margin-left:auto;flex:none;width:18px;height:18px;border:1.5px solid #3E4A80;border-radius:50%;position:relative}
.dx112b .dt::before,.dx112b .dt::after{content:'';position:absolute;left:50%;top:50%;width:8px;height:1.5px;background:#3E4A80;transform:translate(-50%,-50%)}
.dx112b .dt::after{transform:translate(-50%,-50%) rotate(90deg)}
.dx112b[aria-expanded=true]{background:#3E4A80;color:#fff}.dx112b[aria-expanded=true] .dt{border-color:#fff}
.dx112b[aria-expanded=true] .dt::before{background:#fff}.dx112b[aria-expanded=true] .dt::after{display:none}
.dx112{border:1.5px solid #3E4A80;border-top:0;padding:4px 12px 10px;background:#FFFFF4}
.dx112 .dsec{margin:12px 0 0}.dx112 .dsec h2{font-size:calc(16px*var(--k));margin:0 0 6px}
.rxl .why,.rxs .why{display:block;margin:4px 0 0}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v112 (20 Nov 2026, built on v111, kept): the deep read opens in place inside the Full read (old #/d/ links land there, open); a Why on every Mixing it with row and Taking it right step for the four medicines (rxw.js). -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
