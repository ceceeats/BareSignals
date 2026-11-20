"""Library v123 (20 Nov 2026, built on v121b from the other chat, kept).
- Search results: Peptides first; then Cases and Goals as swipe rows of the same picture cards as the front shelves;
  Supplements last. List view uses the same order (Peptides, Cases, Goals, Supplements).
- Typos: the Library hands its names to the shared search (BS_WORDS.vocab) so a misspelt word is swapped for the
  closest known one ("endometrosis", "tesamorlin", "eczma", "ozempik").
v122 (powder preview, not live) is left untouched."""
import os, shutil
R = '/home/claude/baresignals'; os.chdir(R)
SRC, DST = 'library/v121b', 'library/v123'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
p = f'{DST}/index.html'; s = open(p, encoding='utf8').read()
def rep(a, b):
    global s
    assert a in s, a[:90]
    s = s.replace(a, b, 1)
rep('<!-- Library v121b', '<!-- Library v123 (20 Nov 2026, built on v121b, kept): search shows Peptides first, then Cases and Goals as swipe rows of picture cards, Supplements last (list view in the same order); typos are swapped for the closest known word through the shared search. -->\n<!-- Library v121b')
# search result rows under the peptides: Cases and Goals swipe, Supplements last
rep("const O=others114();const h=rowSec114(O.cas,'Cases')+rowSec114(O.goa,'Goals')+suppSec114(O.sup);",
    "const O=others114();const h=swipe123(O.cas,'Cases','a problem to heal')+swipe123(O.goa,'Goals','what you want more of')+suppSec114(O.sup);\n"
    "  {const f=document.querySelector('#grid~.foot');if(f&&box.nextElementSibling!==f)f.parentNode.insertBefore(box,f)}")
rep("function renderAR(){",
    "/* v123: Cases and Goals as swipe rows of picture cards (same cards as the front shelves) */\n"
    "function swipe123(L,title,sub){if(!L.length)return '';const BC=window.BS_CARDS||{art:{},col:{}};\n"
    "  const card=x=>`<a class=\"sq2\" href=\"${x.url}\" style=\"--bc:${(BC.col||{})[x.art]||'#E1DE62'}\">${BC.art[x.art]?`<svg viewBox=\"0 0 120 60\" aria-hidden=\"true\">${BC.art[x.art]}</svg>`:''}<b>${esc(x.name)}</b>${x.stat?`<i class=\"stt\">${esc(x.stat)}</i>`:''}<span>${esc(x.line||'')}</span><em class=\"${x.live?'lv':''}\">${x.live?'Page':'Notes'}</em></a>`;\n"
    "  return `<section class=\"lvs sw123\"><div class=\"sh\"><h2>${title}</h2><span>${L.length} · ${sub}</span></div><div class=\"srow\">${L.map(card).join('')}</div></section>`}\n"
    "function renderAR(){")
# list view order: Peptides, Cases, Goals, Supplements
rep("+suppSec114(O.sup)+rowSec114(O.cas,'Cases','a problem to heal')+rowSec114(O.goa,'Goals','what you want more of');",
    "+rowSec114(O.cas,'Cases','a problem to heal')+rowSec114(O.goa,'Goals','what you want more of')+suppSec114(O.sup);")
rep('</style>', '#ar114{margin-top:6px}.sw123 .srow{margin-top:8px}\n</style>')
# names for typo fixing
rep('</body>', "<script>try{const C=window.BS_CARDS||{};BS_WORDS.vocab((window.BS_DATA||[]).map(o=>o.name+' '+(o.alias||'')).concat((C.cases||[]).concat(C.goals||[],C.notes||[]).map(x=>x.name),(window.SUPP||[]).map(x=>x.n+' '+(x.aka||[]).join(' '))))}catch(e){}</script>\n</body>")
open(p, 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    if os.path.isfile(f'{DST}/{f}'): shutil.copy(f'{DST}/{f}', f'library/{f}')
print('v123 built and copied to /library/')
