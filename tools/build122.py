"""Library v122 PREVIEW (20 Nov 2026, built on v121, kept): powder (unmixed) shelf life beside Once mixed.
Not published to /library/ until Cece approves (new research data). pw.js holds the data; sweep 20 Nov 2026."""
import os, shutil
R='/home/claude/baresignals'; os.chdir(R)
SRC,DST='library/v121','library/v122'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC,DST)
PW=r"""/* Library v122: how long a sealed, dry vial lasts before water goes in. Sweep 20 Nov 2026.
   c = label (approved product's own label), reported (storage guides, no test of the grey vial), inferred (general rule). */
(function(){
const S={
 g1:["Lyophilized storage table: fridge several months, freezer 1-2 years+ (Peptide guide)","https://website-4bo.pages.dev/en/guides/storage/"],
 g2:["Storage table: fridge 3-6 months, freezer 1-2 years (Pure Pharm research guide)","https://purepharm-jbjmlhap.manus.space/research/peptide-storage-stability-research-guide"],
 g3:["Dry storage timelines: fridge ~1.5 years, freezer ~2 years","https://lees-newsletter-9988ee.beehiiv.com/p/how-to-store-peptides-the-complete-guide"],
 pex:["Per-peptide powder shelf life chart (PeptidesExplorer)","https://peptidesexplorer.com/blog/how-to-store-peptides"],
 egr:["Egrifta WR powder: room temperature 20-25°C, do not freeze (label, via WebMD)","https://www.webmd.com/drugs/2/drug-178449/egrifta-sv-subcutaneous/details/list-precautions"],
 preg:["Pregnyl: store at 15-30°C before mixing (label)","https://henryschein.com/assets/Medical/1117052.pdf"],
 ta1f:["Thymosin alpha-1 powder: desiccated below -18°C (FDA PCAC slides)","https://fda.gov/media/183892/download"],
 ta1z:["Zadaxin vials 2-8°C, 24 months, do not freeze (Peptide Protocol Wiki)","https://www.peptideprotocolwiki.com/peptides/thymosin-alpha-1/dosing"]
};
const L=(d,c,n,s)=>({d,c,n,s:(s||[]).map(k=>S[k])});
window.BS_POWDER_DEFAULT=L('Fridge 3–24 mo · freezer 1–5 yr','inferred','Sealed, dry powder is the steadiest form a peptide comes in. Guides disagree on how long: a few months to 2 years in the fridge, 1 to 5 years in the freezer. Room temperature is days to weeks, fine for shipping, not for keeping. Keep it dark and dry, and let a cold vial reach room temperature before opening so water does not condense on the powder.',['g1','g2','g3']);
const ONE=L('Fridge ~12 mo · freezer 2–3 yr','reported','One chart puts it below most peptides: about a year in the fridge, 2 to 3 years frozen. No second source for this compound; the general rule is 3 to 24 months in the fridge.',['pex','g1']);
const GHK=L('Fridge 6–12 mo · freezer 2–3 yr','reported','The copper-bound peptide keeps less well than most: 6 to 12 months in the fridge, 2 to 3 years frozen, in the one chart that lists it. Royal blue powder or solution is fine; green or brown means it has broken down.',['pex']);
window.BS_POWDER={
 'tesamorelin':L('Room temp until expiry','label','The licensed weekly vials (Egrifta WR) are kept at room temperature, 20 to 25°C, out of light, and never frozen, until the printed expiry date. Grey vials have no test of their own; the fridge is the safer default.',['egr']),
 'hcg':L('Room temp until expiry','label','Pregnyl powder is kept at 15 to 30°C until its expiry date; only the mixed vial goes in the fridge. Grey vials have no test of their own.',['preg']),
 'thymosin-alpha-1':L('Fridge, up to 24 mo','reported','Sources split. The licensed vial (Zadaxin) is kept at 2 to 8°C for 24 months and not frozen; the FDA review of the raw powder says frozen below -18°C, kept dry. Either way, cold and dark.',['ta1z','ta1f']),
 'ghk-cu':GHK,'klow':GHK,'glow':GHK,'ghk-cu-bpc-157':GHK,'ghk-cu-kpv':GHK,
 'dsip':ONE,'igf-1-lr3':ONE,'kisspeptin-10':ONE,'mots-c':ONE,'nadplus':ONE,'selank':ONE,'semax':ONE,
 'vitamin-b12':null,'mic-b12':null,'l-carnitine':null,'lipo-c':null,'lemon-bottle':null
};
})();
"""
open(f'{DST}/pw.js','w',encoding='utf8').write(PW)
p=f'{DST}/index.html';s=open(p,encoding='utf8').read()
def rep(a,b):
    global s
    assert a in s,a[:80]; s=s.replace(a,b,1)
rep('<!-- Library v121','<!-- Library v122 (20 Nov 2026, built on v121, kept; PREVIEW, not live until approved): powder (unmixed) shelf life as a second line in the Once mixed row (pw.js, sweep 20 Nov 2026), with its note and sources in the Full read. -->\n<!-- Library v121')
rep('<script src="mix.js"></script>','<script src="mix.js"></script><script src="pw.js"></script>')
rep("function mixCell(o){","function pwOf(o){if(!mixOf(o))return null;const P=window.BS_POWDER||{};if(o.slug in P)return P[o.slug];return window.BS_POWDER_DEFAULT}\nfunction mixCell(o){")
rep("${r?`<em class=\"mxr\">people report ${esc(r[0])}</em>`:''}<i class=\"dt\"","${r?`<em class=\"mxr\">people report ${esc(r[0])}</em>`:''}${(p=>p?`<em class=\"mxp\"><span>Powder</span> ${esc(p.d)}</em>`:'')(pwOf(o))}<i class=\"dt\"")
rep("Cloudy, gel or flakes: throw it out.</p>${srcLine(m.s)}</div>`}","Cloudy, gel or flakes: throw it out.</p>${srcLine(m.s)}</div>`+(p=>p?`<div class=\"dblk mxf\"><p class=\"h3\"><span class=\"tagx\">Powder, before mixing</span><span class=\"duse\">${esc(p.d)}</span><small class=\"mxk mx-${p.c}\">${MIXC[p.c]}</small></p><p class=\"para dp\">${esc(p.n)}</p>${srcLine(p.s)}</div>`:'')(pwOf(o))}")
rep('</style>','.mxp{display:block;font:500 calc(10.5px*var(--k,1))/1.3 var(--mono,monospace);color:var(--ink-soft,#6B76A8);margin-top:2px}.mxp span{text-transform:uppercase;letter-spacing:.06em}\n</style>')
open(p,'w',encoding='utf8').write(s)
print('v122 preview built (not live)')
