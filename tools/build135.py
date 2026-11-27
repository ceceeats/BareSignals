"""Library v135 (27 Nov 2026, built on v134, kept): every Most reported line in the Full read now says what kind of report
it is, so "Anxiety" or "Low mood" can no longer be read as a benefit: Helped, Side effect, Mixed or Use note.
Labels live in the new patch /library/rpk.js (all 407 lines, 145 compounds, sorted by hand). No compound facts changed."""
import os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
src, dst = 'library/v134', 'library/v135'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
shutil.copy('tools/_rpk_src.js', f'{dst}/rpk.js')
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
a = "rp.map((x,i)=>`<li><span class=\"rk\">${i+1}</span><span>${esc(x)}${rt(x)}</span></li>`)"
b = "rp.map((x,i)=>{const c=((window.BS_RPK||{})[o.slug]||[])[i];const L={g:'Helped',s:'Side effect',m:'Mixed',n:'Use note'}[c];return `<li><span class=\"rk\">${i+1}</span><span>${L?`<b class=\"rpk rpk-${c}\">${L}</b>`:''}${esc(x)}${rt(x)}</span></li>`})"
assert s.count(a) == 1, s.count(a)
s = s.replace(a, b)
s = s.replace('<script src="/library/kt.js"></script>', '<script src="/library/rpk.js"></script>\n<script src="/library/kt.js"></script>', 1)
css = ('<style>/* v135: Most reported labels */.rpk{display:inline-block;margin:0 6px 0 0;padding:1px 5px;'
       'font:700 calc(10px*var(--k,1))/1.5 var(--mono);letter-spacing:.06em;text-transform:uppercase;vertical-align:1px;border:1.2px solid}'
       '.rpk-g{color:#2F6B24;background:#EAF5E4;border-color:#4E9A3E}.rpk-s{color:#9B2A1E;background:#FCE9E6;border-color:#C0392B}'
       '.rpk-m{color:#7A5600;background:#FFF4D1;border-color:#C9A100}.rpk-n{color:#4A5480;background:#EEF0F8;border-color:#9AA0C8}</style>\n')
s = s.replace('</head>', css + '</head>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v135 (27 Nov 2026, built on v134, kept): every Most reported line now carries a label, Helped / Side effect / Mixed / Use note, so a line like "Anxiety" or "Low mood" can no longer read as a benefit. Labels in /library/rpk.js, 407 lines sorted by hand. No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
for f in ['index.html', 'rpk.js']: shutil.copy(f'{dst}/{f}', f'library/{f}')
print('ok v135')
