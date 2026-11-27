"""Guide v91c (27 Nov 2026, built on v91b, kept): Adderall joins the body (Where it acts on the Library full read
embeds this page). Live root index.html is a copy of this version."""
import json, os, shutil, sys
R = '/home/claude/baresignals'; os.chdir(R); sys.path.insert(0, 'tools')
from rx_adderall import MEDS
J = lambda x: json.dumps(x, ensure_ascii=False)
src, dst = 'home/v91b', 'home/v91c'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
s = open(f'{dst}/index.html', encoding='utf8').read()
i = s.find('const C=['); j = s.find('];', i)
arr = [x for x in json.loads(s[i + 8:j + 1]) if x['s'] != 'adderall']
m = MEDS['adderall']; d = m['data']; p = m['page']
arr.append({"n": d['name'], "s": "adderall", "p": d['primary'], "r": d['roles'], "x": [], "f": d['fn'], "k": 0, "b": False,
            "al": d['alias'], "d": d['desc'], "m": d['mech'], "t": d['tst'],
            "ds": {"d": d['dose']['dose'], "f": d['dose']['freq'], "c": d['dose']['cycle'], "r": d['dose']['route']},
            "ap": "FDA approved", "st": d['status'], "o": m['body'], "in": p['sum'] + ' ' + m['take']['ev']})
s = s[:i + 8] + J(arr) + s[j + 1:]
assert s.startswith('<!doctype html><!-- Guide v91b')
s = s.replace('<!doctype html><!-- Guide v91b', '<!doctype html><!-- Guide v91c (27 Nov 2026, built on v91b, kept): Adderall added to the body (prefrontal cortex, arousal centres, hypothalamus, heart) so the Library full read shows Where it acts. --><!-- Guide v91b', 1)
open(f'{dst}/index.html', 'w', encoding='utf8').write(s)
print('ok', len(arr))
