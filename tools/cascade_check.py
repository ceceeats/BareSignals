"""Cascade check (20 Nov 2026). Run after EVERY research or Library update, before pushing.
Serves the repo locally, opens every page that shows compound data, and compares what each page actually
holds against the master (the live Library at /library/). Prints every mismatch and every page error.
Usage: python3 tools/cascade_check.py   (exit code 1 if anything is out of line)"""
import json, re, subprocess, sys, time, os, socket
from playwright.sync_api import sync_playwright
os.chdir('/home/claude/baresignals')
PORT = 8799
srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)
J = "()=>JSON.stringify((window.BS_DATA||[]).filter(o=>o.origin!=='supp').map(o=>({s:o.slug,dose:o.dose,desc:o.desc,fn:o.fn,whoNot:o.whoNot,syn:o.syn,tst:o.tst,roles:o.roles})))"
PAGES = {'Dosage': '/dosage/', 'Protocol': '/protocol/', 'How it\'s made': '/made/'}   # pages that load Library data
bad = 0
try:
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        def grab(url, inject=None):
            pg = b.new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)[:140])); pg.route('**/fonts.g*/**', lambda r: r.abort())
            if inject:
                def h(route):
                    r = route.fetch(); route.fulfill(response=r, body=r.text().replace('</body>', inject + '</body>', 1))
                pg.route(f'**/localhost:{PORT}/', h)
            pg.goto(f'http://localhost:{PORT}{url}'); pg.wait_for_timeout(2500)
            return pg, errs
        pg, errs = grab('/library/'); M = {o['s']: o for o in json.loads(pg.evaluate(J))}; pg.close()
        print(f'Master: Library, {len(M)} compounds' + (f'  ERRORS {errs}' if errs else ''))
        for name, url in PAGES.items():
            pg, errs = grab(url); O = {o['s']: o for o in json.loads(pg.evaluate(J))}; pg.close()
            miss = [k for k in M if k not in O]; diff = {}
            for k, a in M.items():
                if k in O:
                    for f in a:
                        if json.dumps(a[f], sort_keys=True) != json.dumps(O[k].get(f), sort_keys=True): diff.setdefault(f, []).append(k)
            ok = not miss and not diff and not errs; bad += not ok
            print(f"{'OK  ' if ok else 'FIX '}{name}: {len(O)} compounds" + (f'; missing {miss}' if miss else '') + ''.join(f'; {f} differs on {len(v)} ({", ".join(v[:5])})' for f, v in diff.items()) + (f'; errors {errs}' if errs else ''))
        # the Guide keeps its own compound list (C); doses must match the Library
        pg, errs = grab('/', '<script>window.__C=typeof C!=="undefined"?C:null</script>')
        G = json.loads(pg.evaluate("()=>JSON.stringify((window.__C||[]).map(c=>({n:c.n,s:c.s,d:(c.ds||{}).d})))")); pg.close()
        nz = lambda x: re.sub(r'[\s–⁠-]', '', str(x or ''))
        gd = [(g['n'], g.get('d'), (M[g['s']].get('dose') or {}).get('dose')) for g in G if g['s'] in M and g.get('d') and nz(g.get('d')) != nz((M[g['s']].get('dose') or {}).get('dose'))]
        gm = [g['n'] for g in G if g['s'] not in M]
        ok = not gd and not gm and not errs; bad += not ok
        print(f"{'OK  ' if ok else 'FIX '}Guide: {len(G)} compounds" + (f'; not in Library {gm}' if gm else '') + (f'; {len(gd)} doses differ from the Library' if gd else '') + (f'; errors {errs}' if errs else ''))
        for n, a, c in gd: print(f'      {n}: Guide "{a}"  vs  Library "{c}"')
        b.close()
finally:
    srv.terminate()
print('ALL ALIGNED' if not bad else f'{bad} page(s) out of line')
sys.exit(1 if bad else 0)
