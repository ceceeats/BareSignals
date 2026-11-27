/* 5-Amino-1MQ story v1 (22 Nov 2026). Scene: a fat cell. NNMT normally burns through nicotinamide and SAM, draining
   the NAD+ supply; 5-Amino-1MQ blocks NNMT, so NAD+ is rebuilt and the fat cell shifts toward spending energy and
   stores less; then a fat-cell study and a DIO-mouse study (mouse-only; no human data). Matches the Bare Signals
   Library (verified). */
BSAnim.define('5-amino-1mq',function(H,INK){
 var TEAL='#2E8F82',GOLD='#C9A100',BLUE='#2F5BE0',RED='#C0392B',PUR='#7A5CC8';
 var cell='<rect x="8" y="16" width="344" height="196" rx="40" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2"/><circle cx="54" cy="58" r="20" fill="#EDE8FB" stroke="'+INK+'" stroke-width="1.4"/><text class="tm" x="54" y="61" text-anchor="middle" style="font-size:7px">NUCLEUS</text>';
 var droplet='<circle cx="120" cy="128" r="70" fill="#FCEAB0" stroke="'+GOLD+'" stroke-width="1.8"/><text class="tm" x="120" y="131" text-anchor="middle" opacity=".7">LIPID STORE</text>';
 function enz(on){var c=on?'#A88400':'#B5B5B5',f=on?'#F6E2B0':'#ECECEC';return '<g transform="translate(250 72)"><path d="M-16 0A16 16 0 1 1 16 0 Q16 10 0 10 Q-16 10 -16 0Z" fill="'+f+'" stroke="'+c+'" stroke-width="1.6"/><text y="-2" style="font-size:8px" font-weight="700" text-anchor="middle" fill="'+INK+'">NNMT</text></g>'}
 var nam=H.puffs([[214,40],[236,34],[262,40]],'#D8F0D0','#4E9A3E',4);
 var sam=H.puffs([[286,40],[308,48]],'#E4D8FA',PUR,4);
 var mna='<g>'+[[250,120],[276,132]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4" fill="#E6DCC8" stroke="#9A8C6A" stroke-width="1"/>'}).join('')+'<text class="tm" x="263" y="150" text-anchor="middle" opacity=".7" style="font-size:7px">1-MNA WASTE</text></g>';
 function tank(fill){return '<g><rect x="306" y="96" width="34" height="96" rx="5" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.5"/><rect class="fill" x="309" y="'+(189-fill)+'" width="28" height="'+fill+'" rx="3" fill="'+TEAL+'"/><text class="tm" x="323" y="90" text-anchor="middle">NAD+</text></g>'}
 var MOL='<circle cx="60" cy="150" r="24" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/><g transform="translate(60 148)"><path d="M-9 4h18l-4 -8h-10z" fill="#FFFBDE" stroke="'+INK+'" stroke-width="1.2"/><circle cx="-9" cy="4" r="2.4" fill="#A9BCFA"/></g><text class="tm" x="60" y="168" text-anchor="middle" style="font-size:7px">5-AMINO-1MQ</text>';
 var FLOW='M40 150C70 150 70 110 90 96';
 var ABEAD='<path d="M-5 2h10l-2.5 -5h-5z" fill="#FFFBDE" stroke="'+INK+'" stroke-width="1"/>';
 var energy=H.puffs([[120,80],[150,110],[96,120],[140,150],[100,96]],'#FFF0A8',GOLD,3.2);
 /* study: fat cells in a dish */
 var dishsc='<text class="tm" x="180" y="30" text-anchor="middle">CULTURED FAT CELLS + NNMT INHIBITOR</text>'+
  H.bars(70,170,100,40,[.35,.88],['#9AA0C8',TEAL],['BEFORE','AFTER'])+'<text class="tm" x="116" y="44" text-anchor="middle">NAD+ & SAM</text>'+
  H.bars(230,170,100,40,[.85,.3],[GOLD,TEAL],['BEFORE','AFTER'])+'<text class="tm" x="276" y="44" text-anchor="middle">NEW FAT MADE</text>'+
  '<text class="tm" x="180" y="196" text-anchor="middle" opacity=".8">NAD+ UP · LIPOGENESIS DOWN</text>';
 /* study: DIO mice */
 var mouse=H.rodent(54,58,.9)+'<text class="tm" x="180" y="14" text-anchor="middle" opacity=".8">DIET-INDUCED OBESE MICE</text>'+
  H.bars(150,170,80,40,[1,.62],['#9AA0C8',TEAL],['VEHICLE','NNMTi'])+'<text class="tm" x="196" y="44" text-anchor="middle">BODY FAT</text>'+
  H.bars(276,170,70,40,[1,.98],['#9AA0C8','#9AA0C8'],['','' ])+'<text class="tm" x="306" y="44" text-anchor="middle">FOOD INTAKE</text>'+
  '<text class="tm" x="306" y="186" text-anchor="middle" opacity=".75">UNCHANGED</text>'+
  '<text class="tm" x="180" y="206" text-anchor="middle" opacity=".75" style="font-size:9px">MOUSE-ONLY · NO HUMAN DATA</text>';
 var base=['cell'];
 return {
  title:'5-Amino-1MQ in a fat cell',aria:'Animated diagram: how 5-Amino-1MQ blocks the enzyme NNMT so nicotinamide and SAM are spared, NAD+ rises, and the fat cell shifts toward spending energy and storing less, with a fat-cell study and a mouse study.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'cell',name:'Fat cell',info:'An adipocyte: most of its volume is one large droplet of stored fat.',svg:cell},
   {id:'droplet',name:'Lipid store',info:'The fat the cell holds; it shrinks when the cell spends more energy than it stores.',svg:droplet},
   {id:'nnmtOn',name:'NNMT (active)',info:'An enzyme, high in obese fat, that methylates nicotinamide and drains the NAD+ supply.',svg:enz(1)},
   {id:'nnmtOff',name:'NNMT (blocked)',info:'With NNMT blocked, nicotinamide and SAM are no longer wasted.',svg:enz(0)},
   {id:'nam',name:'Nicotinamide',info:'The raw material the cell needs to rebuild NAD+.',svg:nam},
   {id:'sam',name:'SAM',info:'The cell’s main methyl donor, also spent by NNMT.',svg:sam},
   {id:'mna',name:'1-MNA waste',info:'What NNMT turns nicotinamide into: a dead-end product.',svg:mna},
   {id:'nadLow',name:'NAD+ (low)',info:'With NNMT draining its raw material, the NAD+ tank runs low.',svg:tank(22)},
   {id:'nadHigh',name:'NAD+ (restored)',info:'With NNMT blocked, NAD+ is rebuilt and the tank fills.',svg:tank(84)},
   {id:'amino',name:'5-Amino-1MQ binding',info:'The small molecule crossing in to block NNMT.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:4,ms:3400,bead:ABEAD}},
   {id:'mol',name:'5-Amino-1MQ',info:'A small molecule (not a peptide) that inhibits NNMT. Taken as an oral capsule.',svg:MOL},
   {id:'energy',name:'Energy spent',info:'The fat cell shifts toward spending energy rather than storing it.',svg:energy},
   /* study */
   {id:'dishsc',name:'Fat cells in a dish',info:'Cultured adipocytes given an NNMT inhibitor.',svg:dishsc},
   {id:'mouse',name:'Obese mice',info:'Diet-induced obese mice given an NNMT inhibitor, against vehicle.',svg:mouse}
  ],
  steps:[
   {key:'fatcell',btn:'Fat cell',title:'A fat cell, NNMT running hot',marks:[['c','Cell biology']],
    text:'A fat cell stores energy as one big lipid droplet. In obese fat tissue an enzyme called NNMT runs hot, and that turns out to drain the cell’s energy supply.',
    model:'Cell biology',
    show:base.concat(['droplet','nnmtOn']),
    anim:[{p:'nnmtOn',type:'pulse',sel:'path',to:1.08,dur:1500}],
    labels:[{p:'droplet',t:'Stored fat',x:6,y:208,ax:120,ay:160},{p:'nnmtOn',t:'NNMT',x:214,y:40,ax:250,ay:66}]},
   {key:'drain',btn:'Drain',title:'It drains the NAD+ supply',marks:[['c','Cell biology']],
    text:'NNMT methylates nicotinamide using SAM. That spends two things at once: the raw material the cell needs to rebuild NAD+, and its main methyl donor. NAD+ runs low.',
    model:'Biochemistry',
    show:base.concat(['droplet','nnmtOn','nam','sam','mna','nadLow']),
    anim:[{p:'nam',type:'move',each:[[0,28],[0,30],[0,26]],dur:1600},{p:'sam',type:'move',each:[[-30,28],[-24,22]],dur:1600},{p:'mna',type:'fadeIn',sel:'circle',delay:1200,dur:700,stagger:150}],
    labels:[{p:'nam',t:'Nicotinamide + SAM spent',x:150,y:30,ax:236,ay:40},{p:'nadLow',t:'NAD+ low',x:252,y:208,ax:323,ay:170}]},
   {key:'block',btn:'Block',title:'5-Amino-1MQ blocks NNMT',marks:[['c','Cell biology']],
    text:'5-Amino-1MQ is a small molecule, not a peptide, that crosses into the cell and blocks NNMT.',
    model:'Biochemistry (Neelakantan 2018)',
    show:base.concat(['droplet','nnmtOff','amino','mol']),
    anim:[{p:'amino',type:'flow'},{p:'mol',type:'scale',from:.6,dur:700},{p:'nnmtOff',type:'fadeIn',delay:900,dur:600}],
    labels:[{p:'mol',t:'5-Amino-1MQ',x:6,y:186,ax:60,ay:150},{p:'nnmtOff',t:'NNMT blocked',x:214,y:40,ax:250,ay:66}]},
   {key:'nad',btn:'NAD+',title:'NAD+ is rebuilt',marks:[['c','Cell biology']],
    text:'With NNMT out of the way, nicotinamide is free to rebuild NAD+ and SAM is preserved. The NAD+ supply climbs back up.',
    model:'Biochemistry (Neelakantan 2018)',
    show:base.concat(['droplet','nnmtOff','nam','nadHigh']),
    anim:[{p:'nadHigh',type:'grow',sel:'.fill',axis:'y',dur:1800,delay:400},{p:'nam',type:'pulse',sel:'circle',to:1.12,dur:1500}],
    labels:[{p:'nadHigh',t:'NAD+ restored',x:214,y:208,ax:323,ay:130}]},
   {key:'burn',btn:'Burn',title:'Store less, spend more',marks:[['c','Cell biology']],
    text:'More NAD+ shifts the fat cell toward spending energy rather than storing it, so it makes less new fat and the droplet shrinks.',
    model:'Cell biology (Neelakantan 2018)',
    show:base.concat(['droplet','nnmtOff','nadHigh','energy']),
    anim:[{p:'droplet',type:'shrink',sel:'circle',to:.6,dur:2400,delay:400},{p:'energy',type:'fadeIn',sel:'circle',delay:900,dur:700,stagger:120}],
    labels:[{p:'droplet',t:'Droplet shrinks',x:6,y:208,ax:120,ay:150},{p:'energy',t:'Energy spent',x:150,y:40,ax:130,ay:90}]},
   {key:'dish',btn:'Cells',study:1,title:'In fat cells',marks:[['c','Fat cells']],ms:6200,
    text:'In cultured fat cells, an NNMT inhibitor raised intracellular NAD+ and SAM and suppressed lipogenesis, the making of new fat.',
    model:'Cultured adipocytes',src:[{t:'Neelakantan 2018, Biochem Pharmacol',u:'https://doi.org/10.1016/j.bcp.2017.11.007'}],
    show:['dishsc'],
    anim:[{p:'dishsc',type:'grow',sel:'.g',dur:1500,delay:400,stagger:200}],
    labels:[]},
   {key:'mice',btn:'Mice',study:1,title:'In mice: less body fat',marks:[['a','Mouse']],ms:6600,
    text:'In diet-induced obese mice, an NNMT inhibitor cut body weight and white fat, shrank fat cells and lowered cholesterol, with no change in food intake. The evidence is mouse-only, with no human data.',
    model:'Diet-induced obese mice',src:[{t:'Neelakantan 2018, Biochem Pharmacol',u:'https://doi.org/10.1016/j.bcp.2017.11.007'}],
    show:['mouse'],
    anim:[{p:'mouse',type:'grow',sel:'.g',dur:1500,delay:400,stagger:220}],
    labels:[{p:'mouse',t:'Body fat down',x:150,y:208,ax:196,ay:150}]}
  ]
 };
});
