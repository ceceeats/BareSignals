/* KPV story v2 (22 Nov 2026). Full-frame gut cross-section to the BPC-157/GHK-Cu standard: inflamed lining, PepT1
   import, NF-kB held off, inflammation resolves, barrier heals; then a human-cell dish study and two mouse colitis
   models, each as two labelled panels with a count. */
BSAnim.define('kpv',function(H,INK){
 var RED='#E05050',REDF='#FFD2D2',TEAL='#2E8F82',GOLD='#A88400',PUR='#7A5CC8';
 var NC=7,CW=368/NC,TOP=16,BOT=86;
 var CXS=[];for(var i=0;i<NC;i++)CXS.push(-4+i*CW+CW/2);
 /* epithelium: a full row of columnar cells with nuclei near the base */
 var cells='';CXS.forEach(function(cx){cells+='<rect x="'+(cx-CW/2+1.5).toFixed(1)+'" y="'+TOP+'" width="'+(CW-3).toFixed(1)+'" height="'+(BOT-TOP)+'" rx="5" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/><ellipse cx="'+cx.toFixed(1)+'" cy="76" rx="7.5" ry="9.5" fill="#C9C3F0" stroke="'+INK+'" stroke-width="1"/>'});
 var brush='';for(var bx=4;bx<360;bx+=6)brush+='<path d="M'+bx+' '+TOP+'v-5"/>';
 function door(cx){return '<path d="M'+(cx-5)+' '+TOP+'v-7m10 7v-7" stroke="'+GOLD+'" stroke-width="2.4" stroke-linecap="round" fill="none"/>'}
 var pept1=CXS.map(door).join('');
 var KBEAD='<g><circle cx="-4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/><circle r="2.4" fill="#A9BCFA" stroke="#2F5BE0" stroke-width=".8"/><circle cx="4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/></g>';
 function sw(on,cx){var c=on?RED:'#B5B5B5',f=on?REDF:'#ECECEC';return '<g transform="translate('+cx+' 44)"><rect x="-8" y="-8" width="16" height="16" rx="4" fill="'+f+'" stroke="'+c+'" stroke-width="1.7"/><path d="M-3.5 0h7M0 -3.5v7" stroke="'+c+'" stroke-width="1.9" stroke-linecap="round"/>'+(on?'<g stroke="'+RED+'" stroke-width="1.4" stroke-linecap="round" opacity=".9"><path d="M11 -10l4 -4M12 0h5M11 10l4 4"/></g>':'')+'</g>'}
 var NFC=[CXS[1],CXS[3],CXS[5]];
 var nfkbOn=NFC.map(function(cx){return sw(1,cx)}).join('');
 var nfkbOff=NFC.map(function(cx){return sw(0,cx)}).join('');
 /* lamina propria: scattered immune cells across the whole width */
 var IM=[[30,112,16],[86,128,-20],[150,116,10],[210,132,-14],[268,118,22],[322,130,-10]];
 var immune=IM.map(function(p){return H.spindle(p[0],p[1],p[2],.72,'#E1DE62',INK)}).join('')+H.cell(120,146,8,'#F4F0C4',INK,'#C9C3F0')+H.cell(244,148,8,'#F4F0C4',INK,'#C9C3F0')+H.cell(300,150,7,'#F4F0C4',INK,'#C9C3F0');
 var caps='<g fill="none" stroke="#C0392B" stroke-width="2.4" opacity=".55" stroke-linecap="round"><path d="M12 158C60 150 90 166 140 158"/><path d="M196 162C244 154 286 168 348 158"/></g>';
 var matrix='<g fill="none" stroke="#D8D2B4" stroke-width="1" opacity=".6">'+[100,128,170].map(function(y){return '<path d="'+H.crimp(6,354,y,1.2,26)+'"/>'}).join('')+'</g>';
 var cyto=H.puffs([[40,8],[120,6],[210,10],[300,8],[60,104],[150,100],[250,104],[330,112],[24,140],[190,148],[284,142],[96,118]],REDF,RED,3);
 var MOL='<circle cx="316" cy="44" r="27" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/>'+
  '<g font-size="10" font-weight="700" text-anchor="middle">'+
  [['K',300,40],['P',316,34],['V',332,40]].map(function(b){return '<circle cx="'+b[1]+'" cy="'+b[2]+'" r="7.5" fill="#EFEAD0" stroke="'+INK+'" stroke-width="1.1"/><text x="'+b[1]+'" y="'+(b[2]+3.5)+'">'+b[0]+'</text>'}).join('')+'</g>'+
  '<text class="tm" x="316" y="62" text-anchor="middle" font-size="7">α-MSH TAIL</text>';
 var barrier='<g fill="none" stroke="'+TEAL+'" stroke-width="2.4" stroke-linecap="round"><path d="M2 '+(TOP-1)+'H358"/></g>';
 var FLOW='M300 30C280 48 250 40 220 44C190 48 180 58 180 72';
 /* study: human cells in a dish, two tiles + count */
 function dtile(cx,lab,hot){var g=hot?RED:TEAL;var cells='';[[0,-6,14],[-14,4,-24],[13,6,30],[-8,16,-10],[10,16,20]].forEach(function(p){cells+=H.spindle(cx+p[0],70+p[1],p[2],.5,'#E1DE62',INK)});
  return '<rect x="'+(cx-62)+'" y="36" width="124" height="104" rx="4" fill="#FDFBEA" stroke="'+INK+'" stroke-width="1.3"/><text class="tm" x="'+cx+'" y="30" text-anchor="middle">'+lab+'</text>'+cells+
   '<g fill="none" stroke="'+g+'" stroke-width="1.5" opacity=".8">'+[[0,-6],[-14,4],[13,6],[-8,16],[10,16]].map(function(p){return '<circle cx="'+(cx+p[0])+'" cy="'+(70+p[1])+'" r="11"/>'}).join('')+'</g>'}
 var dishsc=dtile(92,'STIMULATED',1)+dtile(268,'STIMULATED + KPV',0)+
  '<text class="tb" x="92" y="168" font-size="20" text-anchor="middle" data-to="100" data-suf="%">100%</text>'+
  '<text class="tb" x="268" y="168" font-size="20" text-anchor="middle" fill="'+TEAL+'" data-to="31" data-suf="%">31%</text>'+
  '<text class="tm" x="92" y="186" text-anchor="middle">NF-κB ACTIVITY</text><text class="tm" x="268" y="186" text-anchor="middle">NF-κB ACTIVITY</text>';
 /* study: two mouse colon panels + count */
 function colon(cx,lab,hurt){var ero=hurt?'<g fill="'+REDF+'" stroke="'+RED+'" stroke-width="1" stroke-dasharray="3 2">'+[[-34,0],[-6,0],[22,0]].map(function(d){return '<path d="M'+(cx+d-10)+' 52q10 12 20 0z"/>'}).join('')+'</g>':'';
  var vil='';for(var x=cx-50;x<cx+50;x+=10)vil+='<path d="M'+x+' 52q5 '+(hurt?-6:-14)+' 10 0" />';
  return '<rect x="'+(cx-58)+'" y="40" width="116" height="60" rx="4" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/><text class="tm" x="'+cx+'" y="34" text-anchor="middle">'+lab+'</text><g fill="none" stroke="#C98A7A" stroke-width="1.3">'+vil+'</g>'+ero+
   '<g fill="'+(hurt?RED:'#E1DE62')+'" opacity="'+(hurt?'.8':'.6')+'">'+[[-40,80],[-14,86],[16,82],[42,88],[0,92]].map(function(p){return '<circle cx="'+(cx+p[0])+'" cy="'+p[1]+'" r="'+(hurt?3.2:2)+'"/>'}).join('')+'</g>'}
 var mice=colon(96,'DSS',1)+colon(264,'DSS + KPV',0)+
  '<text class="tb" x="96" y="130" font-size="19" text-anchor="middle" data-to="100" data-suf="" data-pre="">100</text>'+
  '<text class="tb" x="264" y="130" font-size="19" text-anchor="middle" fill="'+TEAL+'" data-to="38" data-pre="">38</text>'+
  '<text class="tm" x="96" y="148" text-anchor="middle">INFLAMMATION</text><text class="tm" x="264" y="148" text-anchor="middle">INFLAMMATION</text>'+
  '<text class="tm" x="180" y="170" text-anchor="middle" opacity=".8">LOWER MPO · LESS INFILTRATE · WEIGHT REGAINED</text>';
 var base=['lumen','epi','brush','matrix','immune','caps','vessel'];
 return {
  title:'KPV in an inflamed gut',aria:'Animated diagram: how the tripeptide KPV is carried into gut-lining cells by PepT1 and holds the NF-kB inflammation switch off, with a human-cell dish study and two mouse colitis models.',
  vb:[360,234],stepMs:5200,
  parts:[
   {id:'lumen',name:'Gut interior',info:'The open space of the gut; KPV taken by mouth reaches the lining from here.',svg:'<text class="tm" x="6" y="11" opacity=".65">GUT INTERIOR</text>'},
   {id:'epi',name:'Gut lining cells',info:'The single layer of columnar cells covering the gut: it absorbs food and keeps the gut contents out.',svg:'<g>'+cells+'</g>'},
   {id:'brush',name:'Brush border',info:'The dense fringe of microvilli on the cells facing the gut interior.',svg:'<g fill="none" stroke="#C98A7A" stroke-width="1.1" stroke-linecap="round">'+brush+'</g>'},
   {id:'matrix',name:'Connective tissue',info:'The supporting layer under the lining (lamina propria).',svg:matrix},
   {id:'immune',name:'Immune cells',info:'White cells in the layer below the lining; they release and respond to inflammatory signals.',svg:'<g>'+immune+'</g>'},
   {id:'caps',name:'Capillaries',info:'Tiny vessels that bring immune cells into the gut wall.',svg:caps},
   {id:'vessel',name:'Blood vessel',info:'Carries immune cells and signals to and from the gut wall.',svg:'<rect x="-4" y="198" width="368" height="11" rx="5.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 203.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   {id:'pept1',name:'PepT1 transporter',info:'A di/tripeptide door the colon switches on when inflamed; it carries KPV straight into the cell.',svg:'<g>'+pept1+'</g>'},
   {id:'nfkbOn',name:'NF-κB switch (firing)',info:'The master switch for inflammation genes; stuck on in inflamed gut.',svg:'<g>'+nfkbOn+'</g>'},
   {id:'nfkbOff',name:'NF-κB switch (held off)',info:'With KPV inside, the switch stops firing and inflammation genes quieten.',svg:'<g>'+nfkbOff+'</g>'},
   {id:'cyto',name:'Inflammatory cytokines',info:'Messengers such as TNF and IL-8 that drive and spread inflammation.',svg:cyto},
   {id:'mol',name:'KPV',info:'Lys-Pro-Val: the three-amino-acid tail of α-MSH. Small enough to ride through PepT1.',svg:MOL},
   {id:'kpv',name:'KPV entering',info:'KPV crossing from the gut interior into a lining cell through PepT1.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3400,bead:KBEAD}},
   {id:'barrier',name:'Restored barrier',info:'A tight, intact lining once the inflammation settles.',svg:barrier},
   /* study: dish */
   {id:'dishsc',name:'Human gut cells',info:'Gut-lining cells and T cells grown in a dish, stirred up with inflammatory signals, with or without KPV.',svg:dishsc},
   /* study: mice */
   {id:'mice',name:'Mouse colon',info:'Two colitis models (DSS in the drinking water, and a T-cell transfer model), colon wall shown with and without KPV.',svg:mice}
  ],
  steps:[
   {key:'inflamed',btn:'Inflamed',title:'An inflamed gut',marks:[['h','Human anatomy'],['c','Cells']],
    text:'In inflamed gut the lining cells and the immune cells below them have their NF-κB switch stuck on. It pushes out inflammatory cytokines across the wall, and the inflammation feeds itself.',
    model:'Textbook gut inflammation',
    show:base.concat(['nfkbOn','cyto']),
    anim:[{p:'cyto',type:'pulse',sel:'circle',to:1.22,dur:1700,stagger:110},{p:'nfkbOn',type:'pulse',sel:'g',to:1.1,dur:1400,stagger:160},{p:'immune',type:'pulse',sel:'g',to:1.08,dur:1800,stagger:140}],
    labels:[{p:'nfkbOn',t:'NF-κB firing',x:120,y:120,ax:CXS[3],ay:44},{p:'cyto',t:'Inflammatory cytokines',x:6,y:178,ax:150,ay:100}]},
   {key:'enter',btn:'In',title:'Carried inside',marks:[['c','Human cells']],
    text:'KPV is tiny: Lys-Pro-Val, the three-amino-acid tail of α-MSH. Inflamed colon switches on PepT1, a di/tripeptide door, and it carries KPV straight in rather than leaving it to wait on a surface receptor.',
    model:'Human gut epithelial and immune cells',
    show:base.concat(['pept1','nfkbOn','cyto','mol','kpv']),
    anim:[{p:'pept1',type:'fadeIn',sel:'path',dur:700,stagger:70},{p:'mol',type:'scale',from:.6,dur:700},{p:'kpv',type:'flow'}],
    labels:[{p:'pept1',t:'PepT1 doors (switched on)',x:6,y:112,ax:CXS[2],ay:TOP-3},{p:'kpv',t:'KPV carried in',x:120,y:120,ax:180,ay:66}]},
   {key:'quiet',btn:'Quiet',title:'The switch held off',marks:[['c','Human cells']],
    text:'Inside the cell, nanomolar KPV holds the NF-κB and MAP-kinase pathways off. The switch that turns on inflammation genes stops firing.',
    model:'Human gut epithelial and immune cells',
    show:base.concat(['pept1','nfkbOff','cyto','kpv']),
    anim:[{p:'kpv',type:'flow'},{p:'nfkbOff',type:'scale',sel:'g',from:.7,dur:700,stagger:140}],
    labels:[{p:'nfkbOff',t:'NF-κB held off',x:120,y:120,ax:CXS[3],ay:44},{p:'nfkbOff',t:'MAP-kinase too',x:230,y:120,ax:CXS[5],ay:44}]},
   {key:'calm',btn:'Calm',title:'Inflammation settles',marks:[['c','Cells']],
    text:'Fewer inflammatory cytokines leave the cells, so the immune cells below settle. The loop that kept the inflammation going is broken.',
    model:'Cell and mouse colitis studies',
    show:base.concat(['nfkbOff','cyto']),
    anim:[{p:'cyto',type:'shrink',sel:'circle',to:.25,dur:2300,stagger:70},{p:'immune',type:'scale',sel:'g',from:1,to:1,dur:400}],
    labels:[{p:'cyto',t:'Fewer cytokines',x:6,y:178,ax:150,ay:100},{p:'immune',t:'Immune cells settle',x:214,y:178,ax:268,ay:118}]},
   {key:'heal',btn:'Heal',title:'The lining recovers',marks:[['c','Cells'],['a','Mouse']],
    text:'With the loop broken, the lining repairs and the barrier closes. In the mouse models this showed up as faster recovery and regained weight.',
    model:'Mouse colitis recovery',
    show:base.concat(['nfkbOff','barrier']),
    anim:[{p:'barrier',type:'draw',sel:'path',dur:2200},{p:'brush',type:'fadeIn',sel:'path',dur:900,stagger:12}],
    labels:[{p:'barrier',t:'Barrier closes',x:120,y:178,ax:180,ay:TOP-1}]},
   {key:'dish',btn:'Dish',study:1,title:'In a dish: the switch drops',marks:[['c','Human gut cells']],ms:6200,
    text:'Human gut-lining cells and T cells were stirred up with inflammatory signals, then given KPV. Nanomolar KPV cut NF-κB activity and cytokine output by roughly two thirds, and it only worked where PepT1 could carry it in.',
    model:'Human intestinal epithelial cells, T cells',src:[{t:'Dalmasso 2008, Gastroenterology',u:'https://doi.org/10.1053/j.gastro.2007.10.026'}],
    show:['dishsc'],
    anim:[{p:'dishsc',type:'count',delay:500,dur:2000},{p:'dishsc',type:'fadeIn',sel:'circle',dur:700,stagger:40}],
    labels:[{p:'dishsc',t:'NF-κB falls with KPV',x:206,y:206,ax:268,ay:70}]},
   {key:'mice',btn:'Mice',study:1,title:'In mice: colitis eases',marks:[['a','Mouse']],ms:6400,
    text:'In two mouse colitis models, KPV-treated mice recovered earlier, regained weight, and had less inflammatory infiltrate and lower MPO in the colon. The effect held even without a working MC1 receptor.',
    model:'Mice, two colitis models',src:[{t:'Kannengiesser 2008, Inflamm Bowel Dis',u:'https://doi.org/10.1002/ibd.20334'}],
    show:['mice'],
    anim:[{p:'mice',type:'count',delay:500,dur:2000}],
    labels:[{p:'mice',t:'Less inflammation',x:232,y:108,ax:264,ay:66}]}
  ]
 };
});
