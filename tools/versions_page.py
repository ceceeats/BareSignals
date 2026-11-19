"""Private /versions/ page (20 Nov 2026): for every section, which version is live and a link to every kept version,
newest first, with the first line of what changed. Not linked anywhere, noindex. Re-run after each new version."""
import os, re, glob, html
REPO = '/home/claude/baresignals'
os.chdir(REPO)
NAMES = {'library': 'Library', 'home': 'Guide', 'blood': 'Blood Work', 'dosage': 'Dosage', 'supplements': 'Supplements',
         'protocol': 'Protocol', 'plan': 'Plan', 'water': 'Mixing water', 'aminos': 'Aminos', 'made': 'How peptides are made',
         'curious': 'Curious', 'titrate': 'Titrate', 'scan': 'Scan and calculator', 'library/goals': 'Cases index',
         'library/aims': 'Goals index'}
def note(f):
    try: s = open(f, encoding='utf8').read(4000)
    except Exception: return ''
    m = re.search(r'<!--\s*(.*?)-->', s, re.S)
    t = re.sub(r'\s+', ' ', m.group(1)).strip() if m else ''
    return t[:220] + ('…' if len(t) > 220 else '')
def live_of(d):
    f = f'{d}/index.html' if d != 'home' else 'index.html'
    if not os.path.exists(f): return None
    s = open(f, encoding='utf8').read(3000)
    m = re.search(r'Live copy of [\w/-]*?/(v\d+)/', s) or re.search(r"replace\(['\"](?:/[\w/-]+/)?(v\d+)/", s)
    if m: return m.group(1)
    if d == 'library':
        m = re.search(r'Library (v\d+)', s); return m.group(1) if m else None
    if d == 'home':
        m = re.search(r'/home/(v\d+)/sheet\.js', open(f, encoding='utf8').read()); return m.group(1) if m else None
    m = re.search(r'\b(v\d+)\b', s); return m.group(1) if m else None
secs = []
for d in sorted({os.path.dirname(os.path.dirname(p)) for p in glob.glob('**/v[0-9]*/index.html', recursive=True)}):
    if not d or d.startswith(('tools', 'S/', 'k')) or re.search(r'/v\d+', d): continue
    vs = sorted({int(m.group(1)) for p in glob.glob(f'{d}/v[0-9]*/index.html') for m in [re.search(r'/v(\d+)/index\.html$', p)] if m}, reverse=True)
    if not vs: continue
    secs.append((d, vs, live_of(d)))
order = ['library', 'home', 'library/goals', 'library/aims', 'supplements', 'blood', 'dosage', 'protocol', 'plan']
secs.sort(key=lambda x: (order.index(x[0]) if x[0] in order else 99, x[0]))
rows = []
for d, vs, live in secs:
    name = NAMES.get(d) or d.split('/')[-1].replace('-', ' ').title()
    plain = '/' if d == 'home' else f'/{d}/'
    items = ''.join(f'<li class="{"on" if live == f"v{v}" else ""}"><a href="/{d}/v{v}/">v{v}</a>{" <b>live</b>" if live == f"v{v}" else ""}<span>{html.escape(note(f"{d}/v{v}/index.html"))}</span></li>' for v in vs)
    rows.append(f'<details{" open" if d in ("library", "home") else ""}><summary><b>{html.escape(name)}</b><span>live {live or "?"} · {len(vs)} kept</span><a href="{plain}">{plain}</a></summary><ol>{items}</ol></details>')
page = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Versions · Bare Signals</title>
<style>body{{margin:0;background:#FFFFE2;color:#3E4A80;font:14px/1.45 system-ui,sans-serif}}.w{{max-width:860px;margin:0 auto;padding:14px 14px 40px}}h1{{font-size:24px;margin:4px 0 2px}}p.s{{margin:0 0 12px;color:#6B76A8;font-size:13px}}
details{{border:1.5px solid #3E4A80;background:#FFFFF4;margin:0 0 8px}}summary{{list-style:none;display:flex;gap:10px;align-items:baseline;padding:10px 12px;cursor:pointer;flex-wrap:wrap}}summary::-webkit-details-marker{{display:none}}summary b{{font-size:16px}}summary span{{font:12px ui-monospace,monospace;color:#6B76A8}}summary a{{margin-left:auto;font:12px ui-monospace,monospace;color:#5271FF}}
ol{{list-style:none;margin:0;padding:0 12px 8px}}li{{padding:6px 0;border-top:1px solid #E3E0BF;display:grid;grid-template-columns:52px 1fr;gap:2px 8px}}li a{{font:600 13px ui-monospace,monospace;color:#5271FF}}li b{{grid-column:1;align-self:start;font:600 10px ui-monospace,monospace;color:#fff;background:#DB6830;padding:1px 4px;justify-self:start;text-transform:uppercase}}li span{{grid-column:2;grid-row:1/span 2;font-size:12.5px;color:#3E4A80}}li.on{{background:#FFF6E5}}</style></head>
<body><div class="w"><h1>Versions</h1><p class="s">Private. Which version each page is showing, and every older one kept. Add <b>?ver</b> to any page address to see its version in the corner.</p>{"".join(rows)}</div></body></html>'''
os.makedirs('versions', exist_ok=True)
open('versions/index.html', 'w', encoding='utf8').write(page)
print(len(secs), 'sections')
