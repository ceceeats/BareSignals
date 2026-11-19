"""Library v111 + Guide v89 (20 Nov 2026, live), built on Library v110 and Guide v88 (both kept). Audit fixes 1-5 and 7:
1. Shelves snap softly (proximity), so a vertical swipe that starts on a shelf no longer gets caught sideways.
2. The landing shows the first 24 peptides, then 'Show all N peptides'. Searching, browsing or filtering always shows everything.
3. Back from a Full read lands on the top of the card, not where the Full read button was.
4. Search ranks a compound's own words above Case-page words: 'period pain' now leads with the period medicines.
5. Guide: a link inside the Quick look that leaves the Guide (Blood Work, Dosage, Aminos) can be undone with Back,
   which reopens the same Quick look (the sheet's URL carries ?ql=slug).
Also: a card opened from the top shelf opens right under that shelf instead of 1,500px down in All peptides.
7. Phone: when the toolbar comes back on scroll up, the site nav stays hidden, so only the search row takes space."""
import os, shutil
REPO = '/home/claude/baresignals'
R = f'{REPO}/library'
SRC, DST = f'{R}/v110', f'{R}/v111'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)

# 1 soft snap
rep('.srow{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;', '.srow{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x proximity;touch-action:pan-x pan-y;')
# 3 back from full read: top of the card
rep('openCard(m[1],!wasPage)', 'openCard(m[1],true)')
# 4 case words separate, lower score
rep('{const K=', '{const K0=')
rep('D.forEach(o=>{const a=K[o.slug];if(a)o.kw=(o.kw||[]).concat(a)})}', 'D.forEach(o=>{const a=K0[o.slug];if(a)o.ckw=a})}')
JS = r"""
/* v111: Case words rank below a compound's own words */
{const _s=score;score=function(o,q){let v=_s(o,q);if(v<4.2&&q&&q.length>=2&&(o.ckw||[]).some(k=>norm(k)===q||norm(k).includes(q)))v=4.2;return v}}
/* v111: landing shows 24 peptides, then a button */
let ALL111=false;
function cap111(){const g=$('#grid');if(!g)return;let b=document.getElementById('more111');
  const on=!ALL111&&!st.q.trim()&&!st.cols.length&&!document.body.classList.contains('libb')&&!document.documentElement.classList.contains('emb104');
  const T=[...g.querySelectorAll(':scope>.tl')];T.forEach((t,i)=>t.classList.toggle('x111',on&&i>=24&&t.dataset.s!==cur));
  const hid=T.filter(t=>t.classList.contains('x111')).length;
  if(!b){b=document.createElement('button');b.type='button';b.id='more111';b.className='more111';g.after(b);b.addEventListener('click',()=>{ALL111=true;cap111()})}
  b.hidden=!hid;b.textContent='Show all '+D.filter(o=>inT(o)&&!isW(o)).length+' peptides';}
{const _r=renderGrid;renderGrid=function(){_r.apply(this,arguments);cap111()}}
addEventListener('load',()=>setTimeout(cap111,80));
/* v111: a card opened from the top shelf opens under that shelf */
let SH111=null;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('.tl');if(!t)return;SH111=t.closest('#shelf .srow')||null},true);
{const _p=placeCard;placeCard=function(scroll){const cw=$('#cardwrap');
  if(SH111&&narrow()&&cur&&SH111.querySelector(`.tl[data-s="${cur}"]`)){if(SH111.nextElementSibling!==cw)SH111.after(cw);
    if(scroll!==false){const r=cw.getBoundingClientRect();scrollTo({top:scrollY+r.top-4-topOff(),behavior:RM.matches?'auto':'smooth'})}return}
  SH111=null;return _p.apply(this,arguments)}}
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
CSS = """
/* v111 */
#grid>.tl.x111{display:none!important}
.more111{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;text-align:center;margin:10px 0 4px;padding:13px 10px 12px;border:1.5px solid #3E4A80;background:#FFFFF4;color:#3E4A80;font:600 calc(11px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;box-shadow:3px 3px 0 var(--rule)}
.more111[hidden]{display:none}
#shelf>#cardwrap{margin:4px 0 14px}
@media (max-width:899px){body.tstuck .bsn{transform:translateY(-100%)!important}body.tstuck .bsn-sp{height:0!important}}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v111 (20 Nov 2026, built on v110, kept): soft shelf snap; landing shows 24 peptides then Show all; Back from a Full read lands on the card top; own words outrank Case words in search; shelf taps open the card under the shelf; phone hides the site nav while the search row is pinned. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')

# Guide v89: Quick look survives leaving the Guide (?ql=slug), Back reopens it
G = f'{REPO}/home'
os.makedirs(f'{G}/v89', exist_ok=True)
sh = open(f'{G}/v88/sheet.js', encoding='utf8').read()
def r2(old, new):
    global sh
    assert old in sh, old[:60]
    sh = sh.replace(old, new, 1)
r2("try{history.pushState({gs88:1},'')}catch(e){}", "try{history.pushState({gs88:1},'',qlUrl((full?'f:':'')+sl))}catch(e){}")
r2("var cur=null;", "var cur=null;\nfunction qlUrl(v){var u=new URL(location.href);if(v)u.searchParams.set('ql',v);else u.searchParams.delete('ql');return u.pathname+u.search+u.hash}")
r2("if(m.slug&&m.slug!==cur.slug){cur.slug=m.slug;", "if(m.slug&&(m.slug!==cur.slug||(m.kind==='full')!==cur.full)){try{if(history.state&&history.state.gs88)history.replaceState({gs88:1},'',qlUrl((m.kind==='full'?'f:':'')+m.slug))}catch(e){}}\n  if(m.slug&&m.slug!==cur.slug){cur.slug=m.slug;")
r2("W.addEventListener('popstate',function(){if(cur)shut()});", "W.addEventListener('popstate',function(){if(cur)shut()});\n/* v89: back from another page reopens the Quick look the reader left from */\n(function(){var v=Q.get('ql');if(!v)return;try{history.replaceState(null,'',qlUrl(''))}catch(e){}var f=v.indexOf('f:')===0,sl=f?v.slice(2):v;var go=function(){open(sl,f)};if(D.readyState==='complete')setTimeout(go,300);else W.addEventListener('load',function(){setTimeout(go,300)})})();")
sh = sh.replace('/* Guide v88 sheet (20 Nov 2026)', '/* Guide v89 sheet (20 Nov 2026): the sheet URL carries ?ql=slug, so Back from a page opened inside the Quick look reopens it. Built on Guide v88 sheet (20 Nov 2026)', 1)
open(f'{G}/v89/sheet.js', 'w', encoding='utf8').write(sh)
idx = open(f'{REPO}/index.html', encoding='utf8').read()
assert '/home/v88/sheet.js' in idx
idx = idx.replace('/home/v88/sheet.js', '/home/v89/sheet.js')
open(f'{G}/v89/index.html', 'w', encoding='utf8').write(idx)
open(f'{REPO}/index.html', 'w', encoding='utf8').write(idx)
print('ok')
