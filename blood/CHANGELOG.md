# Blood Work versions

/blood/ always opens the newest version. Older versions stay live at their own path.

## v6 (22 Oct 2026) at /blood/v6/
- Every compound card now links to its reported dosage ("Reported dosage →", /dosage/#<slug>) next to "Full entry in the Library". Shipped with Dosage v11 (which links back to each compound's blood work) and Library v25. Data, tests and layout unchanged from v5.

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
