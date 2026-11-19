"""Library v113 (20 Nov 2026, live), built on v112 (kept).
1. Mixing it with / Taking it right: the Why sits right after the line, same as What it does (no extra row), opens compactly.
2. 'The story behind it · 8 notes' reads just 'The story behind it'.
3. Report tiles: the source number no longer runs into the figure (2,444 then a small 1, not 2,4441).
4. Metronidazole: ratings explained in plain words, the 2018 trichomoniasis trial, a read of the trichomoniasis reviews,
   and a new first FAQ 'What do the 6.0 and 7.0 out of 10 mean for me?' (page.js and faq.js patches)."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v112', f'{R}/v113'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
for f in ('page.js', 'faq.js'): shutil.copy(f'{R}/{f}', f'{DST}/{f}')
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)
rep('.rxl .why,.rxs .why{display:block;margin:4px 0 0}\n', '')
rep('The story behind it · ${st.length} notes', 'The story behind it')
rep('</style>', '''.rxl .why,.rxs .why{display:inline}
.rxl .why summary,.rxs .why summary{display:inline;cursor:pointer;list-style:none;font:500 calc(8.5px*var(--k)) var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-left:6px;white-space:nowrap}
.rxl .why summary::-webkit-details-marker,.rxs .why summary::-webkit-details-marker{display:none}
.rxl .why summary::after,.rxs .why summary::after{content:" ▾"}
.rxl .why[open] summary::after,.rxs .why[open] summary::after{content:" ▴"}
.rxl .why[open]>span,.rxs .why[open]>span{display:block;margin:3px 0 4px;color:var(--ink-soft);font-size:calc(12px*var(--k));line-height:1.4}
''' + '.pools strong sup{font-size:.42em;margin-left:3px;vertical-align:super;color:var(--ink-soft)}\n</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v113 (20 Nov 2026, built on v112, kept): Whys sit inline after each Mixing it with row and Taking it right step; story heading without the note count; report tile footnote spaced; metronidazole ratings explained, 2018 trichomoniasis trial, review read, new first FAQ. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
