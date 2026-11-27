"""Guide v91d (28 Nov 2026, built on v91c, kept): DMSO joins the body (the Library full read's Where it acts
embeds this page). Live root index.html is a copy of this version."""
import json, os, shutil, sys
R = '/home/claude/BareSignals'; os.chdir(R); sys.path.insert(0, 'tools')
from rx_dmso import MEDS
J = lambda x: json.dumps(x, ensure_ascii=False)
src, dst = 'home/v91c', 'home/v91d'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
s = open(f'{dst}/index.html', encoding='utf8').read()
i = s.find('const C=['); j = s.find('];', i)
arr = [x for x in json.loads(s[i + 8:j + 1]) if x['s'] != 'dmso']
m = MEDS['dmso']; d = m['data']; p = m['page']
arr.append({"n": d['name'], "s": "dmso", "p": d['primary'], "r": d['roles'], "x": [], "f": d['fn'], "k": 0, "b": False,
            "al": d['alias'], "d": d['desc'], "m": d['mech'], "t": d['tst'],
            "ds": {"d": d['dose']['dose'], "f": d['dose']['freq'], "c": d['dose']['cycle'], "r": d['dose']['route']},
            "ap": "FDA approved", "st": d['status'], "o": m['body'], "in": p['sum'] + ' ' + m['take']['ev']})
s = s[:i + 8] + J(arr) + s[j + 1:]
assert s.startswith('<!doctype html><!-- Guide v91c')
s = s.replace('<!doctype html><!-- Guide v91c', '<!doctype html><!-- Guide v91d (28 Nov 2026, built on v91c, kept): DMSO added to the body (skin, bladder, muscles, joints) so the Library full read shows Where it acts. --><!-- Guide v91c', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)
shutil.copy(f'{dst}/index.html', 'index.html')
print('ok', len(arr))
