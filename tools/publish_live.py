"""Publish every section's newest version at its plain address (20 Nov 2026).
For each section root whose index.html is a redirect stub to vN/, copy vN's files into the root (stub kept as
redirect-stub.html, version folders untouched), strip one '../' from relative paths in the copied files, then point
live links that name a current version (/dosage/v30/) at the plain address (/dosage/). Re-run after any new version."""
import os, re, shutil, glob
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # the clone this script sits in
os.chdir(REPO)
CUR = {}
for f in glob.glob('**/index.html', recursive=True):
    d = os.path.dirname(f)
    if re.search(r'(^|/)v\d+(/|$)', d) or d.startswith('scan') or d in ('', 'go', 'library', 'library/cases', 'encyclopedia'):
        continue
    stub = f'{d}/redirect-stub.html' if os.path.exists(f'{d}/redirect-stub.html') else f
    t = open(stub, encoding='utf8').read()
    if len(t) > 2000: continue
    m = re.search(r"""(?:replace\(\s*['"]|url=)(?:/%s/)?(v\d+)/""" % re.escape(d), t)
    if not m: continue
    v = m.group(1)
    if not os.path.isdir(f'{d}/{v}'): continue
    CUR[d] = v
    if stub == f: shutil.copy(f, f'{d}/redirect-stub.html')
    for name in os.listdir(f'{d}/{v}'):
        src = f'{d}/{v}/{name}'
        if os.path.isdir(src):
            if not os.path.exists(f'{d}/{name}'): shutil.copytree(src, f'{d}/{name}')
            continue
        if name.endswith(('.html', '.js', '.css', '.json')):
            s = open(src, encoding='utf8').read()
            s = re.sub(r'''(["'(=]\s*)\.\./''', r'\1', s)
            if name == 'index.html':
                s = s.replace('<!doctype html>', f'<!doctype html>\n<!-- Live copy of {d}/{v}/ (published by tools/publish_live.py; edit the version, then re-run) -->', 1) if s.lower().startswith('<!doctype html>') else f'<!-- Live copy of {d}/{v}/ -->\n' + s
            open(f'{d}/{name}', 'w', encoding='utf8').write(s)
        else:
            shutil.copy(src, f'{d}/{name}')
# live files: root-level pages and shared scripts outside version folders
LIVE = [f for f in glob.glob('**/*', recursive=True)
        if os.path.isfile(f) and f.endswith(('.html', '.js')) and not re.search(r'(^|/)v\d+(\.\d+)?(/|\.js$)', f)
        and not f.startswith(('tools/', 'scan/')) and not f.endswith('redirect-stub.html')]
pat = re.compile(r'/(%s)/(v\d+)/' % '|'.join(re.escape(d) for d in sorted(CUR, key=len, reverse=True)))
changed = []
for f in LIVE:
    s = open(f, encoding='utf8').read()
    n = pat.sub(lambda m: f'/{m.group(1)}/' if CUR[m.group(1)] == m.group(2) else m.group(0), s)
    if n != s:
        open(f, 'w', encoding='utf8').write(n); changed.append(f)
print('published', len(CUR), CUR)
print('links rewritten in', changed)

# --- No version numbers in reader-visible text (20 Nov 2026). Version folders stay untouched; only live pages are cleaned.
PASS = {'1': 'first pass', '2': 'second pass', '3': 'third pass', '4': 'fourth pass', '5': 'fifth pass'}
def _clean_text(t0):
    t = t0
    t = re.sub(r'\s*·\s*<?[vV]\d+(\.\d+)?\b', '', t)                                  # " · V2"
    t = re.sub(r'(^|\s)[vV]\d+\s*·\s*', r'\1', t)                                    # "v37 · Draft"
    t = re.sub(r'\[(v\d+)\s*(fix|correction)', r'[\2', t)                               # [v2 fix
    t = re.sub(r'\[\s*v\d+\s*\]\s?', '', t)                                             # [v2]
    t = re.sub(r'(verified|reported|re-checked|re-opened|closed|Closed)\s+v\d+\b', r'\1', t)
    t = re.sub(r'\b((?:[A-Z][\w-]*|GLP1|PCOS|ADHD)(?:\s(?:[A-Z][\w-]*|GLP1|PCOS|ADHD))*)\s+v\d+(?:\.md)?\b', r'\1', t)  # "Achilles Research v3" -> "Achilles Research"
    t = re.sub(r'\b(research page|page|file|list)\s+v\d+\b', r'\1', t, flags=re.I)
    t = re.sub(r'\bv(\d)\b', lambda m: PASS.get(m.group(1), 'an earlier pass'), t)    # standalone v2 -> second pass
    t = re.sub(r'\b(first|second|third|fourth|fifth) pass (first|second|third|fourth|fifth) pass\b', r'\1 pass', t)
    t = re.sub(r'\bV\d+\b', '', t)                                                      # stray capital labels
    if t != t0: t = re.sub(r'(?<=\S) {2,}(?=\S)', ' ', t)
    return t
def nover(html):
    out, parts = [], re.split(r'(<script\b.*?</script>|<style\b.*?</style>|<[^>]+>)', html, flags=re.S | re.I)
    for p in parts:
        out.append(p if p.startswith('<') else _clean_text(p))
    h = ''.join(out)
    h = re.sub(r'(\s*·\s*<a href="/[a-z/-]+/v\d+/">[^<]*</a>)+', '', h)                # footer lists of old versions
    return h
SKIP = ('draw', 'hype', 'ledger', 'k', 'md', 'px', 'home', 'scan', 'S', 'tools', 'plan/mock', 'library/proposals', 'library/mock-card', 'library/aims/v1b')
cleaned = []
for f in glob.glob('**/index.html', recursive=True) + ['library/questions.html', 'index.html']:
    d = os.path.dirname(f)
    if re.search(r'(^|/)v\d+[\w-]*(/|$)', d) or d.startswith(SKIP) or not os.path.exists(f): continue
    s = open(f, encoding='utf8').read()
    if len(s) < 2000: continue
    n = nover(s)
    if n != s:
        open(f, 'w', encoding='utf8').write(n); cleaned.append(f)
print('version text cleaned in', len(cleaned), cleaned)
