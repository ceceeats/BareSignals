"""Library v106 (19 Nov 2026, live), built on v105 (kept): Browse block under the search, visible from the start.
Row 1, 'Browse by': Popular, What it does, Peptide or not, Blends, Evidence, How it's taken, A to Z, Size (the existing sorts and groups).
Row 2, 'What do you want help with?': every role as its filled colour tag with a count; tap = that role's compounds.
Choosing either folds the shelves away and shows the grouped list right under it; 'Show shelves' brings them back."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v105', f'{R}/v106'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
rep('<div class="alsoin" id="alsoin" hidden></div>', '<div class="alsoin" id="alsoin" hidden></div>\n    <div class="brw" id="brw"></div>')
CSS = """
/* v106: Browse block */
.brw{margin:2px 0 12px}
.brw .bh{font:500 calc(9px*var(--k))/1.3 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:8px 0 5px;display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.brw .bh button{all:unset;cursor:pointer;color:#5271FF;text-decoration:underline;font:600 calc(9px*var(--k))/1 var(--mono);letter-spacing:.06em}
.brw .br1{display:flex;gap:5px;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;padding-bottom:2px}
.brw .br1::-webkit-scrollbar{display:none}
.brw .bc{all:unset;cursor:pointer;flex:none;border:1.5px solid #3E4A80;background:#FFFFF4;color:#3E4A80;font:600 calc(10px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:8px 9px 7px;white-space:nowrap}
.brw .bc.on{background:#3E4A80;color:#fff}
.brw .bc small{font-weight:500;opacity:.7;margin-left:4px}
.brw .br2{display:flex;flex-wrap:wrap;gap:5px}
.brw .rc{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:0;border:1.2px solid #3E4A80}
.brw .rc .rtg{border:0!important;margin:0!important}
.brw .rc b{font:600 calc(9px*var(--k))/1 var(--mono);padding:0 6px;color:#3E4A80;background:#FFFFF4;align-self:stretch;display:flex;align-items:center}
.brw .rc.on{outline:2.5px solid #3E4A80;outline-offset:1px}
.brw .rmore{all:unset;cursor:pointer;font:600 calc(9px*var(--k))/1 var(--mono);color:#5271FF;text-decoration:underline;padding:6px 4px}
body.libb #shelf{display:none}
@media (min-width:900px){.brw .br1{flex-wrap:wrap;overflow:visible}}
"""
rep('</style>', CSS + '</style>')
JS = r"""
/* v106: Browse block (sorts, groups, roles) under the search */
addEventListener('load',()=>setTimeout(function(){
  const B=document.getElementById('brw');if(!B||typeof SORTS==='undefined')return;
  const OPT=[['pop','Popular'],['role','What it does'],['origin','Peptide or not'],['blend','Blends'],['ev','Evidence'],['route','How it’s taken'],['az','A to Z'],['size','Size']];
  const pep=D.filter(o=>!isS(o)&&!isW(o));
  const cnt={};pep.forEach(o=>(o.roles||[]).forEach(r=>cnt[r]=(cnt[r]||0)+1));
  const roles=PAL.map(p=>p[0]).filter(k=>cnt[k]).sort((a,b)=>cnt[b]-cnt[a]);
  let allR=false;
  const draw=()=>{const on=document.body.classList.contains('libb');
    const rs=allR?roles:roles.slice(0,12);
    B.innerHTML=`<p class="bh"><span>Browse by</span>${on?'<button type="button" data-home>Show shelves</button>':''}</p><div class="br1">${OPT.map(([k,l])=>`<button type="button" class="bc${on&&!st.cols.length&&st.sort===k?' on':''}" data-k="${k}">${l}</button>`).join('')}</div>
    <p class="bh"><span>What do you want help with?</span></p><div class="br2">${rs.map(k=>`<button type="button" class="rc${st.cols.length===1&&st.cols[0]===k?' on':''}" data-r="${k}">${TAG(k)}<b>${cnt[k]}</b></button>`).join('')}${roles.length>12?`<button type="button" class="rmore">${allR?'Fewer':'All '+roles.length+' roles'}</button>`:''}</div>`};
  const toList=()=>{document.body.classList.add('libb');const a=document.getElementById('allp');if(a)scrollTo({top:a.getBoundingClientRect().top+scrollY-navH()-TBH,behavior:RM.matches?'auto':'smooth'})};
  B.addEventListener('click',e=>{const t=e.target.closest('button');if(!t)return;
    if(t.hasAttribute('data-home')){document.body.classList.remove('libb');st.cols=[];st.sort='pop';render();draw();scrollTo({top:0,behavior:'smooth'});return}
    if(t.classList.contains('rmore')){allR=!allR;draw();return}
    if(t.dataset.k){st.cols=[];const it=document.querySelector('#smenu [data-sort="'+t.dataset.k+'"]');if(it)it.click();else{st.sort=t.dataset.k;render()}document.body.classList.add('libb');draw();toList();return}
    if(t.dataset.r){document.body.classList.add('libb');st.sort='pop';showRole(t.dataset.r);draw();toList()}});
  draw();
},60));
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v106 (19 Nov 2026, built on v105, v105 kept): Browse block under the search, visible from the start: Browse by (Popular, What it does, Peptide or not, Blends, Evidence, How it is taken, A to Z, Size) and What do you want help with? (every role as a filled tag with its count). Choosing folds the shelves away and shows the grouped list; Show shelves brings them back. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
