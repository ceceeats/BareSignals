"""Library v118 (20 Nov 2026, live), built on v117 (kept; v117 was another session's supplement-link fix), and toolbar v4 on Supplements v30, Cases index v20, Goals index v12.
One toolbar, same on every tab: tab row 28px tall on phone; search box, cards|list and sort exactly 44px, same font
(16px Hanken Grotesk), same gap under the tabs (20px); the count inside the search box hides on phone everywhere; on
laptop the bar on Supplements, Cases and Goals is as wide as the Library's left column."""
import os, shutil
REPO = '/home/claude/baresignals'
R = f'{REPO}/library'
SRC, DST = f'{R}/v117', f'{R}/v118'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
CSS = """
/* v118: one toolbar on every tab */
@media (max-width:520px){.lsw a{height:28px;box-sizing:border-box;padding-top:0!important;padding-bottom:0!important}}
.trow #q{font:500 16px/1.2 "Hanken Grotesk",system-ui,sans-serif!important;padding-left:12px!important}
@media (min-width:900px){.trow #q{font-size:15px!important}}
@media (max-width:899px){.trow #q{padding-right:12px!important}}
.trow #q::placeholder{color:#6B76A8;opacity:1}
"""
s = s.replace('</style>', CSS + '</style>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v118 (20 Nov 2026, built on v117, kept): one toolbar on every tab (28px tabs on phone, 44px controls, 16px search text, same gaps). -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
b = open(f'{REPO}/libbar/v3.js', encoding='utf8').read()
b = b.replace('/* Library toolbar v3 (20 Nov 2026, built on v2, kept)', '/* Library toolbar v4 (20 Nov 2026, built on v3, kept): same sizes as the Library on every tab (28px tabs on phone, 44px controls, 16px search text, 20px under the tabs, count hidden on phone, Library-column width on laptop). v3: Library toolbar v3 (20 Nov 2026, built on v2, kept)', 1)
b = b.replace(".lb1hit{display:none!important}", ".lb1hit{display:none!important}.lb1 #ph{display:none!important}.lb1 #q::placeholder,.lb1 .q1::placeholder{color:#6B76A8;opacity:1}@media (max-width:899px){.lb1 #q{padding-right:12px!important}}.seg1{height:44px;box-sizing:border-box;overflow:hidden}.seg1 .ib1{height:41px}.lb1 .q1,.lb1 #q{font:500 16px/1.2 Hanken Grotesk,system-ui,sans-serif!important;padding-left:12px!important;color:#3E4A80}@media (min-width:900px){.lb1 .q1,.lb1 #q{font-size:15px!important}.lb1{max-width:calc((100% - 28px)*.574)}}@media (max-width:899px){.lb1 #count{display:none}}@media (max-width:520px){.lsw a{height:28px;box-sizing:border-box;padding-top:0!important;padding-bottom:0!important}}", 1)
b = b.replace("    setV(LV?'list':'grid')}", "    setV(LV?'list':'grid');gap()}\n  function gap(){var t=document.querySelector('.lsw'),x=document.querySelector('.lb1');if(!t||!x)return;var qq=x.querySelector('#q,.q1')||x;var d=qq.getBoundingClientRect().top-t.getBoundingClientRect().bottom;var m=parseFloat(getComputedStyle(x).marginTop)||0;x.style.marginTop=(m+(innerWidth>=900?22:20)-d)+'px'}\n  addEventListener('resize',function(){var x=document.querySelector('.lb1');if(x){x.style.marginTop='';gap()}});", 1)
b = b.replace("var vw=document.getElementById('view');", "var qq0=document.getElementById('q');if(qq0)qq0.placeholder='Search supplements';var vw=document.getElementById('view');", 1)
open(f'{REPO}/libbar/v4.js', 'w', encoding='utf8').write(b)
os.chdir(REPO)
def bump(src_dir, dst_dir, note, live):
    os.makedirs(dst_dir, exist_ok=True)
    for f in os.listdir(src_dir):
        if os.path.isfile(f'{src_dir}/{f}'): shutil.copy(f'{src_dir}/{f}', f'{dst_dir}/{f}')
    p = f'{dst_dir}/index.html'
    t = open(p, encoding='utf8').read().replace('/libbar/v3.js', '/libbar/v4.js').replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    open(p, 'w', encoding='utf8').write(t)
    if live: open(live, 'w', encoding='utf8').write(t)
bump('supplements/v29', 'supplements/v30', 'Supplements v30 (20 Nov 2026, built on v29, kept): toolbar v4 (same sizes as the Library)', None)
st = open('supplements/redirect-stub.html', encoding='utf8').read(); open('supplements/redirect-stub.html', 'w', encoding='utf8').write(st.replace('v29/', 'v30/'))
bump('library/goals/v19', 'library/goals/v20', 'Cases index v20 (20 Nov 2026, built on v19, kept): toolbar v4 (same sizes as the Library)', 'library/goals/index.html')
bump('library/aims/v11', 'library/aims/v12', 'Goals index v12 (20 Nov 2026, built on v11, kept): toolbar v4 (same sizes as the Library)', 'library/aims/index.html')
print('ok')
