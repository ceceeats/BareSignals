#!/usr/bin/env python3
"""Library v81 (preview) from Library v80 + Home v55 from Home v54: 'Tested so far' rows synced with the checked studies
(studies.json), as flagged by studycheck.py. Each fix: (slug, row text, new text or None, new level or None).
Adds append a row. REL marks rows that were tested on a related molecule (not counted as this compound's evidence)."""
import pathlib, shutil, json, re, sys
R = pathlib.Path(__file__).resolve().parent
T = "trial"
FIX = [(s,t,None,T) for s,t in [
 ("mt-2","Sunless tanning"),("liraglutide","CV outcomes, LEADER"),("liraglutide","Obesity, SCALE program"),
 ("orforglipron","Obesity, ATTAIN-1 and -2"),("survodutide","MASH with fibrosis, Phase 2 and LIVERAGE"),("survodutide","Obesity, SYNCHRONIZE-1"),
 ("tesofensine","Obesity, Phase 2 TIPO-1"),("mazdutide","Obesity, GLORY-1 and GLORY-2"),("eloralintide","Obesity without diabetes, Phase 2"),
 ("amycretin","Obesity, Sub-Q phase 1b/2a and oral phase 1"),("vk2735","Weight loss in obesity, VENTURE and VENTURE-Oral"),
 ("maritide","Obesity, phase 1 and 52-wk phase 2"),("pemvidutide","MASH resolution and liver fat, IMPACT"),
 ("abaloparatide","Vertebral fractures, ACTIVE"),("bimagrumab","Obesity with type 2 diabetes, Phase 2")]] + [
 ("epitalon","Mortality in elderly cohorts","Mortality in elderly cohorts, pineal extract Epithalamin",None),
 ("bpc-157","Ulcerative colitis, enema","Ulcerative colitis enema, results never published",None),
 ("aod-9604","Obesity","Obesity trials, results only in company reports",None),
 ("adipotide","Obese men with prostate cancer","Obese men with prostate cancer, phase 1, 4 men, stopped early",None)]
ADD = [("bpc-157",["Neuroprotection","Cut sciatic nerve","rat"]),("retatrutide",["Appetite","Stomach emptying, phase 1b","trial"]),
 ("tirzepatide",["Appetite","Stomach emptying","trial"]),("tirzepatide",["Fat","Fat cells via the GIP receptor","cell"]),
 ("tirzepatide",["Reward","Food craving brain signal, one person","human"]),("mots-c",["Muscle","Physical capacity in old mice","mouse"]),
 ("ipamorelin",["Bone","Bone mineral content","rat"]),("sermorelin",["Muscle","IGF-1 and lean mass in older adults","human"]),
 ("5-amino-1mq",["Muscle","Aged muscle stem cells and regrowth","mouse"]),("exenatide",["Heart","Heart outcomes, EXSCEL","trial"]),("nadplus",["Aging","NAD decline with age via CD38","mouse"]),
]
REL_ADD = {"epitalon":["Mortality in elderly cohorts, pineal extract Epithalamin"],"nadplus":["NR and NMN raise blood NAD"]}

def span(src, key):  # object text of one compound
    i = src.index(key); a = src.rfind("{", 0, i)
    while src[a+1:a+3] not in ('"n','"s'): a = src.rfind("{", 0, a)
    d=0
    for j in range(a, len(src)):
        d += src[j]=="{"; d -= src[j]=="}"
        if d==0: return a, j+1
def patch(src, slugkey, sep, rowkey):
    log=[]
    def row(r): return "["+sep.join(json.dumps(x, ensure_ascii=False) for x in r)+"]"
    for s,t,nt,nl in FIX:
        a,b = span(src, slugkey(s)); o = src[a:b]
        m = re.search(r'\["[A-Za-z]+",'+(" " if sep==", " else "")+re.escape(json.dumps(t,ensure_ascii=False))+r',\s?"([a-z]+)"\]', o)
        if not m: log.append(f"skip {s}: {t}"); continue
        old = m.group(0); role = re.match(r'\["([A-Za-z]+)"', old).group(1)
        new = row([role, nt or t, nl or m.group(1)])
        src = src[:a] + o.replace(old, new, 1) + src[b:]
    for s,r in ADD:
        a,b = span(src, slugkey(s)); o = src[a:b]
        k = o.find(rowkey)
        if k<0: log.append(f"no rows {s}"); continue
        e = o.index("]]", k) + 1
        src = src[:a] + o[:e] + sep + row(r) + o[e:] + src[b:]
    return src, log

# Library v81
v80, v81 = R/"library"/"v80", R/"library"/"v81"
if v81.exists(): sys.exit("library/v81 exists")
shutil.copytree(v80, v81)
d = (v81/"data.js").read_text(encoding="utf-8")
d, log = patch(d, lambda s: f'"slug":"{s}"', ",", '"tst":[')
print("library", log); (v81/"data.js").write_text(d, encoding="utf-8")
h = (v81/"index.html").read_text(encoding="utf-8")
m = re.search(r"const REL=(\{.*?\});", h); rel = json.loads(m.group(1).replace("'",'"'))
for k,v in REL_ADD.items(): rel.setdefault(k,[]).extend(v)
h = h.replace(m.group(0), "const REL="+json.dumps(rel, ensure_ascii=False, separators=(",",":")).replace('"',"'")+";")
h = h.replace("<!-- Library v80 (29 Oct 2026", "<!-- Library v81 (29 Oct 2026, built on v80, v80 kept): 'Tested so far' rows synced with the checked studies (studycheck.py): 15 trial rows marked as trials, 11 rows added for studied areas, epitalon's elderly-mortality row is the pineal extract Epithalamin and NAD+'s NR/NMN row are related molecules (not counted), unpublished BPC-157 colitis, AOD-9604 obesity and adipotide trials say so. -->\n<!-- Library v80 (29 Oct 2026", 1)
(v81/"index.html").write_text(h, encoding="utf-8")
# Home
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v54").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v54"/"index.html")
m = re.search(r"const C=(\[.*?\]);\n", src, re.S); c0 = m.group(1)
c1, log = patch(c0, lambda s: f'"s": "{s}"', ", ", '"t": [')
print("home", log)
src = src.replace(c0, c1, 1)
src = src.replace("<!doctype html><!-- Home v54 = Body v62 (29 Oct 2026):", "<!doctype html><!-- Home v55 = Body v62 (29 Oct 2026): tested rows synced with the checked studies, same fixes as Library v81 (trial rows marked as trials, rows added for studied areas, epitalon's elderly-mortality row named as the extract Epithalamin, unpublished trials say so). Home v54 kept at /home/v54/. Earlier: Home v54 = Body v62 (29 Oct 2026):", 1)
(R/"index.html").write_text(src, encoding="utf-8")
