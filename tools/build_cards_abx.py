#!/usr/bin/env python3
"""Add the two new pages to cards.js so they appear on the Library shelves and in search."""
import os, re, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root (this script lives in tools/)
f = os.path.join(REPO, 'cards.js')
t = open(f, encoding='utf8').read()

m = re.search(r'window\.BS_CARDS=', t)
start = m.end()
# the object runs to the final ';' of the file
end = t.rstrip().rfind(';')
data = json.loads(t[start:end])

ABX_ART = ('<rect x="0" y="40" width="120" height="6" fill="#CAF5F7"/>'
 '<g fill="#FFF3E7" stroke="#E7B4A2" stroke-width=".9">'
 '<rect x="0" y="46" width="15" height="14"/><rect x="15" y="46" width="15" height="14"/>'
 '<rect x="30" y="46" width="15" height="14"/><rect x="45" y="46" width="15" height="14"/>'
 '<rect x="60" y="46" width="15" height="14"/><rect x="75" y="46" width="15" height="14"/>'
 '<rect x="90" y="46" width="15" height="14"/><rect x="105" y="46" width="15" height="14"/></g>'
 '<g fill="#AACC96"><rect x="6" y="10" width="11" height="4.6" rx="2.3"/><rect x="24" y="22" width="11" height="4.6" rx="2.3"/></g>'
 '<g fill="#E1DE62"><rect x="14" y="28" width="10" height="4.4" rx="2.2"/><rect x="33" y="9" width="10" height="4.4" rx="2.2"/></g>'
 '<g fill="#99ACFF"><ellipse cx="9" cy="21" rx="5.2" ry="3.6"/><ellipse cx="37" cy="30" rx="5.2" ry="3.6"/></g>'
 '<g fill="#87CFC5"><circle cx="22" cy="14" r="3.6"/><circle cx="43" cy="21" r="3.6"/></g>'
 '<g fill="#FF5050"><rect class="a-p" x="74" y="12" width="11" height="4.6" rx="2.3"/>'
 '<rect class="a-p" style="animation-delay:.6s" x="92" y="25" width="11" height="4.6" rx="2.3"/>'
 '<rect class="a-p" style="animation-delay:1.2s" x="104" y="14" width="11" height="4.6" rx="2.3"/>'
 '<rect class="a-p" style="animation-delay:1.8s" x="83" y="33" width="11" height="4.6" rx="2.3"/></g>'
 '<g fill="none" stroke="#6B76A8" stroke-width="1" stroke-dasharray="2.2 1.8">'
 '<rect x="70" y="24" width="11" height="4.6" rx="2.3"/><rect x="95" y="9" width="11" height="4.6" rx="2.3"/>'
 '<rect x="108" y="30" width="11" height="4.6" rx="2.3"/></g>'
 '<g transform="rotate(-20 60 24)"><rect x="52" y="18" width="18" height="11" rx="5.5" fill="#FFFFF4" stroke="#3E4A80" stroke-width="1.3"/>'
 '<path d="M61 18v11" stroke="#3E4A80" stroke-width="1.3"/>'
 '<path d="M52 23.5a5.5 5.5 0 0 1 5.5-5.5H61v11h-3.5A5.5 5.5 0 0 1 52 23.5z" fill="#DB6830" opacity=".5"/></g>'
 '<text x="4" y="7" font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">BEFORE</text>'
 '<text x="66" y="7" font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">AFTER</text>')

MB_ART = ('<defs><clipPath id="mbc"><circle cx="40" cy="27" r="18"/></clipPath></defs>'
 '<circle cx="40" cy="27" r="19" fill="#FFFFF4" stroke="#3E4A80" stroke-width="2.2"/>'
 '<path d="M53 40 L68 55" stroke="#3E4A80" stroke-width="3.4" stroke-linecap="round"/>'
 '<g clip-path="url(#mbc)">'
 '<rect x="28" y="18" width="10" height="4.2" rx="2.1" fill="#AACC96"/>'
 '<rect x="40" y="30" width="10" height="4.2" rx="2.1" fill="#E1DE62"/>'
 '<ellipse cx="32" cy="33" rx="5" ry="3.4" fill="#99ACFF"/><circle cx="47" cy="21" r="3.4" fill="#87CFC5"/>'
 '<rect x="26" y="26" width="10" height="4.2" rx="2.1" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.2 1.8"/></g>'
 '<g font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">'
 '<text x="76" y="16">LAB A</text><text x="76" y="30">LAB B</text><text x="76" y="44">LAB C</text></g>'
 '<g><rect class="a-p" x="98" y="11" width="18" height="5" fill="#AACC96"/>'
 '<rect class="a-p" style="animation-delay:.7s" x="98" y="25" width="10" height="5" fill="#E1DE62"/>'
 '<rect class="a-p" style="animation-delay:1.4s" x="98" y="39" width="15" height="5" fill="#FF5050"/></g>')

CASE = {"id": "antibiotics", "name": "Antibiotics & your gut",
        "url": "/library/goals/antibiotics/", "art": "abx", "stat": "9 species",
        "line": "everyone carried were still missing at 6 months. Most of the rest came back by itself in weeks.",
        "live": 1}
GOAL = {"id": "microbiome", "name": "Microbiome testing",
        "url": "/library/aims/microbiome/", "art": "mbtest", "stat": "3 of 1,208",
        "line": "organisms agreed across 7 companies testing one identical stool sample.",
        "live": 1}

changed = []
if not any(c.get('id') == CASE['id'] for c in data['cases']):
    data['cases'].append(CASE); changed.append('case')
if not any(g.get('id') == GOAL['id'] for g in data['goals']):
    data['goals'].append(GOAL); changed.append('goal')
data.setdefault('art', {})['abx'] = ABX_ART
data['art']['mbtest'] = MB_ART

out = (t[:start] + json.dumps(data, ensure_ascii=False) + t[end:])
hdr = '/* Bare Signals cards v1.2 (22 Nov 2026): Antibiotics & your gut case and Microbiome testing goal added. */\n'
if 'v1.2 (22 Nov 2026)' not in out:
    out = hdr + out
open(f, 'w', encoding='utf8').write(out)
print('cards.js updated:', changed, 'cases now', len(data['cases']), 'goals now', len(data['goals']))
