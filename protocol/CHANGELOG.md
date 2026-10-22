# Protocol versions

/protocol/ always opens the newest version. Older versions stay live at their own path.

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
