/* Bare Signals Library v99: how long a vial lasts once mixed (reconstituted), fridge 2–8°C, BAC water unless stated.
   Research sweep 12 Nov 2026. c = label (approved product's own label), reported (guides and seller sheets, no test of the grey vial), inferred (general multi-dose rule, no compound data).
   One row per compound. Anything injectable that is not listed falls back to BS_MIX_DEFAULT. */
(function(){
const S={
 usp:["USP <797> multi-dose rule, explained (FormBlends)","https://formblends.com/articles/glp1-hub/does-compound-semaglutide-expire"],
 pex:["Reconstituted shelf life chart (PeptidesExplorer)","https://peptidesexplorer.com/blog/how-to-store-peptides"],
 prc:["Peptide storage chart (PeptideReconstitute)","https://peptidereconstitute.pages.dev/blog/peptide-storage-guide"],
 apex:["Fridge life by peptide class (Apex tracker)","https://apex-protocol-tracker.pages.dev/basics"],
 retaFB:["Retatrutide fridge storage (FormBlends)","https://formblends.com/articles/retatrutide-hub/retatrutide-fridge-storage"],
 retaG3:["Retatrutide storage and stability (GLP3 Planner)","https://glp3planner.com/resources/retatrutide-storage-stability"],
 sema:["Semaglutide pens vs compounded vials (FormBlends)","https://formblends.com/articles/glp1-hub/when-does-semaglutide-expire"],
 tirzPen:["Mounjaro KwikPen storage (Lilly Medical)","https://medical.lilly.com/uk/products/answers/how-should-the-mounjaro-tirzepatide-kwikpen-be-stored-217607"],
 tirzVial:["Zepbound vial is single-dose (Lilly Medical)","https://medical.lilly.com/us/products/answers/after-withdrawing-the-zepbound-tirzepatide-dose-from-the-vial-can-the-remaining-solution-be-kept-for-a-future-dose-241712"],
 egr:["EGRIFTA WR label, 2025 (FDA)","https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/022505s020lbl.pdf"],
 hcgP:["Pregnyl label (FDA)","https://www.accessdata.fda.gov/drugsatfda_docs/label/2011/017692s021lbl.pdf"],
 hcgN:["Novarel and Pregnyl storage (PDR)","https://www.pdr.net/drug-summary/Novarel-chorionic-gonadotropin-1702"],
 ta1:["Thymosin alpha-1 review, stability in solution (FDA PCAC slides)","https://fda.gov/media/183892/download"],
 zad:["Zadaxin label: use immediately (GlobalRPh)","https://globalrph.com/rx-list/zadaxin-drug"],
 cere:["Cerebrolysin treatment handbook (EVER Pharma)","https://www.cerebrolysin.com/wp-content/uploads/2023/11/Cerebrolysin_TreatmentHandbook_2023_SCREEN_nocomments.pdf"],
 serm:["Sermorelin mixing and storage (FormBlends)","https://formblends.com/articles/glp1-hub/sermorelin-5mg-mixing-instructions"],
 semaxRU:["Semax storage after opening (TrimRx)","https://trimrx.com/blog/?p=90623"],
 nadC:["NAD+ reconstitution and storage (The Peptide Catalog)","https://thepeptidecatalog.com/articles/nad-reconstitution-guide"],
 nadE:["Pharmacy NAD+ 100 mg/mL, sealed BUD about 7 months (Empower certificate)","https://www.empowerpharmacy.com/wp-content/uploads/2026/06/Certificate-of-Conformance_NAD-Aqueous-100-mg-mL-10-mL-Injection-Lot-615364.pdf"],
 mots:["MOTS-c storage and stability (HealthRx)","https://healthrx.com/mots-c/storage-stability"],
 ghk:["GHK-Cu preformulation study, Pharm Dev Technol 2015","https://informahealthcare.com/doi/full/10.3109/10837450.2014.979944"],
 ll37:["LL-37 storage (FormBlends)","https://formblends.com/articles/peptide-hub/ll-37-storage-instructions-complete-guide"],
 bpc:["BPC-157 reconstitution guide (PepBoard)","https://pepboard.pages.dev/guides/reconstitution-bpc-157/"],
 prec:["Melanotan and PT-141 storage (PeptideRecon)","https://peptiderecon.pages.dev/guides/operations/storage-handling.html"],
 pj:["Do peptides expire? (Peptide Journal)","https://peptidejournal.org/faq/do-peptides-expire"],
 ghsec:["Ipamorelin and CJC-1295 after mixing (TrimRx)","https://trimrx.com/blog/?p=90530"]
};
const L=(d,c,n,s)=>({d,c,n,s:(s||[]).map(k=>S[k])});
window.BS_MIX_DEFAULT=L('28 days max','inferred','No test for this compound once mixed. 28 days is the general limit for a BAC water vial kept in the fridge. It stops germs, not breakdown, so less is better.',['usp']);
window.BS_MIX_READY=L('28 days after first draw','inferred','Comes ready as a liquid. Once the stopper is pierced, the multi-dose limit is 28 days in the fridge unless the label says otherwise.',['usp']);
window.BS_MIX={
 /* GLPs and amylin: weekly doses mean one vial often outlasts its window */
 'retatrutide':L('21–28 days','reported','No retatrutide test exists. Most guides say 28 days; some cut it to 14 to 21 days, borrowing from its cousins. At 0.5 to 2 mg a week a 10 mg vial lasts 5 to 20 weeks, far past the window, so mix half a vial or less.',['retaFB','retaG3']),
 'semaglutide':L('28 days','label','Pharmacy vials in BAC water: 28 days after the first draw. The brand pen holds 56 days, but its liquid is made for that. A weekly microdose rarely finishes a vial in 28 days; mix less.',['sema','usp']),
 'tirzepatide':L('28 days','label','The brand multi-dose pen is labelled 30 days after first use; the brand vial is single-dose. Grey vials in BAC water follow the 28 day rule.',['tirzPen','tirzVial']),
 'cagrilintide':L('28 days','reported','Guides give 28 to 30 days. Weekly doses: mix only what you use in a month.',['pex']),
 'reta-cagri':L('21–28 days','reported','Follows the shorter of its two parts (retatrutide). No test of the mixed blend.',['retaFB','pex']),
 'mazdutide':L('28 days max','inferred','No test. Treated like the other weekly GLPs: 28 days, mix less if the vial will outlast it.',['apex','usp']),
 'survodutide':L('28 days max','inferred','No test. Treated like the other weekly GLPs.',['usp']),
 /* repair */
 'bpc-157':L('28 days','reported','One of the steadiest peptides in water. Guides range 28 to 45 days; 28 is the safe end. Some lab sheets say 1 to 2 weeks; most guides disagree.',['bpc','pj','pex']),
 'tb-500-frag-17-23':L('28 days','reported','Guides agree on 21 to 30 days. No test of the mixed vial.',['pex']),
 'thymosin-beta-4':L('28 days','reported','Guides agree on 21 to 30 days. No test of the mixed vial.',['pex']),
 'tb-500-frag-1-4':L('28 days max','inferred','No data. Short peptide; 28 day rule.',['usp']),
 'ghk-cu':L('14–21 days','reported','Shorter than most. The copper can let go and oxidise the peptide over time. Royal blue is fine; green, teal or brown means it has broken down. Guides give 14 to 28 days.',['pex','ghk','prc']),
 'kpv':L('28 days','reported','Three amino acids, very stable. Guides give 28 to 30 days.',['pex']),
 'll-37':L('14–28 days','reported','Sources split: 28 days in most guides, 7 to 14 days in one seller test. Keep it cold and dark.',['ll37']),
 'bpc-157-tb-500':L('28 days','reported','Both parts are steady peptides. No test of the mixed blend.',['pex']),
 'klow':L('14–21 days','reported','Follows its weakest part, GHK-Cu. No test of the mixed blend; 90 day claims are unsourced.',['pex','ghk']),
 'glow':L('14–21 days','reported','Follows its weakest part, GHK-Cu. No test of the mixed blend.',['pex','ghk']),
 'ghk-cu-bpc-157':L('14–21 days','reported','Follows GHK-Cu, the weaker part.',['pex']),
 'ghk-cu-kpv':L('14–21 days','reported','Follows GHK-Cu, the weaker part.',['pex']),
 'tb4-bpc-kpv':L('28 days','reported','All three parts are steady. No test of the mixed blend.',['pex']),
 'cartalax-tb4-bpc':L('28 days max','inferred','No test of the mixed blend.',['usp']),
 /* energy */
 'mots-c':L('21–28 days','reported','Guides give 21 to 28 days; two seller sheets say 7 days for best strength. It has two methionines that oxidise, so keep it dark.',['mots','apex']),
 'ss-31':L('21 days','reported','Grouped with peptides that clump faster in water. 21 days is the cautious figure.',['apex']),
 'nadplus':L('21–28 days','reported','BAC water: 28 days, 21 is better. Not as fragile as said: pharmacy liquid NAD+ holds months while sealed. The limit is the pierced stopper.',['nadC','nadE']),
 '5-amino-1mq':L('28 days max','inferred','A small molecule, not a peptide. No mixed-vial data; 28 day rule.',['usp']),
 'glutathione':L('28 days max','inferred','No test for the mixed vial. It slowly oxidises in water, so less time is better.',['usp']),
 /* GH axis */
 'tesamorelin':L('7 days','label','The only tested figure: the licensed weekly vial (EGRIFTA WR) lasts 7 days after mixing, at room temperature. The older daily vial had to be used at once. Grey vials in BAC water have no test of their own.',['egr']),
 'ipamorelin':L('21–28 days','reported','Guides give 14 to 28 days, shorter than BPC-157.',['ghsec','pex']),
 'cjc-1295-no-dac':L('21–28 days','reported','Guides give 21 to 28 days.',['ghsec','pex']),
 'cjc-1295-with-dac':L('28 days','reported','The DAC version is the steadier one. Guides give 21 to 28 days.',['pex']),
 'cjc-ipamorelin':L('21–28 days','reported','Follows its parts. No test of the mixed blend.',['ghsec']),
 'tesa-ipamorelin':L('14–21 days','inferred','No test of the blend. Tesamorelin is the fragile part (7 days on its label).',['egr']),
 'tesa-ipa-cjc':L('14–21 days','inferred','No test of the blend. Tesamorelin is the fragile part (7 days on its label).',['egr']),
 'sermorelin':L('28 days','reported','Pharmacies use 28 to 30 days; some say 14. Claims of 60 to 90 days rest on studies that could not be traced.',['serm']),
 'ghrp-2':L('21–28 days','reported','Standard GH releaser window.',['pex']),
 'ghrp-6':L('21–28 days','reported','Standard GH releaser window.',['pex']),
 'hexarelin':L('21–28 days','reported','Standard GH releaser window.',['pex']),
 'igf-1-lr3':L('14 days','reported','More fragile; some mix it in acetic acid water. Guides give about 14 days.',['prc']),
 'hcg':L('30–60 days','label','On the labels: Novarel 30 days, Pregnyl 60 days in the fridge after mixing with its own water.',['hcgP','hcgN']),
 'kisspeptin-10':L('14–21 days','reported','Little data; guides give 14 to 21 days.',['pex']),
 'gonadorelin':L('28 days max','inferred','No test of grey vials.',['usp']),
 /* brain and sleep */
 'semax':L('14–21 days','reported','Self-mixed: 14 to 21 days. The Russian pharmacy drops last about 30 days after opening because they carry a preservative.',['semaxRU','prc']),
 'selank':L('14–21 days','reported','More fragile than most. Same window as Semax.',['prc','pex']),
 'na-semax-amidate':L('14–21 days','inferred','No data. Follows Semax.',['prc']),
 'na-selank-amidate':L('14–21 days','inferred','No data. Follows Selank.',['prc']),
 'semax-selank':L('14–21 days','reported','Pharmacy nasal blends say 20 to 30 days after opening; self-mixed, keep to 14 to 21.',['prc']),
 'dsip':L('14–21 days','reported','Fragile and light-sensitive. Guides give 14 to 21 days.',['prc','pex']),
 'pinealon':L('28 days max','inferred','No test. Three amino acids; short peptides like this tend to hold well.',['usp']),
 'epitalon':L('28 days','reported','Four amino acids, very stable. Guides give 28 to 30 days.',['pex','apex']),
 'illumineuro':L('14–21 days','inferred','No test of the blend. Nootropic peptides break down sooner in water.',['apex']),
 'pe-22-28':L('21 days','reported','Grouped with short brain peptides: 21 days.',['apex']),
 'adamax':L('21 days','reported','Grouped with short brain peptides: 21 days.',['apex']),
 'cerebrolysin':L('Same day (ampoule)','label','The maker says break an ampoule only right before use; it has no preservative. Multi-dose liquid vials: 28 days after first draw at most. Powder versions: no data.',['cere']),
 'oxytocin':L('28 days max','inferred','No test of self-mixed nasal sprays. Light-sensitive; keep the bottle in the fridge, in the dark.',['prc']),
 /* immune */
 'thymosin-alpha-1':L('2–7 days','label','Shorter than people think. The licensed vial is used at once, and the raw powder is stable 2 to 7 days in water at 4°C. Community guides say 28 days with no test behind it. Mix small.',['ta1','zad']),
 'thymulin':L('28 days max','inferred','No test.',['usp']),
 'ara-290':L('28 days max','inferred','No test.',['usp']),
 'vip':L('14–21 days','inferred','No test. Fragile in water.',['apex']),
 /* skin, tan, libido */
 'mt-2':L('28 days','reported','Ring-shaped, one of the steadiest once mixed (guides: 28 to 40 days). Very light-sensitive: wrap in foil.',['pex','prc']),
 'melanotan-1':L('28 days','reported','Light-sensitive: keep dark. Guides give about 30 days.',['prec']),
 'pt-141':L('28 days','reported','Ring-shaped and steady. Guides give 28 to 30 days. Keep dark.',['pex','prec']),
 'aod-9604':L('21–28 days','reported','Guides split: 28 days in most, 21 in one that groups it with faster-clumping peptides.',['prc','apex']),
 'hgh-frag-176-191':L('21–28 days','inferred','No test. Follows AOD-9604, its shorter cousin.',['prc','apex']),
 /* ready-made liquids */
 'vitamin-b12':null,'mic-b12':null,'l-carnitine':null,'lipo-c':null,'lemon-bottle':null
};
['vitamin-b12','mic-b12','l-carnitine','lipo-c','lemon-bottle'].forEach(k=>window.BS_MIX[k]=window.BS_MIX_READY);
})();
