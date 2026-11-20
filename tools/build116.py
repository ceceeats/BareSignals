"""Library v116 (20 Nov 2026, live), built on v115 (kept), plus toolbar v3 on Supplements v29, Cases index v19, Goals index v11.
1. A Peptides tab joins the row: All | Peptides | Supplements | Cases | Goals. All is everything; Peptides (/library/?pep)
   is the peptide list only: no Supplement, Case or Goal shelves, list or search rows. On phone the tab icons hide so all
   five fit.
2. Supplements opens straight on its toolbar and Foundations: the intro line, the 'Reference, not a prescription' box and
   the Try row are gone. Cases and Goals drop their intro line too.
3. Case and Goal list rows are smaller, closer to the peptide list."""
import os, shutil, re
REPO = '/home/claude/baresignals'
R = f'{REPO}/library'
SRC, DST = f'{R}/v115', f'{R}/v116'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
VIAL = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6.5 1.5h5M7.5 1.5v3.5L4.5 15a1.5 1.5 0 0 0 1.4 1.5h6.2A1.5 1.5 0 0 0 13.5 15L10.5 5V1.5M5.8 11h6.4"/></svg>'
rep('<span>All</span></a><a href="/supplements/">', f'<span>All</span></a><a href="/library/?pep" id="tpep">{VIAL}<span>Peptides</span></a><a href="/supplements/">')
JS = r"""
/* v116: Peptides tab = the peptide list only */
const PEP116=/[?&]pep\b/.test(location.search);
if(PEP116){document.documentElement.classList.add('pep116');addEventListener('DOMContentLoaded',()=>{const a=document.querySelector('.lsw a[aria-current]');if(a)a.removeAttribute('aria-current');const p=document.getElementById('tpep');if(p)p.setAttribute('aria-current','page');const q=document.getElementById('q');if(q)q.setAttribute('aria-label','Search peptides')})}
{const _o=others114;others114=function(){return PEP116?{sup:[],cas:[],goa:[]}:_o.apply(this,arguments)}}
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
CSS = """
/* v116: five tabs; Peptides-only view */
.pep116 #shelf,.pep116 #ar114{display:none!important}
@media (max-width:520px){.lsw a svg{display:none}.lsw a{padding:9px 2px;font-size:9.5px;letter-spacing:.03em;flex:1 1 auto;min-width:0}}
"""
rep("q.placeholder='Try “'+W[wi%W.length]+'”'","q.placeholder=(/[?&]pep\\b/.test(location.search)?'Search peptides':'Search everything')")
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v116 (20 Nov 2026, built on v115, kept): Peptides tab (All | Peptides | Supplements | Cases | Goals); /library/?pep shows peptides only; tab icons hide on phone so five fit. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')

# toolbar v3
b = open(f'{REPO}/libbar/v2.js', encoding='utf8').read()
b = b.replace('/* Library toolbar v2 (20 Nov 2026, built on v1, kept)', '/* Library toolbar v3 (20 Nov 2026, built on v2, kept): adds the Peptides tab to the row; Supplements opens straight on the toolbar (intro, caution box and Try row hidden); Cases and Goals intro line hidden; smaller Case and Goal rows. v2: Library toolbar v2 (20 Nov 2026, built on v1, kept)', 1)
b = b.replace(".lb1hit{display:none!important}", ".lb1hit{display:none!important}.lede,.caution,.rowx,.lead{display:none!important}.lv1 .rows li a{padding:6px 0;gap:1px}.lv1 .rows li .n b{font-weight:600;font-size:14px}.lv1 .rows li .l{font-size:12px;line-height:1.3}@media (max-width:520px){.lsw a svg{display:none}.lsw a{padding:9px 2px;font-size:9.5px;letter-spacing:.03em;flex:1 1 auto;min-width:0}}", 1)
b = b.replace("  function init(){", "  function tabs(){var n=document.querySelector('.lsw');if(!n||n.querySelector('[href=\"/library/?pep\"]'))return;var a=n.querySelector('a');if(!a)return;a.insertAdjacentHTML('afterend','<a href=\"/library/?pep\">" + VIAL.replace('"', '\\"') + "<span>Peptides</span></a>')}\n  function init(){tabs();", 1)
open(f'{REPO}/libbar/v3.js', 'w', encoding='utf8').write(b)
def bump(src_dir, dst_dir, note, live):
    os.makedirs(dst_dir, exist_ok=True)
    for f in os.listdir(src_dir):
        if os.path.isfile(f'{src_dir}/{f}'): shutil.copy(f'{src_dir}/{f}', f'{dst_dir}/{f}')
    p = f'{dst_dir}/index.html'
    t = open(p, encoding='utf8').read().replace('/libbar/v2.js', '/libbar/v3.js').replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    open(p, 'w', encoding='utf8').write(t)
    if live: open(live, 'w', encoding='utf8').write(t)
os.chdir(REPO)
bump('supplements/v28', 'supplements/v29', 'Supplements v29 (20 Nov 2026, built on v28, kept): toolbar v3 (Peptides tab; opens straight on the toolbar and Foundations)', None)
st = open('supplements/redirect-stub.html', encoding='utf8').read(); open('supplements/redirect-stub.html', 'w', encoding='utf8').write(st.replace('v28/', 'v29/'))
bump('library/goals/v18', 'library/goals/v19', 'Cases index v19 (20 Nov 2026, built on v18, kept): toolbar v3 (Peptides tab, no intro line, smaller rows)', 'library/goals/index.html')
bump('library/aims/v10', 'library/aims/v11', 'Goals index v11 (20 Nov 2026, built on v10, kept): toolbar v3 (Peptides tab, no intro line, smaller rows)', 'library/aims/index.html')
print('ok')
