"""Home v85, Dosage v30, Blood Work v29 (19 Nov 2026): the four medicines from Library v101 everywhere.
Previews only: live redirects are not changed here."""
import json, os, shutil, sys, re
sys.path.insert(0, '/home/claude/rx')
from content import MEDS, ORDER
R = '/home/claude/baresignals'
J = lambda x: json.dumps(x, ensure_ascii=False)

# ---------- Home v85 (Guide body) ----------
s = open(f'{R}/index.html', encoding='utf8').read()
i = s.find('const C=['); j = s.find('];', i)
arr = json.loads(s[i + 8:j + 1])
arr = [x for x in arr if x['s'] not in ORDER]
for k in ORDER:
    d = MEDS[k]['data']; p = MEDS[k]['page']
    arr.append({"n": d['name'], "s": k, "p": d['primary'], "r": d['roles'], "x": [], "f": d['fn'], "k": 0, "b": False,
                "al": d['alias'], "d": d['desc'], "m": d['mech'], "t": d['tst'],
                "ds": {"d": d['dose']['dose'], "f": d['dose']['freq'], "c": d['dose']['cycle'], "r": d['dose']['route']},
                "ap": "FDA approved" if d['fdaFill'] else "Approved for some uses", "st": d['status'],
                "o": MEDS[k]['body'], "in": p['sum'] + ' ' + MEDS[k]['take']['ev']})
s = s[:i + 8] + J(arr) + s[j + 1:]
s = s.replace('<!doctype html><!-- Home v84', '<!doctype html><!-- Home v85 (19 Nov 2026, preview; live home stays v84 until Cece says yes): four prescription medicines join the body (Metronidazole, Doxycycline, Tranexamic acid, Dexketoprofen) with body labels; Read more reads Library v101 page.js. Home v84 = the live root page. Earlier: Home v84', 1)
s = s.replace('/library/v79/page.js', '/library/v101/page.js')
os.makedirs(f'{R}/home/v85', exist_ok=True)
open(f'{R}/home/v85/index.html', 'w', encoding='utf8').write(s)

# ---------- Dosage v30 ----------
src = f'{R}/dosage/v29'; dst = f'{R}/dosage/v30'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
d = open(f'{dst}/index.html', encoding='utf8').read()
d = d.replace('/library/v85/data.js', '/library/v101/data.js').replace('/library/v85/page.js', '/library/v101/page.js').replace('/library/v85/merge.js', '/library/v101/merge.js')
d = d.replace('<!doctype html>', '<!doctype html>\n<!-- Dosage v30 (19 Nov 2026, built on v29, v29 kept): reads Library v101, so the four prescription medicines (metronidazole, doxycycline, tranexamic acid, dexketoprofen) show with their label doses. -->', 1)
d = d.replace("if(d&&d.status){r.community=d}", "if(d&&d.status&&!o.rx){r.community=d}",1).replace('>V29<','>V30<',1)
assert '!o.rx' in d
open(f'{dst}/index.html', 'w', encoding='utf8').write(d)

# ---------- Blood Work v29 ----------
src = f'{R}/blood/v28'; dst = f'{R}/blood/v29'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
CAT = {'metronidazole': 'Prescription · antibiotic', 'doxycycline': 'Prescription · antibiotic', 'tranexamic-acid': 'Prescription · bleeding', 'dexketoprofen': 'Prescription · painkiller'}
MK = {'alt': (4, '🔍', 'Cleared by the liver'), 'ast': (4, '🔍', 'Cleared by the liver'), 'creatinine-egfr': (6, '⚠', 'Kidney check'), 'hemoglobin': (23, '🔍', 'Blood loss'), 'ferritin': (23, '🔍', 'Iron stores'), 'platelets': (21, '🔍', 'Clotting'), 'white-blood-cells': (18, '🔍', 'Infection'), 'electrolytes': (19, '⚠', 'Fluids')}
comps = []
for k in ORDER:
    m = MEDS[k]; bw = m['rx']['bw']; dd = m['data']
    mx = {}
    for t in bw['tests']:
        if t in MK: mx[str(MK[t][0])] = [MK[t][1], MK[t][2]]
    comps.append({"name": dd['name'], "cat": CAT[k], "lib": k, "id": k, "mxname": dd['name'],
                  "pep": {"before": bw['before'], "monitor": bw['monitor'], "freq": bw['freq'], "flags": bw['flags']},
                  "mx": mx, "sup": [], "tags": dd['roles'], "src": "research", "conf": "verified", "status": "protocol",
                  "prep": [["No specific prep needed for a short course", [], "timing", "Short prescription course", "verified", []]], "prepGroup": "Prescription medicines",
                  "tagsAll": [[r, "main", dd['desc'][r]] for r in dd['roles']], "touch": {},
                  "ids": {"before": [] if bw['before'].startswith('None') else bw['tests'], "monitor": bw['tests']},
                  "why": m['page']['sum'], "sources": [[x[0], x[1], 2026, "label"] for x in m['page']['sources'][:4]]})
open(f'{dst}/rx.js', 'w', encoding='utf8').write('/* Blood Work v29 (19 Nov 2026): four prescription medicines from Library v101. */\n(function(){var B=window.BW;if(!B)return;var X=' + J(comps) + ';X.forEach(function(c){if(!B.comps.some(function(y){return y.id===c.id}))B.comps.push(c)});})();\n')
b = open(f'{dst}/index.html', encoding='utf8').read()
b = b.replace('<script src="/blood/v20/data.js"></script>', '<script src="/blood/v20/data.js"></script><script src="rx.js"></script>', 1)
assert 'rx.js' in b
b = b.replace('<!doctype html>', '<!doctype html>\n<!-- Blood Work v29 (19 Nov 2026, built on v28, v28 kept): four prescription medicines (metronidazole, doxycycline, tranexamic acid, dexketoprofen) added via rx.js. -->', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(b)
print('ok')
