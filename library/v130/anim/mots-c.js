/* MOTS-c story v1 (22 Nov 2026). Scene: a muscle cell. MOTS-c is encoded in the mitochondrial 12S rRNA; it blocks the
   folate cycle so AICAR builds up and switches on AMPK (the exercise-like state: glucose in, fat burned), and under
   stress moves to the nucleus; then mouse studies and the honest human picture (no trial of MOTS-c itself). Matches the
   Bare Signals Library (verified). */
BSAnim.define('mots-c',function(H,INK){
 var TEAL='#2E8F82',GOLD='#C9A100',GLU='#4E9A3E',ORANGE='#DB6830',BLUE='#2F5BE0';
 var cellM='<rect x="4" y="16" width="352" height="196" rx="30" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2"/><rect x="12" y="24" width="336" height="180" rx="24" fill="none" stroke="'+INK+'" stroke-width="1" opacity=".5"/>';
 var mito='<g><rect x="34" y="150" width="104" height="44" rx="21" fill="#F3E8D8" stroke="'+INK+'" stroke-width="1.6"/><path d="M48 160Q70 160 70 172Q70 184 92 184M92 160Q114 160 114 172Q114 184 124 184" fill="none" stroke="'+INK+'" stroke-width="1.3"/></g>';
 var nucleus='<g><circle cx="286" cy="150" r="40" fill="#EDE8FB" stroke="'+INK+'" stroke-width="1.6"/><circle cx="286" cy="150" r="40" fill="none" stroke="'+INK+'" stroke-width="1" stroke-dasharray="2 3" opacity=".6"/><path d="M268 150q18 -12 36 0" fill="none" stroke="#B9A9E8" stroke-width="2"/></g>';
 function glut(x,up){return '<g transform="translate('+x+' 24)"><rect x="-6" y="'+(up?-6:0)+'" width="12" height="12" rx="2" fill="#CFE6DE" stroke="'+TEAL+'" stroke-width="1.3"/></g>'}
 var glutIn=[90,150,210].map(function(x){return glut(x,0)}).join('');
 var glutOut=[90,150,210].map(function(x){return glut(x,1)}).join('');
 var glucose=H.puffs([[90,10],[150,8],[210,10],[70,6],[180,5],[230,7]],'#D8F0D0',GLU,3.2);
 var fat=[[70,96,13],[120,110,10],[160,80,9]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+p[2]+'" fill="#FCEAB0" stroke="'+GOLD+'" stroke-width="1.3"/>'}).join('');
 function sw(on){var c=on?TEAL:'#B5B5B5',f=on?'#CFE6DE':'#ECECEC';return '<g transform="translate(196 112)"><rect x="-16" y="-11" width="32" height="22" rx="7" fill="'+f+'" stroke="'+c+'" stroke-width="2"/><circle cx="'+(on?7:-7)+'" cy="0" r="8" fill="'+c+'"/><text x="0" y="-18" style="font-size:9px" font-weight="700" text-anchor="middle" fill="'+INK+'">AMPK</text></g>'}
 var aicar='<g><circle cx="150" cy="150" r="10" fill="#FBE3DD" stroke="'+ORANGE+'" stroke-width="1.3"/><text x="150" y="153" style="font-size:7px" font-weight="700" text-anchor="middle">AICAR</text></g>';
 var MOL='<circle cx="316" cy="44" r="25" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/><path d="M302 48c3 -8 7 2 10 -5s7 3 10 -3" fill="none" stroke="'+BLUE+'" stroke-width="2.2" stroke-linecap="round"/><text class="tm" x="316" y="34" text-anchor="middle" style="font-size:8px">MOTS-c</text><text class="tm" x="316" y="60" text-anchor="middle" style="font-size:7px">16 AMINO ACIDS</text>';
 var FLOW='M96 168C140 150 150 130 180 118';
 var FLOWN='M150 118C190 110 230 130 258 142';
 var MBEAD=H.bead(0,0,'#A9BCFA',BLUE,4);
 /* study: mouse */
 var mouse=H.rodent(54,70,.9)+'<text class="tm" x="110" y="40" text-anchor="middle" opacity=".8">OLD MICE, TREATED vs NOT</text>'+
  '<g fill="none" stroke="'+INK+'" stroke-width="1.4"><circle cx="150" cy="150" r="34"/><circle cx="150" cy="150" r="5" fill="'+INK+'"/><path d="M150 150l20 -22"/></g><text class="tm" x="150" y="200" text-anchor="middle">RUN FURTHER</text>'+
  H.bars(220,186,100,42,[.5,.92],['#9AA0C8',TEAL],['OLD','OLD+MOTSc'])+'<text class="tm" x="266" y="44" text-anchor="middle">RUNNING ENDURANCE</text>'+
  '<text class="tm" x="180" y="208" text-anchor="middle" opacity=".8">BETTER GLUCOSE · LESS OBESITY</text>';
 /* study: human honest */
 var human='<path d="M40 150H320" stroke="'+INK+'" stroke-width="1.3"/><path d="M40 60V150" stroke="'+INK+'" stroke-width="1.3"/>'+
  '<path d="M48 140C90 138 110 110 150 96" fill="none" stroke="'+TEAL+'" stroke-width="2.4" stroke-linecap="round"/><text class="tm" x="100" y="80" fill="'+TEAL+'">EXERCISE ↑</text>'+
  '<path d="M180 96C220 108 250 126 312 138" fill="none" stroke="#9AA0C8" stroke-width="2.4" stroke-linecap="round"/><text class="tm" x="250" y="86" opacity=".8">AGE ↓</text>'+
  '<text class="tm" x="44" y="166" opacity=".7">BLOOD MOTS-c</text>'+
  '<text class="tm" x="180" y="186" text-anchor="middle" opacity=".9">NO HUMAN TRIAL OF MOTS-c ITSELF</text>'+
  '<text class="tm" x="180" y="202" text-anchor="middle" opacity=".7" style="font-size:8px">AN ANALOGUE (CB4211) DID A SMALL PHASE 1</text>';
 var base=['cellM','mito','nucleus'];
 return {
  title:'MOTS-c, a message from the mitochondria',aria:'Animated diagram: how MOTS-c, a peptide encoded in mitochondrial DNA, switches on AMPK to pull in glucose and burn fat like exercise and moves into the nucleus under stress, with mouse studies and the honest human picture.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'cellM',name:'Muscle cell',info:'MOTS-c’s main target organ in the studies is skeletal muscle.',svg:cellM},
   {id:'mito',name:'Mitochondrion',info:'MOTS-c is encoded inside the mitochondrial genome, not the cell’s nuclear DNA.',svg:mito},
   {id:'nucleus',name:'Nucleus',info:'Under metabolic stress MOTS-c moves here and helps regulate stress-response genes.',svg:nucleus},
   {id:'mol',name:'MOTS-c',info:'A 16-amino-acid peptide read from the mitochondrial 12S rRNA gene.',svg:MOL},
   {id:'motsc',name:'MOTS-c released',info:'The peptide leaving the mitochondrion to act on the rest of the cell.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:4,ms:3400,bead:MBEAD}},
   {id:'motsN',name:'MOTS-c to the nucleus',info:'Under stress it translocates into the nucleus.',svg:'<g class="flowg"></g>',flow:{path:FLOWN,n:3,ms:3400,bead:MBEAD}},
   {id:'aicar',name:'AICAR',info:'An AMP mimic that builds up when MOTS-c blocks the folate cycle; it switches on AMPK.',svg:aicar},
   {id:'ampkOff',name:'AMPK (off)',info:'The cell’s fuel-sensing switch, at rest.',svg:sw(0)},
   {id:'ampkOn',name:'AMPK (on)',info:'Switched on, it drives glucose uptake and fat burning, the same shift exercise makes.',svg:sw(1)},
   {id:'glutOut',name:'GLUT4 (stored)',info:'Glucose doors held inside the cell until AMPK calls them up.',svg:'<g>'+glutOut+'</g>'},
   {id:'glutIn',name:'GLUT4 (at the surface)',info:'Moved to the membrane, they let glucose into the cell.',svg:'<g>'+glutIn+'</g>'},
   {id:'glucose',name:'Glucose',info:'Blood sugar taken up and used for fuel.',svg:glucose},
   {id:'fat',name:'Fat droplets',info:'Stored fat, burned down when AMPK shifts the cell toward fat oxidation.',svg:'<g>'+fat+'</g>'},
   /* study */
   {id:'mouse',name:'Mouse studies',info:'Aged mice given MOTS-c ran further and handled glucose better; mice resisted diet-induced obesity.',svg:mouse},
   {id:'human',name:'Human picture',info:'Blood MOTS-c rises with exercise and falls with age; there is no completed human trial of MOTS-c itself.',svg:human}
  ],
  steps:[
   {key:'origin',btn:'Origin',title:'A message from the power plant',marks:[['c','Cell biology']],
    text:'MOTS-c is unusual: it is written inside the mitochondrion’s own DNA, the 12S rRNA gene, a 16-amino-acid peptide the power plant sends out to act on the rest of the cell.',
    model:'Cell biology (Lee 2015)',
    show:base.concat(['mol','motsc']),
    anim:[{p:'mol',type:'scale',from:.6,dur:700},{p:'motsc',type:'flow'}],
    labels:[{p:'mito',t:'Mitochondrial gene',x:6,y:208,ax:86,ay:172},{p:'mol',t:'MOTS-c',x:214,y:80,ax:300,ay:50}]},
   {key:'ampk',btn:'AMPK',title:'It flips the fuel switch',marks:[['c','Cell biology']],
    text:'MOTS-c blocks the folate cycle, so AICAR, an AMP mimic, builds up and switches on AMPK, the cell’s low-fuel sensor.',
    model:'Cell biology (Lee 2015)',
    show:base.concat(['motsc','aicar','ampkOff','ampkOn']),
    anim:[{p:'aicar',type:'scale',from:0,dur:700},{p:'ampkOff',type:'fadeOut',dur:500,delay:700},{p:'ampkOn',type:'scale',from:.7,delay:900,dur:700}],
    labels:[{p:'aicar',t:'AICAR builds up',x:6,y:208,ax:150,ay:160},{p:'ampkOn',t:'AMPK on',x:214,y:70,ax:196,ay:100}]},
   {key:'fuel',btn:'Fuel',title:'Glucose in, fat burned',marks:[['c','Cell biology']],
    text:'AMPK does what exercise does: it moves GLUT4 glucose doors to the cell surface to pull sugar in, and shifts the cell toward burning fat.',
    model:'Cell biology (Lee 2015)',
    show:base.concat(['ampkOn','glutOut','glutIn','glucose','fat']),
    anim:[{p:'glutOut',type:'fadeOut',dur:600},{p:'glutIn',type:'fadeIn',delay:500,dur:700,stagger:120},{p:'glucose',type:'move',each:[[0,-18],[0,-16],[0,-18],[0,0],[0,0],[0,0]],delay:900,dur:1600},{p:'fat',type:'shrink',sel:'circle',to:.4,delay:1000,dur:2200}],
    labels:[{p:'glutIn',t:'GLUT4 → glucose in',x:60,y:208,ax:150,ay:30},{p:'fat',t:'Fat burned',x:6,y:70,ax:120,ay:110}]},
   {key:'nucleus',btn:'Genes',title:'And into the nucleus',marks:[['c','Cell biology']],
    text:'Under metabolic stress MOTS-c also moves into the nucleus and helps tune stress-response and metabolic genes, so the effect is more than a quick switch.',
    model:'Cell biology (Reynolds 2021)',
    show:base.concat(['ampkOn','motsN']),
    anim:[{p:'motsN',type:'flow'}],
    labels:[{p:'motsN',t:'To the nucleus',x:150,y:92,ax:240,ay:138},{p:'nucleus',t:'Metabolic genes',x:214,y:208,ax:286,ay:150}]},
   {key:'exercise',btn:'Exercise',title:'An exercise-like state',marks:[['c','Cell biology']],
    text:'The net effect looks like exercise: more glucose handling, more fat use, more endurance. Blood MOTS-c even rises with exercise and falls with age.',
    model:'Cell and human-level studies',
    show:base.concat(['ampkOn','glutIn','glucose','fat']),
    anim:[{p:'glucose',type:'pulse',sel:'circle',to:1.15,dur:1500,stagger:120},{p:'ampkOn',type:'pulse',sel:'rect',to:1.06,dur:1600}],
    labels:[{p:'ampkOn',t:'Exercise-like',x:214,y:70,ax:196,ay:100}]},
   {key:'mice',btn:'Mice',study:1,title:'In mice: more endurance',marks:[['a','Mouse']],ms:6400,
    text:'The evidence is mainly mouse. MOTS-c improved glucose handling, raised running endurance (even in old mice), and made mice resist diet-induced obesity.',
    model:'Mice (Lee 2015; Reynolds 2021)',src:[{t:'Lee 2015, Cell Metab',u:'https://doi.org/10.1016/j.cmet.2015.02.009'},{t:'Reynolds 2021, Nat Commun',u:'https://doi.org/10.1038/s41467-020-20790-0'}],
    show:['mouse'],
    anim:[{p:'mouse',type:'grow',sel:'.g',dur:1500,delay:500,stagger:300}],
    labels:[{p:'mouse',t:'Runs further',x:150,y:210,ax:201,ay:150}]},
   {key:'people',btn:'People',study:1,title:'In people: not yet tested',marks:[['h','Human']],ms:6600,
    text:'In people, blood MOTS-c rises with exercise and falls with age, but there is no completed trial of MOTS-c itself. An analogue, CB4211, finished a small Phase 1 in fatty liver and obesity.',
    model:'Human blood levels; analogue Phase 1',src:[{t:'Reynolds 2021, Nat Commun',u:'https://doi.org/10.1038/s41467-020-20790-0'}],
    show:['human'],
    anim:[{p:'human',type:'draw',sel:'path',dur:2400,delay:400}],
    labels:[]}
  ]
 };
});
