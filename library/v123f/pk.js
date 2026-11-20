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
