"""Library v117 (20 Nov 2026, live), built on v116 (kept).
1. Supplement cards' Full read link pointed at /supplements/v22/ (an old, versioned address, four versions behind the live
   Supplements page). It now opens the live page at /supplements/#/<id>, so links never carry a version number."""
import os, shutil
REPO = '/home/claude/baresignals'
R = f'{REPO}/library'
SRC, DST = f'{R}/v116', f'{R}/v117'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
old = 'href="/supplements/v22/#/${o.sid}"'
assert s.count(old) == 1, s.count(old)
s = s.replace(old, 'href="/supplements/#/${o.sid}"')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v117 (20 Nov 2026, built on v116, kept): supplement Full read links open the live /supplements/ page (was /supplements/v22/). -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
# Only index.html changed; the live library/questions.html is newer than the v116 copy, so leave the other files alone.
shutil.copy(f'{DST}/index.html', f'{R}/index.html')
