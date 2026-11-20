"""20 Nov 2026: shared search v2 on every search bar (run after tools/search_words.py).
Toolbar v6 (Cases, Goals, Supplements): Cases and Goals search through BS_SEARCH (phrases, word families), loads /search.js if a page lacks it.
Supplements v32: search goes straight through BS_SEARCH v2 (v31's own word list removed). Cases index v22, Goals index v14: toolbar v6.
Guide v91 (body Home v87, built on v90, kept): peptide search through BS_SEARCH v2 (everyday phrases, word families, side effects ranked low);
search text 16px on phone so the iPhone never zooms in."""
import os, shutil, re, json
os.chdir('/home/claude/baresignals')
b = open('libbar/v5.js', encoding='utf8').read()
b = b.replace('/* Library toolbar v5', '/* Library toolbar v6 (20 Nov 2026, built on v5, kept): Cases and Goals search through the shared search v2 (/search.js: phrases, word families), loaded here if the page lacks it. v5: Library toolbar v5', 1)
a = "a.classList.toggle('lb1hit',!!t&&nm(a.dataset.k).indexOf(t)<0)"
assert a in b
b = b.replace(a, "a.classList.toggle('lb1hit',!!t&&(window.BS_SEARCH?BS_SEARCH.rank(a.dataset.n||'','',a.dataset.k||'',q.value)<=0:nm(a.dataset.k).indexOf(t)<0))", 1)
b = b.replace("(function(){", "(function(){\n  if(!window.BS_SEARCH&&!document.querySelector('script[src=\"/search.js\"]')){var s0=document.createElement('script');s0.src='/search.js';document.head.appendChild(s0)}", 1)
KW = {'tennis elbow': 'elbow tendon tendonitis tendinopathy lateral epicondylitis arm pain', 'achilles': 'achilles tendon heel ankle calf tendinopathy', 'knee': 'knee knees acl meniscus ligament cartilage joint patellar',
 'gut': 'gut ibs leaky bloating colitis digestion stomach bowel', 'glp-1s': 'glp-1 glp semaglutide tirzepatide ozempic weight loss appetite hormone', 'endometriosis': 'endometriosis endo period pelvic pain hormone estrogen',
 'pcos': 'pcos polycystic hormone hormonal androgen testosterone insulin fertility period', 'period pain': 'period cramps menstrual pms hormone',
 'glps': 'glp-1 weight loss appetite hormone semaglutide tirzepatide retatrutide', 'energy': 'energy fatigue tired mitochondria atp nad', 'growth hormones': 'growth hormone hgh gh sleep recovery muscle height', 'brain': 'brain focus memory cognition adhd brain fog nootropic mood'}
b = b.replace("a.classList.toggle('lb1hit',!!t&&(window.BS_SEARCH?BS_SEARCH.rank(a.dataset.n||'','',a.dataset.k||'',q.value)<=0", "a.classList.toggle('lb1hit',!!t&&(window.BS_SEARCH?BS_SEARCH.rank(a.dataset.n||'','',(a.dataset.k||'')+' '+(KW6[(a.dataset.n||'').toLowerCase()]||''),q.value)<=0", 1)
b = b.replace("var esc=function", "var KW6=" + json.dumps(KW) + ";\n  var esc=function", 1)
open('libbar/v6.js', 'w', encoding='utf8').write(b)
def bump(src, dst, note, live, edit=None):
    if os.path.exists(dst): shutil.rmtree(dst)
    os.makedirs(dst)
    for f in os.listdir(src):
        if os.path.isfile(f'{src}/{f}'): shutil.copy(f'{src}/{f}', f'{dst}/{f}')
    q = f'{dst}/index.html'; t = open(q, encoding='utf8').read().replace('/libbar/v5.js', '/libbar/v6.js').replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    if edit: t = edit(t)
    open(q, 'w', encoding='utf8').write(t)
    if live: open(live, 'w', encoding='utf8').write(t)
def supp(t):
    i = t.index('/* v31: word families'); j = t.index('function render(){', i)
    return t[:i] + 'const rk31=o=>BS_SEARCH.rank(o.n,[o.s,(o.aka||[]).join(\', \')].join(\', \'),o._h,q);\n' + t[j:]
bump('supplements/v31', 'supplements/v32', 'Supplements v32 (20 Nov 2026, built on v31, kept): search goes through the shared search v2 (/search.js: everyday phrases, word families, side effects ranked low); toolbar v6', None, supp)
st = open('supplements/redirect-stub.html', encoding='utf8').read(); open('supplements/redirect-stub.html', 'w', encoding='utf8').write(st.replace('v31/', 'v32/'))
bump('library/goals/v21', 'library/goals/v22', 'Cases index v22 (20 Nov 2026, built on v21, kept): toolbar v6 (search reads phrases and word families)', 'library/goals/index.html')
bump('library/aims/v13', 'library/aims/v14', 'Goals index v14 (20 Nov 2026, built on v13, kept): toolbar v6 (search reads phrases and word families)', 'library/aims/index.html')
# Guide v90
g = open('home/v90/index.html', encoding='utf8').read()
g = g.replace('<!doctype html><!-- Guide v90', '<!doctype html><!-- Guide v91 (20 Nov 2026, built on v90, kept): peptide search through the shared search v2 (/search.js: everyday phrases like "my knees hurt" or "grow muscle", word families, side effects ranked low); search text 16px on phone so the iPhone never zooms in. --><!-- Guide v90', 1)
a = 'function matches(c,q){if(!q)return true;const h=norm([c.n,c.al,c.f,...c.r.map(r=>P[r]&&P[r][0]),...c.x.map(r=>P[r]&&P[r][0]),...Object.values(c.d||{}),...c.o.map(e=>e.at)].join(" "));return norm(q).split(/\\s+/).filter(Boolean).every(w=>h.includes(w));}'
assert a in g
g = g.replace(a, 'function matches(c,q){if(!q)return true;const t=[c.f,...c.r.map(r=>P[r]&&P[r][0]),...c.x.map(r=>P[r]&&P[r][0]),...Object.values(c.d||{}),...c.o.map(e=>e.at)].join(" ");if(window.BS_SEARCH)return (c._s=BS_SEARCH.rank(c.n,c.al||"",t,q))>0;const h=norm([c.n,c.al,t].join(" "));return norm(q).split(/\\s+/).filter(Boolean).every(w=>h.includes(w));}', 1)
g = g.replace('const L=C.filter(c=>matches(c,q)).sort(rank);', 'const L=C.filter(c=>matches(c,q)).sort((a,b)=>((b._s||0)-(a._s||0))||rank(a,b));', 1)
g = g.replace('const L=C.filter(c=>matches(c,st.q)).sort(rank);', 'const L=C.filter(c=>matches(c,st.q)).sort((a,b)=>((b._s||0)-(a._s||0))||rank(a,b));', 1)
g = g.replace('<script src="/nav.js"', '<script src="/search.js"></script><script src="/nav.js"', 1)
g = g.replace('</head>', '<style>/* v90: no zoom on tap */@media (max-width:899px){.srch input{font-size:16px!important}}</style></head>', 1)
os.makedirs('home/v91', exist_ok=True)
open('home/v91/index.html', 'w', encoding='utf8').write(g); open('index.html', 'w', encoding='utf8').write(g)
print('ok')
# Dosage v32 and Blood v30: search text 16px on phone (no iPhone zoom); both already use the shared search v2
ZOOM = '<style>/* no zoom on tap */@media (max-width:899px){input[type=search],input[type=text],select{font-size:16px!important}}</style></head>'
for sec, old, new, note in [('dosage', 'v31', 'v32', 'Dosage v32 (20 Nov 2026, built on v31, kept): search text 16px on phone so the iPhone never zooms in; search reads phrases and word families (shared search v2)'),
                            ('blood', 'v29', 'v30', 'Blood v30 (20 Nov 2026, built on v29, kept): search text 16px on phone so the iPhone never zooms in; search reads phrases and word families (shared search v2)')]:
    src, dst = f'{sec}/{old}', f'{sec}/{new}'
    if os.path.exists(dst): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    t = open(f'{dst}/index.html', encoding='utf8').read().replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1).replace('</head>', ZOOM, 1)
    open(f'{dst}/index.html', 'w', encoding='utf8').write(t)
    st = open(f'{sec}/redirect-stub.html', encoding='utf8').read(); open(f'{sec}/redirect-stub.html', 'w', encoding='utf8').write(st.replace(old + '/', new + '/'))
print('dosage, blood ok')
