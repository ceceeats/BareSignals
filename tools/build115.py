"""Library v115 (20 Nov 2026, live), built on v114 (kept).
1. Toolbar lines up: search box and the three icon buttons share one 44px height.
2. List view groups are full width, each with its names in an even grid (2 across on phone, 3 to 4 on laptop), so every
   group header starts at the left edge and lines up; no more groups flowing from one column into the next.
3. List view: Popular shows the Top 30, then everything else grouped by What it does. A to Z is grouped by letter.
4. Case and Goal rows read as one sentence: the number sits inside its line ('3× natural pregnancy on GLP-1s vs metformin').
Also uses /libbar/v2.js on the Supplements, Cases and Goals tabs (same fixes)."""
import os, shutil, re
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v114', f'{R}/v115'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
# rows read as sentences
rep("const row114=x=>`<li><a href=\"${x.url}\"><span class=\"n\">${esc(x.name)}</span><span class=\"t\">${esc(x.stat||'')}</span></a></li>`;",
    "const row114=x=>`<li><a href=\"${x.url}\"><span class=\"n\"><b>${esc(x.name)}</b></span><span class=\"l\">${x.stat?`<em>${esc(x.stat)}</em> `:''}${esc(x.line||'')}</span></a></li>`;")
# popular: top 30 then by role
rep("  else g=grp114('Most looked at first','#FFDE59',L.length,L.map(li114).join(''));",
    """  else{const P=L.slice().sort((a,b)=>(a.rank||999)-(b.rank||999)||az(a,b)),T=P.slice(0,30),Rr=P.slice(30),by={};
    Rr.forEach(o=>{const r=(o.roles||[])[0]||'other';(by[r]=by[r]||[]).push(o)});
    g=grp114('Top 30, most looked at','#FFDE59',T.length,T.map(li114).join(''))+(Rr.length?'<p class="lvsub">The rest, by what it does</p>':'')+Object.keys(by).sort((a,b)=>by[b].length-by[a].length).map(r=>grp114(LONG[r]||r,HEX[r]||'#FFFFF4',by[r].length,by[r].slice().sort(az).map(li114).join(''))).join('')}""")
# role groups sorted A to Z inside
rep("g=Object.keys(by).sort((a,b)=>by[b].length-by[a].length).map(r=>grp114(LONG[r]||r,HEX[r]||'#FFFFF4',by[r].length,by[r].map(li114).join(''))).join('')}\n  else if(st.sort==='az')",
    "g=Object.keys(by).sort((a,b)=>by[b].length-by[a].length).map(r=>grp114(LONG[r]||r,HEX[r]||'#FFFFF4',by[r].length,by[r].slice().sort(az).map(li114).join(''))).join('')}\n  else if(st.sort==='az')")
rep("q.placeholder='Try “'+W[wi%W.length]+'” or any name'","q.placeholder='Try “'+W[wi%W.length]+'”'")
CSS = """
/* v115: aligned toolbar, full-width list groups */
.trow{align-items:stretch}
.trow .qw,.trow #q{height:44px}
.trow #q{box-sizing:border-box;padding-top:0!important;padding-bottom:0!important;height:44px!important}
.ib114{width:44px;min-height:44px;height:44px}
.seg114,.sq114{height:44px;box-sizing:border-box}
#lv114 .cols,#ar114 .cols{columns:auto!important;display:block}
#lv114 .grp,#ar114 .grp{margin:12px 0 0}
#lv114 .gh,#ar114 .gh{border-bottom:1.5px solid var(--rule);padding:0 0 4px;margin:0 0 2px}
#lv114 .grp ul,#ar114 .grp ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:16px}
@media (min-width:700px){#lv114 .grp ul,#ar114 .grp ul{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (min-width:1300px){#lv114 .grp ul,#ar114 .grp ul{grid-template-columns:repeat(4,minmax(0,1fr))}}
#lv114 .rows,#ar114 .rows{display:grid!important;grid-template-columns:minmax(0,1fr);column-gap:28px}
@media (min-width:700px){#lv114 .rows,#ar114 .rows{grid-template-columns:repeat(2,minmax(0,1fr))}}
#lv114 .rows li a,#ar114 .rows li a{flex-direction:column;align-items:stretch;gap:2px;padding:8px 0}
#lv114 .rows .n b,#ar114 .rows .n b{font-weight:700}
#lv114 .rows .l,#ar114 .rows .l{font-size:calc(12.5px*var(--k));line-height:1.35;color:var(--ink-soft)}
#lv114 .rows .l em,#ar114 .rows .l em{font-style:normal;font-weight:700;color:var(--accent)}
#lv114 .lvsub{font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:18px 0 0}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v115 (20 Nov 2026, built on v114, kept): toolbar at one 44px height; list groups full width with names in an even grid; Popular list = Top 30 then by What it does; Case and Goal rows read as one sentence. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
