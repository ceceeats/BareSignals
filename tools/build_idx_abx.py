#!/usr/bin/env python3
"""Add the two new pages to the Cases index (v25) and the Goals index (next version),
and link the notes pages. Old index versions are kept."""
import os, re, shutil

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root (this script lives in tools/)

ABX_ART = ('<svg class="bcart" viewBox="0 0 120 60" aria-hidden="true">'
 '<rect x="0" y="40" width="120" height="6" fill="#CAF5F7"/>'
 '<g fill="#FFF3E7" stroke="#E7B4A2" stroke-width=".9">'
 '<rect x="0" y="46" width="15" height="14"/><rect x="15" y="46" width="15" height="14"/>'
 '<rect x="30" y="46" width="15" height="14"/><rect x="45" y="46" width="15" height="14"/>'
 '<rect x="60" y="46" width="15" height="14"/><rect x="75" y="46" width="15" height="14"/>'
 '<rect x="90" y="46" width="15" height="14"/><rect x="105" y="46" width="15" height="14"/></g>'
 # left: full community
 '<g fill="#AACC96"><rect x="6" y="10" width="11" height="4.6" rx="2.3"/><rect x="24" y="22" width="11" height="4.6" rx="2.3"/></g>'
 '<g fill="#E1DE62"><rect x="14" y="28" width="10" height="4.4" rx="2.2"/><rect x="33" y="9" width="10" height="4.4" rx="2.2"/></g>'
 '<g fill="#99ACFF"><ellipse cx="9" cy="21" rx="5.2" ry="3.6"/><ellipse cx="37" cy="30" rx="5.2" ry="3.6"/></g>'
 '<g fill="#87CFC5"><circle cx="22" cy="14" r="3.6"/><circle cx="43" cy="21" r="3.6"/></g>'
 # right: the gap, blooms
 '<g fill="#FF5050"><rect x="74" y="12" width="11" height="4.6" rx="2.3"/><rect x="92" y="25" width="11" height="4.6" rx="2.3"/>'
 '<rect x="104" y="14" width="11" height="4.6" rx="2.3"/><rect x="83" y="33" width="11" height="4.6" rx="2.3"/></g>'
 '<g fill="none" stroke="#6B76A8" stroke-width="1" stroke-dasharray="2.2 1.8">'
 '<rect x="70" y="24" width="11" height="4.6" rx="2.3"/><rect x="95" y="9" width="11" height="4.6" rx="2.3"/>'
 '<rect x="108" y="30" width="11" height="4.6" rx="2.3"/></g>'
 # the pill, crossing the middle
 '<g transform="rotate(-20 60 24)"><rect x="52" y="18" width="18" height="11" rx="5.5" fill="#FFFFF4" stroke="#3E4A80" stroke-width="1.3"/>'
 '<path d="M61 18v11" stroke="#3E4A80" stroke-width="1.3"/><rect x="52" y="18" width="9" height="11" rx="5.5" fill="#DB6830" opacity=".55" stroke="none"/></g>'
 '<text x="4" y="7" font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">BEFORE</text>'
 '<text x="66" y="7" font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">AFTER</text>'
 '</svg>')

MB_ART = ('<svg class="bcart" viewBox="0 0 120 60" aria-hidden="true">'
 '<circle cx="40" cy="27" r="19" fill="#FFFFF4" stroke="#3E4A80" stroke-width="2.2"/>'
 '<path d="M53 40 L68 55" stroke="#3E4A80" stroke-width="3.4" stroke-linecap="round"/>'
 '<g clip-path="url(#mbc)"><g fill="#AACC96"><rect x="28" y="18" width="10" height="4.2" rx="2.1"/></g>'
 '<g fill="#E1DE62"><rect x="40" y="30" width="10" height="4.2" rx="2.1"/></g>'
 '<ellipse cx="32" cy="33" rx="5" ry="3.4" fill="#99ACFF"/><circle cx="47" cy="21" r="3.4" fill="#87CFC5"/>'
 '<rect x="26" y="26" width="10" height="4.2" rx="2.1" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.2 1.8"/></g>'
 '<defs><clipPath id="mbc"><circle cx="40" cy="27" r="18"/></clipPath></defs>'
 # three disagreeing readouts
 '<g font-family="JetBrains Mono,monospace" font-size="5.5" fill="#6B76A8">'
 '<text x="76" y="16">LAB A</text><text x="76" y="30">LAB B</text><text x="76" y="44">LAB C</text></g>'
 '<g><rect x="98" y="11" width="18" height="5" fill="#AACC96"/><rect x="98" y="25" width="10" height="5" fill="#E1DE62"/>'
 '<rect x="98" y="39" width="15" height="5" fill="#FF5050" opacity=".75"/></g>'
 '</svg>')

ABX_CARD = ('<a class="bc" href="/library/goals/antibiotics/" style="--bc:#AACC96">' + ABX_ART +
 '<b>Antibiotics &amp; your gut</b><span class="bs">9 species</span>'
 '<span class="bl">everyone carried were still missing at 6 months. Most of the rest came back by itself in weeks.</span><em>Page</em></a>')

MB_CARD = ('<a class="bc" href="/library/aims/microbiome/" style="--bc:#87CFC5">' + MB_ART +
 '<b>Microbiome testing</b><span class="bs">3 of 1,208</span>'
 '<span class="bl">organisms agreed across 7 companies testing one identical stool sample.</span><em>Page</em></a>')


def next_version(section):
    vs = [int(m.group(1)) for d in os.listdir(os.path.join(REPO, section))
          if (m := re.fullmatch(r'v(\d+)', d))]
    return max(vs), max(vs) + 1


def bump(section, add_card, extra=None):
    cur, nxt = next_version(section)
    src = os.path.join(REPO, section, f'v{cur}')
    dst = os.path.join(REPO, section, f'v{nxt}')
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)
    f = os.path.join(dst, 'index.html')
    t = open(f, encoding='utf8').read()
    t2 = add_card(t)
    if extra:
        t2 = extra(t2)
    assert t2 != t, f'{section}: nothing changed'
    open(f, 'w', encoding='utf8').write(t2)
    # point the section's redirect stub at the new version
    stub = os.path.join(REPO, section, 'redirect-stub.html')
    if os.path.exists(stub):
        s = open(stub, encoding='utf8').read()
        s = re.sub(r'v\d+/', f'v{nxt}/', s)
        open(stub, 'w', encoding='utf8').write(s)
    print(f'{section}: v{cur} -> v{nxt}')
    return nxt


# ---- Cases index: add the antibiotics card, and the notes line
def cases_card(t):
    note = ('<!-- Cases index v%d (22 Nov 2026): Antibiotics & your gut case page added (card + notes link). '
            'Previous version kept. -->\n')
    i = t.find('<div class="bcg">')
    j = t.find('</div>', i)
    t = t[:j] + ABX_CARD + t[j:]
    return t

def cases_notes(t):
    # add notes links for both new notes pages at the top of the notes list
    i = t.find('<ul class="nl">')
    if i < 0:
        return t
    j = i + len('<ul class="nl">')
    add = ('<li><a href="/library/goals/notes/antibiotics/">Antibiotics &amp; the gut microbiome</a>'
           '<span>The full research behind the case page: recovery timelines, drug by drug, and every option graded.</span></li>'
           '<li><a href="/library/goals/notes/microbiome/">Microbiome testing &amp; adding strains</a>'
           '<span>One stool sample, seven companies, 1,208 organisms and 3 agreements. Plus what makes a strain stay.</span></li>')
    return t[:j] + add + t[j:]

def cases_comment(t):
    v = next_version('library/goals')[0] + 1
    return t.replace('<html lang="en">',
        f'<!-- Cases index v{v} (22 Nov 2026): Antibiotics & your gut case card added, plus notes links for the antibiotics and microbiome research. Previous version kept. -->\n<html lang="en">', 1)

bump('library/goals', lambda t: cases_comment(cases_card(t)), cases_notes)


# ---- Goals index: add the microbiome card
def aims_card(t):
    i = t.find('<div class="bcg">')
    assert i > 0, 'no card grid on the goals index'
    j = t.find('</div>', i)
    return t[:j] + MB_CARD + t[j:]

def aims_comment(t):
    v = next_version('library/aims')[0] + 1
    return t.replace('<html lang="en">',
        f'<!-- Goals index v{v} (22 Nov 2026): Microbiome testing & adding strains goal page added. Previous version kept. -->\n<html lang="en">', 1)

bump('library/aims', lambda t: aims_comment(aims_card(t)))
print('done')
