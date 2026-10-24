# Draw Line — Research Question Log

A running to-do of questions the Quick calculator cannot answer yet. Each gap here is something that would make a dose range, timing note, or vial check more complete. Clear an item by adding the data to the library (`/library/v49/data.js`) or the vial maps in the protocol page, then re-run the extractor.

_Seeded 2026-10-24 from library v49 + protocol v23. Live user misses are also captured automatically — see Auto-capture below._

## How gaps get logged

The calculator logs three kinds of gap on its own, to `localStorage["bs-qlog"]` and (if the site tracker is on) to `bsTrack("draw_qlog")`:
- `unknown_compound` — a name typed (3+ letters) that matched nothing and had no suggestions.
- `no_vial_data` — a recognized compound with no common vial size on file, so the rare-vial check cannot run.
- `over_dose` — a dose that came out above one 100-unit syringe.

To read what real visitors hit, open the site and run in the console: `JSON.parse(localStorage.getItem("bs-qlog"))`.

## Open — no dose range parsed (13)

These show a reported line but no Low/High fill chips, because the dose string is a non-mcg/mg unit (IU, %, mg/kg, units) or a trial/undisclosed note. Decide if a per-injection mcg/mg range can be added.

- [ ] Oxytocin  [10–40 IU]
- [ ] Adipotide  [0.1–0.5 mg/kg]
- [ ] HCG  [500 IU (TRT); 500–4,000 IU (label)]
- [ ] HMG  [225 IU/day (IVF); 75 IU (men, off-label)]
- [ ] L-Carnitine  [50–200 mg/day (community); 10–20 mg/kg (label, dialysis)]
- [ ] GLOW  [10–15 units (70 mg in 3 mL)]
- [ ] KLOW  [10–15 units (80 mg in 3 mL)]
- [ ] MIC + B12  [1 mL (≈1 mg B12)]
- [ ] SLU-PP-332 + BAM-15 oral  [1 capsule (50 mg BAM-15, 250 mcg SLU-PP-332)]
- [ ] Bimagrumab  [10 or 30 mg/kg]
- [ ] Petrelintide  [Trial doses not disclosed in the sources checked (Phase 1b started at 0.6 and 1.2 mg)]
- [ ] Noopept  [10–30 mg/day]
- [ ] 9-Me-BC  [5–15 mg/day]

## Open — no common vial size (35)

Recognized compounds with no entry in STOCK or VIAL (protocol v23), so the rare-vial check stays silent for them. Add a common mg size where one is known.

- [ ] Methylene blue
- [ ] Somatropin (HGH)
- [ ] Carnosine
- [ ] MK-677
- [ ] Bromantane
- [ ] Glucagon
- [ ] Exenatide
- [ ] Amylin
- [ ] GHK (no Cu)
- [ ] Vesilute
- [ ] HCG
- [ ] HMG
- [ ] Orforglipron
- [ ] Vitamin B12
- [ ] MIC + B12
- [ ] NAD+ + MOTS-c + 5-Amino-1MQ
- [ ] Retatrutide + Cagrilintide
- [ ] Semax + Selank
- [ ] SLU-PP-332 + BAM-15 oral
- [ ] ATX-304
- [ ] Bimagrumab
- [ ] CBL-514
- [ ] Efocipegtrutide
- [ ] Liraglutide
- [ ] MariTide
- [ ] Tesofensine
- [ ] Brenipatide
- [ ] Petrelintide
- [ ] Ecnoglutide
- [ ] Tadalafil
- [ ] Modafinil
- [ ] Noopept
- [ ] Phenylpiracetam
- [ ] 9-Me-BC
- [ ] cGP

## Known limits

- Timing notes (before bed / morning / empty stomach) exist for only 14 of 120 compounds; the rest show dose + frequency alone. Source is free-text in the library, so more could be pulled if the notes are expanded.
- Common vial sizes cover 85 of 120 compounds. Distinct sizes on file: 1, 2, 3, 5, 10, 16, 20, 40, 48, 50, 70, 80, 600, 1000 mg.
- Rare-vial thresholds: flagged when the entered vial is below 1/2.5× or above 2.5× the common size; unknown compounds flag only outside 0.5 to 120 mg.
