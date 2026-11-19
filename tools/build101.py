"""Library v101 (19 Nov 2026), built on v100 (kept): four prescription medicines
(metronidazole, doxycycline, tranexamic acid, dexketoprofen) with card, full read, deep read,
and three new full-page sections for medicines: Mixing it with, Taking it right, How it compares."""
import json, shutil, os, sys
sys.path.insert(0, '/home/claude/rx')
from content import MEDS, ORDER

SITE = '/home/claude/baresignals'
SRC = f'{SITE}/library/v100'
DST = f'{SITE}/library/v101'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
J = lambda x: json.dumps(x, ensure_ascii=False)
MOL = json.load(open('/home/claude/rx/mol.json'))

def append(fn, js):
    with open(f'{DST}/{fn}', 'a', encoding='utf8') as f: f.write('\n' + js + '\n')

hdr = '/* v101 (19 Nov 2026): four prescription medicines added: metronidazole, doxycycline, tranexamic acid, dexketoprofen. */'
data = []
for s in ORDER:
    d = dict(MEDS[s]['data']); d['punch'] = MEDS[s]['punch']; d['batch'] = 'Nov 19 medicines'; d['rx'] = True
    data.append(d)
append('data.js', hdr + '\nwindow.BS_DATA=window.BS_DATA.concat(' + J(data) + ');')
append('page.js', hdr + '\nObject.assign(window.BS_PAGE,' + J({s: MEDS[s]['page'] for s in ORDER}) + ');')
append('deep.js', hdr + '\nObject.assign(window.BS_DEEP,' + J({s: MEDS[s]['deep'] for s in ORDER}) + ');')
append('card.js', hdr + '\nObject.assign(window.BS_CARD,' + J({s: {'sum': MEDS[s]['card']} for s in ORDER}) + ');')
append('punch.js', hdr + '\nObject.assign(window.BS_PUNCH,' + J({s: MEDS[s]['punch'] for s in ORDER}) + ');')
append('take.js', hdr + '\nObject.assign(window.BS_TAKE,' + J({s: MEDS[s]['take'] for s in ORDER}) + ');')
append('faq.js', hdr + '\nObject.assign(window.BS_FAQ,' + J({s: MEDS[s]['faq'] for s in ORDER}) + ');')
append('mol.js', hdr + '\nObject.assign(window.BS_MOL,' + J(MOL) + ');')

# rx.js: the medicine sections, plus Blood Work cross-link entries for the four (BW_LIB, read by the Library's blood box)
SUP = {'metronidazole': [["probiotics","Probiotics","#AACC96"],["saccharomyces-boulardii","Saccharomyces boulardii","#AACC96"],["ginger","Ginger","#AACC96"]],
       'doxycycline': [["probiotics","Probiotics","#AACC96"],["saccharomyces-boulardii","Saccharomyces boulardii","#AACC96"],["ginger","Ginger","#AACC96"]],
       'tranexamic-acid': [["iron","Iron","#9E1B32"],["vitamin-c","Vitamin C","#E1DE62"]],
       'dexketoprofen': [["ginger","Ginger","#FF99D8"],["magnesium-glycinate","Magnesium Glycinate","#87CFC5"]]}
RX = {}; BWX = {}
for s in ORDER:
    r = MEDS[s]['rx']; RX[s] = {'take': r['take'], 'ix': r['ix'], 'cmp': r['cmp']}
    bw = r['bw']
    BWX[s] = {'id': s, 'name': MEDS[s]['data']['name'], 'src': 'research', 'conf': 'verified', 'status': 'protocol', 'nsrc': 0, 'p': True,
              'why': bw['before'], 'freq': bw['freq'], 'flags': bw['flags'],
              'before': [[t, '', 0, 0, 0, ''] for t in bw['tests']] if not bw['before'].startswith('None') else [],
              'monitor': [[t, '', 0, 1, 0, ''] for t in bw['tests']], 'mk': [], 'sup': SUP[s], 'mon': bw['monitor'], 'bef': bw['before']}
rxjs = hdr + '\nwindow.BS_RX=' + J(RX) + ';\n(function(){var L=window.BW_LIB;if(!L)return;var X=' + J(BWX) + ';for(var k in X){L.comps[k]=X[k];L.sup=L.sup||{};L.sup[k]=X[k].sup}})();\n'
open(f'{DST}/rx.js', 'w', encoding='utf8').write(rxjs)

css = """/* Library v101: medicines. Mixing it with (blue), Taking it right (yellow), How it compares (sky) */
.k-rx{--sb:#6777B6;--sbg:#EEF0FA;--sh:#3E4A80}
.k-rxt{--sb:#CCA300;--sbg:#FFF9E0;--sh:#7A6000}
.k-rxc{--sb:#74BCFF;--sbg:#EEF7FF;--sh:#1F5C99}
.rxk{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 8px}
.rxt{display:inline-block;font:600 calc(8.5px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;padding:4px 6px 3px;border-radius:0;white-space:nowrap}
.rxg{margin:0 0 10px}
.rxh{font:500 calc(9px*var(--k))/1.3 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--sh);margin:6px 0 4px}
.rxl{list-style:none;margin:0;padding:0}
.rxl li{display:grid;grid-template-columns:76px minmax(0,1fr);gap:8px;align-items:start;padding:6px 0;border-bottom:1px solid rgba(62,74,128,.14)}
.rxl li:last-child{border-bottom:0}
.rxl li .rxt{justify-self:start;margin-top:2px}
.rxl b{display:block;font-weight:600;font-size:calc(12.5px*var(--k));line-height:1.3}
.rxl b a{color:#5271FF;text-decoration:underline;text-underline-offset:2px}
.rxl span{font-size:calc(12px*var(--k));line-height:1.45}
.rxc{font-style:normal;font:500 calc(8px*var(--k)) var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);margin-left:4px;white-space:nowrap}
.rxs{list-style:none;margin:0;padding:0;counter-reset:rx}
.rxs li{display:grid;grid-template-columns:22px minmax(0,1fr);gap:8px;padding:5px 0;border-bottom:1px solid rgba(122,96,0,.16);font-size:calc(12.5px*var(--k));line-height:1.45}
.rxs li:last-child{border-bottom:0}
.rxs li::before{counter-increment:rx;content:counter(rx);font:600 calc(10px*var(--k))/20px var(--mono);text-align:center;background:#CCA300;color:#fff;width:20px;height:20px}
.rxs b{font-weight:600}
.rxcm{width:100%;border-collapse:collapse;font-size:calc(12px*var(--k));line-height:1.4}
.rxcm th,.rxcm td{text-align:left;vertical-align:top;padding:6px 8px;border-bottom:1px solid rgba(31,92,153,.16)}
.rxcm thead th{font:500 calc(8.5px*var(--k)) var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--sh)}
.rxcm tbody th{font-weight:600;width:24%}
.rxcm .rb::before{content:'+ ';color:#2F6B46;font-weight:700}.rxcm .rw::before{content:'− ';color:#B3000F;font-weight:700}
.rxi{margin:0 0 8px;font-size:calc(12.5px*var(--k))}
.rxq{display:none}
@media (max-width:899px){.rxcm{display:none}.rxq{display:block}.rxq>div{padding:7px 0;border-bottom:1px solid rgba(31,92,153,.16)}.rxq>div:last-child{border-bottom:0}.rxq b{display:block;font-size:calc(13px*var(--k))}.rxq p{margin:2px 0 0;font-size:calc(12px*var(--k));line-height:1.45}.rxq .rb::before{content:'+ ';color:#2F6B46;font-weight:700}.rxq .rw::before{content:'− ';color:#B3000F;font-weight:700}.rxl li{grid-template-columns:68px minmax(0,1fr)}}
.crx{padding:4px 12px 10px;border-top:1.5px solid var(--rule)}
.crx .wbox{border-left:3px solid #6777B6!important;background:#EEF0FA!important}
.crx .olab{color:#3E4A80!important}
.crx ul{list-style:none;margin:4px 0 0;padding:0}.crx li{padding:3px 0;font-size:calc(12px*var(--k));line-height:1.4}
.crx li .rxt{margin-right:6px;vertical-align:1px}
.crx a{color:#5271FF;text-decoration:underline}
@media (min-width:900px){.k-rx>.b65{columns:2;column-gap:28px}.k-rx .rxg,.k-rx .rxk{break-inside:avoid}.k-rx .note{column-span:all}}
.rxdr{display:inline-block;margin:6px 0 0;color:#5271FF;font-weight:600;text-decoration:underline;text-underline-offset:3px}
"""
open(f'{DST}/p101.css', 'w').write(css)

JSF = r"""
/* v101: medicines (prescription drugs). Mixing it with, Taking it right, How it compares; data in rx.js */
const RXL={avoid:['Avoid','#B3000F','#FFE2DC'],space:['Space it','#A8470F','#FFEEDD'],watch:['Watch','#6A4FB0','#F3EEFC'],ok:['Fine','#2F6B46','#EAF4E2']};
const RXG={peptide:'With peptides',supp:'With supplements',food:'Food, drink, sun',med:'With medicines'};
const RXC={verified:'Label',reported:'Reported',inferred:'Our read'};
const rxOf=o=>(window.BS_RX||{})[o.slug];
const rxTag=k=>{const l=RXL[k];return `<span class="rxt" style="color:${l[1]};background:${l[2]}">${l[0]}</span>`};
function rxIx(o){const R=rxOf(o);if(!R||!R.ix)return '';
  const g=Object.keys(RXG).map(k=>{const L=R.ix.filter(x=>x[0]===k);if(!L.length)return '';
    return `<div class="rxg"><p class="rxh">${RXG[k]}</p><ul class="rxl">${L.map(x=>{const ln=x[4]&&BYS0(x[4])?`<a href="#/p/${x[4]}">${esc(x[1])}</a>`:esc(x[1]);return `<li>${rxTag(x[2])}<div><b>${ln}</b><span>${esc(x[3])}${x[5]?` <em class="rxc">${RXC[x[5]]||''}</em>`:''}</span></div></li>`}).join('')}</ul></div>`}).join('');
  return sec65('k-rx','Mixing it with',`<div class="rxk">${['avoid','space','watch','ok'].map(rxTag).join('')}</div>${g}<p class="note">Label: on the medicine's label or guideline. Reported: studies or pharmacist sources. Our read: no study, reasoned from how each one works. Not medical advice; your prescriber or pharmacist has the final word.</p>`)}
function rxTake(o){const R=rxOf(o);if(!R||!R.take)return '';
  return sec65('k-rxt','Taking it right',`<ol class="rxs">${R.take.map(t=>`<li><span><b>${esc(t[0])}.</b> ${esc(t[1])}</span></li>`).join('')}</ol>${(window.BS_DEEP||{})[o.slug]||o.hasDeep?`<a class="rxdr" href="#/d/${o.slug}">Read the deep read →</a>`:''}`)}
function rxCmp(o){const R=rxOf(o);if(!R||!R.cmp)return '';const C=R.cmp;
  const tb=`<table class="rxcm"><thead><tr><th>Instead</th><th>Better when</th><th>Worse when</th></tr></thead><tbody>${C.rows.map(r=>`<tr><th>${esc(r[0])}</th><td class="rb">${esc(r[1])}</td><td class="rw">${esc(r[2])}</td></tr>`).join('')}</tbody></table>`;
  const ph=`<div class="rxq">${C.rows.map(r=>`<div><b>${esc(r[0])}</b><p class="rb">${esc(r[1])}</p><p class="rw">${esc(r[2])}</p></div>`).join('')}</div>`;
  return sec65('k-rxc',`How ${esc(o.name.toLowerCase())} compares`,`${C.intro?`<p class="rxi">${esc(C.intro)}</p>`:''}${tb}${ph}`)}
function rxRows(o){if(!rxOf(o))return '';
  return `<div class="r65 rx1" data-bal="2"><div class="c65" style="--o:3">${rxIx(o)}</div><div class="c65" style="--o:3">${rxTake(o)}</div></div>
  <div class="r65 rx2"><div class="c65" style="--o:7">${rxCmp(o)}</div></div>`}
function rxCard(o){const R=rxOf(o);if(!R||!R.ix)return '';const L=R.ix.filter(x=>x[2]==='avoid'||x[2]==='space').slice(0,6);if(!L.length)return '';
  return `<div class="cs crx"><div class="wbox"><p class="olab">Don’t mix, or space it</p><ul>${L.map(x=>`<li>${rxTag(x[2])}<b>${esc(x[1])}</b> ${esc(x[3])}</li>`).join('')}</ul><a href="#/p/${o.slug}">Every interaction, peptides included, on the full page →</a></div></div>`}
"""

ix = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new, count=1):
    global ix
    assert ix.count(old) >= 1, old[:80]
    ix = ix.replace(old, new, count)

rep('<!doctype html>\n', '<!doctype html>\n<!-- Library v101 (19 Nov 2026, built on v100, v100 kept): four prescription medicines join the Library (Metronidazole, Doxycycline, Tranexamic acid, Dexketoprofen) with card, full read, deep read, structures and blood work. New full-page sections for medicines only (rx.js, p101.css): Mixing it with (peptides, supplements, food and sun, medicines; Avoid / Space it / Watch / Fine with Label / Reported / Our read), Taking it right, How it compares (alternatives, better when / worse when). Cards gain a short Don\'t mix box. -->\n')
rep('<link rel="stylesheet" href="p91.css">', '<link rel="stylesheet" href="p91.css">\n<link rel="stylesheet" href="p101.css">')
rep('<script src="mol.js"></script>', '<script src="mol.js"></script>\n<script src="rx.js"></script>')
rep('100 versions · last updated 12 Nov 2026', '101 versions · last updated 19 Nov 2026')
# renderer functions go right before page65
rep("NPW2={'Dihexa':'504.6 g/mol',", "NPW2={'Metronidazole':'171.2 g/mol','Doxycycline':'444.4 g/mol','Tranexamic acid':'157.2 g/mol','Dexketoprofen':'254.3 g/mol','Dihexa':'504.6 g/mol',")
rep('function page65(o){', JSF + '\nfunction page65(o){')
rep('<div class="c65" style="--o:20">${who}</div></div>\n  <div class="r65 r3"', '<div class="c65" style="--o:20">${who}</div></div>\n  ${rxRows(o)}\n  <div class="r65 r3"')
rep('${bloodMini(o)}\n    ${whoNotHTML(o)}\n', '${bloodMini(o)}\n    ${whoNotHTML(o)}\n    ${rxCard(o)}\n')
open(f'{DST}/index.html', 'w', encoding='utf8').write(ix)
print('built', DST)
