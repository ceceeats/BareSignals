"""Library v133 (27 Nov 2026, built on v132, kept): Adderall polish.
1. How it works story v2 (v1 kept in v132/anim/adderall.js): site synapse style, the site's traced MNI brain, a normal-signal
   first step, dopamine that visibly travels. Engine v6: story cache-bust v=8 (logic unchanged).
2. Random facts: new patch /library/odd.js (data + renderer), 9 checked facts for Adderall, after Where it comes from.
3. Blood work (rx.js): ECG shown once, before starting, with its reason; the duplicate 'while on it' ECG tile removed.
4. 'How adderall compares' keeps the medicine's capital letter.
5. The animation now sits right after Who shouldn't take it (as BPC-157), not below the medicine sections.
No dose, interaction or study numbers changed."""
import os, shutil, sys
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
W = sys.argv[1] if len(sys.argv) > 1 else '/home/claude/work'
src, dst = 'library/v132', 'library/v133'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
def rep(fn, a, b, n=1):
    p = f'{dst}/{fn}'; s = open(p, encoding='utf8').read(); c = s.count(a)
    assert c == n, (fn, a[:60], c); open(p, 'w', encoding='utf8').write(s.replace(a, b))
# 1 engine + story
rep('anim.js', ".js?v=7'", ".js?v=8'")
rep('anim.js', "/* BSAnim v5 (27 Nov 2026", "/* BSAnim v6 (27 Nov 2026, built on v5, kept in /library/v132/anim.js): Adderall story v2; story cache-bust v=8. Engine logic unchanged.\n   v5 note kept below. --- BSAnim v5 (27 Nov 2026")
shutil.copy(f'{W}/anim/adderall.js', f'{dst}/anim/adderall.js')
# 2 random facts
shutil.copy(f'{W}/odd.js', f'{dst}/odd.js')
rep('index.html', '<script src="/library/kt.js"></script>', '<script src="/library/kt.js"></script>\n<script src="/library/odd.js"></script>')
# 3 blood work
rep('rx.js', '"before": [["ecg-cac-score", "", 0, 0, 0, ""]], "monitor": [["ecg-cac-score", "", 0, 1, 0, ""]]',
    '"before": [["ecg-cac-score", "", 0, 0, 0, "ECG if heart history (label)"]], "monitor": []')
# 4 heading
rep('index.html', "`How ${esc(o.name.toLowerCase())} compares`", "`How ${esc(o.name)} compares`")
# 5 animation position
rep('index.html', "var r3=fp.querySelector('.r65.r3');if(r3)fp.insertBefore(w,r3);else fp.appendChild(w);",
    "var r2=fp.querySelector('.r65.r2'),r3=fp.querySelector('.r65.r3');if(r2&&r2.nextSibling)fp.insertBefore(w,r2.nextSibling);else if(r3)fp.insertBefore(w,r3);else fp.appendChild(w);")
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v133 (27 Nov 2026, built on v132, kept): Adderall polish. How it works story v2 (site synapse style, the traced MNI brain from the Brain page, a normal-signal first step, dopamine that visibly travels; engine v6 cache-bust). Random facts section (new /library/odd.js, 9 checked facts). Blood work shows the ECG once, before starting, with its reason. Medicine compare heading keeps capitals. The animation sits right after Who shouldn\'t take it. No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
# publish the Library root by copy
for f in ['index.html', 'anim.js', 'odd.js', 'rx.js']: shutil.copy(f'{dst}/{f}', f'library/{f}')
shutil.copy(f'{dst}/anim/adderall.js', 'library/anim/adderall.js')
print('ok v133')
