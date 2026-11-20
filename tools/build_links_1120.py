"""20 Nov 2026: compound links that open the Library card in the drawer (/library/#/p/<slug>), on the three pages that had none.
- Growth hormones v3 (built on v2, kept): a 'Full card:' line after each compound section, like Energy.
- Brain v4 (built on v3, kept): the same, for every compound section.
- GLP-1s v5 (built on v4, kept): drug names in the 'Which hormones each drug copies' table open their cards.
No text or numbers changed. Then run tools/publish_live.py."""
import os, re, shutil
REPO = '/home/claude/baresignals'
os.chdir(REPO)
READ_CSS = '.read{font-size:calc(12.5px*var(--k,1));margin:10px 0 0}\n'

def new_version(d, old, new, comment):
    src, dst = f'{d}/{old}', f'{d}/{new}'
    if os.path.exists(dst): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    p = f'{dst}/index.html'
    s = open(p, encoding='utf8').read()
    s = s.replace('<!doctype html>\n', f'<!doctype html>\n<!-- {comment} -->\n', 1) if s.startswith('<!doctype html>\n') else f'<!-- {comment} -->\n' + s
    stub = f'{d}/redirect-stub.html'
    t = open(stub, encoding='utf8').read().replace(f'{old}/', f'{new}/')
    open(stub, 'w', encoding='utf8').write(t)
    return p, s

def link(slug, name):
    return f'<a href="/library/#/p/{slug}">{name} in the Library</a>'

def add_reads(s, mapping):
    """mapping: section id -> list of (slug, name). Insert a Full card line just before the next heading after that section."""
    n = 0
    for sid, cards in mapping.items():
        i = s.find(f'id="{sid}"')
        assert i > 0, sid
        nxt = re.compile(r'<h[23][ >]').search(s, i + 10)
        assert nxt, sid
        j = nxt.start()
        line = '<p class="read">Full card' + ('s' if len(cards) > 1 else '') + ': ' + ' · '.join(link(a, b) for a, b in cards) + '</p>\n\n'
        # put it before trailing whitespace of the section
        k = j
        while s[k - 1] in '\n ': k -= 1
        s = s[:k] + '\n' + line.rstrip('\n') + s[k:]
        n += 1
    return s, n

# Growth hormones
p, s = new_version('library/aims/gh', 'v2', 'v3', 'Growth hormones (Goals) v3, 20 Nov 2026. Built on v2 (kept). One change: a Full card line after each compound section opens its Library card in the drawer (the page had no compound links). No text or numbers changed.')
s, n = add_reads(s, {
    'sermorelin': [('sermorelin', 'Sermorelin')],
    'cjc': [('cjc-1295-with-dac', 'CJC-1295 with DAC'), ('cjc-1295-no-dac', 'CJC-1295 no DAC')],
    'tesamorelin': [('tesamorelin', 'Tesamorelin')],
    'ipamorelin': [('ipamorelin', 'Ipamorelin')],
    'ghrp2': [('ghrp-2', 'GHRP-2'), ('ghrp-6', 'GHRP-6')],
    'hexarelin': [('hexarelin', 'Hexarelin')],
    'mk677': [('mk-677', 'MK-677')],
    'igf': [('igf-1-lr3', 'IGF-1 LR3')],
    'hgh': [('somatropin-hgh', 'HGH')],
})
assert n == 9
if '.read{' not in s: s = s.replace('</style>', READ_CSS + '</style>', 1)
open(p, 'w', encoding='utf8').write(s)

# Brain
p, s = new_version('library/aims/brain', 'v3', 'v4', 'Brain (Goals) v4, 20 Nov 2026. Built on v3 (kept). One change: a Full card line after each compound section opens its Library card in the drawer (the page had one compound link for 23 compounds). No text or numbers changed.')
s, n = add_reads(s, {
    'semax': [('semax', 'Semax')],
    'nasemax': [('na-semax-amidate', 'NA Semax Amidate'), ('na-selank-amidate', 'NA Selank Amidate')],
    'selank': [('selank', 'Selank')],
    'noopept': [('noopept', 'Noopept')],
    'khav': [('cortagen', 'Cortagen'), ('pinealon', 'Pinealon')],
    'cerebrolysin': [('cerebrolysin', 'Cerebrolysin')],
    'dihexa': [('dihexa', 'Dihexa')],
    'p21': [('p21', 'P21'), ('pe-22-28', 'PE-22-28'), ('adamax', 'Adamax')],
    'cgp': [('cgp', 'cGP')],
    'modafinil': [('modafinil', 'Modafinil')],
    'mb': [('methylene-blue', 'Methylene blue')],
    'bromantane': [('bromantane', 'Bromantane')],
    'phenylpiracetam': [('phenylpiracetam', 'Phenylpiracetam'), ('9-me-bc', '9-Me-BC')],
    'creatine': [('creatine', 'Creatine')],
})
assert n == 14
if '.read{' not in s: s = s.replace('</style>', READ_CSS + '</style>', 1)
open(p, 'w', encoding='utf8').write(s)

# GLP-1s case
p, s = new_version('library/goals/glp-1', 'v4', 'v5', 'GLP-1s v5 (20 Nov 2026), built on v4 (kept): drug names in the hormone table open their Library cards in the drawer (the page had no compound links). No text or numbers changed.')
i = s.find('id="families"'); j = s.find('</table>', i)
tbl = s[i:j]
for slug, name in [('semaglutide', 'Semaglutide'), ('liraglutide', 'Liraglutide'), ('orforglipron', 'Orforglipron'), ('tirzepatide', 'Tirzepatide'), ('retatrutide', 'Retatrutide'), ('cagrilintide', 'Cagrilintide'), ('eloralintide', 'Eloralintide')]:
    old = f'<th scope="row"><b>{name}</b>'
    assert tbl.count(old) == 1, name
    tbl = tbl.replace(old, f'<th scope="row"><b><a class="dl" href="/library/#/p/{slug}">{name}</a></b>')
s = s[:i] + tbl + s[j:]
s = s.replace('</style>', '.fam th a.dl{color:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:2px}\n</style>', 1)
open(p, 'w', encoding='utf8').write(s)
print('ok')
