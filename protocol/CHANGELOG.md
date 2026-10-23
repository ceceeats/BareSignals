# Protocol versions

/protocol/ always opens the newest version. Older versions stay live at their own path.

## v17 (24 Oct 2026) at /protocol/v17/
- Smart defaults: a peptide added from step one is ready straight away, not a blank card. Start dose = the low end of the Library's typical dose, start date = today (no staggering by default), recommended frequency, time and food where the Library has them, the usual route, and the mix from the Bare Signals sticker sheet: vial size per compound (93 matched), water 2 ml BAC by default, 3 ml for 30 mg vials and up and for Tesamorelin (gels if too little), 5 ml for NAD+ 1000 mg, SS-31 50 mg in 2 ml; nasal = half a vial in a 5 ml bottle (1 part BAC to 4 saline). Switching route resets the mix to that route's default.
- "Use recommended for all" (tap, then confirm) resets every card to those defaults, keeping dates and stock.
- Dose chips add the Library's other usage tiers (e.g. NAD+ IV loading, SS-31 label dose), the first marked "start".
- Fewer words: "Not researched yet" lines are gone (only real recommendations show), Supply row dropped from cards (still in At a glance), step two lede shortened.
- Search takes several names at once ("NAD + TB-500 + SS-31"), matching the start of names and aliases, up to 3 per name, so each can be tapped in or out. The add card searches Library entries only, so blends no longer appear twice.
- Built on the other session's v16 (one content width), kept.

## v16 (24 Oct 2026) at /protocol/v16/
- One content width with the site bar: on laptop the page is the shared 1240px box with 24px sides, zoom compensated, so the title starts under the BARE SIGNALS wordmark and the right edge ends under the A buttons at every text size; phone 16px sides. Text size fallback reads the laptop scale, phone large A. Built on v15, kept.

## v15 (24 Oct 2026) at /protocol/v15/
- Step one now works like the Library: a search box with a match count, the Library's role families (Body and metabolism, Repair and structure, Protection and organs, Brain and mood, Sex and reproduction) that open into filled role tags in their own colours (no more red tags), and compact Library-style tiles, most popular first (12 on a laptop, 6 on a phone, Show all). Each tile: name, sticker colours, use line, reported dose, frequency and cycle, two role tags, full stripe. Tap a tile to add it; tap again to remove (in-stack tiles turn dark, like the Library's selected tile). Adding from a tile no longer jumps the page.
- Opening a protocol link in a tab that already has the page now loads it (hash change).
- Built on v14, kept.

## v14 (24 Oct 2026) at /protocol/v14/
- Vials (or bottles) on hand per peptide, counting the one in use (1 to 6). Doses past that stock show faded and struck through on the Month and Week calendars, with "needs a restock" on the first day it runs short and "last one on hand" on the vial that ends it. Overview shows those weeks as a dashed, faded bar. Cards and At a glance show vials needed, on hand, and "restock by" date with how many more. Kept in the link and in the AI plan text ("on hand 2"). Built on v13, kept.

## v13 (23 Oct 2026) at /protocol/v13/
- Step one asks "What are you trying to improve?" (was "What are you dealing with?"). Suggestions show "In stack ✕" to remove, not just add.
- Step two is a grid of Library-style cards (up to 6 across on a laptop, 2 on a phone): full role stripe (roles plus reported uses), sticker mini-square in the vial sticker's colours, use line, dose with the recommended range beside it, draw (units or sprays), how often, ☀ morning or ☾ evening, food, dates, cycle, supply. The last card is "+ Add a peptide or blend" with search inside it. Edit opens a two-column editor under the card. Orange = a change not saved yet; dashed orange = dose still missing.
- Every setting shows "Recommended" from the Library, or "Not researched yet" (time of day, food, finishing the cycle) where the Library has no data. New "Finish the full cycle" option marks the last day on the calendar and counts doses (e.g. 12/56) in the week view.
- Calendar is the main view: Month (default) and Week, with morning doses on top under ☀, any-time in the middle, evening at the bottom under ☾, each with the peptide's sticker colours; vial and bottle run-out dates and blood test days marked. Overview replaces 3 months and Year: bars only, no numbers.
- Blood work: "When is the baseline blood test?" date (booked or suggested), different wording if the stack has already started. Recheck and watch for adds "Leaves the body (estimate)": five half-lives from the Library half-life, flagged when the half-life is animal data.
- Overlap check: SS-31 + NAD+ moved from "Same lever" to "Same organelle" (blue, good to know): SS-31 binds cardiolipin and steadies the inner membrane, NAD+ is a coenzyme, different jobs. "Shared tests" now lists each test and which peptides list it. New blue notes: Often paired (BPC-157 + KPV), Many at once.
- Notes: dated notes inside the protocol, kept in the link and printed.
- Saving: the address bar always holds the latest saved version (bookmark or add to home screen), links are compressed (about 60% shorter, #p=), protocols are listed under "Saved here" on this device, Send it uses the phone's share sheet. Copy for my AI gives a PLAN block an AI can edit; Paste it back reads it. Old #s= links still open.
- Print: at a glance, four weekly calendars (this week on), the whole run, what each one is (plus leaves-the-body estimate), blood work, how to take it, overlap check, notes, 14-day log.
- Reads Library v47 and Blood Work v21. Built on v12, kept.

## v12 (23 Oct 2026) at /protocol/v12/
- Reads Library v47: 10 new compounds (brenipatide, petrelintide, ecnoglutide, trofinetide, tadalafil, modafinil, Noopept, phenylpiracetam, 9-Me-BC, cGP), human trial status, rewritten PNC-27. Built on v11, kept at /protocol/v11/.

## v11 (23 Oct 2026) at /protocol/v11/
- 3 months and Year views start at the earliest compound's first day, so a compound started before the protocol start (e.g. KPV from 1 Oct when the protocol starts 20 Oct) shows its history. 3 months widens up to 26 weeks to fit the whole run. Header notes the earliest compound date. v10 kept.

## v10 (23 Oct 2026) at /protocol/v10/
- Start over button (tap twice) clears the whole page. Opening a link now replaces everything, so old stacks from earlier clicks no longer mix in.
- Who is this for: Myself or Someone else plus a name; the protocol and printout title become "Name's protocol". Privacy line: nothing is saved by Bare Signals, the link is the save.
- Each compound: dose, one frequency with the recommended one marked "rec." (adds 5 on, 5 off), time of day, food (flagged as not yet researched), length, its own first day (else protocol start, staggered), route (injection, nasal, oral) and mix (mg in ml gives syringe units or sprays per dose, doses per vial or bottle), note.
- Step three: At a glance table (dose, draw, how often, when, dates, supply), Edit stack button, Calendar with four dated views: Week (each day shows dose, units or sprays, time, food), 3 months (doses per week, ▲ where a vial runs out), Calendar (month grid with vial-end and blood dates), Year. Blood work as a compact grid beside Recheck and watch for, which now lists real test dates (baseline 3 days before day one, rechecks). Stack check renamed Overlap check, with a one-line explainer; new lever: SS-31, NAD+, MOTS-c and other mitochondria compounds.
- Print full protocol: at a glance, next 3 months, first month calendar, what each one is (how it works, what people report, what hasn't held up, watch for, supplements people pair, reported dose), blood work with dates, how to take it (injection, nasal, storage), overlap check, 14-day log, reopen link.
- Opt-in anonymous stack share: only compound, dose and frequency go to the cookie-free counter, never name or dates. Off by default.
- Link format v3 (name, per-compound dates, time, food, route, mix, note). v1 and v2 links still open. Reads Library v45 and Blood Work v18. v9 kept.

## v9 (23 Oct 2026) at /protocol/v9/
- Hooked to Nav v9: the text size control (small A / A / large A) lives in the site bar; the page listens to bs-text, zooms its wrapper, headings grow by less at large. Removed the duplicate "Bare Signals · Protocol" label, fixed the version label (said v2), Type Rule sizes (h1 22px, 13.5px body). v8 kept.

## v8 (23 Oct 2026) at /protocol/v8/
- Reads Library v41 (Batch 3: 11 metabolic pipeline and fat/muscle compounds) and Blood Work v15. v7 kept.

## v7 (23 Oct 2026) at /protocol/v7/
- Reads Library v40 (117 entries: 17 Batch 1 compounds, 18 blends) and Blood Work v14 cross-links (blends' tests merged from components). v6 kept.

## v6 (23 Oct 2026) at /protocol/v6/
- Reads Library v36 (99 compounds: Batch 1 from the sticker list, name stories). No layout change. v5 kept.

## v5 (23 Oct 2026) at /protocol/v5/
- Same as v4, reads Library v34 (adds community dose tiers; doses unchanged). v4 kept.

## v4 (23 Oct 2026) at /protocol/v4/
- Same as v3, reads Library v32: Pinealon back to the common 1–2 mg Sub-Q community dose. v3 kept.

## v3 (23 Oct 2026) at /protocol/v3/
- Same as v2, but reads Library v30: Khavinson bioregulator doses corrected from 10–20 mg to the label and patent amounts (micrograms), Pinealon and Thymosin Beta-4 corrected. v2 kept.

## v2 (22 Oct 2026) at /protocol/v2/
- Walkthrough: four steps split by Aminos-style dividers (Step one to four) with a big centred question per step, so it no longer reads as one continuous page.
- Step one: role tags are red (palette #FF5050), filled red when picked; suggestions show 5 with "Show N more".
- Step two: each compound is one compact row (colour band, name, one-line summary). One editor open at a time, all tap-to-pick: dose chips from the reported range plus Other, how often, how long (reported cycle, Ongoing, Other), Starting fresh or Already on it (with optional since date). Done collapses it and opens the next one still to set.
- Orange blinker (same as Draw Line) on every row and question still needing a dose. Save stack stays locked until every dose is set, then blinks orange. Step three and four unlock after saving; changing anything later shows "Your stack changed · Save to update".
- Fix: dose no longer shows "not set" in the text when the field was only showing the reported dose as a hint. The dose is now picked or typed and confirmed.
- As needed (PT-141 and anything set to As needed) gets its own lane on the timeline and in the one-week view: dotted line, optional "up to N× a week", no fixed days, no start week.
- Optional start date puts real dates under each week on the timeline. "Already on it" items run from week one with a ◀ marker and are left out of the stagger.
- Stack check lines are one short sentence each, the reasoning sits behind "why ›".
- Results: timeline full width on laptop with check and blood work side by side under it; on phone the order is check, timeline, blood work. Timeline extends to include the last recheck.
- Paste it back tested three ways: full AI text, reopen link, and plain names ("bpc-157, klow and tesamorelin", which opens with doses to set). v1 codes and a v1 saved stack still open in v2.
- v1 kept at /protocol/v1/.

## v1 (22 Oct 2026) at /protocol/v1/
First build. Reads Library v28 data and Blood Work v8 lib, so it updates when those do.
- 1 · What you're dealing with: tap role tags from the 30-colour palette (18 common shown, "All 30" for the rest) or type in your own words. Lists what people most often report using for it, ranked by how tightly each compound is tied to the pick, then by popularity. Reference entries (Insulin, GLP-1, Glucagon, Exenatide, Amylin, Ubiquitin) are left out of suggestions.
- 2 · Your stack: add any of the 82 Library compounds or 4 blends (GLOW, KLOW, Wolverine, CJC no DAC + Ipamorelin; TB-500 in blends = frag 17–23). Each card shows the reported dose, frequency, cycle and half-life, plus your own dose, how often and weeks (pre-filled from the reported cycle). Reorder with arrows; order = start order. Links to Library, Dosage, Blood Work and Calculator (pre-filled).
- 3 · Stack check: doubles (same compound alone and inside a blend), same-lever groups (GH axis, GLP-1/amylin, melanocortin, copper, thymosin beta-4 family, Selank and Semax forms, HGH fragment), blood tests shared by 2+ compounds, thin data (no dose, animal or estimated doses), reference entries, all-at-once warning, big stack note.
- 4 · Timeline: weeks, months, and "one week" (a Mon–Sun layout once the full stack is running, with doses per day). "One new at a time" staggers starts every 1 or 2 weeks (on by default). Blood work markers: baseline before day one, recheck around week 6, then every ~12 weeks, and at the end.
- 5 · Blood work: one merged, deduped test list for the whole stack (count of compounds per test, direction arrows, cost tier), recheck frequency and red flags per compound, link to open the same stack in Blood Work's My plan.
- 6 · Take it with you: Save as PDF (a print sheet with stack table, timeline, check, blood work and a blank 10-row log), Copy for my AI (plain text ending in a reopen code), Copy link, and "Paste it back" (reads the text, the code, the link, or plain compound names).
- Saved in the visitor's browser only. Tracking events: protocol:add, role, search, example, stagger, pdf, copy-text, copy-link, import, open-link.
- Site: nav v8 adds Protocol after Calculator (v7 with Made kept at /nav/v7.js); Home v7 adds the Protocol box (v6 kept at /home/v6/).
- Nav v8 phone layout: two rows of four links under 560px, since eight in one row overflowed at 390px.
