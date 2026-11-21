#!/usr/bin/env python3
"""Publish the four research files as readable notes pages, in the existing notes style.
/library/goals/notes/antibiotics/  (damage + replenish)
/library/goals/notes/microbiome/   (testing + engraftment)
The editor is never named: the site is anonymous."""
import os, re, html, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root (this script lives in tools/)
RES = '/home/claude/research'

# reuse the existing notes stylesheet verbatim so every notes page matches
src = open(os.path.join(REPO, 'library/goals/notes/gut/index.html'), encoding='utf8').read()
CSS = src[src.find('<style>') + 7:src.find('</style>')]


def md2html(md):
    """Small markdown renderer: headings, tables, lists, bold/italic/code, links, paragraphs."""
    out, lines, i = [], md.split('\n'), 0
    def inline(s):
        s = html.escape(s, quote=False)
        s = re.sub(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', r'<a href="\2" target="_blank" rel="noopener">\1</a>', s)
        s = re.sub(r'(?<![\w/])(https?://[^\s<>\]]+[^\s<>\].,;])', r'<a href="\1" target="_blank" rel="noopener">\1</a>', s)
        s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
        s = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'<i>\1</i>', s)
        s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
        def _tag(m):
            kw, rest = m.group(1).lower(), m.group(2).strip(' ,;:')
            tag = '<span class="tg t-%s">%s</span>' % (kw, kw)
            return tag + (' <span class="tgx">%s</span>' % rest if rest else '')
        s = re.sub(r'\[(verified|reported|inferred|speculated|gap|flag)([^\]]*)\]', _tag, s)
        return s
    while i < len(lines):
        ln = lines[i]
        if not ln.strip():
            i += 1; continue
        if ln.startswith('|') and i + 1 < len(lines) and set(lines[i + 1].replace('|', '').strip()) <= set('-: '):
            hdr = [c.strip() for c in ln.strip('|').split('|')]
            i += 2
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                rows.append([c.strip() for c in lines[i].strip('|').split('|')]); i += 1
            out.append('<div class="tw"><table><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in hdr) +
                       '</tr></thead><tbody>' +
                       ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in rows) +
                       '</tbody></table></div>')
            continue
        m = re.match(r'^(#{1,4})\s+(.*)$', ln)
        if m:
            lv = len(m.group(1))
            txt = inline(m.group(2))
            if lv == 1:
                i += 1; continue  # page title handled separately
            hid = re.sub(r'[^a-z0-9]+', '-', re.sub('<[^>]+>', '', m.group(2)).lower()).strip('-')[:60]
            out.append(f'<h{min(lv,4)} id="{hid}">{txt}</h{min(lv,4)}>')
            i += 1; continue
        if re.match(r'^\s*([-*]|\d+\.)\s+', ln):
            ordered = bool(re.match(r'^\s*\d+\.', ln))
            items = []
            while i < len(lines) and re.match(r'^\s*([-*]|\d+\.)\s+', lines[i]):
                items.append(inline(re.sub(r'^\s*([-*]|\d+\.)\s+', '', lines[i]))); i += 1
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(f'<li>{x}</li>' for x in items) + f'</{tag}>')
            continue
        if ln.strip() == '---':
            out.append('<hr>'); i += 1; continue
        buf = []
        while i < len(lines) and lines[i].strip() and not re.match(r'^(#{1,4}\s|\s*([-*]|\d+\.)\s|\||---$)', lines[i]):
            buf.append(lines[i]); i += 1
        out.append('<p>' + inline(' '.join(buf)) + '</p>')
    return '\n'.join(out)


EXTRA = '''
.tg{display:inline-block;font:600 calc(9px*var(--k))/1 var(--mono);letter-spacing:.04em;text-transform:uppercase;padding:2px 4px;white-space:nowrap;background:#ECE9D2;vertical-align:1px}
.tgx{font-size:calc(11.5px*var(--k));color:var(--ink-soft);overflow-wrap:anywhere}
.tg.t-verified{background:#D6E8CB}.tg.t-reported{background:#EFEDA6}.tg.t-inferred{background:#DCE9FF}
.tg.t-speculated{background:#ECE3F8}.tg.t-gap,.tg.t-flag{background:#FCDADA;color:#C02626}
.tw{overflow-x:auto;margin:8px 0;-webkit-overflow-scrolling:touch}
.tw table{border-collapse:collapse;font-size:calc(12.5px*var(--k));min-width:540px;background:var(--chip)}
.tw th,.tw td{border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);padding:6px 8px;text-align:left;vertical-align:top}
.tw th{font:600 calc(10px*var(--k))/1.2 var(--mono);letter-spacing:.05em;text-transform:uppercase;background:#F2F0CC}
.tw::after{content:"swipe \\2192";display:block;font:500 calc(9px*var(--k))/1 var(--mono);color:var(--ink-soft);padding:4px 0 0}
@media (min-width:760px){.tw::after{content:none}}
code{font:500 calc(12px*var(--k))/1.4 var(--mono);background:var(--chip);padding:1px 4px}
hr{border:0;border-top:1px solid color-mix(in srgb,var(--ink) 18%,transparent);margin:18px 0}
h2{font:700 calc(19px*var(--k))/1.2 var(--display);margin:22px 0 6px}
h3{font:700 calc(15.5px*var(--k))/1.25 var(--display);margin:16px 0 4px}
h4{font:600 calc(13px*var(--k))/1.3 var(--mono);letter-spacing:.04em;text-transform:uppercase;margin:12px 0 4px}
.src-note{font-size:calc(11.5px*var(--k));color:var(--ink-soft);margin:14px 0 0}
'''

PAGES = [
 dict(slug='antibiotics', title='Antibiotics & the gut microbiome',
      desc='Working research notes behind the Antibiotics & your gut case page: what a course does, how recovery runs, drug by drug, and what helps.',
      page='/library/goals/antibiotics/', pagename='Antibiotics & your gut',
      files=[('What a course does, and how recovery runs', 'Antibiotics Damage Research v1.md'),
             ('What helps during and after', 'Replenish Research v1.md')]),
 dict(slug='microbiome', title='Microbiome testing & adding strains',
      desc='Working research notes behind the Microbiome testing goal page: how the tests work, how much labs disagree, and whether added strains stay.',
      page='/library/aims/microbiome/', pagename='Microbiome testing & adding strains',
      files=[('Testing: methods, accuracy, what it can guide', 'Microbiome Testing Research v1.md'),
             ('Adding strains: does anything stick', 'Engraftment Research v1.md')]),
]

for pg in PAGES:
    body = []
    for heading, fn in pg['files']:
        md = open(os.path.join(RES, fn), encoding='utf8').read()
        # strip the editor-only brand list: never published
        md = re.split(r'\n## For editor only', md)[0]
        # keep brand names out of the published notes; published trial names stay
        md = md.replace('(e.g. GI-MAP style, also hospital GI pathogen panels)',
                        '(commercial practitioner panels, and hospital GI pathogen panels)')
        md = md.replace('search "GI-MAP qPCR validation" returned 0',
                        'a search for validation of a named commercial panel returned 0')
        hid = re.sub(r'[^a-z0-9]+', '-', heading.lower()).strip('-')
        body.append(f'<h2 class="pt" id="{hid}">{html.escape(heading)}</h2>')
        body.append(md2html(md))
    out = f'''<!doctype html>
<!-- Research notes: {html.escape(pg['title'])}, from the 22 Nov 2026 research sweep. Working notes, published as a draft for review. -->
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<meta name="description" content="{html.escape(pg['desc'], quote=True)}">
<title>{html.escape(pg['title'])} · Bare Signals</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>{CSS}{EXTRA}</style>
</head><body>
<div class="w">
<p class="crumb"><a href="/library/">Library</a> · <a href="/library/goals/">Cases</a> · Notes</p>
<h1>{html.escape(pg['title'])}</h1>
<div class="meta"><span class="mt dr">Draft</span><span class="mt">Research notes</span><span class="mt">22 Nov 2026</span></div>
<p class="lead">Working notes behind <a href="{pg['page']}">{html.escape(pg['pagename'])}</a>. These are the raw research files, published as they were written, so the page can be checked against them. Confidence tags are on every claim: <span class="tg t-verified">verified</span> means the primary source was read in this pass, <span class="tg t-reported">reported</span> a secondary source, <span class="tg t-inferred">inferred</span> reasoning from the data, <span class="tg t-speculated">speculated</span> plausible and untested. Not medical advice, and no dosing instructions.</p>
{''.join(body)}
<p class="src-note">Written by the editor from primary sources on 22 November 2026. Gaps and unreachable sources are listed at the end of each section on purpose: they are the next pass's work.</p>
<p class="back"><a href="{pg['page']}">{html.escape(pg['pagename'])}</a> · <a href="/library/goals/">All cases</a></p>
</div>
<script src="/nav.js" defer></script>
<script>addEventListener('bs-text',function(e){{document.documentElement.style.setProperty('--k',e.detail.k)}})</script>
</body></html>
'''
    d = os.path.join(REPO, 'library/goals/notes', pg['slug'])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w', encoding='utf8').write(out)
    print('wrote', d, len(out), 'bytes')
