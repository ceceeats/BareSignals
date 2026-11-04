#!/usr/bin/env python3
"""Library v85 (4 Nov 2026, built on v84, v84 kept): doses approved by Cece from Dose History v3.
Card headline = the approved community dose (no more label or trial headlines), every compound carries a research
status (Researched / Partially researched / Not researched in humans / Clinical only) shown as the small print under
the dose, and the full page adds why the range is wide and how people step up. Dose numbers live here only; Dosage,
Protocol and the QR pages read this version."""
import pathlib, shutil, json, re, subprocess, sys
R = pathlib.Path(__file__).resolve().parent
SRC, DST = R/"library"/"v84", R/"library"/"v85"
APPROVED = json.loads((R.parent/"approved_v3.json").read_text(encoding="utf-8"))
if DST.exists(): shutil.rmtree(DST)
shutil.copytree(SRC, DST)

# ---- data.js: card dose fields + status/why/steps/start
data = (DST/"data.js").read_text(encoding="utf-8")
m = re.search(r"window\.BS_DATA=(\[.*\]);?\s*$", data, re.S)
assert m, "BS_DATA not found"
D = json.loads(m.group(1))
n = 0
for o in D:
    a = APPROVED.get(o["slug"])
    if not a: continue
    d = o.get("dose") or {}
    for k in ("dose", "freq", "cycle", "route"):
        if a.get(k): d[k] = a[k]
    for k in ("status", "start", "why", "steps", "tiernote"):
        if a.get(k): d[k] = a[k]
    if d.get("conf") == "verified" and a.get("status") in ("researched", "partial", "few"): d["conf"] = "reported"
    d["approved"] = "2026-11-04"
    o["dose"] = d; n += 1
data = data[:m.start(1)] + json.dumps(D, ensure_ascii=False, separators=(",", ":")) + data[m.end(1):]
data = data.replace("/* Bare Signals Library v50 core data", "/* Bare Signals Library v85 data: doses approved 4 Nov 2026 (Dose History v3). Built on v50 core data", 1)
(DST/"data.js").write_text(data, encoding="utf-8")


# ---- page.js: community tiers brought in line with the approved research (sources kept)
TP = {
 "retatrutide": {"Common": ("2–8 mg", "most people; middle 4 mg (76 reports, Research Log)")},
 "cagrilintide": {"Common": ("0.25–2.4 mg/wk", "most people, often with another GLP-1; middle 0.6 mg (23 reports)")},
 "semaglutide": {"Standard": ("0.5–2.4 mg", "most hold at 0.5 to 1.7 mg; middle 1 mg (50 reports)")},
 "semax": {"Common": ("400 mcg–1 mg/day", "nasal; middle 0.75 mg a day (19 reports)")},
 "selank": {"Common": ("200–400 mcg", "nasal, 1 to 3 times a day; middle 0.4 mg a day (16 reports)")},
 "pinealon": {"Common injected": ("100 mcg–1 mg", "focus and sleep, mornings; aggregators, few counted reports")},
 "na-semax-amidate": {"Common": ("100–300 mcg", None)},
 "na-selank-amidate": {"Common": ("100–200 mcg", None)},
}
ORDER = {"5-amino-1mq": ["Injected, most", "Injected, high group", "Oral", "Oral, aggressive"],
         "epitalon": ["Higher", "Common", "Aggressive"]}
RELABEL = {"epitalon": {"Higher": "Common", "Common": "Lower"}}
pg = (DST/"page.js").read_text(encoding="utf-8")
key = "window.BS_PAGE="; i = pg.index(key) + len(key)
P, end = json.JSONDecoder().raw_decode(pg[i:])
for slug, ch in TP.items():
    for t in P[slug]["dose"]["tiers"]:
        if t["label"] in ch:
            t["dose"], who = ch[t["label"]]
            if who: t["who"] = who
for slug, order in ORDER.items():
    T = P[slug]["dose"]["tiers"]; T.sort(key=lambda t: order.index(t["label"]) if t["label"] in order else 99)
for slug, rl in RELABEL.items():
    for t in P[slug]["dose"]["tiers"]:
        if t["label"] in rl: t["label"] = rl[t["label"]]
pg = pg[:i] + json.dumps(P, ensure_ascii=False, separators=(",", ":")) + pg[i+end:]
(DST/"page.js").write_text(pg, encoding="utf-8")

# ---- index.html: status small print, why + steps on the full page
h = (DST/"index.html").read_text(encoding="utf-8")
conf = re.search(r"const CONF=\{[^;]*\};", h).group(0)
STAT = ("const STAT={researched:'Community dose. Experimental: each person picks their own dose within the range.',"
        "partial:'Partially researched. From protocol sites; reports not counted yet. Common dose, experimental.',"
        "few:'Partially researched. Few reports. This is the common dose people use, not a tested one. Start low, go slow.',"
        "nohuman:'No human dose data. Animal, patent or vendor numbers only. Highest caution.',"
        "clinical:'Only trial or label doses exist. No community dose yet.',"
        "blend:'Blend: each part follows its own dose, set by the ratio.'};"
        "const cf=x=>(x&&STAT[x.status])||(x&&CONF[x.conf])||'';"
        "const dwhy=d=>(d&&d.why?`<div class=\"tnote\"><b>Why the range is wide</b>${esc(d.why)}</div>`:'')+(d&&d.steps?`<div class=\"tnote\"><b>Stepping up</b>${esc(d.steps)}</div>`:'');")
PAT = r"(?<![A-Za-z_])CONF\[(\w)\.conf\]"
k = len(re.findall(PAT, h))
h = re.sub(PAT + r"\|\|''", r"cf(\1)", h)
h = re.sub(PAT, r"cf(\1)", h)
h = h.replace(conf, conf + STAT, 1)
# card: the research status sits right under the dose cells, small print
hc = re.findall(r"const hcells=`<div class=\"hdc\">\$\{cells\.map\(c=>`<div><span>\$\{c\[0\]\}</span><b>\$\{sh\(c\[1\]\)\}</b></div>`\)\.join\(''\)\}</div>`", h)
for x in set(hc):
    h = h.replace(x, x[:-1] + "${typeof d!==\"undefined\"&&d&&d.status?`<p class=\"hst s-${d.status}\">${esc(cf(d))}</p>`:''}`")
h = h.replace("</style>", ".hst{flex-basis:100%;width:100%;margin:4px 0 0;font-size:calc(11px*var(--k));line-height:1.35;color:var(--warn,#9E1B32)}.hst.s-researched{color:var(--ink-soft)}.hst.s-clinical{color:var(--ink-soft)}</style>", 1)
print("card status hooks:", len(hc))
assert "${tiers}${alt}" in h and "${oth}${altH}" in h
h = h.replace("${tiers}${alt}", "${tiers}${dwhy(d)}${alt}", 1).replace("${oth}${altH}", "${oth}${dwhy(d)}${altH}", 1)
h = re.sub(r"(\d+) versions · last updated [^<\"']*", lambda mm: f"{int(mm.group(1))+1} versions · last updated 4 Nov 2026", h, count=1)
h = h.replace("<!-- Library v84 (", "<!-- Library v85 (4 Nov 2026, built on v84, v84 kept): doses approved by Cece (Dose History v3): card headline is the community dose, research status under every dose, full page adds why the range is wide and how people step up. -->\n<!-- Library v84 (", 1)
assert h.count("x.community&&x.community!==d?")>=1
h = h.replace("x.community&&x.community!==d?", "x.community&&x.community!==d&&!(d&&d.status)?")
(DST/"index.html").write_text(h, encoding="utf-8")

(R/"library"/"index.html").write_text((R/"library"/"index.html").read_text(encoding="utf-8").replace("v84/", "v85/"), encoding="utf-8")
print("v85 built:", n, "compounds updated,", k, "status hooks")
