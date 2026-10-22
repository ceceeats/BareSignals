# Blood Work versions

/blood/ always opens the newest version. Older versions stay live at their own path.

## v6 (22 Oct 2026) at /blood/v6/
- Every compound card now links to its reported dosage ("Reported dosage →", /dosage/#<slug>) next to "Full entry in the Library". Shipped with Dosage v11 (which links back to each compound's blood work) and Library v25. Data, tests and layout unchanged from v5.

## v9 (23 Oct 2026) at /blood/v9/
- Compact compound cards. Each card opens short: the 4 main labels, then "Before you start" and "While on it" as plain test names (like the supplement list), with a small red dot for danger and an amber dot for watch. Danger and watch tests come first.
- "Show full card" expands the rest: every Library label with what it does (main, reported, in trials, mechanism), the blood markers it moves grouped by colour, the tests as compact rows with notes, arrows and cost tier, how often, red flags, test prep, markers, notes in full, sources and supplements. Opening a compound from a link (/blood/#/c/<id>) expands it.
- Orange tint = something you do: Add to my plan (left, orange), the plan search box, the add buttons, picked compounds, copy link and print. Full entry in the Library and Reported dosage sit on the right. "Also check while on it" heading moved from orange to ink so orange only means action.
- Bigger text: card title, labels and test names.
- Test prep, from the Oct 2026 prep research (sourced, tagged verified/reported/inferred):
  - Blood tests tab: "Before any blood test" box with the 9 general rules (water only when fasting, normal water intake, 7 to 10am at the same time each retest, biotin stop, 48h no hard training, 24h no alcohol, postpone when sick, same lab, keep prescribed medicines).
  - Every test explainer: "Before the test" with that test's rules. "Fast first?" corrected for 24 tests (e.g. lipids no longer need fasting, testosterone and folate do); the Encyclopedia's original note is shown under it.
  - Compound cards: "Before the blood draw" with class rules (GLP-1 lipase reads higher, GH axis timing, hCG, teriparatide calcium timing, creatine, methylene blue and more), filtered so a card only shows rules for itself.
  - My plan: "Before your draw" checklist grouped Every draw / For the tests in your plan / For your compounds. Ticks saved in this browser.
- Data: /blood/v9/data.js = v8 + prep + every Library label per compound. v8 files stay in place (Library v28 and Supplements v7 read /blood/v8/lib.js and supp.js).

## v8 (22 Oct 2026) at /blood/v8/
Shipped with Library v28 (on the other session's v27) and Supplements v7 (on the other session's v6).
- TB-500 now means frag 17–23, the form sold as TB-500 (the July 2026 FDA briefing confirms TB-500 is the 17–23 fragment and not thymosin beta-4). The Encyclopedia's TB-500 protocol and the frag 17–23 research are one card: "TB-500 (frag 17–23)", with "Also researched Oct 2026" and sources. Library links follow.
- Full Thymosin Beta-4 got its own researched entry (RegeneRx human trials for IV, gel and eye drops; cancer and new-vessel growth as the main red flag).
- VO2 Max has a general range again: poor / average / excellent by sex and decade, from the FRIEND registry (Kaminsky 2015, measured VO2 max). Note: Cooper Institute norms run higher, so the same score can read "average" on FRIEND and "poor" on Cooper.
- Research numbers on marker rows: "Trials: <amount> · <who it was measured in>". 35 rows have a number (for example tirzepatide fasting insulin −43% at 72 weeks, lipase +31–42% on GLP-1s, hs-CRP −40 to −55%, MK-677 IGF-1 +60–73%, tesamorelin IGF-1 +107 ng/mL vs placebo). Rows without a human number say "no trial data".
- "Research disagrees" flag where trials contradict the Matrix arrow: uric acid on semaglutide and tirzepatide (falls, not rises), GHRP-2 IGF-1 (no rise over 5 days in men), Thymosin Alpha-1 platelets (no drop vs control), EPO iron/ferritin (EPO uses iron up, ferritin usually falls). The Matrix arrows themselves are unchanged pending Cece's decision.
- EPO change amounts deliberately left out. Every research number carries its population.
- Supplement links rematched to Supplements v6 (75 supplements): Ferritin, Hemoglobin and MCV now link Iron; MCV and Hemoglobin link Vitamin B12; TSH and Anti-TPO link Iodine. 65 links (was 50).
- New: /blood/v8/supp.js feeds "Blood tests to check" on Supplements v7 cards.

## v7 (22 Oct 2026) at /blood/v7/
Shipped with Library v26. Built on v6 (the other session's "Reported dosage" button kept).
- Phone-first compound cards: bigger text, full colour tags from the Library's 30-colour legend (Semaglutide: Appetite, Glucose, Heart, Reward), a colour band made of those tags.
- "Test before you start" and "Also check while on it" are now a grid of test chips instead of chips inside sentences. Each chip shows a direction arrow (↑ raises, ↓ lowers), three red dots for danger, one amber dot for watch, ◎ when it shows whether the compound works, a short note from the owner's notes or the Matrix (for example "pancreatitis", "depletes"), and a cost tier.
- Cost tier on every test: "$$$ rare" (specialty, pricier, few labs: rT3, Lp(a), Cystatin C, C-Peptide, DEXA, VO2 Max, CAC, GI-MAP, genetic and biological age kits and more) and "ask lab" (not every basic lab runs it). Taken from the Encyclopedia's availability column; lab names and locations are not published.
- "What it does to your markers" is collapsed behind an expand. Each row shows what to aim for and the high or low number in red on the right, picking the side the compound pushes toward (B12 shows the low threshold because semaglutide depletes it).
- "Same as semaglutide / ipamorelin / GHRP-2 / no-DAC" protocols are written out in full (Tirzepatide, CJC-1295 both, GHRP-6, Orforglipron). Side notes stay with the compound they were written for.
- The original wording is kept under "Notes in full" on each card.
- 46 researched compounds added (every Library compound now has blood work): each card shows "Researched Oct 2026" with a confidence level (verified / reported / inferred / speculated), why these tests, and a Sources list. 155 sources in total. Spot-checked against primary sources: TB-500 FDA briefing (Jul 2026), Bydureon BCise label, adipotide primate study, Forteo label (corrected: the 2-year limit is still a soft limit; the 1 and 3 month calcium checks are common practice, not on the label).
- Supplement chips and supplement rows carry their own colour from the Supplements page's main label.
- 90 compounds: 26 from the Bloodwork Encyclopedia, 46 researched, 18 with Matrix marker effects only.

## v6 (22 Oct 2026) at /blood/v6/
Made by the other session: v5 plus a "Reported dosage" button on each compound card linking to the Dosage page.

## v5 (22 Oct 2026) at /blood/v5/
Shipped with Library v24 (built on the other session's Library v23 layout).
- Tests inside every compound are now tappable colour chips (fasting glucose, HbA1C, B12, liver, thyroid...). Tap one for a plain-language explainer: fast first, retest, what it is, what you would feel, good vs bad (with a "Before you trust the number" callout), why the number can lie (what pushes it up and down), what to do if high or low, and the one thing to remember.
- Every explainer starts with "Test this if you take", listing compounds whose protocol lists the test or that the Matrix flags (⚠ 🔍 ⚡). Further down: "Peptides that move it" and "Supplements and vitamins that move it", quoting the sentence from the notes and linking to the Supplements card.
- Group chips ("liver", "thyroid", "CBC", "lipids", "kidney") open the tests that word usually means.
- Peptide × Biomarker Matrix added: every compound shows "What it does to your markers" (↓ ↑ ⚠ 🔍 ⚡ with notes). 18 Matrix-only compounds added (Cagrilintide, KPV, SS-31, Sermorelin, HCG and more): 44 compounds in total.
- Compound cards show "Supplements people pair with it" from the Supplements page.
- New tabs: Blood tests, Beyond blood (scans, genetics, gut, women's health, yearly checks) and My plan. My plan combines the picked peptides into one test list with targets, fasting, how often, red flags and things to track at home; shareable link and print. "Same as semaglutide" style protocols inherit the right tests.
- Test set fixed to the sheet's own numbering: tests #1-20 (first pass) plus #21-73 (second pass) = the 73, plus five first-pass bundles kept because their tests exist nowhere else (copper, magnesium, CEA, AFP, phosphate, ECG/CAC, cycle tracking). 78 in total. v3 had still kept 14 superseded bundles.
- Personal notes held back from the public page, word for word (nothing reworded): mentions of Cece's own panel, lab, prices, age-30 ranges, creatine dose and stack, and the "clash with my peptides" column. 46 lines across 31 tests. They stay in the Drive Encyclopedia. VO2 Max shows no range (its only range was the age-30 block).
- Matrix cells with a spreadsheet #ERROR skipped: HGH / GH Levels, IGF-1 LR3 / IGF-1.
- Logic shared in /blood/v5/core.js. /blood/v5/lib.js (generated) feeds the inline Blood work section on the Library full page.

## v4 (22 Oct 2026) at /blood/v4/
- Cross-links with the Library (shipped together with Library v19).
- Every compound card ends with "Full entry in the Library", which opens that compound's full page (/library/#/p/<slug>). 23 of 26 compounds link.
- EPO, L-Carnitine (inject) and Orforglipron have no Library entry yet, so they show "Not in the Library yet".
- TB-500 links to the Library's Thymosin Beta-4 entry (its aliases cover TB-500), not the Frag 17-23 or Frag 1-4 entries.
- Arriving from the Library (/blood/#<slug>) switches to By compound, scrolls to that compound and flashes it.
- Library v19 adds a Blood work box on each matching full page and a Blood work button on the card. Library v18 kept.

## v3 (22 Oct 2026) at /blood/v3/
- Data cleanup. The source data had two overlapping passes stitched together, leaving duplicate tests and messy category labels.
- Removed 21 duplicate test stubs. Each had a richer rewritten copy later in the file; kept the richer one every time. 108 test entries down to 87. No test content was changed or lost.
- Folded three relabeled categories into their clean names: DNA & GENETIC into DNA & GENETICS, WOMEN into WOMEN-SPECIFIC, FITNESS (VO2 Max) into BODY SCANS.
- Where the second pass had split a combined entry into granular ones, kept the granular (Breast + Pelvic Ultrasound became Breast Ultrasound and Pelvic Ultrasound; Skin Check + Eye Exam + Dental became three separate tests).
- Ordered tests so each category renders as one block instead of appearing twice.
- Kept unique entries that had no second copy (Cycle Tracking, ECG + CAC Score).
- Colour tags, key and layout unchanged from v2.

## v2 (22 Oct 2026) at /blood/v2/
- Every category tag now carries a color from the existing 30 color Bare Signals palette. No new colors added.
- Peptide cards: colored band across the top and a colored swatch on the tag.
- Test glossary: colored left edge on each test and a swatch on each category header.
- Colored key at the bottom showing which categories share which color.
- Data, copy and layout unchanged from v1.
- Grouping used: LIVER and KIDNEY = Organ function. HORMONES, THYROID and all GH tags = Endocrine & growth. HEART & CHOLESTEROL and BLOOD CELLS = Heart & vessels. VITAMINS and IRON = Cellular energy. BODY SCANS and PREVENTIVE = Cellular protection. WOMEN and WOMEN-SPECIFIC = Reproductive. DNA & GENETICS and DNA & GENETIC = DNA & telomeres.

## v1 at /blood/v1/
- First live version, built from the Bloodwork Encyclopedia in Drive. By compound and by test views, search, plain-language glossary.
