/* SS-31 (elamipretide) story v1 (22 Nov 2026). Scene: the mitochondrion. SS-31 binds cardiolipin in the inner
   membrane, keeps the cristae folded and the electron transport chain organised, so ATP rises and ROS falls; then an
   animal cardiolipin study and the honest human trials (controlled endpoints missed; FDA approval on open-label data).
   Matches the Bare Signals Library (verified). */
BSAnim.define('ss-31',function(H,INK){
 var TEAL='#2E8F82',RED='#C0392B',GOLD='#C9A100',CL='#DB6830',ELEC='#2F5BE0',ROSc='#E05050';
 var OUT='<rect x="12" y="26" width="336" height="156" rx="74" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2"/><rect x="21" y="35" width="318" height="138" rx="65" fill="none" stroke="'+INK+'" stroke-width="1.2" opacity=".55"/>';
 var SHELF='M48 58H300Q320 58 320 73Q320 88 300 88H66Q46 88 46 103Q46 118 66 118H300Q320 118 320 133Q320 148 300 148H66Q46 148 46 160';
 var cristae='<path d="'+SHELF+'" fill="none" stroke="'+INK+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
 var cristaeBad='<g fill="#F3E8D8" stroke="'+INK+'" stroke-width="1.8" opacity=".9">'+[[84,74],[150,78],[228,72],[286,86],[110,120],[200,120],[270,116],[150,146]].map(function(p){return '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="22" ry="13"/>'}).join('')+'</g>';
 var ETCd=[[70,73,'I','#B493E8'],[128,73,'II','#A9BCFA'],[196,73,'III','#8FD0C4'],[258,73,'IV','#F1C27A']];
 var etc=ETCd.map(function(c){return '<rect x="'+(c[0]-8)+'" y="'+(c[1]-7)+'" width="16" height="14" rx="2" fill="'+c[3]+'" stroke="'+INK+'" stroke-width="1.1"/><text x="'+c[0]+'" y="'+(c[1]+3.5)+'" style="font-size:7.5px" font-weight="700" text-anchor="middle">'+c[2]+'</text>'}).join('');
 var atpsynth='<g>'+[[300,118],[300,148]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+(p[1]+10)+'" r="9" fill="#FFF0A8" stroke="'+INK+'" stroke-width="1.3"/><rect x="'+(p[0]-2.5)+'" y="'+p[1]+'" width="5" height="10" fill="'+GOLD+'"/>'}).join('')+'</g>';
 function clip(x,y){return '<g transform="translate('+x+' '+y+')"><circle r="2.6" fill="'+CL+'"/><path d="M-1.5 2.4c-3 4 -6 2 -7 6M1.5 2.4c3 4 6 2 7 6" fill="none" stroke="'+CL+'" stroke-width="1.2" stroke-linecap="round"/></g>'}
 var cardiolipin=[[100,88],[174,88],[240,88],[130,118],[210,148],[286,118]].map(function(p){return clip(p[0],p[1])}).join('');
 var MOL='<circle cx="316" cy="44" r="26" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/>'+
  '<g style="font-size:8px" font-weight="700" text-anchor="middle">'+[['R',300,42,'#A9BCFA'],['Y',311,38,'#EFEAD0'],['K',322,42,'#A9BCFA'],['F',333,38,'#EFEAD0']].map(function(b){return '<circle cx="'+b[1]+'" cy="'+b[2]+'" r="5.6" fill="'+b[3]+'" stroke="'+INK+'" stroke-width="1"/><text x="'+b[1]+'" y="'+(b[2]+3)+'" style="font-size:7px">'+b[0]+'</text>'}).join('')+'</g>'+
  '<text class="tm" x="316" y="60" text-anchor="middle" style="font-size:7px">4 AMINO ACIDS</text>';
 var electrons=H.puffs([[60,70],[96,70],[132,70],[168,70],[204,70]],'#D6E0FA',ELEC,2.4);
 var ros=H.puffs([[90,46],[150,44],[220,46],[280,44],[120,168],[250,168]],'#FBD5D5',ROSc,3);
 function atpTok(x,y){return '<g transform="translate('+x+' '+y+')"><path d="M0 -8L7 -3V5L0 10L-7 5V-3Z" fill="#FFF0A8" stroke="'+INK+'" stroke-width="1"/><text y="3" style="font-size:7px" font-weight="700" text-anchor="middle">ATP</text></g>'}
 var atp='<g>'+atpTok(300,180)+atpTok(322,150)+atpTok(322,120)+'</g>';
 var FLOW='M40 206C120 206 120 73 300 73';
 var SBEAD=H.bead(0,0,'#A9BCFA',ELEC,4);
 /* study: animal cardiolipin */
 var animsc='<text class="tm" x="180" y="30" text-anchor="middle">ISOLATED MITOCHONDRIA, AFTER INJURY</text>'+
  '<text class="tm" x="96" y="48" text-anchor="middle">UNTREATED</text><text class="tm" x="264" y="48" text-anchor="middle">+ SS-PEPTIDE</text>'+
  '<g fill="#F3E8D8" stroke="'+INK+'" stroke-width="1.5">'+[[70,74],[118,78],[96,100]].map(function(p){return '<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="16" ry="10"/>'}).join('')+'</g>'+
  '<path d="M224 64H308M224 78H300M224 92H308M224 106H300" stroke="'+INK+'" stroke-width="2" stroke-linecap="round"/>'+
  '<text class="tm" x="96" y="128" text-anchor="middle">CRISTAE SWOLLEN</text><text class="tm" x="264" y="128" text-anchor="middle" fill="'+TEAL+'">CRISTAE INTACT</text>'+
  '<text class="tm" x="180" y="150" text-anchor="middle">ATP OUTPUT</text>'+H.bars(126,196,38,46,[.4,.9],[RED,TEAL],['UNTREATED','+SS']);
 /* study: human honest */
 var human='<text class="tm" x="180" y="26" text-anchor="middle">6-MIN WALK vs PLACEBO · 30 ADULTS</text>'+
  '<text class="tb" x="180" y="48" style="font-size:14px" text-anchor="middle">+19.8 m · NOT SIGNIFICANT</text>'+
  H.bars(122,154,104,46,[.80,.76],['#2F5BE0','#9AA0C8'],['SS-31','PLACEBO'])+
  '<text class="tm" x="180" y="180" text-anchor="middle" opacity=".9">P = 0.08</text>'+
  '<text class="tm" x="180" y="196" text-anchor="middle" opacity=".75" style="font-size:9px">PHASE 3 ALSO MISSED ITS ENDPOINT</text>'+
  '<text class="tm" x="180" y="208" text-anchor="middle" opacity=".75" style="font-size:9px">BARTH APPROVAL (2025): OPEN-LABEL DATA</text>';
 var base=['mito'];
 return {
  title:'SS-31 in the mitochondrion',aria:'Animated diagram: how SS-31 binds cardiolipin in the inner mitochondrial membrane, keeps the cristae folded and the electron transport chain organised so ATP rises and reactive oxygen species fall, with an animal study and the honest human trials.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'mito',name:'Mitochondrion',info:'The cell’s power plant; its folded inner membrane makes ATP.',svg:OUT},
   {id:'cristae',name:'Cristae',info:'The tight folds of the inner membrane; their surface area is where ATP is made.',svg:cristae},
   {id:'cristaeBad',name:'Swollen cristae',info:'Under stress the folds swell and lose their order, and ATP output falls.',svg:cristaeBad},
   {id:'etc',name:'Electron transport chain',info:'Complexes I–IV that pass electrons and pump protons to power ATP synthesis.',svg:etc},
   {id:'atpsynth',name:'ATP synthase',info:'The turbine that uses the proton gradient to make ATP.',svg:atpsynth},
   {id:'cl',name:'Cardiolipin',info:'The signature lipid of the inner membrane; it anchors and organises the electron transport chain.',svg:'<g>'+cardiolipin+'</g>'},
   {id:'ss31',name:'SS-31 binding',info:'SS-31 concentrates in the inner membrane and binds cardiolipin, holding the chain in order.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:4,ms:3600,bead:SBEAD}},
   {id:'mol',name:'SS-31',info:'A four-amino-acid peptide (D-Arg, Dmt, Lys, Phe) that crosses membranes and concentrates in mitochondria.',svg:MOL},
   {id:'electrons',name:'Electrons',info:'Flow cleanly along an organised chain, with little leak.',svg:electrons},
   {id:'atp',name:'ATP',info:'The cell’s energy currency, made at the ATP synthase.',svg:atp},
   {id:'ros',name:'Reactive oxygen species',info:'Leaked electrons make ROS, which damage the cell; less leak means less ROS.',svg:ros},
   /* study */
   {id:'animsc',name:'Animal mitochondria',info:'Isolated mitochondria after injury, with and without a cardiolipin-targeting SS peptide.',svg:animsc},
   {id:'human',name:'Human trials',info:'Randomised trials in primary mitochondrial myopathy and Barth syndrome.',svg:human}
  ],
  steps:[
   {key:'plant',btn:'Plant',title:'The cell’s power plant',marks:[['c','Cell biology']],
    text:'A mitochondrion makes the cell’s ATP. Its tightly folded inner membrane, the cristae, carries the electron transport chain and the ATP synthase that turns the energy into ATP.',
    model:'Cell biology',
    show:base.concat(['cristae','etc','atpsynth']),
    anim:[{p:'etc',type:'fadeIn',sel:'rect',dur:700,stagger:120},{p:'atpsynth',type:'fadeIn',sel:'circle',delay:600,dur:600}],
    labels:[{p:'cristae',t:'Cristae',x:6,y:40,ax:66,ay:103},{p:'etc',t:'Electron transport chain',x:150,y:208,ax:128,ay:73}]},
   {key:'stress',btn:'Stress',title:'Under stress it falters',marks:[['c','Cell biology']],
    text:'When the membrane is stressed, cardiolipin is disrupted, the cristae swell and lose their order, ATP output drops and leaked electrons form reactive oxygen species.',
    model:'Cell biology',
    show:base.concat(['cristaeBad','ros']),
    anim:[{p:'cristaeBad',type:'scale',sel:'ellipse',from:.6,dur:900,stagger:70},{p:'ros',type:'fadeIn',sel:'circle',delay:800,dur:700,stagger:110}],
    labels:[{p:'cristaeBad',t:'Cristae swell',x:6,y:40,ax:84,ay:74},{p:'ros',t:'ROS leak',x:214,y:208,ax:250,ay:168}]},
   {key:'bind',btn:'Bind',title:'SS-31 binds cardiolipin',marks:[['c','Cell biology']],
    text:'SS-31 is a small four-amino-acid peptide that slips into the inner membrane and binds cardiolipin, the lipid that anchors and organises the electron transport chain.',
    model:'Biochemistry',
    show:base.concat(['cristaeBad','cl','ss31','mol']),
    anim:[{p:'ss31',type:'flow'},{p:'mol',type:'scale',from:.6,dur:700},{p:'cl',type:'fadeIn',sel:'g',delay:600,dur:700,stagger:90}],
    labels:[{p:'cl',t:'Cardiolipin',x:6,y:40,ax:100,ay:88},{p:'mol',t:'SS-31',x:214,y:70,ax:300,ay:50}]},
   {key:'hold',btn:'Hold',title:'The cristae hold',marks:[['c','Cell biology']],
    text:'Holding cardiolipin in place keeps the cristae tightly folded and the chain lined up, instead of swollen and disorganised.',
    model:'Cell biology',
    show:base.concat(['cristae','etc','atpsynth','cl']),
    anim:[{p:'cristae',type:'draw',sel:'path',dur:2400},{p:'etc',type:'fadeIn',sel:'rect',delay:1400,dur:700,stagger:100}],
    labels:[{p:'cristae',t:'Folds restored',x:6,y:40,ax:66,ay:103}]},
   {key:'atp',btn:'ATP',title:'More ATP, less ROS',marks:[['c','Cell biology']],
    text:'With the chain organised, electrons flow cleanly, the ATP synthase turns out more ATP, and fewer leaked electrons means fewer reactive oxygen species.',
    model:'Cell biology',
    show:base.concat(['cristae','etc','atpsynth','electrons','atp','ros']),
    anim:[{p:'electrons',type:'fadeIn',sel:'circle',dur:700,stagger:120},{p:'atp',type:'fadeIn',sel:'g',delay:900,dur:700,stagger:220},{p:'ros',type:'shrink',sel:'circle',to:.2,delay:800,dur:2000}],
    labels:[{p:'atp',t:'More ATP',x:214,y:208,ax:316,ay:150},{p:'ros',t:'Less ROS',x:6,y:40,ax:90,ay:46}]},
   {key:'animal',btn:'Animal',study:1,title:'In animal mitochondria',marks:[['a','Animal']],ms:6200,
    text:'In isolated mitochondria injured by loss of blood flow, targeting cardiolipin kept the cristae intact and restored ATP output, shown for this class of membrane peptide.',
    model:'Isolated mitochondria, ischemia',src:[{t:'Birk 2015, Biochim Biophys Acta',u:'https://doi.org/10.1016/j.bbabio.2015.06.006'}],
    show:['animsc'],
    anim:[{p:'animsc',type:'grow',sel:'.g',dur:1500,delay:500,stagger:300}],
    labels:[{p:'animsc',t:'ATP recovers',x:150,y:210,ax:201,ay:150}]},
   {key:'human',btn:'People',study:1,title:'In people: the honest picture',marks:[['h','Human']],ms:6800,
    text:'The controlled trials mostly missed. In mitochondrial myopathy (30 adults) the 6-minute walk gained 19.8 m over placebo, short of significance, though fatigue scores improved; the Phase 3 missed its main endpoint. SS-31 (elamipretide) got FDA accelerated approval for Barth syndrome in 2025, but on open-label strength data, not the randomised phase.',
    model:'MMPOWER-2 and Barth (TAZPOWER)',src:[{t:'Karaa 2020, J Cachexia Sarcopenia Muscle',u:'https://doi.org/10.1002/jcsm.12559'},{t:'Thompson 2024, Genet Med',u:'https://doi.org/10.1016/j.gim.2024.101138'}],
    show:['human'],
    anim:[{p:'human',type:'grow',sel:'.g',dur:1500,delay:400,stagger:260}],
    labels:[]}
  ]
 };
});
