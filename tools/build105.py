"""Library v105 + Guide v87 (19 Nov 2026, live):
- One switch everywhere: [Quick look | Full read] segmented control on the Library card, the Library full read and the Guide sheet, same look.
- Live without version numbers: /library/ IS the page (v105 files copied up), so the address bar shows baresignals.co/library/#/p/ghk-cu;
  the Guide sheet and the body section point at /library/ and /. The '105 versions' line now reads 'Last updated 19 Nov 2026'.
- Drawer v1.3 loads Library data from /library/ directly."""
import os, shutil, re
R = '/home/claude/baresignals'
SRC, DST = f'{R}/library/v104', f'{R}/library/v105'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
rep('<p class="pk104">Quick look</p>', '<div class="seg105"><span class="on">Quick look</span><a href="#/p/${o.slug}">Full read</a></div>')
rep('<p class="pk104 fr">Full read</p>', '<div class="seg105"><a href="#/${o.slug}">Quick look</a><span class="on">Full read</span></div>')
rep("const GUIDE104='/home/v86/';", "const GUIDE104='/';")
rep('104 versions · last updated 19 Nov 2026', 'Last updated 19 Nov 2026')
CSS = """
/* v105: one Quick look | Full read switch everywhere */
.seg105{display:inline-flex;border:1.5px solid #3E4A80;margin:0 0 6px;background:#FFFFF4}
.seg105>*{font:600 calc(9px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;padding:6px 9px 5px;color:#3E4A80;text-decoration:none}
.seg105>.on{background:#3E4A80;color:#fff}
.seg105>a:hover{background:#EEF0FA}
.emb104 .seg105{display:none!important}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v105 (19 Nov 2026, built on v104, v104 kept): one Quick look | Full read switch on card and full read (same as the Guide sheet); body section reads the live Guide; live copy sits at /library/ so no version number shows in the address bar; version count hidden from readers. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)

# ---- publish: copy v105 up into /library/ (old redirect stub kept as /library/redirect-v97.html for reference)
L = f'{R}/library'
stub = open(f'{L}/index.html', encoding='utf8').read()
if 'location.replace' in stub: open(f'{L}/redirect-stub.html', 'w', encoding='utf8').write(stub)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{L}/{f}')

# ---- Guide v87: sheet with the same switch, pointing at /library/
sh = open('/home/claude/rx/sheet86.js', encoding='utf8').read()
sh = sh.replace("LIB='/library/v104/'", "LIB='/library/'")
sh = sh.replace('<span class="kd">Quick look</span><button type="button" class="sw">Full read →</button>',
                '<span class="sg"><button type="button" data-k="q" class="on">Quick look</button><button type="button" data-k="f">Full read</button></span>')
sh = sh.replace("cur.s.querySelector('.kd').textContent=full?'Full read':'Quick look';\n  var b=cur.s.querySelector('.sw');b.textContent=full?'‹ Quick look':'Full read →';",
                "cur.s.querySelectorAll('.sg button').forEach(function(b){b.classList.toggle('on',(b.dataset.k==='f')===full)});")
sh = sh.replace("cur.s.querySelector('.kd').textContent=cur.full?'Full read':'Quick look';cur.s.querySelector('.sw').textContent=cur.full?'‹ Quick look':'Full read →'",
                "cur.s.querySelectorAll('.sg button').forEach(function(b){b.classList.toggle('on',(b.dataset.k==='f')===cur.full)})")
sh = sh.replace("s.querySelector('.sw').addEventListener('click',function(){setKind(!cur.full)});",
                "s.querySelectorAll('.sg button').forEach(function(b){b.addEventListener('click',function(){setKind(b.dataset.k==='f')})});")
sh = sh.replace("'.gs86 .x{", "'.gs86 .sg{display:inline-flex;border:1.5px solid #3E4A80;background:#FFFFF4;flex:none}.gs86 .sg button{all:unset;cursor:pointer;font:600 9px/1 \"JetBrains Mono\",monospace;letter-spacing:.08em;text-transform:uppercase;padding:7px 9px 6px;color:#3E4A80}.gs86 .sg button.on{background:#3E4A80;color:#fff}'+\n'.gs86 .x{")
for k in ["'.kd'", "'.sw'", "kd{", ".sw{"]:
    pass
assert "LIB='/library/'" in sh and '.sg button' in sh and "querySelector('.kd')" not in sh and "querySelector('.sw')" not in sh
sh = sh.replace('/* Guide v86 sheet', '/* Guide v87 sheet (19 Nov 2026): Quick look | Full read switch styled like the Library one; reads /library/. Built on Guide v86 sheet', 1)
os.makedirs(f'{R}/home/v87', exist_ok=True)
open(f'{R}/home/v87/sheet.js', 'w', encoding='utf8').write(sh)
g = open(f'{R}/home/v86/index.html', encoding='utf8').read()
g = g.replace('<script src="/home/v86/sheet.js"></script>', '<script src="/home/v87/sheet.js"></script>')
g = g.replace('<!doctype html><!-- Home v86', '<!doctype html><!-- Home v87 (19 Nov 2026, live): one Quick look | Full read switch, sheet reads the live Library at /library/. Built on Home v86', 1)
open(f'{R}/home/v87/index.html', 'w', encoding='utf8').write(g)
open(f'{R}/index.html', 'w', encoding='utf8').write(g)

# ---- drawer v1.3: load Library data from /library/ directly
d = open(f'{R}/drawer.js', encoding='utf8').read()
if not os.path.exists(f'{R}/drawer/v1.2.js'): open(f'{R}/drawer/v1.2.js', 'w', encoding='utf8').write(d)
old = re.search(r"LP=fetch\('/library/',\{cache:'no-cache'\}\)\.then\(function\(r\)\{return r\.text\(\)\}\)\.then\(function\(h\)\{var m=h\.match\(/v\(\\d\+\)\\//\);var v=m\?m\[1\]:'89';", d)
assert old, 'drawer load'
d = d[:old.start()] + "LP=Promise.resolve().then(function(){" + d[old.end():]
d = d.replace("s.src='/library/v'+v+'/'+f;", "s.src='/library/'+f;")
assert "s.src='/library/'+f;" in d
d = d.replace('/* Bare Signals drawer v1.2', '/* Bare Signals drawer v1.3 (19 Nov 2026): reads Library data from /library/ (the live page now lives there, no version folder). v1.2 kept at /drawer/v1.2.js.\n/* Bare Signals drawer v1.2', 1)
open(f'{R}/drawer.js', 'w', encoding='utf8').write(d)
print('ok')
