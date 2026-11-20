"""Library v123d (20 Nov 2026, built on the newest Library version, kept): BPC-157's Full read gets 'How it works, animated'
(torn tendon > BPC-157 arrives > new vessels > repair cells > collagen lines up > the honest In people card, each step tagged with
where its evidence comes from). One engine for every peptide: /library/anim.js, stories as data (BSAnim.STORIES[slug]); a peptide
without a story shows nothing. Loads only when a Full read with a story opens. Script only; no compound facts changed."""
import os, sys, shutil
os.chdir('/home/claude/bs-guide')
src = sys.argv[1]; dst = 'library/v123d'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
shutil.copy('/home/claude/build/anim/peptide-anim.js', f'{dst}/anim.js')
JS = """
<script>/* v123d: How it works, animated, inside the Full read (engine /library/anim.js, stories as data) */
(function(){var HAS={'bpc-157':'torn tendon'},busy=0;
function add(){var pv=document.getElementById('pagev');if(!pv||pv.hidden)return;var m=location.hash.match(/^#\\/p\\/(.+)$/);if(!m)return;
 var s=decodeURIComponent(m[1]);if(!HAS[s])return;var fp=pv.querySelector('.fp65');if(!fp||fp.querySelector('.k-anim123d'))return;
 var w=document.createElement('div');w.className='r65 ranim123d';
 w.innerHTML='<div class="c65"><section class="s65 k-anim123d"><h2 class="t65">How it works, animated <small>'+HAS[s]+'</small></h2>'+
 '<p class="alead123d">What rat and cell studies suggest happens, one step at a time. Each step shows where its evidence comes from.</p><div class="anim123d"></div></section></div>';
 var r3=fp.querySelector('.r65.r3');if(r3)fp.insertBefore(w,r3);else fp.appendChild(w);
 var box=w.querySelector('.anim123d');
 function go(){try{window.BSAnim.mount(box,s)}catch(e){w.remove()}}
 if(window.BSAnim)go();else{if(busy)return;busy=1;var t=document.createElement('script');t.src='/library/anim.js';t.onload=function(){busy=0;go()};t.onerror=function(){busy=0;w.remove()};document.head.appendChild(t)}}
var mo=new MutationObserver(function(){add()});
function start(){var pv=document.getElementById('pagev');if(pv)mo.observe(pv,{childList:true});add()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
addEventListener('hashchange',function(){setTimeout(add,0)})})();
</script>
<style>/* v123d */.k-anim123d .t65 small{font:500 calc(10.5px*var(--k,1))/1 var(--mono);letter-spacing:.06em;color:#6B76A8;margin-left:6px;text-transform:none}
.alead123d{margin:6px 0 8px;font-size:calc(14.5px*var(--k,1));line-height:1.5}.ranim123d .c65{max-width:none}</style>
"""
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
s = s.replace('</body>', JS + '</body>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v123d (20 Nov 2026, built on %s, kept): BPC-157 Full read gets How it works, animated (one engine /library/anim.js, stories as data). -->\n' % src.split('/')[-1], 1)
open(p, 'w', encoding='utf8').write(s)
shutil.copy(p, 'library/index.html'); shutil.copy(f'{dst}/anim.js', 'library/anim.js')
print('ok')
