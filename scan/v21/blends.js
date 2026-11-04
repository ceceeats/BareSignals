/* Bare Signals Scan v21 blend split (4 Nov 2026). Hand kept.
   CODE -> parts [part code, name, label mg], per batch tested mg (Purchase Logbook, Real dose tab; only our own batch codes, never supplier codes),
   and the per shot range each part is shown against (mcg) with where it comes from.
   lib = the single compound's Library card dose. subq = reported SubQ community doses (Library card is a nasal range). */
window.BS_BLENDS={
"ILN":{parts:[["NSX","NA Semax",20],["PE22","PE-22-28",10],["PNL","Pinealon",10],["NSL","NA Selank",8]],
 batches:{"X01":[29.41,12.43,11.43,8.39]},
 range:{NSX:[100,800,"subq"],PE22:[50,200,"lib"],PNL:[100,500,"lib"],NSL:[250,500,"subq"]}},
"KLOW":{parts:[["GHK","GHK-Cu",50],["BPC","BPC-157",10],["TB4","TB-500 (Tβ4)",10],["KPV","KPV",10]],
 batches:{"X01":[63.12,12.88,12.16,11.68]},
 range:{GHK:[1000,2000,"lib"],BPC:[250,500,"lib"],TB4:[2000,2500,"lib2w"],KPV:[200,500,"lib"]}},
"GLOW":{parts:[["GHK","GHK-Cu",50],["BPC","BPC-157",10],["TB4","TB-500 (Tβ4)",10]],
 batches:{},
 range:{GHK:[1000,2000,"lib"],BPC:[250,500,"lib"],TB4:[2000,2500,"lib2w"]}},
"CJI":{parts:[["CJC","CJC-1295 no DAC",5],["IPA","Ipamorelin",5]],
 batches:{"X02":[5.33,5.83]},
 range:{CJC:[100,100,"lib"],IPA:[100,300,"lib"]}}
};
window.BS_BLSRC={lib:"Library",subq:"SubQ reports",lib2w:"Library, 2× a week"};
