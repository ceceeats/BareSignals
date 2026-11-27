"""Library v132 (27 Nov 2026, built on v131, kept): How it works, animated, for Adderall (first prescription medicine
with a story). Scene: the nerve ending. Engine /library/anim.js v5 (v4 kept in /library/v131/anim.js): 'adderall' added
to HAS, story cache-bust v=7; logic unchanged. Own page /library/how/adderall/. No compound facts changed."""
import os, shutil, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
W = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work'
src, dst = 'library/v131', 'library/v132'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
# engine v5
e = open(f'{dst}/anim.js', encoding='utf8').read()
e = e.replace("'mitoprime':'the energy stack'}", "'mitoprime':'the energy stack','adderall':'the nerve ending'}", 1)
e = e.replace(".js?v=6'", ".js?v=7'", 1)
e = ("/* BSAnim v5 (27 Nov 2026, built on v4, kept in /library/v131/anim.js): added 'adderall' to HAS (story at "
     "/library/anim/adderall.js, scene: the nerve ending); story cache-bust bumped to v=7. Engine logic unchanged.\n   v4 note kept below. --- " + e[3:])
assert "'adderall':'the nerve ending'" in e and "v=7'" in e
open(f'{dst}/anim.js', 'w', encoding='utf8').write(e)
shutil.copy(f'{W}/anim/adderall.js', f'{dst}/anim/adderall.js')
# Full read HAS map
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
n0 = s.count("'mitoprime':'the energy stack'},busy=0;")
s = s.replace("'mitoprime':'the energy stack'},busy=0;", "'mitoprime':'the energy stack','adderall':'the nerve ending'},busy=0;")
assert n0 == 1, n0
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v132 (27 Nov 2026, built on v131, kept): Adderall gets How it works, animated (scene: the nerve ending): pulled in by DAT/NET, VMAT2 spills the storage sacs, TAAR1 reverses the pumps and floods the gap, prefrontal focus, the same flood in the reward area (where misuse starts), Moran 2024 psychosis odds (2.68x any dose, ~5.3x above 40 mg/day), ending on Ilieva 2013 (13 tests, no gain for healthy adults as a group, yet they felt sharper). Engine v5 (slug + cache-bust; logic unchanged). Own page /library/how/adderall/. No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
# publish the Library root by copy (as v129 did)
shutil.copy(p, 'library/index.html'); shutil.copy(f'{dst}/anim.js', 'library/anim.js')
shutil.copy(f'{dst}/anim/adderall.js', 'library/anim/adderall.js')
# own How it works page, same template as the others
T = open('library/how/ss-31/index.html', encoding='utf8').read()
T = T.replace("ss-31", "adderall").replace("How it works · the mitochondrion", "How it works · the nerve ending")
os.makedirs('library/how/adderall', exist_ok=True)
open('library/how/adderall/index.html', 'w', encoding='utf8').write(T)
print('ok v132')
