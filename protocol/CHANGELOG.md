# Protocol versions

/protocol/ always opens the newest version. Older versions stay live at their own path.

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
