/* Thymosin Alpha-1 story v1 (22 Nov 2026). Scene: the immune response. Ta1 wakes a dendritic cell through Toll-like
   receptors (matures it, IL-12, Th1) and also adds a brake (IDO, IL-10, regulatory T cells); then a mouse aspergillosis
   study and the large TESTS sepsis trial, which found no clear mortality benefit. */
BSAnim.define('thymosin-alpha-1',function(H,INK){
 var AMBER='#C7A24A',FUNG='#B98A3A',IL12='#F2C94C',IL10='#5A9BC8',PUR='#7A5CC8';
 var DX=120,DY=112,DR=24;
 function dc(cx,cy,r){var o='<g>',A=[18,66,116,158,202,248,300,342];A.forEach(function(d){var a=d*Math.PI/180,x1=cx+Math.cos(a)*r,y1=cy+Math.sin(a)*r,x2=cx+Math.cos(a)*(r+15),y2=cy+Math.sin(a)*(r+15);o+='<path d="M'+x1.toFixed(1)+' '+y1.toFixed(1)+'L'+x2.toFixed(1)+' '+y2.toFixed(1)+'" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/><path d="M'+x2.toFixed(1)+' '+y2.toFixed(1)+'l'+(Math.cos(a-.5)*6).toFixed(1)+' '+(Math.sin(a-.5)*6).toFixed(1)+'M'+x2.toFixed(1)+' '+y2.toFixed(1)+'l'+(Math.cos(a+.5)*6).toFixed(1)+' '+(Math.sin(a+.5)*6).toFixed(1)+'" stroke="'+INK+'" stroke-width="1.3" stroke-linecap="round"/>'});return o+'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#EDE8FB" stroke="'+INK+'" stroke-width="1.6"/><circle cx="'+(cx+5)+'" cy="'+(cy-3)+'" r="'+(r*.42).toFixed(1)+'" fill="#C9C3F0" stroke="'+INK+'" stroke-width="1"/></g>'}
 function fungus(cx,cy){return '<g><path d="M'+cx+' '+(cy+15)+'q-5 -9 -1 -17M'+cx+' '+(cy+15)+'q6 -8 2 -16" fill="none" stroke="'+FUNG+'" stroke-width="1.8" stroke-linecap="round"/><circle cx="'+cx+'" cy="'+(cy-14)+'" r="8" fill="'+AMBER+'" stroke="'+FUNG+'" stroke-width="1.3"/><g fill="'+FUNG+'">'+[[-7,-22],[0,-24],[7,-22],[-9,-15],[9,-15]].map(function(p){return '<circle cx="'+(cx+p[0])+'" cy="'+(cy+p[1])+'" r="2.1"/>'}).join('')+'</g></g>'}
 var tlr=H.receptor(DX-12,DY-20,'#A88400',-1)+H.receptor(DX+2,DY-23,'#A88400',-1)+H.receptor(DX-24,DY-8,'#A88400',-1);
 var il12=H.puffs([[172,92],[196,84],[214,98],[184,108]],'#FCE9A8',IL12,3);
 var th1=H.cell(262,78,10,'#F4F0C4',INK,'#C9C3F0')+H.cell(304,96,10,'#F4F0C4',INK,'#C9C3F0')+H.cell(286,58,9,'#F4F0C4',INK,'#C9C3F0');
 var ido='<g transform="translate('+DX+' '+(DY+9)+')"><ellipse rx="9" ry="6.5" fill="#E4D8FA" stroke="'+PUR+'" stroke-width="1.3"/><circle r="2" fill="'+PUR+'"/></g>';
 var treg=H.cell(270,146,10,'#EFE7FB','#7A5CC8','#D8CBF4')+H.cell(308,152,9,'#EFE7FB','#7A5CC8','#D8CBF4')+'<g stroke="'+PUR+'" stroke-width="2" stroke-linecap="round"><path d="M265 146h10M303 152h8"/></g>';
 var il10=H.puffs([[180,132],[206,126],[230,140],[196,150]],'#D6ECFA',IL10,3);
 var FLOW='M120 208L120 140';
 var TBEAD=H.bead(0,0,'#A9BCFA','#2F5BE0',4);
 /* study: TESTS sepsis trial, 28-day death */
 var tests='<text class="tm" x="180" y="34" text-anchor="middle">28-DAY DEATH</text>'+H.bars(118,182,122,44,[.78,.804],['#2F5BE0','#9AA0C8'],['Tα1','PLACEBO'])+
  '<text class="tb" x="140" y="72" text-anchor="middle" font-size="17" data-to="23.4" data-dec="1" data-suf="%">23.4%</text>'+
  '<text class="tb" x="198" y="69" text-anchor="middle" font-size="17" data-to="24.1" data-dec="1" data-suf="%">24.1%</text>'+
  '<text class="tm" x="180" y="214" text-anchor="middle" opacity=".8">NO CLEAR DIFFERENCE</text>';
 return {
  title:'Thymosin α-1 and the immune response',aria:'Animated diagram: how Thymosin alpha-1 wakes a dendritic cell through Toll-like receptors and also adds an immune brake, with a mouse aspergillosis study and the large TESTS sepsis trial.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'dc',name:'Dendritic cell',info:'The immune system’s scout: it reads a threat and decides what response the body raises.',svg:dc(DX,DY,DR)},
   {id:'fungus',name:'Pathogen',info:'Here a fungus (Aspergillus); the dendritic cell samples it and must choose a response.',svg:fungus(64,60)},
   {id:'tlr',name:'Toll-like receptors',info:'Surface sensors; Tα-1 signals through them (via MyD88) to wake the cell.',svg:tlr},
   {id:'il12',name:'IL-12',info:'A messenger a matured dendritic cell makes to steer T cells toward a Th1 attack.',svg:il12},
   {id:'th1',name:'Th1 cells',info:'T-helper-1 cells: a targeted response against the pathogen.',svg:th1},
   {id:'ido',name:'IDO',info:'An enzyme Tα-1 switches on inside the cell; it starts the calming, tolerance side of the response.',svg:ido},
   {id:'treg',name:'Regulatory T cells',info:'T cells that hold the response back, so it does not run away into damage.',svg:treg},
   {id:'il10',name:'IL-10',info:'A calming messenger that dampens inflammation.',svg:il10},
   {id:'ta1',name:'Thymosin α-1',info:'A 28-amino-acid thymic peptide; here shown arriving at the dendritic cell.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3800,bead:TBEAD}},
   {id:'vessel',name:'Blood vessel',info:'Tα-1 is given by injection and reaches immune cells from the blood.',svg:'<rect x="-4" y="210" width="368" height="9" rx="4.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 214.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   /* study: mouse aspergillosis */
   {id:'rat',name:'Mouse model',info:'Mice given a bone-marrow transplant and then exposed to Aspergillus, with or without Tα-1.',svg:H.rodent(52,150,.9)+'<text class="tm" x="104" y="128">TRANSPLANT + ASPERGILLUS</text><text class="tm" x="104" y="144" opacity=".75">Tα1 vs NONE</text>'},
   {id:'fung2',name:'Infection',info:'Aspergillosis in the lungs; lighter with Tα-1 as Th1 immunity recovered.',svg:fungus(292,92)+fungus(318,120)},
   {id:'prot',name:'Protected',info:'More mice survived with Tα-1; white-cell recovery was faster.',svg:'<text class="tb" x="250" y="176" font-size="15" fill="#2E8F82">PROTECTED ✓</text>'},
   /* study: TESTS */
   {id:'tests',name:'TESTS sepsis trial',info:'A multicentre, double-blind, placebo-controlled phase-3 trial in 1,089 adults with sepsis.',svg:tests}
  ],
  steps:[
   {key:'threat',btn:'Threat',title:'A scout meets a threat',marks:[['h','Human anatomy'],['c','Cells']],
    text:'A dendritic cell is the immune system’s scout: it reads a threat and decides what response to raise. Here it meets a fungal pathogen.',
    model:'Immune anatomy',
    show:['dc','fungus','th1','vessel'],
    anim:[{p:'fungus',type:'pulse',to:1.12,dur:1600}],
    labels:[{p:'dc',t:'Dendritic cell',x:6,y:150,ax:120,ay:124},{p:'fungus',t:'Pathogen',x:20,y:34,ax:64,ay:50}]},
   {key:'wake',btn:'Wake',title:'Wake the cell, aim the attack',marks:[['c','Cells']],
    text:'Thymosin α-1 signals through the cell’s Toll-like receptors. The dendritic cell matures, makes IL-12, and primes Th1 cells, a targeted attack on the pathogen.',
    model:'Human and mouse dendritic cells (Romani 2004)',
    show:['dc','fungus','tlr','ta1','il12','th1','vessel'],
    anim:[{p:'ta1',type:'flow'},{p:'tlr',type:'fadeIn',dur:700},{p:'il12',type:'fadeIn',sel:'circle',delay:1400,dur:700,stagger:120},{p:'th1',type:'pulse',sel:'g',to:1.12,delay:2000,dur:1500}],
    labels:[{p:'tlr',t:'Toll-like receptor',x:8,y:70,ax:108,ay:90},{p:'il12',t:'IL-12 → Th1',x:214,y:70,ax:214,ay:98}]},
   {key:'balance',btn:'Balance',title:'And a brake, to stay balanced',marks:[['c','Cells']],
    text:'Through TLR9 and interferon, Tα-1 also switches on IDO inside the cell, which makes IL-10 and regulatory T cells. It adds a brake, so the response stays balanced rather than running away.',
    model:'Human and mouse dendritic cells (Romani 2006)',
    show:['dc','ido','il10','treg','th1','vessel'],
    anim:[{p:'ido',type:'scale',from:0,dur:600},{p:'il10',type:'fadeIn',sel:'circle',delay:800,dur:700,stagger:120},{p:'treg',type:'fadeIn',delay:1400,dur:800}],
    labels:[{p:'ido',t:'IDO brake',x:8,y:70,ax:120,ay:120},{p:'treg',t:'Regulatory T cells',x:214,y:176,ax:280,ay:148}]},
   {key:'mouse',btn:'Mice',study:1,title:'In mice: protected from a fungus',marks:[['a','Mouse']],ms:6200,
    text:'In mice given a bone-marrow transplant and then exposed to Aspergillus, Tα-1 raised Th1 antifungal immunity, sped white-cell recovery, and protected them from the infection.',
    model:'Mice, invasive aspergillosis',src:[{t:'Romani 2004, Blood',u:'https://doi.org/10.1182/blood-2003-11-4036'}],
    show:['rat','fung2','prot'],
    anim:[{p:'fung2',type:'shrink',sel:'g',to:.2,delay:600,dur:3200},{p:'prot',type:'fadeIn',delay:2600,dur:800}],
    labels:[{p:'fung2',t:'Infection clears',x:214,y:40,ax:300,ay:96}]},
   {key:'people',btn:'People',study:1,title:'In people: the honest test',marks:[['h','Human']],ms:6600,
    text:'A large sepsis trial is the honest test. Across 1,089 adults, 28-day deaths were 23.4% with Tα-1 and 24.1% with placebo, no clear difference. Hints of benefit in some subgroups (older, diabetic) need their own trials.',
    model:'Phase-3 randomised trial, 1,089 adults',src:[{t:'TESTS 2025, BMJ',u:'https://doi.org/10.1136/bmj-2024-082583'}],
    show:['tests'],
    anim:[{p:'tests',type:'grow',sel:'.g',dur:1500,delay:300,stagger:260},{p:'tests',type:'count',delay:400,dur:1800}],
    labels:[]}
  ]
 };
});
