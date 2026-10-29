#!/usr/bin/env python3
"""Studies x Library check. Run after every research batch.
Reads /studies.json, the Library data (newest library/vNN), and the home label notes,
and lists where the Library or a home label disagrees with a checked study:
  MISSING  compound has a study but no Library entry
  NOROLE   study tests an area the Library 'Tested so far' list does not show
  UNDER    Library says a weaker kind of evidence than the study we found
  OVER     Library says stronger evidence than every study we have for that area (look for the trial or lower the claim)
  NUMBER   a % in a home label tied to a checked study that the study does not contain
Writes studycheck.txt; nothing is changed.
RULES before acting on any flag (Cece, 29 Oct 2026):
  - Open the compound's Log first (link printed with each flag, from the Bare Signals Index Tracker).
    The Log says where every Library line came from and which pool: App data, Reddit, Other forums, Research.
  - Community numbers and doses (reported, from users) are a different pool from trial numbers and doses.
    Never change one to match the other. A flag only means "trace the source", never "replace".
  - Change a line only after checking all its sources; research against research, anecdotal against anecdotal.
  - Every change goes into the Log as a dated entry and into a new Library and Home version."""
import json, re, subprocess, pathlib, sys, collections
R = pathlib.Path(__file__).resolve().parent
libv = sorted((p for p in (R/"library").glob("v*") if p.name[1:].isdigit()), key=lambda p:int(p.name[1:]))[-1]
js = lambda f: json.loads(subprocess.check_output(["node","-e",f'global.window={{}};require("{libv}/{f}");process.stdout.write(JSON.stringify(window[Object.keys(window).find(k=>k!=="BS_PALETTE")]))']))
LIB = {c["slug"]:c for c in js("data.js")}
PAGE = js("page.js")
ST = json.load(open(R/"studies.json"))
html = (R/"index.html").read_text(encoding="utf-8")
m = re.search(r"const C=(\[.*?\]);\n", html, re.S)
HOME = {c["s"]:c for c in json.loads(m.group(1))} if m else {}
SR = {"P3":4,"P2":4,"P1":4,"HUMAN":3,"ANIMAL":2,"LAB":1,"USERS":0}
LR = {"trial":4,"human":3,"animal":2,"mouse":2,"rat":2,"monkey":2,"cell":1,"lab":1,"users":0,"none":-1}
pct = lambda s: set(re.findall(r"\d+(?:\.\d+)?(?=\s?%)", s or ""))
out = collections.defaultdict(list)
by = collections.defaultdict(list)
for x in ST: by[x["slug"]].append(x)
STOP=set("with from that this into after before over under rats mice mouse phase trial trials study studies people adults humans human healthy older the and for raises speeds".split())
tok=lambda t:{w for w in re.findall(r"[a-z0-9][a-z0-9-]{3,}",(t or "").lower()) if w not in STOP}
REL=json.loads(re.search(r"const REL=(\{.*?\});",(libv/"index.html").read_text()).group(1).replace("'",'"'))
OKF=R/"studycheck_ok.json"; OK=json.load(open(OKF)) if OKF.exists() else {}
for slug, xs in by.items():
    c = LIB.get(slug)
    if not c: out[slug].append("MISSING  no Library entry"); continue
    if c.get("blend"): continue
    tst = [t for t in (c.get("tst") or []) if t[1] not in REL.get(slug,[])]
    for x in xs:
        if OK.get(slug+"|"+x["url"]): continue
        best = SR.get(x["type"],-1)
        rows = [t for t in tst if tok(t[1]) & tok(x["t"])] or [t for t in tst if t[0]==x["r"]]
        if not rows: out[slug].append(f"NOROLE   {x['type']} '{x['t']}': no Library 'Tested so far' row for it"); continue
        lv = max(LR.get(t[2],-1) for t in rows)
        if lv==4 and best==3: lv=3
        if lv < best: out[slug].append(f"UNDER    '{rows[0][1]}' is {'/'.join(t[2] for t in rows)} in Library, checked study is {x['type']}: {x['t']}")
    for role in sorted({t[0] for t in tst}):
        rows=[t for t in tst if t[0]==role]; lv=max(LR.get(t[2],-1) for t in rows)
        xs2=[x for x in xs if x["r"]==role or any(tok(t[1])&tok(x["t"]) for t in rows)]
        if not xs2 or OK.get(slug+"|"+role): continue
        best=max(SR.get(x["type"],-1) for x in xs2)
        if lv==4 and best==3: best=4
        if lv > best: out[slug].append(f"OVER     {role}: Library says {'/'.join(t[2] for t in rows)} ('{rows[0][1]}'), best checked study is {[x['type'] for x in xs2]}")
    have = set().union(*(pct(x.get("f","")+" "+x.get("t","")) for x in xs))
    h = HOME.get(slug)
    if h:
        for o in h.get("o") or []:
            if any(x["r"]==o.get("r") and x["at"]==o.get("at") for x in xs):
                miss = pct(o.get("note","")) - have
                if miss: out[slug].append(f"NUMBER   home label {o.get('at')}: '{o.get('note')}' has {sorted(miss)}% not in its checked study")
LOGS = json.load(open(R/"studycheck_logs.json")) if (R/"studycheck_logs.json").exists() else {}
rank = {c["slug"]:c.get("rank") or 999 for c in LIB.values()}
lines = [f"Studies x Library check · {len(ST)} studies · Library {libv.name} · {sum(map(len,out.values()))} flags\n"]
for slug in sorted(out, key=lambda s: rank.get(s,999)):
    lines.append(f"{slug} (rank {rank.get(slug,'-')}) · Log: {LOGS.get(slug,'no log yet')}"); lines += ["  "+l for l in out[slug]]
(R/"studycheck.txt").write_text("\n".join(lines)+"\n")
print(lines[0]); print(collections.Counter(l.split()[0] for v in out.values() for l in v))
