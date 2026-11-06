#!/usr/bin/env python3
"""Library v92 from v91 (Cece 6 Nov 2026): fill the TB-500 frag 1-4 (Ac-SDKP) dose,
modelled on P21's no-dose template. Card dose in data.js, full-page dose in page.js,
status line expanded. Current pointer (library/index.html) stays on v91 (preview)."""
import pathlib, shutil, json
R = pathlib.Path(__file__).resolve().parent
src, dst = R/"library/v91", R/"library/v92"
if dst.exists(): shutil.rmtree(dst)
shutil.copytree(src, dst)

# ---- new content (modelled on P21) ----
MAIN = ("Endogenous Tβ4 1–4 fragment. Human data exists, but not for self-use: a "
        "healthy-volunteer PK study dosed 128 nmol/kg Sub-Q (~4 mg for a 70 kg adult), "
        "and the old Seraspenide chemo-protection trials infused it continuously because "
        "it clears in minutes. No established injection dose for the heart, kidney or "
        "anti-fibrotic use people buy it for.")
SRC = [["NCATS Inxight: Goralatide (Ac-SDKP)", "https://drugs.ncats.io/substance/H041538E9P"],
       ["Sigma-Aldrich: Ac-SDKP (Tβ4 1–4)", "https://www.sigmaaldrich.com/US/en/product/sigma/sml2885"]]
DOSE = {"dose":"No self-use dose established","freq":"NA","cycle":"NA",
        "route":"Sub-Q or IV infusion (trials)","half":"~4.5 min (rat); cleared fast by ACE",
        "use":"Heart, kidney, anti-fibrotic (reported)","conf":"reported","status":"nohuman",
        "main":MAIN,"src":SRC,"approved":"2026-11-06"}
PAGE_DOSE = {"main":MAIN,"src":SRC}
NEW_STATUS = ("Endogenous fragment of thymosin β4 (residues 1–4), also called goralatide or "
              "seraspenide. Not an approved drug; human use was limited to pharmacokinetic and "
              "chemo-protection trials. Identity note: confirm your vial is the 1–4 fragment, "
              "not 17–23 or full Tβ4.")

def span(s, key):
    i = s.index(key); a = s.rfind("{", 0, i)
    while s[a+1:a+3] not in ('"n','"s'): a = s.rfind("{", 0, a)
    d=0
    for j in range(a, len(s)):
        d += s[j]=="{"; d -= s[j]=="}"
        if d==0: return a, j+1

# ---- data.js (card dose + status), scoped to the frag 1-4 object ----
dj = (dst/"data.js"); d = dj.read_text(encoding="utf-8")
a,b = span(d, '"slug":"tb-500-frag-1-4"'); obj = d[a:b]
old_dose = '"dose":{"status":"nohuman","approved":"2026-11-04"}'
assert old_dose in obj, "dose stub not found in frag 1-4"
obj = obj.replace(old_dose, '"dose":'+json.dumps(DOSE, ensure_ascii=False), 1)
old_status = '"status":"Unapproved research chemical. (Identity note: confirm your vial is 1-4, not 17-23.)"'
assert old_status in obj, "status not found in frag 1-4"
obj = obj.replace(old_status, '"status":'+json.dumps(NEW_STATUS, ensure_ascii=False), 1)
d = d[:a] + obj + d[b:]
dj.write_text(d, encoding="utf-8")

# ---- page.js (full-page dose): add dose as first key of the frag object ----
pj = (dst/"page.js"); p = pj.read_text(encoding="utf-8")
anchor = '"tb-500-frag-1-4":{'
assert anchor in p and '"tb-500-frag-1-4":{"dose"' not in p
p = p.replace(anchor, anchor+'"dose":'+json.dumps(PAGE_DOSE, ensure_ascii=False)+',', 1)
pj.write_text(p, encoding="utf-8")

# ---- index.html: bump version label + self refs; DO NOT touch library/index.html ----
ix = (dst/"index.html"); t = ix.read_text(encoding="utf-8")
assert "91 versions" in t
t = t.replace("91 versions", "92 versions").replace("v91", "v92")
ix.write_text(t, encoding="utf-8")

# ---- verify data.js still parses and the dose landed ----
raw = d
st = raw.index("[")
dep=0
for j in range(st, len(raw)):
    dep += raw[j]=="["; dep -= raw[j]=="]"
    if dep==0: en=j+1; break
arr = json.loads(raw[st:en])
frag = next(x for x in arr if x["slug"]=="tb-500-frag-1-4")
assert frag["dose"]["main"].startswith("Endogenous")
assert frag["dose"]["status"]=="nohuman"
assert "goralatide" in frag["status"]
print("v92 built OK ·", len(arr), "compounds")
print("frag 1-4 dose.dose:", frag["dose"]["dose"])
print("frag 1-4 dose.half:", frag["dose"]["half"])
print("current pointer (library/index.html) untouched:",
      "v91/" in (R/"library/index.html").read_text(encoding="utf-8"))
