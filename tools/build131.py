"""Library v131 (27 Nov 2026), built on v130 (kept): Adderall joins the Library as a prescription medicine,
same format as the v101 medicines: card, full read, deep read, Mixing it with, Taking it right, How it compares,
blood work entry, search index. Label doses only. PREVIEW: live /library/ is not changed by this script."""
import json, shutil, os, sys, subprocess, math
R = '/home/claude/baresignals'; os.chdir(R)
sys.path.insert(0, f'{R}/tools')
from rx_adderall import MEDS, ORDER, IX, RXW_TAKE, PK, STUDIES, SUPP
import re
SRC, DST = 'library/v130', 'library/v131'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
J = lambda x: json.dumps(x, ensure_ascii=False)

# amphetamine skeleton (PubChem CID 3007): benzene ring, CH2, CH(CH3), NH2
def u(a): r = math.radians(a); return (math.cos(r), math.sin(r))
A, B = [], []
def at(el, p): A.append([el, round(p[0], 3), round(p[1], 3)]); return len(A) - 1
def bd(i, j, o=1): B.append([i, j, o])
ring = [at('C', u(a)) for a in [0, 60, 120, 180, 240, 300]]
for k in range(6): bd(ring[k], ring[(k + 1) % 6], 1.5)
p0 = A[ring[0]][1:]
c1 = at('C', (p0[0] + math.cos(math.radians(-30)), p0[1] + math.sin(math.radians(-30)))); bd(ring[0], c1)
p1 = A[c1][1:]
c2 = at('C', (p1[0] + math.cos(math.radians(30)), p1[1] + math.sin(math.radians(30)))); bd(c1, c2)
p2 = A[c2][1:]
me = at('C', (p2[0] + math.cos(math.radians(90)), p2[1] + math.sin(math.radians(90)))); bd(c2, me)
n = at('N', (p2[0] + math.cos(math.radians(-30)), p2[1] + math.sin(math.radians(-30)))); bd(c2, n)
MOL = {'adderall': {'a': A, 'b': B, 'cid': 3007}}

def append(fn, js):
    with open(f'{DST}/{fn}', 'a', encoding='utf8') as f: f.write('\n' + js + '\n')

hdr = '/* v131 (27 Nov 2026): Adderall added as a prescription medicine (label doses only). */'
data = []
for s in ORDER:
    d = dict(MEDS[s]['data']); d['punch'] = MEDS[s]['punch']; d['batch'] = 'Nov 27 medicines'; d['rx'] = True
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
              'before': [[t, '', 0, 0, 0, ''] for t in bw['tests']], 'monitor': [[t, '', 0, 1, 0, ''] for t in bw['tests']],
              'mk': [], 'sup': SUPP, 'mon': bw['monitor'], 'bef': bw['before']}
append('rx.js', hdr + '\nObject.assign(window.BS_RX,' + J(RX) + ');\n(function(){var L=window.BW_LIB;if(!L)return;var X=' + J(BWX) + ';for(var k in X){L.comps[k]=X[k];L.sup=L.sup||{};L.sup[k]=X[k].sup}})();')

PK['src'] = ["Adderall and Adderall XR FDA labels (clinical pharmacology, humans)", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/011522s045lbl.pdf"]
append('pk.js', hdr + '\nwindow.PK=window.PK||{};window.PK.adderall=' + J(PK) + ';')
append('tw.js', hdr + '\nif(window.BS_GSL&&!BS_GSL.includes("adderall"))BS_GSL.push("adderall");')
append('rxw.js', hdr + '\nwindow.BS_RXW.adderall=' + J({'ix': [r[6] for r in IX], 'take': RXW_TAKE}) + ';')
# root studies.json is read live by the Library and the Guide; add the three checked studies once
st = json.load(open('studies.json', encoding='utf8'))
st = [x for x in st if x['slug'] != 'adderall'] + STUDIES
open('studies.json', 'w', encoding='utf8').write(json.dumps(st, ensure_ascii=False, separators=(',', ':')))
ix = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global ix
    assert old in ix, old[:80]
    ix = ix.replace(old, new, 1)
rep('<!doctype html>\n', '<!doctype html>\n<!-- Library v131 (27 Nov 2026, built on v130, kept; PREVIEW until Cece says yes): Adderall joins the Library as a prescription medicine in the v101 medicine format: card, full read, deep read (efficacy, dose and psychosis, heart, law and the Bali question), Mixing it with (17 rows: peptides, supplements, food, medicines), Taking it right, How it compares (Vyvanse, methylphenidate, non-stimulants, guanfacine, modafinil), blood work entry. Label doses only, no community dose. Built by tools/build131.py from tools/rx_adderall.py. -->\n')
rep("NPW2={'Metronidazole':'171.2 g/mol',", "NPW2={'Adderall':'135.2 g/mol (amphetamine)','Metronidazole':'171.2 g/mol',")
rep("clinical:'Only trial or label doses exist. No community dose yet.',", "clinical:'Only trial or label doses exist. No community dose yet.',label:'Prescription medicine: label dose only, set by the prescriber. Bare Signals shows no community dose for it.',")
rep("const plain=[t1.dose&&`Most people take <b>${esc(t1.dose)}</b>`", "const plain=[t1.dose&&`${o.rx?'The label says':'Most people take'} <b>${esc(t1.dose)}</b>`")
rep("function syn65(o){if(!o.syn||!o.syn.length)return sec65(", "function syn65(o){if(o.rx&&o.syn&&!o.syn.length)return '';if(!o.syn||!o.syn.length)return sec65(")
rep('<a href="${calcHref(o)}">Work it out in the Calculator →</a><a href="/water/">Which mixing water →</a>', '${o.rx?\'\':`<a href="${calcHref(o)}">Work it out in the Calculator →</a><a href="/water/">Which mixing water →</a>`}')
# deep read banner for the medicines (word count and parts from their deep reads)
def words(sl):
    import subprocess
    out = subprocess.run(['node', '-e', "global.window={};eval(require('fs').readFileSync('%s/deep.js','utf8'));const d=window.BS_DEEP[process.argv[1]];const t=d.sections.map(x=>x.body.join(' ')).join(' ');console.log(t.split(/\\s+/).length+','+d.sections.length)" % DST, sl], capture_output=True, text=True, check=True).stdout.strip().split(',')
    return [round(int(out[0]) / 10) * 10, int(out[1])]
add = ','.join('"%s":%s' % (sl, J(words(sl))) for sl in ['adderall', 'metronidazole', 'doxycycline', 'tranexamic-acid', 'dexketoprofen'])
rep('var DR={', 'var DR={' + add + ',')
# Mixing it with: a one-line verdict count on top (what mixes and what doesn't)
rep("function rxIx(o){const R=rxOf(o);if(!R||!R.ix)return '';", "function rxIx(o){const R=rxOf(o);if(!R||!R.ix)return '';const NC=k=>R.ix.filter(x=>x[2]===k).length;const VS=`<p class=\"rxi\"><b>${R.ix.length} checked:</b> ${['avoid','space','watch','ok'].filter(k=>NC(k)).map(k=>NC(k)+' '+RXL[k][0].toLowerCase()).join(' · ')}.</p>`;")
rep("${['avoid','space','watch','ok'].map(rxTag).join('')}</div>${g}", "${['avoid','space','watch','ok'].map(rxTag).join('')}</div>${VS}${g}")
open(f'{DST}/index.html', 'w', encoding='utf8').write(ix)

# search index, same builder as v121
js = open('tools/build121.py', encoding='utf8').read()
js = js[js.index('js = r"""') + 9: js.index('""" % {')] % {'d': DST}
js = js.replace('Library v121', 'Library v131').replace('tools/build121.py', 'tools/build131.py')
print('index', subprocess.run(['node', '-e', js], capture_output=True, text=True, check=True).stdout.strip())
print('built', DST)
