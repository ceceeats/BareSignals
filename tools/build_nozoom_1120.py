"""20 Nov 2026, from the messy visitor test: boxes under 16px make the iPhone zoom in when tapped.
Protocol v42 (on v41): peptide search 14px, name 14px, morning/midday/evening time boxes 12.5px -> 16px on phone.
Draw v37 (on v36): unit converter box 15px and mixed-date box 14px -> 16px on phone."""
import os, shutil
os.chdir('/home/claude/baresignals')
CSS = '<style>/* no iPhone zoom: every box 16px on phone */@media (max-width:899px){input:not([type=checkbox]):not([type=radio]):not([type=range]),select,textarea{font-size:16px!important}html body textarea#intro,html body input#fq,html body input#wname,html body input#shr{font-size:16px!important}}</style></head>'
def bump(sec, old, new, note, live_root):
    src, dst = f'{sec}/{old}', f'{sec}/{new}'
    if os.path.exists(dst): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    p = f'{dst}/index.html'; t = open(p, encoding='utf8').read()
    t = t.replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1).replace('</head>', CSS, 1)
    open(p, 'w', encoding='utf8').write(t)
    st = f'{sec}/redirect-stub.html'
    if os.path.exists(st):
        s = open(st, encoding='utf8').read(); open(st, 'w', encoding='utf8').write(s.replace(old + '/', new + '/'))
    if live_root: open(f'{sec}/index.html', 'w', encoding='utf8').write(t)
bump('protocol', 'v41', 'v42', 'Protocol v42 (20 Nov 2026, built on v41, kept): every box 16px on phone so the iPhone never zooms in (peptide search, name, morning/midday/evening times were 12.5 to 14px)', False)
bump('draw', 'v36', 'v37', 'Draw v37 (20 Nov 2026, built on v36, kept): every box 16px on phone so the iPhone never zooms in (unit converter 15px, mixed date 14px)', True)
print('ok')
