"""Library v119 (20 Nov 2026, built on v118, kept): search reads everything.
- sx.js: a search index with each peptide's summary, what it helps and what people report (from page.js),
  and each supplement's what it does and benefits (from supp.js), loaded with the page.
- score(): a full-text tier (word start in that text) below names, keywords and What it does; word families
  (hormone also finds endocrine, testosterone, estrogen, thyroid, cortisol...; period finds menstrual, cramps...).
- The rule that hid every text match once any name matched now applies only to 1 to 3 letter searches.
- Supplements, Cases and Goals on the All tab match the same way (full text, roles, word families).
- Toolbar smaller: 36px controls, 15px icons (search text stays 16px so the phone never zooms);
  the picked view button fills inside its box instead of poking out under it."""
import os, re, shutil, json, subprocess
R = '/home/claude/baresignals'; os.chdir(R)
SRC, DST = 'library/v118', 'library/v119'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

# ---- search index from page.js and supp.js
js = r"""
global.window={BS_DATA:[]};const fs=require('fs');
eval(fs.readFileSync('%s/data.js','utf8'));eval(fs.readFileSync('%s/supp.js','utf8'));eval(fs.readFileSync('%s/page.js','utf8'));
const P=window.BS_PAGE||{},out={};const T=x=>x==null?'':typeof x==='string'?x:Array.isArray(x)?x.map(T).join(' '):typeof x==='object'?Object.values(x).map(T).join(' '):String(x);
const clean=s=>T(s).replace(/<[^>]+>/g,' ').replace(/https?:\S+/g,' ').replace(/\s+/g,' ').trim();
for(const k in P){const p=P[k];out[k]=clean([p.sum,p.helps,p.found,p.reports,p.worked,p.first].map(clean).join(' ')).slice(0,2600)}
for(const o of window.BS_DATA){const t=[o.fn,o.dose&&o.dose.use,o.supp&&o.supp.does,o.supp&&o.supp.benefits,(o.whoNot||[]).map(w=>w.t)].map(clean).join(' ');
  out[o.slug]=((out[o.slug]||'')+' '+t).trim().slice(0,3200)}
fs.writeFileSync('%s/sx.js','/* Library search index (Library v119): summary, what it helps and what people report for each compound, what each supplement does. Built by tools/build119.py from page.js, data.js and supp.js. */\nwindow.BS_SX='+JSON.stringify(out).toLowerCase()+';\n');
console.log(Object.keys(out).length);
""" % (DST, DST, DST, DST)
print('index entries', subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout.strip())

p = f'{DST}/index.html'; s = open(p, encoding='utf8').read()
def rep(a, b, n=1):
    global s
    assert s.count(a) >= 1, a[:80]
    s = s.replace(a, b, n)

rep('<!-- Library v118', '<!-- Library v119 (20 Nov 2026, built on v118, kept): search reads everything: each compound\'s summary, what it helps and what people report, each supplement\'s what it does (sx.js); word families (hormone also finds endocrine, testosterone, estrogen, thyroid; period finds menstrual and cramps); text matches no longer hidden once a name matches (only for 1 to 3 letters). Smaller toolbar: 36px controls, 15px icons, search text still 16px; the picked view fills inside its box. -->\n<!-- Library v118')
rep('<script src="supp.js"></script>', '<script src="supp.js"></script><script src="sx.js"></script>')

# word families + full-text helpers, placed before score()
rep('const WSPLIT=', r'''/* v119: word families and full text */
const SYN119={hormone:['endocrine','testosterone','estrogen','oestrogen','progesterone','thyroid','cortisol','growth hormone','insulin','prolactin','melatonin','androgen','gonadotropin'],
 period:['menstrua','cramp','endometrio','pcos','cycle pain'],menstrual:['period','cramp'],cramp:['period','menstrua'],
 weight:['fat loss','appetite','obesity'],fat:['weight','obesity'],sleep:['insomnia','melatonin'],anxiety:['anxious','stress','calm'],
 libido:['desire','sexual','erect'],testosterone:['androgen','hormone'],estrogen:['oestrogen','hormone'],skin:['collagen','wrinkle','acne'],
 hair:['hair loss','alopecia'],gut:['bowel','digest','bloat','colitis'],inflammation:['inflamm','swelling'],joint:['tendon','ligament','cartilage','knee'],
 brain:['cognit','memory','focus'],energy:['fatigue','mitochondri','atp'],aging:['longevity','ageing','anti-aging'],immune:['immunity','infection']};
const stem119=w=>w.replace(/(ies)$/,'y').replace(/(al|es|s)$/,'');
function fam119(raw){const q=String(raw||'').toLowerCase().trim().replace(/\s+/g,' ');if(!q)return [];const st=stem119(q);
  const k=Object.keys(SYN119).find(k=>k===q||k===st||stem119(k)===st);return [...new Set([q,st].concat(k?SYN119[k]:[]))].filter(x=>x.length>=3)}
const wre119=w=>new RegExp('(^|[^a-z0-9])'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
function full119(key,raw){const t=(window.BS_SX||{})[key];if(!t)return 0;const F=fam119(raw);if(!F.length)return 0;
  if(wre119(F[0]).test(t))return 2;return F.slice(1).some(w=>wre119(w).test(t))?1.5:0}
const WSPLIT=''')

# score: full-text tier and families on roles
rep('''  if(q.length<3)return 0;
  const rs=o.roles.concat(o.reported);
  if(rs.some(k=>norm(LONG[k]+RS[k]+(RK[k]||'')).includes(q)))return 1;
  return 0;
}''', '''  if(q.length<3)return 0;
  const ft=full119(o.slug,st.q);if(ft)return ft;
  const rs=o.roles.concat(o.reported),F=fam119(st.q).map(norm);
  if(rs.some(k=>{const t=norm(LONG[k]+RS[k]+(RK[k]||''));return F.some(w=>t.includes(w))}))return 1;
  return 0;
}''')
rep('if(q&&L.some(x=>x[1]>=6))L=L.filter(x=>x[1]>=6);', 'if(q&&q.length<4&&L.some(x=>x[1]>=6))L=L.filter(x=>x[1]>=6);')

# Supplements, Cases, Goals on the All tab
rep("const qm114=t=>{const q=nm114(st.q).trim();return !q||nm114(t).includes(q)};",
    "const qm114=(t,key,roles)=>{const q=nm114(st.q).trim();if(!q)return true;if(nm114(t).includes(q))return true;if(q.length<3)return false;"
    "if(key&&full119(key,st.q))return true;const F=fam119(st.q).map(nm114);if(F.some(w=>w.length>=4&&nm114(t).includes(w)))return true;"
    "return (roles||[]).some(k=>{const r=nm114((LONG[k]||'')+' '+(RS[k]||'')+' '+(RK[k]||''));return F.some(w=>r.includes(w))})};")
rep("sup:S.filter(x=>qm114([x.n,x.aka,x.s,x.cat].join(' ')))",
    "sup:S.filter(x=>{const o=(window.BS_DATA||[]).find(d=>d.origin==='supp'&&d.name===x.n);return qm114([x.n,x.aka,x.s,x.cat].join(' '),o&&o.slug,o&&o.roles)})")
# cases: hormone-related words
for cid, extra in {'pcos': 'hormone hormonal androgen testosterone insulin', 'endometriosis': 'hormone hormonal estrogen period',
                   'period-pain': 'hormone hormonal menstrual cramps', 'glp-1': 'hormone glp1 weight appetite'}.items():
    s = re.sub(r'("%s": ")([^"]*)"' % re.escape(cid), lambda m: m.group(1) + m.group(2) + ' ' + extra + '"', s, count=1)

# smaller toolbar, picked button inside its box
rep('.trow .qw,.trow #q{height:44px}', '.trow .qw,.trow #q{height:36px}')
rep('height:44px!important}', 'height:36px!important}')
rep('.ib114{width:44px;min-height:44px;height:44px}', '.ib114{width:38px;min-height:0;height:100%}')
rep('.seg114,.sq114{height:44px;box-sizing:border-box}', '.seg114,.sq114{height:36px;box-sizing:border-box}.seg114{overflow:hidden}.sq114{width:38px}.ib114 svg{width:15px;height:15px}')
open(p, 'w', encoding='utf8').write(s)

for f in os.listdir(DST):
    if os.path.isfile(f'{DST}/{f}'): shutil.copy(f'{DST}/{f}', f'library/{f}')

# toolbar v5 for Supplements, Cases and Goals: same smaller sizes
b = open('libbar/v4.js', encoding='utf8').read()
b = b.replace('/* Library toolbar v4', '/* Library toolbar v5 (20 Nov 2026, built on v4, kept): smaller, same as Library v119 (36px controls, 38px icon buttons, 15px icons, search text 16px); the picked view fills inside its box. v4: Library toolbar v4', 1)
b = b.replace('.seg1{height:44px;box-sizing:border-box;overflow:hidden}.seg1 .ib1{height:41px}', '.seg1{height:36px;box-sizing:border-box;overflow:hidden}.seg1 .ib1{height:100%;width:38px}.ib1 svg{width:15px;height:15px}.lb1 .q1,.lb1 #q,.lb1 .sq1{height:36px!important}.lb1 .sq1{width:38px}', 1)
b = b.replace('width:44px;height:44px;display:grid', 'width:38px;height:36px;display:grid')
b = b.replace('height:44px', 'height:36px')
open('libbar/v5.js', 'w', encoding='utf8').write(b)
def bump(src_dir, dst_dir, note, live):
    os.makedirs(dst_dir, exist_ok=True)
    for f in os.listdir(src_dir):
        if os.path.isfile(f'{src_dir}/{f}'): shutil.copy(f'{src_dir}/{f}', f'{dst_dir}/{f}')
    q = f'{dst_dir}/index.html'
    t = open(q, encoding='utf8').read().replace('/libbar/v4.js', '/libbar/v5.js').replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    open(q, 'w', encoding='utf8').write(t)
    if live: open(live, 'w', encoding='utf8').write(t)
bump('supplements/v30', 'supplements/v31', 'Supplements v31 (20 Nov 2026, built on v30, kept): toolbar v5 (smaller, same as Library v119)', None)
st = open('supplements/redirect-stub.html', encoding='utf8').read(); open('supplements/redirect-stub.html', 'w', encoding='utf8').write(st.replace('v30/', 'v31/'))
bump('library/goals/v20', 'library/goals/v21', 'Cases index v21 (20 Nov 2026, built on v20, kept): toolbar v5 (smaller, same as Library v119)', 'library/goals/index.html')
bump('library/aims/v12', 'library/aims/v13', 'Goals index v13 (20 Nov 2026, built on v12, kept): toolbar v5 (smaller, same as Library v119)', 'library/aims/index.html')
print('done')
