"""Messy visitor test (20 Nov 2026). Opens each page at phone width and taps every visible button, link, tab,
toggle and dropdown in random order, like a visitor poking at everything. Records:
  - script errors and console errors
  - links or files that fail to load (404 and other errors) on this site
  - taps that make the page wider than the phone (sideways scroll)
  - inputs smaller than 16px (the iPhone zooms in on them)
Usage: python3 tools/click_test.py OUT.json PAGE [PAGE ...]   (serve the repo on localhost:8765 first)"""
import json, random, sys, time
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
BASE = 'http://localhost:8765'
SEL = 'a[href], button, [role=button], [role=tab], summary, select, input[type=checkbox], input[type=radio], [data-s], [onclick]'
out, pages = sys.argv[1], sys.argv[2:]
random.seed(7)
import os
R = json.load(open(out)) if os.path.exists(out) else {}
with sync_playwright() as p:
    br = p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
    for url in pages:
        if url in R: continue
        rec = {'errors': [], 'bad_loads': [], 'overflow': [], 'zoom_inputs': [], 'taps': 0, 'left_page': []}
        ctx = br.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
        pg = ctx.new_page(); pg.set_default_timeout(2500)
        pg.route('**/fonts.g*/**', lambda r: r.abort())
        pg.route('**/goatcounter*/**', lambda r: r.abort())
        pg.on('pageerror', lambda e: rec['errors'].append(str(e)[:160]))
        pg.on('console', lambda m: m.type == 'error' and 'Failed to load resource' not in m.text and rec['errors'].append('console: ' + m.text[:160]))
        def resp(r):
            u = urlparse(r.url)
            if u.hostname == 'localhost' and r.status >= 400: rec['bad_loads'].append(f'{r.status} {u.path}')
        pg.on('response', resp)
        try:
            pg.goto(BASE + url, wait_until='load', timeout=20000); pg.wait_for_timeout(1800)
        except Exception as e:
            rec['errors'].append('load: ' + str(e)[:120]); R[url] = rec; ctx.close(); continue
        rec['zoom_inputs'] = pg.evaluate("""()=>[...document.querySelectorAll('input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]),select,textarea')]
            .filter(e=>e.offsetParent&&parseFloat(getComputedStyle(e).fontSize)<16).map(e=>(e.id||e.name||e.placeholder||e.tagName).slice(0,40)+' '+getComputedStyle(e).fontSize)""")
        n = pg.evaluate(f"()=>document.querySelectorAll({json.dumps(SEL)}).length")
        order = list(range(n)); random.shuffle(order)
        t0 = time.time()
        for i in order[:70]:
            if time.time() - t0 > 70: rec['errors'].append('note: stopped after 70 s budget'); break
            try:
                el = pg.query_selector_all(SEL)
                if i >= len(el): continue
                e = el[i]
                if not e.is_visible(): continue
                label = (e.inner_text() or e.get_attribute('aria-label') or e.get_attribute('href') or '')[:40].replace('\n', ' ')
                href = e.get_attribute('href') or ''
                if href.startswith(('http', 'mailto', 'tel', 'sms', 'whatsapp')) and 'baresignals' not in href: continue
                before = pg.url
                e.click(timeout=1200, no_wait_after=True); rec['taps'] += 1
                pg.wait_for_timeout(350)
                ow = pg.evaluate('()=>[document.documentElement.scrollWidth,innerWidth]')
                if ow[0] > ow[1] + 2: rec['overflow'].append(f'after "{label}": page {ow[0]}px wide')
                if urlparse(pg.url).path != urlparse(before).path:
                    rec['left_page'].append(urlparse(pg.url).path)
                    pg.goto(BASE + url, wait_until='load'); pg.wait_for_timeout(900)
                for k in ('Escape',): pg.keyboard.press(k)
            except Exception as ex:
                if 'Timeout' not in str(ex) and 'detached' not in str(ex) and 'not attached' not in str(ex):
                    rec['errors'].append('tap: ' + str(ex)[:100])
                try:
                    if urlparse(pg.url).path != url: pg.goto(BASE + url, wait_until='load'); pg.wait_for_timeout(700)
                except Exception: pass
        rec['bad_loads'] = sorted(set(rec['bad_loads'])); rec['errors'] = sorted(set(rec['errors']))
        rec['overflow'] = sorted(set(rec['overflow']))[:6]; rec['left_page'] = sorted(set(rec['left_page']))
        R[url] = rec; ctx.close()
        json.dump(R, open(out, 'w'), indent=1)
        print(url, rec['taps'], 'taps', len(rec['errors']), 'err', len(rec['bad_loads']), '404', len(rec['overflow']), 'ovf', flush=True)
    br.close()
