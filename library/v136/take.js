/* Bare Signals Library v74 key takeaways (27 Oct 2026).
   Four slots per compound, shown on the card and at the top of the full page:
   what  - what it is, in one plain sentence
   legal - legal and approval status
   use   - what people actually want it for
   ev    - one honest evidence line, good and bad in the same breath
   Compounds not listed here fall back to a takeaway assembled from fields
   already on the card (otl, fn, status, tested-in), so nothing is invented.
   Authored in Bare Signals words from the research log. v73 kept unchanged. */
window.BS_TAKE={
"thymosin-alpha-1":{
  what:"An immune peptide pulled from the thymus, the gland where T cells are trained.",
  legal:"Not FDA-approved, but a real medicine elsewhere: Singapore registers it for hepatitis B and C, and Italy gives it alongside flu shots to people whose immune systems run weak.",
  use:"That flu-shot use is why it travels beyond hepatitis: people want fewer colds, and to bounce back faster when they do get sick.",
  ev:"Its best human result is a stronger vaccine response in older or immune-weak people. Hepatitis B data lean positive. In sepsis it fell flat: a 2025 trial of 1,089 patients saw no survival gain."
},
/* the three mixing waters: not compounds, so the last line is the honest limit
   rather than an evidence line, and its label changes with it */
"bacteriostatic-water":{
  what:"Sterile water with 0.9% benzyl alcohol in it, a preservative that stops bacteria growing between draws.",
  legal:"Sold as a mixing liquid for freeze-dried peptides. Not taken on its own.",
  use:"The default for most peptides that dissolve near neutral pH, and the one to use when a vial will be drawn from over days or weeks.",
  ev:"The label is clear on its limits: not for newborns, not for anyone allergic to benzyl alcohol, and not for peptides that need acid to dissolve.",
  evLab:"Watch out"
},
"acetic-acid-water":{
  what:"Sterile water with dilute acetic acid, usually around 0.6%, which brings the pH down to about 2.9.",
  legal:"Sold as a mixing liquid for freeze-dried peptides. Not taken on its own.",
  use:"For peptides that clump or gel in bacteriostatic water, AOD-9604 and HGH fragment 176-191 the usual two.",
  ev:"Most of these carry no preservative, so a vial is not meant for weeks of draws, and the acid stings more going in.",
  evLab:"Watch out"
},
"glycerin-acetic-acid-water":{
  what:"Dilute acetic acid water with glycerin added, a co-solvent used in formulation to keep sticky peptides from clumping.",
  legal:"Sold as a mixing liquid for freeze-dried peptides. Not taken on its own.",
  use:"The same peptides that need acid, where plain acid water still leaves clumping.",
  ev:"Neither the acid nor the glycerin percentage is printed on the label, so the exact strength is unverified. Check the certificate of analysis.",
  evLab:"Watch out"
}
};

/* v101 (19 Nov 2026): four prescription medicines added: metronidazole, doxycycline, tranexamic acid, dexketoprofen. */
Object.assign(window.BS_TAKE,{"metronidazole": {"what": "An antibiotic and anti-parasite pill that only activates inside microbes living without oxygen.", "legal": "Prescription medicine everywhere, FDA approved since 1963 and on the WHO essential list. Sold as Flagyl and many generics.", "use": "BV, trichomoniasis, pelvic infections (with doxycycline), dental abscesses, diverticulitis and gut parasites.", "ev": "Decades of trials. Cures most trich in 7 days and BV short term, but BV returns in about half within a year, and it lost its C. diff first place."}, "doxycycline": {"what": "A tetracycline antibiotic that stops bacteria building proteins and calms skin inflammation at low dose.", "legal": "Prescription medicine everywhere, FDA approved since 1967 and on the WHO essential list. CDC first choice for chlamydia and the doxy PEP pill.", "use": "Chlamydia, PID (with metronidazole), acne, rosacea, chest infections, Lyme disease, malaria prevention, STI prevention after sex.", "ev": "Strong trial record: 100% chlamydia cure in NEJM 2015; doxy PEP cut syphilis and chlamydia by over 70%. Gonorrhoea protection is only about half, and resistance is being watched."}, "tranexamic-acid": {"what": "A synthetic lysine look-alike that stops clots from being dissolved too early.", "legal": "Prescription medicine (pharmacist-sold in some countries), FDA approved for heavy periods (Lysteda) and as an injection; WHO essential medicine.", "use": "Heavy periods, nosebleeds, bleeding after dental work or surgery, trauma care, and off-label pills for melasma.", "ev": "Big trials: fewer bleeding deaths in trauma and after childbirth; more effective than NSAIDs for heavy periods. No benefit in gut bleeding, where high IV doses raised clots."}, "dexketoprofen": {"what": "An NSAID painkiller: the active half of ketoprofen, absorbed fast.", "legal": "Prescription medicine in Europe, the UK, Indonesia and much of Asia (Ketesse, Keral). Never approved in the US.", "use": "Short bursts of acute pain: period cramps, toothache, sprains, back pain, after surgery.", "ev": "Many randomised trials in acute pain: as strong as ibuprofen 400 mg at a lower dose and faster. No data for long-term use; stomach and kidney risks as for any NSAID."}});

/* v131 (27 Nov 2026): Adderall added as a prescription medicine (label doses only). */
Object.assign(window.BS_TAKE,{"adderall": {"what": "A mix of amphetamine salts that releases dopamine and noradrenaline in the brain. A stimulant pill, not a peptide.", "legal": "Prescription only, Schedule II in the US, with a boxed warning for misuse and addiction. Illegal in Indonesia with no exceptions.", "use": "ADHD in children and adults, and narcolepsy. Widely misused as a study or diet drug.", "ev": "Dozens of trials: the strongest ADHD medicine in adults on average. High doses raise psychosis risk, and long-term use is tied to high blood pressure."}});
