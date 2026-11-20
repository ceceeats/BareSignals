/* Library v122: how long a sealed, dry vial lasts before water goes in. Sweep 20 Nov 2026.
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
