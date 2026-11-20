import sys,json
from playwright.sync_api import sync_playwright
qs=[l.strip() for l in open('/home/claude/sweep/q.txt') if l.strip()]
url=sys.argv[1]; out={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    pg=b.new_page(viewport={'width':390,'height':844}); pg.route('**/fonts.g*/**',lambda r:r.abort())
    pg.goto(url); pg.wait_for_timeout(1500)
    for q in qs:
        pg.fill('#q',q); pg.wait_for_timeout(250)
        r=pg.evaluate("()=>({p:[...document.querySelectorAll('#grid > *')].map(e=>(e.getAttribute('aria-label')||'').split(',')[0]), o:[...document.querySelectorAll('#ar114 .lvs')].map(s=>[s.querySelector('h2').textContent,[...s.querySelectorAll('li .n, li b')].map(x=>x.textContent.trim())])})")
        out[q]=r
    b.close()
json.dump(out,open(sys.argv[2],'w'))
for q,r in out.items():
    o='; '.join(f"{h}:{len(n)}" for h,n in r['o'])
    print(f"{q[:22]:22} P{len(r['p']):3} {o[:40]:40} | {', '.join(r['p'][:6])[:90]}")
