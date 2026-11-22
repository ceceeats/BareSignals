"""Library v128 (22 Nov 2026, built on v127, kept): How it works, animated, the energy set (SS-31, MOTS-c, 5-Amino-1MQ).
Engine /library/anim.js v2 (v1 kept in /library/v123d/anim.js): no "In people" end card, no hedge line above the animation;
study steps show what happened in rats and in a dish as their own animated scenes, each linked to its paper; stories live one
file each at /library/anim/<slug>.js. Each compound with a story gets its own page /library/how/<slug>/ (animation plus every
step written out). The Guide's Full read is the Library Full read, so it gets the same animation. No compound facts changed."""
import os, shutil, re, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
W = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work'
src, dst = 'library/v127', 'library/v128'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
shutil.copy(f'{W}/eng/anim.js', f'{dst}/anim.js')
os.makedirs(f'{dst}/anim', exist_ok=True)
slugs = re.search(r"var HAS=\{([^}]*)\}", open(f'{W}/eng/anim.js').read()).group(1)
HAS = dict(re.findall(r"'([^']+)':'([^']+)'", slugs))
for f in os.listdir(f'{W}/anim'):
    shutil.copy(f'{W}/anim/{f}', f'{dst}/anim/{f}')
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
old_lead = "'<p class=\"alead123d\">What rat and cell studies suggest happens, one step at a time. Each step shows where its evidence comes from.</p><div class=\"anim123d\"></div></section></div>';"
if old_lead in s: s = s.replace(old_lead, "'<div class=\"anim123d\"></div><p class=\"afull124\"><a href=\"/library/how/'+s+'/\">Open its own page</a></p></section></div>';")
s = re.sub(r"var HAS=\{[^}]*\},busy=0;", lambda m: "var HAS=%s,busy=0;" % ('{' + ','.join("'%s':'%s'" % kv for kv in HAS.items()) + '}'), s, count=1)
s = s if '.afull124{' in s else s.replace('.alead123d{', '.afull124{margin:6px 0 0;font-size:calc(13.5px*var(--k,1))}.afull124 a{color:#2F5BE0;text-decoration:underline;text-underline-offset:2px}.alead123d{')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v128 (22 Nov 2026, built on v127, kept): the energy set gets How it works, animated, to the standard. SS-31 (mitochondrion: binds cardiolipin, holds cristae, ATP up/ROS down; animal study; honest human trials that missed their controlled endpoints). MOTS-c (mitochondrial-derived peptide: AMPK, glucose in/fat burned, nucleus; mouse endurance; no human trial). 5-Amino-1MQ (fat cell: blocks NNMT, frees NAD+, burns fat; mouse-only). Engine v5 (added slugs + cache-bust; logic unchanged). Matches the Library (verified). No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
# publish the Library (library root is published by copy, as v123d did)
shutil.copy(p, 'library/index.html'); shutil.copy(f'{dst}/anim.js', 'library/anim.js')
for f in os.listdir(f'{dst}/anim'): shutil.copy(f'{dst}/anim/{f}', f'library/anim/{f}')
# own page per compound
T = open(f'{W}/how.html', encoding='utf8').read()
for slug, scene in HAS.items():
    if slug == 'antibiotics':  # a Case, mounted on its Case page; no standalone how/ page (keep parity with origin)
        continue
    os.makedirs(f'library/how/{slug}', exist_ok=True)
    open(f'library/how/{slug}/index.html', 'w', encoding='utf8').write(T.replace('{{SLUG}}', slug).replace('{{SCENE}}', scene))
print('ok', list(HAS))
