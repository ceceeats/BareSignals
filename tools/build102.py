"""Library v102 (19 Nov 2026), built on v101 (kept): search first.
The search box moves to the top of the Library, right under the Peptides / Supplements / Cases / Goals tabs, above the shelves.
Typing folds the shelves away so matching stickers sit right under the box, and an 'Also in' line shows matching
Supplements, Cases and Goals. Sort and view switches stay hidden until you search or scroll, then pin with the search."""
import os, shutil, re
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v101', f'{R}/v102'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()

# 1. cut the toolbar block and place it above the shelves
i = s.find('<div id="toolsph">'); depth = 0; j = i
for m in re.finditer(r'<div\b|</div>', s[i:]):
    depth += 1 if m.group() == '<div' else -1
    if depth == 0: j = i + m.end(); break
block = s[i:j]
s = s[:i] + s[j:]
shelf = '<section id="shelf" aria-label="Library shelves"></section>'
assert s.count(shelf) == 1
s = s.replace(shelf, block + '\n    <div class="alsoin" id="alsoin" hidden></div>\n    ' + shelf, 1)

css = """
/* v102: search first. Search box on top, shelves fold away while searching, sort row only once searching or pinned */
#toolsph{margin:10px 0 6px!important}
body:not(.tstuck):not(.libq) #tools .sbar,body:not(.tstuck):not(.libq) #tools .gpanel{display:none!important}
body.libq #shelf{display:none}
#q{font-size:16px!important}
@media (min-width:900px){#q{font-size:calc(15px*var(--k))!important;padding-top:10px;padding-bottom:10px}}
body.tstuck #q{font-size:16px!important}
.alsoin{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;margin:2px 0 10px;font-size:calc(12.5px*var(--k));line-height:1.4}
.alsoin .al{font:500 calc(8.5px*var(--k))/1.6 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft)}
.alsoin a{color:#5271FF;text-decoration:underline;text-underline-offset:2px;font-weight:600}
"""
s = s.replace('</style>', css + '</style>', 1)

js = r"""
<script>
/* v102: search first */
(function(){
  const q=document.getElementById('q'),al=document.getElementById('alsoin');if(!q)return;
  const nm=x=>String(x||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9+ ]/g,' ');
  function hits(list,get){const t=nm(q.value).trim();if(t.length<2)return [];return list.filter(x=>nm(get(x)).includes(t)).slice(0,6)}
  function also(){
    const on=!!q.value.trim();document.body.classList.toggle('libq',on);
    if(!on){al.hidden=true;al.innerHTML='';return}
    const S=(window.BS_DATA||[]).filter(o=>o.kind==='supp'),G=[].concat(window.BS_GOALS||[]),A=[].concat(window.BS_AIMS||[]);
    const sp=hits(S,o=>[o.name,o.alias,o.fn,(o.kw||[]).join(' ')].join(' ')).map(o=>`<a href="/supplements/#/${o.sid||o.slug}">${o.name}</a>`);
    const gs=hits(G,g=>[g.title,g.name,g.slug,g.teaser,(g.kw||[]).join(' ')].join(' ')).map(g=>`<a href="${g.url||('/library/goals/'+g.slug+'/')}">${g.title||g.name}</a>`);
    const as=hits(A,g=>[g.title,g.name,g.slug,g.teaser].join(' ')).map(g=>`<a href="${g.url||('/library/aims/'+g.slug+'/')}">${g.title||g.name}</a>`);
    const parts=[];if(sp.length)parts.push(`<span class="al">Supplements</span>${sp.join(' ')}`);if(gs.length)parts.push(`<span class="al">Cases</span>${gs.join(' ')}`);if(as.length)parts.push(`<span class="al">Goals</span>${as.join(' ')}`);
    al.innerHTML=parts.length?`<span class="al">Also in</span>`+parts.join(' '):'';al.hidden=!parts.length;
  }
  q.addEventListener('input',also);q.addEventListener('search',also);
  window.addEventListener('hashchange',()=>setTimeout(also,50));also();
})();
</script>
</body>"""
assert s.count('</body>') == 1
s = s.replace('</body>', js, 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v102 (19 Nov 2026, built on v101, v101 kept): search first. The search box sits at the top under the section tabs, above the shelves; typing folds the shelves so matches sit right under it, with an Also in line for matching Supplements, Cases and Goals. Sort and view row shows once you search or scroll. Search text is 16px so iPhones never zoom on tap. -->\n', 1)
s = s.replace('101 versions · last updated 19 Nov 2026', '102 versions · last updated 19 Nov 2026')
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
print('built v102')
