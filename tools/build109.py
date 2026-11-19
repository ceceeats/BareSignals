"""Library v109 (20 Nov 2026, live), built on v108 (kept). Fixes from the click-through audit:
1. Phone Back after opening a card now closes the card (before: URL went back, card and title stayed).
2. Swipes that start at the screen edge are ignored, so the iPhone back-swipe no longer also flips to the previous compound;
   card swipe needs a longer, flatter stroke so a diagonal scroll can't jump compounds.
3. Searching a condition (tennis elbow, achilles, knee, gut, endometriosis, PCOS, period pain) now lists the compounds
   its Case page discusses, under the Case link, instead of an empty grid. Built from the live Case pages' own links."""
import os, re, shutil, json
REPO = '/home/claude/baresignals'
R = f'{REPO}/library'
SRC, DST = f'{R}/v108', f'{R}/v109'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    assert s.count(old) >= n, old[:80]
    s = s.replace(old, new, n)

ALIAS = {'tennis-elbow': ['tennis elbow', 'elbow', 'tendon', 'tendonitis', 'lateral epicondylitis'],
         'achilles': ['achilles', 'achilles tendon', 'heel', 'tendon'],
         'knee': ['knee', 'knee pain', 'acl', 'meniscus'],
         'gut': ['gut', 'ibs', 'leaky gut', 'bloating', 'colitis'],
         'endometriosis': ['endometriosis', 'endo'],
         'pcos': ['pcos', 'polycystic'],
         'period-pain': ['period pain', 'period cramps', 'cramps', 'menstrual pain']}
KW = {}
for c, words in ALIAS.items():
    red = open(f'{R}/goals/{c}/index.html', encoding='utf8').read()
    v = re.search(r"replace\('(v\d+)", red).group(1)
    page = open(f'{R}/goals/{c}/{v}/index.html', encoding='utf8').read()
    slugs = sorted(set(re.findall(r'library/#/(?:p/)?([a-z0-9-]+)', page)))
    for sl in slugs:
        KW.setdefault(sl, [])
        for w in words:
            if w not in KW[sl]: KW[sl].append(w)

JS = r"""
/* v109: condition words from the Case pages, so 'tennis elbow' lists the compounds that page discusses */
{const K=%s;D.forEach(o=>{const a=K[o.slug];if(a)o.kw=(o.kw||[]).concat(a)})}
/* v109: Back to the plain Library closes an open card */
/* v109: inside the Guide sheet, the Library never adds history steps (the sheet owns Back) */
if(new URLSearchParams(location.search).get('embed')==='1'){history.pushState=function(a,b,c){history.replaceState(a,b,c)};
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a||e.defaultPrevented)return;e.preventDefault();location.replace(a.getAttribute('href'))})}
addEventListener('hashchange',()=>{const h=location.hash;if((!h||h==='#'||h==='#/')&&typeof cur!=='undefined'&&cur&&$('#pagev').hidden)closeCard()});
""" % json.dumps(KW)
rep('function page65(o){', JS + '\nfunction page65(o){')

# edge swipes: ignore touches starting within 28px of either screen edge; card needs 70px and a flatter line
rep("cw.addEventListener('touchstart',e=>{if(e.touches.length!==1){sx=null;return}",
    "cw.addEventListener('touchstart',e=>{const X0=e.touches[0]&&e.touches[0].clientX;if(e.touches.length!==1||X0<28||X0>innerWidth-28){sx=null;return}")
rep("if(Math.abs(dx)>55&&Math.abs(dx)>1.7*Math.abs(dy))step(dx<0?1:-1)", "if(Math.abs(dx)>70&&Math.abs(dx)>2.2*Math.abs(dy))step(dx<0?1:-1)")
rep("pv.addEventListener('touchstart',e=>{if(e.touches.length!==1||",
    "pv.addEventListener('touchstart',e=>{if(e.touches.length!==1||e.touches[0].clientX<28||e.touches[0].clientX>innerWidth-28||")

s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v109 (20 Nov 2026, built on v108, kept): Back closes an open card; swipes from the screen edge ignored (iPhone back-swipe no longer flips compounds), flatter card swipe; condition searches (tennis elbow, achilles, knee, gut, endometriosis, PCOS, period pain) list the compounds their Case page discusses. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')

# Guide v88: the sheet joins the phone's history (Back closes it instead of leaving the Guide)
G = f'{REPO}/home'
os.makedirs(f'{G}/v88', exist_ok=True)
sh = open(f'{G}/v87/sheet.js', encoding='utf8').read()
def r2(old, new):
    global sh
    assert old in sh, old[:60]
    sh = sh.replace(old, new, 1)
r2("function close(){if(!cur)return;var c=cur;", "function close(){if(!cur)return;var n=history.length-cur.L+1;if(cur.L&&history.state&&n>0){history.go(-n);return}shut()}\nfunction shut(){if(!cur)return;var c=cur;")
r2("cur={s:s,b:b,f:s.querySelector('iframe'),slug:sl,full:!!full};", "try{history.pushState({gs88:1},'')}catch(e){}\n  cur={s:s,b:b,f:s.querySelector('iframe'),slug:sl,full:!!full};")
r2("if(w.location.hash!==want)w.location.hash=want}", "if(w.location.pathname.indexOf(LIB)!==0){if(cur.f.getAttribute('src').indexOf(want)<0)cur.f.src=LIB+'?embed=1'+want;return}if(w.location.hash!==want)w.location.replace(w.location.pathname+w.location.search+want)}")
r2("W.BS_SHEET86=open;", "W.addEventListener('popstate',function(){if(cur)shut()});\nW.BS_SHEET86=open;")
sh = sh.replace('/* Guide v87 sheet (19 Nov 2026)', '/* Guide v88 sheet (20 Nov 2026): opening the sheet adds a history step, so the phone Back button or back-swipe closes it (and steps Full read back to Quick look) instead of leaving the Guide. Built on Guide v87 sheet (19 Nov 2026)', 1)
open(f'{G}/v88/sheet.js', 'w', encoding='utf8').write(sh)
idx = open(f'{REPO}/index.html', encoding='utf8').read()
assert '/home/v87/sheet.js' in idx
idx = idx.replace('/home/v87/sheet.js', '/home/v88/sheet.js')
open(f'{G}/v88/index.html', 'w', encoding='utf8').write(idx)
open(f'{REPO}/index.html', 'w', encoding='utf8').write(idx)
print('ok', len(KW), 'compounds tagged')
