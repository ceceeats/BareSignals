"""Library v108 (20 Nov 2026, live), built on v106 (kept; v107 question-card kept as a folder only, not live).
1. Order of the landing: search, then shelves Peptides, Supplements, Cases, Goals (same order as the tabs),
   then the Browse block (Browse by + What do you want help with?), then All peptides. Browsing no longer hides the shelves.
2. Card unchanged from v106 except Once mixed: shows the range people report under the guide number, and taps open
   the full note (why, colour check, storage rule, the 60-90 day self-report figure, sources)."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v106', f'{R}/v108'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)

# 1. browse block below the shelves
rep('<div class="brw" id="brw"></div>\n    <section id="shelf" aria-label="Library shelves"></section><div class="allh" id="allp">',
    '<section id="shelf" aria-label="Library shelves"></section>\n    <div class="brw" id="brw"></div><div class="allh" id="allp">')
rep('body.libb #shelf{display:none}', '.brw{border-top:1.5px solid var(--rule);padding-top:6px;margin-top:6px}')
# shelf order: Peptides, Supplements, Cases, Goals
i = s.find('h+=`<div class="shh"><h2>Supplements')
j = s.find('\n', i)
sup = s[i:j]
s = s[:i] + s[j+1:]
rep('h+=`<div class="shh"><h2>Cases</h2>', sup + '\n h+=`<div class="shh"><h2>Cases</h2>')

# 2. Once mixed: range + tap for the full note
rep("function mixCell(o){const m=mixOf(o);return m?`<div class=\"mxc\"><span>Once mixed</span><b>${esc(m.d)}<small class=\"mxk mx-${m.c}\">${MIXC[m.c]}</small></b></div>`:''}",
    "function mixCell(o){const m=mixOf(o);if(!m)return '';const r=MXR108[o.slug];return `<div role=\"button\" tabindex=\"0\" class=\"mxc mx108\" data-mx=\"${o.slug}\" aria-expanded=\"false\"><span>Once mixed</span><b>${esc(m.d)}<small class=\"mxk mx-${m.c}\">${MIXC[m.c]}</small></b>${r?`<em class=\"mxr\">people report ${esc(r[0])}</em>`:''}<i class=\"dt\" aria-hidden=\"true\"></i></div>`}")
JS = r"""
/* v108: Once mixed range and tap-to-read note */
const MXR108={
 'ghk-cu':['14 days to 3 months','One seller sheet claims 90 to 120 days in the fridge, with no test anyone can trace; its own other pages say 28 to 60.'],
 'klow':['14 days to 3 months','The longest claims reach 90 days.'],
 'glow':['14 days to 3 months','The longest claims reach 90 days.'],
 'sermorelin':['14 to 90 days','']
};
function mixNote108(o){const m=mixOf(o);if(!m)return '';const r=MXR108[o.slug];
 return `<div class="mxn108"><p><b>${esc(m.d)}</b> is what most guides give. ${esc(m.n)}</p>${r?`<p><b>Range people report: ${esc(r[0])}.</b>${r[1]?' '+esc(r[1]):''}</p>`:''}<p>Across peptides, 40 to 50% of self-reports say they kept using a mixed vial for 60 to 90 days in the fridge (an aggregate of about 4,300 reports). Longer use is common; how much strength is left by then has not been tested.</p><p class="dnote">Fridge, 2–8°C. Counted from the day water goes in. Never freeze a mixed vial. Cloudy, gel or flakes: throw it out.</p>${srcLine((m.s||[]).concat([["Reconstitution, aggregated self-reports (Peptide Map)","https://peptide-map.pages.dev/guides/reconstitution"]]))}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest('.mx108');if(!b)return;e.stopPropagation();const o=BYS0(b.dataset.mx);const hd=b.closest('.hdc');if(!hd||!o)return;
 const nx=hd.nextElementSibling&&hd.nextElementSibling.classList.contains('mxn108')?hd.nextElementSibling:null;
 if(nx){nx.remove();b.setAttribute('aria-expanded','false');return}hd.insertAdjacentHTML('afterend',mixNote108(o));b.setAttribute('aria-expanded','true')},true);
"""
rep('function page65(o){', JS + '\nfunction page65(o){')
CSS = """
/* v108: Once mixed tap */
.hdc div.mx108{cursor:pointer;flex-wrap:wrap;align-items:center;gap:0 10px}
.mx108 .mxr{font:500 calc(10px*var(--k))/1.2 var(--mono);font-style:normal;color:var(--accent)}
.mx108 .dt{margin:2px 0 2px auto;flex:none;width:18px;height:18px;border:1.5px solid #3E4A80;border-radius:50%;position:relative;background:#FFFFF4}
.mx108 .dt::before,.mx108 .dt::after{content:'';position:absolute;left:50%;top:50%;width:8px;height:1.5px;background:#3E4A80;transform:translate(-50%,-50%)}
.mx108 .dt::after{transform:translate(-50%,-50%) rotate(90deg)}
.mx108[aria-expanded=true] .dt{background:#3E4A80}
.mx108[aria-expanded=true] .dt::before{background:#fff}.mx108[aria-expanded=true] .dt::after{display:none}
.mxn108{border:1.5px solid var(--ink);border-top:0;margin:0 0 4px;background:#FFFFF4;padding:8px 10px 6px;font-size:calc(13px*var(--k));line-height:1.45}
.mxn108 p{margin:0 0 6px}.mxn108 b{color:#3E4A80}.mxn108 .psrc{font-size:calc(11px*var(--k))}
"""
rep('data-home>Show shelves<', 'data-home>Reset<')
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v108 (20 Nov 2026, built on v106; v106 and v107 kept): landing order is search, shelves (Peptides, Supplements, Cases, Goals), Browse block, All peptides; browsing keeps the shelves. Card as v106; Once mixed shows the range people report and opens the full note on tap. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
