/* pk.js v1 (6 Nov 2026): "What the body does with it" per compound. Four questions every peptide gets asked:
   absorbed, reaches blood, stays intact, broken down/cleared; plus why a short blood half-life is not a short effect, and the gaps.
   Only compounds with a real pharmacokinetic study get an entry; no filler for the rest. */
window.PK={
"bpc-157":{
 rows:[
  ["How fast it gets in","Peaks in blood 3 min after a muscle shot in rats, 6 to 9 min in dogs.","rat · dog · IM"],
  ["How much reaches the blood","About 14–19% of a muscle shot in rats, 45–51% in dogs. A threefold gap between two species, so nobody knows the human number.","rat · dog · IM"],
  ["How long it stays intact","Half-life under 30 min: 15 min in rats, 5 min in dogs (IV). The whole peptide can’t be found in blood 4 h after a dose.","rat · dog"],
  ["How it’s broken down and cleared","Cut into small fragments within about 10 min, then into single amino acids (mostly proline) the body reuses. What’s left goes out mainly in urine, some in bile.","rat · labelled"]
 ],
 why:"The peptide pieces moved into tissue and peaked there at 1 h, later than in blood. Kidney, liver, stomach wall, spleen and thymus held the most; brain and body fat the least. At 24 h kidney, liver and thymus still held more than blood (labelled fragments, not the whole peptide). How long the effect lasts has never been measured.",
 gap:"No numbers for Sub-Q, oral or nasal, and no human numbers at all. Sub-Q is how most people take it.",
 src:["He L, Feng D, Guo H, et al. Front Pharmacol 2022;13:1026182 (rats and beagle dogs)","https://doi.org/10.3389/fphar.2022.1026182"]
}
};

/* v131 (27 Nov 2026): Adderall added as a prescription medicine (label doses only). */
window.PK=window.PK||{};window.PK.adderall={"rows": [["How fast it gets in", "The tablet peaks in blood about 3 hours after a dose; XR about 7 hours, with its two bead types.", "label · humans"], ["How much reaches the blood", "Almost all of it: amphetamine is well absorbed by mouth. Acidic drinks and vitamin C lower absorption, antacids raise it.", "label · humans"], ["How long it stays", "Half-life about 10 hours for d-amphetamine and 13 for l-amphetamine in adults; a little shorter in children.", "label · humans"], ["How it's broken down and cleared", "Partly by liver enzymes (CYP2D6 among them), the rest leaves unchanged in urine: from 1% in alkaline urine to 75% in acidic urine.", "label · humans"]], "why": "The felt effect is shorter than the half-life: focus fades after 4 to 6 hours on the tablet as blood levels fall from their peak, but enough stays to disturb sleep. That gap is why a late dose costs a night.", "gap": "How much people differ in CYP2D6 speed matters is still argued, and there are almost no long-term studies of adult levels over years.", "src": ["Adderall and Adderall XR FDA labels (clinical pharmacology, humans)", "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/011522s045lbl.pdf"]};
