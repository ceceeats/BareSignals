/* Explain v1 (20 Nov 2026): tap a label, get a plain-words box.
   Shared "tap to explain" for baresignals.co. Load once at the end of a page: <script src="/explain.js" defer></script>
   Binds (a) any element with data-x="term-key" (several keys: data-x="rct phase-3"), (b) chip and tag text it knows
   (RCT, 47 RCTs, META, Phase 3, grades, legal chips, proof marks), plus a few terms inside running text (odds ratio,
   3 times placebo, SALT, hairs per cm2...), and (c) colour squares with data-topic="stop" etc.
   Links are never hijacked: a small (i) goes beside them. Popover is position:fixed, so nothing on the page moves.
   Opt out on any block with data-x-off. API: window.BSEXPLAIN = {terms, open(key, el), close(), scan(root)}.
   Live copy: /explain.js. This file is kept as written. */
(function () {
  if (window.BSEXPLAIN) return;
  var D = document;

  /* ---------- the dictionary: t = title, b = body (plain words), w = why it matters, pl = plural used when a count is echoed ---------- */
  var T = {
    /* topic colours */
    'topic-who': { t: 'Who and where', b: 'Teal square. Who this part is about: signs to match yourself against, look-alike conditions, regional notes.', w: 'Check the page is about you before you read the rest.' },
    'topic-studies': { t: 'What studies found', b: 'Green square. What controlled research measured: trial tables, effect sizes, results against placebo.', w: 'The closest thing to proof on the page.' },
    'topic-reports': { t: 'What people report', b: 'Lilac square. What users say happened to them, from forums, Reddit and surveys, always with a count.', w: 'Real signal, but nobody ran a placebo group.' },
    'topic-doctor': { t: 'Seen by a doctor', b: 'Blue square. Case reports and clinic notes: what doctors saw in real patients.', w: 'One step up from forum posts, one step below a trial.' },
    'topic-use': { t: 'How people use it', b: 'Yellow square. The practical side: routes, how often, what people pair it with.', w: 'A description of what people do, not a recommendation.' },
    'topic-weigh': { t: 'Weigh this', b: 'Orange square. Trade-offs and catches: side effects, weak spots in the evidence, cost.', w: 'Not a stop sign. A read-twice sign.' },
    'topic-stop': { t: 'Stop, see a doctor', b: 'Red square. Real danger: pregnancy rules, red-flag symptoms, who must not take it. Read this before anything else.', w: 'Red only ever means this on the site.' },
    'topic-dose': { t: 'Dose and timing', b: 'Yellow, with numbers. Doses, how often and cycle length, as used in trials or reported by users.', w: 'What was used, not a prescription.' },
    'topic-legal': { t: 'Legal and sport status', b: 'Outlined § chips. Approved or not, prescription only, sold as a research chemical, banned in tested sport.', w: 'Rules change by country; the chip says where.' },
    'topic-grade': { t: 'Grades', b: 'How sure the site is about a claim, on one five-step scale: Proven, Likely, Plausible, Unproven, Myth. The filled bar shows the step.' },
    'topic-fun': { t: 'Fun facts and stories', b: 'Short surprising lines, origin and name stories, the story behind the reports. Tap to read more.', w: 'Sourced like everything else, just lighter.' },
    'topic-how': { t: 'How it works', b: 'The mechanism: what it touches in the body and why that could matter. Diagram first, words second.', w: 'A good mechanism is not proof it works.' },
    'topic-tests': { t: 'Tests and tracking', b: 'Blood tests and measurements worth doing before, during and after.', w: 'How you find out whether anything is happening, good or bad.' },
    'topic-next': { t: 'Coming next', b: 'Trials registered or running, approvals under review. Things that could change this page.', w: 'No results yet, so no conclusions yet.' },
    'topic-made': { t: 'How this was made', b: 'Beige, quiet on purpose. Method, sources, dates checked.', w: 'Where every number came from, so you can check it yourself.' },
    'topic-confidence': { t: 'Confidence marks', b: 'How firm one fact is: verified (checked at the source), reported (a source says so), inferred (worked out from other facts), speculated (an educated guess).' },
    'topic-compare': { t: 'Compare', b: 'Side by side columns for options people mix up. The same rows for each, so the differences jump out.' },

    /* proof marks */
    'mark-human': { t: '● Human outcome', b: 'Green dot: measured in people, not mice or a dish. Trials, surveys, case series, records, drug labels.', w: 'The only level that shows what happens in a body like yours.' },
    'mark-tissue': { t: '◆ Human tissue in a dish', b: 'Blue diamond: real human skin, follicles or tissue kept alive in a lab and treated there.', w: 'Closer than mice. Still no blood, immune system or living person.' },
    'mark-animal': { t: '▲ Animal only', b: 'Yellow triangle: shown in mice, rats, dogs or other animals, not yet in people.', w: 'Most animal results never repeat in humans.' },
    'mark-cells': { t: '■ Cells only', b: 'Lilac square: a dish of cells. No tissue, no body.', w: 'Shows something can happen, not that it happens in you.' },
    'mark-theory': { t: '○ Theory', b: 'Open circle: reasoned from how it works, never tested.', w: 'An idea, not a result.' },
    'mark-clash': { t: '≠ Results clash', b: 'Animal or dish results point one way, human results the other. Example: Tβ4 grew mouse hair but slowed human follicles.', w: 'When they clash, the human result wins.' },

    /* grades */
    'proven': { t: 'Proven', b: 'Several good human trials agree. The question is settled, even if it does not work for everyone.' },
    'likely': { t: 'Likely', b: 'Decent human evidence points one way, but the trials are few, small or short.', w: 'Probably true. The size of the effect may shrink with bigger trials.' },
    'plausible': { t: 'Plausible', b: 'Makes sense from how it works and early data, but not yet shown well in people.' },
    'unproven': { t: 'Unproven', b: 'No good evidence either way.', w: 'Missing proof is not proof it fails. It is just missing.' },
    'myth': { t: 'Myth', b: 'Tested and failed, or contradicted by the evidence.', w: 'Popular does not mean true.' },

    /* confidence marks */
    'verified': { t: 'Verified', b: 'Checked against the original source: the paper, the label, the trial register.' },
    'reported': { t: 'Reported', b: 'A source says so, but we could not trace it back to the original.' },
    'inferred': { t: 'Inferred', b: 'Not stated anywhere directly. Worked out from facts that are.' },
    'speculated': { t: 'Speculated', b: 'An educated guess. Flagged so you can weigh it as one.' },

    /* study types */
    'rct': { t: 'RCT', pl: 'randomised controlled trials', b: 'Randomised controlled trial: people split by chance into a treatment group and a placebo (or other treatment) group.', w: 'Chance splitting makes it fair. The strongest single kind of study.' },
    'meta': { t: 'Meta-analysis', pl: 'trials pooled', b: 'Many trials pooled into one bigger answer.', w: 'Only as good as the trials inside it.' },
    'nma': { t: 'Network meta-analysis', b: 'Compares many treatments at once, even pairs never tested head to head, by linking them through a shared comparison such as placebo.', w: 'Puts every option on one yardstick.' },
    'review': { t: 'Review', b: 'A summary of studies, without pooling them into one number.', w: 'A useful map. Weaker proof than a meta-analysis.' },
    'cochrane': { t: 'Cochrane', b: 'An independent group known for strict reviews of medical evidence.', w: 'If Cochrane calls the evidence weak, it usually is.' },
    'nice': { t: 'NICE', b: 'England’s health guidance body. It weighs the evidence, and the cost, before recommending a treatment.' },
    'cohort': { t: 'Cohort', b: 'A group followed over time to see who develops what.', w: 'Shows links, not cause.' },
    'observational': { t: 'Observational', b: 'Researchers watched what happened; they did not assign the treatment.', w: 'People who chose a treatment may differ in other ways.' },
    'survey': { t: 'Survey', pl: 'people surveyed', b: 'Many people asked what happened to them.', w: 'Memory and who bothers to answer bend the numbers.' },
    'reports': { t: 'Reports', pl: 'reports', b: 'First-hand accounts from forums or Reddit, counted by person.', w: 'Real experiences. No placebo group, and the very happy and very unhappy post most.' },
    'forum-study': { t: 'Forum study', b: 'Researchers read forum posts systematically and counted what people said.', w: 'Better than one thread. Still self-selected people.' },
    'records': { t: 'Records', b: 'Health records or app data, often from thousands of people.', w: 'Big numbers, messy details. Shows links, not cause.' },
    'cases': { t: 'Case report or series', pl: 'patients written up', b: 'One or a few patients written up by their doctor.', w: 'Good for spotting rare effects. No comparison group.' },
    'pilot': { t: 'Pilot', b: 'A small first test to see whether a bigger study is worth running.', w: 'Interesting, not conclusive.' },
    'label': { t: 'Label', b: 'The official drug label, built from the trials that got it approved.', w: 'The most checked dose and side effect data there is.' },
    'pk': { t: 'PK (pharmacokinetics)', b: 'How the body absorbs, moves and clears a compound: how fast it peaks, how long it stays.', w: 'Tells you how long it lasts, not whether it works.' },
    'negative': { t: 'Negative', b: 'Tested properly and found no effect beyond placebo.', w: 'A negative result is still a result.' },
    'split-face': { t: 'Split face', b: 'One side of the face gets the treatment, the other side the comparison.', w: 'Each person is their own control, so small groups still say something.' },
    'dish': { t: 'Dish (ex vivo)', b: 'Human tissue, such as skin or hair follicles, kept alive in a lab and treated there. Gets the blue diamond ◆.', w: 'Real human tissue, but no blood supply, immune system or body.' },
    'trial': { t: 'Trial', pl: 'trials', b: 'A study where researchers give a treatment on purpose and measure what happens. Clinical trial means in people.' },
    'coming': { t: 'Coming', b: 'A trial is registered or running. No results yet.', w: 'It cannot count as evidence until it reports.' },
    'trial-safety': { t: 'Trial safety', b: 'Side effects counted inside a trial, against a comparison group.', w: 'Better than anecdotes: you can see what the placebo group got too.' },
    'double-blind': { t: 'Double-blind', b: 'Neither the people in the trial nor the researchers know who got the real thing until the end.', w: 'Stops hopes from colouring the results.' },
    'open-label': { t: 'Open-label', b: 'Everyone knows who got the real treatment.', w: 'Expectations can inflate the results.' },
    'placebo': { t: 'Placebo', b: 'A dummy treatment that looks the same as the real one.', w: 'What a treatment does beyond placebo is its real effect. In skin trials the dummy cream often helps a lot on its own.' },
    'vehicle': { t: 'Vehicle', b: 'The cream or gel base without the active ingredient. The skin version of a placebo.', w: 'It often moisturises enough to help on its own.' },
    'phase-1': { t: 'Phase 1', b: 'First time in people. A small group, often healthy volunteers, checking safety and dose.', w: 'Says almost nothing about whether it works.' },
    'phase-2': { t: 'Phase 2', b: 'Tens to a few hundred patients. The first real look at whether it works and at what dose.', w: 'Many drugs fail here.' },
    'phase-3': { t: 'Phase 3', b: 'The big final test before approval. Hundreds to thousands of people, usually against a placebo.', w: 'A drug that passes phase 3 is close to the pharmacy shelf.' },
    'phase-4': { t: 'Phase 4', b: 'After approval: watching how a drug does in the real world.', w: 'This is where rare side effects turn up.' },
    'people': { t: 'Group size', b: 'How many people were studied.', w: 'Bigger groups give steadier answers. Under about 30 is a first look, not a verdict.' },
    'regulator': { t: 'Regulator', b: 'A government drug authority, such as the US FDA or Europe’s EMA. Its statements cover safety and approval.', w: 'Careful and slow, on purpose.' },

    /* numbers */
    'times-placebo': { t: 'Times placebo', b: 'Compares the treated group with the dummy group. "3 times placebo" means 3 times as often or as much as people on the dummy got.', w: 'Ask what the placebo number was: 3 times 1 in 100 is still 3 in 100.' },
    'rr': { t: 'Relative risk (RR)', b: 'How many times more likely something is in the treated group. RR 3.4 means 3.4 times as likely; RR 1 means no difference.', w: 'Always check the starting risk.' },
    'odds-ratio': { t: 'Odds ratio (OR)', b: 'Another way to say how much more likely an outcome is with the treatment. 1 means no difference, above 1 more likely, below 1 less likely.' },
    'nnt': { t: 'NNT (number needed to treat)', b: 'How many people must take it for one extra person to benefit.', w: 'Lower is better. 1 would be perfect; 20 means 19 of 20 get nothing extra.' },
    'ci': { t: 'Confidence interval (CI)', b: 'The range the true answer probably sits in. Narrow means precise.', w: 'If the range crosses "no difference", the effect might be nothing.' },
    'p-value': { t: 'p-value', b: 'How surprising the result would be if the treatment did nothing. Under 0.05 is the usual bar.', w: 'It says nothing about how big or useful the effect is.' },
    'salt': { t: 'SALT score', b: 'How much of the scalp is bald, from 0 to 100%. Used in alopecia areata trials. "SALT 20 or less" means at least 80% covered.', w: 'Lower is better.' },
    'iga': { t: 'IGA', b: 'Investigator’s global assessment: a doctor’s 0 to 4 rating of how the skin looks. "Clear or almost clear" (0 or 1) is the usual win in acne trials.' },
    'hair-density': { t: 'Hairs per cm²', b: 'Hairs counted in a marked square centimetre of scalp, often with a camera. The standard measure in hair trials.', w: '+13 means 13 more hairs in that small square, not 13% more hair.' },
    'absolute': { t: 'Absolute numbers', b: 'How many people out of 100 it happened to.', w: '"3 in 100 vs 1 in 100" tells you more than "3 times".' },
    'effect-size': { t: 'Effect size', b: 'How big the difference was, not just whether there was one.', w: 'A real effect can still be too small to notice in a mirror.' },

    /* legal and sport */
    'fda': { t: 'FDA', b: 'The US Food and Drug Administration, which approves medicines. FDA ✓ means approved for a named use.', w: 'Approval covers that use and dose, not every way people use it.' },
    'fda-review': { t: 'FDA review', b: 'The company has applied and the FDA is deciding.', w: 'Not approved yet. Reviews can say no.' },
    'rx': { t: 'Rx ✓', b: 'Prescription only: a doctor has to prescribe it. "Rx outside US" means approved in some other countries, not in the US.' },
    'h-trial': { t: 'In human trials', b: 'Being tested in people now. No approval anywhere yet.' },
    'wada': { t: 'WADA', b: 'The World Anti-Doping Agency. Its list decides what tested athletes cannot take.', w: 'Banned for sport says nothing about safety, and the reverse.' },
    's0': { t: 'S0', b: 'WADA’s "non-approved substances" class: anything not approved for human use anywhere is banned for tested athletes, in and out of competition.' },
    'research-chemical': { t: 'Research chemical', b: 'Sold "not for human use".', w: 'No regulator checks purity, dose or what is actually in the vial.' },
    'unapproved': { t: 'Unapproved everywhere', b: 'No country has approved it as a medicine.', w: 'Every human use is outside the rules and outside quality checks.' },
    'compounded': { t: 'Compounded', b: 'Mixed by a pharmacy for one patient instead of made in a licensed factory.', w: 'Less checking than an approved product.' },
    'off-label': { t: 'Off-label', b: 'An approved drug used for something its approval does not cover. Doctors may prescribe it this way.', w: 'The evidence for that use is often thinner.' },
    'russia': { t: 'Registered in Russia', b: 'Approved as a medicine in Russia, and sometimes nearby countries. Not by the FDA or Europe’s regulator.' },
    'nct': { t: 'NCT number', b: 'A trial’s ID on ClinicalTrials.gov, the US public trial register. Search it to see the design, size and status.' },
    'pmid': { t: 'PMID', b: 'A paper’s ID on PubMed, the main index of medical research. Paste it into PubMed to find the abstract.' },
    'doi': { t: 'DOI', b: 'A permanent ID for a paper. The link keeps working even if the journal moves its website.' },

    /* body words that come up on these pages */
    'dht': { t: 'DHT', b: 'Dihydrotestosterone, a stronger form of testosterone. It shrinks scalp follicles in pattern hair loss and drives oil glands in acne.', w: 'Finasteride and dutasteride work by lowering it.' },
    'igf-1': { t: 'IGF-1', b: 'A growth signal the liver makes when growth hormone rises. Drives growth and repair, and also turns up oil glands.', w: 'One reason growth hormone peptides can bring breakouts.' },
    'telogen': { t: 'Telogen', b: 'The resting phase of a hair. It stops growing, then sheds about 3 months later. Telogen effluvium is mass shedding after a shock: illness, crash dieting, fast weight loss.' },
    'anagen': { t: 'Anagen', b: 'The growing phase of a hair, lasting years on the scalp.', w: 'Longer anagen means longer, thicker hair.' },
    'tewl': { t: 'TEWL', b: 'Transepidermal water loss: how much water escapes through the skin.', w: 'Lower means a stronger skin barrier.' }
  };

  /* ---------- chip text -> key ---------- */
  var A = {
    'who and where': 'topic-who', 'what studies found': 'topic-studies', 'what people report': 'topic-reports', 'seen by a doctor': 'topic-doctor',
    'how people use it': 'topic-use', 'weigh this': 'topic-weigh', 'stop, see a doctor': 'topic-stop', 'stop see a doctor': 'topic-stop',
    'dose and timing': 'topic-dose', 'legal and sport status': 'topic-legal', 'grade': 'topic-grade', 'grades': 'topic-grade',
    'fun facts and stories': 'topic-fun', 'how it works': 'topic-how', 'tests and tracking': 'topic-tests', 'coming next': 'topic-next',
    'how this was made': 'topic-made', 'confidence marks': 'topic-confidence',
    '●': 'mark-human', 'human outcome': 'mark-human', 'human': 'mark-human', 'human rct': 'rct', 'human meta': 'meta', 'human obs.': 'observational',
    '◆': 'mark-tissue', 'human tissue in a dish': 'mark-tissue', 'human tissue': 'dish', 'human skin': 'dish', 'human follicles': 'dish', 'human follicle': 'dish',
    'dish': 'dish', 'ex vivo': 'dish', 'ex vivo, in a dish': 'dish',
    '▲': 'mark-animal', 'animal': 'mark-animal', 'animal only': 'mark-animal', 'animals': 'mark-animal', 'rats': 'mark-animal', 'rat': 'mark-animal', 'mice': 'mark-animal', 'rats, mice': 'mark-animal',
    '■': 'mark-cells', 'cells': 'mark-cells', 'cells only': 'mark-cells', 'lab': 'mark-cells', 'in vitro': 'mark-cells',
    '○': 'mark-theory', 'theory': 'mark-theory', 'no human data': 'mark-theory', 'no trial': 'mark-theory',
    '≠': 'mark-clash', '≠ clash': 'mark-clash', 'clash': 'mark-clash', 'results clash': 'mark-clash', 'results conflict': 'mark-clash', 'conflict': 'mark-clash', '≠ results conflict': 'mark-clash', '≠ conflict': 'mark-clash', 'animal vs dish clash': 'mark-clash',
    'proven': 'proven', 'likely': 'likely', 'plausible': 'plausible', 'unproven': 'unproven', 'myth': 'myth',
    'verified': 'verified', 'reported': 'reported', 'inferred': 'inferred', 'speculated': 'speculated',
    'rct': 'rct', 'rcts': 'rct', 'randomised trial': 'rct', 'meta': 'meta', 'meta-analysis': 'meta', 'network meta-analysis': 'nma', 'nma': 'nma',
    'review': 'review', 'systematic review': 'review', 'cochrane': 'cochrane', 'nice': 'nice', 'cohort': 'cohort', 'observ.': 'observational', 'observational': 'observational',
    'survey': 'survey', 'reports': 'reports', 'community': 'reports', 'users': 'reports', 'forum study': 'forum-study', 'records': 'records', 'registry': 'records',
    'case': 'cases', 'cases': 'cases', 'case series': 'cases', 'case report': 'cases', 'pilot': 'pilot', '3-person pilot': 'pilot', 'label': 'label', 'pk': 'pk',
    'negative': 'negative', 'split face': 'split-face', 'split-face': 'split-face', 'trial': 'trial', 'trials': 'trial', 'coming': 'coming',
    'trial safety': 'trial-safety', 'double-blind': 'double-blind', 'open-label': 'open-label', 'open': 'open-label', 'placebo': 'placebo', 'vehicle': 'vehicle', 'vehicle or base': 'vehicle',
    'regulator': 'regulator', 'authority': 'regulator', 'regulatory': 'regulator',
    'phase 1': 'phase-1', 'phase 2': 'phase-2', 'phase 3': 'phase-3', 'phase 4': 'phase-4',
    'odds ratio': 'odds-ratio', 'nnt': 'nnt', 'ci': 'ci', '95% ci': 'ci', 'salt': 'salt', 'salt score': 'salt', 'iga': 'iga', 'rr': 'rr',
    'hairs/cm²': 'hair-density', 'hairs per cm²': 'hair-density',
    'fda': 'fda', 'fda ✓': 'fda', 'fda approved': 'fda', 'fda-approved': 'fda', 'fda review': 'fda-review', 'rx ✓': 'rx', 'rx': 'rx', 'rx outside us': 'rx',
    'h.trial': 'h-trial', 'in human trials': 'h-trial', 'wada': 'wada', 'wada-banned': 'wada', 's0': 's0', 'banned': 'wada',
    'research chemical': 'research-chemical', 'unapproved everywhere': 'unapproved', 'unapproved': 'unapproved', 'compounded': 'compounded', 'off-label': 'off-label',
    'registered in russia': 'russia', 'pmid': 'pmid', 'doi': 'doi', 'nct': 'nct',
    'dht': 'dht', 'igf-1': 'igf-1', 'telogen': 'telogen', 'anagen': 'anagen', 'tewl': 'tewl'
  };
  /* class fallbacks when the words alone do not match (Case pages' study chips) */
  var CLS = [['e-ho', 'mark-human'], ['e-an', 'mark-animal'], ['e-a', 'mark-animal'], ['e-ce', 'mark-cells'], ['e-c', 'mark-cells'], ['e-th', 'mark-theory'], ['e-t', 'mark-theory'],
    ['e-x', 'dish'], ['e-cf', 'mark-clash'], ['e-ng', 'negative'], ['e-rct', 'rct'], ['e-m', 'meta'], ['e-r', 'reports']];
  var PMK = { h: 'mark-human', t: 'mark-tissue', a: 'mark-animal', c: 'mark-cells', o: 'mark-theory', x: 'mark-clash' };
  var TOPIC = { who: 1, studies: 1, reports: 1, doctor: 1, use: 1, weigh: 1, stop: 1, dose: 1, legal: 1, grade: 1, fun: 1, how: 1, tests: 1, next: 1, made: 1, confidence: 1, compare: 1 };
  var CHIPS = '.ev,.st,.chip,.tag,.gr,.fda,.htr,.nx,.cf,.u2,.mh,.bs-fda';
  var SKIP = 'nav,.bsn,.bsx,.bsx-bg,#bs-prog,.bse-pop,[data-x-off],script,style,svg,textarea,select,input,option,code,pre,title';
  var INTER = 'a,button,summary,label,select,[onclick],[role=button],[role=tab],[role=link]';

  /* phrases explained inside running text: [regex, key, echo(match) -> title or null, cap per page] */
  var PROSE = [
    [/\b(\d+(?:\.\d+)?)\s+times\s+(?:the\s+)?placebo(?:\s+rate)?/i, 'times-placebo', function (m) { return 'About ' + m[1] + ' times placebo'; }, 20],
    [/\bhairs?\s+(?:per\s+cm²|\/\s?cm²)/i, 'hair-density', null, 20],
    [/\bphase\s?([1-4])[ab]?\b/i, null, null, 12],
    [/\bSALT(?:\s+score)?\b/, 'salt', null, 12],
    [/\bIGA\b/, 'iga', null, 8], [/\bNNT\b|\bnumber needed to treat\b/i, 'nnt', null, 8], [/\bodds ratios?\b/i, 'odds-ratio', null, 8],
    [/\b95% CI\b|\bCI\b(?=\s?[\d(:])/, 'ci', null, 8], [/\bRR\s?\d/, 'rr', null, 8], [/\bp\s?[<=]\s?0?\.\d+/, 'p-value', null, 6],
    [/\bnetwork meta-analys[ie]s\b/i, 'nma', null, 6], [/\bmeta-analys[ie]s\b/i, 'meta', null, 8],
    [/\b(\d[\d,]*)\s+RCTs\b/, 'rct', function (m) { return m[1] + ' ' + T.rct.pl; }, 10], [/\bRCTs?\b/, 'rct', null, 10],
    [/\bCochrane\b/, 'cochrane', null, 4], [/\bNICE\b/, 'nice', null, 4], [/\bdouble-blind(?:ed)?\b/i, 'double-blind', null, 6],
    [/\bopen-label\b/i, 'open-label', null, 6], [/\bsplit[- ]face\b/i, 'split-face', null, 6], [/\bex vivo\b/i, 'dish', null, 6],
    [/\bin vitro\b/i, 'mark-cells', null, 6], [/\bvehicle\b/i, 'vehicle', null, 6], [/\boff-label\b/i, 'off-label', null, 6],
    [/\bcompounded\b|\bcompounding\b/i, 'compounded', null, 6], [/\bresearch chemicals?\b/i, 'research-chemical', null, 6],
    [/\bWADA\b/, 'wada', null, 6], [/\bS0\b/, 's0', null, 6], [/\bFDA\b/, 'fda', null, 10], [/\bDHT\b/, 'dht', null, 8],
    [/\bIGF-1\b/, 'igf-1', null, 8], [/\btelogen\b/i, 'telogen', null, 6], [/\banagen\b/i, 'anagen', null, 4], [/\bTEWL\b/, 'tewl', null, 4],
    [/\bplacebo\b/i, 'placebo', null, 6]
  ];

  /* ---------- CSS ---------- */
  var css = '' +
    '.bse-k{cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}' +
    '.bse-u{text-decoration:underline dotted rgba(62,74,128,.55);text-decoration-thickness:1.5px;text-underline-offset:3px}' +
    '.bse-k:focus-visible,.bse-i:focus-visible{outline:2px solid #3E4A80;outline-offset:2px}' +
    '.bse-k[aria-expanded=true].bse-u{background:#FFFFF4;text-decoration-style:solid}' +
    '.bse-i{display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;margin:0 0 0 3px;padding:0;border:1.2px solid #3E4A80;border-radius:50%;background:#FFFFF4;color:#3E4A80;font:600 9.5px/1 "JetBrains Mono",ui-monospace,monospace;vertical-align:1px;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;position:relative}' +
    '.bse-i::after{content:"";position:absolute;inset:-8px}' +
    '.bs-fda{display:inline-block;padding:1px 4px;margin:0 1px;border:1px solid #C02626!important;background:#FBE3E1!important;color:#C02626!important;font-weight:600;font-size:.86em;line-height:1.15;letter-spacing:.02em;vertical-align:baseline;border-radius:0;white-space:nowrap}' +
    '.bse-pop{position:fixed;z-index:2147483000;left:0;top:0;width:min(320px,calc(100vw - 16px));max-height:min(60vh,420px);overflow:auto;background:#FFFFE2;color:#3E4A80;border:1.5px solid #3E4A80;box-shadow:3px 3px 0 #E3E0BF;padding:12px 34px 12px 14px;font:400 15px/1.5 "Hanken Grotesk",system-ui,sans-serif;text-align:left;-webkit-text-size-adjust:100%;opacity:0;transform:translateY(-3px);transition:opacity .14s ease,transform .14s ease;overscroll-behavior:contain}' +
    '.bse-pop.on{opacity:1;transform:none}' +
    '.bse-pop.sheet{left:0!important;right:0;top:auto!important;bottom:0;width:100%;max-height:55vh;border-width:1.5px 0 0;box-shadow:0 -3px 0 #E3E0BF;padding:16px 44px calc(16px + env(safe-area-inset-bottom)) 18px;transform:translateY(8px)}' +
    '.bse-pop.sheet.on{transform:none}' +
    '.bse-pop .bse-t{display:block;font:600 11px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.07em;text-transform:uppercase;margin:0 0 5px}' +
    '.bse-pop .bse-t i{font-style:normal;display:inline-block;width:10px;height:10px;margin-right:6px;vertical-align:-1px;border:1px solid rgba(62,74,128,.3)}' +
    '.bse-pop p{margin:0}' +
    '.bse-pop .bse-w{margin-top:7px;padding-top:7px;border-top:1px dashed #E3E0BF;font-size:14px}' +
    '.bse-pop .bse-w b{font:600 10px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.07em;text-transform:uppercase;margin-right:5px}' +
    '.bse-pop .bse-s+.bse-s{margin-top:11px;padding-top:11px;border-top:1.5px solid #E3E0BF}' +
    '.bse-pop .bse-x{position:absolute;top:6px;right:6px;width:26px;height:26px;border:0;background:transparent;color:#3E4A80;font:500 17px/1 "Hanken Grotesk",system-ui,sans-serif;cursor:pointer;padding:0}' +
    '.bse-pop .bse-x::after{content:"";position:absolute;inset:-6px}' +
    '@media (prefers-reduced-motion:reduce){.bse-pop{transition:none}}';
  var st = D.createElement('style'); st.id = 'bse-css'; st.textContent = css; (D.head || D.documentElement).appendChild(st);

  /* ---------- matching ---------- */
  function norm(s) { return (s || '').replace(/ /g, ' ').replace(/^\s*§\s*/, '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function lookup(text, el) {
    var raw = norm(text), out = [], m;
    function add(k, echo) { if (T[k] && !out.some(function (o) { return o.k === k; })) out.push({ k: k, echo: echo || null }); }
    if (!raw || raw.length > 60) return out;
    if (el && el.classList && el.classList.contains('nx') && !/nct\d/.test(raw)) add('coming');
    if (A[raw]) add(A[raw]);
    if ((m = raw.match(/^(\d[\d,]*)\s+(rcts?|randomised trials)\b/))) add('rct', m[1] + ' ' + T.rct.pl);
    else if ((m = raw.match(/^(\d[\d,]*)\s+(trials|studies)\b/))) add('trial', m[1] + ' ' + m[2]);
    if ((m = raw.match(/\b(nct\d{6,})\b/))) add('nct', m[1].toUpperCase());
    if ((m = raw.match(/\bpmid\s?(\d+)/))) add('pmid', 'PMID ' + m[1]);
    if ((m = raw.match(/\b(rct )?phase\s?([1-4])/))) { if (m[1]) add('rct'); add('phase-' + m[2]); }
    if ((m = raw.match(/(\d+(?:\.\d+)?)\s*times\s+(the\s+)?placebo/))) add('times-placebo', 'About ' + m[1] + ' times placebo');
    if ((m = raw.match(/^(?:human outcome · )?(\d[\d,]*)\s+(people|women|men|patients|teens|adults|volunteers)\b/)) || (m = raw.match(/·\s*(\d[\d,]*)\s+(people|women|men|patients)\b/))) add('people', m[1] + ' ' + m[2]);
    if ((m = raw.match(/^(\d[\d,]*)\s+cases\b/))) add('cases', m[1] + ' ' + T.cases.pl);
    if (!out.length || raw.indexOf('·') > -1 || raw.indexOf(',') > -1) {
      raw.split(/\s*[·,|]\s*/).forEach(function (p) {
        if (!p) return;
        if (A[p]) { add(A[p]); return; }
        var w = p.split(' ');
        for (var n = Math.min(4, w.length); n > 0; n--) for (var i = 0; i + n <= w.length; i++) { var g = w.slice(i, i + n).join(' '); if (A[g] && g.length > 1) add(A[g]); }
      });
    }
    if (!out.length && el && el.classList) for (var c = 0; c < CLS.length; c++) if (el.classList.contains(CLS[c][0])) { add(CLS[c][1]); break; }
    if (out.length > 1 && out[0].k === 'coming') out = out.filter(function (o) { return o.k !== 'trial'; });
    out.sort(function (a, b) { return (a.k === 'people') - (b.k === 'people'); });
    return out.slice(0, 3);
  }

  /* ---------- binding ---------- */
  var seq = 0, curCache = new WeakMap();
  function pointer(el) {
    if (!el || el.nodeType !== 1) return false;
    if (curCache.has(el)) return curCache.get(el);
    var v = false; try { v = getComputedStyle(el).cursor === 'pointer'; } catch (e) {}
    curCache.set(el, v); return v;
  }
  function interactive(el) { return el.matches(INTER) ? el : el.closest(INTER); }
  function bind(el, list, opts) {
    if (!list.length || el.__bse) return;
    el.__bse = list;
    var host = interactive(el) || (pointer(el) && !(opts && opts.own) ? el : null);
    if (host) {
      /* never hijack a link or control: put a small (i) beside it */
      var b = D.createElement('span');
      b.className = 'bse-i'; b.textContent = 'i'; b.setAttribute('role', 'button'); b.tabIndex = 0;
      b.setAttribute('aria-label', 'What does ' + (T[list[0].k].t) + ' mean?'); b.setAttribute('aria-expanded', 'false');
      b.__bse = list; b.setAttribute('data-bse', '');
      if (host === el && el.matches('a,button')) el.insertAdjacentElement('afterend', b);
      else el.insertAdjacentElement('afterend', b);
      return;
    }
    el.setAttribute('data-bse', '');
    el.classList.add('bse-k');
    if (opts && opts.u) el.classList.add('bse-u');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
    el.setAttribute('aria-expanded', 'false');
  }
  function keysFromAttr(el) {
    return (el.getAttribute('data-x') || '').split(/[\s,]+/).filter(function (k) { return T[k]; }).map(function (k) { return { k: k, echo: el.getAttribute('data-x-echo') || null }; });
  }
  function skip(el) { return !el || el.closest(SKIP); }

  var used = {};
  function scan(root) {
    root = root || D.body; if (!root || root.nodeType !== 1) return;
    var q = function (s) { var a = [].slice.call(root.querySelectorAll(s)); if (root.matches && root.matches(s)) a.unshift(root); return a; };
    /* (a) explicit data-x */
    q('[data-x]').forEach(function (el) {
      if (el.__bse || el.closest('.bse-pop,[data-x-off]')) return;
      var l = keysFromAttr(el); if (!l.length) return;
      var chipish = el.matches(CHIPS) || el.classList.contains('bs-fda');
      bind(el, l, { u: !chipish, own: chipish });
    });
    /* (c) topic squares */
    q('[data-topic]').forEach(function (el) {
      if (el.__bse || skip(el)) return;
      var v = (el.getAttribute('data-topic') || '').toLowerCase(); if (!TOPIC[v]) return;
      bind(el, [{ k: 'topic-' + v }], { own: true });
    });
    /* (b) chips and tags by their words */
    q(CHIPS).forEach(function (el) {
      if (el.__bse || skip(el) || el.closest('[data-bse]') || el.querySelector('[data-bse]')) return;
      if (el.children.length > 3) return;
      var l = lookup(el.textContent, el);
      var mk = el.querySelector('.pmk');
      if (mk) { var mc = mkKey(mk); if (mc && !l.some(function (o) { return o.k === mc; })) l.unshift({ k: mc }); mk.__bse = 1; }
      if (l.length) bind(el, l, { own: true });
    });
    /* proof mark shapes on their own */
    q('.pmk').forEach(function (el) { if (el.__bse || skip(el)) return; var k = mkKey(el); if (k) bind(el, [{ k: k }], { own: true }); });
    /* phrases inside running text */
    prose(root);
  }
  function mkKey(el) { for (var c in PMK) if (el.classList.contains(c)) return PMK[c]; return null; }

  var BLOCK = 'p,li,td,th,dd,dt,blockquote,figcaption,h2,h3,h4,div';
  function prose(root) {
    var w = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || n.nodeValue.length < 2 || !/[A-Za-z0-9]/.test(n.nodeValue)) return 2;
        if (p.closest(SKIP + ',' + INTER + ',[data-bse],.bse-i,sup,h1,.mt,' + CHIPS)) return 2;
        return 1;
      }
    });
    var nodes = [], n; while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentElement; if (pointer(p)) return;
      var blk = p.closest(BLOCK) || p; blk.__bseK = blk.__bseK || {};
      var guard = 0;
      while (node && guard++ < 8) {
        var best = null;
        for (var i = 0; i < PROSE.length; i++) {
          var r = PROSE[i], m = r[0].exec(node.nodeValue); if (!m) continue;
          var k = r[1] || ('phase-' + m[1]);
          if (!T[k] || blk.__bseK[k] || (used[k] || 0) >= r[3]) continue;
          if (!best || m.index < best.m.index) best = { m: m, k: k, echo: r[2] ? r[2](m) : null };
        }
        if (!best) break;
        var mid = node.splitText(best.m.index), rest = mid.splitText(best.m[0].length);
        var s = D.createElement('span'); s.textContent = mid.nodeValue; mid.parentNode.replaceChild(s, mid);
        blk.__bseK[best.k] = 1; used[best.k] = (used[best.k] || 0) + 1;
        if (best.k === 'fda') s.className = 'bs-fda';
        bind(s, [{ k: best.k, echo: best.echo }], { u: best.k !== 'fda', own: true });
        node = rest;
      }
    });
  }

  /* ---------- popover ---------- */
  var pop = null, anchor = null, y0 = 0, t0 = 0, popId = 'bse-pop';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var SW = { 'topic-who': '#87CFC5', 'topic-studies': '#AACC96', 'topic-reports': '#B493E8', 'topic-doctor': '#99ACFF', 'topic-use': '#E1DE62', 'topic-weigh': '#DB6830', 'topic-stop': '#E00000', 'topic-made': '#E3E0BF', 'topic-dose': '#E1DE62' };
  function html(list) {
    return list.map(function (o) {
      var e = T[o.k], title = o.echo ? o.echo : e.t;
      var body = e.b;
      if (o.echo && e.pl && o.k !== 'people') body = e.t + ': ' + body.charAt(0).toLowerCase() + body.slice(1);
      if (o.k === 'people' && o.echo) body = 'How many were studied: ' + o.echo + '.';
      return '<div class="bse-s"><span class="bse-t">' + (SW[o.k] ? '<i style="background:' + SW[o.k] + '"></i>' : '') + esc(title) + '</span><p>' + esc(body) + '</p>' +
        (e.w ? '<p class="bse-w"><b>Why it matters</b>' + esc(e.w) + '</p>' : '') + '</div>';
    }).join('');
  }
  function open(el, list) {
    close(true);
    if (typeof el === 'string') { list = [{ k: el }]; el = list && arguments[1] && arguments[1].nodeType ? arguments[1] : null; }
    list = list || el.__bse; if (!list || !list.length) return;
    pop = D.createElement('div');
    pop.className = 'bse-pop'; pop.id = popId + '-' + (++seq); pop.setAttribute('role', 'tooltip');
    pop.innerHTML = html(list) + '<button type="button" class="bse-x" aria-label="Close">×</button>';
    D.body.appendChild(pop);
    anchor = el; y0 = window.scrollY; t0 = Date.now();
    if (el) { el.setAttribute('aria-expanded', 'true'); el.setAttribute('aria-describedby', pop.id); }
    place();
    requestAnimationFrame(function () { pop && pop.classList.add('on'); });
  }
  function place() {
    if (!pop) return;
    var vw = D.documentElement.clientWidth, vh = window.innerHeight, phone = vw < 600;
    if (!anchor) { pop.classList.add('sheet'); return; }
    var r = anchor.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) { close(); return; }
    pop.classList.remove('sheet');
    var w = pop.offsetWidth, h = pop.offsetHeight;
    var left = Math.max(8, Math.min(r.left, vw - w - 8)), top = r.bottom + 7;
    if (top + h > vh - 8) {
      top = r.top - 7 - h;
      if (top < 8) {
        if (phone) { pop.classList.add('sheet'); pop.style.left = ''; pop.style.top = ''; return; }
        top = Math.max(8, vh - h - 8);
      }
    }
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
  }
  function close(silent) {
    if (!pop) return;
    var p = pop; pop = null;
    if (anchor) { anchor.setAttribute('aria-expanded', 'false'); anchor.removeAttribute('aria-describedby'); }
    p.remove(); anchor = null;
  }

  D.addEventListener('click', function (e) {
    var t = e.target;
    if (pop && pop.contains(t)) { if (t.closest('.bse-x')) { var a = anchor; close(); a && a.focus && a.focus({ preventScroll: true }); } return; }
    var el = t.closest && t.closest('[data-bse]');
    if (!el) return;
    if (el.classList.contains('bse-i')) { e.preventDefault(); e.stopPropagation(); }
    if (anchor === el && pop) { close(); return; }
    open(el);
  }, true);
  D.addEventListener('pointerdown', function (e) {
    if (!pop) return;
    if (pop.contains(e.target) || (anchor && anchor.contains(e.target))) return;
    close();
  }, true);
  D.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && pop) { var a = anchor; close(); a && a.focus && a.focus({ preventScroll: true }); return; }
    if ((e.key === 'Enter' || e.key === ' ') && e.target.hasAttribute && e.target.hasAttribute('data-bse') && !e.target.matches('a,button,input,textarea,select,summary')) {
      e.preventDefault(); var el = e.target;
      if (anchor === el && pop) close(); else open(el);
    }
  });
  window.addEventListener('scroll', function () { if (!pop) return; if (Date.now() - t0 < 300) y0 = window.scrollY; if (Math.abs(window.scrollY - y0) > 120) close(); else place(); }, { passive: true });
  D.addEventListener('scroll', function (e) { if (pop && e.target !== D && !pop.contains(e.target)) place(); }, { passive: true, capture: true });
  window.addEventListener('resize', function () { place(); });

  /* ---------- start, and keep up with content pages draw later ---------- */
  var timer = null, pending = [];
  function later(n) { pending.push(n); if (!timer) timer = setTimeout(function () { var p = pending; pending = []; timer = null; p.forEach(function (r) { if (r.isConnected) scan(r); }); }, 160); }
  function start() {
    scan(D.body);
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        m.addedNodes.forEach(function (n) {
          if (n.nodeType !== 1 || n.classList.contains('bse-pop') || n.classList.contains('bse-i') || n.id === 'bse-css') return;
          if (n.tagName === 'SPAN' && n.__bse) return;
          later(n);
        });
      });
    }).observe(D.body, { childList: true, subtree: true });
  }
  window.BSEXPLAIN = {
    version: 'v1', terms: T,
    open: function (key, el) { if (!T[key]) return; open(el || null, [{ k: key }]); },
    close: close, scan: scan, lookup: lookup
  };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
