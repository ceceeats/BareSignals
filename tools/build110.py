"""Library v110 (20 Nov 2026, live), built on v109 (kept).
1. Guide Quick look sheet (embed): the Browse block (v106+) was showing above the card; its role tags and Reset acted on a
   hidden list, so taps did nothing. Hidden in embed.
2. In the Guide sheet, swiping the card itself works: swipe left on the Quick look opens the Full read, swipe right on the
   Full read goes back to the Quick look (before: only the thin header strip took swipes, and card swipes flipped compounds)."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v109', f'{R}/v110'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
rep('.emb104 .bsn,.emb104 .bsn-sp,', '.emb104 #brw,.emb104 .bsn,.emb104 .bsn-sp,')
JS = r"""
/* v110: in the Guide sheet, card swipes switch Quick look and Full read instead of flipping compounds */
if(new URLSearchParams(location.search).get('embed')==='1'){
 step=function(d){if(!cur)return;if(d>0)location.replace('#/p/'+cur)};
 {let sx=null,sy=0;document.addEventListener('touchstart',e=>{const t=e.touches[0];if(e.touches.length!==1||$('#pagev').hidden||t.clientX<28||t.clientX>innerWidth-28||e.target.closest('table,.fbox,svg,input,textarea,.sx65,.dt-w')){sx=null;return}sx=t.clientX;sy=t.clientY},{passive:true,capture:true});
  document.addEventListener('touchend',e=>{if(sx==null)return;const p=e.changedTouches[0],dx=p.clientX-sx,dy=p.clientY-sy;sx=null;
   if(dx>70&&dx>2.2*Math.abs(dy)){const m=location.hash.match(/^#\/p\/(.+)$/);if(m){e.stopPropagation();location.replace('#/'+m[1])}}},{passive:true,capture:true});}
}
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
# the full page's own compound swipe stays off inside the sheet
rep("pv.addEventListener('touchstart',e=>{if(e.touches.length!==1||", "pv.addEventListener('touchstart',e=>{if(document.documentElement.classList.contains('emb104')||e.touches.length!==1||")
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v110 (20 Nov 2026, built on v109, kept): Browse block hidden inside the Guide Quick look sheet (its taps did nothing there); in the sheet, swipe the card left for the Full read and the Full read right for the Quick look. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
