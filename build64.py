#!/usr/bin/env python3
"""Preview Body v64 (from live Home v59 = Body v61): ears glow with the skin. Nothing else.
Same ear change as Body v62 (ear skin drawn under the glow, own wider glow filter, glow as wide as the body's)
plus the Body v63 guard: the body-width measure skips the ear skin. Writes home/b64/index.html, live untouched."""
import pathlib, re, sys
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
ears=re.findall(r'<path class="skin film earskin"[^>]*/>', src); assert len(ears)==4
for e in ears: src=src.replace(e,"",1)
for sex in ("fem","mal"):
    a=src.index(f'id="{sex}"'); g=src.index('class="skinglow earglow"', a); p=src.rfind('<path',0,g)
    mine=[e for e in ears if e not in src][:2]; src=src[:p]+"".join(mine)+src[p:]; ears=[e for e in ears if e not in mine]
    f=f'<filter id="soft-{sex}" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="4"/></filter>'
    sub(f, f+f'<filter id="soft-ear-{sex}" x="-150%" y="-60%" width="400%" height="220%"><feGaussianBlur stdDeviation="4"/></filter>')
    src=src.replace(f'class="skinglow earglow" filter="url(#soft-{sex})"', f'class="skinglow earglow" filter="url(#soft-ear-{sex})"')
assert src.count("url(#soft-ear-")==4
sub("svg:has(.film.skin.on) .skinglow.earglow{stroke-width:9!important}", "svg:has(.film.skin.on) .skinglow.earglow{stroke-width:12!important}")
sub("const sk=s.querySelector('.film[data-k=\"skin\"]')||", "const sk=s.querySelector('.film[data-k=\"skin\"]:not(.earskin)')||")
sub("<!doctype html><!-- Home v59 = Body v61 (29 Oct 2026):", "<!doctype html><!-- Preview Body v64 (29 Oct 2026, not live): ears glow with the skin, nothing else changed. Built from Home v59 = Body v61 (29 Oct 2026):")
o=R/"home"/"b64"; o.mkdir(parents=True, exist_ok=True); (o/"index.html").write_text(src, encoding="utf-8"); print("ok")
