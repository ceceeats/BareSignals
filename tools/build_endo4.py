"""Endometriosis v4 (19 Nov 2026), built on v3 (kept).
Cece's note: "0 research peptides with human data" read as if no peptide helps endometriosis. It does: GnRH analogues are peptides.
v4 reframes the page around what 'peptide' means here: hormone peptides that work, lab peptides that shrink lesions by blocking
vessels, and the healing peptides sold online (never tested, push the other way). Adds the seller-claim check and the TA1 Phase 3 status."""
import os, shutil
R = '/home/claude/baresignals/library/goals/endometriosis'
os.makedirs(f'{R}/v4', exist_ok=True)
s = open(f'{R}/v3/index.html', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    assert s.count(old) >= 1, old[:90]
    s = s.replace(old, new, n)

rep('<!doctype html>\n', '<!doctype html>\n<!-- Endometriosis v4 (19 Nov 2026), built on v3 (kept): new first study section on GnRH analogue peptides (leuprolide, goserelin, nafarelin, triptorelin, buserelin; Cochrane 2023, 72 trials, 7,355 women); new section on lab peptides that shrank lesions by blocking vessels (endostatin and its short peptides, anginex, a pro-apoptotic peptide in baboons); key takeaway and the "0" number tile reframed; seller claims checked (untraceable "45-woman" and "120-woman" BPC-157/TB-500 studies); thymosin alpha-1 Phase 3 registry status; FAQ "Is any peptide proven?"; compared table gains two rows; version number removed from the page header. Sources 108 to 119. -->\n', 1)

# header chips: no version number shown to readers
rep('<span class="mt">Researched 3–4 Nov 2026</span><span class="mt">108 sources</span><span class="mt">Version 3</span>',
    '<span class="mt">Researched 3–4 Nov, updated 19 Nov 2026</span><span class="mt">119 sources</span>')
rep('<span class="cnt">108</span>', '<span class="cnt">119</span>')

# key takeaway
rep('<p><b>What studies found.</b> Hormone drugs work: GnRH antagonists help 1 extra person in every 2 treated with period pain.<sup><a href="#s4">4</a></sup> No research peptide (BPC-157, TB-500, KPV, GHK-Cu, LL-37) has a single endometriosis study. GLP-1 drugs have surveys, not trials.</p>',
    '<p><b>What studies found.</b> Some peptides do work. The GnRH analogues (leuprolide, sold as Lupron, plus goserelin, nafarelin, triptorelin and buserelin) are peptides, approved for endometriosis since 1990: against placebo, about twice as many women got relief from pelvic pain, period pain and painful sex.<sup><a href="#s109">109</a></sup> They work by switching estrogen off. In animals, peptides that block new blood vessels shrank lesions.<sup><a href="#s114">114</a>,<a href="#s117">117</a></sup> The healing peptides sold online (BPC-157, TB-500, KPV, GHK-Cu) have never been tested for it, and the first two build vessels. GLP-1 drugs have surveys, not trials.</p>')

# number tile
rep('<div class="nm"><b>0</b><span>endometriosis studies of BPC-157, TB-500, KPV, GHK-Cu</span><i class="ev e-c">Search</i></div>',
    '<div class="nm"><b>~2×</b><span>pelvic pain relief vs placebo on GnRH peptide drugs like Lupron</span><i class="ev e-m">Cochrane</i><sup><a href="#s109">109</a></sup></div>')

# jump nav
rep('<a href="#p1">2 · Studies</a><a href="#glp">GLP-1s</a>', '<a href="#p1">2 · Studies</a><a href="#gnrh">GnRH peptides</a><a href="#glp">GLP-1s</a><a href="#lab">Lab peptides</a>')

# part 2 read-first note
rep('<p class="cutnote"><b>Read this first: almost nothing here has a placebo trial in endometriosis.</b> The only proven treatments are hormones and surgery (part 5). Below, each compound is tagged by where the evidence comes from. GLP-1 drugs come first because they carry the only real signal, then the non-peptide compounds that have small human trials, and last the popular research peptides, which have no endometriosis studies at all.</p>',
    '<p class="cutnote"><b>Read this first: "peptide" covers very different things here.</b> The peptides with real endometriosis evidence are hormone peptides that switch estrogen off (GnRH analogues, first below) and lab peptides that starve lesions of blood vessels (in animals only). The healing peptides sold online pull the other way on vessels and have never been tested. Order: GnRH peptides, GLP-1s, thymosin alpha-1, lab peptides, other compounds with human studies, then the popular research peptides and why they are on this page.</p>')

GNRH = '''<div class="grid"><section class="sec" id="gnrh">
 <h2 class="st">GnRH analogues · the peptides that are proven</h2>
 <div class="cp">
  <div class="cph"><h3>Leuprolide, goserelin, nafarelin, triptorelin, buserelin</h3><span>No Library card yet</span></div>
  <div class="stripe"><i style="width:60%;background:#FF99D8"></i><i style="width:40%;background:var(--pain)"></i></div>
  <p class="lead">Copies of GnRH, the 10 amino acid brain peptide that tells the ovaries to make estrogen. Given nonstop as a monthly or 3-monthly injection, an implant or a nasal spray, they do the opposite of the natural pulse: the pituitary stops answering, estrogen falls to menopause levels, periods stop and lesions lose their fuel.<sup><a href="#s110">110</a>,<a href="#s111">111</a></sup> This is the one place where a peptide has a long, solid endometriosis record.</p>
  <ol class="tline">
   <li><span class="ty">1990 <i class="ev e-rct">RCT</i></span><p class="th">Lupron beat placebo on every pain measure.</p><p class="tb">52 women, double blind: period pain, pelvic pain and tenderness all improved more on leuprolide 3.75 mg a month than on placebo; periods stopped in everyone on it; hot flushes were the main side effect. The FDA approved it for endometriosis that year.<sup><a href="#s110">110</a></sup></p></li>
   <li><span class="ty">1998 <i class="ev e-rct">RCT</i></span><p class="th">A year on it, with bone protected.</p><p class="tb">201 women took leuprolide for 12 months with "add-back" hormone pills or placebo pills. Add-back kept the pain relief and limited the bone loss and flushes, which is why it is now standard past 6 months.<sup><a href="#s111">111</a></sup></p></li>
   <li><span class="ty">2008–2010 <i class="ev e-rct">RCTs</i></span><p class="th">As good as dienogest, a progestin pill.</p><p class="tb">Buserelin vs dienogest, 271 women in Japan: most symptoms improved equally.<sup><a href="#s113">113</a></sup> Leuprolide vs dienogest, 252 women in Europe: pelvic pain fell 46.0 vs 47.5 points out of 100 over 24 weeks.<sup><a href="#s112">112</a></sup> Read: the pill matched the injection with fewer menopause-type side effects.</p></li>
   <li><span class="ty">2023 <i class="ev e-m">Cochrane</i></span><p class="th">72 trials, 7,355 women.</p><p class="tb">Against placebo, about 2.1 to 2.3 times as many women had less pelvic pain, period pain and painful sex at 3 months. Hot flushes were about 3 times as common. Against other hormone treatments, no clear difference in pain. The reviewers rate the certainty low: many old, small, poorly reported trials.<sup><a href="#s109">109</a></sup></p></li>
  </ol>
  <p class="sub">What it costs</p>
  <ul class="how">
   <li><b>Menopause for as long as you take it:</b> hot flushes, vaginal dryness, low mood, poor sleep.</li>
   <li><b>Bone loss,</b> the reason courses run 6 months, or up to 12 with add-back.<sup><a href="#s111">111</a></sup></li>
   <li><b>A flare first:</b> the first 1 to 2 weeks briefly push estrogen up before it falls.</li>
   <li><b>Symptoms often return</b> after stopping, since lesions are suppressed, not removed.</li>
  </ul>
  <p class="hint">Why it matters for the peptide question: a peptide can treat endometriosis, but these do it by shutting estrogen down, not by healing tissue. The newer pills that do the same job (elagolix, relugolix, linzagolix) are not peptides; their results are in part 5.</p>
 </div>
</section></div>

'''
rep('<div class="grid"><section class="sec" id="glp">', GNRH + '<div class="grid"><section class="sec" id="glp">')

# thymosin alpha-1 registry status
rep('and the registry record still shows 0 enrolled and "start date TBD".<sup><a href="#s43">43</a></sup></p></li>',
    'and the registry record still shows 0 enrolled and "start date TBD".<sup><a href="#s43">43</a></sup></p><p class="tb"><b>Checked 19 Nov 2026:</b> a Phase 3 registration in India (CTRI/2023/06/054279), thymosin alpha-1 plus standard care against standard care alone in confirmed endometriosis up to stage III, is listed as active, not recruiting. No result has been published.<sup><a href="#s119">119</a></sup></p></li>')

LAB = '''<section class="sec" id="lab">
 <h2 class="st">Lab peptides that shrank lesions · animals only</h2>
 <p>The peptides that have made endometriosis lesions smaller in animals all work by cutting off the blood supply or making lesion cells self-destruct. None has been tried in people.</p>
 <ol class="tline">
  <li><span class="ty">2004 <i class="ev e-a">Mice</i></span><p class="th">Human lesions in mice: fewer and smaller.</p><p class="tb">Human womb lining was grown in 49 mice, then treated with four vessel blockers, including the peptides endostatin and anginex. Treated mice had fewer new vessels, fewer lesions and less lesion area; endostatin worked best.<sup><a href="#s116">116</a></sup></p></li>
  <li><span class="ty">2005 <i class="ev e-a">Mice</i></span><p class="th">Endostatin: lesion growth down 47%, fertility untouched.</p><p class="tb">Harvard team, surgically induced endometriosis: lesions grew 47% less on endostatin for 4 weeks. Cycles, ovulation, litter size and the pups were all normal.<sup><a href="#s114">114</a></sup></p></li>
  <li><span class="ty">2006 <i class="ev e-a">Mice</i></span><p class="th">Short endostatin peptides did it too.</p><p class="tb">Two synthetic fragments (mP-1 and mP-6) blocked vessel-lining cells from moving and significantly slowed lesion growth, without stopping normal cycles.<sup><a href="#s115">115</a></sup></p></li>
  <li><span class="ty">2014 <i class="ev e-a">Baboons</i></span><p class="th">A homing peptide made lesion cells self-destruct.</p><p class="tb">A peptide built to find endometriosis cells and trigger their programmed death was put into the belly of baboons, the animal that gets endometriosis naturally. Lesion cells died; nearby organs were unaffected.<sup><a href="#s117">117</a></sup></p></li>
 </ol>
 <p class="hint">The pattern: lesions shrink when vessels are blocked. BPC-157 and TB-500 are sold for the opposite effect, more vessels (below).</p>
</section>
'''
rep('<section class="sec" id="ldn">', LAB + '<section class="sec" id="ldn">')

# BPC-157: why it is on this page + seller claims
rep('a 2026 review rated the evidence very low and said it should only be used in trials.<sup><a href="#s63">63</a></sup></p>',
    'a 2026 review rated the evidence very low and said it should only be used in trials.<sup><a href="#s63">63</a></sup></p>\n  <p><b>Why it is on this page.</b> It is the peptide most pushed for endometriosis online, along with TB-500. Seller articles quote a "45-woman pilot", a "120-woman multicentre study" and "40% less pain at 250 to 500 mcg a day". One of those sites later took the figures down because they could not be traced to any publication, and our own search found no such study, in any language.<sup><a href="#s118">118</a></sup></p>')

# zero reports section
rep('Searches turned up only seller pages, which were left out.<sup><a href="#s46">46</a></sup></p>',
    'Searches turned up only seller pages, which were left out.<sup><a href="#s46">46</a></sup></p>\n <p><b>Where the online claims come from.</b> Rechecked 19 Nov 2026 across podcasts, YouTube write-ups and peptide sites: the endometriosis claims for BPC-157, TB-500, KPV and thymosin alpha-1 trace back to seller pages and clinic blogs, not to people describing their own results. The one well-sourced review we found reached the same conclusion: GnRH peptides have trials, the healing peptides do not.<sup><a href="#s118">118</a></sup></p>')

# compared table
rep('<tr><td>GLP-1s</td><td>2 surveys, 1 case, no trial</td>',
    '<tr><td>GnRH peptides</td><td>72 RCTs, approved since 1990</td><td>Yes</td><td>Works, costs bone and flushes</td></tr>\n  <tr><td>Endostatin, anginex, homing peptide</td><td>None</td><td>Mice, baboons</td><td>Shrank lesions</td></tr>\n  <tr><td>GLP-1s</td><td>2 surveys, 1 case, no trial</td>')

# FAQ
rep('<details class="fq" open><summary>Can I be diagnosed without surgery?</summary>',
    '<details class="fq" open><summary>Is any peptide proven for endometriosis?</summary><div class="bd"><p>Yes: the GnRH analogues (leuprolide, goserelin, nafarelin, triptorelin, buserelin). They are peptide drugs, approved since 1990, and relieve pain by shutting estrogen down, at the cost of menopause-type side effects and bone loss.<sup><a href="#s109">109</a></sup> No healing or research peptide (BPC-157, TB-500, KPV, GHK-Cu) has been tested for it.</p></div></details>\n  <details class="fq" open><summary>Can I be diagnosed without surgery?</summary>')

SRC = [
 (109, 'Cochrane 2023, Veth et al., GnRH analogues for pain in endometriosis, 72 trials, 7,355 women, searched May 2022.', 'https://www.cochrane.org/evidence/CD014788_gonadotrophin-releasing-hormone-analogues-pain-associated-endometriosis', 'Cochrane'),
 (110, 'Dlugi et al., Fertil Steril 1990, Lupron depot vs placebo, 52 women.', 'https://www.epistemonikos.org/en/documents/99de2f22ceed5b7406de3340acf5eafb27a56cca', 'record'),
 (111, 'F&S Reports 2023, GnRH agonists and add-back therapy in endometriosis (review incl. the 1998 Lupron add-back trial, 201 women).', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10201290/', 'PMC'),
 (112, 'Strowitzki et al., Hum Reprod 2010, dienogest vs leuprolide, 252 women (PMID 20089522).', 'https://pubmed.ncbi.nlm.nih.gov/20089522/', 'PubMed'),
 (113, 'Harada et al., Fertil Steril 2008, dienogest vs buserelin, 271 women (PMID 18653184).', 'https://pubmed.ncbi.nlm.nih.gov/18653184/', 'PubMed'),
 (114, 'Becker et al., Fertil Steril 2005, endostatin inhibits endometriotic lesions without affecting fertility (mice).', 'https://doi.org/10.1016/j.fertnstert.2005.04.040', 'DOI'),
 (115, 'Becker et al., Fertil Steril 2006, short synthetic endostatin peptides inhibit endometriosis in a mouse model.', 'https://doi.org/10.1016/j.fertnstert.2005.07.1290', 'DOI'),
 (116, 'Nap et al., ESHRE 2004, angiostatic therapy (endostatin, anginex) on human endometrium in 49 mice.', 'https://www.eurekalert.org/pub_releases/2004-06/esfh-ec062604.php', 'link'),
 (117, 'Sugihara et al. 2014, pro-apoptotic peptides as potential therapy for peritoneal endometriosis (baboons).', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4109024/', 'PMC'),
 (118, 'Seller-claim check: a peptide clinic site removed its BPC-157/TB-500 endometriosis figures as untraceable and cites only leuprolide and buserelin trials (read 19 Nov 2026).', 'https://formblends.com/articles/conditions-hub/endometriosis-peptides', 'link'),
 (119, 'CTRI/2023/06/054279, thymosin alpha-1 plus standard care in endometriosis, Phase 3, active not recruiting (MedPath record, read 19 Nov 2026).', 'https://trial.medpath.com/clinical-trial/52f79e2f4f07aa40/ctri/2023/06/054279-thymosin-alpha-one-endometriosis-trial', 'record'),
]
li = ''.join(f'\n   <li id="s{n}">{t} <a href="{u}" target="_blank" rel="noopener">{l}</a></li>' for n, t, u, l in SRC)
rep('<li id="s108">Cancers 2026: endometriosis and ovarian cancer risk. <a href="https://pubmed.ncbi.nlm.nih.gov/42882935/" target="_blank" rel="noopener">PubMed</a></li>',
    '<li id="s108">Cancers 2026: endometriosis and ovarian cancer risk. <a href="https://pubmed.ncbi.nlm.nih.gov/42882935/" target="_blank" rel="noopener">PubMed</a></li>' + li)
s = s.replace('Studies come from PubMed, ClinicalTrials.gov, guideline pages and one patent', 'Studies come from PubMed, Cochrane, ClinicalTrials.gov, trial registries, guideline pages and one patent', 1)
open(f'{R}/v4/index.html', 'w', encoding='utf8').write(s)

# redirect + Cases card
ix = open(f'{R}/index.html', encoding='utf8').read().replace("v3/", "v4/")
open(f'{R}/index.html', 'w', encoding='utf8').write(ix)
cj = open('/home/claude/baresignals/cards.js', encoding='utf8').read()
old = '"stat": "0", "line": "research peptides with human data. GLP-1s carry the only signal."'
assert old in cj
cj = cj.replace(old, '"stat": "2×", "line": "pain relief vs placebo on GnRH peptide drugs. The healing peptides were never tested."')
cj = cj.replace('/* Bare Signals cards v1', '/* Bare Signals cards v1.1 (19 Nov 2026): Endometriosis card reads 2× (GnRH peptide drugs), not 0. */\n/* Bare Signals cards v1', 1)
open('/home/claude/baresignals/cards.js', 'w', encoding='utf8').write(cj)
print('ok')
