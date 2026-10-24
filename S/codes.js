/* Bare Signals scan codes v1 (24 Oct 2026). LOCKED: these are printed on vial QR stickers.
   URL scheme:  HTTPS://BARESIGNALS.CO/S/<CODE>        e.g. HTTPS://BARESIGNALS.CO/S/RTA
   - The QR encodes the whole URL in CAPITALS. Capitals, digits, ":" and "/" fit QR alphanumeric mode, so every code
     up to 4 characters stays a version 2 code (25 x 25 modules) at error level Q. That keeps a 7 mm code readable.
   - CODE is 2 to 4 capitals or digits, never the digit 0. Once printed, a code is never renamed, reused or deleted.
     A compound can gain more codes (aliases), never lose one.
   - /S/<CODE>/<MG>  reserved for later: same page with the vial size set (e.g. /S/RTA/20 for a 20 mg vial).
   - Typed links are forgiving: /s/rta, /S/reta, /S/retatrutide all land on /S/RTA (handled by /404.html).
   - The page behind a code is versioned (/scan/v1/, v2...). The /S/<CODE> address stays the same forever.
   Map: CODE -> Library slug. ALIAS: extra spellings -> CODE (never printed). */
window.BS_CODES={
"BPC":"bpc-157","TB5":"tb-500-frag-17-23","TB4":"thymosin-beta-4","SDK":"tb-500-frag-1-4","GHK":"ghk-cu","KPV":"kpv",
"RTA":"retatrutide","SEM":"semaglutide","TRZ":"tirzepatide","CAG":"cagrilintide","RTC":"reta-cagri","SRV":"survodutide",
"MAZ":"mazdutide","ELO":"eloralintide","ORF":"orforglipron","LIR":"liraglutide","EXN":"exenatide","AMC":"amycretin",
"MAR":"maritide","UBT":"ubt-251","PEM":"pemvidutide","EFO":"efocipegtrutide","VK27":"vk2735","PTL":"petrelintide",
"ECN":"ecnoglutide","BRN":"brenipatide","GLP":"glp-1","AMY":"amylin","GCG":"glucagon","INS":"insulin","TSF":"tesofensine",
"KLOW":"klow","GLOW":"glow","BTB":"bpc-157-tb-500","TBK":"tb4-bpc-kpv","GKB":"ghk-cu-bpc-157","GKP":"ghk-cu-kpv","CTB":"cartalax-tb4-bpc",
"MOT":"mots-c","SS31":"ss-31","NAD":"nadplus","5AM":"5-amino-1mq","SLU":"slu-pp-332","BAM":"bam-15","SLB":"slu-pp-332-bam-15",
"MTP":"mitoprime","ATX":"atx-304","HMN":"humanin","GSH":"glutathione","MBL":"methylene-blue","CRE":"creatine","CRN":"carnosine",
"TES":"tesamorelin","IPA":"ipamorelin","CJC":"cjc-1295-no-dac","CJD":"cjc-1295-with-dac","CJI":"cjc-ipamorelin","TSI":"tesa-ipamorelin",
"TIC":"tesa-ipa-cjc","SRM":"sermorelin","GP2":"ghrp-2","GP6":"ghrp-6","HEX":"hexarelin","MK":"mk-677","HGH":"somatropin-hgh",
"IGF":"igf-1-lr3","MGF":"peg-mgf","AOD":"aod-9604","FRG":"hgh-frag-176-191","KSP":"kisspeptin-10","GND":"gonadorelin",
"HCG":"hcg","HMG":"hmg","OXT":"oxytocin","P141":"pt-141","MT2":"mt-2","MT1":"melanotan-1",
"SLK":"selank","SMX":"semax","NSL":"na-selank-amidate","NSX":"na-semax-amidate","SXS":"semax-selank","ILN":"illumineuro",
"PNL":"pinealon","PE22":"pe-22-28","ADX":"adamax","DHX":"dihexa","P21":"p21","CRB":"cerebrolysin","DSIP":"dsip",
"BRM":"bromantane","NOO":"noopept","PHP":"phenylpiracetam","9ME":"9-me-bc","CGP":"cgp","MOD":"modafinil","TAD":"tadalafil","TRF":"trofinetide",
"EPI":"epitalon","FOXO":"foxo4-dri","TA1":"thymosin-alpha-1","THM":"thymalin","TML":"thymulin","TMG":"thymogen","LL37":"ll-37",
"VLN":"vilon","CYG":"crystagen","CTG":"cortagen","TSG":"testagen","CRG":"cardiogen","CHL":"chonluten","BRG":"bronchogen",
"OVG":"ovagen","PCG":"pancragen","LVG":"livagen","PRX":"prostamax","VSG":"vesugen","VSL":"vesilute","CTX":"cartalax",
"ARA":"ara-290","VIP":"vip","TPT":"teriparatide","ABL":"abaloparatide","LRZ":"larazotide","UBQ":"ubiquitin",
"GHN":"ghk-no-cu","AHK":"ahk-cu","SN8":"snap-8","PTD":"ptd-dbm","COL":"collagen-peptides","ADP":"adipotide","PNC":"pnc-27",
"C514":"cbl-514","BIM":"bimagrumab","LCN":"l-carnitine","B12":"vitamin-b12","MIC":"mic-b12","LPC":"lipo-c","LMB":"lemon-bottle",
"BAC":"bacteriostatic-water","HAC":"acetic-acid-water","GAC":"glycerin-acetic-acid-water"
};
window.BS_CODE_ALIAS={
"RETA":"RTA","SEMA":"SEM","TIRZ":"TRZ","CAGRI":"CAG","TB500":"TB5","TB":"TB5","TA":"TA1","SS":"SS31","MOTS":"MOT","MOTSC":"MOT",
"TESA":"TES","IPAM":"IPA","CJCIPA":"CJI","MK677":"MK","PT141":"P141","PT":"P141","MT":"MT2","LL":"LL37","NADPLUS":"NAD",
"SEMAX":"SMX","SELANK":"SLK","GHKCU":"GHK","BPC157":"BPC","EPITALON":"EPI","5AMINO":"5AM","WOLVERINE":"BTB","GLUTA":"GSH","B12INJ":"B12"
};
