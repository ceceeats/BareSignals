"""20 Nov 2026: one master for compound data. Pages that pinned an old Library copy now read the live Library
at its plain address (/library/data.js, page.js, merge.js) and Blood at /blood/lib.js, so every new Library
version reaches them without a rebuild. Dosage v33 (on v32), Protocol v41 (on v40), Made v11 (on v10)."""
import os, re, shutil
os.chdir('/home/claude/baresignals')
def bump(sec, old, new, note, subs):
    src, dst = f'{sec}/{old}', f'{sec}/{new}'
    if os.path.exists(dst): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    p = f'{dst}/index.html'; t = open(p, encoding='utf8').read()
    for a, b in subs:
        n = len(re.findall(a, t)); assert n, (sec, a); t = re.sub(a, b, t)
    t = t.replace('<!doctype html>', '<!doctype html>\n<!-- ' + note + ' -->', 1)
    open(p, 'w', encoding='utf8').write(t)
    st = f'{sec}/redirect-stub.html'
    if os.path.exists(st):
        s = open(st, encoding='utf8').read(); open(st, 'w', encoding='utf8').write(s.replace(old + '/', new + '/'))
    return t
LIBS = [(r'/library/v\d+/(data|page|merge)\.js', r'/library/\1.js'), (r'/blood/v\d+/lib\.js', '/blood/lib.js')]
bump('dosage', 'v32', 'v33', 'Dosage v33 (20 Nov 2026, built on v32, kept): reads the live Library (/library/data.js, page.js, merge.js) instead of the pinned v101 copy, so every Library update shows here at once', LIBS)
bump('protocol', 'v40', 'v41', 'Protocol v41 (20 Nov 2026, built on v40, kept): reads the live Library instead of the pinned v85 copy (adds metronidazole, doxycycline, tranexamic acid, dexketoprofen; 21 summaries and the thymosin alpha-1 dose catch up)', LIBS)
t = bump('made', 'v10', 'v11', 'Made v11 (20 Nov 2026, built on v10, kept): reads the live Library instead of the pinned v49 copy', [(r'<script src="/library/v\d+/data\.js"></script>', '<script src="/library/data.js"></script><script src="/library/page.js"></script><script src="/library/merge.js"></script>')])
open('made/index.html', 'w', encoding='utf8').write(t)
with open('made/CHANGELOG.md', 'a', encoding='utf8') as f: f.write('\n## v11 (20 Nov 2026) at /made/v11/\nReads the live Library (/library/data.js) instead of the pinned v49 copy.\n')
print('ok')
