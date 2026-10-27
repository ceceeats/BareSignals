/* Bare Signals Blood Work v27: researched supplement and habit effects per blood test (25 Oct 2026).
   Per test id: sup = supplements and vitamins, hab = food and habits.
   Row: [Supplements page id or '' if not on Supplements yet, name, dir up|down|eq, effect, who it applies to, confidence V (meta-analysis, RCT, official) or R (secondary, single small study), source URL].
   Used by Blood Work (test card) and Supplements (Blood tests tab). Gaps: only IGF-1 researched so far; other tests show notes only. */
window.BW_SUPX={
"igf-1":{sup:[
["protein","Protein","up","About +2.5% for each step up in daily protein; dairy protein counts most","Adults eating more protein overall","V","https://researchonline.lshtm.ac.uk/id/eprint/2577"],
["","Milk and dairy","up","Small rise in adults; milk trials in children raised it about 20%","Strongest in children","V","https://link.springer.com/10.1007/s10552-017-0883-1"],
["","Whey protein","up","Raises it in pooled trials; size not given","Older adults losing muscle","V","https://doaj.org/article/8aa629dafbd54326ac84ddb47d7350af"],
["","DHEA","up","About +16 ng/mL","Mostly women over 60 on 50 mg a day for 12+ weeks","R","https://www.drugs.com/npp/dehydroepiandrosterone.html"],
["","Soy protein","up","Small rise, only above about 25 g a day","Adults, few studies","R","https://pure.ulster.ac.uk/en/publications/does-soy-protein-affect-circulating-levels-of-unbound-igf-1-2/"],
["zinc","Zinc","up","About +9 ng/mL in children; no effect in adults","Children and preterm babies","V","https://jksus.org/the-influence-of-zinc-supplementation-on-igf-1-levels-in-humans-a-systematic-review-and-meta-analysis/"],
["vitamin-d3-and-k2","Vitamin D","eq","No clear change, even in people who start low","Adults","V","https://pureportal.coventry.ac.uk/en/publications/the-effect-of-vitamin-d-supplementation-on-insulin-like-growth-fa/"],
["l-arginine","L-Arginine","eq","No clear change across 9 studies, with or without lysine","Adults","V","https://nutrition-evidence.com/article/424884/the-influence-of-arginine-supplementation-on-igf-1-a-systematic-review-and-meta-analysis"],
["","Bovine colostrum","eq","No change at 20 to 40 g a day for up to 12 weeks","Healthy adults","V","https://kar.kent.ac.uk/74474/"],
["creatine-monohydrate","Creatine","eq","No change in the trials that measured it","Adult men","R","https://baylor-ir.tdl.org/handle/2104/5406"],
["green-tea-extract","Green Tea Extract","eq","No change after 12 months of 800 mg EGCG","Postmenopausal women","R","https://conservancy.umn.edu/items/73068c3b-ce14-4892-a715-ff8478b24076"]],
hab:[
["","Fasting","down","About -29 ng/mL","Adults on fasting diets","V","https://pureportal.coventry.ac.uk/en/publications/the-influence-of-fasting-and-energy-restricting-diets-on-igf-1-le/"],
["","Big calorie cut","down","About -37 ng/mL when eating half or less; milder cuts barely move it","Adults","V","https://pureportal.coventry.ac.uk/en/publications/the-influence-of-fasting-and-energy-restricting-diets-on-igf-1-le/"],
["","Cutting protein","down","About -22% in 3 weeks going from 1.7 to 1 g/kg a day","Adults","V","https://profiles.wustl.edu/en/publications/long-term-effects-of-calorie-or-protein-restriction-on-serum-igf-/"],
["","Vegan diet","down","About 13% lower than meat eaters and vegetarians","Women, one large study","V","https://ora.ox.ac.uk/objects/uuid:f61f06f2-ce5c-4d40-892c-7429f54d1518"],
["","Alcohol","down","About -5% at 2 drinks a day; 1 drink made no difference","Postmenopausal women","V","https://pure.psu.edu/en/publications/effects-of-alcohol-on-insulin-like-growth-factor-i-and-insulin-li/"]]}
};
