"""Tab top v1 (20 Nov 2026): the top of every Library tab (header, title, tabs row, search, toolbar) is in the page from the
first paint, so switching All / Peptides / Supplements / Cases / Goals no longer jumps.
Why it jumped: Supplements, Cases and Goals were sent without the Peptides tab, with their intro text and caution box, and
without the toolbar; /libbar/v6.js then added the tab (row went 26 to 30px tall), hid the intro and built the toolbar after
load, so the tabs row and everything under it moved on each tab switch. The Library page (All, Peptides) had it all in its HTML.
- Toolbar v7 (/libbar/v7.js + /libbar/v7.css, v6 kept): the toolbar CSS is a stylesheet linked in <head> (no flash);
  the script reuses the toolbar and Peptides tab when the page already has them; phone tabs padding 0 3px (Library value, was 0 2px).
- Supplements v33 (built on v32, kept), Cases index v23 (on v22, kept), Goals index v15 (on v14, kept): Peptides tab,
  search box, cards | list and sort buttons written into the HTML at their final place.
- Box outline: every box is 1.5px #3E4A80 already; Case and Goal cards were the only cards without the 3px 3px #E3E0BF
  offset edge that Supplements, Peptide and Library cards carry. They get it now ("soon" placeholders stay flat).
- Cases and Goals: first heading 8px under the toolbar, same as the Supplements chips row (was 24px).
Library v121 / v122 untouched (the v122 preview belongs to another thread)."""
import os, re, shutil, subprocess, json
R = '/home/claude/baresignals'; os.chdir(R)

# ---- toolbar v7
b = open('libbar/v6.js', encoding='utf8').read()
css = json.loads(subprocess.run(['node', '-e', r"""
const s=require('fs').readFileSync('libbar/v6.js','utf8');const i=s.indexOf("var css=");const j=s.indexOf("var st=document.createElement('style')");
eval(s.slice(i,j).replace('var css=','global.css='));console.log(JSON.stringify(css))"""], capture_output=True, text=True, check=True).stdout)
css = css.replace('.lsw a{padding:9px 2px;', '.lsw a{padding:9px 3px;')
assert '.lsw a{padding:9px 3px;' in css
css += ('\n/* v7: Case and Goal cards get the same offset edge as every other card on the site; first heading 8px under the toolbar, like the Supplements chips */'
        '\n.bcg a.bc:not(.soon){box-shadow:3px 3px 0 #E3E0BF}.lb1+.part{margin-top:8px}')
open('libbar/v7.css', 'w', encoding='utf8').write('/* Library toolbar v7 CSS (20 Nov 2026): was injected by /libbar/v6.js after load; linked in <head> now so the tab top never jumps. */\n' + css + '\n')
i = b.index('var css='); j = b.index("var st=document.createElement('style')")
b = b[:i] + b[j:]
b = b.replace("var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);",
              "if(!document.querySelector('link[href=\"/libbar/v7.css\"]')){var lk=document.createElement('link');lk.rel='stylesheet';lk.href='/libbar/v7.css';document.head.appendChild(lk)}", 1)
b = b.replace('/* Library toolbar v6', '/* Library toolbar v7 (20 Nov 2026, built on v6, kept): CSS moved to /libbar/v7.css (linked in the page head, so nothing restyles after load); the Peptides tab and the toolbar are written into the Supplements, Cases and Goals HTML and this script only wires them (it still builds them if a page lacks them); phone tabs padding 0 3px like the Library; Case and Goal cards get the 3px offset edge. v6: Library toolbar v6', 1)
a = "if(PG==='sup'){var ctl=document.querySelector('.ctl'),qw=ctl&&ctl.querySelector('.qw');if(!qw)return;\n      var w=document.createElement('div');"
assert a in b
b = b.replace(a, "if(PG==='sup'){var ctl=document.querySelector('.ctl'),qw=ctl&&ctl.querySelector('.qw');if(!qw)return;\n      if(!ctl.querySelector('.lb1')){var w=document.createElement('div');", 1)
a = "w.insertAdjacentHTML('beforeend',seg());\n      var qq0"
assert a in b
b = b.replace(a, "w.insertAdjacentHTML('beforeend',seg())}\n      var qq0", 1)
a = "lead.insertAdjacentHTML('afterend','<div class=\"lb1\">"
assert a in b
b = b.replace(a, "if(!document.getElementById('q1'))lead.insertAdjacentHTML('afterend','<div class=\"lb1\">", 1)
open('libbar/v7.js', 'w', encoding='utf8').write(b)

# static markup, same as libbar would build
IC = dict(re.findall(r"(grid|list|sort):'(<svg.*?</svg>)'", b))
SEG = ('<div class="seg1" role="group" aria-label="View"><button type="button" class="ib1 on" data-v1="grid" aria-label="Cards" aria-pressed="true">' + IC['grid'] +
       '</button><button type="button" class="ib1" data-v1="list" aria-label="List" aria-pressed="false">' + IC['list'] +
       '</button></div><button type="button" class="ib1 sq1" id="sb1" aria-label="Sort" aria-haspopup="menu" aria-expanded="false">' + IC['sort'] +
       '</button><div class="m1" id="m1" role="menu" hidden></div>')
PEP = re.search(r"insertAdjacentHTML\('afterend','(<a href=\"/library/\?pep\">.*?</a>)'\)", b).group(1).replace('\\"', '"')
LINK = '<link rel="stylesheet" href="/libbar/v7.css">'

def common(t):
    t = t.replace('/libbar/v6.js', '/libbar/v7.js')
    t = t.replace('</head>', LINK + '\n</head>', 1)
    m = re.search(r'(<nav class="lsw"[^>]*><a href="/library/"[^>]*>.*?</a>)', t, re.S)
    assert m and '/library/?pep' not in t[m.start():m.start() + 3000]
    return t[:m.end()] + PEP + t[m.end():]

def bump(src, dst, note, edit, live=None):
    if os.path.exists(dst): shutil.rmtree(dst)
    os.makedirs(dst)
    for f in os.listdir(src):
        if os.path.isfile(f'{src}/{f}'): shutil.copy(f'{src}/{f}', f'{dst}/{f}')
    q = f'{dst}/index.html'; t = open(q, encoding='utf8').read()
    t = edit(common(t)).replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    open(q, 'w', encoding='utf8').write(t)
    if live: open(live, 'w', encoding='utf8').write(t)

def supp(t):
    a = '<div class="ctl"><div class="qw"><input id="q" type="search" placeholder="Search"'
    assert a in t
    t = t.replace(a, '<div class="ctl"><div class="lb1" style="margin:-2px 0 0;flex:1 1 100%"><div class="qw" style="flex:1 1 auto"><input id="q" type="search" placeholder="Search supplements"', 1)
    a = '<span id="count"></span></div><div class="seg" id="view"></div>'
    assert a in t
    return t.replace(a, '<span id="count"></span></div>' + SEG + '</div><div class="seg" id="view" style="display:none"></div>', 1)

def bc(word):
    def f(t):
        m = re.search(r'<p class="lead">.*?</p>\n', t, re.S); assert m
        return t[:m.end()] + '<div class="lb1" style="margin-top:0"><input class="q1" id="q1" type="search" placeholder="Search ' + word + '" aria-label="Search" autocomplete="off">' + SEG + '</div>\n' + t[m.end():]
    return f

bump('supplements/v32', 'supplements/v33', 'Supplements v33 (20 Nov 2026, built on v32, kept): tab top fixed in the HTML (Peptides tab, search, cards | list, sort written in place; toolbar v7 CSS linked in the head), so switching tabs no longer jumps', supp)
st = open('supplements/redirect-stub.html', encoding='utf8').read(); assert 'v32/' in st
open('supplements/redirect-stub.html', 'w', encoding='utf8').write(st.replace('v32/', 'v33/'))
bump('library/goals/v22', 'library/goals/v23', 'Cases index v23 (20 Nov 2026, built on v22, kept): tab top fixed in the HTML (Peptides tab, search, cards | list, sort in place; toolbar v7), heading 8px under the toolbar like Supplements, cards get the 3px offset edge like every other card', bc('cases'), 'library/goals/index.html')
bump('library/aims/v14', 'library/aims/v15', 'Goals index v15 (20 Nov 2026, built on v14, kept): tab top fixed in the HTML (Peptides tab, search, cards | list, sort in place; toolbar v7), heading 8px under the toolbar like Supplements, cards get the 3px offset edge like every other card', bc('goals'), 'library/aims/index.html')
print('built libbar v7, supplements v33, cases v23, goals v15; now run tools/publish_live.py')
