# Supplements versions

/supplements/ always opens the newest version. Older versions stay live at their own path.
Source: the Honest Menu sheet of the protocol (supplement columns and phase-wide stacks only). The personal example sheet is never used.

## v22 (27 Oct 2026)
- 27 Oct 2026: every stripe gives the main role about 70%; the other roles share the last 30%, fading in the old 25 : 15 : 11 order. A role that is the main role of a blend part shares the 70% (Wolverine-style blends keep two big blocks). Previous version kept.

## v21 (25 Oct 2026) at /supplements/v21/
- Blood tests tab also reads the researched rows from Blood Work v27 (/blood/v27/supp.js): IGF-1 now shows on Protein and Zinc (raises) and on Vitamin D3 and K2, L-Arginine, Creatine and Green Tea Extract (= no clear effect). New "=" mark in the tab key. v20 kept.

## v18 (24 Oct 2026) at /supplements/v18/
- One content width with the site bar (nav v11): on laptop the page sits in the shared 1240px box with 24px side padding, so the title lines up with the BARE SIGNALS wordmark and the right edge with the A buttons, at every text size. Phone keeps 16px sides. Scroll-fade masks use ink instead of #000. Built on v17, which stays at /supplements/v17/.

## v17 (23 Oct 2026) at /supplements/v17/
- Tag text now picks whichever of three inks reads best on each colour: the usual ink on pale tags, a deeper ink (#1F2550) on mid tones like Cellular protection, DNA, Fat, Muscle, Aging and Cancer, cream on dark tags. Fixes dark-on-dark labels. Built on v16, which stays at /supplements/v16/.

## v16 (23 Oct 2026) at /supplements/v16/
- Category word (e.g. Foundations) is now as big as the supplement name, on the open card and as the group headings, each with its group colour.
- Colour group chips next to the search: 12 groups in their own colours (new SUPP_CATC in data.js), tap several to combine; works together with the text search, Try keywords, roles and For you.
- Card follows the Library card: name and group, badges, the one-line summary, then Typical dose (orange) / How often / Who it's for, then What it does (new plain-language line per supplement, field body; the protocol's own line stays under it as "In the protocol") with the filled role tags always shown.
- Who shouldn't take it: renders the optional whoNot = [{t, why}] field as a Warning box right after What it does (entries come from a separate research pass; none in the data yet).
- Full reading in tabs: Benefits / Dose & forms / Research / Interactions / Blood tests / Goes with, with counts; tabs stick at the top while reading.
- Advice colours: Buy and Check the label in the green box, Skip in the dark red box, How to take and Ways it is taken in the soft purple box, warnings, interactions, dose watch and Check first if you take in red on pink.
- Blood tests are one line of compact chips (arrow = raises/lowers, ask lab / $$$ tags).
- Dose numbers to act on are orange (tiles, typical dose, protocol and guideline rows; upper limits and clinical IV rows stay ink).
- Laptop: four cards per row; when a card opens it takes a bit over half the width and the grid drops to three (two at the largest A). v15 kept.

## v15 (23 Oct 2026) at /supplements/v15/
- Hooked to Nav v10: laptop has five text sizes (0.88 to 1.45) and starts at the large A (1.15); phone keeps three. The page applies the size number nav sends and reads the laptop setting (bs-text-w) at load. Checked at every laptop step on 1366 and 1280 wide. v14 kept.

## v14 (23 Oct 2026) at /supplements/v14/
- Hooked to Nav v9: the text-size strip at the very top (Bare Signals label + A A A) is gone; the three-step control now sits on the site bar's wordmark line, which stays on screen. The page listens to bs-text and scales .wrap as before.
- Laptop side card sticks just under the site bar and its height fits the screen at every text size. Tile names, the open card title and h1 grow by less at large text (open card title 24px, was 27px). Data unchanged (copied to v14). v13 kept.

## v13 (23 Oct 2026) at /supplements/v13/
- Text size control (small A / A / large A) at the top of the page; default A, small is 0.88, large 1.15. Saved as bs-text so it carries between pages.
- Tiles are portrait cards: two per row on phone, five on laptop next to the open card, compact text (15px name, 3-line summary, 2 on phone). Tapping still opens the full card.
- Type Rule v1: every tag, role tag, badge, filter chip and section label uses the 8.5px mono caps badge style; footnotes 9px mono / 10.5px; body 13.5px; doses 12.5px (no big hero numbers); card name 17px; page title 22px. v12 kept.

## v12 (23 Oct 2026) at /supplements/v12/
- Goes with lists gain the Batch 3 compounds (27 pairings). v11 kept.

## v11 (23 Oct 2026) at /supplements/v11/
- Goes with lists gain the 12 Batch 1 compounds and 18 blends (171 pairings), each linked to its Library card. v10 kept.

## v10 (23 Oct 2026) at /supplements/v10/
- Role names shown as filled colour tags (as on Home and Library v38): card main role, What it's for, role group headings, roles key, active filter. v9 kept.

## v9 (23 Oct 2026) at /supplements/v9/
- Phone fix: "Who it's for" tags wrap inside the card on narrow phones. v8 kept.

## v8 (23 Oct 2026) at /supplements/v8/
Built on v7 (keeps "Blood tests to check").
- Sorting matches the Library: Groups, Roles, Evidence, A to Z. "Label" is now "role" everywhere (same 30 roles and colours as the Library).
- "For you" replaces the long sideways-scrolling "For" row: a button that opens a grouped panel (Sex, Life stage, Pregnancy, Diet, Training, Approval, Evidence); picking one closes the panel and shows the choice on the button; "Show everyone" clears it.
- Approval badges like the Library: FDA ✓ on 22 cards, Rx ✓ (approved as a medicine outside the US) on 19. Strict rule: FDA ✓ only when an FDA-approved single-ingredient medicine of that substance exists; each card's new "Approved as a medicine?" section says which form and for what (often IV or Rx only, not the supplement form). No FDA ✓ for combination-only, IV-nutrition-only, irrigation-only or different-salt approvals (Vitamin D3 and K2, Methylfolate, Vitamin E, Proline, Taurine, Glycine, Chromium Picolinate). Approval data checked 23 Oct 2026 (DailyMed, Drugs@FDA, FDA monographs, EMA and national regulators).
- Carnosine moved over from the Library (oral supplement), with a full researched card (Limited evidence). 76 supplements.
- Oral cards link to their injectable or related Library entries: Vitamin B12, L-Carnitine and Acetyl-L-Carnitine (injectable L-carnitine), NMN (NAD+), Creatine Monohydrate and Carnosine.
- TB-500 now links to the Library's TB-500 fragment 17-23 entry (v4 to v7 linked full Thymosin Beta-4).
- Fixed: Glutathione listed twice in some "Goes with" lists.

## v7 (22 Oct 2026) at /supplements/v7/
Built on v6 (other session). Each card gains "Blood tests to check": the blood tests whose Bloodwork Encyclopedia notes name this supplement (raises, lowers, used if low or high), as coloured chips with cost tiers, linking to the test explainer on Blood Work v8. Data from /blood/v8/supp.js. 27 supplements have at least one test.

## v6 (22 Oct 2026) at /supplements/v6/
- Built on v5: keeps the "See their doses side by side" link to Dosage.
- Deep research pass on every card (NIH ODS, Linus Pauling Institute, NCCIH, MSK, Cochrane, ISSN, IOC, EFSA, FDA, trial papers). Every dose row, new finding and source carries a confidence flag: V verified (source opened), R reported, I inferred.
- Tiles: one per row on phones (landscape), richer line on what it does, the typical dose and how often, evidence tier (Strong, Moderate, Limited, Emerging, Traditional) and who it is for.
- Cards: typical dose and how often up top, "The short version" benefits summary, full dose table (Bare Signals protocol, RDA by sex and life stage, upper limit, common dose, trial doses, other routes such as IV marked clinical only), what form to buy and what to skip, label checks, warnings, interactions, ways it is taken, new findings 2023 to 2026, who it is for, numbered sources.
- Protocol doses at or above a reference limit are flagged in red on the card: Vitamin D3 (5,000 IU vs 4,000 IU limit), Zinc (30-50 mg vs 40 mg), Magnesium Glycinate (400 mg vs 350 mg supplemental), Magnesium L-Threonate (stacked total about 550 mg), Electrolytes (magnesium 400 mg; potassium must come from food), Niacin (500 mg, 14 times the 35 mg limit), Vitamin C (2 g, at the limit), Vitamin E (400 IU, the SELECT dose), Protein (above the 2025 GLP-1 advisory range).
- Melatonin note corrected: no evidence was found that a high dose suppresses GH (0.5 mg and 5 mg raised GH equally in small trials).
- 11 new evidence-strong entries from the research report: Folic Acid, Iron, Iodine, Vitamin B12 (Foundations), Psyllium, Cranberry, Plant Sterols, Caffeine, Beta-Alanine, Sodium Bicarbonate, Lutein and Zeaxanthin. New groups: Sport and Performance, Eye Health. 75 supplements total.
- Search: the placeholder types example searches, a "Try" row of tappable keywords and a "For" row of personal filters (Women, Pregnancy safe, Avoid in pregnancy, Breastfeeding, Childbearing age, Menopause, 50+, 65+, Vegan, Strength training, Endurance, Strong evidence). Fixes the cut-off search text on phones.
- Tags follow the report's rule: only where a named guideline, Cochrane review or trial population supports it. Removed: Breastfeeding on Berberine and Ashwagandha (both are avoid), Menopause on Collagen (one industry-funded trial).

## v5 (22 Oct 2026) at /supplements/v5/
- "Goes with" ends with "See their doses side by side →". It opens the Dosage page filtered to just the peptides that go with this supplement, with a "Show all" button (/dosage/?only=<slugs>&from=<supplement>). Library chips unchanged.
- Dosage v12 links back: each dosage card shows how many supplements people pair with it, and the expand panel lists them as links to their supplement cards.
- Content and layout otherwise unchanged from v4.

## v4 (22 Oct 2026) at /supplements/v4/
- Library format. Each supplement is a landscape tile (the Library tiles are upright) with its name, a short line on what it is for, and a count of the peptides it goes with (where the Library shows amino acids).
- Stripes carry every label a supplement works on, not just four. Main label widest on the right, then narrower to the left, same order as the Library band.
- Tap a tile to open its card: inline under the row on a phone (other tiles dim), sticky panel on the right on desktop. Back, forward, close, Esc and arrow keys work.
- Card follows the Library card: name, group and main label, short line, "In the protocol" box (dose, peptides it goes with, phases), full color band, "What it's for" with every label and its meaning.
- "Goes with": peptides now link to their Library card (/library/#/slug), with a swatch in that peptide's Library main color. Dashed boxes are peptides the Library does not have yet (AICAR, Adamax, Collagen Peptides, L-Carnitine injectable, Lipo-C, N-Acetyl Epithalon Amidate, PE-22-28, Thymalin).
- TB-500 links to Thymosin Beta-4, which is how the Library aliases it.
- Each supplement has its own link, e.g. /supplements/#/zinc.
- Search, By group / By label, and the color key filter carry over from v3. Content unchanged from v3.

## v3 (22 Oct 2026) at /supplements/v3/
- Same layout language as Blood Work v2: colored left edge on each card (main label), color key at the bottom.
- Color key rows are tappable and filter the list. The top legend from v2 is gone.
- Dots next to a name now show only the extra labels, since the edge already shows the main one.
- Shorter intro and caution so the first cards show on the first phone screen.
- Public copy cleaned: no more references to "the sheet" or "the peptide menu". Empty "no dose given" notes removed.
- Cinnamon Extract moved from Organ function to Glucose & insulin (main) + Organ function. It sits in the Pancragen stack next to chromium and berberine.
- Data otherwise unchanged from v2: 64 supplements, same peptide links.

## v2 (22 Oct 2026) at /supplements/v2/
- Every supplement tagged with labels from the same 30 the Library uses. First label is the main one.
- Main label colored the card, extra labels as colored chips, legend at the top to filter by label.
- By group / By label toggle.
- Labels in use: 20 of 30. Not used: Appetite, Hair, Drive, Neural protection, Connection & desire, Reproductive, Cancer biology, Tanning, Pain, Reward.
- Loose fits: Electrolytes (Heart & vessels + Organ function, no fluid or mineral label exists), Lactoferrin (Immunity + Gut, placed by its LL-37 pairing).

## v1 (22 Oct 2026) at /supplements/v1/
- First live version. 64 supplements in 10 groups, one card each: what it does, protocol dose, which peptides it supports, phase-wide membership.
- Search across names, peptides and phases. Peptide chips on a card run a search.
- Left out on purpose: Rx drugs, topical serums, sunscreen, and non-supplement habits (food timing, hydration, monitoring).
- Every supplement to peptide link checked against the sheet text.
