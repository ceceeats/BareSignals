"""Library v123f (20 Nov 2026, built on v123e, kept). Full read follows the questions people ask, in that order:
how does it work (animation, then Where it acts) > what it does > what people report > the studies > dose > who shouldn't >
what it pairs with > blood work > body > still tested > origin > Cases > deep read. Cases moved from the top to near the end.
Synergies, In blends and Supplements sit two to a row (an open Why spans the full row) to halve their height.
Read more: sections with a matching part of the deep read (mechanism, human record, safety, origin, law, open questions,
what is in a vial, the body) get a Read more tap that opens that part in place, with its numbered sources.
Key takeaway, new shape where written (kt.js; BPC-157 first): What it is for / How it works / In people / The catch, with the
legal status as one quiet line whose full text sits behind Why. Compounds without a kt.js entry keep the old takeaway.
Script and one patch file (kt.js); no numbers changed."""
import os, shutil, json
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src, dst = 'library/v123e', 'library/v123f'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)

KT = {
 'bpc-157': {
  'for': 'Tendon, ligament and gut injuries that heal slowly. People take it to speed the repair up.',
  'how': 'It calls new blood vessels into the injury, so repair cells and building material can reach it. Seen in rats and cells; no receptor has been found.',
  'people': 'The one controlled trial (gut, 2005) did not beat placebo. Three small studies with no control group followed, all from one Florida clinic doctor; best result 14 of 16 said knee pain eased.',
  'catch': 'Almost all the proof is in rats. No immune safety tests exist, and the FDA found vial certificates without endotoxin testing.',
  'status': [['FDA', 'not approved, compounding decision pending'], ['WADA', 'banned in sport']],
 }
}
open(f'{dst}/kt.js', 'w', encoding='utf8').write('/* Bare Signals key takeaways, new shape (v123f). One entry per compound, written in signal style. */\nwindow.BS_KT=' + json.dumps(KT, ensure_ascii=False, indent=0) + ';\n')

JS = r"""
<script src="/library/kt.js"></script>
<script>/* v123f: question order, two-up pair lists, Read more from the deep read, new key takeaway */
(function(){
var ORD=['fp57','k-anim123d','k-body104','k-does','k-rep','k-stu','k-dose','k-who','k-syn','k-inb','k-sup','k-bw','k-pk','k-tst','k-org','bsgo','k-deep123b'];
var RM={'k-anim123d':/^(Mechanism|The selectivity|What a seven-residue)/i,'k-does':/^Mechanism/i,'k-stu':/(human record|^Two trials|^The one direct test|^Who produced the evidence|pivotal trial|head-to-head|^The other three trials|^What the animal studies)/i,
 'k-who':/^(Safety|Tolerability)/i,'k-org':/^(Where it came from|Who is developing|Where the law stands|Where approval stands|What was actually nominated)/i,
 'k-tst':/^(Open questions|Where the law stands, and open)/i,'k-dose':/(actually in a vial|in the bottle|in the ampoule|certificates do and do not|^Product reality)/i,'k-pk':/^(What the body does with it|The one human pharmacokinetic)/i};
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function slug(){var m=location.hash.match(/^#\/p\/(.+)$/);return m?decodeURIComponent(m[1]):''}
function order(fp){
 fp.querySelectorAll('[data-o123f]').forEach(function(e){e.style.order='';e.removeAttribute('data-o123f')});
 ORD.forEach(function(k,i){var el=fp.querySelector(k==='fp57'?'.fp57':k==='bsgo'?'.bsgo':'.'+k);if(!el)return;
  for(var e=el;e&&e!==fp;e=e.parentElement){var cur=e.hasAttribute('data-o123f')?+e.getAttribute('data-o123f'):99;if(i<cur){e.style.order=i;e.setAttribute('data-o123f',i)}}});
 fp.querySelectorAll('.r65, .bsgo').forEach(function(e){if(!e.hasAttribute('data-o123f')){e.style.order=30;e.setAttribute('data-o123f',30)}});
}
function readMore(fp,s){
 var D=window.BS_DEEP&&window.BS_DEEP[s];
 Object.keys(RM).forEach(function(k){if(k==='k-does'&&fp.querySelector('.k-anim123d'))return;var sec=fp.querySelector('.'+k);if(!sec||sec.querySelector('.rm123f'))return;
  var parts=D?D.sections.filter(function(x){return RM[k].test(x.h)}):null;if(D&&!parts.length)return;
  if(!D&&!window.DR123F_HAS)return;if(!D&&!(window.DR123F_HAS[s]||[]).some(function(h){return RM[k].test(h)}))return;
  var w=document.createElement('div');w.className='rm123f';
  w.innerHTML='<button type="button" class="rmb123f" aria-expanded="false">Read more</button><div class="rmx123f" hidden></div>';
  (sec.querySelector('.b65')||sec).appendChild(w)});
}
function openRM(b){var s=slug(),sec=b.closest('.s65'),k=(sec.className.match(/k-[a-z0-9]+/)||[])[0],box=b.nextElementSibling;
 if(b.getAttribute('aria-expanded')==='true'){b.setAttribute('aria-expanded','false');b.textContent='Read more';box.hidden=true;return}
 function show(){var D=window.BS_DEEP[s];if(!D)return;var parts=D.sections.filter(function(x){return RM[k].test(x.h)}),used={};
  var h=parts.map(function(x){return '<h3>'+esc(x.h)+'</h3>'+x.body.map(function(p){return '<p>'+esc(p).replace(/\[(\d+(?:, ?\d+)*)\]/g,function(_,n){return '<sup>'+n.split(/, ?/).map(function(i){used[i]=1;return '<a href="#rf123f-'+i+'">'+i+'</a>'}).join(',')+'</sup>'})+'</p>'}).join('')}).join('');
  var refs=(D.refs||[]).filter(function(r){return used[r.n]});
  if(refs.length)h+='<ol class="rf123f">'+refs.map(function(r){return '<li value="'+r.n+'"><a href="'+esc(r.url)+'" target="_blank" rel="noopener noreferrer">'+esc(r.t)+'</a> '+(r.year||'')+'</li>'}).join('')+'</ol>';
  box.innerHTML=h;box.hidden=false;b.setAttribute('aria-expanded','true');b.textContent='Show less'}
 if(window.BS_DEEP)show();else{b.textContent='Opening…';var t=document.createElement('script');t.src='/library/deep.js';t.onload=show;document.head.appendChild(t)}}
function kt(fp,s){var K=window.BS_KT&&window.BS_KT[s],old=fp.querySelector('.kt');if(!K||!old||old.classList.contains('kt123f'))return;
 var legal=old.querySelector('.kr dd');legal=legal?legal.innerHTML:'';
 var row=function(t,v){return '<dl class="kr"><dt>'+t+'</dt><dd>'+esc(v)+'</dd></dl>'};
 old.className='kt kt123f';
 old.innerHTML='<p class="ktt">Key takeaway</p><div class="kt2"><div class="kc">'+row('What it is for',K['for'])+row('How it works',K.how)+'</div><div class="kc">'+row('In people',K.people)+row('The catch',K['catch'])+'</div></div>'+
  '<div class="kst123f"><span class="kstl">Status</span>'+K.status.map(function(x){return '<span class="kss'+(x[0]==='FDA'?' fda123f':'')+'"><b>'+esc(x[0])+'</b> '+esc(x[1])+'</span>'}).join('')+
  (legal?'<button type="button" class="wy104 kswy" aria-expanded="false">Why</button><div class="kslx" hidden><p>'+legal+'</p></div>':'')+'</div>'}
function run(){var pv=document.getElementById('pagev');if(!pv||pv.hidden)return;var fp=pv.querySelector('.fp65');if(!fp)return;var s=slug();
 order(fp);readMore(fp,s);kt(fp,s);fp.classList.add('flow123f')}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.rmb123f');if(b){e.preventDefault();openRM(b);return}
 var k=e.target.closest&&e.target.closest('.kswy');if(k){var x=k.nextElementSibling,o=k.getAttribute('aria-expanded')==='true';k.setAttribute('aria-expanded',o?'false':'true');x.hidden=o}});
var mo=new MutationObserver(function(){clearTimeout(run.t);run.t=setTimeout(run,30)});
function start(){var pv=document.getElementById('pagev');if(pv)mo.observe(pv,{childList:true,subtree:true});run()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
addEventListener('hashchange',function(){setTimeout(run,0)})})();
</script>
<style>/* v123f */
.fp65.flow123f{display:flex!important;flex-direction:column}
@media(max-width:999.98px){
.flow123f .sx65,.flow123f .k-inb .chx,.flow123f .k-sup .spx{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px!important;align-items:start}
.flow123f .sx65>.sxi:has([aria-expanded=true]),.flow123f .k-inb .chx>.row104:has([aria-expanded=true]),.flow123f .k-sup .spx>.row104:has([aria-expanded=true]){grid-column:1/-1}
.flow123f .sx65>.sxi,.flow123f .k-inb .row104,.flow123f .k-sup .row104{margin:0!important;min-width:0}
.flow123f .sxc span,.flow123f .k-inb .row104 a span,.flow123f .k-sup .row104 b{font-size:calc(12.5px*var(--k,1))!important;line-height:1.25}
.flow123f .k-sup .row104 small{font-size:calc(9px*var(--k,1))!important}
}
.flow123f .ranim123d{display:block!important}.flow123f .k-anim123d{max-width:none}
.rm123f{margin-top:8px}
.rmb123f{all:unset;cursor:pointer;display:block;width:100%;box-sizing:border-box;text-align:right;font:600 calc(10px*var(--k,1))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#5271FF;padding:6px 0;border-top:1px dashed #C9C6A6}
.rmb123f::after{content:" ▾"}.rmb123f[aria-expanded=true]::after{content:" ▴"}
.rmx123f{padding:4px 0 2px;font-size:calc(14px*var(--k,1));line-height:1.55}
.rmx123f h3{margin:10px 0 4px;font:600 calc(11px*var(--k,1))/1.3 var(--mono);letter-spacing:.06em;text-transform:uppercase}
.rmx123f p{margin:0 0 8px}.rmx123f sup a{color:#5271FF;text-decoration:none;font-size:.75em;margin-left:1px}
.rf123f{margin:6px 0 0;padding-left:20px;font-size:calc(12px*var(--k,1));color:#6B76A8}.rf123f a{color:inherit}
.kst123f{display:flex;flex-wrap:wrap;align-items:center;gap:5px 6px;margin-top:8px;padding-top:7px;border-top:1px solid #E3E0BF;font-size:calc(12px*var(--k,1));color:#6B76A8}
.kstl{font:600 calc(9.5px*var(--k,1))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase}
.kss{border:1px solid #C9C6A6;padding:2px 6px;background:#FFFFF4}.kss b{font-weight:600}
.kss.fda123f{color:#C62828;border-color:#C62828;background:#FDECEC}
.kst123f .kswy{margin-left:auto}.kslx{flex-basis:100%;font-size:calc(13px*var(--k,1));line-height:1.5;color:#3E4A80}.kslx p{margin:4px 0 0}
</style>
"""
# which deep-read headings each compound has, so Read more only appears where there is something to read
import re
d = open('library/deep.js', encoding='utf8').read()
has = {}
for m in re.finditer(r'"([a-z0-9][a-z0-9-]*)":\{"asof":"[^"]*","sections":\[', d):
    nxt = re.compile(r'\},"[a-z0-9][a-z0-9-]*":\{"asof"').search(d, m.end())
    seg = d[m.start(): nxt.start() if nxt else len(d)]
    has[m.group(1)] = [h.replace('\\"', '"') for h in re.findall(r'"h":"((?:[^"\\]|\\.)*)"', seg)]
JS = JS.replace('<script>/* v123f', '<script>window.DR123F_HAS=' + json.dumps(has, ensure_ascii=False, separators=(',', ':')) + ';</script>\n<script>/* v123f', 1)
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
s = s.replace('</body>', JS + '</body>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v123f (20 Nov 2026, built on v123e, kept): Full read in question order (how it works first, Cases near the end); Synergies, In blends, Supplements two to a row; Read more opens the matching deep-read part in place; new key takeaway shape (What it is for / How it works / In people / The catch, status as a quiet line) for BPC-157 first. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
shutil.copy(p, 'library/index.html'); shutil.copy(f'{dst}/kt.js', 'library/kt.js')
print('ok', len(has))
