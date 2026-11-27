"""Library v137 (28 Nov 2026), built on v136 (kept): DMSO (dimethyl sulfoxide) joins the Library in the medicine
format: card, full read, deep read, Mixing it with, Taking it right, How it compares, blood work, search index.
Its one FDA-approved human use (Rimso-50 into the bladder) and the topical use people buy are kept apart:
label dose for the first, reported dose for the second. Carrier risk leads the warnings."""
import json, shutil, os, sys, subprocess, math
R = '/home/claude/BareSignals'; os.chdir(R)
sys.path.insert(0, f'{R}/tools')
from rx_dmso import MEDS, ORDER, IX, RXW_TAKE, PK, STUDIES, SUPP
SRC, DST = 'library/v136', 'library/v137'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
J = lambda x: json.dumps(x, ensure_ascii=False)

# (CH3)2S=O, PubChem CID 679: sulfur centre, two methyls, one double-bonded oxygen
A, B = [], []
def at(el, p): A.append([el, round(p[0], 3), round(p[1], 3)]); return len(A) - 1
def bd(i, j, o=1): B.append([i, j, o])
s0 = at('S', (0, 0))
c1 = at('C', (-0.95, -0.55)); bd(s0, c1)
c2 = at('C', (0.95, -0.55)); bd(s0, c2)
o1 = at('O', (0, 1.1)); bd(s0, o1, 2)
MOL = {'dmso': {'a': A, 'b': B, 'cid': 679}}

def append(fn, js):
    with open(f'{DST}/{fn}', 'a', encoding='utf8') as f: f.write('\n' + js + '\n')

hdr = '/* v137 (28 Nov 2026): DMSO (dimethyl sulfoxide) added, medicine format. Label dose for the approved bladder use, reported dose on skin. */'
data = []
for s in ORDER:
    d = dict(MEDS[s]['data']); d['punch'] = MEDS[s]['punch']; d['batch'] = 'Nov 28 DMSO'; d['rx'] = True
    data.append(d)
append('data.js', hdr + '\nwindow.BS_DATA=window.BS_DATA.concat(' + J(data) + ');')
append('page.js', hdr + '\nObject.assign(window.BS_PAGE,' + J({s: MEDS[s]['page'] for s in ORDER}) + ');')
append('deep.js', hdr + '\nObject.assign(window.BS_DEEP,' + J({s: MEDS[s]['deep'] for s in ORDER}) + ');')
append('card.js', hdr + '\nObject.assign(window.BS_CARD,' + J({s: {'sum': MEDS[s]['card']} for s in ORDER}) + ');')
append('punch.js', hdr + '\nObject.assign(window.BS_PUNCH,' + J({s: MEDS[s]['punch'] for s in ORDER}) + ');')
append('take.js', hdr + '\nObject.assign(window.BS_TAKE,' + J({s: MEDS[s]['take'] for s in ORDER}) + ');')
append('faq.js', hdr + '\nObject.assign(window.BS_FAQ,' + J({s: MEDS[s]['faq'] for s in ORDER}) + ');')
append('mol.js', hdr + '\nObject.assign(window.BS_MOL,' + J(MOL) + ');')

RX = {}; BWX = {}
for s in ORDER:
    r = MEDS[s]['rx']; RX[s] = {'take': r['take'], 'ix': r['ix'], 'cmp': r['cmp']}
    bw = r['bw']
    BWX[s] = {'id': s, 'name': MEDS[s]['data']['name'], 'src': 'research', 'conf': 'verified', 'status': 'protocol', 'nsrc': 0, 'p': True,
              'why': bw['before'], 'freq': bw['freq'], 'flags': bw['flags'],
              'before': [[t, '', 0, 0, 0, 'Label asks for these on long courses'] for t in bw['tests']], 'monitor': [],
              'mk': [], 'sup': SUPP, 'mon': bw['monitor'], 'bef': bw['before']}
append('rx.js', hdr + '\nObject.assign(window.BS_RX,' + J(RX) + ');\n(function(){var L=window.BW_LIB;if(!L)return;var X=' + J(BWX) + ';for(var k in X){L.comps[k]=X[k];L.sup=L.sup||{};L.sup[k]=X[k].sup}})();')

PK['src'] = ["Dimethyl sulfoxide, OSHA chemical sampling information (human serum half-life, urinary excretion)", "https://webarchive.library.unt.edu/eot2008/20081104134829/http://www.osha.gov/dts/chemicalsampling/data/CH_236510.html"]
append('pk.js', hdr + '\nwindow.PK=window.PK||{};window.PK.dmso=' + J(PK) + ';')
append('tw.js', hdr + '\nif(window.BS_GSL&&!BS_GSL.includes("dmso"))BS_GSL.push("dmso");')
append('rxw.js', hdr + '\nwindow.BS_RXW.dmso=' + J({'ix': [r[6] for r in IX], 'take': RXW_TAKE}) + ';')

st = json.load(open('studies.json', encoding='utf8'))
st = [x for x in st if x['slug'] != 'dmso'] + STUDIES
open('studies.json', 'w', encoding='utf8').write(json.dumps(st, ensure_ascii=False, separators=(',', ':')))

ix = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global ix
    assert old in ix, old[:80]
    ix = ix.replace(old, new, 1)
rep('<!doctype html>\n', '<!doctype html>\n<!-- Library v137 (28 Nov 2026, built on v136, kept): DMSO (dimethyl sulfoxide) joins the Library in the medicine format. Its one approved human use (Rimso-50, 50% into the bladder for interstitial cystitis) carries a label dose; the topical use people buy carries a reported dose only. Mixing it with leads on the carrier risk: it takes whatever is on the skin inside. No other compound changed. -->\n')
rep("NPW2={'Adderall':'135.2 g/mol (amphetamine)',", "NPW2={'DMSO':'78.1 g/mol','Adderall':'135.2 g/mol (amphetamine)',")
d = words = None
def wc(sl):
    out = subprocess.run(['node', '-e', "global.window={};eval(require('fs').readFileSync('%s/deep.js','utf8'));const d=window.BS_DEEP[process.argv[1]];const t=d.sections.map(x=>x.body.join(' ')).join(' ');console.log(t.split(/\\s+/).length+','+d.sections.length)" % DST, sl], capture_output=True, text=True, check=True).stdout.strip().split(',')
    return [round(int(out[0]) / 10) * 10, int(out[1])]
rep('var DR={', 'var DR={"dmso":%s,' % J(wc('dmso')))
open(f'{DST}/index.html', 'w', encoding='utf8').write(ix)

js = open('tools/build121.py', encoding='utf8').read()
js = js[js.index('js = r"""') + 9: js.index('""" % {')] % {'d': DST}
js = js.replace('Library v121', 'Library v137').replace('tools/build121.py', 'tools/build137.py')
print('index', subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout.strip())
print('built', DST)
