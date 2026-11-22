#!/usr/bin/env python3
"""Build the Antibiotics & your gut Case page (library/goals/antibiotics/v1/).
Research: /home/claude/research/Antibiotics Damage Research v1.md + Replenish Research v1.md (22 Nov 2026).
Animation: gut-wall cross-section, 5 phases + play cycle, built in the Hair page's player style."""
import os, random, json

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root (this script lives in tools/)
OUT = os.path.join(REPO, 'library/goals/antibiotics/v2')
os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- microbe field
# Families: but=butyrate makers, bif=Bifidobacterium, bac=Bacteroides, oth=other
# commensals, blm=blooms (Enterobacteriaceae, Enterococcus), yst=yeast
FAM = {
    'but': dict(c='#AACC96', n='Butyrate makers', shape='rod'),
    'bif': dict(c='#E1DE62', n='Bifidobacterium', shape='rod'),
    'bac': dict(c='#99ACFF', n='Bacteroides', shape='oval'),
    'oth': dict(c='#87CFC5', n='Other residents', shape='round'),
    'blm': dict(c='#FF5050', n='Blooms', shape='rod'),
    'yst': dict(c='#FF99D8', n='Yeast', shape='round'),
    'lost': dict(c='#AACC96', n='The nine that did not return', shape='rod'),
}
MAX = dict(but=12, bif=8, bac=16, oth=14, blm=14, yst=3, lost=9)

rnd = random.Random(20261122)
mic = []
for fam, n in MAX.items():
    pts = []
    for i in range(n):
        # spread across the lumen; keep clear of the right-hand label column
        x = rnd.uniform(14, 268)
        y = rnd.uniform(16, 132)
        pts.append((x, y))
    # order so that showing the first k of a family still looks spread out
    pts.sort(key=lambda p: (p[0] // 64, rnd.random()))
    for i, (x, y) in enumerate(pts):
        col = FAM[fam]['c']
        if fam == 'lost':
            col = '#AACC96' if i % 2 == 0 else '#E1DE62'
        mic.append(dict(f=fam, x=round(x, 1), y=round(y, 1), i=i, c=col,
                        r=round(rnd.uniform(-40, 40), 0),
                        s=round(rnd.uniform(.85, 1.15), 2)))

PHASES = [
    dict(k='full', ty='Day 0', th='A full house',
         n=dict(but=12, bif=8, bac=16, oth=14, blm=2, yst=0, lost=9),
         mucus=1.0, but=6, res=1, ghosts=0,
         step='1 of 5 · Day 0, before the course'),
    dict(k='drop', ty='Days 1 to 4', th='The drop',
         n=dict(but=4, bif=2, bac=7, oth=6, blm=4, yst=0, lost=3),
         mucus=.78, but=2, res=3, ghosts=0,
         step='2 of 5 · Days 1 to 4, on the drug'),
    dict(k='gap', ty='Days 3 to 10', th='The gap, and who fills it',
         n=dict(but=2, bif=1, bac=4, oth=4, blm=14, yst=3, lost=0),
         mucus=.45, but=0, res=8, ghosts=0,
         step='3 of 5 · Days 3 to 10, the low point'),
    dict(k='back', ty='Weeks 2 to 8', th='The rebound',
         n=dict(but=10, bif=6, bac=14, oth=12, blm=4, yst=1, lost=1),
         mucus=.9, but=4, res=5, ghosts=8,
         step='4 of 5 · Weeks 2 to 8, coming back'),
    dict(k='after', ty='6 months', th='Close, but not the same',
         n=dict(but=12, bif=8, bac=15, oth=13, blm=2, yst=0, lost=0),
         mucus=1.0, but=6, res=3, ghosts=9,
         step='5 of 5 · 6 months on, a new normal'),
]

PINFO = {
 'full': "<p><b>Day 0: a full house.</b> About 38 trillion bacteria live in an adult, almost all of them in the colon, and that is roughly the same as the number of human cells rather than the old ten-to-one claim.<sup><a href=\"#s1\">1</a></sup> Every scrap of food, mucus and wall space is already taken by a resident that got there first. That fullness is itself a defence, called colonization resistance: there is no vacant job for an invader like <i>C. difficile</i> or a resistant <i>E. coli</i>.</p><p>The green rods ferment the fibre you eat into butyrate, the main fuel of your colon lining cells. The arrows into the wall are that fuel arriving.</p>",
 'drop': "<p><b>Days 1 to 4: the drop.</b> Diversity falls within three to four days of the first dose. In three people tracked daily through two ciprofloxacin courses, about a third of all bacterial types shifted, and the drop came that fast every time.<sup><a href=\"#s2\">2</a>,<a href=\"#s3\">3</a></sup> <i>Bifidobacterium</i> and the butyrate makers go first, which is why the yellow and green thin out before anything else.</p><p>Nothing about this feels like much. In those studies people said their gut felt normal the whole way through.<sup><a href=\"#s2\">2</a></sup></p>",
 'gap': "<p><b>Days 3 to 10: the gap, and who fills it.</b> This is the low point, and the part worth understanding. Clearing the residents does not leave an empty gut, it leaves an opening. What grows into it is the group that tolerates the drug and grows fast: <i>Enterobacteriaceae</i> (<i>E. coli</i>, <i>Klebsiella</i>, <i>Enterobacter</i>), <i>Enterococcus faecalis</i>, and sometimes yeast.<sup><a href=\"#s4\">4</a></sup></p><p>Three things go wrong at once. Butyrate drops, so the lining loses its fuel supply. The mucus coat thins. And the bacteria that turn the liver's bile acids into the forms that block <i>C. difficile</i> spores from sprouting are gone: after broad antibiotics those secondary bile acids fell about a thousandfold.<sup><a href=\"#s5\">5</a></sup> That is the real reason antibiotics cause <i>C. diff</i>, rather than the infection simply being caught.</p>",
 'back': "<p><b>Weeks 2 to 8: the rebound.</b> Most of it comes back on its own, and faster than people expect. In a trial of four common drugs, richness was back to baseline by <b>day 19</b> for levofloxacin and cefpodoxime. Azithromycin was the slow one: still low until <b>day 65</b>.<sup><a href=\"#s6\">6</a></sup> Even after a four-day hospital cocktail of three last-resort drugs, composition was near baseline within about <b>1.5 months</b>.<sup><a href=\"#s4\">4</a></sup></p><p>Nothing was done to those people to make this happen. Time and ordinary eating did it.</p>",
 'after': "<p><b>6 months on: close, but not the same.</b> This is the honest ending, and it is neither of the two stories usually told. In the cocktail study, <b>9 species that every single person carried at the start were still undetectable in most of them at day 180</b>.<sup><a href=\"#s4\">4</a></sup> The dashed outlines are those gaps.</p><p>In the ciprofloxacin study all three people ended up in a stable state that was <i>different</i> from where they began.<sup><a href=\"#s3\">3</a></sup> Not worse in any way they could feel. Different. The resistance genes your gut carries also stay raised for months, which matters for future infections rather than for you.<sup><a href=\"#s7\">7</a></sup></p><p>So: a course does not ruin your gut, and it does not leave it exactly as it found it.</p>",
}

HELP = [
 dict(k='sb', n='S. boulardii', hi='lumen', g='Likely',
      t="A probiotic <b>yeast</b>, so antibacterial drugs do not touch it: it survives the course your bacteria do not. Across 21 trials in 4,780 people, antibiotic diarrhoea fell from <b>18.7% to 8.5%</b>, which is one case prevented for every 10 people treated.<sup><a href=\"#s8\">8</a></sup> For <i>C. diff</i> it only helped in children, not adults. It prevents a symptom. It does not put the lost bacteria back."),
 dict(k='pro', n='Probiotics', hi='lumen', g='Likely for diarrhoea',
      t="In children, antibiotic diarrhoea fell from <b>19% to 8%</b> across 33 trials, one case prevented per 9 treated, and per 6 at 5 billion CFU a day or more.<sup><a href=\"#s9\">9</a></sup> For <i>C. diff</i>, 4.0% down to 1.5%, but that is 42 people treated per case prevented, and the benefit only appeared where baseline risk was above 5%.<sup><a href=\"#s10\">10</a></sup> <b>Timing has evidence:</b> started within 2 days of the first dose, risk ratio 0.32; started later, 0.70 and not significant.<sup><a href=\"#s11\">11</a></sup> And the largest well-run trial, 2,941 inpatients over 65, found nothing at all: 10.8% versus 10.4%.<sup><a href=\"#s12\">12</a></sup>"),
 dict(k='fib', n='Fibre', hi='but', g='Plausible',
      t="The residents that survived are fermenters. Fibre is their food, and what they make from it is the butyrate your lining runs on. In mice carrying human gut bacteria, a fibre-poor diet made the collapse worse and the recovery slower.<sup><a href=\"#s13\">13</a></sup> In people the direct evidence is one 12-person pilot: a prebiotic fibre taken during and after amoxicillin raised butyrate significantly afterwards.<sup><a href=\"#s14\">14</a></sup> Good mechanism, thin human proof. No trial of inulin, resistant starch or guar gum after a course exists."),
 dict(k='fer', n='Fermented food', hi='comm', g='Plausible',
      t="The one thing with a proper randomised trial showing diversity actually rising. Over 17 weeks in healthy adults, a high fermented-food diet steadily raised microbiome diversity and lowered <b>19 inflammatory proteins</b> including IL-6, while the high-fibre arm held diversity flat.<sup><a href=\"#s15\">15</a></sup> Bigger servings, bigger effect. The catch: 18 people per arm, and it has never been tested after antibiotics. Kefir specifically failed to prevent antibiotic diarrhoea in children.<sup><a href=\"#s16\">16</a></sup>"),
 dict(k='afmt', n='Your own banked stool', hi='comm', g='Likely, not available',
      t="The only thing shown to restore the gut quickly rather than prevent a symptom. Stool banked before the course and returned afterwards brought the native community back <b>within days</b> instead of months.<sup><a href=\"#s17\">17</a></sup> In stem-cell transplant patients, an RCT of banked own stool restored both diversity and the pre-antibiotic composition.<sup><a href=\"#s18\">18</a></sup> It is research and specialist care only, not something you can buy."),
 dict(k='fmt', n='FMT and the approved drugs', hi='bile', g='Proven, for C. diff only',
      t="For <i>recurrent C. diff</i>, this works properly. Donor stool: resolution 81% after one infusion versus 31% on antibiotics alone, about two people treated per cure.<sup><a href=\"#s19\">19</a></sup> Two approved products now exist: one cut recurrence from <b>39.8% to 12.4%</b>, the other raised success from 57.5% to 70.6%.<sup><a href=\"#s20\">20</a>,<a href=\"#s21\">21</a></sup> Note how the second one works: not by repopulating the census, but by restoring the bile-acid chemistry that stops spores germinating. None of this is for an ordinary course in a healthy person."),
 dict(k='non', n='What has nothing behind it', hi='none', g='Unproven',
      t="No human trial after antibiotics exists for butyrate or tributyrin supplements, polyphenols, postbiotics, <i>Akkermansia</i>, lactoferrin or colostrum. Zinc carnosine and glutamine have small trials in <i>other</i> kinds of lining damage (painkiller injury, after a gut infection), not this one.<sup><a href=\"#s22\">22</a>,<a href=\"#s23\">23</a></sup> That is not the same as knowing they fail. It means nobody has looked."),
 dict(k='pep', n='Peptides', hi='none', g='Unproven',
      t="Searched honestly, and the answer is nothing. A PubMed search for BPC-157 and gut microbiota returns <b>zero results</b>.<sup><a href=\"#s24\">24</a></sup> BPC-157's gut work is decades of rodent studies on ulcers and lining injury from one research group; all three of its published human papers come from a single clinician at a US clinic that sells it, none of them about the gut.<sup><a href=\"#s25\">25</a></sup> KPV calmed colitis in mice, with no human data.<sup><a href=\"#s26\">26</a></sup> Larazotide, built to seal the gut lining, failed its main trials and its phase 3 was stopped in 2022.<sup><a href=\"#s27\">27</a></sup> This page is about the microbiome, and on the microbiome peptides have no human evidence either way."),
]

# ---------------------------------------------------------------- sources
SRC = [
 ('s1', 'Sender 2016, revised estimates for the number of human and bacterial cells in the body. About 3.8x10^13 bacteria vs 3.0x10^13 human cells.', 'https://doi.org/10.1371/journal.pbio.1002533'),
 ('s2', 'Dethlefsen 2008, the pervasive effects of an antibiotic on the human gut microbiota, 3 adults on ciprofloxacin, 6 months.', 'https://doi.org/10.1371/journal.pbio.0060280'),
 ('s3', 'Dethlefsen &amp; Relman 2011, incomplete recovery and individualized responses to repeated ciprofloxacin.', 'https://doi.org/10.1073/pnas.1000087107'),
 ('s4', 'Palleja 2018, recovery of gut microbiota of healthy adults after antibiotic exposure. 12 men, meropenem + gentamicin + vancomycin, 180 days.', 'https://doi.org/10.1038/s41564-018-0257-9'),
 ('s5', 'Hagan 2019, antibiotics-driven gut microbiome perturbation alters immunity to vaccines. Secondary bile acids down about 1,000-fold.', 'https://doi.org/10.1016/j.cell.2019.08.010'),
 ('s6', 'Anthony 2022, acute and persistent effects of commonly used antibiotics on the gut microbiome and resistome. 20 adults, 4 regimens.', 'https://doi.org/10.1016/j.celrep.2022.110649'),
 ('s7', 'Zaura 2015, same-day antibiotic effects on oral and gut microbiome. 66 adults, randomised, 12 months.', 'https://doi.org/10.1128/mBio.01693-15'),
 ('s8', 'Szajewska 2015, meta-analysis: Saccharomyces boulardii for preventing antibiotic-associated diarrhoea. 21 RCTs, 4,780 people.', 'https://doi.org/10.1111/apt.13344'),
 ('s9', 'Guo 2019, Cochrane review: probiotics for preventing antibiotic-associated diarrhoea in children. 33 RCTs, 6,352 children.', 'https://doi.org/10.1002/14651858.CD004827.pub5'),
 ('s10', 'Goldenberg 2017, Cochrane review: probiotics for preventing C. difficile diarrhoea. 31 RCTs, 8,672 people.', 'https://doi.org/10.1002/14651858.CD006095.pub4'),
 ('s11', 'Shen 2017, timely use of probiotics and the risk of C. difficile infection. Meta-regression, 19 studies, 6,261 adults.', 'https://doi.org/10.1053/j.gastro.2017.02.003'),
 ('s12', 'Allen 2013, the PLACIDE trial: multistrain probiotic in 2,941 inpatients aged 65 and over. Null.', 'https://doi.org/10.1016/S0140-6736(13)61218-0'),
 ('s13', 'Ng 2019, recovery of the gut microbiota after antibiotics depends on host diet and environmental reservoirs. Mice with human microbiota.', 'https://doi.org/10.1016/j.chom.2019.10.011'),
 ('s14', 'Ladirat 2014, galacto-oligosaccharides during amoxicillin treatment. 12 healthy adults.', 'https://doi.org/10.1017/S0007114514001135'),
 ('s15', 'Wastyk 2021, gut-microbiota-targeted diets modulate human immune status. 36 healthy adults, 17 weeks, fermented food vs high fibre.', 'https://doi.org/10.1016/j.cell.2021.06.019'),
 ('s16', 'Merenstein 2009, the MILK trial: kefir for preventing antibiotic-associated diarrhoea in children. Null.', 'https://doi.org/10.1001/archpediatrics.2009.119'),
 ('s17', 'Suez 2018, post-antibiotic gut mucosal microbiome reconstitution is impaired by probiotics and improved by autologous FMT.', 'https://doi.org/10.1016/j.cell.2018.08.047'),
 ('s18', 'Taur 2018, reconstitution of the gut microbiota of antibiotic-treated patients by autologous faecal microbiota transplant. RCT, 25 analysed.', 'https://doi.org/10.1126/scitranslmed.aap9489'),
 ('s19', 'van Nood 2013, duodenal infusion of donor faeces for recurrent C. difficile. RCT stopped early, 81% vs 31%.', 'https://doi.org/10.1056/NEJMoa1205037'),
 ('s20', 'Feuerstadt 2022, ECOSPOR III: oral purified firmicutes spores for recurrent C. difficile. Recurrence 12% vs 40%.', 'https://doi.org/10.1056/NEJMoa2106516'),
 ('s21', 'Khanna 2022, PUNCH CD3: rectal microbiota live-jslm for recurrent C. difficile. Success 70.6% vs 57.5%.', 'https://doi.org/10.1007/s40265-022-01797-x'),
 ('s22', 'Mahmood 2007, zinc carnosine and gut integrity. 10 volunteers, painkiller-induced permeability model.', 'https://doi.org/10.1136/gut.2006.099929'),
 ('s23', 'Zhou 2019, glutamine in post-infectious IBS with raised permeability. 106 completers.', 'https://doi.org/10.1136/gutjnl-2017-315136'),
 ('s24', 'PubMed search, "BPC 157 gut microbiota", run 22 Nov 2026: 0 results.', 'https://pubmed.ncbi.nlm.nih.gov/?term=BPC+157+gut+microbiota'),
 ('s25', 'The three published human BPC-157 papers, all from one clinician at a private US clinic: knee pain survey of 16 (2021), 12 women with interstitial cystitis (2024), intravenous safety pilot of 2 (2025). None concern the gut.', 'https://pubmed.ncbi.nlm.nih.gov/34324435/'),
 ('s26', 'Dalmasso 2008, the tripeptide KPV reduces colitis in mice via the PepT1 transporter.', 'https://doi.org/10.1053/j.gastro.2007.10.026'),
 ('s27', 'Meta-analysis of 4 larazotide RCTs in 626 coeliac patients: no change in gut permeability. Phase 3 discontinued in 2022.', 'https://doi.org/10.1016/j.clinre.2021.101782'),
 ('s28', 'Jernberg 2007, long-term ecological impacts of clindamycin: Bacteroides composition not recovered and resistance genes raised at 2 years.', 'https://doi.org/10.1038/ismej.2007.3'),
 ('s29', 'Brown 2013, meta-analysis: antibiotics and the risk of community-associated C. difficile. Clindamycin OR 16.80.', 'https://doi.org/10.1128/AAC.02176-12'),
 ('s30', 'Deshpande 2013, meta-analysis: community-associated C. difficile and antibiotics. 8 studies, 30,184 people. Clindamycin OR 20.43.', 'https://doi.org/10.1093/jac/dkt129'),
 ('s31', 'Slimings 2014, meta-analysis: antibiotics and hospital-acquired C. difficile. 14 studies, 15,938 people.', 'https://doi.org/10.1093/jac/dkt477'),
 ('s32', 'Elvers 2020, systematic review: antibiotic-induced changes in the human gut microbiota for common antibiotics used in primary care. 31 studies.', 'https://doi.org/10.1136/bmjopen-2019-035677'),
 ('s33', 'Stewardson 2015, collateral damage from oral ciprofloxacin versus nitrofurantoin in outpatients with urinary infection.', 'https://doi.org/10.1016/j.cmi.2014.11.016'),
 ('s34', 'Sewunet 2024, gut microbiome effects of amoxicillin-clavulanate versus tebipenem. 30 adults, 180 days. Sponsor-funded.', 'https://doi.org/10.1016/S2666-5247(23)00360-9'),
 ('s35', 'Raymond 2016, the initial state of the human gut microbiome determines its reshaping by antibiotics. 18 adults on cefprozil.', 'https://doi.org/10.1038/ismej.2015.148'),
 ('s36', 'Baldanzi 2026, antibiotic use and the gut microbiome in about 15,000 Swedish adults, linked to the national prescription register. Read as press release and preprint; final paper not opened.', 'https://doi.org/10.1038/s41591-026-04284-y'),
 ('s37', 'Vrieze 2014, oral vancomycin reduces gut microbial diversity and lowers insulin sensitivity in obese men in 7 days; amoxicillin did not.', 'https://doi.org/10.1016/j.jhep.2013.11.034'),
 ('s38', 'Ayele 2025, moxifloxacin versus oral vancomycin: microbiome and bile acid effects in healthy adults.', 'https://doi.org/10.1093/infdis/jiaf512'),
 ('s39', 'Faye 2023, antibiotic use as a risk factor for inflammatory bowel disease. Denmark, 6.1 million people, 52,898 cases.', 'https://doi.org/10.1136/gutjnl-2022-327845'),
 ('s40', 'Zhang 2019, oral antibiotic use and risk of colorectal cancer. UK, 28,980 cases. Colon cancer up, rectal cancer slightly down.', 'https://doi.org/10.1136/gutjnl-2019-318593'),
 ('s41', 'Rasmussen 2018, antibiotic exposure in early life and childhood overweight. 527,504 children. One course not significant.', 'https://pubmed.ncbi.nlm.nih.gov/29359849/'),
 ('s42', 'Cao 2018, meta-analysis of 50 observational studies: proton pump inhibitors and C. difficile, OR 1.26.', 'https://pubmed.ncbi.nlm.nih.gov/28842261/'),
 ('s43', 'Floria 2025, meta-analysis of 8 randomised trials, 29,880 people: no significant increase in C. difficile with proton pump inhibitors.', 'https://doi.org/10.1080/19490976.2025.2562341'),
 ('s44', 'Su 2020, AGA clinical practice guidelines on the role of probiotics in gastrointestinal disorders.', 'https://doi.org/10.1053/j.gastro.2020.05.059'),
 ('s45', 'Eliás 2023, meta-analysis: probiotics during antibiotics made no difference to gut microbiome diversity.', 'https://doi.org/10.1186/s12916-023-02961-0'),
 ('s46', 'Montassier 2021, probiotics after antibiotics were associated with expansion of antibiotic resistance genes in the gut mucosa.', 'https://doi.org/10.1038/s41564-021-00920-0'),
 ('s47', 'McFarland 2008, antibiotic-associated diarrhoea: epidemiology, trends and treatment. Baseline rate 5 to 35%.', 'https://doi.org/10.2217/17460913.3.5.563'),
 ('s48', 'CDC, about C. difficile infection: risk factors and symptoms.', 'https://www.cdc.gov/c-diff/about/'),
 ('s49', 'Gallo 2025, low-dose minocycline 40 mg for 16 weeks: no detectable stool microbiome change versus placebo. 57 people, industry-linked.', 'https://doi.org/10.36849/JDD.9245'),
 ('s50', 'DeFilipp 2019, drug-resistant E. coli bacteraemia transmitted by faecal microbiota transplant. Two cases from one screened donor, one death.', 'https://doi.org/10.1056/NEJMoa1910437'),
 ('s51', 'Cohen 2020, Lactin-V (vaginal L. crispatus) after antibiotic treatment for bacterial vaginosis. Recurrence 30% vs 45%.', 'https://doi.org/10.1056/NEJMoa1915254'),
 ('s52', 'Mehta 2022, long-term antibiotic use in midlife and later cognitive scores.', 'https://pubmed.ncbi.nlm.nih.gov/35320274/'),
 ('s53', 'Lurie 2015, antibiotic exposure and the risk of depression and anxiety. UK nested case-control.', 'https://doi.org/10.4088/JCP.15m09961'),
]

CLASSES = [
 ('Clindamycin', 'Hardest on record', "<i>Bacteroides</i> never got back to its original mix in <b>2 years</b>, and resistance genes stayed raised that whole time.<sup><a href=\"#s28\">28</a></sup> Diversity down up to 4 months.<sup><a href=\"#s7\">7</a></sup>", '16.8 and 20.4', 'bad'),
 ('Ciprofloxacin', 'Strong, slow', "About a third of bacterial types shifted; recovery began a week after stopping but stayed incomplete, and all three people ended in a new stable state.<sup><a href=\"#s2\">2</a>,<a href=\"#s3\">3</a></sup> Diversity reduced up to 12 months.<sup><a href=\"#s7\">7</a></sup>", '5.5 and 5.7', 'bad'),
 ('Oral vancomycin', 'Strong, stays in the gut', "Cut diversity, raised <i>Proteobacteria</i>, cut the bile acids that block <i>C. diff</i> spores, and lowered insulin sensitivity in 7 days.<sup><a href=\"#s37\">37</a>,<a href=\"#s38\">38</a></sup>", 'used to treat it', 'bad'),
 ('Azithromycin', 'Moderate, slowest rebound', "The one drug in a 4-arm trial where richness was still low at <b>day 65</b>, against day 19 for the others.<sup><a href=\"#s6\">6</a></sup>", '2.7 and 2.6', ''),
 ('Cephalosporins', 'Moderate to strong', "Reshapes predictably; people who started with lower diversity got blooms of <i>Enterobacter cloacae</i>.<sup><a href=\"#s35\">35</a></sup> Third generation is the strongest of the group.", '5.7 and 4.5', ''),
 ('Amoxicillin-clavulanate', 'Moderate, short', "Richness, <i>Bifidobacterium</i> and <i>Lactobacillus</i> down during the 10 days, then <b>no difference from baseline</b> from day 14 out to 180.<sup><a href=\"#s34\">34</a></sup> Sponsor-funded.", '1.5 (hospital)', ''),
 ('Amoxicillin', 'Mild on diversity', "Barely changes diversity<sup><a href=\"#s32\">32</a>,<a href=\"#s37\">37</a></sup> yet raised the <b>most</b> resistance genes of the four drugs tested.<sup><a href=\"#s7\">7</a></sup> Gentle and gentle are not the same thing.", '2.7 and 3.3', ''),
 ('Doxycycline, minocycline', 'Mild', "Short-term <i>Bifidobacterium</i> dip.<sup><a href=\"#s32\">32</a></sup> Low-dose minocycline for 16 weeks showed <b>no detectable stool change</b> versus placebo.<sup><a href=\"#s49\">49</a></sup>", '0.92 and 0.91 · no rise', 'good'),
 ('Levofloxacin, moxifloxacin', 'Milder than cipro', "Back to baseline richness by day 19, and levofloxacin did not change the resistance gene load at all.<sup><a href=\"#s6\">6</a></sup> Moxifloxacin: minimal, with a short bile acid dip.<sup><a href=\"#s38\">38</a></sup>", 'class 5.5', ''),
 ('Nitrofurantoin', 'Minimal', "No significant overall effect, measured head to head against ciprofloxacin.<sup><a href=\"#s33\">33</a></sup> It concentrates in urine, so little reaches the colon.", 'not pooled', 'good'),
 ('Penicillin V', 'Minimal', "Very little effect on the gut,<sup><a href=\"#s32\">32</a></sup> and the one drug the Swedish cohort found only a small, short-lived trace from.<sup><a href=\"#s36\">36</a></sup>", 'not pooled', 'good'),
 ('Rifaximin', 'Minimal on the census', "Not absorbed, and composition barely moves; the effect may be on what bacteria <i>do</i> rather than how many there are. Most of that evidence is manufacturer-authored or from tiny groups.", 'not pooled', 'good'),
]

FAQ = [
 ("How long until my gut recovers?", "Most healthy adults are back near baseline within 2 to 8 weeks: by about day 19 for several common drugs, and about 1.5 months even after a four-day cocktail of three last-resort antibiotics.<sup><a href=\"#s6\">6</a>,<a href=\"#s4\">4</a></sup> Some individual species, and the resistance genes you carry, can stay different for 6 to 12 months."),
 ("Does one course ruin it forever?", "No. Nothing in the literature supports that. But an exact return to the old state is uncommon: in the cocktail study 9 species everyone started with were still missing in most people at 6 months,<sup><a href=\"#s4\">4</a></sup> and a Swedish cohort of about 15,000 people links even a single course of clindamycin, a fluoroquinolone or flucloxacillin to measurable differences 4 to 8 years later.<sup><a href=\"#s36\">36</a></sup> That last one is observational, with one stool sample per person, so treat it as a signal and not a measurement of you."),
 ("Which antibiotics are hardest on the gut?", "Clindamycin first by a distance, then ciprofloxacin, broad cephalosporins, oral vancomycin, and azithromycin for slowness rather than depth. Gentlest: penicillin V, amoxicillin, nitrofurantoin, the tetracyclines, rifaximin."),
 ("Should I take probiotics at the same time?", "For preventing diarrhoea, the trials say yes, with the size of the benefit depending on who you are. Children: 19% down to 8%.<sup><a href=\"#s9\">9</a></sup> High-risk hospital patients: a real <i>C. diff</i> reduction.<sup><a href=\"#s10\">10</a></sup> A healthy adult on a short outpatient course: small, and the largest well-run trial in older inpatients found nothing.<sup><a href=\"#s12\">12</a></sup> Starting within the first 2 days is where the evidence sits.<sup><a href=\"#s11\">11</a></sup>"),
 ("Do probiotics help my microbiome recover afterwards?", "That is a different question from the one above, and the answer is no. A meta-analysis found no effect on diversity.<sup><a href=\"#s45\">45</a></sup> One small study using actual gut-wall biopsies found probiotics <i>delayed</i> the return of the person's own community compared with doing nothing, while their own banked stool restored it in days.<sup><a href=\"#s17\">17</a></sup> The same group later found probiotics after antibiotics were linked to more resistance genes in the gut wall.<sup><a href=\"#s46\">46</a></sup> One small study is not a verdict, but there is nothing on the other side."),
 ("What is the single best thing I can do?", "Not take antibiotics you do not need, and when you do need them, take the narrowest drug for the shortest effective course. That is the only intervention here with proven effect sizes. After that: time does most of the work, and eating a wide range of plants and fermented foods is the best-supported help."),
 ("Is diarrhoea on antibiotics normal?", "Common: 5 to 35% depending on the drug.<sup><a href=\"#s47\">47</a></sup> Loose stools that settle within days of finishing are expected. Watery diarrhoea three or more times a day, fever, or blood is not, and needs a doctor."),
 ("Is two courses worse than one?", "On average yes. The second ciprofloxacin course produced a different and still incomplete recovery,<sup><a href=\"#s3\">3</a></sup> and in the Swedish cohort diversity fell with each extra course, most steeply for the first two.<sup><a href=\"#s36\">36</a></sup>"),
 ("Are IV antibiotics gentler on the gut?", "Not necessarily. Many intravenous drugs reach the gut through bile, and the damage tracks how much of the drug ends up in stool rather than how it went in."),
 ("Can I get C. diff weeks after finishing?", "Yes. Risk is highest during the course and the month after, and it can appear up to about three months later.<sup><a href=\"#s48\">48</a></sup>"),
 ("Will I become antibiotic resistant?", "You will not; your gut bacteria will carry more resistance genes for months, which every study that measured it found, often for drugs you never took.<sup><a href=\"#s7\">7</a>,<a href=\"#s6\">6</a></sup> That matters for treating future infections and for spread, not for your body developing resistance."),
 ("Do antibiotics cause weight gain?", "There is a small signal in infants given repeated courses or exposed before 6 months. A single course was not significant.<sup><a href=\"#s41\">41</a></sup> Adult evidence is weak."),
 ("Do they raise the risk of IBD or bowel cancer?", "Observational links exist: inflammatory bowel disease up about 28 to 48%,<sup><a href=\"#s39\">39</a></sup> colon cancer up about 9 to 17% while rectal cancer was slightly <i>down</i>.<sup><a href=\"#s40\">40</a></sup> The absolute changes are small, and people who get antibiotics are people who had infections, so the infection may be doing the work. Not proven either way."),
 ("Does an acid blocker make C. diff more likely?", "The observational data says a little (odds 1.26),<sup><a href=\"#s42\">42</a></sup> but a 2025 meta-analysis of 8 randomised trials in 29,880 people found no significant increase.<sup><a href=\"#s43\">43</a></sup> A good example of a widely repeated risk that may be confounding: sicker people take acid blockers."),
 ("Should I get a microbiome test before and after?", "No guideline supports it, and the practical problems are large: one person's day-to-day swings can be bigger than the differences between people, and different labs disagree with each other. The one test worth having after antibiotics is a <i>C. diff</i> test if you develop diarrhoea. There is a full page on this under Goals."),
]

GLOSS = [
 ('Microbiome', 'All the microbes living in a place, and their genes. Yours is mostly in the colon.'),
 ('Diversity', 'How many different kinds there are and how evenly spread. Higher is linked with health on average; it is not a diagnosis.'),
 ('Butyrate', 'A short-chain fatty acid that bacteria make from fibre. The main fuel of your colon lining cells.'),
 ('Colonization resistance', 'A full gut keeping invaders out, simply by leaving them nowhere to live and nothing to eat.'),
 ('Secondary bile acids', "Bile acids that gut bacteria have converted. They stop <i>C. difficile</i> spores from sprouting."),
 ('Resistome', 'The collection of antibiotic resistance genes your gut bacteria carry.'),
 ('AAD', "Antibiotic-associated diarrhoea. Most of it is not <i>C. diff</i>."),
 ('NNT', 'Number needed to treat: how many people take something for one of them to benefit. NNT 9 means 8 of 9 get nothing.'),
 ('Odds ratio', 'How much more likely an outcome is. A big ratio on a rare event is still a rare event.'),
 ('FMT', 'Faecal microbiota transplant: moving a whole stool community from a donor, or from your own banked sample.'),
]

# ---------------------------------------------------------------- html
def ev(t):
    m = {'h': ('e-h', 'Human'), 'r': ('e-rct', 'RCT'), 'm': ('e-m', 'Meta'),
         'a': ('e-a', 'Animal'), 'c': ('e-c', 'Cells'), 'o': ('e-a', 'Cohort')}
    k, n = m[t]
    return f'<span class="ev {k}">{n}</span>'

jump = [('what', 'What happens'), ('studies', 'The studies'), ('classes', 'Drug by drug'),
        ('helps', 'What helps'), ('myth', 'The myth'), ('else', 'Elsewhere'),
        ('risk', 'Warnings'), ('faq', 'Questions')]

H = []
A = H.append

A('''<!doctype html>
<!-- Antibiotics & your gut (Cases) v2, 22 Nov 2026. v1 kept. Change: the opening animation now runs on the shared site engine (BSAnim, /library/anim.js) via the story /library/anim/antibiotics.js, replacing v1's one-off player. It gains per-step evidence marks, a source link under each step, tappable parts, per-step callout chips, four study scenes (12 men/180 days, 3 people/2 courses, clindamycin/2 years, mice/diet) and real motion (draw, flow, grow, pulse, count). Keeps v1's five-stage timeline and the dashed nine-that-never-return. New page. Draft: built from an automatic research sweep (Antibiotics Damage Research, Replenish Research, 22 Nov 2026), not yet checked line by line by the editor. Animation: gut-wall cross-section, 5 phases + play cycle, built in the Hair page follicle player's style. No community data in this pass: stated on the page rather than filled with anything weaker. -->
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex,nofollow">
<title>Antibiotics &amp; your gut · Bare Signals</title>
<meta name="description" content="What a course of antibiotics does to the gut microbiome, how fast it comes back on its own, which drugs are hardest, and what the evidence actually supports for helping it: probiotics, S. boulardii, fibre, fermented food, FMT and the approved C. diff drugs.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">
<style>
:root{--ink:#3E4A80;--ink-soft:#6B76A8;--paper:#FFFFE2;--chip:#FFFFF4;--rule:#E3E0BF;--blue:#6777B6;--accent:#DB6830;--k:var(--bs-k,1);
--mono:"JetBrains Mono",ui-monospace,Menlo,monospace;--display:"Bricolage Grotesque",system-ui,sans-serif;
--repair:#E1DE62;--pain:#87CFC5;--infl:#FF5050;--gut:#AACC96;--prot:#99ACFF;--pu:#B493E8;--pk:#FF99D8}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:400 calc(13.5px*var(--k))/1.45 "Hanken Grotesk",system-ui,sans-serif}
.w{max-width:var(--bs-w,1240px);margin:0 auto;padding:10px var(--bs-pad,16px) 32px}
a{color:var(--blue);text-decoration:underline;text-underline-offset:2px}
p{margin:0 0 6px}
.crumb{font:500 calc(10.5px*var(--k))/1 var(--mono);letter-spacing:.08em;text-transform:uppercase;margin:0 0 8px}
.hd{display:grid;grid-template-columns:1fr auto;gap:4px 12px;align-items:start}
h1{font:700 calc(26px*var(--k))/1 var(--display);margin:0}
.aka{font-size:calc(12px*var(--k));color:var(--ink-soft);margin:3px 0 0}
.hico{width:64px;height:64px;flex:none;grid-row:span 2}
.meta{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 0}
.mt{font:500 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.meta .mt+.mt::before{content:"·";margin:0 6px 0 0}
.draft{font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;padding:4px 6px;background:color-mix(in srgb,var(--repair) 55%,var(--chip));color:#6A5A1E}
.stripe{display:flex;height:9px;margin:10px 0 0}
.stripe i{display:block;height:100%}
.tags{display:flex;flex-wrap:wrap;gap:5px;margin:7px 0 0}
.rtg{display:inline-block;font:500 calc(9.5px*var(--k))/1.1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:4px 6px;color:var(--ink)}
.kt{margin:12px 0 0;background:var(--chip);padding:10px 12px}
.kt p{margin:0 0 5px}.kt p:last-child{margin:0}
.kt b{color:var(--accent)}
.jump{display:flex;gap:6px;overflow-x:auto;margin:12px calc(-1*var(--bs-pad,16px)) 0;padding:0 var(--bs-pad,16px) 2px;scrollbar-width:none}
.jump::-webkit-scrollbar{display:none}
.jump a{flex:none;font:500 calc(10px*var(--k))/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;padding:7px 9px;background:var(--chip);color:var(--ink);text-decoration:none;white-space:nowrap}
.grid{display:grid;gap:14px;margin-top:14px}
.sec{min-width:0}
.col{display:flex;flex-direction:column;gap:14px;min-width:0}
.st{font:600 calc(14px*var(--k))/1.1 var(--mono);letter-spacing:.06em;text-transform:uppercase;margin:0 0 6px}
.st.rdt{color:#C02626}
.box{--c:var(--rule);background:color-mix(in srgb,var(--c) 14%,var(--chip));box-shadow:inset 5px 0 0 var(--c);padding:10px 12px 10px 16px}
.box>:last-child{margin-bottom:0}
.y{--c:#E1DE62}.bl{--c:#99ACFF}.gr{--c:#AACC96}.rd{--c:#E00000}.tl{--c:#87CFC5}.or{--c:#DB6830}.pu{--c:#B493E8}
.rd{background:color-mix(in srgb,#E00000 6%,var(--chip))}
.part{display:flex;align-items:center;gap:8px;margin:26px 0 0;font:600 calc(11px*var(--k))/1.2 var(--mono);letter-spacing:.1em;text-transform:uppercase;border-bottom:1.5px solid var(--ink);padding-bottom:6px}
.part span{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;background:var(--ink);color:#FFFFE2;font-size:calc(11px*var(--k))}
.part+.grid{margin-top:12px}
#p0{margin-top:18px}
.sub{font:600 calc(10.5px*var(--k))/1.2 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:10px 0 4px}
.sub:first-child{margin-top:0}
ul{margin:0;padding-left:17px}li{margin:0 0 4px}
sup{line-height:0;font-size:.72em;vertical-align:super}
sup a{text-decoration:none}
.ev{display:inline-block;font:600 calc(9px*var(--k))/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;padding:3px 5px;vertical-align:1px;white-space:nowrap;margin-right:3px;color:var(--ink)}
.e-h,.e-rct{background:#D6E8CB}.e-a{background:#ECE9D2}.e-c{background:#DDF4F5}.e-m{background:#ECE3F8}
.nums{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;margin:0 0 8px}
.nm{background:color-mix(in srgb,var(--ink) 5%,var(--chip));padding:8px 9px}
.nm b{display:block;font:600 calc(19px*var(--k))/1 var(--mono)}
.nm span{display:block;font-size:calc(11.5px*var(--k));line-height:1.25;margin-top:3px}
.srs{display:grid;gap:0}
.sr{display:block;padding:7px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}
.sr:first-child{border-top:0;padding-top:2px}
.sr .ev{float:left;margin:2px 7px 0 0;font-size:calc(8.5px*var(--k))}
.sr p{margin:0;font-size:calc(13px*var(--k));line-height:1.4}
/* windows block: stacked on phone, four columns on laptop */
.wins{display:grid;gap:0}
.win{display:grid;gap:3px;padding:10px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent);min-width:0}
.win.wh{display:none}
.win:first-of-type{border-top:0}
.win>.ww{font:600 calc(11px*var(--k))/1.2 var(--mono);letter-spacing:.06em;text-transform:uppercase}
.win>span{min-width:0;font-size:calc(12.5px*var(--k));line-height:1.45}
.win>.w1::before{content:"Best supported \2014 ";font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;color:#4C7A38}
.win>.w2::before{content:"Thinner proof \2014 ";font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;color:var(--ink-soft)}
.win>.w3::before{content:"Nothing behind it \2014 ";font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;color:#C02626}
.cmp{width:100%;border-collapse:collapse;font-size:calc(12.5px*var(--k));background:var(--chip)}
.cmp th,.cmp td{border:1px solid color-mix(in srgb,var(--ink) 25%,transparent);padding:6px 7px;text-align:left;vertical-align:top}
.cmp th{font:600 calc(10px*var(--k))/1.2 var(--mono);letter-spacing:.06em;text-transform:uppercase;background:#F2F0CC}
/* drug rows: stacked on phone, table on laptop */
.cl{display:grid;grid-template-columns:1fr auto;gap:2px 10px;padding:8px 0;border-top:1px solid color-mix(in srgb,var(--ink) 14%,transparent)}
.cl:first-of-type{border-top:0}
.cl>.dn{font:600 calc(13.5px*var(--k))/1.2 "Hanken Grotesk",system-ui,sans-serif}
.cl>.dh{font:500 calc(9.5px*var(--k))/1.2 var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft);text-align:right;white-space:nowrap}
.cl>.dt2{grid-column:1/-1;font-size:calc(12.5px*var(--k));line-height:1.45}
.cl>.dc{grid-column:1/-1;font:500 calc(9.5px*var(--k))/1.2 var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft)}
.cl>.dc::before{content:"C. diff odds · "}
.cl.bad>.dh{color:#C02626}
.cl.good>.dh{color:#4C7A38}
details.fq{border-top:1px dashed var(--rule)}
details.fq:first-of-type{border-top:0}
details.fq summary{list-style:none;cursor:pointer;padding:7px 0;font-weight:600;display:flex;justify-content:space-between;gap:10px}
details.fq summary::-webkit-details-marker{display:none}
details.fq summary::after{content:"+";font:600 calc(14px*var(--k))/1 var(--mono);color:var(--accent)}
details.fq[open] summary::after{content:"\\2212"}
details.fq .bd{padding:0 0 8px}
.fn{columns:1;font-size:calc(11.5px*var(--k));line-height:1.35;margin:0;padding-left:20px}
.fn li{break-inside:avoid;margin:0 0 4px;overflow-wrap:anywhere}
details.srcs>summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:baseline}
details.srcs>summary::-webkit-details-marker{display:none}
.cnt{font:500 calc(10px*var(--k))/1 var(--mono);color:var(--accent);letter-spacing:.06em}
details.srcs[open] .cnt{display:none}
.note{font-size:calc(11px*var(--k));color:var(--ink-soft);margin:14px 0 0}
.hint{font-size:calc(11.5px*var(--k));color:var(--ink-soft);margin:6px 0 0}
.evleg{margin:12px 0 0}
.evleg .evh{margin:0 0 6px;font:600 calc(10.5px*var(--k))/1.2 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft)}
.evleg dl{margin:0;display:grid;grid-template-columns:1fr;gap:5px}
.evleg dl>div{display:grid;grid-template-columns:96px minmax(0,1fr);align-items:baseline;gap:8px;min-width:0}
.evleg dt{margin:0;min-width:0}
.evleg dd{margin:0;min-width:0;font-size:calc(12px*var(--k));line-height:1.35;overflow-wrap:anywhere}
.evleg.gw dl>div{grid-template-columns:120px minmax(0,1fr)}
.evleg.gw dt{font:600 calc(11px*var(--k))/1.35 var(--mono)}
.method{font-size:calc(12px*var(--k))}
/* ---- animation ---- */
.awrap{display:grid;gap:10px;min-width:0}
.awrap>.acol{min-width:0}
.phs{display:flex;gap:5px;overflow-x:auto;width:100%;max-width:100%;padding:0 0 2px;scrollbar-width:none}
.phs::-webkit-scrollbar{display:none}
.ph{flex:none;font:500 calc(10px*var(--k))/1 var(--mono);letter-spacing:.05em;text-transform:uppercase;padding:7px 9px;background:var(--chip);color:var(--ink);border:0;cursor:pointer;white-space:nowrap}
.ph.on{background:var(--ink);color:#FFFFE2}
.ph.play{background:color-mix(in srgb,var(--accent) 18%,var(--chip));color:#9A4414}
.ph.play.on{background:var(--accent);color:#FFFFF4}
.dg{background:var(--chip);position:relative}
.dg svg{display:block;width:100%;height:auto}
.aprog{display:flex;align-items:center;gap:8px;font:500 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft);padding:6px 8px;background:var(--chip)}
.abar{flex:1;height:4px;background:color-mix(in srgb,var(--ink) 12%,transparent);position:relative;overflow:hidden}
.abar i{position:absolute;inset:0 auto 0 0;width:0;background:var(--accent)}
.apanel{background:var(--chip);padding:10px 12px;font-size:calc(13px*var(--k));line-height:1.5;min-height:118px}
.apanel p{margin:0 0 6px}.apanel p:last-child{margin:0}
.apanel .ah{font:700 calc(15px*var(--k))/1.2 var(--display);margin:0 0 4px}
.mc{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:center;font:500 calc(9.5px*var(--k))/1.3 var(--mono);letter-spacing:.04em;text-transform:uppercase;color:var(--ink-soft);padding:0 2px}
.mc i{display:inline-block;width:10px;height:10px;margin-right:4px;vertical-align:-1px;border:1px solid color-mix(in srgb,var(--ink) 40%,transparent)}
.hchips{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 8px}
.hch{font:500 calc(10.5px*var(--k))/1 var(--mono);letter-spacing:.04em;padding:7px 9px;background:var(--chip);color:var(--ink);border:0;cursor:pointer;text-align:left}
.hch.on{background:var(--ink);color:#FFFFE2}
.hpanel{background:var(--chip);padding:10px 12px;font-size:calc(13px*var(--k));line-height:1.5;min-height:140px}
.hpanel .hh{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin:0 0 5px}
.hpanel .hh b{font:700 calc(16px*var(--k))/1.2 var(--display)}
.hpanel .hg{font:600 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.06em;text-transform:uppercase;padding:4px 6px;background:#ECE9D2}
.hpanel .hg.g-proven{background:#AACC96}
.hpanel .hg.g-likely{background:#D6E8CB}
.hpanel .hg.g-plausible{background:color-mix(in srgb,#E1DE62 55%,#FFFFF4)}
.hpanel .hg.g-unproven{background:#ECE9D2;color:var(--ink-soft)}
.hpanel p{margin:0}
.mic{transition:opacity .55s ease,transform .55s ease}
.mic.off{opacity:0;transform:scale(.3)}
#mucus{transition:transform .6s ease,opacity .6s ease}
.bar{transition:opacity .5s ease}
.gh{transition:opacity .6s ease}
@media (prefers-reduced-motion:reduce){.mic,#mucus,.bar,.gh{transition:none}}
@media (min-width:760px){
 h1{font-size:calc(34px*var(--k))}
 .hico{width:84px;height:84px}
 .grid.two{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start}
 .kt{display:grid;grid-template-columns:1fr 1fr;gap:6px 22px}.kt p{margin:0}
 .fn{columns:2;column-gap:28px}
 .jump{flex-wrap:wrap;overflow:visible;margin:12px 0 0;padding:0}
 .nums{grid-template-columns:repeat(4,minmax(0,1fr))}
 .phs{flex-wrap:wrap;overflow:visible;margin:0;padding:0}
 .awrap{grid-template-columns:minmax(0,1fr) minmax(0,.86fr);align-items:start}
 .awrap>.acol{display:flex;flex-direction:column;gap:10px}
 .apanel{min-height:0;flex:1}
 .srs.two{grid-template-columns:1fr 1fr;column-gap:24px}
 .srs.two .sr:nth-child(2){border-top:0;padding-top:2px}
 .cl{grid-template-columns:200px 1fr 150px;gap:4px 14px;align-items:baseline}
 .cl>.dh{grid-column:3;grid-row:1;text-align:left}
 .cl>.dt2{grid-column:2;grid-row:1}
 .cl>.dc{grid-column:3;grid-row:2;text-align:left}
 .cl>.dn{grid-column:1;grid-row:1/span 2}
 .evleg dl{grid-template-columns:1fr 1fr;column-gap:24px}
 .hchips{display:grid;grid-template-columns:1fr 1fr}
 .hpanel{min-height:0}
 .win{grid-template-columns:150px repeat(3,minmax(0,1fr));gap:10px;align-items:start}
 .win.wh{display:grid;font:600 calc(9.5px*var(--k))/1.2 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);padding-bottom:4px}
 .win.wh>span{font:inherit}
 .win>.w1::before,.win>.w2::before,.win>.w3::before{content:none}
}
@media (min-width:1000px){.evleg dl{grid-template-columns:repeat(3,minmax(0,1fr))}.evleg.gw dl{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
</head><body>
<div class="w">
<p class="crumb"><a href="/library/">Library</a> · <a href="/library/goals/">Cases</a> · Antibiotics &amp; your gut</p>
<div class="hd">
 <div>
  <h1>Antibiotics &amp; your gut</h1>
  <p class="aka">The post-antibiotic microbiome · what is lost, what comes back, what helps</p>
 </div>
 <svg class="hico" viewBox="0 0 84 84" aria-hidden="true">
  <rect x="2" y="2" width="80" height="80" rx="4" fill="#FFFFF4"/>
  <g stroke="#3E4A80" stroke-width="1.6" fill="none"><path d="M10 54q16-7 32 0t32 0"/></g>
  <g fill="#AACC96"><rect x="14" y="20" width="11" height="6" rx="3"/><rect x="38" y="16" width="11" height="6" rx="3"/></g>
  <g fill="#E1DE62"><rect x="27" y="32" width="10" height="5.5" rx="2.7"/><rect x="56" y="26" width="10" height="5.5" rx="2.7"/></g>
  <g fill="#99ACFF"><ellipse cx="20" cy="40" rx="6" ry="4"/><ellipse cx="62" cy="42" rx="6" ry="4"/></g>
  <g fill="#87CFC5"><circle cx="44" cy="44" r="4.4"/><circle cx="34" cy="24" r="3.6"/></g>
  <g fill="#FF5050"><rect x="48" y="36" width="11" height="6" rx="3"/></g>
  <rect x="10" y="56" width="64" height="7" fill="#CAF5F7"/>
  <g fill="#FFF3E7" stroke="#E7B4A2" stroke-width="1.2"><rect x="10" y="63" width="15" height="13"/><rect x="25" y="63" width="15" height="13"/><rect x="40" y="63" width="15" height="13"/><rect x="55" y="63" width="19" height="13"/></g>
 </svg>
 <div class="meta">
  <span class="draft">Draft</span>
  <span class="mt">Version 1</span><span class="mt">22 Nov 2026</span><span class="mt">53 sources</span>
 </div>
</div>
<div class="stripe"><i style="background:#AACC96;flex:5"></i><i style="background:#87CFC5;flex:2"></i><i style="background:#E1DE62;flex:2"></i><i style="background:#FF5050;flex:1"></i></div>
<div class="tags">
 <span class="rtg" style="background:color-mix(in srgb,#AACC96 45%,#FFFFF4)">Gut community</span>
 <span class="rtg" style="background:color-mix(in srgb,#87CFC5 45%,#FFFFF4)">Gut lining</span>
 <span class="rtg" style="background:color-mix(in srgb,#E1DE62 45%,#FFFFF4)">Immune training</span>
 <span class="rtg" style="background:color-mix(in srgb,#FF5050 30%,#FFFFF4)">C. diff risk</span>
</div>

<div class="kt">
 <p><b>What it is.</b> About 38 trillion bacteria live in you, nearly all in the colon, and a course of antibiotics clears part of that community along with the infection. The gap, not the loss, is what causes the trouble.</p>
 <p><b>What studies found.</b> Most healthy adults are back near baseline in 2 to 8 weeks with nothing done. But 9 species everyone carried were still missing in most people at 6 months, and clindamycin left a trace at 2 years. Which drug you took matters far more than what you take afterwards.</p>
 <p><b>What people report.</b> Nothing yet. This first pass collected studies only; first-hand reports are the next pass, and the page says so rather than filling the gap with something weaker.</p>
 <p><b>Watch out.</b> Watery diarrhoea three or more times a day, fever, or blood, during a course or up to three months after, needs a doctor the same day, not a probiotic.</p>
</div>

<div class="jump">''')
for i, (h, t) in enumerate(jump):
    A(f'<a href="#{h}">{t}</a>')
A('</div>\n')

# ---------------------------------------------------------------- part 0
A('<h2 class="part" id="p0"><span>1</span> What a course actually does</h2>\n<div class="grid">\n')
A('<section class="sec" id="what">\n<h2 class="st">Inside the gut, five stages</h2>\n')
A('<p class="hint">Tap a stage, or play the whole thing. The top half is the inside of the colon, the band below it the mucus coat, and the cells below that your gut wall. Nothing here is a treatment: this is one course of antibiotics in a healthy adult, with nothing done about it.</p>\n')
A('<div id="abxanim" class="bsa-host"></div>\n')
A('<noscript><p class="hint">The animation needs JavaScript. The five stages are written out just below.</p></noscript>\n')
A('</section>\n')

# jobs box
A('''<section class="sec" id="jobs">
<h2 class="st">What that community was doing for you</h2>
<div class="box gr">
 <p><b>Guarding the door.</b> The residents hold every scrap of food and wall space, so an invader has nowhere to settle. This is the job you only notice when it stops.</p>
 <p><b>Feeding your gut wall.</b> Fibre gets fermented into butyrate, which is the main fuel of your colon lining cells, helps keep the wall sealed, and calms inflammation. The makers are <i>Faecalibacterium</i>, <i>Roseburia</i>, <i>Eubacterium rectale</i>, <i>Coprococcus</i>, and antibiotics hit them hard.<sup><a href="#s7">7</a>,<a href="#s4">4</a></sup></p>
 <p><b>Rewriting bile acids.</b> Gut bacteria convert the liver's bile acids into secondary forms, and those secondary forms are what stop <i>C. difficile</i> spores from sprouting. After broad antibiotics they fell about a thousandfold.<sup><a href="#s5">5</a></sup></p>
 <p><b>Training your immune system.</b> In the same study gut bacterial load dropped ten-thousandfold, inflammatory signals rose, and in people with low starting antibody levels the response to a flu vaccine was weaker.<sup><a href="#s5">5</a></sup></p>
 <p><b>Making vitamins.</b> Vitamin K2 and some B vitamins. How much of that you actually absorb is still argued over.</p>
</div>
</section>
</div>
''')

# ---------------------------------------------------------------- part 1
A('<h2 class="part" id="p1"><span>2</span> What the studies found</h2>\n<div class="grid two">\n<div class="col">\n')
A('<section class="sec" id="studies">\n<h2 class="st">The recovery studies, with numbers</h2>\n')
A('''<div class="nums">
 <div class="nm"><b>day 19</b><span>back to baseline richness for levofloxacin and cefpodoxime<sup><a href="#s6">6</a></sup></span></div>
 <div class="nm"><b>day 65</b><span>still low after azithromycin, same trial, same measure<sup><a href="#s6">6</a></sup></span></div>
 <div class="nm"><b>1.5 mo</b><span>near baseline after a 4-day triple hospital cocktail<sup><a href="#s4">4</a></sup></span></div>
 <div class="nm"><b>9 species</b><span>everyone had at the start, still undetectable in most at 180 days<sup><a href="#s4">4</a></sup></span></div>
</div>
<div class="srs">
 <div class="sr"><span class="ev e-h">Human</span><p><b>12 healthy men, the worst case on purpose.</b> Four days of meropenem, gentamicin and vancomycin together, then shotgun sequencing out to 180 days. Early blooms of <i>Enterobacteriaceae</i>, <i>Enterococcus faecalis</i> and <i>Fusobacterium nucleatum</i>; <i>Bifidobacterium</i> and butyrate makers lost. Composition was near baseline within about 1.5 months. Nine species that every single man carried before were still undetectable in most of them at six months, and species carrying beta-lactam resistance genes were favoured.<sup><a href="#s4">4</a></sup></p></div>
 <div class="sr"><span class="ev e-h">Human</span><p><b>3 people, two courses, 10 months, sampled 52 to 56 times each.</b> Ciprofloxacin. Diversity fell within 3 to 4 days. Recovery began about a week after each course but was, in the authors' word, often incomplete. The second course did not play out like the first. By the end, each person had settled into a stable state different from their starting one, and all three said their gut felt normal throughout.<sup><a href="#s3">3</a>,<a href="#s2">2</a></sup></p></div>
 <div class="sr"><span class="ev e-rct">RCT</span><p><b>66 healthy adults, randomised to one of four drugs or placebo, followed 12 months.</b> The gut was severely affected by most of them, butyrate makers were strongly underrepresented for months, and resistance genes were enriched. Saliva bounced back fast; the gut did not.<sup><a href="#s7">7</a></sup></p></div>
 <div class="sr"><span class="ev e-h">Human</span><p><b>4 people on clindamycin, 4 controls, 2 years.</b> <i>Bacteroides</i> diversity fell sharply and never returned to its original composition in two years. Resistance genes stayed high the whole time. The controls barely changed. This is the longest individual follow-up in the field and the reason clindamycin has the reputation it does.<sup><a href="#s28">28</a></sup></p></div>
 <div class="sr"><span class="ev e-m">Review</span><p><b>31 studies of the antibiotics actually prescribed in primary care.</b> Most people recover to baseline within a few weeks; some studies show effects lasting 2 to 6 months. Penicillin V, nitrofurantoin and amoxicillin had very little effect. Clarithromycin lowered <i>Bifidobacterium</i> and <i>Lactobacillus</i> for up to 5 weeks.<sup><a href="#s32">32</a></sup></p></div>
 <div class="sr"><span class="ev e-h">Human</span><p><b>18 adults on cefprozil: who gets hit depends on where you start.</b> The reshaping was predictable from each person's starting microbiome, and the subgroup that began with <i>lower</i> diversity got blooms of <i>Enterobacter cloacae</i>, an opportunist. Resistance genes appeared that had been undetectable before.<sup><a href="#s35">35</a></sup></p></div>
 <div class="sr"><span class="ev e-a">Cohort</span><p><b>About 15,000 Swedish adults, prescriptions linked to one stool sample.</b> Use 4 to 8 years earlier still showed up in today's microbiome, strongest for clindamycin, fluoroquinolones and flucloxacillin, and present even after a single course. Diversity fell with each extra course, most steeply for the first two. Read it carefully: this is observational, one sample per person, it cannot show the drug caused the difference, and this pass read the press release and preprint rather than the final paper.<sup><a href="#s36">36</a></sup></p></div>
</div>
<p class="hint">Worth saying plainly: nearly every recovery study is small, in healthy young volunteers, and measures stool rather than the gut wall. "Recovered" means diversity and overall composition look like baseline again. It does not mean every species came back.</p>
</section>
''')
A('</div>\n<div class="col">\n')
A('''<section class="sec" id="slow">
<h2 class="st">Who recovers slower</h2>
<div class="box y">
 <p><b>Repeat courses.</b> The second course recovers differently and less completely than the first,<sup><a href="#s3">3</a></sup> and population data shows diversity dropping with each extra course.<sup><a href="#s36">36</a></sup></p>
 <p><b>Starting with low diversity.</b> It predicted which people got opportunist blooms after a cephalosporin.<sup><a href="#s35">35</a></sup></p>
 <p><b>Long courses.</b> Cumulative days, not just number of courses, is what the dose-response curves track.<sup><a href="#s39">39</a></sup></p>
 <p><b>Age over 65, hospital stays, weakened immunity, a previous episode.</b> These are the standard <i>C. diff</i> risk factors.<sup><a href="#s48">48</a></sup></p>
 <p><b>Not intravenous versus oral.</b> Many IV drugs reach the gut through bile anyway, and the damage tracks how much drug ends up in stool.</p>
</div>
</section>
<section class="sec" id="res2">
<h2 class="st">The part that lasts: resistance genes</h2>
<div class="box or">
 <p>Every study that measured it found more antibiotic resistance genes in the gut afterwards, and often for drugs the person never took: azithromycin and cefpodoxime raised genes for other classes entirely.<sup><a href="#s6">6</a></sup> Clindamycin's stayed up for two years.<sup><a href="#s28">28</a></sup></p>
 <p>The twist worth knowing: <b>amoxicillin barely touches diversity but raised the most resistance genes</b> of the four drugs in a randomised comparison.<sup><a href="#s7">7</a></sup> Gentle on the census is not the same as gentle on the genes. This matters for treating your future infections, and for what you pass on, rather than for how you feel now.</p>
</div>
</section>
<section class="sec" id="long">
<h2 class="st">The long-term links, honestly</h2>
<div class="box pu">
 <p>All of these are observational. People who take antibiotics are people who had infections, and the infection itself may be doing the work. None of them prove cause.</p>
 <p><b>Inflammatory bowel disease:</b> up 28 to 48% depending on age, in 6.1 million Danes with 52,898 new cases, dose-dependent, peaking 1 to 2 years after. The strongest links were with drugs used for gut infections, which may mean early undiagnosed IBD was being treated as infection.<sup><a href="#s39">39</a></sup></p>
 <p><b>Bowel cancer:</b> colon cancer up about 9 to 17%, and rectal cancer slightly <i>down</i>, in 28,980 UK cases. An effect that runs in opposite directions in two neighbouring tissues deserves scepticism.<sup><a href="#s40">40</a></sup></p>
 <p><b>Childhood weight:</b> a single course was not significant; more than one, or exposure before 6 months, was, at about 20 to 24% higher odds.<sup><a href="#s41">41</a></sup></p>
 <p><b>Mood and cognition:</b> repeated courses linked to 23 to 56% higher odds of depression, and two or more months of midlife use to slightly lower cognitive scores seven years later. Confounding here is severe.<sup><a href="#s53">53</a>,<a href="#s52">52</a></sup></p>
</div>
</section>
''')
A('</div>\n</div>\n')

# ---------------------------------------------------------------- classes
A('<h2 class="part" id="p1b"><span>3</span> Drug by drug</h2>\n<div class="grid">\n<section class="sec" id="classes">\n')
A('<h2 class="st">Which antibiotic you took matters most</h2>\n')
A('<p class="hint">Ordered hardest to gentlest. The <i>C. diff</i> odds come from two community meta-analyses; they are odds, not chances, and a big odds ratio on a rare event is still a rare event. Community <i>C. diff</i> after an outpatient course is well under 1%.</p>\n<div class="box">\n')
for n, h, t, c, k in CLASSES:
    A(f'<div class="cl {k}"><span class="dn">{n}</span><span class="dh">{h}</span><span class="dt2">{t}</span><span class="dc">{c}</span></div>')
A('</div>\n')
A('<p class="hint">Sources for the odds: two meta-analyses of community cases, 7 and 8 studies, the second covering 30,184 people; hospital figures come from a third and look smaller because they compare against patients who were mostly on other antibiotics anyway.<sup><a href="#s29">29</a>,<a href="#s30">30</a>,<a href="#s31">31</a></sup></p>\n')
A('</section>\n</div>\n')

# ---------------------------------------------------------------- part 2 helps
A('<h2 class="part" id="p2"><span>4</span> What helps, and how much</h2>\n<div class="grid">\n')
A('<section class="sec" id="helps">\n<h2 class="st">Every option, graded</h2>\n')
A('<p class="hint">Tap one to read what it does and what the trials found. The grades are: Proven, Likely, Plausible, Unproven, Myth. Anything that claims to help has to beat the natural rebound above, and most of these were never tested against it.</p>\n')
A('<div class="awrap">\n<div class="acol">\n<div class="hchips" role="group" aria-label="Options">\n')
for i, h in enumerate(HELP):
    A(f'<button type="button" class="hch{" on" if i==0 else ""}" data-h="{h["k"]}">{h["n"]}</button>')
A('</div>\n</div>\n<div class="hpanel" id="hpanel" aria-live="polite"></div>\n</div>\n')
WIN = [
 ('During the course',
  'Not taking antibiotics you do not need. Then, if you are a child, in hospital, or otherwise at real risk of diarrhoea: a probiotic or <i>S. boulardii</i> started in the first 2 days',
  'Keep eating fibre-rich whole food',
  'Kefir and yogurt for diarrhoea (one null trial), zinc carnosine, colostrum, glutamine, butyrate, peptides'),
 ('The week after',
  'Stopping the probiotic once the diarrhoea window has passed. There is no evidence it rebuilds anything',
  'Fermented foods, a wide range of plants',
  'Isolated prebiotic supplements, <i>Akkermansia</i>, postbiotics, "gut reset" stacks'),
 ('Months after',
  'Time. It does most of the work by about 1.5 months',
  'Continued plant variety, fermented food, exercise',
  'Anything sold as restoring your microbiome'),
 ('Recurrent <i>C. diff</i>, a medical problem',
  'Donor FMT, and the two approved products<sup><a href="#s19">19</a>,<a href="#s20">20</a>,<a href="#s21">21</a></sup>',
  '—',
  'Probiotics as a treatment: the AGA says trials only, and flagged one strain with <i>higher</i> recurrence<sup><a href="#s44">44</a></sup>'),
]
A('<p class="sub">The short version, by window</p>\n<div class="wins">\n')
A('<div class="win wh"><span class="ww">When</span><span class="w1">Best supported</span><span class="w2">Worth doing, thinner proof</span><span class="w3">Nothing behind it</span></div>\n')
for w, a1, a2, a3 in WIN:
    A(f'<div class="win"><span class="ww">{w}</span><span class="w1">{a1}</span><span class="w2">{a2}</span><span class="w3">{a3}</span></div>')
A('</div>\n</section>\n</div>\n')

# myth
A('''<div class="grid two">
<section class="sec" id="myth">
<h2 class="st">The one claim that does not survive</h2>
<div class="box rd">
 <p><b>"Take probiotics to restore your microbiome after antibiotics."</b> This is the single most repeated piece of advice on the subject, and it is the one with evidence against it rather than for it.</p>
 <p>A meta-analysis of randomised trials found probiotics taken during antibiotics made <b>no difference to diversity</b>, by any of three measures. Both groups drifted back to baseline in 3 to 8 weeks regardless.<sup><a href="#s45">45</a></sup></p>
 <p>A study that went further and took actual gut-wall biopsies rather than stool found something worse: after antibiotics, an 11-strain probiotic colonised the gut wall better than usual, and that came with a <b>markedly delayed and persistently incomplete</b> return of the person's own community, compared with people who did nothing. The people who banked their own stool beforehand and had it returned recovered within days.<sup><a href="#s17">17</a></sup></p>
 <p>The same group then found that probiotics after antibiotics were linked to <b>more</b> antibiotic resistance genes in the gut wall, which did not show up in stool samples at all.<sup><a href="#s46">46</a></sup></p>
 <p>Hold the strength of this honestly: it is one small study from one centre, invasive, not replicated. It is not proof that probiotics harm recovery. But there is nothing on the other side of the scale, and "restores your gut flora" is a marketing line, not a finding. What probiotics do have good evidence for is <b>preventing diarrhoea</b>, which is a different and useful thing.</p>
</div>
</section>
<section class="sec" id="gaps">
<h2 class="st">What this page does not have yet</h2>
<div class="box bl">
 <p>This is a first pass, and it is marked Draft because the editor has not yet checked it line by line.</p>
 <p><b>No first-hand reports.</b> Every other case page on this site carries what people actually report. This one does not yet: this pass gathered studies only. That section comes next, and until then there is no community count to read here.</p>
 <p><b>Sources that could not be opened:</b> the full text of the 66-person randomised comparison (per-drug detail came from a summary), the full text of the 4-drug trial (blocked by a captcha, numbers from a conference summary), and the final version of the Swedish cohort paper (press release and preprint used instead).</p>
 <p><b>Open questions being chased:</b> solo metronidazole and trimethoprim-sulfamethoxazole data, diarrhoea rates per drug from a primary source, absolute <i>C. diff</i> risk per 10,000 prescriptions, yeast overgrowth in people, recovery in children and older adults specifically, and whether any diet trial has ever been run after a course.</p>
</div>
</section>
</div>
''')

# ---------------------------------------------------------------- elsewhere
A('''<h2 class="part" id="p3"><span>5</span> Pairings, and the same problem elsewhere</h2>
<div class="grid two">
<section class="sec" id="else">
<h2 class="st">The same problem, other places</h2>
<div class="box tl">
 <p><b>The vagina, where it has actually been tested.</b> This is the closest thing to a controlled experiment in replanting a community after antibiotics, and it is worth reading because the design is everything. Women treated for bacterial vaginosis got a course of metronidazole first, then a live <i>L. crispatus</i> product for <b>11 weeks</b>. Recurrence at 12 weeks: 30% against 45% on placebo, and the strain was still detectable in 79% of them.<sup><a href="#s51">51</a></sup></p>
 <p>Three things made that work, and all three are missing from a capsule swallowed by a healthy adult: the antibiotic cleared the space first, the dosing continued for weeks rather than days, and the organism was matched to the niche. That is the whole pattern of when seeding works.</p>
 <p><b>The gut after a gut infection</b> is a different problem with its own page, and some of what is weak here has better evidence there.</p>
</div>
<p class="hint">Links: <a href="/library/goals/gut/">Gut (IBS, colitis, ulcers, reflux)</a> · <a href="/library/aims/microbiome/">Microbiome testing &amp; adding strains</a> · <a href="/library/goals/">all cases</a></p>
</section>
<section class="sec" id="pairs">
<h2 class="st">Peptides, and why they are a footnote here</h2>
<div class="box">
 <p>This page is about the microbiome, so the honest answer about peptides is short. A PubMed search for BPC-157 and gut microbiota returns <b>zero results</b>, run on 22 November 2026.<sup><a href="#s24">24</a></sup> Not a weak result. None.</p>
 <p>BPC-157 does have a long rodent record on gut <i>lining</i> damage: ulcers, painkiller injury, fistulas, almost all of it from one research group. Its three published human papers all come from a single clinician at a private US clinic that sells it, two are uncontrolled and the third has two participants, and none of them are about the gut.<sup><a href="#s25">25</a></sup> KPV calmed chemically induced colitis in mice and has no human data.<sup><a href="#s26">26</a></sup> Larazotide, designed to tighten the gut lining, showed no change in permeability across four trials in 626 coeliac patients and its phase 3 was stopped in 2022.<sup><a href="#s27">27</a></sup></p>
 <p>So: there is a plausible story about the gut wall, and nothing at all about the community living on it. If that changes, it goes here.</p>
 <p class="hint">Library cards: <a href="/library/#bpc-157">BPC-157</a> · <a href="/library/#kpv">KPV</a> · <a href="/library/#ll-37">LL-37</a></p>
</div>
</section>
</div>
''')

# ---------------------------------------------------------------- warnings
A('''<h2 class="part" id="p4"><span>6</span> Warnings</h2>
<div class="grid two">
<section class="sec" id="risk">
<h2 class="st rdt">When this needs a doctor, not a supplement</h2>
<div class="box rd">
 <p><b>Same day, not next week:</b> watery diarrhoea three or more times a day for more than a day or two, during a course or up to about three months after it; fever; blood or pus in stool; belly pain or swelling that is getting worse; signs of dehydration; or diarrhoea that comes back after it had settled.<sup><a href="#s48">48</a></sup></p>
 <p>Higher urgency if you are over 65, recently in hospital, immunocompromised, or have had <i>C. difficile</i> before.</p>
 <p><b>Do not take loperamide</b> or another anti-diarrhoea drug for suspected <i>C. diff</i> without medical advice.</p>
 <p>The useful test after antibiotics is a <i>C. diff</i> test, which your doctor orders. Not a consumer microbiome kit.</p>
</div>
</section>
<section class="sec" id="risk2">
<h2 class="st">Risks in the things on this page</h2>
<div class="box y">
 <p><b>Probiotics are not risk-free for everyone.</b> The Cochrane reviews found no serious attributable events in healthy people, and flagged case reports of serious infections in debilitated or immunocompromised patients and those with central lines.<sup><a href="#s9">9</a></sup> Live yeast has the same caveat. If your immune system is suppressed, this is a conversation with your doctor.</p>
 <p><b>FMT has a hard safety floor.</b> Two patients developed drug-resistant <i>E. coli</i> bloodstream infections from the same screened donor, and one of them died. Both were immunocompromised.<sup><a href="#s50">50</a></sup> Screening was and is imperfect. This is why FMT belongs in medicine and not in a kitchen.</p>
 <p><b>One strain was flagged going the wrong way.</b> The AGA guideline notes <i>L. rhamnosus</i> GG was linked to <i>higher C. diff</i> recurrence than placebo in one treatment trial.<sup><a href="#s44">44</a></sup> Common does not mean neutral.</p>
 <p><b>Nothing here is a reason to refuse antibiotics you need.</b> When an infection needs treating, treating it wins. The useful questions are whether it is needed, whether something narrower works, and whether the course can be shorter.</p>
</div>
</section>
</div>
''')

# ---------------------------------------------------------------- faq
A('<h2 class="part" id="p5"><span>7</span> Usual questions</h2>\n<div class="grid two">\n<div class="col">\n<section class="sec" id="faq">\n<h2 class="st">What people ask</h2>\n<div class="box">\n')
for i, (q, a) in enumerate(FAQ):
    A(f'<details class="fq"{" open" if i < 2 else ""}><summary>{q}</summary><div class="bd"><p>{a}</p></div></details>')
A('</div>\n</section>\n</div>\n<div class="col">\n')
A('<section class="sec" id="glossary">\n<h2 class="st">Words on this page</h2>\n<div class="box">\n<div class="evleg gw"><dl>')
for t, d in GLOSS:
    A(f'<div><dt>{t}</dt><dd>{d}</dd></div>')
A('</dl></div>\n</div>\n</section>\n')
A('''<section class="sec" id="evidence">
<h2 class="st">How strong the evidence is</h2>
<div class="box">
<div class="evleg"><dl>
 <div><dt><span class="ev e-rct">RCT</span></dt><dd>Randomised trial in people, the strongest single design here</dd></div>
 <div><dt><span class="ev e-h">Human</span></dt><dd>Measured in people, but without randomisation</dd></div>
 <div><dt><span class="ev e-m">Review</span></dt><dd>A meta-analysis or systematic review pooling trials</dd></div>
 <div><dt><span class="ev e-a">Cohort</span></dt><dd>Observational: a population followed or looked back at. Shows links, not causes</dd></div>
 <div><dt><span class="ev e-c">Animal</span></dt><dd>Mice or rats only</dd></div>
</dl></div>
</div>
</section>
''')
A('</div>\n</div>\n')

# ---------------------------------------------------------------- sources
A('<div class="grid">\n<section class="sec" id="sources">\n<details class="srcs" id="srcd"><summary><h2 class="st" style="margin:0">Sources</h2><span class="cnt">%d · tap to open</span></summary>\n<div class="box">\n<ol class="fn">' % len(SRC))
for sid, txt, url in SRC:
    A(f'<li id="{sid}">{txt} <a href="{url}" target="_blank" rel="noopener">link</a></li>')
A('</ol>\n</div>\n</details>\n</section>\n')
A('''<section class="sec" id="method">
<div class="box method">
 <p><b>How this page was made.</b> Studies were traced to PubMed, Cochrane, ClinicalTrials.gov and regulator pages, read from the abstracts or primary records, and written up in our words, on 22 November 2026. Searches were run for failures and null results as well as positive ones, which is where the null probiotic trial, the acid-blocker reversal and the zero peptide results came from. <span class="ev e-rct">RCT</span><span class="ev e-h">Human</span><span class="ev e-m">Review</span><span class="ev e-a">Cohort</span><span class="ev e-c">Animal</span> show where each finding was seen. Marked Draft: an automatic sweep the editor has not yet checked line by line. Not medical advice, and no doses are given here. Doses people use are on each compound's <a href="/library/">Library card</a>.</p>
</div>
</section>
</div>
</div>
''')

# ---------------------------------------------------------------- scripts
A('<script id="hinfo" type="application/json">' + json.dumps({h['k']: h for h in HELP}) + '</script>\n')
A('<script src="/library/anim.js"></script>\n')
A(r'''<script>
(function(){
 var HI=JSON.parse(document.getElementById('hinfo').textContent);
 // the opening animation now runs on the shared site engine
 BSAnim.mount(document.getElementById('abxanim'),'antibiotics',{autoplay:false});

 // options panel
 var hp=document.getElementById('hpanel'), hb=[].slice.call(document.querySelectorAll('.hch'));
 function showH(k){
  var h=HI[k];
  var gk=h.g.split(/[ ,]/)[0].toLowerCase();
  hp.innerHTML='<p class="hh"><b>'+h.n+'</b><span class="hg g-'+gk+'">'+h.g+'</span></p><p>'+h.t+'</p>';
  hb.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-h')===k); });
 }
 hb.forEach(function(b){ b.addEventListener('click',function(){ showH(b.getAttribute('data-h')); }); });
 showH(hb[0].getAttribute('data-h'));

 // sources
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
# redirect stub at the section root
os.makedirs(os.path.join(REPO, 'library/goals/antibiotics'), exist_ok=True)
open(os.path.join(REPO, 'library/goals/antibiotics/redirect-stub.html'), 'w', encoding='utf8').write(
 '<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex,nofollow">'
 '<title>Antibiotics &amp; your gut</title><script>location.replace("/library/goals/antibiotics/v2/"+location.hash)</script>'
 '<meta http-equiv="refresh" content="0;url=v2/">\n')
print('wrote', OUT, os.path.getsize(os.path.join(OUT, 'index.html')), 'bytes')
