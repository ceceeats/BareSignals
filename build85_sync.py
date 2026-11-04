#!/usr/bin/env python3
"""4 Nov 2026 sync after Library v85 (approved doses): every page that shows a dose reads Library v85.
Protocol v37 (v36 kept), Dosage v29 (v28 kept), Scan v22 (v21 kept, rebuilt by scan/tools/build.js from v85 using the
approved headline and start dose), Plan v7 (v6 kept) loads Scan v22."""
import pathlib, shutil, re, subprocess, os
R = pathlib.Path(__file__).resolve().parent
shutil.copy(R/"library/v79/merge.js", R/"library/v85/merge.js")
def ver(page, old, new, subs):
    src, dst = R/page/old, R/page/new
    if dst.exists(): shutil.rmtree(dst)
    shutil.copytree(src, dst)
    f = dst/"index.html"; h = f.read_text(encoding="utf-8")
    for a, b in subs:
        assert a in h, (page, a); h = h.replace(a, b)
    f.write_text(h, encoding="utf-8")
    ix = R/page/"index.html"; t = ix.read_text(encoding="utf-8")
    assert old+"/" in t, (page, "index"); ix.write_text(t.replace(old+"/", new+"/"), encoding="utf-8")
ver("protocol", "v36", "v37", [("/library/v79/", "/library/v85/"),
    ("range:'1–50 mg injected · thin human data, start low'", "range:'1–10 mg injected · common 5 mg, partially researched'"),
    ("chips:['1 mg','2.5 mg','5 mg','10 mg','25 mg','50 mg']", "chips:['1 mg','2.5 mg','5 mg','10 mg']")])
ver("dosage", "v28", "v29", [("/library/v79/", "/library/v85/"), ("<small>V28</small>", "<small>V29</small>"),
    ("if(d){const k=d.conf==='verified'?'label':'community';if(!r[k])r[k]=d}", "if(d&&d.status){r.community=d}else if(d){const k=d.conf==='verified'?'label':'community';if(!r[k])r[k]=d}")])
# scan v22
s21, s22 = R/"scan/v21", R/"scan/v22"
if s22.exists(): shutil.rmtree(s22)
shutil.copytree(s21, s22)
for f in s22.glob("*.html"):
    f.write_text(f.read_text(encoding="utf-8").replace("/scan/v21/", "/scan/v22/"), encoding="utf-8")
b = R/"scan/tools/build.js"; js = b.read_text(encoding="utf-8")
if "APPROVED HEADLINE" not in js:
    old_t = "const tier=(ds0.tiers||[]).find("
    assert old_t in js
    js = js.replace(old_t, "/* APPROVED HEADLINE (Library v85+, Cece 4 Nov 2026): a dose with a status was approved as the community headline, so the scan uses it and its start dose as they are. */\n const APP=!!ds0.status;\n const tier=APP?null:((ds0.tiers||[]).find(", 1)
    js = js.replace("t.tag!=='label')||null;", "t.tag!=='label')||null);", 1)
    old_s = "let start=pr.start||tstart||chips[0]||'';"
    assert old_s in js
    js = js.replace(old_s, "let start=pr.start||(APP&&ds0.start)||tstart||chips[0]||'';", 1)
    b.write_text(js, encoding="utf-8")
env = dict(os.environ, SCAN_V="v22")
print(subprocess.run(["node", "scan/tools/build.js"], cwd=R, env=env, capture_output=True, text=True))
ver("plan", "v6", "v7", [("/scan/v20/", "/scan/v22/")])
print("sync done")
