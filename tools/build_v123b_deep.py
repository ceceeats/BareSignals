"""Library v123b (20 Nov 2026, live, built on v123, kept): every compound with a deep read gets it back.
Why: 49 compounds have a long-form deep read in deep.js (BPC-157: 3,620 words, 10 sections: origin, what is in a vial,
mechanism step by step, the full human record, safety, who produced the evidence, the law, open questions), but since the
Read more button was removed the only way in was the 'Taking it right' box of the four prescription medicines, so for every
peptide the deep read was unreachable. Now a 'The deep read' section closes every such Full read and opens in place
(the v112 rule: deep read inside the Full read, never a separate page). Reaches the Guide's Full read too (it shows this page).
Named v123b so it cannot collide with the next number the other thread uses. Script only; no data changed."""
import os, re, json, shutil
os.chdir('/home/claude/bs-guide')
d = open('library/deep.js', encoding='utf8').read()
info = {}
for m in re.finditer(r'"([a-z0-9][a-z0-9-]*)":\{"asof":"([^"]*)","sections":\[', d):
    slug = m.group(1)
    nxt = re.compile(r'\},"[a-z0-9][a-z0-9-]*":\{"asof"').search(d, m.end())
    seg = d[m.start(): nxt.start() if nxt else len(d)]
    words = len(re.sub(r'\[[0-9, ]+\]', '', seg).split())
    secs = len(re.findall(r'"h":"', seg))
    info[slug] = [round(words, -1), secs]
assert len(info) >= 45, len(info)
JS = """
<script>/* v123b: the deep read closes every Full read that has one, opening in place */
(function(){var DR=%s;
function add(){var pv=document.getElementById('pagev');if(!pv||pv.hidden)return;var m=location.hash.match(/^#\\/p\\/(.+)$/);if(!m)return;
 var s=decodeURIComponent(m[1]),x=DR[s];if(!x)return;var fp=pv.querySelector('.fp65');if(!fp||fp.querySelector('.k-deep123b'))return;
 var w=document.createElement('div');w.className='r65 rdeep123b';
 w.innerHTML='<div class="c65"><section class="s65 k-deep123b"><h2 class="t65">The deep read <small>'+x[0].toLocaleString('en')+' words · '+x[1]+' parts</small></h2>'+
 '<p class="dlead123b">Everything this page shortens, written out in full: where it came from, every human study, what is still unknown.</p>'+
 '<button type="button" class="rxdr dx112b" data-dx="'+s+'" aria-expanded="false"><span>Read the deep read</span><i class="dt" aria-hidden="true"></i></button><div class="dx112" hidden></div></section></div>';
 fp.appendChild(w)}
function attach(){var P=window.BS_DEEP||{};(window.BS_DATA||[]).forEach(function(o){if(P[o.slug])o.deepRead=P[o.slug]})}
window.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.dx112b');if(!b||b.getAttribute('aria-expanded')==='true')return;
 if(window.BS_DEEP){attach();return}
 e.preventDefault();e.stopImmediatePropagation();var sp=b.querySelector('span');if(sp)sp.textContent='Opening…';
 var t=document.createElement('script');t.src='/library/deep.js';t.onload=function(){attach();var box=b.nextElementSibling;if(box)delete box.dataset.ok;b.click()};
 t.onerror=function(){if(sp)sp.textContent='Read the deep read'};document.head.appendChild(t)},true);
var mo=new MutationObserver(function(){add()});
function start(){var pv=document.getElementById('pagev');if(pv)mo.observe(pv,{childList:true});add()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
addEventListener('hashchange',function(){setTimeout(add,0)})})();
</script>
<style>/* v123b */.k-deep123b .t65 small{font:500 calc(10.5px*var(--k,1))/1 var(--mono);letter-spacing:.06em;color:#6B76A8;margin-left:6px;text-transform:none}
.dlead123b{margin:6px 0 0;font-size:calc(14.5px*var(--k,1));line-height:1.5}</style>
""" % json.dumps(info, separators=(',', ':'))
src, dst = 'library/v123', 'library/v123b'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
p = f'{dst}/index.html'
s = open(p, encoding='utf8').read()
assert '</body>' in s
s = s.replace('</body>', JS + '</body>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v123b (20 Nov 2026, built on v123, kept): the deep read is back on every Full read that has one (49 compounds; BPC-157 3,620 words), opening in place at the end of the page. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
shutil.copy(p, 'library/index.html')
print('ok', len(info))
