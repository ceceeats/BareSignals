from playwright.sync_api import sync_playwright
pages=['/','/supplements/','/library/goals/','/library/aims/','/dosage/','/blood/','/protocol/','/aminos/']
qs=['my knees hurt','hormone','acne','lose weight']
with sync_playwright() as p:
    b=p.chromium.launch(executable_path='/usr/bin/google-chrome',args=['--no-sandbox'])
    for u in pages:
        pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:120]))
        pg.route('**/fonts.g*/**',lambda r:r.abort())
        pg.goto('http://localhost:8765'+u); pg.wait_for_timeout(1800)
        inp=[i for i in pg.query_selector_all('input[type=search], input#q, input.q1') if i.is_visible()]
        if not inp: print(u,'NO VISIBLE SEARCH', errs); pg.close(); continue
        res=[]
        for q in qs:
            inp[0].fill(q); pg.wait_for_timeout(500)
            n=pg.evaluate("()=>document.body.innerText.length")
            res.append(f'{q}:{n}')
        fs=pg.evaluate("(e)=>getComputedStyle(e).fontSize",inp[0])
        print(u,'font',fs,res,'errors',errs[:2]); pg.close()
    b.close()
