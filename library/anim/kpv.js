/* KPV story v1 (22 Nov 2026). Scene: inflamed gut lining. KPV (Lys-Pro-Val) is carried into the cell by PepT1 and
   holds the NF-kB inflammation switch off; then a human-cell dish study and two mouse colitis models. */
BSAnim.define('kpv',function(H,INK){
 var RED='#E05050',REDF='#FFD2D2',TEAL='#2E8F82',GOLD='#A88400';
 var CX=[20,84,148,212,276],W=64,FOC=180,TOP=36,BOT=94;
 /* five columnar epithelial cells lining the gut, nuclei near the base */
 var cells='';CX.forEach(function(x){cells+='<rect x="'+x+'" y="'+TOP+'" width="'+W+'" height="'+(BOT-TOP)+'" rx="5" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4"/><ellipse cx="'+(x+W/2)+'" cy="82" rx="7.5" ry="9.5" fill="#C9C3F0" stroke="'+INK+'" stroke-width="1"/>'});
 var brush='';for(var bx=24;bx<338;bx+=7)brush+='<path d="M'+bx+' '+TOP+'v-4"/>';
 function door(x){return '<path d="M'+(x-5)+' '+TOP+'v-7m10 7v-7" stroke="'+GOLD+'" stroke-width="2.4" stroke-linecap="round" fill="none"/>'}
 var pept1=door(FOC)+door(116)+door(244);
 var KBEAD='<g><circle cx="-4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/><circle r="2.4" fill="#A9BCFA" stroke="#2F5BE0" stroke-width=".8"/><circle cx="4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/></g>';
 function sw(on){var c=on?RED:'#B9B9B9',f=on?REDF:'#EDEDED';return '<g transform="translate('+FOC+' 60)"><rect x="-9" y="-9" width="18" height="18" rx="4" fill="'+f+'" stroke="'+c+'" stroke-width="1.8"/><path d="M-4 0h8M0 -4v8" stroke="'+c+'" stroke-width="2" stroke-linecap="round"/>'+(on?'<g stroke="'+RED+'" stroke-width="1.6" stroke-linecap="round"><path d="M12 -12l5 -5M14 0h6M12 12l5 5"/></g>':'')+'</g>'}
 var immune=H.spindle(60,122,12,.72,'#E1DE62',INK)+H.spindle(300,126,-16,.72,'#E1DE62',INK)+H.cell(170,138,9,'#F4F0C4',INK,'#C9C3F0');
 var cyto=H.puffs([[48,20],[150,14],[300,22],[210,24],[60,116],[128,146],[250,140],[320,120],[180,150]],REDF,RED,3);
 var FLOW='M180 -8L180 70';
 /* study: human cells in a dish, NF-kB activity */
 var dishsc=H.dish(86,104,44,'HUMAN GUT CELLS')+H.spindle(76,98,20,.5,'#E1DE62',INK)+H.spindle(96,110,-26,.5,'#E1DE62',INK)+H.cell(86,100,7,'#F4F0C4',INK,'#C9C3F0');
 var barD='<text class="tm" x="248" y="40" text-anchor="middle">NF-&#954;B ACTIVITY</text>'+H.bars(206,180,116,36,[1,.32],[RED,TEAL],['NO KPV','KPV']);
 /* study: two mouse colitis models, gut inflammation down */
 var barM='<text class="tm" x="250" y="40" text-anchor="middle">GUT INFLAMMATION</text>'+H.bars(208,176,112,36,[1,.34],[RED,TEAL],['DSS','DSS+KPV']);
 var wt='<g fill="none" stroke="'+TEAL+'" stroke-width="2.2" stroke-linecap="round"><path d="M70 150C96 150 110 120 150 112"/></g><path d="M150 112l-7 1.5M150 112l-2 7" stroke="'+TEAL+'" stroke-width="2.2" stroke-linecap="round" fill="none"/><text class="tm" x="70" y="166">WEIGHT REGAINED</text>';
 return {
  title:'KPV in an inflamed gut',aria:'Animated diagram: how the tripeptide KPV is carried into gut-lining cells by PepT1 and quiets the NF-kB inflammation switch, with a human-cell study and two mouse colitis models.',
  vb:[360,234],stepMs:5200,
  parts:[
   {id:'epi',name:'Gut lining cells',info:'The single layer of cells covering the gut; it both absorbs and keeps the gut contents out.',svg:'<g>'+cells+'</g>'},
   {id:'brush',name:'Brush border',info:'The dense fringe of microvilli on the cells facing the gut interior.',svg:'<g fill="none" stroke="#C98A7A" stroke-width="1.2" stroke-linecap="round">'+brush+'</g>'},
   {id:'lumen',name:'Gut interior',info:'The open space of the gut; KPV taken by mouth reaches the lining from here.',svg:'<text class="tm" x="8" y="14" opacity=".7">GUT INTERIOR</text>'},
   {id:'pept1',name:'PepT1 transporter',info:'A di/tripeptide door the colon switches on when inflamed; it carries KPV straight into the cell.',svg:'<g>'+pept1+'</g>'},
   {id:'nfkbOn',name:'NF-κB switch (firing)',info:'The master switch for inflammation genes; stuck on in inflamed gut.',svg:sw(1)},
   {id:'nfkbOff',name:'NF-κB switch (held off)',info:'With KPV inside, the switch stops firing and inflammation genes quieten.',svg:sw(0)},
   {id:'immune',name:'Immune cells',info:'White cells in the layer below the lining; they release and respond to inflammatory signals.',svg:immune},
   {id:'cyto',name:'Inflammatory cytokines',info:'Messengers such as TNF and IL-8 that drive and spread inflammation.',svg:cyto},
   {id:'vessel',name:'Blood vessel',info:'Carries immune cells and signals to and from the gut wall.',svg:'<rect x="-4" y="210" width="368" height="9" rx="4.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 214.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   {id:'kpv',name:'KPV',info:'Lys-Pro-Val: the three-amino-acid tail of α-MSH. Small enough to ride through PepT1.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3600,bead:KBEAD}},
   /* study: dish */
   {id:'dishsc',name:'Human gut cells',info:'Gut-lining cells and T cells grown in a dish and stirred up with inflammatory signals.',svg:dishsc},
   {id:'barD',name:'NF-κB activity',info:'Measured with an NF-κB reporter: much lower when KPV could get in.',svg:barD},
   /* study: mice */
   {id:'rat',name:'Mouse colitis',info:'Two models (DSS in the drinking water, and a T-cell transfer model) given KPV or not.',svg:H.rodent(48,52,.8)+'<text class="tm" x="96" y="30">TWO COLITIS MODELS</text><text class="tm" x="96" y="46" opacity=".75">KPV vs NONE</text>'},
   {id:'barM',name:'Gut inflammation',info:'Colon inflammation and MPO, a marker of white-cell infiltrate, were lower with KPV.',svg:barM},
   {id:'wt',name:'Weight regained',info:'KPV-treated mice stopped losing weight sooner and climbed back up.',svg:wt}
  ],
  steps:[
   {key:'inflamed',btn:'Inflamed',title:'An inflamed gut',marks:[['h','Human anatomy'],['c','Cells']],
    text:'In inflamed gut the lining cells and the immune cells below them have their NF-κB switch stuck on. It pushes out inflammatory cytokines, and the inflammation feeds itself.',
    model:'Textbook gut inflammation',
    show:['lumen','epi','brush','nfkbOn','immune','cyto','vessel'],
    anim:[{p:'cyto',type:'pulse',sel:'circle',to:1.2,dur:1700,stagger:140},{p:'nfkbOn',type:'pulse',to:1.1,dur:1400}],
    labels:[{p:'nfkbOn',t:'NF-κB firing',x:196,y:30,ax:180,ay:52},{p:'cyto',t:'Inflammatory cytokines',x:6,y:170,ax:128,ay:146}]},
   {key:'enter',btn:'In',title:'Carried inside',marks:[['c','Human cells']],
    text:'KPV is tiny: Lys-Pro-Val, the three-amino-acid tail of α-MSH. Inflamed colon switches on PepT1, a di/tripeptide door, and it carries KPV straight in rather than leaving it to wait on a surface receptor.',
    model:'Human gut epithelial and immune cells',
    show:['lumen','epi','brush','pept1','nfkbOn','immune','cyto','vessel','kpv'],
    anim:[{p:'pept1',type:'fadeIn',dur:700},{p:'kpv',type:'flow'}],
    labels:[{p:'pept1',t:'PepT1 door',x:206,y:20,ax:180,ay:30},{p:'kpv',t:'KPV carried in',x:30,y:66,ax:172,ay:60}]},
   {key:'quiet',btn:'Quiet',title:'The switch held off',marks:[['c','Human cells']],
    text:'Inside the cell, nanomolar KPV holds the NF-κB and MAP-kinase pathways off. The switch that turns on inflammation genes stops firing.',
    model:'Human gut epithelial and immune cells',
    show:['lumen','epi','brush','pept1','nfkbOff','immune','cyto','vessel','kpv'],
    anim:[{p:'kpv',type:'flow'},{p:'nfkbOff',type:'scale',from:.7,dur:700}],
    labels:[{p:'nfkbOff',t:'NF-κB held off',x:196,y:30,ax:180,ay:52}]},
   {key:'calm',btn:'Calm',title:'Inflammation settles',marks:[['c','Cells']],
    text:'Fewer inflammatory cytokines leave the cell, so the immune cells below settle. The loop that kept the inflammation going is broken.',
    model:'Cell and mouse colitis studies',
    show:['lumen','epi','brush','nfkbOff','immune','cyto','vessel'],
    anim:[{p:'cyto',type:'shrink',sel:'circle',to:.3,dur:2200,stagger:80}],
    labels:[{p:'cyto',t:'Fewer cytokines',x:6,y:170,ax:128,ay:146}]},
   {key:'dish',btn:'Dish',study:1,title:'In a dish: the switch drops',marks:[['c','Human gut cells']],ms:6000,
    text:'Human gut-lining cells and T cells were stirred up with inflammatory signals, then given KPV. Nanomolar KPV cut NF-κB activity and cytokine output, and it only worked where PepT1 could carry it in.',
    model:'Human intestinal epithelial cells, T cells',src:[{t:'Dalmasso 2008, Gastroenterology',u:'https://doi.org/10.1053/j.gastro.2007.10.026'}],
    show:['dishsc','barD'],
    anim:[{p:'barD',type:'grow',sel:'.g',dur:1600,delay:400,stagger:300}],
    labels:[{p:'barD',t:'NF-κB falls with KPV',x:150,y:210,ax:266,ay:120}]},
   {key:'mice',btn:'Mice',study:1,title:'In mice: colitis eases',marks:[['a','Mouse']],ms:6400,
    text:'In two mouse colitis models, KPV-treated mice recovered earlier, regained weight, and had less inflammatory infiltrate and lower MPO in the colon. The effect held even without a working MC1 receptor.',
    model:'Mice, two colitis models',src:[{t:'Kannengiesser 2008, Inflamm Bowel Dis',u:'https://doi.org/10.1002/ibd.20334'}],
    show:['rat','barM','wt'],
    anim:[{p:'barM',type:'grow',sel:'.g',dur:1600,delay:400,stagger:300},{p:'wt',type:'draw',sel:'path',dur:2200,delay:1400}],
    labels:[{p:'barM',t:'Less inflammation',x:150,y:210,ax:268,ay:116}]}
  ]
 };
});
