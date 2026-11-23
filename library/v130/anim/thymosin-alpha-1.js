/* Thymosin Alpha-1 story v2 (22 Nov 2026). Full-frame immune field to the BPC-157/GHK-Cu standard: a dendritic cell
   meets a pathogen among resting T cells; Ta1 wakes it (TLR, IL-12, Th1), adds an IDO brake (IL-10, regulatory T
   cells), and the response resolves in balance; then a mouse aspergillosis study and the honest TESTS sepsis trial. */
BSAnim.define('thymosin-alpha-1',function(H,INK){
 var AMBER='#C7A24A',FUNG='#9A7B3A',IL12='#F2C94C',IL10='#5A9BC8',PUR='#7A5CC8',GREEN='#4E9A3E';
 var DX=104,DY=120,DR=25;
 function dc(cx,cy,r){var o='<g>',A=[14,58,104,150,196,240,286,330];A.forEach(function(d){var a=d*Math.PI/180,x1=cx+Math.cos(a)*r,y1=cy+Math.sin(a)*r,x2=cx+Math.cos(a)*(r+16),y2=cy+Math.sin(a)*(r+16);o+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/><path d="M'+x2.toFixed(1)+' '+y2.toFixed(1)+'l'+(Math.cos(a-.5)*6).toFixed(1)+' '+(Math.sin(a-.5)*6).toFixed(1)+'M'+x2.toFixed(1)+' '+y2.toFixed(1)+'l'+(Math.cos(a+.5)*6).toFixed(1)+' '+(Math.sin(a+.5)*6).toFixed(1)+'" stroke="'+INK+'" stroke-width="1.3" stroke-linecap="round"/>'});return o+'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#EDE8FB" stroke="'+INK+'" stroke-width="1.6"/><circle cx="'+(cx+5)+'" cy="'+(cy-3)+'" r="'+(r*.42).toFixed(1)+'" fill="#C9C3F0" stroke="'+INK+'" stroke-width="1"/></g>'}
 function hyphae(ox,oy){var o='<g fill="none" stroke="'+FUNG+'" stroke-width="1.8" stroke-linecap="round">';
  [[0,0,1],[0,0,-1],[6,-2,-1.6],[-5,2,1.4]].forEach(function(b){o+='<path d="M'+ox+' '+oy+'q'+(10*b[2])+' -10 '+(6*b[2])+' -22q-3 -10 '+(8*b[2])+' -18"/>'});
  return o+'</g><g fill="'+AMBER+'" stroke="'+FUNG+'" stroke-width="1">'+[[ox-10,oy-40],[ox+4,oy-44],[ox+12,oy-30],[ox-2,oy-24]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="4.5"/>'}).join('')+'</g>'}
 var tlr=H.receptor(DX-14,DY-20,'#A88400',-1)+H.receptor(DX+1,DY-24,'#A88400',-1)+H.receptor(DX-25,DY-10,'#A88400',-1);
 var dcglow='<circle cx="'+DX+'" cy="'+DY+'" r="'+(DR+7)+'" fill="none" stroke="'+IL12+'" stroke-width="2" opacity=".8"/>';
 var NT=[[214,66],[264,56],[316,74],[228,108],[300,116],[214,156],[272,168],[332,150]];
 var naive=NT.map(function(p){return H.cell(p[0],p[1],10,'#F4F0C4',INK,'#C9C3F0')}).join('');
 var TH1=[0,1,2,3,4];
 var th1=TH1.map(function(i){var p=NT[i];return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="13" fill="none" stroke="'+GREEN+'" stroke-width="1.8"/><path d="M'+(p[0]+5)+' '+(p[1]-9)+'l4 -4m-2 2l2 -2 1 4" stroke="'+GREEN+'" stroke-width="1.4" fill="none" stroke-linecap="round"/>'}).join('');
 var TRG=[5,6,7];
 var treg=TRG.map(function(i){var p=NT[i];return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="13" fill="none" stroke="'+PUR+'" stroke-width="1.8"/><path d="M'+(p[0]-5)+' '+p[1]+'h10" stroke="'+PUR+'" stroke-width="2.2" stroke-linecap="round"/>'}).join('');
 var il12=H.puffs([[150,96],[176,86],[200,100],[172,112],[210,84]],'#FCE9A8',IL12,3);
 var il10=H.puffs([[150,150],[180,142],[206,156],[176,168]],'#D6ECFA',IL10,3);
 var tissue='<g fill="none" stroke="#E4DFF4" stroke-width="1" opacity=".6">'+[70,150].map(function(y){return '<path d="'+H.crimp(150,352,y,1.3,30)+'"/>'}).join('')+'</g>';
 var MOL='<circle cx="316" cy="40" r="26" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/>'+
  '<path d="M300 44c4 -8 10 4 14 -4s8 4 12 -2" fill="none" stroke="'+PUR+'" stroke-width="2.2" stroke-linecap="round"/>'+
  '<text class="tm" x="316" y="34" text-anchor="middle" font-size="8">Tα1</text><text class="tm" x="316" y="58" text-anchor="middle" font-size="7">28 AMINO ACIDS</text>';
 var FLOW='M300 56C250 70 200 92 150 110';
 var TBEAD=H.bead(0,0,'#CBB6F0',PUR,4);
 /* study: mouse aspergillosis, two lung panels */
 function lung(cx,lab,heavy){var spots=heavy?[[-14,-6],[6,-10],[16,4],[-8,10],[10,14],[-18,6],[0,0],[20,-4]]:[[-6,2],[10,-4]];
  return '<text class="tm" x="'+cx+'" y="34" text-anchor="middle">'+lab+'</text>'+
   '<path d="M'+cx+' 44c-10 -4 -30 2 -30 24c0 24 16 34 28 30c2 -1 2 -4 2 -8V44Z" fill="#F6D9DC" stroke="#C0392B" stroke-width="1.3"/>'+
   '<path d="M'+cx+' 44c10 -4 30 2 30 24c0 24 -16 34 -28 30c-2 -1 -2 -4 -2 -8V44Z" fill="#F6D9DC" stroke="#C0392B" stroke-width="1.3"/>'+
   '<path d="M'+cx+' 40v52" stroke="#C0392B" stroke-width="1.6"/>'+
   '<g class="sp" fill="'+FUNG+'" opacity=".85">'+spots.map(function(p){return '<circle cx="'+(cx+p[0])+'" cy="'+(74+p[1])+'" r="3.4"/>'}).join('')+'</g>'}
 var mouse='<text class="tm" x="180" y="15" text-anchor="middle" opacity=".8">TRANSPLANT + ASPERGILLUS</text>'+lung(110,'CONTROL',1)+lung(250,'Tα1',0)+
  '<text class="tm" x="110" y="112" text-anchor="middle" opacity=".75">HEAVY</text><text class="tm" x="250" y="112" text-anchor="middle" fill="'+GREEN+'">PROTECTED ✓</text>'+
  '<text class="tm" x="180" y="140" text-anchor="middle" opacity=".85">FUNGAL BURDEN DOWN</text><text class="tm" x="180" y="158" text-anchor="middle" opacity=".85">FASTER WHITE-CELL RECOVERY</text>'+H.rodent(320,176,.48);
 /* study: TESTS */
 var tests='<text class="tm" x="180" y="30" text-anchor="middle">28-DAY DEATH · 1,089 ADULTS</text>'+
  '<path d="M96 170H300" stroke="'+INK+'" stroke-width="1.2"/>'+
  H.bars(118,170,118,46,[.78,.804],['#2F5BE0','#9AA0C8'],['Tα1','PLACEBO'])+
  '<text class="tb" x="141" y="62" text-anchor="middle" font-size="18" data-to="23.4" data-dec="1" data-suf="%">23.4%</text>'+
  '<text class="tb" x="201" y="58" text-anchor="middle" font-size="18" data-to="24.1" data-dec="1" data-suf="%">24.1%</text>'+
  '<text class="tm" x="180" y="192" text-anchor="middle" opacity=".85">NO CLEAR DIFFERENCE</text>'+
  '<text class="tm" x="180" y="208" text-anchor="middle" opacity=".65">HINTS IN OLDER + DIABETIC SUBGROUPS</text>';
 var base=['tissue','vessel'];
 return {
  title:'Thymosin α-1 and the immune response',aria:'Animated diagram: how Thymosin alpha-1 wakes a dendritic cell through Toll-like receptors, primes a Th1 attack and adds a regulatory brake, with a mouse aspergillosis study and the large TESTS sepsis trial.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'tissue',name:'Tissue',info:'The field where immune cells meet a threat.',svg:tissue},
   {id:'vessel',name:'Blood vessel',info:'Tα-1 is given by injection and reaches immune cells from the blood.',svg:'<rect x="-4" y="200" width="368" height="11" rx="5.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 205.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   {id:'dc',name:'Dendritic cell',info:'The immune system’s scout: it reads a threat and decides what response the body raises.',svg:dc(DX,DY,DR)},
   {id:'dcglow',name:'Matured dendritic cell',info:'A woken, mature cell: better at presenting the threat and making IL-12.',svg:dcglow},
   {id:'fungus',name:'Pathogen',info:'Here a fungus (Aspergillus); the dendritic cell samples it and must choose a response.',svg:hyphae(44,70)},
   {id:'tlr',name:'Toll-like receptors',info:'Surface sensors; Tα-1 signals through them (via MyD88) to wake the cell.',svg:tlr},
   {id:'naive',name:'Resting T cells',info:'T cells waiting for instruction; which way they go depends on the dendritic cell.',svg:'<g>'+naive+'</g>'},
   {id:'th1',name:'Th1 cells',info:'T-helper-1 cells: a targeted attack on the pathogen.',svg:'<g>'+th1+'</g>'},
   {id:'treg',name:'Regulatory T cells',info:'T cells that hold the response back, so it does not run away into damage.',svg:'<g>'+treg+'</g>'},
   {id:'il12',name:'IL-12',info:'A messenger a matured dendritic cell makes to steer T cells toward a Th1 attack.',svg:il12},
   {id:'ido',name:'IDO',info:'An enzyme Tα-1 switches on inside the cell; it starts the calming, tolerance side of the response.',svg:'<g transform="translate('+DX+' '+(DY+8)+')"><ellipse rx="9" ry="6.5" fill="#E4D8FA" stroke="'+PUR+'" stroke-width="1.3"/><circle r="2" fill="'+PUR+'"/></g>'},
   {id:'il10',name:'IL-10',info:'A calming messenger that dampens inflammation.',svg:il10},
   {id:'ta1',name:'Thymosin α-1',info:'A 28-amino-acid thymic peptide; here shown arriving at the dendritic cell.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3800,bead:TBEAD}},
   {id:'mol',name:'Thymosin α-1',info:'A short thymic peptide, 28 amino acids long.',svg:MOL},
   /* study: mouse */
   {id:'mouse',name:'Mouse aspergillosis',info:'Mice given a bone-marrow transplant and then exposed to Aspergillus, with or without Tα-1.',svg:mouse},
   /* study: TESTS */
   {id:'tests',name:'TESTS sepsis trial',info:'A multicentre, double-blind, placebo-controlled phase-3 trial in 1,089 adults with sepsis.',svg:tests}
  ],
  steps:[
   {key:'threat',btn:'Threat',title:'A scout meets a threat',marks:[['h','Human anatomy'],['c','Cells']],
    text:'A dendritic cell is the immune system’s scout: it reads a threat and decides what response to raise. Here it meets a fungal pathogen, with resting T cells waiting for its call.',
    model:'Immune anatomy',
    show:base.concat(['dc','fungus','naive']),
    anim:[{p:'fungus',type:'pulse',sel:'circle',to:1.14,dur:1600,stagger:120},{p:'naive',type:'pulse',sel:'g',to:1.06,dur:2000,stagger:120}],
    labels:[{p:'dc',t:'Dendritic cell',x:6,y:178,ax:DX,ay:DY+DR},{p:'fungus',t:'Pathogen',x:8,y:20,ax:44,ay:40}]},
   {key:'wake',btn:'Wake',title:'Wake the cell',marks:[['c','Cells']],
    text:'Thymosin α-1 signals through the cell’s Toll-like receptors (via MyD88, p38 and NF-κB). The dendritic cell matures: better at reading the threat and ready to instruct the T cells.',
    model:'Human and mouse dendritic cells (Romani 2004)',
    show:base.concat(['dc','fungus','tlr','ta1','naive','dcglow']),
    anim:[{p:'ta1',type:'flow'},{p:'tlr',type:'fadeIn',sel:'path',dur:700,stagger:120},{p:'dcglow',type:'draw',sel:'circle',delay:1400,dur:1400}],
    labels:[{p:'tlr',t:'Toll-like receptor',x:6,y:70,ax:DX-14,ay:DY-20},{p:'dcglow',t:'Matures',x:6,y:178,ax:DX,ay:DY+DR}]},
   {key:'attack',btn:'Attack',title:'Aim the attack',marks:[['c','Cells']],
    text:'The matured cell makes IL-12 and primes the resting T cells into Th1 cells, a targeted attack on the pathogen.',
    model:'Human and mouse dendritic cells (Romani 2004)',
    show:base.concat(['dc','dcglow','fungus','naive','il12','th1']),
    anim:[{p:'il12',type:'fadeIn',sel:'circle',dur:700,stagger:110},{p:'th1',type:'fadeIn',sel:'circle',delay:1100,dur:800,stagger:160},{p:'th1',type:'pulse',sel:'path',to:1.1,delay:2000,dur:1400}],
    labels:[{p:'il12',t:'IL-12',x:150,y:70,ax:186,ay:92},{p:'th1',t:'→ Th1 attack',x:250,y:40,ax:264,ay:56}]},
   {key:'brake',btn:'Brake',title:'And a brake',marks:[['c','Cells']],
    text:'Through TLR9 and interferon, Tα-1 also switches on IDO inside the cell, which makes IL-10 and turns some T cells into regulatory T cells, a brake on the response.',
    model:'Human and mouse dendritic cells (Romani 2006)',
    show:base.concat(['dc','dcglow','naive','th1','ido','il10','treg']),
    anim:[{p:'ido',type:'scale',from:0,dur:600},{p:'il10',type:'fadeIn',sel:'circle',delay:700,dur:700,stagger:110},{p:'treg',type:'fadeIn',sel:'circle',delay:1300,dur:800,stagger:160}],
    labels:[{p:'ido',t:'IDO brake',x:6,y:70,ax:DX,ay:DY+8},{p:'treg',t:'Regulatory T cells',x:232,y:192,ax:300,ay:168}]},
   {key:'balance',btn:'Balance',title:'A controlled response',marks:[['c','Cells']],
    text:'Attack and brake together: the pathogen is cleared by a targeted Th1 response that is held in balance, rather than a runaway one that damages the host.',
    model:'Balance of inflammation and tolerance',
    show:base.concat(['dc','dcglow','fungus','th1','treg']),
    anim:[{p:'fungus',type:'shrink',sel:'circle',to:.25,dur:2400,delay:400},{p:'th1',type:'pulse',sel:'path',to:1.1,dur:1500},{p:'treg',type:'pulse',sel:'path',to:1.1,dur:1500,stagger:200}],
    labels:[{p:'th1',t:'Th1 clears it',x:250,y:40,ax:264,ay:56},{p:'treg',t:'Brake holds',x:232,y:192,ax:300,ay:168}]},
   {key:'mouse',btn:'Mice',study:1,title:'In mice: protected from a fungus',marks:[['a','Mouse']],ms:6200,
    text:'In mice given a bone-marrow transplant and then exposed to Aspergillus, Tα-1 raised Th1 antifungal immunity, sped white-cell recovery, and protected them from the infection.',
    model:'Mice, invasive aspergillosis',src:[{t:'Romani 2004, Blood',u:'https://doi.org/10.1182/blood-2003-11-4036'}],
    show:['mouse'],
    anim:[{p:'mouse',type:'shrink',sel:'.sp circle',to:.15,delay:700,dur:3200}],
    labels:[{p:'mouse',t:'Infection clears',x:6,y:40,ax:110,ay:74}]},
   {key:'people',btn:'People',study:1,title:'In people: the honest test',marks:[['h','Human']],ms:6600,
    text:'A large sepsis trial is the honest test. Across 1,089 adults, 28-day deaths were 23.4% with Tα-1 and 24.1% with placebo, no clear difference. Hints of benefit in some subgroups (older, diabetic) need their own trials.',
    model:'Phase-3 randomised trial, 1,089 adults',src:[{t:'TESTS 2025, BMJ',u:'https://doi.org/10.1136/bmj-2024-082583'}],
    show:['tests'],
    anim:[{p:'tests',type:'grow',sel:'.g',dur:1500,delay:300,stagger:260},{p:'tests',type:'count',delay:400,dur:1800}],
    labels:[]}
  ]
 };
});
