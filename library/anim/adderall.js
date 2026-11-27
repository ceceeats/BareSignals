/* Adderall story v1 (27 Nov 2026). Scene: the nerve ending. Amphetamine is pulled in by DAT/NET, jams VMAT2 so the
   storage sacs spill, switches on TAAR1 so the pumps run backwards and dopamine floods the gap; then the prefrontal
   focus effect, the same flood in the reward areas (where misuse starts), the 2024 psychosis study (Moran) and the 2013
   healthy-adult trial (Ilieva: 13 tests, no gain for the group, yet people felt sharper). Matches Library v131. */
BSAnim.define('adderall',function(H,INK){
 var AMP='#DB6830',AMPf='#F6B48C',DA='#7B5BD6',DAf='#C9B8F2',TEAL='#2E8F82',RED='#C0392B',PUMP='#8FD0C4';
 var TERM='<path d="M150 0V16C150 26 50 24 50 70V140Q50 150 60 150H300Q310 150 310 140V70C310 24 210 26 210 16V0Z" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round"/>'+
  '<text class="tm" x="180" y="36" text-anchor="middle" opacity=".6" style="font-size:8px">NERVE ENDING</text>';
 var POST='<path d="M20 238V192Q20 184 30 184H330Q340 184 340 192V238" fill="#EEF1FB" stroke="'+INK+'" stroke-width="2"/>'+
  '<text class="tm" x="324" y="174" text-anchor="end" opacity=".6" style="font-size:8px">GAP</text>'+
  '<text class="tm" x="324" y="228" text-anchor="end" opacity=".6" style="font-size:8px">NEXT CELL</text>';
 var V=[[112,64],[164,54],[216,64],[262,98],[138,106],[198,102]];
 function sac(x,y,full,leak){var o='<circle cx="'+x+'" cy="'+y+'" r="12" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4"'+(leak?' stroke-dasharray="4 3"':'')+'/>';
  if(full)[[-4,-3],[4,-3],[-3.5,4],[4,4]].forEach(function(d){o+='<circle cx="'+(x+d[0])+'" cy="'+(y+d[1])+'" r="2.2" fill="'+DAf+'" stroke="'+DA+'" stroke-width=".8"/>'});
  return o}
 var ves='<g>'+V.map(function(p){return sac(p[0],p[1],1,0)}).join('')+'</g>';
 var vesLeak='<g>'+V.map(function(p){return sac(p[0],p[1],0,1)}).join('')+'</g>';
 var vmat='<g>'+V.map(function(p){return '<rect x="'+(p[0]+7)+'" y="'+(p[1]-11)+'" width="6" height="6" rx="1" fill="'+TEAL+'" stroke="'+INK+'" stroke-width=".8"/>'}).join('')+'</g>';
 function pump(x,lab,dx){return '<g><rect x="'+(x-8)+'" y="143" width="16" height="14" rx="3" fill="'+PUMP+'" stroke="'+INK+'" stroke-width="1.2"/><rect x="'+(x-1.5)+'" y="143" width="3" height="14" fill="#FBF3E6"/><text class="tm" x="'+(x+dx)+'" y="146" text-anchor="'+(dx>0?'start':'end')+'" style="font-size:7.5px">'+lab+'</text></g>'}
 var pumps=pump(88,'DAT',12)+pump(272,'NET',-12);
 function hex(x,y,s){s=s||1;return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M0 -4.4L3.8 -2.2V2.2L0 4.4L-3.8 2.2V-2.2Z" fill="'+AMPf+'" stroke="'+AMP+'" stroke-width="1"/></g>'}
 var AFLOW='M14 168H74Q88 168 88 150Q88 124 104 110';
 var amphIn='<g>'+[[96,92],[176,82],[236,124],[120,130],[284,72]].map(function(p){return hex(p[0],p[1])}).join('')+'</g>';
 var spill=H.puffs([[84,66],[132,82],[150,124],[186,76],[226,88],[240,58],[170,128],[218,126],[100,116],[286,124],[256,76],[124,52]],DAf,DA,2.4);
 var taar='<g><rect x="230" y="38" width="36" height="14" rx="2" fill="#FFF0A8" stroke="'+INK+'" stroke-width="1.1"/><text x="248" y="48" style="font-size:7.5px" font-weight="700" text-anchor="middle">TAAR1</text></g>';
 function arr(x){return '<path d="M'+x+' 126V170" stroke="'+DA+'" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M'+(x-4)+' 164L'+x+' 171L'+(x+4)+' 164" stroke="'+DA+'" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'}
 var rev='<g>'+arr(88)+arr(272)+'</g>';
 var fl=[],i;for(i=0;i<26;i++)fl.push([34+i*11.2,(i%3===0)?160:(i%3===1)?168:176]);
 var flood=H.puffs(fl,DAf,DA,2.4);
 var RX=[110,150,190,230,270];
 var rec='<g>'+RX.map(function(x){return '<g>'+H.receptor(x,184,'#A88400',-1)+'</g>'}).join('')+'</g>';
 /* brain, side view, front on the left */
 var BRAIN='<path d="M70 120C60 70 110 32 180 34C250 36 300 66 300 110C300 140 284 156 260 160C252 174 240 180 228 180L234 216H214L208 178C170 176 120 172 96 160C80 152 72 138 70 120Z" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2" stroke-linejoin="round"/>'+
  '<path d="M246 162C262 150 292 156 290 176C288 192 262 194 248 184Z" fill="#F3E8D8" stroke="'+INK+'" stroke-width="1.5"/>'+
  '<path d="M120 52C132 70 128 88 140 100M176 40C170 62 184 76 176 98M228 46C220 66 236 82 226 104M268 70C254 84 266 102 254 118" fill="none" stroke="#6B76A8" stroke-width="1.2" opacity=".55" stroke-linecap="round"/>'+
  '<text class="tm" x="66" y="204" opacity=".6" style="font-size:8px">FRONT</text>';
 var pfc='<ellipse cx="102" cy="94" rx="30" ry="26" fill="#A9BCFA" stroke="#2F5BE0" stroke-width="1.4" opacity=".85"/>';
 var nac='<ellipse cx="152" cy="128" rx="15" ry="10" fill="'+AMPf+'" stroke="'+AMP+'" stroke-width="1.4"/>';
 var vta='<circle cx="212" cy="160" r="7" fill="'+DAf+'" stroke="'+DA+'" stroke-width="1.3"/>';
 var DB='<circle r="2.6" fill="'+DAf+'" stroke="'+DA+'" stroke-width=".9"/>';
 /* study: Moran 2024 */
 var moran='<text class="tm" x="180" y="24" text-anchor="middle">FIRST PSYCHOSIS OR MANIA · ODDS</text>'+
  '<text class="tm" x="180" y="38" text-anchor="middle" opacity=".75" style="font-size:9px">1,374 CASES vs 2,748 CONTROLS · 2024</text>'+
  H.bars(94,196,112,46,[1/5.3,2.68/5.3,1],['#9AA0C8','#E3A27A',RED],['NO AMPH','ANY DOSE','>40 MG'])+
  '<text class="tb" x="117" y="168" text-anchor="middle" style="font-size:13px">1×</text>'+
  '<text class="tb" x="177" y="133" text-anchor="middle" style="font-size:13px" data-to="2.68" data-dec="2" data-end="2.68×" data-suf="×">2.68×</text>'+
  '<text class="tb" x="237" y="78" text-anchor="middle" style="font-size:13px" data-to="5.3" data-dec="1" data-end="~5.3×" data-pre="~" data-suf="×">~5.3×</text>';
 /* study: Ilieva 2013 */
 var tiles='',k;for(k=0;k<13;k++){var cx=34+(k%7)*22,cy=k<7?88:114;tiles+='<g><rect x="'+(cx-9)+'" y="'+(cy-9)+'" width="18" height="18" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.2"/><path d="M'+(cx-4)+' '+(cy-2)+'h8M'+(cx-4)+' '+(cy+2)+'h8" stroke="'+INK+'" stroke-width="1.4"/></g>'}
 var ilieva='<text class="tm" x="180" y="24" text-anchor="middle">46 HEALTHY ADULTS · ADDERALL vs PLACEBO</text>'+
  '<text class="tm" x="100" y="56" text-anchor="middle">13 TESTS MEASURED</text>'+
  '<text class="tm" x="276" y="56" text-anchor="middle">HOW IT FELT</text>'+
  '<path d="M196 44V200" stroke="#E3E0BF" stroke-width="1.5"/>'+
  '<text class="tb" x="100" y="152" text-anchor="middle" style="font-size:12px">NO GAIN FOR THE GROUP</text>'+
  '<text class="tm" x="100" y="168" text-anchor="middle" opacity=".75" style="font-size:9px">HINT OF GAINS IN LOWER SCORERS</text>'+
  '<text class="tm" x="100" y="196" text-anchor="middle" style="font-size:9px">MEASURED: FLAT · FELT: BETTER</text>';
 var feel='<g><path class="g" d="M262 190V104H246L276 68L306 104H290V190Z" fill="'+DAf+'" stroke="'+DA+'" stroke-width="1.6" stroke-linejoin="round"/>'+
  '<text class="tb" x="276" y="208" text-anchor="middle" style="font-size:11px">FELT SHARPER</text></g>';
 var syn=['term','post','rec'];
 return {
  title:'Adderall at the nerve ending',aria:'Animated diagram: how amphetamine is pulled into dopamine nerve endings by their pumps, spills the storage sacs through VMAT2 and reverses the pumps through TAAR1 so dopamine floods the gap; how that tops up the prefrontal cortex and also reaches the reward areas; a 2024 study linking high doses to psychosis; and a 2013 trial where healthy adults felt sharper without testing better.',
  vb:[360,234],stepMs:5600,
  parts:[
   {id:'term',name:'Nerve ending',info:'The tip of a dopamine or noradrenaline nerve cell, where the signal is stored and released.',svg:TERM},
   {id:'post',name:'Next cell',info:'The cell on the other side of the gap, which reads the dopamine through its receptors.',svg:POST},
   {id:'rec',name:'Receptors',info:'Dopamine receptors on the next cell; the more dopamine in the gap, the stronger the signal.',svg:rec},
   {id:'ves',name:'Storage sacs',info:'Vesicles that hold dopamine until a nerve impulse releases a measured amount.',svg:ves},
   {id:'vesLeak',name:'Leaking sacs',info:'With VMAT2 jammed, the sacs can no longer hold their dopamine and it leaks into the nerve ending.',svg:vesLeak},
   {id:'vmat',name:'VMAT2',info:'The pump that packs dopamine into the storage sacs. Amphetamine jams it.',svg:vmat},
   {id:'pumps',name:'DAT and NET',info:'Recycling pumps that pull dopamine (DAT) and noradrenaline (NET) back into the nerve ending after a signal.',svg:pumps},
   {id:'amph',name:'Amphetamine entering',info:'Amphetamine is shaped enough like dopamine that the recycling pumps carry it inside.',svg:'<g class="flowg"></g>',flow:{path:AFLOW,n:4,ms:3400,bead:hex(0,0,1.1)}},
   {id:'amphIn',name:'Amphetamine inside',info:'Once inside, amphetamine works on the storage sacs and on TAAR1.',svg:amphIn},
   {id:'spill',name:'Loose dopamine',info:'Dopamine spilled from the sacs, now free inside the nerve ending.',svg:spill},
   {id:'taar',name:'TAAR1',info:'A receptor inside the nerve ending. Amphetamine switches it on, which flips the recycling pumps into reverse.',svg:taar},
   {id:'rev',name:'Pumps reversed',info:'The pumps now push dopamine and noradrenaline out instead of pulling them in.',svg:rev},
   {id:'flood',name:'Dopamine flood',info:'Far more dopamine in the gap than a normal signal releases.',svg:flood},
   {id:'brain',name:'Brain',info:'Side view of the brain, front on the left.',svg:BRAIN},
   {id:'pfc',name:'Prefrontal cortex',info:'The planning and braking area behind the forehead: holding attention, finishing tasks, stopping impulses.',svg:pfc},
   {id:'nac',name:'Reward area',info:'The nucleus accumbens, the hub of the reward system. A fast dopamine surge here feels good and drives wanting more.',svg:nac},
   {id:'vta',name:'Dopamine source',info:'The midbrain cluster (VTA) whose nerve endings supply dopamine to the front of the brain and the reward area.',svg:vta},
   {id:'dPfc',name:'Dopamine to the front',info:'Dopamine nerve fibres running to the prefrontal cortex.',svg:'<g class="flowg"></g>',flow:{path:'M212 160C190 120 140 92 104 94',n:5,ms:3000,bead:DB}},
   {id:'dNac',name:'Dopamine to reward',info:'Dopamine nerve fibres running to the reward area.',svg:'<g class="flowg"></g>',flow:{path:'M212 160C198 148 176 134 154 128',n:5,ms:1800,bead:DB}},
   /* study */
   {id:'moran',name:'Psychosis study',info:'Case-control study of first psychosis or mania at Mass General Brigham, 2024.',svg:moran},
   {id:'tiles',name:'13 tests',info:'Memory, working memory, impulse control, creativity, intelligence and school-style tests.',svg:'<g>'+tiles+'</g>'},
   {id:'ilieva',name:'Healthy-adult trial',info:'Double-blind crossover trial of Adderall vs placebo in healthy young adults, 2013.',svg:ilieva},
   {id:'feel',name:'How it felt',info:'Participants believed their performance was more enhanced on the active pill than on placebo.',svg:feel}
  ],
  steps:[
   {key:'enter',btn:'Enter',title:'Pulled in by the pumps',marks:[['c','Pharmacology']],
    text:'Amphetamine looks enough like dopamine and noradrenaline that the nerve ending’s own recycling pumps, DAT and NET, carry it inside. It only acts strongly where those pumps are.',
    model:'Cell and animal pharmacology',
    show:syn.concat(['ves','pumps','amph']),
    anim:[{p:'amph',type:'flow'},{p:'pumps',type:'pulse',sel:'rect',to:1.15,dur:1600}],
    labels:[{p:'amph',t:'Amphetamine',x:4,y:200,ax:30,ay:168},{p:'pumps',t:'Recycling pump',x:118,y:204,ax:88,ay:152},{p:'ves',t:'Storage sacs',x:232,y:22,ax:216,ay:54}]},
   {key:'spill',btn:'Spill',title:'The storage sacs spill',marks:[['c','Pharmacology']],
    text:'Inside, it jams VMAT2, the pump that packs dopamine into storage sacs. The sacs leak and dopamine piles up loose inside the nerve ending.',
    model:'Cell and animal pharmacology',
    show:syn.concat(['vesLeak','vmat','pumps','amphIn','spill']),
    anim:[{p:'vmat',type:'pulse',sel:'rect',to:1.3,dur:1400},{p:'spill',type:'fadeIn',sel:'circle',delay:500,dur:600,stagger:110},{p:'spill',type:'move',sel:'circle',each:[[-6,4],[4,-6],[-4,-4],[6,4],[-5,5],[4,6],[-6,-3],[5,-5],[3,6],[-4,6],[6,-3],[-3,-6]],delay:500,dur:1600}],
    labels:[{p:'vmat',t:'VMAT2 jammed',x:228,y:22,ax:225,ay:56},{p:'spill',t:'Loose dopamine',x:4,y:200,ax:100,ay:116}]},
   {key:'reverse',btn:'Reverse',title:'The pumps run backwards',marks:[['c','Pharmacology']],
    text:'It also switches on TAAR1, which flips the recycling pumps into reverse. Instead of clearing dopamine away they push it out, flooding the gap and firing the next cell. Methylphenidate only blocks the pumps; amphetamine forces them.',
    model:'Cell and animal pharmacology',
    show:syn.concat(['vesLeak','pumps','spill','taar','rev','flood']),
    anim:[{p:'taar',type:'pulse',sel:'rect',to:1.12,dur:1200},{p:'rev',type:'draw',sel:'path',delay:500,dur:900},{p:'flood',type:'fadeIn',sel:'circle',delay:1100,dur:500,stagger:45},{p:'rec',type:'pulse',sel:'g',to:1.25,delay:1800,dur:1100}],
    labels:[{p:'taar',t:'TAAR1 on',x:270,y:22,ax:266,ay:42},{p:'rev',t:'Pumps reversed',x:110,y:204,ax:88,ay:166},{p:'flood',t:'Dopamine flood',x:220,y:204,ax:234,ay:168}]},
   {key:'focus',btn:'Focus',title:'The planning brain tops up',marks:[['h','Human']],
    text:'In ADHD the prefrontal cortex, the brain’s planning and braking area, runs short on dopamine and noradrenaline signal. Topping it up helps attention hold and impulses slow. In adults it is the strongest ADHD medicine on average.',
    model:'133 trials, network meta-analysis',src:[{t:'Cortese 2018, Lancet Psychiatry',u:'https://pmc.ncbi.nlm.nih.gov/articles/PMC6109107'}],
    show:['brain','pfc','vta','dPfc'],
    anim:[{p:'dPfc',type:'flow'},{p:'pfc',type:'pulse',to:1.08,op:.7,dur:1800}],
    labels:[{p:'pfc',t:'Prefrontal cortex',x:4,y:20,ax:96,ay:72},{p:'vta',t:'Dopamine source',x:236,y:204,ax:212,ay:166}]},
   {key:'reward',btn:'Reward',title:'The same flood hits reward',marks:[['h','Human']],
    text:'The same surge reaches the reward area deep in the brain. At prescribed doses taken by mouth it stays mild; at higher doses, or snorted or injected, it turns into a rush. That is where misuse and addiction start, and why it carries a boxed warning.',
    model:'FDA boxed warning',src:[{t:'Adderall FDA label',u:'https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/011522s045lbl.pdf'}],
    show:['brain','nac','vta','dNac'],
    anim:[{p:'dNac',type:'flow'},{p:'nac',type:'pulse',to:1.25,op:.8,dur:900}],
    labels:[{p:'nac',t:'Reward area',x:120,y:204,ax:152,ay:138},{p:'vta',t:'Dopamine source',x:236,y:204,ax:212,ay:166}]},
   {key:'risk',btn:'Risk',study:1,title:'Higher dose, higher psychosis risk',marks:[['h','Human']],ms:7000,
    text:'In 1,374 people admitted with a first psychosis or mania, compared with 2,748 controls, any prescription amphetamine in the past month went with 2.68 times the odds. Above 40 mg of Adderall a day, about 5.3 times. Methylphenidate showed no rise.',
    model:'Case-control, Mass General Brigham',src:[{t:'Moran 2024, Am J Psychiatry',u:'https://psychiatryonline.org/doi/10.1176/appi.ajp.20230329'},{t:'Psychiatric News summary',u:'https://psychiatryonline.org/doi/10.1176/appi.pn.2024.12.12.6'}],
    show:['moran'],
    anim:[{p:'moran',type:'grow',sel:'.g',dur:1500,delay:400,stagger:350},{p:'moran',type:'count',delay:900,dur:1600}],
    labels:[]},
   {key:'feel',btn:'Feel',study:1,title:'In healthy brains: felt more than real',marks:[['h','Human']],ms:7400,
    text:'In 46 healthy young adults, double-blind against placebo, Adderall did not improve any of 13 thinking tests for the group as a whole, with only a hint of gains in lower scorers on three. Yet people believed the pill had sharpened them. The feeling is bigger than the result.',
    model:'Double-blind crossover trial',src:[{t:'Ilieva 2013, Neuropharmacology',u:'https://doi.org/10.1016/j.neuropharm.2012.07.021'}],
    show:['ilieva','tiles','feel'],
    anim:[{p:'tiles',type:'fadeIn',sel:'g',dur:400,stagger:90},{p:'feel',type:'grow',sel:'.g',delay:1600,dur:1400}],
    labels:[]}
  ]
 };
});
