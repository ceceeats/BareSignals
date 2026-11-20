"""No jump on load. Also: each page's text-size fallback (used before nav.js runs) read retired keys bs-text / bs-text-w with a
1.15 default; nav v16+ uses bs-text2 / bs-text2-w with default m (1.0), so pages painted big and shrank. Now they match.
 (20 Nov 2026, messy-visitor QA): the site bar (nav.js, loaded with defer) inserts its 49px (phone) /
51px (laptop) spacer after the page has already painted, and the page width padding (--bs-pad 16px -> 24px on laptop) changed when it ran, so every page slid and reflowed once on load (layout shift 0.2 to 0.76
on laptop; 0.06 to 0.33 on a throttled phone). Each page now reserves that height in its head until the spacer exists
(body::before, removed by :has() as soon as nav.js adds .bsn-sp). Layout only; no wording or data touched.
New versions: Library v123c (root + same CSS in the v122 preview), Supplements v34, Dosage v34, Blood v31, Protocol v42,
Cases index v24, Goals index v16.
Old versions kept. Run tools/publish_live.py and tools/versions_page.py afterwards."""
import os, re, shutil
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MARK = 'bsn-res'
CSS = ('<style id="bsn-res">/* reserve the site bar height until nav.js adds its spacer, so the page does not jump on load */'
       ':root{--bs-w:1240px;--bs-pad:24px}@media (max-width:999.98px){:root{--bs-pad:16px}}'  # same values nav.js sets, so widths do not change when it runs
       'body:not(:has(>.bsn-sp))::before{content:"";display:block;height:49px}'
       '@media (min-width:1000px){body:not(:has(>.bsn-sp))::before{height:51px}}</style>\n')

def textsize(s):
    """Text-size fallback before nav.js runs: read nav's keys (bs-text2, bs-text2-w) and its default (m = 1).
    The pages still read the retired keys with a 1.15 default, so they painted 15% too big and shrank once nav ran."""
    out, last = [], 0
    for m in re.finditer(r"'bs-text-w'", s):
        a, b = max(last, m.start() - 320), m.end() + 220
        w = s[a:b]
        w = (w.replace("'bs-text-w'", "'bs-text2-w'").replace("getItem('bs-text')", "getItem('bs-text2')")
              .replace(":'bs-text')", ":'bs-text2')").replace("]||1.15", "]||1").replace("||(w?1.15:1)", "||1")
              .replace("var k0=1.15;", "var k0=1;"))
        out.append(s[last:a]); out.append(w); last = b
    out.append(s[last:])
    return ''.join(out)

def patch(p, comment=None):
    s = textsize(open(p, encoding='utf8').read())
    s = re.sub(r'<style id="bsn-res">.*?</style>\n', '', s)
    i = s.lower().find('</head>')
    assert i > 0, p
    s = s[:i] + CSS + s[i:]
    if comment:
        assert s.lower().startswith('<!doctype html>'), p
        s = s[:15] + '\n<!-- ' + comment + ' -->' + s[15:]
    open(p, 'w', encoding='utf8').write(s)
    return True

def new_version(sec, old, new, note):
    src, dst = f'{sec}/{old}', f'{sec}/{new}'
    if os.path.exists(dst): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    patch(f'{dst}/index.html', note)
    stub = f'{sec}/redirect-stub.html'
    t = open(stub, encoding='utf8').read()
    assert f"'{old}/'" in t, stub
    open(stub, 'w', encoding='utf8').write(t.replace(f"{old}/", f"{new}/"))

WHY = ('no jump on load: the page reserves the site bar height and width padding in its head, and its text-size fallback reads '
       'the same setting as the site bar (standard A by default), so it no longer paints 15% too big and shrinks. Layout and behaviour only.')
# Library: root is a full copy of the live version (like v121b)
LIVE = 'v123'
assert open('library/index.html', encoding='utf8').read().find(f'Library {LIVE} ') > 0, 'live Library moved; rebuild on it'
if os.path.exists(f'library/{LIVE}c'): shutil.rmtree(f'library/{LIVE}c')
shutil.copytree(f'library/{LIVE}', f'library/{LIVE}c')
patch(f'library/{LIVE}c/index.html', f'Library {LIVE}c (20 Nov 2026, built on {LIVE}, kept): {WHY}')
shutil.copy(f'library/{LIVE}c/index.html', 'library/index.html')
if os.path.exists('library/v122/index.html'): patch('library/v122/index.html')  # other thread's preview, so the fix survives its publish
for sec, old, new, name in [('supplements', 'v33', 'v34', 'Supplements'), ('dosage', 'v33', 'v34', 'Dosage'),
                            ('blood', 'v30', 'v31', 'Blood'), ('protocol', 'v41', 'v42', 'Protocol')]:
    new_version(sec, old, new, f'{name} {new} (20 Nov 2026, built on {old}, kept): {WHY}')
# Cases and Goals indexes: root is a full copy of the live version (like the Library)
for sec, old, new, name in [('library/goals', 'v23', 'v24', 'Cases index'), ('library/aims', 'v15', 'v16', 'Goals index')]:
    assert f'{name} {old} ' in open(f'{sec}/index.html', encoding='utf8').read(), f'{sec} moved; rebuild on the live version'
    if os.path.exists(f'{sec}/{new}'): shutil.rmtree(f'{sec}/{new}')
    shutil.copytree(f'{sec}/{old}', f'{sec}/{new}')
    patch(f'{sec}/{new}/index.html', f'{name} {new} (20 Nov 2026, built on {old}, kept): {WHY}')
    shutil.copy(f'{sec}/{new}/index.html', f'{sec}/index.html')
print('ok')
