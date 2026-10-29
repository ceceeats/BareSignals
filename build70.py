#!/usr/bin/env python3
"""Home v61 = Body v70, from live Home v60 = Body v68: Pairs well with in the Read more card shows partner chips like
the Goes well with chips (colour square + name), each with its one-line reason; tapping a chip opens that compound on the body.
Card only; the body page and labels are untouched. Home v60 kept at /home/v60/."""
import pathlib, sys, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v60").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v60"/"index.html")
def sub(a,b,n=1):
    global src
    c=src.count(a)
    if c!=n: sys.exit(f"expected {n} of {a[:70]!r}, found {c}")
    src=src.replace(a,b)
sub("el.innerHTML=`<h4>Pairs well with</h4><ul class=\"syn\">${names.map(n=>{const t=C.find(x=>x.n===n);return `<li>${t?`<button type=\"button\" class=\"synb\" data-syn=\"${esc(t.s)}\">${esc(n)}</button>`:`<b>${esc(n)}</b>`} ${esc(first(sx[n]))}</li>`;}).join(\"\")}</ul>`;",
    "el.innerHTML=`<h4>Pairs well with</h4><ul class=\"syn\">${names.map(n=>{const t=C.find(x=>x.n===n),col=t?((P[t.p]||P[t.r[0]]||[\"\",\"#E3E0BF\"])[1]):\"#E3E0BF\";return `<li>${t?`<button type=\"button\" class=\"xs synb\" data-syn=\"${esc(t.s)}\"><span class=\"sq\" style=\"background:${col}\"></span>${esc(n)}</button>`:`<span class=\"xs\"><span class=\"sq\" style=\"background:${col}\"></span>${esc(n)}</span>`}<span class=\"synw\">${esc(first(sx[n]))}</span></li>`;}).join(\"\")}</ul>`;")
sub(".bscard .synb{all:unset;cursor:pointer;font-weight:600;text-decoration:underline;text-underline-offset:2px}","")
sub(".bscard .syn li{margin-bottom:4px}", ".bscard .syn{list-style:none;padding:0;margin:0}.bscard .syn li{margin:0 0 8px;display:flex;flex-direction:column;align-items:flex-start;gap:3px}.bscard .syn .synb{font:inherit;font-size:12px;cursor:pointer;background:none}.bscard .syn .synw{font-size:11.5px;line-height:1.35;color:#5A6390}")
sub("<!doctype html><!-- Home v60 = Body v68 (30 Oct 2026):", "<!doctype html><!-- Home v61 = Body v70 (30 Oct 2026): Pairs well with as chips like Goes well with (colour square + name, its reason underneath), tap opens that compound on the body. Card only. Home v60 kept at /home/v60/. Earlier: Home v60 = Body v68 (30 Oct 2026):")
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
