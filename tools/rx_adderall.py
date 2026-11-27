# Bare Signals Library v131: Adderall (27 Nov 2026), same format as the v101 medicines.
# Every fact below comes from the labels, studies and reports named in SRC. Label doses only (Schedule II stimulant).

SRC = {
 'fda_ir': ["Adderall tablets, FDA label (dextroamphetamine and amphetamine salts)", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/011522s045lbl.pdf"],
 'fda_xr': ["Adderall XR, FDA label, revised April 2026", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/021303s040lbl.pdf"],
 'dailymed': ["Adderall XR on DailyMed (updated 30 Apr 2026)", "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=aff45863-ffe1-4d4f-8acf-c7081512a6c0"],
 'dc_add': ["Drugs.com: Adderall user reviews (524)", "https://www.drugs.com/comments/amphetamine-dextroamphetamine/adderall.html"],
 'moran24': ["Moran 2024, prescription amphetamine and new psychosis or mania (Am J Psychiatry)", "https://psychiatryonline.org/doi/10.1176/appi.ajp.20230329"],
 'moran_pn': ["Psychiatric News on Moran 2024: 2.68x any dose, 5.3x above 30 mg dextroamphetamine", "https://psychiatryonline.org/doi/10.1176/appi.pn.2024.12.12.6"],
 'zhang24': ["Zhang 2024, ADHD medicines and long-term heart risk, Sweden (JAMA Psychiatry, PMC10851097)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851097/"],
 'cortese18': ["Cortese 2018, network meta-analysis of ADHD medicines, 133 trials (Lancet Psychiatry, PMC6109107)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC6109107"],
 'bali': ["Trial in Bali over 99 Adderall pills: 'illegal in Indonesia, no exceptions' (Macau Daily Times / AP)", "https://macaudailytimes.com.mo/trial-opens-in-bali-for-us-man-charged-with-receiving-illegal-adhd-pills.html"],
 'shortage': ["ADHD medicine shortage list, FDA status 18 Oct 2026 (ChoosingTherapy)", "https://www.choosingtherapy.com/?p=110986"],
 'ilieva13': ["Ilieva 2013, Adderall in 46 healthy young adults, double-blind crossover (Neuropharmacology)", "https://core.ac.uk/download/76386905.pdf"],
 'macqueen18': ["MacQueen 2018, amphetamine and vigilance in 69 healthy adults (PMC5820221)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5820221"],
 'ilieva13b': ["Ilieva and Farah 2013, enhancement stimulants: motivational more than cognitive (PMC3813924)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3813924"],
 'wiki': ["Adderall (Wikipedia)", "https://en.wikipedia.org/wiki/Adderall"],
}
def S(*keys): return [SRC[k] for k in keys]


# Every row: group, name, level, short line, Library link, confidence, the deeper Why (shown on tap, BS_RXW).
# Sweep of the whole Library (27 Nov 2026): each peptide family checked against how amphetamine works
# (dopamine and noradrenaline release, heart rate and blood pressure up, appetite and sleep down, CYP2D6, urine pH).
IX = [
 ["peptide","Tesofensine","avoid","Also blocks the recycling of dopamine, noradrenaline and serotonin, and raises pulse and blood pressure. Doubling up on the same system.","tesofensine","inferred",
  "Tesofensine keeps dopamine, noradrenaline and serotonin in the gap between nerves longer; Adderall pushes more of the first two out. Together that is two stimulants on one system, plus a serotonin piece that brings the serotonin syndrome warning on Adderall's label into play. Tesofensine's own trials already showed higher heart rate and blood pressure. Nobody has tested the pair."],
 ["peptide","BAM-15, SLU-PP-332","watch","Fat-burning compounds that raise energy use and heat. Amphetamine also raises body heat and heart rate.","bam-15","inferred",
  "BAM-15 makes mitochondria burn fuel as heat; SLU-PP-332 mimics exercise signalling. Amphetamine raises body temperature and heart rate on its own, and overheating is one of the ways stimulant overdoses turn dangerous, especially with exercise or a hot climate like Bali's. Only mouse data exist for both compounds and none with stimulants."],
 ["peptide","GLP-1s (retatrutide, semaglutide, tirzepatide, cagrilintide)","watch","Both cut appetite and both can raise resting heart rate. Eating enough becomes the hard part.","retatrutide","inferred",
  "GLP-1 drugs quiet hunger through the brain and slow the stomach; amphetamine quiets hunger through noradrenaline and dopamine. Stacked, many people barely eat, which costs muscle and leaves the stimulant hitting an empty stomach harder. Retatrutide and tirzepatide raise resting pulse by a few beats in trials, and amphetamine adds its own. Not tested together."],
 ["peptide","Semax, NA Semax, Bromantane, Dihexa","watch","Also taken to push focus and drive. Stacked stimulation, never tested together; sleep and anxiety add up.","semax","inferred",
  "Semax is reported to raise BDNF and dopamine turnover; bromantane raises dopamine production. Adderall already floods dopamine and noradrenaline. Adding more drive on top tends to add jitters, anxiety and lost sleep before it adds focus. Dihexa has no human data at all. If someone already takes Adderall, adding one of these is a new experiment, so one at a time."],
 ["peptide","Selank, NA Selank, IllumiNeuro","watch","Used by some to take the edge off. Untested with stimulants; does not cancel the heart effects.","selank","inferred",
  "Selank is studied in Russia for anxiety without sedation and is thought to act on GABA and enkephalin breakdown, a different path from amphetamine. Some ADHD users report it softens stimulant anxiety. It does nothing to the raised pulse or blood pressure. IllumiNeuro carries Semax too, so it also counts as extra stimulation."],
 ["peptide","MK-677, CJC-1295 + Ipamorelin, Tesamorelin, DSIP","watch","Taken for night-time GH and deep sleep. A stimulant still active at bedtime cuts that sleep.","mk-677","inferred",
  "The biggest growth hormone pulse of the day comes in the first deep sleep of the night. Adderall's main part has a half-life around 10 hours, so a noon dose is still half there at 10 pm, and stimulants cut deep sleep. People taking GH peptides for recovery or sleep get the most from them with an early Adderall dose. MK-677 can also raise blood sugar and appetite, pulling the other way from the stimulant."],
 ["peptide","PT-141, Melanotan 2","watch","Both can raise blood pressure on their own.","pt-141","inferred",
  "PT-141 (bremelanotide) raised blood pressure briefly in its trials, and its label warns against it with uncontrolled hypertension. Melanotan 2 acts on the same melanocortin receptors and causes flushing and nausea. Amphetamine raises blood pressure too. The rises add, so the pair is best avoided by anyone whose pressure already runs high."],
 ["peptide","Pinealon, Cerebrolysin, Epitalon","ok","No known interaction. Different targets.","cerebrolysin","inferred",
  "These are taken for brain protection or sleep rhythm, not stimulation. None is known to release dopamine or noradrenaline, raise heart rate or use CYP2D6. Never tested with stimulants, so fine means no known reason for trouble, not proven safe."],
 ["peptide","NAD+, MOTS-c, SS-31, 5-Amino-1MQ","ok","No known interaction. Fast IV NAD+ can bring on a racing heart; go slow.","nadplus","inferred",
  "These work on mitochondria and energy metabolism, a different system from amphetamine. The one practical point: fast NAD+ infusions often cause chest tightness and a pounding heart, which feels worse with a stimulant on board. Slow drips or Sub-Q avoid most of it."],
 ["peptide","BPC-157, TB-500, GHK-Cu, KPV, KLOW, LL-37","ok","No known interaction. Never tested together.","bpc-157","inferred",
  "Repair peptides act on blood vessel growth, cell migration and inflammation in tissue. Amphetamine acts on nerve endings, the heart and blood vessels' tone. No shared pathway, no shared liver enzyme known to matter. Many people take both."],
 ["peptide","Thymosin Alpha-1, Kisspeptin, HCG, Oxytocin, AOD-9604, Glutathione","ok","No known interaction.","thymosin-alpha-1","inferred",
  "Immune, hormone, fat and antioxidant compounds with no stimulant action and no overlap with how amphetamine is absorbed or cleared. Oxytocin is sometimes studied for social focus in ADHD and autism, without a stimulant conflict."],
 ["supp","Vitamin C, citrus juice, acidic drinks","space","Lower absorption. An hour either side of the dose.","","verified",
  "Amphetamine is a base. Acid in the gut keeps more of it charged, so less crosses into the blood; acid in the urine makes the kidneys flush it out faster. The label lists ascorbic acid and fruit juices as lowering levels. Vitamin C later in the day is fine."],
 ["supp","St John's wort, 5-HTP, tryptophan","watch","Label lists serotonin syndrome risk with serotonergic products.","","verified",
  "Amphetamine releases some serotonin too. Adding products that raise serotonin can tip into serotonin syndrome: agitation, sweating, fast heart, stiff or twitching muscles, high temperature. Rare, but on the label, and the risk rises with dose."],
 ["supp","Caffeine, pre-workout","watch","Adds to pulse, blood pressure and jitters.","","reported",
  "Caffeine blocks adenosine, the body's tiredness signal, while amphetamine releases noradrenaline. Different paths, same result in the heart: faster and harder. Pre-workouts often carry yohimbine or synephrine, which add more. Many on Adderall cut coffee to one cup."],
 ["food","Antacids, baking soda","watch","Make the body absorb more and clear it slower: a stronger, longer effect.","","verified",
  "The opposite of vitamin C: an alkaline gut and urine keep amphetamine uncharged, so more is absorbed and the kidneys hold on to it. The label says up to 75% leaves unchanged in acidic urine but as little as 1% in alkaline urine. A regular antacid habit can make the same dose feel much stronger."],
 ["food","Alcohol","watch","Masks how drunk you feel, so people drink more; both strain the heart.","","reported",
  "A stimulant hides the sleepy, heavy feeling alcohol normally gives, which is how people end up drinking more than they meant to. Both raise heart rate, and the mix is common in emergency visits for palpitations. Alcohol also worsens the next day's crash."],
 ["med","MAOIs, linezolid, methylene blue","avoid","Hypertensive crisis. 14 day gap (label).","methylene-blue","verified",
  "MAO enzymes break down the noradrenaline and dopamine amphetamine releases. Block them and the released chemicals pile up, which can send blood pressure to dangerous levels. The label forbids Adderall within 14 days of an MAOI. Methylene blue is an MAOI, including the low oral doses taken as a nootropic."],
 ["med","Other stimulants (methylphenidate, modafinil, phentermine)","avoid","Stacking stimulants without a doctor.","","inferred",
  "Doctors sometimes combine an amphetamine with a short dose of another stimulant, under supervision. Self-stacking adds heart rate, blood pressure, anxiety and psychosis risk with no extra focus most of the time. Phentermine is an amphetamine cousin sold for weight loss."],
 ["med","SSRIs, SNRIs, triptans, tramadol, fentanyl","watch","Serotonin syndrome risk on the label.","","verified",
  "These raise serotonin in different ways. Many people safely take an SSRI with Adderall under a doctor; the label asks prescribers to watch for serotonin syndrome, especially when starting or raising either."],
 ["med","Fluoxetine, paroxetine, bupropion","watch","Block CYP2D6 and raise amphetamine levels.","","verified",
  "CYP2D6 is a liver enzyme that helps break amphetamine down. These three block it, so the same dose builds higher in the blood. Bupropion also releases dopamine and noradrenaline itself."],
 ["med","Blood pressure medicines","watch","Amphetamine can blunt their effect.","","verified",
  "Most blood pressure pills lower pressure by relaxing vessels or slowing the heart; amphetamine pushes the other way. The label notes reduced effect of antihypertensives. Pressure should be checked after starting."],
]

RXW_TAKE = [
 "The main part, d-amphetamine, has a half-life around 10 hours in adults, so even the tablet leaves enough in the blood at night to cut deep sleep. XR is built to release over 10 to 12 hours.",
 "Amphetamine dampens hunger within the hour through noradrenaline. People who skip breakfast often reach evening having eaten almost nothing, which feeds the afternoon crash and, over months, loss of muscle.",
 "Acid keeps amphetamine charged in the gut, so less is absorbed, and speeds its exit in urine. Orange juice with breakfast is the classic reason a morning dose 'didn't work'.",
 "XR holds two kinds of beads, one released at once and one hours later. Crushing dumps the whole dose at once. Snorting or injecting is how misuse turns into overdose, per the boxed warning.",
 "Amphetamine raises pulse and blood pressure a little in most people and a lot in some. Long-term users in Sweden had more high blood pressure after 3 years. A home cuff makes this easy.",
 "Adderall is Schedule II in the US: sharing or selling is a federal crime. In Indonesia amphetamine medicines have no legal channel at all, so even a prescribed supply can mean arrest.",
]

PK = {"rows":[
  ["How fast it gets in","The tablet peaks in blood about 3 hours after a dose; XR about 7 hours, with its two bead types.","label · humans"],
  ["How much reaches the blood","Almost all of it: amphetamine is well absorbed by mouth. Acidic drinks and vitamin C lower absorption, antacids raise it.","label · humans"],
  ["How long it stays","Half-life about 10 hours for d-amphetamine and 13 for l-amphetamine in adults; a little shorter in children.","label · humans"],
  ["How it's broken down and cleared","Partly by liver enzymes (CYP2D6 among them), the rest leaves unchanged in urine: from 1% in alkaline urine to 75% in acidic urine.","label · humans"]],
 "why":"The felt effect is shorter than the half-life: focus fades after 4 to 6 hours on the tablet as blood levels fall from their peak, but enough stays to disturb sleep. That gap is why a late dose costs a night.",
 "gap":"How much people differ in CYP2D6 speed matters is still argued, and there are almost no long-term studies of adult levels over years."}

STUDIES = [
 {"slug":"adderall","r":"Cognition","at":"Prefrontal cortex","t":"Amphetamines the most effective ADHD medicine in adults, 133 trials (2018)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC6109107","type":"HUMAN","checked":"2026-11-27","who":"10,068 children and 8,131 adults across 133 double-blind trials","f":"Amphetamines beat methylphenidate, atomoxetine and modafinil on clinician ratings, but were less well tolerated than placebo at every age.","cr":"Cortese et al. · Lancet Psychiatry 2018 · UK"},
 {"slug":"adderall","r":"Mood","at":"Prefrontal cortex","t":"High-dose amphetamine and new psychosis or mania (2024)","url":"https://psychiatryonline.org/doi/10.1176/appi.ajp.20230329","type":"HUMAN","checked":"2026-11-27","who":"1,374 people with first psychosis or mania vs 2,748 controls","f":"Any prescription amphetamine in the past month: 2.68x the odds. Above 30 mg dextroamphetamine (40 mg Adderall): about 5.3x. No rise with methylphenidate.","cr":"Moran et al. · Am J Psychiatry 2024 · USA"},
 {"slug":"adderall","r":"Heart","at":"Heart","t":"Long-term ADHD medicine use and high blood pressure (2024)","url":"https://pmc.ncbi.nlm.nih.gov/articles/PMC10851097/","type":"HUMAN","checked":"2026-11-27","who":"Over 278,000 people in Swedish registers, up to 14 years","f":"3 to 5 years of use: 72% higher odds of high blood pressure; over 5 years: 80%. Heart attack, stroke and rhythm problems did not rise significantly.","cr":"Zhang et al. · JAMA Psychiatry 2024 · Sweden"},
]

STUDIES.append({"slug":"adderall","r":"Cognition","at":"Prefrontal cortex","t":"Adderall in healthy young adults: small effects, big feeling (2013)","url":"https://core.ac.uk/download/76386905.pdf","type":"HUMAN","checked":"2026-11-27","who":"46 healthy young adults, double-blind crossover vs placebo","f":"No more than small effects on memory, attention, inhibition or creativity, yet people on the active capsule believed their thinking was enhanced.","cr":"Ilieva, Boland and Farah · Neuropharmacology 2013 · USA"})

SUPP = [["l-theanine","L-Theanine","#CC007E"],["magnesium-glycinate","Magnesium Glycinate","#5271FF"],["protein","Protein","#F28E79"],["electrolytes","Electrolytes","#9E1B32"],["omega-3-epa-and-dha","Omega-3 (EPA and DHA)","#FF5050"]]

MEDS = {}
ORDER = ['adderall']

MEDS['adderall'] = dict(
 data=dict(slug="adderall", name="Adderall", lines=["Adder","all"], sub=None, fsz=None, origin="np", ref=False, rank=0,
  alias="Adderall XR, Mydayis, mixed amphetamine salts, MAS, amphetamine and dextroamphetamine, dextroamphetamine, addy, adderal, aderall",
  seq="", seqNote="",
  sticker={"blocks":{"lt":"Sleep","lb":"Appetite","mid":"Drive","wide":"Cognition"},"dots":[],"wm":"#6777B6"},
  canva=False, primary="Cognition", roles=["Cognition","Drive","Sleep","Appetite"], reported=[], fda=True, fdaFill=True, depth="draft", short=False,
  status="Prescription only and a Schedule II controlled drug in the US (FDA approved; Adderall XR in 2001). Boxed warning for abuse, misuse and addiction, updated Oct 2023. Illegal in Indonesia with no exceptions, foreign prescription or not. Banned in sport in competition (WADA S6 stimulant). In US shortage since Oct 2022, still listed in Oct 2026.",
  dose={"dose":"5–40 mg","freq":"1–2× daily (tablet) · 1× morning (XR)","cycle":"Ongoing, as prescribed","route":"Oral","half":"~10 h (d-amphetamine, adults)","use":"ADHD and narcolepsy","conf":"verified","status":"label","start":"5 mg","why":"Doctors start low and raise it 5 mg a week to the lowest dose that works; narcolepsy runs higher. Above 40 mg a day the psychosis risk rose about 5x in a 2024 study.","approved":""},
  desc={"Cognition":"Sharper attention and less impulsivity in ADHD","Drive":"Pushes dopamine and noradrenaline out of nerve endings","Sleep":"Keeps people with narcolepsy awake; delays sleep for everyone","Appetite":"Cuts hunger; weight loss is a common side effect"},
  syn=[], otl="Not a peptide",
  tl=[["1887","Amphetamine first made in Berlin by Lazăr Edeleanu"],["1930s","Sold as the Benzedrine inhaler for blocked noses, then as pills for narcolepsy and low mood"],["1960","The mixed salts approved in the US as Obetrol, a diet pill"],["1996","Richwood relaunches Obetrol for ADHD under the name Adderall"],["2001","Adderall XR approved: two bead types, one dose a day"],["2018","133-trial analysis: amphetamines the strongest ADHD medicine in adults"],["2022","FDA declares a US shortage of the tablets (12 Oct)"],["2023","FDA strengthens the boxed warning on abuse, misuse and addiction"],["2024","High doses (above 40 mg Adderall) tied to 5x the risk of new psychosis or mania"],["2026","Shortage still listed; label revised again in April"]],
  mech=[["Slips into dopamine and noradrenaline nerve endings","Taken up by DAT and NET","Drive"],["Empties their storage sacs and runs the pumps backwards","VMAT2 and TAAR1, transporter reversal","Drive"],["More signal in the brain's planning areas","Prefrontal dopamine and noradrenaline up","Cognition"],["Wakefulness up, hunger down","Arousal and appetite centres","Sleep"]],
  tst=[["Cognition","ADHD in children and adults, dozens of trials","trial"],["Cognition","Amphetamines beat methylphenidate, atomoxetine and modafinil on clinician ratings in adults (133 trials)","trial"],["Sleep","Narcolepsy, label use","trial"],["Mood","High doses and new psychosis or mania, case-control","human"],["Heart","Long-term ADHD medicines and high blood pressure, Swedish registry","human"]],
  fn="ADHD and narcolepsy",
  kw=["adhd","add","attention","focus","concentration","stimulant","amphetamine","narcolepsy","adderal","addy","study drug","vyvanse","ritalin","dexamphetamine","speed","schedule ii"],
  nameNote={"t":"The brand was renamed from Obetrol, a 1960s diet pill, when it was relaunched for ADHD in 1996. The new name is widely told as a play on 'A.D.D. for all'.","src":SRC['wiki'],"conf":"reported"},
  whoNot=[
   {"t":"Anyone in Indonesia, Bali included","why":"Amphetamine medicines are illegal there with no exceptions, even with a foreign prescription. A US man went on trial in Bali in 2025 over a parcel of 99 pills.","conf":"verified"},
   {"t":"People who took an MAOI in the last 14 days","why":"Label contraindication: risk of a hypertensive crisis. Includes linezolid and IV methylene blue.","conf":"verified"},
   {"t":"People with heart disease, a heart rhythm problem or uncontrolled high blood pressure","why":"It raises pulse and blood pressure. The label says to screen heart history and family history of sudden death first.","conf":"verified"},
   {"t":"Anyone with a history of psychosis, bipolar disorder or a family history of either","why":"Stimulants can trigger psychosis or mania. Risk rose about 5x above 40 mg Adderall a day in a 2024 study.","conf":"verified"},
   {"t":"People with a past stimulant or other substance problem","why":"Boxed warning: high potential for misuse and addiction, with overdose and death reported.","conf":"verified"},
   {"t":"Pregnant or breastfeeding women","why":"Breastfeeding is not recommended on the label; amphetamine passes into milk. Pregnancy needs a doctor's call.","conf":"verified"},
   {"t":"People with glaucoma or severe anxiety","why":"Older labels list both as contraindications; anxiety is among the most reported side effects.","conf":"reported"}],
 ),
 page=dict(
  sum="Adderall is a mix of four amphetamine salts (three parts dextroamphetamine to one part levoamphetamine), not a peptide. It pushes dopamine and noradrenaline out of nerve endings, which sharpens attention and cuts impulsivity in ADHD, keeps people with narcolepsy awake, and lowers appetite. It is a Schedule II drug with a boxed warning for misuse and addiction, and illegal in Indonesia.",
  deep="Amphetamine is taken up into dopamine and noradrenaline neurons by their own transporters (DAT and NET). Inside, it disrupts VMAT2, the pump that loads neurotransmitter into storage vesicles, and activates TAAR1, which flips the transporters into reverse. Dopamine and noradrenaline then flood out of the cell instead of being recycled. The d-isomer is several times stronger on dopamine; the l-isomer adds more noradrenaline and a slightly longer tail.",
  helps="Improves core ADHD symptoms (attention, impulsivity, hyperactivity) in children and adults within about an hour, and keeps people with narcolepsy awake through the day.",
  tested="Dozens of controlled trials in ADHD and narcolepsy. A 2018 network meta-analysis of 133 double-blind trials found amphetamines the most effective ADHD medicine in adults, and less well tolerated than placebo at every age.",
  worked="Strong, fast effect on ADHD symptoms; clinicians rated amphetamines above methylphenidate, atomoxetine and modafinil in adults. Narcolepsy users rate it highest on Drugs.com.",
  didnt="Side effects make many stop: poor sleep, lost appetite, anxiety, irritability and an afternoon crash. Long-term use was tied to high blood pressure in a Swedish registry, and high doses to new psychosis or mania.",
  reports="Drugs.com users give Adderall 7.2 out of 10 across 524 reviews: 63% positive, 19% negative. Narcolepsy rates 8.0 (68 reviews), ADHD 7.1 (431). Anxiety, insomnia, low mood, lost appetite, headache and irritability are the most named side effects.",
  found="Amphetamine was first made in 1887; the mixed-salt pill began as a 1960s diet drug and was relaunched for ADHD in 1996. Not a peptide.",
  first="A diet pill (Obetrol, 1960) before it became an ADHD medicine in 1996.",
  story="A century-old molecule that went from nasal inhaler to diet pill to the most prescribed ADHD medicine in the US. Its success brought misuse as a study drug, a boxed warning and a shortage that has run since 2022.",
  sources=S('fda_ir','fda_xr','dailymed','dc_add','cortese18','moran24','moran_pn','zhang24','ilieva13','macqueen18','ilieva13b','bali','shortage','wiki'),
  pools=[["524","Drugs.com reviews; ADHD 431, narcolepsy 68",1],["7.2/10","average rating, 63% positive, 19% negative",1],["8.0/10","narcolepsy, best rated use (68 reviews)",1],["7.1/10","ADHD (431 reviews)",0]],
  wk=["Narcolepsy rated 8.0 out of 10 (68 reviews)","Focus and follow-through within an hour","Amphetamines rated strongest for adult ADHD across 133 trials"],
  dn=["Afternoon crash and irritability","Sleep and appetite loss make many stop","Tolerance: some feel it fade and push the dose up"],
  rp=["Anxiety","Trouble sleeping","Low mood","Loss of appetite","Headache and irritability","Dry mouth"],
  originDetail="Not a peptide · synthetic amphetamine salts (3:1 d to l)",
  dose={"tiers":[
    {"label":"ADHD, adults, tablet","dose":"5 mg to start","freq":"1–2× daily","dur":"as long as prescribed","route":"Oral","who":"FDA label · raised 5 mg a week, rarely above 40 mg a day","tag":"verified","src":S('fda_ir')},
    {"label":"ADHD, adults, XR","dose":"20 mg","freq":"1× morning","dur":"Ongoing","route":"Oral","who":"FDA label (XR)","tag":"verified","src":S('fda_xr')},
    {"label":"Narcolepsy","dose":"5–60 mg a day","freq":"Split, first dose on waking","dur":"Ongoing","route":"Oral","who":"FDA label","tag":"verified","src":S('fda_ir')}],
   "checked":["FDA labels"],"src":S('fda_ir','fda_xr')},
  mx=["Amphetamine looks enough like dopamine and noradrenaline that their own recycling pumps (DAT and NET) pull it into the nerve ending. That is the entry ticket: it only acts strongly where those pumps are, which is why its effects centre on attention, drive, alertness and the heart.",
      "Inside, it upsets VMAT2, the pump that packs dopamine and noradrenaline into storage sacs, so the chemicals spill into the cell. It also switches on TAAR1, which turns the recycling pumps around so they push the chemicals out instead of pulling them in. The result is a surge of signal, not just a slower clean-up like methylphenidate.",
      "In ADHD the prefrontal cortex, the brain's planning and braking area, runs on too little dopamine and noradrenaline signal. Topping it up improves holding attention, finishing tasks and stopping impulses. The same surge in reward areas is what makes it pleasurable at higher doses, and the root of its misuse risk.",
      "Noradrenaline also drives the body's alert system. That keeps people with narcolepsy awake, but it raises pulse and blood pressure, dampens hunger and delays sleep, the side effects most people notice first."],
  hasDeep=True,
 ),
 card="Some brains run their planning and braking areas on too little dopamine and noradrenaline. Adderall is a mix of amphetamine salts that floods those areas with both, so attention holds, impulses slow and sleepiness lifts. It works within an hour and fades in hours, takes hunger and sleep with it, and is a Schedule II drug with a boxed warning for misuse. Illegal in Indonesia, prescription or not.",
 punch="The ADHD stimulant. Focus in an hour, hunger and sleep gone too. Schedule II, illegal in Indonesia.",
 take={"what":"A mix of amphetamine salts that releases dopamine and noradrenaline in the brain. A stimulant pill, not a peptide.",
       "legal":"Prescription only, Schedule II in the US, with a boxed warning for misuse and addiction. Illegal in Indonesia with no exceptions.",
       "use":"ADHD in children and adults, and narcolepsy. Widely misused as a study or diet drug.",
       "ev":"Dozens of trials: the strongest ADHD medicine in adults on average. High doses raise psychosis risk, and long-term use is tied to high blood pressure."},
 faq=[["Does it make people without ADHD smarter?","Not much. People without ADHD tend to feel more focused and motivated, but studies of healthy users show small or no gains on actual test scores, with the same sleep, appetite and heart effects. The feeling of doing better is stronger than the result."],
      ["Adderall or Vyvanse?","Both are amphetamine. Vyvanse is a prodrug the body has to unlock, so it starts slower, runs smoother and longer, and is harder to misuse; it usually costs more. Adderall tablets act faster and can be split across the day. Which works better varies by person."],
      ["Is it legal in Bali?","No. Indonesia treats amphetamine medicines as illegal narcotics with no exceptions, even with a foreign prescription. People have been arrested in Bali for receiving the pills by post."],
      ["How long does it last?","The tablet lasts about 4 to 6 hours, the XR capsule about 10 to 12. Half-life of the main part is around 10 hours in adults, which is why late doses ruin sleep."],
      ["Can I take it with my peptides?","No known direct interaction with BPC-157, TB-500, GHK-Cu or KPV. Watch stacking with other stimulating compounds (Semax, bromantane, tesofensine), with GLP-1s (both kill appetite and raise heart rate), and with GH peptides taken for sleep, since a late stimulant cancels the deep sleep they rely on. Never with methylene blue: it is an MAOI."],
      ["What does the crash feel like?","As a dose wears off, many feel tired, irritable or low for an hour or two. Eating, a steady dose schedule, or the XR form usually soften it. A crash that brings dark thoughts needs a doctor."]],
 deep={"asof":"2026-11","sections":[
   {"h":"How well it works, and for whom","where":"people","body":[
    "The largest comparison to date pooled 133 double-blind trials of ADHD medicines in children and adults [1]. For core symptoms rated by clinicians, every medicine beat placebo, and in head-to-head comparisons amphetamines came out ahead of methylphenidate, atomoxetine and modafinil in both age groups (verified).",
    "Tolerability ran the other way: amphetamines were less well tolerated than placebo in children and adults alike. Weighing both, the authors recommended methylphenidate first in children and amphetamines first in adults, for short-term treatment [1]. Trials rarely ran past 12 weeks, so long-term benefit is less well measured (verified)."]},
   {"h":"Dose and psychosis","where":"people","body":[
    "A 2024 case-control study of emergency admissions at Mass General Brigham compared 1,374 people with a first episode of psychosis or mania with 2,748 controls [2]. Any prescription amphetamine in the past month went with 2.68 times the odds; doses above 30 mg dextroamphetamine equivalent, which is 40 mg of Adderall, went with about 5.3 times [3] (verified).",
    "Methylphenidate showed no significant rise in the same study [3]. The authors estimated that 81% of the psychosis or mania cases among high-dose users might not have happened at a lower dose, if the link is causal (reported). Stimulant labels set no firm upper dose, which is part of why the finding drew attention."]},
   {"h":"The heart over the years","where":"people","body":[
    "A Swedish registry study followed people on ADHD medicines for up to 14 years [4]. Each extra year of use raised cardiovascular risk a little; 3 to 5 years of use went with about 72% higher odds of high blood pressure, and more than 5 years with about 80% (verified). Heart attacks, strokes and rhythm problems did not rise significantly.",
    "Bare Signals reads that as: short-term heart risk in healthy people is low, but blood pressure and pulse are worth checking for as long as someone stays on it (inferred)."]},
   {"h":"Law, supply and the Bali question","where":"people","body":[
    "In the US, Adderall is Schedule II and has been short since the FDA declared a shortage of the tablets on 12 October 2022; the FDA still listed it in October 2026 [5] (reported). Shortages push some people to counterfeit pills, which have been found to contain methamphetamine or fentanyl (reported).",
    "In Indonesia it is not a prescription medicine at all. A Bali prosecutor told the court in a 2025 case that amphetamine ADHD pills are illegal with no exceptions [6] (verified). There is no legal way to bring it in or carry it, foreign prescription or not."]},
   {"h":"Does it help people without ADHD?","where":"people","body":[
    "In a double-blind crossover trial, 46 healthy young adults took Adderall or placebo and sat a battery of memory, attention, inhibition and creativity tests [8]. The drug had no more than small effects on any of them, yet people on the active capsule rated their own thinking as enhanced (verified).",
    "Vigilance is the one place a gain shows up. In 69 healthy adults on 10 or 20 mg of d-amphetamine, the usual drop in attention over a long boring task did not happen, while it did on placebo [9] (verified). A survey by the same Penn group found study-drug users describe the effect as motivational at least as much as cognitive: tasks feel worth doing [10] (reported).",
    "Bare Signals reads that as: for people without ADHD, Adderall mostly makes work feel easier and lasts longer at a dull task; it does not make anyone smarter, and the risks stay the same (inferred)."]},
   {"h":"How it mixes with peptides, compound by compound","where":"mixed","body":[
    "No study has tested Adderall with any peptide, so every row in Mixing it with is reasoned from how each one works (inferred unless marked). The sweep checked every family in the Library against four things amphetamine does: releases dopamine and noradrenaline, raises heart rate and blood pressure, cuts appetite and sleep, and is cleared through CYP2D6 and urine pH.",
    "Avoid: tesofensine, which blocks the same dopamine and noradrenaline recycling and already raises pulse and pressure, and methylene blue, an MAOI that can pile released noradrenaline into a blood pressure crisis (label). Watch: GLP-1s (appetite and heart rate stack), Semax, bromantane and dihexa (more stimulation, more anxiety), Selank (may soften anxiety, not the heart), GH and sleep peptides (a late dose wrecks the deep sleep they rely on), PT-141 and Melanotan 2 (blood pressure), BAM-15 and SLU-PP-332 (heat and heart rate).",
    "Fine, with no known reason for trouble: the repair peptides (BPC-157, TB-500, GHK-Cu, KPV, KLOW, LL-37), the mitochondria set (NAD+, MOTS-c, SS-31, 5-Amino-1MQ, with a slow NAD+ drip), the brain-protection set (Pinealon, Cerebrolysin, Epitalon) and the immune and hormone compounds. Fine is not the same as tested."]},
   {"h":"Tolerance, the crash and dependence","where":"people","body":[
    "The boxed warning, strengthened in October 2023, says Adderall has a high potential for misuse that can lead to a substance use disorder, and that misuse can end in overdose and death [7] (verified). Risk rises with higher doses and with snorting or injecting.",
    "Reviews describe two everyday problems short of addiction: an afternoon crash of tiredness, irritability or low mood as levels fall, and a sense that the same dose works less well after months (reported, Drugs.com reviews). Doctors usually answer the first with XR or a small afternoon dose, and the second with breaks or a switch, not endless dose rises, since risk of psychosis climbs above 40 mg a day [2]."]},
   {"h":"Open questions","where":"mixed","body":[
    "Whether decades of use change heart or brain health beyond blood pressure. Why some people feel it fade and others do not. Whether it truly helps healthy people perform, rather than feel productive. Whether stacking with peptides changes anything: no study has looked."]}],
  "refs":[{"n":1,"t":"Cortese 2018, network meta-analysis of ADHD medicines (Lancet Psychiatry)","url":SRC['cortese18'][1],"year":"2018"},{"n":2,"t":"Moran 2024, prescription amphetamine and psychosis or mania (Am J Psychiatry)","url":SRC['moran24'][1],"year":"2024"},{"n":3,"t":"Psychiatric News summary of Moran 2024","url":SRC['moran_pn'][1],"year":"2024"},{"n":4,"t":"Zhang 2024, ADHD medicines and long-term cardiovascular risk (JAMA Psychiatry)","url":SRC['zhang24'][1],"year":"2024"},{"n":5,"t":"ADHD medicine shortage list, Oct 2026","url":SRC['shortage'][1],"year":"2026"},{"n":6,"t":"Bali Adderall trial (Macau Daily Times / AP)","url":SRC['bali'][1],"year":"2025"},{"n":7,"t":"Adderall FDA label","url":SRC['fda_ir'][1]},{"n":8,"t":SRC['ilieva13'][0],"url":SRC['ilieva13'][1],"year":"2013"},{"n":9,"t":SRC['macqueen18'][0],"url":SRC['macqueen18'][1],"year":"2018"},{"n":10,"t":SRC['ilieva13b'][0],"url":SRC['ilieva13b'][1],"year":"2013"}]},
 rx=dict(
  take=[["Take it early","A late dose keeps you up. The tablet lasts 4 to 6 hours, XR 10 to 12."],["Eat before it kicks in","Appetite drops within the hour. Breakfast first, then plan lunch on purpose."],["Keep juice and vitamin C away","Acidic drinks and vitamin C lower how much gets absorbed. Leave an hour either side."],["Swallow XR whole","Or open it over applesauce. Never crush, snort or inject it."],["Check pulse and blood pressure","Before starting and now and then after. Note any chest pain or racing heart."],["Never share or carry abroad blindly","Giving it away is a crime in the US. In Indonesia even carrying it is illegal."]],
  ix=[r[:6] for r in IX],
  cmp=dict(intro="What else treats ADHD, and when each wins.",
   rows=[["Vyvanse (lisdexamfetamine)","Smoother and longer from one morning dose; a prodrug, so harder to misuse","Costs more, slower to start, also short at times"],
         ["Methylphenidate (Ritalin, Concerta)","First choice for children in the 2018 analysis; no psychosis dose signal in the 2024 study","Slightly weaker on average in adults"],
         ["Atomoxetine, viloxazine","Not controlled, no misuse; an option where stimulants are banned","Takes weeks to work, smaller effect"],
         ["Guanfacine or clonidine ER","Helps sleep, tics and irritability; often added to a stimulant","Smaller effect; low blood pressure and drowsiness"],
         ["Modafinil","Wakefulness with less euphoria; less misuse","Not approved for ADHD; amphetamines beat it in trials"]]),
  bw=dict(before="Blood pressure, pulse, heart history and family history of sudden death, per the label. An ECG if heart disease is suspected.",
          monitor="Blood pressure and pulse at every check; weight, sleep and mood. Children: height and weight.",
          freq="Every few months while on it",
          flags="Chest pain, fainting or a racing heart; new paranoia, voices or mania; cold, numb or colour-changing fingers and toes; heavy low mood when it wears off",
          tests=["ecg-cac-score"]),
 ),
 body=[{"k":"brain","r":"Cognition","at":"Prefrontal cortex","note":"More dopamine and noradrenaline: attention holds"},
       {"k":"brainstem","r":"Sleep","at":"Arousal centres","note":"Keeps narcolepsy awake; delays sleep"},
       {"k":"hypothal","r":"Appetite","at":"Hypothalamus","note":"Hunger drops"},
       {"k":"heart","r":"Heart","at":"Heart","note":"Pulse and blood pressure rise"}],
)
