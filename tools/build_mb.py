#!/usr/bin/env python3
"""Build the Microbiome testing & adding strains Goal page (library/aims/microbiome/v1/).
Research: Microbiome Testing Research v1 + Engraftment Research v1 (22 Nov 2026).
Reuses the Antibiotics case page's CSS and player style."""
import os, json, re

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root (this script lives in tools/)
OUT = os.path.join(REPO, 'library/aims/microbiome/v1')
os.makedirs(OUT, exist_ok=True)

# pull the shared stylesheet straight out of the antibiotics page so the two match exactly
abx = open(os.path.join(REPO, 'library/goals/antibiotics/v1/index.html'), encoding='utf8').read()
CSS = abx[abx.find('<style>') + 7:abx.find('</style>')]

METHODS = [
 dict(k='16s', n='16S sequencing', res='Genus', px='Entry kits',
      t="Reads one short stretch of a single bacterial barcode gene. Cheap, everywhere, decades of reference data behind it. The limit is hard: short reads of one or two variable regions <b>cannot separate close species</b>, and even full-length reads need special handling to approach strain level.<sup><a href=\"#s1\">1</a></sup> Bacteria only, so fungi and viruses are invisible. Any “function” in the report is predicted from the names, not measured."),
 dict(k='shot', n='Shotgun sequencing', res='Species, sometimes strain', px='Mid and premium kits',
      t="Reads random fragments of everything in the sample. Gets species routinely, picks up fungi and viruses, and can read actual genes including antibiotic resistance genes. Strain-level calls are possible but only for abundant species at high read depth with specialist tools. Depth varies enormously between companies: in the comparison below it ran from under 20,000 reads to over 10 million, and <b>more reads did not mean more organisms found</b>.<sup><a href=\"#s2\">2</a></sup>"),
 dict(k='rna', n='RNA (activity) tests', res='Species plus activity', px='Activity kits',
      t="Reads which genes are switched on rather than which are present, which is genuinely the more interesting question. RNA degrades fast, and the main method paper behind the consumer version is written entirely by employees of the company selling it, describing stability only in several small studies.<sup><a href=\"#s3\">3</a></sup> No independent multi-lab validation was found."),
 dict(k='pcr', n='PCR panels', res='Only what is on the list', px='Practitioner panels',
      t="Counts copies of a fixed list of DNA targets. Fast and quantitative for the things on the list, and blind to everything else. Hospital versions for infectious diarrhoea are properly cleared and useful. The international consensus is explicit that multiplex PCR <b>is not microbiome testing</b> and is not a stand-in for it.<sup><a href=\"#s4\">4</a></sup> A PubMed search for validation of the commercial functional-medicine panels returned nothing."),
 dict(k='cult', n='Stool culture', res='Species, strain if typed', px='Hospital',
      t="Grows organisms on plates. Still the gold standard for named pathogens like <i>Salmonella</i>, <i>Shigella</i> and <i>Campylobacter</i>, and the only method that gives you antibiotic sensitivity. Most gut bacteria are anaerobes that will not grow this way, so it cannot profile a community, and the consensus says the same thing it says about PCR.<sup><a href=\"#s4\">4</a></sup>"),
 dict(k='breath', n='Breath tests', res='No organisms named', px='SIBO kits',
      t="Measures hydrogen and methane after a sugar drink: gas made by fermentation. Clinically real, with agreed cutoffs (hydrogen up 20 ppm by 90 minutes, methane 10 ppm).<sup><a href=\"#s5\">5</a></sup> It names no organism. Lactulose can reach the colon fast and read as a false positive; glucose is absorbed early and can miss the far end of the small intestine."),
 dict(k='calp', n='Calprotectin', res='Not a microbe test', px='Via a doctor',
      t="A protein from white blood cells, so it measures inflammation rather than bacteria. Genuinely useful as a rule-out: at 40 µg/g or below in someone with IBS-type symptoms, the chance of inflammatory bowel disease is 1% or less.<sup><a href=\"#s6\">6</a></sup> It does not tell IBS apart from healthy."),
 dict(k='zon', n='Zonulin ("leaky gut")', res='Does not work', px='Add-on',
      t="This one is worth naming plainly. When researchers put the commercial kits through mass spectrometry, they found the kits <b>were not detecting zonulin at all</b>: they were picking up haptoglobin and complement C3, different proteins entirely.<sup><a href=\"#s7\">7</a></sup> A result from one of these is not a measurement of your gut barrier."),
]

STICK = [
 dict(k='why', n='Why most do not stick', g='',
      t="A healthy adult gut is already full. Every nutrient, every patch of mucus, every bile-acid niche is held by a resident that arrived years ago and is tuned to your body. A swallowed probiotic walks into a town with no vacancies. It can pass through and trade for a few days, and then it is gone. Researchers call this <b>colonization resistance</b>, and it is the same force that keeps <i>C. difficile</i> out when your gut is intact."),
 dict(k='cond', n='The three conditions', g='',
      t="Read across every success and every failure in this field and the same three things decide it. <b>One: a vacancy</b>, made by antibiotics, bowel lavage, infancy, or a species you genuinely lack. <b>Two: an exclusive food or job</b> the residents cannot supply. <b>Three: repeated dosing over weeks</b>, not one capsule a day forever. Where all three hold, strains stick. Where none hold, which is a healthy adult with a shelf product, the honest expected outcome is transit."),
 dict(k='30', n='The 30% study', g='Human',
      t="The clearest adult example. A <i>B. longum</i> strain given by mouth persisted for <b>at least 6 months in 30% of people</b>, and who it stuck in was predictable beforehand from their baseline: those with little resident <i>B. longum</i> and missing the genes to use certain carbohydrates.<sup><a href=\"#s8\">8</a></sup> Read the rest carefully though. It persisted <b>without changing the resident community at all</b>. Engrafting and remodelling are two different claims, and this study supports only the first."),
 dict(k='baby', n='Babies, where it works', g='Human',
      t="The cleanest durable colonization on record is in infants. A <i>B. infantis</i> strain fed to breastfed babies for three weeks stayed raised <b>more than 30 days after feeding stopped</b>, with measurably more milk sugars consumed, more acetate and lactate, lower stool pH, and four-fold lower endotoxin in the high-bifidobacteria babies.<sup><a href=\"#s9\">9</a></sup> The authors credit the pairing of the organism with a food only it could use. An infant gut is an open niche with an exclusive food supply, which is exactly what an adult gut is not. Worth knowing: every author was the manufacturer or a collaborator."),
 dict(k='stool', n='Why your stool test cannot tell you', g='Human',
      t="When researchers checked colonization properly, with endoscopy and biopsies of the gut wall rather than stool, they found it was person-specific, gut-region-specific and strain-specific, and crucially that it was <b>indistinguishable from whether the probiotic showed up in stool</b>.<sup><a href=\"#s10\">10</a></sup> Stool is the exit pipe. Finding your probiotic in it proves it came out, not that it moved in."),
 dict(k='syn', n='Feeding the strain its own food', g='RCT',
      t="The direct test of the synbiotic idea, and it mostly failed. In a randomised trial, a human-derived strain reached far higher numbers than a commercial one, but pairing either with its own prebiotic fibre produced only a non-significant trend: <b>no synergy</b>. The authors' conclusion is the headline for this whole topic: where the strain came from mattered more than what you fed it.<sup><a href=\"#s11\">11</a></sup>"),
 dict(k='akk', n='The Akkermansia twist', g='RCT',
      t="Often cited as proof that adding a keystone species works, and it says close to the opposite. In a 32-completer pilot, the metabolic signal came from the <b>pasteurised</b>, that is <b>dead</b>, bacteria: insulin sensitivity up 28.6%.<sup><a href=\"#s12\">12</a></sup> Weight, fat mass and hip measurements did not reach significance. Dead cells cannot colonise anything, so this is not an engraftment story at all; it is a dead-bacterium-as-drug story, and a proof-of-concept one."),
 dict(k='fmt', n='FMT: when a whole community moves in', g='Meta',
      t="Transplanting an entire donor community does engraft, and the rules are the same ones. Across 226 donor and recipient sets in 8 diseases, engraftment was higher in people pre-treated with antibiotics, and <b>recipients with more donor engraftment were more likely to do well clinically</b>.<sup><a href=\"#s13\">13</a></sup> Across 14 trials, engraftment tracked how disturbed the recipient's gut was beforehand, and was boosted by antibiotic pre-treatment and bowel lavage.<sup><a href=\"#s14\">14</a></sup> Within a species you tend to end up with the donor's strain or your own, rarely a blend.<sup><a href=\"#s15\">15</a></sup>"),
 dict(k='works', n='Where FMT actually works', g='RCT',
      t="<b>Recurrent <i>C. diff</i>: properly.</b> 81% resolved after a single infusion against 31% on antibiotics alone, about two people treated per cure, in a trial stopped early for benefit.<sup><a href=\"#s16\">16</a></sup> <b>Ulcerative colitis: weakly.</b> Cochrane found it may increase remission, low-certainty, and maintenance is unknown.<sup><a href=\"#s17\">17</a></sup> <b>IBS: contested.</b> One trial reported 77 to 89% response against 23.6% placebo, far outside anything else in IBS, from one centre with one donor, and the paper itself notes two earlier blinded trials disagreed.<sup><a href=\"#s18\">18</a></sup> Treat a single unreplicated super-donor result as a hypothesis."),
 dict(k='null', n='Engraftment without benefit', g='RCT',
      t="This is the finding the industry does not advertise, and it is the most useful one here. In obesity, donor bacteria <b>engrafted and persisted for 12 weeks, and nothing metabolic happened</b>: no significant change in insulin sensitivity, lean mass or fat mass.<sup><a href=\"#s19\">19</a></sup> In 87 adolescents, a community shift held to 12 weeks and the trial still missed its primary endpoint; the metabolic-syndrome result everyone quotes is labelled post-hoc by its own authors.<sup><a href=\"#s20\">20</a></sup> “Did it colonise?” and “did it do anything?” are separate questions."),
 dict(k='fail', n='What the failures teach', g='',
      t="A gut product for ulcerative colitis showed 40% remission against 0% on placebo in 58 people. Scaled up and properly powered, it collapsed to roughly 10% against 10% and was abandoned.<sup><a href=\"#s21\">21</a></sup> The same platform worked for <i>C. diff</i> and failed for chronic inflammation, which is colonization resistance again: an infection leaves an empty niche, an inflamed gut does not. One of the two approved products is also worth reading closely, because its phase 2b <b>missed its primary endpoint</b> before a Bayesian phase 3 borrowed from it.<sup><a href=\"#s22\">22</a></sup>"),
 dict(k='safe', n='The safety floor', g='',
      t="Two patients developed drug-resistant <i>E. coli</i> bloodstream infections traced by sequencing to the <b>same screened donor</b>. One died. Both were immunocompromised.<sup><a href=\"#s23\">23</a></sup> Screening was and is imperfect. This is the reason transplanting a community is medicine and not a wellness practice, whatever is being sold."),
]

SRC = [
 ('s1', 'Johnson 2019, evaluation of 16S rRNA gene sequencing for species and strain-level microbiome analysis.', 'https://doi.org/10.1038/s41467-019-13036-1'),
 ('s2', 'NIST and University of Maryland, one homogenised stool sample sent as 21 kits to 7 direct-to-consumer companies. Published 2026; read as the bioRxiv preprint plus NIST and AGA write-ups, the final paper could not be opened.', 'https://doi.org/10.1101/2024.06.05.596628'),
 ('s3', 'Hatch 2019, the method paper behind a consumer RNA-based test, authored entirely by employees of the company selling it.', 'https://doi.org/10.1155/2019/1718741'),
 ('s4', 'Porcari 2025, international consensus statement on microbiome testing in clinical practice. 69 experts, 18 countries, Delphi method.', 'https://doi.org/10.1016/S2468-1253(24)00311-X'),
 ('s5', 'Rezaie 2017, North American consensus on hydrogen and methane breath testing.', 'https://doi.org/10.1038/ajg.2017.46'),
 ('s6', 'Menees 2015, meta-analysis: calprotectin and CRP to rule out inflammatory bowel disease in people with IBS symptoms.', 'https://doi.org/10.1038/ajg.2015.6'),
 ('s7', 'Ajamian 2019, commercial zonulin ELISA kits do not detect zonulin: mass spectrometry identified haptoglobin and complement C3 instead.', 'https://doi.org/10.1371/journal.pone.0210728'),
 ('s8', 'Maldonado-Gómez 2016, stable engraftment of Bifidobacterium longum AH1206 in the human gut, predicted by baseline features.', 'https://doi.org/10.1016/j.chom.2016.09.001'),
 ('s9', 'Frese 2017, persistence of supplemented Bifidobacterium longum subsp. infantis EVC001 in breastfed infants. 34 fed, 32 not.', 'https://doi.org/10.1128/mSphere.00501-17'),
 ('s10', 'Zmora 2018, personalized gut mucosal colonization resistance to empiric probiotics, measured by endoscopy rather than stool.', 'https://doi.org/10.1016/j.cell.2018.08.041'),
 ('s11', 'Krumbeck 2018, randomised trial of a probiotic strain with and without its own prebiotic fibre: no synergy, and the human-derived strain outperformed the commercial one.', 'https://doi.org/10.1186/s40168-018-0494-4'),
 ('s12', 'Depommier 2019, pasteurised Akkermansia muciniphila in overweight insulin-resistant volunteers. 32 completers, proof of concept.', 'https://doi.org/10.1038/s41591-019-0495-2'),
 ('s13', 'Ianiro 2022, meta-analysis of donor strain engraftment after faecal transplant across 226 donor and recipient sets in 8 diseases.', 'https://doi.org/10.1038/s41591-022-01964-3'),
 ('s14', 'Podlesny 2022, identification of clinical and ecological determinants of strain engraftment after faecal transplant. 14 trials.', 'https://doi.org/10.1016/j.xcrm.2022.100711'),
 ('s15', 'Smillie 2018, strain tracking reveals the determinants of bacterial engraftment in the human gut after faecal transplant.', 'https://doi.org/10.1016/j.chom.2018.01.003'),
 ('s16', 'van Nood 2013, duodenal infusion of donor faeces for recurrent C. difficile. 81% after one infusion vs 31%.', 'https://doi.org/10.1056/NEJMoa1205037'),
 ('s17', 'Imdad 2023, Cochrane review: faecal transplant for inflammatory bowel disease. 12 studies, 550 participants, low certainty.', 'https://doi.org/10.1002/14651858.CD012774.pub3'),
 ('s18', 'El-Salhy 2020, faecal transplant for IBS: 165 people, one donor, response 76.9% and 89.1% by dose vs 23.6% placebo.', 'https://doi.org/10.1136/gutjnl-2019-319630'),
 ('s19', 'Yu 2020, FMT-TRIM: faecal transplant capsules in adults with obesity and insulin resistance. Engraftment to 12 weeks, no metabolic effect.', 'https://doi.org/10.1371/journal.pmed.1003051'),
 ('s20', 'Leong 2020, the Gut Bugs trial: faecal transplant in 87 adolescents with obesity. Primary endpoint missed; the metabolic-syndrome finding is post-hoc.', 'https://doi.org/10.1001/jamanetworkopen.2020.30415'),
 ('s21', 'Phase 1b of an oral microbiome drug for ulcerative colitis: 40% remission vs 0% in 58 people. Its phase 2b then missed its primary endpoint at roughly 10% vs 10% and the programme was stopped; no peer-reviewed publication of that phase 2b was found.', 'https://doi.org/10.1053/j.gastro.2020.07.048'),
 ('s22', 'Khanna 2022, PUNCH CD3: success 70.6% vs 57.5%. Its phase 2b was negative in the intention-to-treat population before this Bayesian phase 3.', 'https://doi.org/10.1007/s40265-022-01797-x'),
 ('s23', 'DeFilipp 2019, drug-resistant E. coli bacteraemia transmitted by faecal transplant. Two cases from one screened donor, one death.', 'https://doi.org/10.1056/NEJMoa1910437'),
 ('s24', 'Vandeputte 2021, quantitative microbiome profiling of 713 daily stool samples from 20 women over 6 weeks.', 'https://doi.org/10.1038/s41467-021-27098-7'),
 ('s25', 'Sinha 2017, the Microbiome Quality Control project: blinded samples across 15 labs and 9 analysis pipelines.', 'https://doi.org/10.1038/nbt.3981'),
 ('s26', 'Van Hul 2024, what defines a healthy gut microbiome? "Dysbiosis" is used without an agreed definition.', 'https://doi.org/10.1136/gutjnl-2024-333378'),
 ('s27', 'Gupta 2020, the Gut Microbiome Health Index: 73.7% balanced accuracy across 4,347 metagenomes.', 'https://doi.org/10.1038/s41467-020-18476-8'),
 ('s28', 'Chang 2024, GMWI2: about 80% cross-validated and 75% in external groups, across 8,069 metagenomes.', 'https://doi.org/10.1038/s41467-024-51651-9'),
 ('s29', 'Berry 2020, PREDICT 1: the gut microbiome explained 7.1% of the variation in blood fat responses to food and 6.0% of glucose responses.', 'https://doi.org/10.1038/s41591-020-0934-0'),
 ('s30', 'Bermingham 2024, a randomised trial of a personalised nutrition programme using microbiome, glucose and blood fat data. 347 adults, 18 weeks.', 'https://doi.org/10.1038/s41591-024-02951-6'),
 ('s31', 'Popp 2022, a randomised trial of a personalised glucose-response diet for weight loss in 204 adults. Null.', 'https://doi.org/10.1001/jamanetworkopen.2022.33760'),
 ('s32', 'Ben-Yacov 2021, an algorithm-based personalised diet versus Mediterranean diet in 225 adults with prediabetes.', 'https://doi.org/10.2337/dc21-0162'),
 ('s33', 'Faith 2013, the long-term stability of the human gut microbiota: most strains persist for years.', 'https://doi.org/10.1126/science.1237439'),
 ('s34', 'Palleja 2018, recovery of the gut microbiota of healthy adults after antibiotic exposure. 12 men, 180 days.', 'https://doi.org/10.1038/s41564-018-0257-9'),
 ('s35', 'Suez 2018, post-antibiotic gut mucosal microbiome reconstitution is impaired by probiotics and improved by autologous faecal transplant.', 'https://doi.org/10.1016/j.cell.2018.08.047'),
 ('s36', 'Cohen 2020, Lactin-V (live L. crispatus) after antibiotic treatment for bacterial vaginosis: recurrence 30% vs 45%, strain still present in 79% at 12 weeks.', 'https://doi.org/10.1056/NEJMoa1915254'),
 ('s37', 'Colom 2021, survival and germination of Bacillus spores in the human small intestine. 11 ileostomy participants, manufacturer-funded.', 'https://doi.org/10.3389/fmicb.2021.715863'),
 ('s38', 'EXL01, first-in-human study of a Faecalibacterium prausnitzii strain in 8 adults with Crohn’s disease. Composition largely unchanged.', 'https://doi.org/10.1038/s41467-026-72375-y'),
]

FAQ = [
 ("Can a test tell me which strains I have?", "Not reliably, and this is the single most misunderstood thing about these kits. 16S tests stop at genus, which is the level of “<i>Lactobacillus</i>” rather than “<i>L. rhamnosus</i> GG”.<sup><a href=\"#s1\">1</a></sup> Shotgun tests reach species, and strain only for abundant organisms at high depth. No consumer test is validated at strain level. This matters because probiotic evidence is strain-specific: knowing you carry a species tells you nothing about whether you carry the strain that was studied."),
 ("Would two companies give me the same answer?", "Mostly not. One stool sample was homogenised and sent as 21 kits to 7 companies. They reported 1,208 different organisms between them, and <b>only 3 genera appeared in every single result</b>. For 17 of 18 common genera, the variation caused by the testing method was as large as or larger than real differences between people. <i>C. difficile</i> was reported present by 3 companies and absent by 4.<sup><a href=\"#s2\">2</a></sup>"),
 ("Would the same company give the same answer twice?", "Sometimes. In that study, agreement between a company's own three replicates of the identical sample ranged from <b>6% to 98%</b> of genera. One company called the same sample healthy twice and unhealthy once.<sup><a href=\"#s2\">2</a></sup>"),
 ("Is one sample enough?", "It is one day, and your gut moves more than you would think. Across 713 daily samples from 20 women, for <b>78% of genera the day-to-day swing within one person was bigger than the differences between people</b>, with shifts up to a hundredfold.<sup><a href=\"#s24\">24</a></sup> Stool moisture drove most of it."),
 ("Is there a normal range?", "No agreed one. The international consensus says strict healthy reference ranges are <b>not supported</b> (90% agreement), that dysbiosis indices are not yet supported (90%), and that the Firmicutes to Bacteroidetes ratio should not be reported at all (86%).<sup><a href=\"#s4\">4</a></sup> Researchers who work on this say the word “dysbiosis” is used without a definition, and that it is hard even to agree who the healthy reference population is.<sup><a href=\"#s26\">26</a></sup>"),
 ("What does a diversity score actually mean?", "On average, across populations, higher diversity goes with better health. It is not a diagnosis, it moves day to day, and it cannot tell you what to do. The best research indices get about 74 to 80% accuracy at separating “some disease” from “none”,<sup><a href=\"#s27\">27</a>,<a href=\"#s28\">28</a></sup> which means roughly <b>1 in 4 people are put in the wrong group</b>, and they do not say which disease."),
 ("Can a test tell me what to eat?", "A little, and less than the marketing implies. In 1,002 adults, the microbiome explained <b>7.1%</b> of the variation in how people's blood fats responded to food and <b>6.0%</b> for glucose: a real but minor input next to the meal itself and your genes.<sup><a href=\"#s29\">29</a></sup> The best trial of a programme combining microbiome, glucose and blood fat data in 347 people cut triglycerides by 0.13 mmol/L, with LDL unchanged.<sup><a href=\"#s30\">30</a></sup> A weight-loss trial of a similar personalised approach in 204 people was null.<sup><a href=\"#s31\">31</a></sup> And in all of these, the coaching and app cannot be separated from the test."),
 ("Should I buy the probiotics the report recommends?", "No trial has shown that picking probiotics from a stool test beats no probiotic or a standard choice: searched for, not found. The consensus says testing labs <b>should not give treatment advice</b> (98% agreement),<sup><a href=\"#s4\">4</a></sup> and the seven-company study noted some companies recommending their own products off the back of the report.<sup><a href=\"#s2\">2</a></sup>"),
 ("Will a test show whether my probiotic took?", "No, and this is a genuine finding rather than a limitation of cheap kits. When colonization was measured properly with gut-wall biopsies, it could not be told apart by whether the probiotic appeared in stool.<sup><a href=\"#s10\">10</a></sup>"),
 ("Should I test before and after antibiotics?", "No guideline supports it, and the practical problems stack up: your day-to-day noise can be bigger than the effect, labs disagree with each other, there is no agreed target to recover to, and the result would not change what anyone does. Recovery mostly happens over about 1.5 months regardless.<sup><a href=\"#s34\">34</a></sup> The test that <i>is</i> worth having after antibiotics is a <i>C. diff</i> test if you develop diarrhoea."),
 ("So can I add a strain at all?", "Yes, sometimes, and it is predictable rather than random. One strain persisted 6 months in 30% of people, and who it stuck in could be read off their baseline.<sup><a href=\"#s8\">8</a></sup> It needs a vacancy, a food or job the residents cannot cover, and weeks of repeated dosing. A healthy adult taking a shelf capsule has none of those."),
 ("Do spore probiotics survive better?", "They survive, which is a different claim from colonising. In 11 people with an ileostomy, spores appeared in the small intestine within 3 hours and had germinated by 6 to 7 hours.<sup><a href=\"#s37\">37</a></sup> That is an 8-hour window in a gut with no colon, in a manufacturer-funded study. No data was found on whether they persist afterwards."),
 ("Is my microbiome permanent?", "Largely. Tracking people for up to five years found most strains stay put for what looks like decades, and family members share strains while unrelated people do not.<sup><a href=\"#s33\">33</a></sup> That stability is why adding to it is hard, and also why it recovers from disturbance."),
 ("When is stool testing genuinely useful?", "When a doctor orders it for a question it can answer: a <i>C. diff</i> test for diarrhoea after antibiotics, culture or a cleared PCR panel for infectious diarrhoea, ova and parasites, calprotectin to rule out inflammatory bowel disease, breath testing for SIBO or lactose problems, and donor screening before a transplant. Red flags (blood, weight loss, night symptoms, a change in bowel habit over 45) need a doctor, not a kit."),
 ("Is any of this regulated?", "Not as diagnostics. No microbiome test is approved as a clinical diagnostic in the US, and these products sit between medical and wellness categories. The consensus called for lab accreditation and regulation with 100% agreement, and for transparency about how scarce the evidence is, also 100%.<sup><a href=\"#s4\">4</a></sup>"),
]

GLOSS = [
 ('Genus / species / strain', 'Three zoom levels. <i>Lactobacillus</i> is a genus, <i>L. rhamnosus</i> a species, <i>L. rhamnosus</i> GG a strain. Two strains of one species can differ by hundreds of genes: one harmless, one a toxin maker.'),
 ('16S', 'Sequencing one short barcode gene shared by all bacteria. Cheap, reaches genus.'),
 ('Shotgun', 'Sequencing random fragments of all the DNA present. Reaches species and reads actual genes.'),
 ('Engraftment', 'A newcomer actually settling in and staying, rather than passing through.'),
 ('Colonization resistance', 'A full gut keeping newcomers out by leaving them nowhere to live and nothing to eat.'),
 ('Alpha / beta diversity', 'Alpha: how varied your own sample is. Beta: how different yours is from someone else’s.'),
 ('Dysbiosis', 'A disturbed microbiome. Widely used, with no agreed definition or cutoff.'),
 ('Autochthonous', 'Native to the host. A strain originally taken from a human gut, rather than a dairy or lab strain.'),
 ('FMT', 'Faecal microbiota transplant: moving a whole stool community from a donor, or from your own banked sample.'),
 ('Post-hoc', 'An analysis decided after the results were seen. Much weaker than the question the trial set out to answer.'),
]

H = []
A = H.append
A('''<!doctype html>
<!-- Microbiome testing & adding strains (Goals) v1, 22 Nov 2026. New page. Draft: built from an automatic research sweep (Microbiome Testing Research, Engraftment Research, 22 Nov 2026), not yet checked line by line by the editor. Built on the Antibiotics case page's stylesheet so the two read as one system. No brand names: method types only, per the research rules. -->
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow">
<title>Microbiome testing &amp; adding strains · Bare Signals</title>
<meta name="description" content="How gut microbiome tests work, what they can and cannot tell you, how much two labs disagree, and whether a new bacterial strain can actually be added to your gut and made to stay.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>''')
A(CSS)
A('''
/* zoom ladder */
.zoom{display:grid;gap:0;margin:0 0 8px}
.zr{display:grid;grid-template-columns:auto 1fr;gap:3px 10px;padding:9px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent);align-items:start}
.zr:first-child{border-top:0;padding-top:0}
.zr>.zl{font:600 calc(10px*var(--k))/1.2 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:4px 6px;white-space:nowrap}
.zr>.zt{font-size:calc(12.5px*var(--k));line-height:1.45;min-width:0}
.zr>.zb{grid-column:1/-1;font-size:calc(12.5px*var(--k));line-height:1.45;color:var(--ink-soft)}
@media (min-width:760px){.zr{grid-template-columns:120px minmax(0,1fr) minmax(0,1fr);gap:10px}.zr>.zb{grid-column:3;grid-row:1}}
/* method rows */
.mr{padding:9px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}
.mr:first-child{border-top:0;padding-top:2px}
.mrh{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:0 0 3px}
.mrh b{font:700 calc(15px*var(--k))/1.2 var(--display)}
.mrh .rr{font:600 calc(9px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:3px 5px;background:#DDF4F5}
.mrh .px{font:500 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft)}
.mr p{margin:0;font-size:calc(12.5px*var(--k));line-height:1.45}
.mr.no .rr{background:#FCDADA;color:#C02626}
''')
A('''</style>
</head><body>
<div class="w">
<p class="crumb"><a href="/library/">Library</a> · <a href="/library/aims/">Goals</a> · Microbiome testing</p>
<div class="hd">
 <div>
  <h1>Microbiome testing &amp; adding strains</h1>
  <p class="aka">What a gut test can tell you, what it cannot, and whether a new strain ever stays</p>
 </div>
 <svg class="hico" viewBox="0 0 84 84" aria-hidden="true">
  <rect x="2" y="2" width="80" height="80" rx="4" fill="#FFFFF4"/>
  <circle cx="34" cy="34" r="20" fill="none" stroke="#3E4A80" stroke-width="3.2"/>
  <path d="M48 48 L72 72" stroke="#3E4A80" stroke-width="5" stroke-linecap="round"/>
  <g><rect x="22" y="26" width="11" height="5" rx="2.5" fill="#AACC96"/><rect x="36" y="34" width="11" height="5" rx="2.5" fill="#E1DE62"/><ellipse cx="27" cy="42" rx="5.4" ry="3.8" fill="#99ACFF"/><circle cx="42" cy="24" r="3.8" fill="#87CFC5"/></g>
  <rect x="20" y="33" width="11" height="5" rx="2.5" fill="none" stroke="#6B76A8" stroke-width="1.2" stroke-dasharray="2.2 1.8"/>
 </svg>
 <div class="meta">
  <span class="draft">Draft</span>
  <span class="mt">Version 1</span><span class="mt">22 Nov 2026</span><span class="mt">38 sources</span>
 </div>
</div>
<div class="stripe"><i style="background:#87CFC5;flex:4"></i><i style="background:#99ACFF;flex:3"></i><i style="background:#AACC96;flex:2"></i><i style="background:#B493E8;flex:1"></i></div>
<div class="tags">
 <span class="rtg" style="background:color-mix(in srgb,#87CFC5 45%,#FFFFF4)">Testing</span>
 <span class="rtg" style="background:color-mix(in srgb,#99ACFF 45%,#FFFFF4)">Strains</span>
 <span class="rtg" style="background:color-mix(in srgb,#AACC96 45%,#FFFFF4)">Probiotics</span>
 <span class="rtg" style="background:color-mix(in srgb,#B493E8 40%,#FFFFF4)">FMT</span>
</div>

<div class="kt">
 <p><b>What it is.</b> Two questions people ask together: how do I find out what is living in my gut, and can I put something new in there. They have different answers, and both are more interesting than the kits suggest.</p>
 <p><b>What studies found.</b> One stool sample split between 7 companies produced 1,208 organisms, with only 3 genera agreeing across all of them. No consumer test is validated at strain level. Adding a strain does work, in about 30% of people for the best-studied one, and only where there is a vacancy, an exclusive food, and weeks of dosing.</p>
 <p><b>What people report.</b> Nothing yet. This first pass collected studies only; first-hand reports come next, and the page says so rather than filling the gap.</p>
 <p><b>Watch out.</b> Engrafting and helping are separate things. The clearest trials got bacteria to settle in and measured no benefit at all, and the one famous metabolic result came from <i>dead</i> bacteria.</p>
</div>

<div class="jump">
 <a href="#zoom">Genus to strain</a><a href="#methods">The methods</a><a href="#agree">Do labs agree</a><a href="#healthy">A healthy one</a><a href="#stick">Does it stick</a><a href="#diet">Test-guided diets</a><a href="#useful">When to test</a><a href="#faq">Questions</a>
</div>

<h2 class="part" id="p0"><span>1</span> What a test is looking at</h2>
<div class="grid two">
<section class="sec" id="zoom">
<h2 class="st">Genus, species, strain</h2>
<div class="box bl">
 <p>Almost every argument about these tests comes down to one thing: how far down this ladder the method can actually see. Most stop two rungs above where the interesting answer lives.</p>
 <div class="zoom">
  <div class="zr"><span class="zl" style="background:#DCE9FF">Genus</span><span class="zt"><i>Lactobacillus</i></span><span class="zb">A family of related species. This is where a 16S test reliably stops.</span></div>
  <div class="zr"><span class="zl" style="background:#D6E8CB">Species</span><span class="zt"><i>Lactobacillus rhamnosus</i></span><span class="zb">Shotgun sequencing reaches here routinely.</span></div>
  <div class="zr"><span class="zl" style="background:color-mix(in srgb,#E1DE62 55%,#FFFFF4)">Strain</span><span class="zt"><i>L. rhamnosus</i> GG</span><span class="zb">The level every probiotic study is actually about. Shotgun can sometimes reach it for abundant organisms at high read depth. No consumer test is validated here.</span></div>
 </div>
 <p>Why it matters: two strains of one species can differ by hundreds of genes. One strain of <i>E. coli</i> lives in you harmlessly and another causes outbreaks. So a report saying you have <i>Bifidobacterium longum</i> does not tell you whether you have the strain from any study or any product.</p>
 <p>Strains themselves are stable and real. Tracking people for up to five years with cultured isolates and whole-genome sequencing found most strains persist for what looks like decades, and that family members share strains while unrelated people do not.<sup><a href="#s33">33</a></sup> But that took culturing hundreds of isolates in a research lab, not a kit through the post.</p>
</div>
</section>
<section class="sec" id="methods">
<h2 class="st">Every method, and what it can see</h2>
<div class="box">
''')
for m in METHODS:
    cls = ' no' if m['k'] == 'zon' else ''
    A(f'<div class="mr{cls}"><p class="mrh"><b>{m["n"]}</b><span class="rr">{m["res"]}</span><span class="px">{m["px"]}</span></p><p>{m["t"]}</p></div>')
A('''</div>
<p class="hint">The one-line truth under all of it: nearly every consumer test reads DNA or RNA from <b>one stool sample</b>. That tells you what was passing through the end of your gut on one day, at whatever resolution the method allows.</p>
</section>
</div>

<h2 class="part" id="p1"><span>2</span> How much to trust a result</h2>
<div class="grid two">
<div class="col">
<section class="sec" id="agree">
<h2 class="st">One sample, seven companies</h2>
<p class="hint">This is the study to know about. A single donor's stool was homogenised into a reference material so that every aliquot was genuinely identical, then sent out as 21 kits to 7 direct-to-consumer companies, who were not told until afterwards.<sup><a href="#s2">2</a></sup></p>
<div class="nums">
 <div class="nm"><b>1,208</b><span>different organisms reported between them, from the same stool</span></div>
 <div class="nm"><b>3</b><span>genera that appeared in every single result</span></div>
 <div class="nm"><b>17 of 18</b><span>common genera where the method mattered as much as the person</span></div>
 <div class="nm"><b>6 to 98%</b><span>agreement between one company's own three repeats</span></div>
</div>
<div class="box rd">
 <p>Read the third number again, because it is the one that undermines the product. For 17 of 18 common genera, <b>the variation caused by the testing method was equal to or bigger than real biological variation between people</b>. If the instrument moves the needle as much as the thing being measured, the reading is not telling you about you.</p>
 <p>Then the details. <i>C. difficile</i> was reported present by 3 companies and absent by 4, from the same stool. One company rated two of its own replicates healthy and the third unhealthy. One replicate had more than half its reads unidentified and still produced a consumer report. Read depth ran from under 20,000 to over 10 million, and more reads did not mean more organisms found: one company reported over 600 species from 20 to 30 thousand reads, another 95 to 99 species from over 10 million. The companies' "healthy ranges" generally disagreed with each other.</p>
</div>
</section>
</div>
<div class="col">
<section class="sec" id="noise">
<h2 class="st">Even done perfectly, one sample is one day</h2>
<div class="box y">
 <p>Set the consumer kits aside, because research labs have the same problem in milder form. Blinded samples sent to <b>15 labs</b> and run through <b>9 analysis pipelines</b> showed most of the variation came from the sample type, then from how the DNA was extracted, then from handling and software.<sup><a href="#s25">25</a></sup> Which step you used changes the answer.</p>
 <p>And your own gut moves. Across <b>713 daily samples from 20 women over 6 weeks</b>, for 78% of genera the day-to-day swing within one person was larger than the differences between people, with shifts up to a hundredfold.<sup><a href="#s24">24</a></sup> Stool moisture drove most of it. The authors' recommendation was repeated sampling, which is the opposite of how these kits are sold.</p>
 <p>There is also a sampling problem nobody can solve by spending more: stool is the exit pipe. It reflects the far end of the colon, correlates only partly with the gut wall,<sup><a href="#s10">10</a></sup> and barely sees the small intestine, which is where SIBO happens.</p>
</div>
</section>
<section class="sec" id="healthy">
<h2 class="st">What counts as a healthy microbiome</h2>
<div class="box pu">
 <p>Nobody has agreed. Researchers in the field wrote in 2024 that "dysbiosis" is used without precision or definition, and that it is hard even to define who the healthy reference population would be.<sup><a href="#s26">26</a></sup></p>
 <p>The international consensus, 69 experts across 18 countries, went further and said what reports should <b>stop</b> doing: do not report the Firmicutes to Bacteroidetes ratio (86% agreement), dysbiosis indices are not yet supported (90%), and strict healthy reference ranges are not supported (90%).<sup><a href="#s4">4</a></sup> Those three things are the backbone of most consumer reports.</p>
 <p>The best research scores do better than nothing and not by much: around 74% and 80% balanced accuracy at separating people with some disease from people with none.<sup><a href="#s27">27</a>,<a href="#s28">28</a></sup> About 1 in 4 people land in the wrong group, and the score does not say which disease. That is a group-level research tool, not a verdict on a person.</p>
</div>
</section>
</div>
</div>

<h2 class="part" id="p2"><span>3</span> Can you add a strain, and does it stay</h2>
<div class="grid">
<section class="sec" id="stick">
<h2 class="st">Twelve findings that answer it</h2>
<p class="hint">Tap through these in order: they build into one answer. Short version up front, because it deserves saying plainly: yes, sometimes, rarely, and it is not random. Whether a strain sticks is decided mostly by the gut you already have, not by the dose on the label.</p>
<div class="awrap">
<div class="acol">
<div class="hchips" role="group" aria-label="Findings">
''')
for i, s in enumerate(STICK):
    A(f'<button type="button" class="hch{" on" if i==0 else ""}" data-h="{s["k"]}">{s["n"]}</button>')
A('''</div>
</div>
<div class="hpanel" id="hpanel" aria-live="polite"></div>
</div>
<div class="box gr">
 <p><b>The pattern, in one place.</b> Every success in this field has three things, and every failure is missing at least one.</p>
 <ul>
  <li><b>A vacancy.</b> Antibiotics, bowel lavage, infancy, or a species you genuinely lack. Engraftment after a faecal transplant tracks how disturbed the recipient's gut was beforehand, and is boosted by clearing it first.<sup><a href="#s14">14</a></sup></li>
  <li><b>A food or a job the residents cannot cover.</b> The infant strain came with milk sugars only it could digest.<sup><a href="#s9">9</a></sup> The approved <i>C. diff</i> product works by restoring bile-acid chemistry, a job the missing bacteria used to do.<sup><a href="#s22">22</a></sup></li>
  <li><b>Weeks of repeated dosing.</b> The vaginal product that worked dosed for 11 weeks after an antibiotic cleared the field, and was still detectable in 79% of women at 12 weeks.<sup><a href="#s36">36</a></sup></li>
 </ul>
 <p>A healthy adult swallowing a shelf capsule has none of the three. The honest expected outcome is transit: it passes through, there may be a brief individual blip at the gut wall, and a month later nothing is detectable.</p>
</div>
</section>
</div>

<div class="grid two">
<section class="sec" id="apart">
<h2 class="st">The finding that matters most</h2>
<div class="box or">
 <p><b>Engraftment and benefit come apart.</b> If you take one thing from this page, take this, because almost all marketing in the category quietly assumes the opposite.</p>
 <p>In obesity, donor bacteria engrafted and persisted for 12 weeks and <b>nothing metabolic happened</b>.<sup><a href="#s19">19</a></sup> In 87 adolescents, the community shift held to 12 weeks and the trial missed its primary endpoint.<sup><a href="#s20">20</a></sup> The famous <i>Akkermansia</i> result came from <b>dead</b> bacteria, which cannot colonise anything.<sup><a href="#s12">12</a></sup> And the best-documented adult engraftment, 6 months in 30% of people, changed the resident community not at all.<sup><a href="#s8">8</a></sup></p>
 <p>So there are two questions, and they need answering separately: did it move in, and did it do anything. A product that can show the first has not shown the second.</p>
</div>
</section>
<section class="sec" id="diet">
<h2 class="st">Can a test tell you what to eat</h2>
<div class="box tl">
 <p>This is where the evidence is strongest, and it is still modest. In 1,002 adults, the gut microbiome explained <b>7.1%</b> of the variation in blood fat responses to meals and <b>6.0%</b> for glucose. The meal's own makeup explained 3.6% and 15.4%, and genes 9.5% for glucose.<sup><a href="#s29">29</a></sup> The microbiome is a real but minor term in that equation.</p>
 <p>The best trial: 347 adults, 18 weeks, a programme using food data, glucose and fat responses, microbiome and history, against standard dietary advice. Triglycerides fell 0.13 mmol/L more than control. LDL did not move. Weight, waist, HbA1c and diet quality improved as secondary measures; blood pressure, insulin, glucose and ApoB did not.<sup><a href="#s30">30</a></sup> The control group also got less contact, so the app and coaching cannot be separated from the test.</p>
 <p>Against it: a 204-person randomised trial of a personalised glucose-response diet for weight loss was <b>null</b>, 3.26% against 4.31% for a plain low-fat diet.<sup><a href="#s31">31</a></sup> An earlier prediabetes trial of an algorithm diet beat a Mediterranean diet on time above target glucose, with an HbA1c difference of about 0.08 percentage points.<sup><a href="#s32">32</a></sup></p>
 <p>For <b>test-guided probiotics</b> specifically, searched for and not found: no randomised trial shows that picking a probiotic from a stool test beats not doing so.</p>
</div>
</section>
</div>

<h2 class="part" id="p3"><span>4</span> When testing is actually worth it</h2>
<div class="grid two">
<section class="sec" id="useful">
<h2 class="st">The tests that answer a real question</h2>
<div class="box gr">
 <p>These are ordinary medicine, ordered by a doctor, and the consensus is clear that they are a different thing from "microbiome testing".<sup><a href="#s4">4</a></sup></p>
 <ul>
  <li><b><i>C. difficile</i> test</b> for diarrhoea during or after antibiotics. The one that matters most on the <a href="/library/goals/antibiotics/">antibiotics page</a>.</li>
  <li><b>Stool culture or a cleared PCR panel</b> for infectious diarrhoea, which also gives antibiotic sensitivity.</li>
  <li><b>Ova and parasites</b> where the history suggests it.</li>
  <li><b>Calprotectin</b> to rule out inflammatory bowel disease: at 40 µg/g or below, the chance of IBD is 1% or less.<sup><a href="#s6">6</a></sup></li>
  <li><b>Breath testing</b> for SIBO or lactose and fructose problems, with the standard cutoffs.<sup><a href="#s5">5</a></sup></li>
  <li><b>Donor screening</b> before a faecal transplant, and the death below is why.</li>
 </ul>
 <p>Red flags that need a doctor rather than a kit: blood in stool, unexplained weight loss, symptoms that wake you at night, or a change in bowel habit over the age of 45.</p>
</div>
</section>
<section class="sec" id="consensus">
<h2 class="st">What the experts actually agreed</h2>
<div class="box bl">
 <p>69 experts from 18 countries, Delphi method, agreement counted at 80% or above.<sup><a href="#s4">4</a></sup></p>
 <ul>
  <li>Not enough evidence to recommend routine microbiome testing (90%).</li>
  <li>Patients ordering tests themselves without a clinical reason is discouraged (80%).</li>
  <li>Testing over time may help in specific clinical situations (80%).</li>
  <li>16S and shotgun are both acceptable for profiling (98%); culture and multiplex PCR are not microbiome tests (90%).</li>
  <li>Do not report the Firmicutes to Bacteroidetes ratio (86%). Dysbiosis indices not supported (90%). Strict healthy ranges not supported (90%).</li>
  <li><b>Testing providers should not give treatment advice (98%)</b>, and management changes only through the referring doctor (100%).</li>
  <li>Do not stop medicines or change your diet before testing unless your doctor says so (100%).</li>
  <li>Labs should be accredited and regulated (100%), and should be transparent about how scarce the evidence is (100%).</li>
 </ul>
</div>
</section>
</div>

<div class="grid two">
<section class="sec" id="risk">
<h2 class="st rdt">Warnings</h2>
<div class="box rd">
 <p><b>Transplanting a community has killed someone.</b> Two patients developed drug-resistant <i>E. coli</i> bloodstream infections traced by genomic sequencing to the same screened donor, and one of them died. Both were immunocompromised.<sup><a href="#s23">23</a></sup> Screening was and remains imperfect. Nothing resembling this belongs outside medical care.</p>
 <p><b>Do not act on a consumer report alone.</b> Given that the same stool can come back healthy and unhealthy from one company, treating a report as a reason to start a restrictive diet, a supplement stack, or to stop a medicine is acting on noise. The consensus says explicitly not to change diet or medicines around testing without your doctor.<sup><a href="#s4">4</a></sup></p>
 <p><b>Live products are not risk-free for everyone.</b> If your immune system is suppressed, or you have a central line, live bacteria and live yeast are a conversation with your doctor rather than a purchase.</p>
 <p><b>A normal-looking report does not rule anything out.</b> No microbiome test can confirm or exclude IBS, coeliac disease, inflammatory bowel disease or cancer.</p>
</div>
</section>
<section class="sec" id="gaps">
<h2 class="st">What this page does not have yet</h2>
<div class="box">
 <p>Marked Draft: an automatic research sweep the editor has not yet checked line by line.</p>
 <p><b>No first-hand reports</b> in this pass. That section comes next.</p>
 <p><b>No brand names.</b> Method types only, deliberately. The seven-company study did not name its companies either.</p>
 <p><b>No prices.</b> Only vendor marketing pages came back for those, so nothing is quoted rather than quoting something unchecked.</p>
 <p><b>Sources that could not be opened:</b> the final published version of the seven-company paper (its preprint and the institutional write-ups were used instead) and the full text of the consensus statement on one host (an open repository copy was used).</p>
 <p><b>Being chased next:</b> the per-group numbers behind the permissive-versus-resistant split in the biopsy study, a traced human persistence trial for <i>L. reuteri</i>, the per-condition engraftment percentages from the transplant meta-analyses, whether the failed ulcerative colitis phase 2b was ever published at all, and dedicated searches for probiotic harms, which this pass did not run.</p>
</div>
</section>
</div>

<h2 class="part" id="p4"><span>5</span> Usual questions</h2>
<div class="grid two">
<div class="col">
<section class="sec" id="faq">
<h2 class="st">What people ask</h2>
<div class="box">
''')
for i, (q, a) in enumerate(FAQ):
    A(f'<details class="fq"{" open" if i < 2 else ""}><summary>{q}</summary><div class="bd"><p>{a}</p></div></details>')
A('''</div>
</section>
</div>
<div class="col">
<section class="sec" id="glossary">
<h2 class="st">Words on this page</h2>
<div class="box">
<div class="evleg gw"><dl>
''')
for t, d in GLOSS:
    A(f'<div><dt>{t}</dt><dd>{d}</dd></div>')
A('''</dl></div>
</div>
</section>
<section class="sec" id="links">
<h2 class="st">Read next</h2>
<div class="box tl">
 <p><a href="/library/goals/antibiotics/">Antibiotics &amp; your gut</a> — what a course does to this community, how fast it comes back, and the one thing shown to restore it quickly.</p>
 <p><a href="/library/goals/gut/">Gut (IBS, colitis, ulcers, reflux)</a> — the conditions themselves, and what has been tried for them.</p>
 <p><a href="/library/aims/">All goals</a> · <a href="/library/goals/">All cases</a></p>
</div>
</section>
</div>
</div>

<div class="grid">
''')
A('<section class="sec" id="sources">\n<details class="srcs" id="srcd"><summary><h2 class="st" style="margin:0">Sources</h2><span class="cnt">%d · tap to open</span></summary>\n<div class="box">\n<ol class="fn">' % len(SRC))
for sid, txt, url in SRC:
    A(f'<li id="{sid}">{txt} <a href="{url}" target="_blank" rel="noopener">link</a></li>')
A('''</ol>
</div>
</details>
</section>
<section class="sec" id="method">
<div class="box method">
 <p><b>How this page was made.</b> Studies were traced to PubMed, Cochrane and primary records, read from the abstracts or full texts and written up in our words, on 22 November 2026. Searches were run for failures and null results as well as positive ones, which is where the null weight-loss trial, the abandoned colitis programme and the engraftment-without-benefit findings came from. Two studies named in the original brief could not be found and may not exist as described; they were dropped rather than cited. Marked Draft: not yet checked line by line by the editor. No brand names, no prices, and no doses. Not medical advice.</p>
</div>
</section>
</div>
</div>
''')
A('<script id="hinfo" type="application/json">' + json.dumps({s['k']: s for s in STICK}) + '</script>\n')
A(r'''<script>
(function(){
 var HI=JSON.parse(document.getElementById('hinfo').textContent);
 var hp=document.getElementById('hpanel'), hb=[].slice.call(document.querySelectorAll('.hch'));
 function showH(k){
  var h=HI[k];
  hp.innerHTML='<p class="hh"><b>'+h.n+'</b>'+(h.g?'<span class="hg g-'+h.g.toLowerCase()+'">'+h.g+'</span>':'')+'</p><p>'+h.t+'</p>';
  hb.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-h')===k); });
 }
 hb.forEach(function(b){ b.addEventListener('click',function(){ showH(b.getAttribute('data-h')); }); });
 showH(hb[0].getAttribute('data-h'));
 var d=document.getElementById('srcd');
 if(innerWidth>=760){ d.open=true; document.querySelectorAll('details.fq').forEach(function(x,i){ x.open=i<4; }); }
 function go(){ var h=location.hash; if(/^#s\d+$/.test(h)){ d.open=true; var t=document.querySelector(h); if(t) t.scrollIntoView(); } }
 addEventListener('hashchange',go); go();
 document.addEventListener('click',function(e){ var a=e.target.closest('a[href^="#s"]'); if(a) d.open=true; },true);
})();
</script>
<script src="/nav.js" defer></script>
<script>addEventListener('bs-text',function(e){document.documentElement.style.setProperty('--k',e.detail.k)})</script>
</body></html>
''')

open(os.path.join(OUT, 'index.html'), 'w', encoding='utf8').write(''.join(H))
open(os.path.join(REPO, 'library/aims/microbiome/redirect-stub.html'), 'w', encoding='utf8').write(
 '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">'
 '<title>Microbiome testing</title><script>location.replace("/library/aims/microbiome/v1/"+location.hash)</script>'
 '<meta http-equiv="refresh" content="0;url=v1/">\n')
print('wrote', OUT, os.path.getsize(os.path.join(OUT, 'index.html')), 'bytes')
