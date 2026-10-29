#!/usr/bin/env python3
"""Preview Body v66 = preview Body v64 (ear glow) + a "Pairs well with" section in the Read more card:
up to 3 partners with the Library's own one-line reason (Library page.js "sx", loaded only when a card opens);
a partner that is on the page opens its own view. Writes home/b66/index.html; live untouched."""
import pathlib, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"home"/"b64"/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub(" ${c.st?`<h4>Status</h4><p style=\"margin:0;font-size:12.5px\">${esc(c.st)}</p>`:\"\"}\n <div class=\"ft\">",
    " <div id=\"cardsyn\"></div>\n ${c.st?`<h4>Status</h4><p style=\"margin:0;font-size:12.5px\">${esc(c.st)}</p>`:\"\"}\n <div class=\"ft\">")
sub(' document.body.appendChild(bg);document.documentElement.style.overflow="hidden";\n bg.addEventListener("click",e=>{if(e.target===bg||e.target.closest("[data-x]"))closeCard();});}',
    ' document.body.appendChild(bg);document.documentElement.style.overflow="hidden";\n bg.addEventListener("click",e=>{if(e.target===bg||e.target.closest("[data-x]"))closeCard();const sp=e.target.closest("[data-syn]");if(sp){const t=C.find(x=>x.s===sp.dataset.syn);if(t){closeCard();openComp(t);}}});cardSyn(c);}\n'
    'let SYNP=null;function cardSyn(c){const el=$("cardsyn");if(!el)return;const go=()=>{const P2=window.BS_PAGE||{},sx=(P2[c.s]||{}).sx||{};const names=Object.keys(sx).slice(0,3);if(!names.length||$("cardsyn")!==el)return;'
    'const first=t=>{const m=String(t||"").match(/^.+?[.!?](?=\\s|$)/);return m?m[0]:String(t||"");};'
    'el.innerHTML=`<h4>Pairs well with</h4><ul class="syn">${names.map(n=>{const t=C.find(x=>x.n===n);return `<li>${t?`<button type="button" class="synb" data-syn="${esc(t.s)}">${esc(n)}</button>`:`<b>${esc(n)}</b>`} ${esc(first(sx[n]))}</li>`;}).join("")}</ul>`;};'
    'if(window.BS_PAGE)return go();if(!SYNP){SYNP=new Promise(r=>{const sc=document.createElement("script");sc.src=(/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)?"":BASE)+"/library/v79/page.js";sc.onload=sc.onerror=()=>r();document.head.appendChild(sc);});}SYNP.then(go);}')
sub(".ctags .nhead .nchip{border-top:0}", ".ctags .nhead .nchip{border-top:0}.bscard .syn li{margin-bottom:4px}.bscard .synb{all:unset;cursor:pointer;font-weight:600;text-decoration:underline;text-underline-offset:2px}")
sub("<!-- Preview Body v64 (29 Oct 2026, not live): ears glow with the skin, nothing else changed.", "<!-- Preview Body v66 (30 Oct 2026, not live): Read more card gets 'Pairs well with' (3 partners, the Library's reason, tap opens that compound); plus Body v64 ear glow.")
o=R/"home"/"b66"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
