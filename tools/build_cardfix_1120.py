"""20 Nov 2026: card claims corrected after the Skin, Nails and Hair research (Skin Community v1, Nails Research v1, Hair Research v3).
- GLOW and KLOW: 'Hair and nail gains reported' had no first-hand report behind it (0 found outside sellers). Now says so.
- AHK-Cu: a 'human, small cosmetic use' test row had no study behind it; the only human data is follicles kept alive in a dish (Pyo 2007), now listed as such.
- Collagen peptides: 'Users report stronger nails and hair' now carries the one open study of nails (25 people: 12% faster growth, 42% fewer broken nails, no placebo) and says hair reports are mixed.
Same text everywhere the card shows: Library v120 (built on v119, kept), Guide v90 (built on Guide v89 / home v89, kept), Organs v2 (built on v1, kept). Then tools/publish_live.py."""
import os, shutil
REPO = '/home/claude/baresignals'
os.chdir(REPO)
REPL = [
    ('Hair and nail gains reported, GHK-Cu side', 'GHK-Cu side; no first-hand hair or nail reports found yet'),
    ('The only skin and collagen signal in the vial; hair and nail effects', 'The only skin and collagen signal in the vial'),
    ('Skin and collagen signal; hair and nails', 'Skin and collagen signal'),
    ('Hair and nail gains reported', 'GHK-Cu side; no first-hand hair or nail reports found yet'),
    ('Users report stronger nails and hair', 'Nails: 12% faster growth, 42% fewer breaks in one open study of 25 (no placebo); hair reports mixed'),
]
AHK_OLD = [('["Hair","Small cosmetic use","human"]', '["Hair","Human follicles kept alive in a dish grew longer","lab"]'),
           ('["Hair", "Small cosmetic use", "human"]', '["Hair", "Human follicles kept alive in a dish grew longer", "lab"]')]

def fix(path):
    s = open(path, encoding='utf8').read(); n = 0
    for a, b in REPL + AHK_OLD:
        c = s.count(a); n += c; s = s.replace(a, b)
    open(path, 'w', encoding='utf8').write(s)
    return n

def stamp(path, comment):
    s = open(path, encoding='utf8').read()
    if s.startswith('<!doctype html>'):
        s = s.replace('<!doctype html>', '<!doctype html>' + ('\n' if s[15:16] == '\n' else '') + f'<!-- {comment} -->' + ('' if s[15:16] == '\n' else ''), 1)
    open(path, 'w', encoding='utf8').write(s)

# Library v120
src, dst = 'library/v119', 'library/v120'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
n = fix(f'{dst}/data.js'); assert n >= 5, n
stamp(f'{dst}/index.html', 'Library v120 (20 Nov 2026, built on v119, kept): card claims corrected (GLOW, KLOW hair and nails; AHK-Cu human row; collagen nails), data.js only.')
for f in ('data.js', 'index.html'): shutil.copy(f'{dst}/{f}', f'library/{f}')
print('library', n)

# Guide v90
src, dst = 'home/v89', 'home/v90'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
n = fix(f'{dst}/index.html'); assert n >= 5, n
s = open(f'{dst}/index.html', encoding='utf8').read()
s = s.replace('/home/v89/sheet.js', '/home/v90/sheet.js')
s = s.replace('<!doctype html>', '<!doctype html><!-- Guide v90 (20 Nov 2026, live, built on v89, kept): card claims corrected (GLOW, KLOW hair and nails; AHK-Cu human row; collagen nails). -->', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)
shutil.copy(f'{dst}/index.html', 'index.html')
print('guide', n)

# Organs v2
src, dst = 'curious/organs/v1', 'curious/organs/v2'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
n = fix(f'{dst}/index.html'); assert n >= 1, n
s = open(f'{dst}/index.html', encoding='utf8').read()
s = s.replace('<!DOCTYPE html>\n', '<!DOCTYPE html>\n<!-- Organs v7 (20 Nov 2026, built on v6, kept at /curious/organs/v1/): collagen note corrected (nails: one open study of 25; hair mixed). -->\n', 1).replace('<!doctype html>\n', '<!doctype html>\n<!-- Organs v7 (20 Nov 2026, built on v6, kept at /curious/organs/v1/): collagen note corrected (nails: one open study of 25; hair mixed). -->\n', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)
stub = 'curious/organs/redirect-stub.html'
t = open(stub, encoding='utf8').read().replace("v1/", "v2/")
open(stub, 'w', encoding='utf8').write(t)
print('organs', n)
