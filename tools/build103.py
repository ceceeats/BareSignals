"""19 Nov 2026 night pass.
Library v103 (built on v102, kept): shelf peptide tiles open the Library's own card (not the lighter drawer); first section tab reads All.
Drawer v1.2 (v1.1 kept at /drawer/v1.1.js): its Open full page link no longer gets caught by its own link catcher (it reopened the drawer instead of going to the full page); Once mixed line added from mix.js.
Supplements v26, Cases index v15, Goals index v8: first tab reads All. Old versions kept."""
import os, shutil, re
R = '/home/claude/baresignals'
TAB_OLD = '<span>Peptides</span></a>'
TAB_NEW = '<span>All</span></a>'

# ---- Library v103
src, dst = f'{R}/library/v102', f'{R}/library/v103'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
s = open(f'{dst}/index.html', encoding='utf8').read()
assert s.count(TAB_OLD) == 1
s = s.replace(TAB_OLD, TAB_NEW)
old = "const o=BYS0(t.dataset.s);if(window.BSDRAWER_OPEN)window.BSDRAWER_OPEN(t.dataset.s,o?o.name:t.dataset.s);return}"
assert old in s
s = s.replace(old, "location.hash='#/'+t.dataset.s;return}")
old2 = "const TT=document.querySelectorAll(`.tl[data-s=\"${cur}\"]`),t=TT[curN]||TT[0];"
assert old2 in s, 'placeCard'
s = s.replace(old2, "const TG=document.querySelectorAll(`#grid .tl[data-s=\"${cur}\"]`),TT=TG.length?TG:document.querySelectorAll(`.tl[data-s=\"${cur}\"]`),t=TT[curN]||TT[0];")
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v103 (19 Nov 2026, built on v102, v102 kept): tapping a peptide on the top shelf opens the full Library card (structure, dose cells, Once mixed, What it does) instead of the lighter drawer, so the card and its Full page button are the same everywhere in the Library. First section tab reads All (then Supplements, Cases, Goals). -->\n', 1)
s = s.replace('102 versions · last updated 19 Nov 2026', '103 versions · last updated 19 Nov 2026')
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)

# ---- Drawer v1.2
os.makedirs(f'{R}/drawer', exist_ok=True)
d = open(f'{R}/drawer.js', encoding='utf8').read()
if not os.path.exists(f'{R}/drawer/v1.1.js'): open(f'{R}/drawer/v1.1.js', 'w', encoding='utf8').write(d)
d = d.replace("var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;",
              "var a=e.target.closest&&e.target.closest('a[href]');if(!a||a.closest('.bsx'))return;", 1)
assert "a.closest('.bsx')" in d
d = d.replace("['data.js','card.js','punch.js']", "['data.js','card.js','punch.js','mix.js']", 1)
# Once mixed line under the dose box
d = d.replace("}).join('')+'</div>';\n var ds=o.desc", "}).join('')+'</div><!--mx-->';\n var ds=o.desc", 1)
assert '<!--mx-->' in d
d = d.replace("body.innerHTML=h;ft.innerHTML=", "var mx=(W.BS_MIX||{})[o.slug];if(mx&&mx.d)h=h.replace('<!--mx-->','<p style=\"font-size:13px;margin:-6px 0 12px\"><b style=\"font:500 9px/1 JetBrains Mono,monospace;letter-spacing:.08em;text-transform:uppercase;color:#6B76A8\">Once mixed</b> '+esc(mx.d)+'</p>');body.innerHTML=h;ft.innerHTML=", 1)
open(f'{R}/drawer.js', 'w', encoding='utf8').write('/* Bare Signals drawer v1.2 (19 Nov 2026): Open full page now goes to the full page (the drawer was catching its own link and reopening itself); Once mixed line from mix.js. v1.1 kept at /drawer/v1.1.js. */\n' + d)

# ---- Supplements v26
src, dst = f'{R}/supplements/v25', f'{R}/supplements/v26'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
s = open(f'{dst}/index.html', encoding='utf8').read(); assert s.count(TAB_OLD) == 1
s = s.replace(TAB_OLD, TAB_NEW).replace('<!doctype html>', '<!doctype html>\n<!-- Supplements v26 (19 Nov 2026, v25 kept): first section tab reads All. -->', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)
ix = open(f'{R}/supplements/index.html', encoding='utf8').read().replace("v25/", "v26/")
open(f'{R}/supplements/index.html', 'w', encoding='utf8').write(ix)

# ---- Cases index v15 and Goals index v8 (root files are the live page; keep copies)
for path, old_v, new_v, label in [(f'{R}/library/goals', 'v14', 'v15', 'Cases index'), (f'{R}/library/aims', 'v7', 'v8', 'Goals index')]:
    s = open(f'{path}/index.html', encoding='utf8').read()
    keep = f'{path}/{old_v}'
    if not os.path.exists(keep): os.makedirs(keep); open(f'{keep}/index.html', 'w', encoding='utf8').write(s)
    assert s.count(TAB_OLD) == 1
    s = s.replace(TAB_OLD, TAB_NEW).replace('<!doctype html>', f'<!doctype html>\n<!-- {label} {new_v} (19 Nov 2026): first section tab reads All. {old_v} kept at {keep.replace(R,"")}/. -->', 1)
    open(f'{path}/index.html', 'w', encoding='utf8').write(s)
print('ok')
