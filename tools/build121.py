"""Library v121 (20 Nov 2026, built on v120 from the other chat (card claims fixes), kept): search understands how people type.
- Phrases are read word by word ("grow more muscle", "peptide for skin", "shoulder pain", "tendon repair"):
  filler words dropped (peptide, for, best, my, help...), every remaining word must match; if nothing matches
  every word, the closest partial matches show.
- Everyday phrases mapped to the site's words ("lose weight" > weight loss, "low t" > testosterone,
  "can't sleep" > sleep, "sick often" > immune, "live longer" > longevity...), and a bigger word-family list
  (eczema > dermatitis, itch; migraine > headache; Hashimoto > thyroid, autoimmune; ADHD > focus, attention...).
- Two text levels: summary, what it helps and what worked rank above roles; user reports and who shouldn't
  take it rank below them, so a side effect ("users report acne") no longer outranks what treats it.
- Case notes (Shoulder, Muscle injury, Menopause, ADHD, Addiction, Acne, Hair loss) are searched with the Cases.
Built by tools/build121.py; the word lists live in one place (WORDS below) so the sweep can grow them."""
import os, re, shutil, json, subprocess
R = '/home/claude/baresignals'; os.chdir(R)
SRC, DST = 'library/v120', 'library/v121'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

js = r"""
global.window={BS_DATA:[]};const fs=require('fs');
eval(fs.readFileSync('%(d)s/data.js','utf8'));eval(fs.readFileSync('%(d)s/supp.js','utf8'));eval(fs.readFileSync('%(d)s/page.js','utf8'));
const P=window.BS_PAGE||{},A={},B={};const T=x=>x==null?'':typeof x==='string'?x:Array.isArray(x)?x.map(T).join(' '):typeof x==='object'?Object.values(x).map(T).join(' '):String(x);
const clean=s=>T(s).replace(/<[^>]+>/g,' ').replace(/https?:\S+/g,' ').replace(/\s+/g,' ').trim();
for(const k in P){const p=P[k];A[k]=[p.sum,p.helps,p.worked,p.found].map(clean).join(' ');B[k]=[p.reports,p.first].map(clean).join(' ')}
const html=fs.readFileSync('%(d)s/index.html','utf8');const km=html.match(/const K0=(\{.*?\});/);const K0=km?JSON.parse(km[1]):{};
for(const k in K0){A[k]=(A[k]||'')+' '+K0[k].join(', ')}
const N={};const nz=x=>String(x||'').toLowerCase().replace(/[\u00ad\u2060\u200b]/g,'').replace(/[\s\-–—()+.,'’/]/g,'');
for(const o of window.BS_DATA){N[nz(o.name)]=o.slug;String(o.alias||'').split(/,\s*/).forEach(a=>{const k=nz(a);if(k.length>2&&!N[k])N[k]=o.slug})}
for(const o of window.BS_DATA){A[o.slug]=((A[o.slug]||'')+' '+[o.fn,o.dose&&o.dose.use,o.supp&&o.supp.does,o.supp&&o.supp.benefits].map(clean).join(' ')).trim().slice(0,3600);
  B[o.slug]=((B[o.slug]||'')+' '+(o.whoNot||[]).map(w=>clean(w.t)).join(' ')).trim().slice(0,2400)}
fs.writeFileSync('%(d)s/sx.js','/* Library search index (Library v121). BS_SX: summary, what it helps, what worked, what it does. BS_SX2: user reports and who should not take it (ranked lower). Built by tools/build121.py. */\nwindow.BS_SX='+JSON.stringify(A).toLowerCase()+';\nwindow.BS_SX2='+JSON.stringify(B).toLowerCase()+';\nwindow.BS_SXN='+JSON.stringify(N)+';\n');
console.log(Object.keys(A).length);
""" % {'d': DST}
print('index', subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout.strip())

subprocess.run(['python3','tools/search_words.py'],check=True)  # /search.js v2 holds the shared word lists

p = f'{DST}/index.html'; s = open(p, encoding='utf8').read()
def rep(a, b):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b, 1)
rep('<!-- Library v120', '<!-- Library v121 (20 Nov 2026, built on v120, kept): search understands how people type: phrases read word by word with filler words dropped ("grow more muscle", "peptide for skin"), everyday phrases mapped (lose weight, low t, can\'t sleep, sick often, live longer), a bigger word-family list (eczema, migraine, Hashimoto, ADHD, cholesterol...), user reports and side effects ranked below what a compound is for, and Case notes searched with Cases. -->\n<!-- Library v120')
# replace the v119 word list with the bigger one + query parser
s = re.sub(r"const SYN119=\{.*?\};\n", "const SYN119=BS_WORDS.family;\n", s, count=1, flags=re.S)
rep('<script src="sx.js"></script>', '<script src="/search.js"></script><script src="sx.js"></script>')
rep('function fam119(raw){', 'function fam119(raw){return BS_WORDS.fam(raw)}\nfunction fam119_v119(raw){')
rep("function full119(key,raw){", "function full119(key,raw){const a=BS_WORDS.hit((window.BS_SX||{})[key],raw),b=BS_WORDS.hit((window.BS_SX2||{})[key],raw);return a>=1.5?a:(a||b)?.6:0}\nfunction qp120(raw){return BS_WORDS.parse(raw)}\nfunction full119_v119(key,raw){")
rep("function score(o,q){", "function score(o,q,raw){raw=raw==null?st.q:raw;")
rep("const ft=full119(o.slug,st.q);if(ft)return ft;\n  const rs=o.roles.concat(o.reported),F=fam119(st.q).map(norm);\n  if(rs.some(k=>{const t=norm(LONG[k]+RS[k]+(RK[k]||''));return F.some(w=>t.includes(w))}))return 1;\n  return 0;",
    "const ft=full119(o.slug,raw);if(ft>=1.5)return ft;\n  const rs=o.roles.concat(o.reported),F=fam119(raw).map(norm);\n  if(rs.some(k=>{const t=norm(LONG[k]+RS[k]+(RK[k]||''));return F.some(w=>t.includes(w))}))return 1;\n  return ft;")
rep("let L=D.filter(o=>inT(o)&&(!st.cols.length||st.cols.some(c=>has(o,c)))).map(o=>[o,score(o,q)]).filter(x=>x[1]>0);",
    "const TQ=qp120(st.q),one=TQ.length===1&&TQ[0]!==st.q.trim().toLowerCase()?TQ[0]:null;\n"
    "  const sc=o=>{let a=score(o,q);if(one)a=Math.max(a,score(o,norm(one),one)*.98);if(TQ.length>1){const v=TQ.map(t=>score(o,norm(t),t));if(v.every(x=>x>0))a=Math.max(a,v.reduce((p,c)=>p+c,0)/v.length);else o._or120=Math.max(...v)}return a};\n"
    "  let L=D.filter(o=>inT(o)&&(!st.cols.length||st.cols.some(c=>has(o,c)))).map(o=>{o._or120=0;return [o,sc(o)]});\n"
    "  if(q&&TQ.length>1&&!L.some(x=>x[1]>0))L=L.map(x=>[x[0],x[0]._or120*.5]);L=L.filter(x=>x[1]>0);")
# Supplements / Cases / Goals: same reading
rep("const qm114=(t,key,roles)=>{const q=nm114(st.q).trim();",
    "const qm1=(t,key,roles,raw)=>{const q=nm114(raw).trim();")
s = s.replace("if(key&&full119(key,st.q))return true;const F=fam119(st.q).", "if(key&&full119(key,raw)>=1)return true;const F=fam119(raw).", 1)
rep("const S=(window.SUPP||[]),C=(window.BS_CARDS||{});",
    "const S=(window.SUPP||[]),C=(window.BS_CARDS||{});const TQ=qp120(st.q),VS=[st.q].concat(TQ.length===1?TQ:[]);\n"
    "  const AND=(t,k,r)=>VS.some(v=>qm1(t,k,r,v))||(TQ.length>1&&TQ.every(v=>qm1(t,k,r,v))),OR=(t,k,r)=>TQ.some(v=>qm1(t,k,r,v));\n"
    "  const pick=(L,f)=>{const a=L.filter(x=>f(x,AND));return a.length||TQ.length<2?a:L.filter(x=>f(x,OR))};\n"
    "  const qm114=(t,k,r,M)=>!st.q.trim()||(M||AND)(t,k,r);")
rep("return {sup:S.filter(x=>{const o=(window.BS_DATA||[]).find(d=>d.origin==='supp'&&d.name===x.n);return qm114([x.n,x.aka,x.s,x.cat].join(' '),o&&o.slug,o&&o.roles)}),cas:(C.cases||[]).filter(x=>qm114([x.name,x.line,CKW114[x.id]||''].join(' '))),goa:(C.goals||[]).filter(x=>qm114([x.name,x.line,x.stat].join(' ')))}}",
    "return {sup:pick(S,(x,M)=>{const o=(window.BS_DATA||[]).find(d=>d.origin==='supp'&&d.name===x.n);return qm114([x.n,x.aka,x.s,x.cat].join(' '),o&&o.slug,o&&o.roles,M)}),"
    "cas:pick((C.cases||[]).concat(C.notes||[]),(x,M)=>qm114([x.name,x.line,CKW114[x.id]||''].join(' '),null,null,M)),"
    "goa:pick(C.goals||[],(x,M)=>qm114([x.name,x.line,x.stat].join(' '),null,null,M))}}")
NOTEKW = {'shoulder': 'shoulder rotator cuff frozen shoulder pain', 'muscle': 'muscle injury strain tear pulled muscle recovery', 'menopause': 'menopause perimenopause hot flush hot flash hormone estrogen',
          'adhd': 'adhd attention focus concentration', 'addiction': 'addiction alcohol drinking smoking nicotine craving', 'acne': 'acne pimples breakout spots skin', 'hair': 'hair loss hair growth shedding thinning balding alopecia'}
rep('if(q&&q.length<4&&L.some(x=>x[1]>=6))', 'if(q&&q.length<4&&!BS_WORDS.known(st.q)&&L.some(x=>x[1]>=6))')
rep('F.some(w=>w.length>=4&&nm114(t).includes(w))', 'F.some(w=>w.length>=4&&BS_WORDS.hit(t,w)===2)')
rep('const CKW114={', 'const CKW114={' + ','.join('"%s": "%s"' % kv for kv in NOTEKW.items()) + ',')
rep("{const _s=score;score=function(o,q){let v=_s(o,q);", "{const _s=score;score=function(o,q,raw){let v=_s(o,q,raw);")
# short family words match whole words only (ear must not match year)
rep("const wre119=w=>new RegExp('(^|[^a-z0-9])'+w.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&'));",
    "const wre119=w=>new RegExp('(^|[^a-z0-9])'+w.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&')+(w.length<5?'($|[^a-z0-9])':''));")
open(p, 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    if os.path.isfile(f'{DST}/{f}'): shutil.copy(f'{DST}/{f}', f'library/{f}')
print('ok')
