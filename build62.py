#!/usr/bin/env python3
"""Home v54 = Body v62, from live Home v53 (kept at /home/v53/): ears get the skin glow.
The ear skin was painted on top of the ear glow, so the glow was hidden. Ear skin now sits
under the glow, and the ear glow is as wide as the body glow."""
import pathlib, re, sys, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v53").mkdir(parents=True, exist_ok=True)
shutil.copy(R/"index.html", R/"home"/"v53"/"index.html")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
ears=re.findall(r'<path class="skin film earskin"[^>]*/>', src)
assert len(ears)==4, len(ears)
for e in ears: src=src.replace(e,"",1)
for sex in ("fem","mal"):
    a=src.index(f'id="{sex}"'); g=src.index('class="skinglow earglow"', a)
    p=src.rfind('<path', 0, g)
    mine=[e for e in ears if e not in src][:2]
    src=src[:p]+"".join(mine)+src[p:]
    ears=[e for e in ears if e not in mine]
sub(".skinglow.earglow{stroke-width:3!important", ".skinglow.earglow{stroke-width:3!important")
sub("svg:has(.film.skin.on) .skinglow.earglow{stroke-width:9!important}", "svg:has(.film.skin.on) .skinglow.earglow{stroke-width:12!important}")
sub("<!doctype html><!-- Home v53 = Body v61 (29 Oct 2026):",
    "<!doctype html><!-- Home v54 = Body v62 (29 Oct 2026): the ears glow with the skin like the rest of the body outline (ear skin moved under the glow, ear glow as wide as the body glow). Home v53 kept at /home/v53/. Earlier: Home v53 = Body v61 (29 Oct 2026):")
for sx in ("fem","mal"):
    f=f'<filter id="soft-{sx}" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="4"/></filter>'
    sub(f, f+f'<filter id="soft-ear-{sx}" x="-150%" y="-60%" width="400%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>')
    src=re.sub(f'class="skinglow earglow" filter="url\\(#soft-{sx}\\)"', f'class="skinglow earglow" filter="url(#soft-ear-{sx})"', src)
assert src.count("url(#soft-ear-")==4, src.count("url(#soft-ear-")
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
