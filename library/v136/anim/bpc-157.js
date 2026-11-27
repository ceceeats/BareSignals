/* BPC-157 story v2 (21 Nov 2026): torn tendon (5 mechanism steps, kept from v1) + what happened in rats and in a dish. */
BSAnim.define('bpc-157',function(H,INK){
 var FY=[108,118,128,138,148,158,168,178],T0=100,T1=188;
 function eL(y){var i=Math.round((y-T0)/8);return 140+((i%2)?7:0)}          /* frayed left edge */
 function eR(y){return 360-eL(y)}
 var edgeL='M-4 '+T0,edgeR='M364 '+T0,y;
 for(y=T0;y<=T1;y+=8){edgeL+='L'+eL(y)+' '+y;}edgeL+='L-4 '+T1+'Z';
 for(y=T0;y<=T1;y+=8){edgeR+='L'+eR(y)+' '+y;}edgeR+='L364 '+T1+'Z';
 var fib='',fray='';FY.forEach(function(fy,i){var xl=eL(fy)-3,xr=eR(fy)+3;fib+='<path d="'+H.crimp(-4,xl,fy,1.6,14)+'"/><path d="'+H.crimp(xr,364,fy,1.6,14)+'"/>';
  var s=(i%2)?1:-1;fray+='<path d="M'+xl+' '+fy+'l7 '+(3*s)+'M'+xl+' '+fy+'l6 '+(-2*s)+'M'+xr+' '+fy+'l-7 '+(-3*s)+'M'+xr+' '+fy+'l-6 '+(2*s)+'"/>'});
 var teno='';[[30,113],[92,133],[44,153],[100,173],[268,113],[324,133],[262,153],[318,173]].forEach(function(p){teno+=H.spindle(p[0],p[1],0,.75,'#F4F0C4',INK,'#6B76A8')});
 var ghr='';[[100,173],[92,133],[268,113],[262,153]].forEach(function(p){[-9,0,9].forEach(function(dx,j){var x=p[0]+dx,yy=p[1]-5.5-(j===1?1:0);ghr+='<path d="M'+x+' '+yy+'v-4m0 0l-2.6 -3m2.6 3l2.6 -3" stroke="#A88400" stroke-width="1.5" fill="none" stroke-linecap="round"/>'})});
 var rbc='';[[160,118],[178,111],[197,124],[167,140],[189,146],[204,160],[160,165],[181,174],[198,182],[172,156]].forEach(function(p,i){rbc+='<ellipse cx="'+p[0]+'" cy="'+p[1]+'" rx="3.6" ry="2.4" transform="rotate('+(i*37%90-45)+' '+p[0]+' '+p[1]+')" fill="#E07A6E" stroke="#C0392B" stroke-width=".6"/>'});
 var messy='';[['M150 112q10 8 18 -2t16 6'],['M188 120q8 -8 16 2t10 -6'],['M152 134q12 6 20 -6t22 8'],['M176 150q-10 8 -20 0'],['M190 160q10 -10 20 0'],['M150 172q14 8 24 -4t30 4'],['M160 184q10 -6 30 0']].forEach(function(d){messy+='<path d="'+d[0]+'"/>'});
 var colL='',colR='';FY.forEach(function(fy){colL+='<path d="M'+(eL(fy)-6)+' '+fy+'H180"/>';colR+='<path d="M'+(eR(fy)+6)+' '+fy+'H180"/>'});
 var fibro=H.spindle(163,119,-12,.85,'#E1DE62',INK)+H.spindle(197,133,10,.85,'#E1DE62',INK)+H.spindle(167,153,6,.85,'#E1DE62',INK)+H.spindle(195,171,-8,.85,'#E1DE62',INK);
 var fa='';[[163,119,-12],[197,133,10],[167,153,6],[195,171,-8]].forEach(function(p){var r=p[2]*Math.PI/180,dx=12*Math.cos(r),dy=12*Math.sin(r);fa+='<circle cx="'+(p[0]-dx).toFixed(1)+'" cy="'+(p[1]-dy).toFixed(1)+'" r="2"/><circle cx="'+(p[0]+dx).toFixed(1)+'" cy="'+(p[1]+dy).toFixed(1)+'" r="2"/>'});
 var FLOW='M48 24C48 40 52 52 70 56L168 56C178 56 182 66 181 84L180 128';

 /* ---- study scenes (v2) ---- */
 function strip(y,lab){var f='';[5,11,17,21].forEach(function(dy){f+='<path d="'+H.crimp(72,178,y+dy,1.3,12)+'"/><path d="'+H.crimp(242,350,y+dy,1.3,12)+'"/>'});
  return '<text class="tm" x="8" y="'+(y+17)+'">'+lab+'</text><path d="M70 '+y+'H180L176 '+(y+6)+'L181 '+(y+13)+'L176 '+(y+20)+'L180 '+(y+26)+'H70Z" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4" stroke-linejoin="round"/><path d="M352 '+y+'H240L244 '+(y+6)+'L239 '+(y+13)+'L244 '+(y+20)+'L240 '+(y+26)+'H352" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4" stroke-linejoin="round"/><g fill="none" stroke="'+INK+'" stroke-width=".9" opacity=".6">'+f+'</g>'}
 function clot(y){return '<rect x="181" y="'+(y+1)+'" width="58" height="24" fill="#FBE3DD" stroke="#E8988D" stroke-dasharray="3 3"/>'+[[192,8],[205,15],[219,7],[229,17],[198,20],[214,19]].map(function(p){return '<ellipse cx="'+p[0]+'" cy="'+(y+p[1])+'" rx="3.2" ry="2.2" fill="#E07A6E"/>'}).join('')}
 function bridge(y){var o='';[5,11,17,21].forEach(function(dy){o+='<path d="M174 '+(y+dy)+'H246"/>'});return o}
 var DC=[[93,112],[267,112]],RC=[[-38,-12],[-30,26],[30,-30],[42,10],[8,40],[-10,-42]],RT=[[-58,-14],[-48,34],[44,-44],[60,12],[14,58],[-18,-60],[-62,-38],[50,44],[-34,56],[30,-60],[64,-12],[-56,18]];
 function crawl(c,R){return R.map(function(r){var a=Math.atan2(r[1],r[0])*180/Math.PI;return H.spindle(c[0]+r[0],c[1]+r[1],a,.62,'#E1DE62',INK)}).join('')}
 function from(R){return R.map(function(r){return [-r[0]*.8,-r[1]*.8]})}
 return {
  title:'BPC-157 in a torn tendon',aria:'Animated diagram: how BPC-157 is thought to act in a torn tendon, step by step, with the evidence for each step.',
  vb:[360,234],stepMs:5200,
  parts:[
   {id:'skin',name:'Skin',info:'BPC-157 is usually injected just under it, often near the injury.',svg:'<rect x="0" y="0" width="360" height="14" fill="#FBE6DA"/><path d="M0 14C30 17 60 11 90 14S150 17 180 14S240 11 270 14S330 17 360 14" fill="none" stroke="#C98A7A" stroke-width="1.2"/>'},
   {id:'vessel',name:'Blood vessel',info:'Tendons have few vessels, one reason they heal slowly.',svg:'<rect x="-4" y="52" width="368" height="8" rx="4" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 56H364" stroke="#E8988D" stroke-width="1" stroke-dasharray="3 5"/>'},
   {id:'tendon',name:'Tendon',info:'A tendon joins muscle to bone and carries its pull.',svg:'<path d="'+edgeL+'" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/><path d="'+edgeR+'" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.5" stroke-linejoin="round"/>'},
   {id:'fibres',name:'Collagen fibres',info:'Rope-like strands lying in a gentle wave (crimp) along the tendon.',svg:'<g fill="none" stroke="'+INK+'" stroke-width="1" opacity=".7">'+fib+'</g><g fill="none" stroke="'+INK+'" stroke-width="1" opacity=".75" stroke-linecap="round">'+fray+'</g>'},
   {id:'teno',name:'Tendon cell (tenocyte)',info:'Long, thin cells in rows between the fibres that keep them in repair.',svg:teno},
   {id:'ghr',name:'Growth hormone receptors',info:'More receptors means the cell responds more to the growth hormone already there.',svg:ghr},
   {id:'clot',name:'Blood clot',info:'The first plug in the gap; it carries the signals that start repair.',svg:'<path d="M147 104C160 99 200 99 213 104L213 184C200 190 160 190 147 184Z" fill="#FBE3DD" stroke="#E8988D" stroke-width="1" stroke-dasharray="3 3"/>'+rbc},
   {id:'colMessy',name:'New collagen',info:'Laid down as a tangle first, then lined up along the pull.',svg:'<g fill="none" stroke="#2E8F82" stroke-width="1.6" stroke-linecap="round">'+messy+'</g>'},
   {id:'colL',name:'New collagen, lined up',info:'Fibres line up along the pull of the tendon, so the repair can carry load.',svg:'<g fill="none" stroke="#2E8F82" stroke-width="1.7" stroke-linecap="round">'+colL+'</g>'},
   {id:'colR',name:'New collagen, lined up',info:'Fibres line up along the pull of the tendon, so the repair can carry load.',svg:'<g fill="none" stroke="#2E8F82" stroke-width="1.7" stroke-linecap="round">'+colR+'</g>'},
   {id:'sprout',name:'New vessels',info:'They sprout from an existing vessel and grow toward the injury, bringing blood and cells.',svg:'<g fill="none" stroke-linecap="round"><g stroke="#C0392B" stroke-width="5"><path d="M154 60C152 78 158 92 162 112C164 124 158 136 156 150"/><path d="M162 112C170 118 176 124 178 136"/><path d="M206 60C208 80 200 96 198 116C196 134 204 150 202 172"/><path d="M198 116C190 122 186 132 186 146"/></g><g stroke="#F6C9C2" stroke-width="2.2"><path d="M154 60C152 78 158 92 162 112C164 124 158 136 156 150"/><path d="M162 112C170 118 176 124 178 136"/><path d="M206 60C208 80 200 96 198 116C196 134 204 150 202 172"/><path d="M198 116C190 122 186 132 186 146"/></g></g>'},
   {id:'no',name:'Nitric oxide',info:'A gas made by eNOS that widens vessels and helps them grow.',svg:'<g fill="#DDF3F8" stroke="#4D8FB0" stroke-width="1"><circle cx="146" cy="96" r="4"/><circle cx="140" cy="88" r="2.6"/><circle cx="215" cy="92" r="4"/><circle cx="222" cy="84" r="2.6"/><circle cx="150" cy="160" r="3.4"/><circle cx="210" cy="178" r="3.4"/></g>'},
   {id:'fibro',name:'Fibroblast',info:'A repair cell that moves into the gap and lays down new collagen.',svg:fibro},
   {id:'fa',name:'Grip points (FAK, paxillin)',info:'Proteins a cell uses to hold on to its surroundings and pull itself forward.',svg:'<g fill="#DB6830" stroke="#FFFFF4" stroke-width=".8">'+fa+'</g>'},
   {id:'needle',name:'Injection',info:'Injected near the injury or under the skin; in rats it also worked when given far from the injury.',svg:'<g transform="translate(48 22) rotate(-125)"><path d="M0 0H9" stroke="'+INK+'" stroke-width="1.2"/><rect x="9" y="-3.5" width="16" height="7" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.2"/><rect x="12" y="-2.2" width="8" height="4.4" fill="#A9BCFA"/><rect x="25" y="-5" width="2.6" height="10" fill="'+INK+'"/></g>'},
   {id:'pep',name:'BPC-157',info:'A 15 amino acid chain; in rats and dogs half of it is gone within 30 minutes. No receptor has been found.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:6,ms:3600}},
   /* study: rat Achilles */
   {id:'rat',name:'Rat Achilles model',info:'The right Achilles tendon was cut 5 mm above the heel and the rats got BPC-157 or saline once a day.',svg:H.rodent(46,50,.82)+'<text class="tm" x="96" y="30">ACHILLES CUT · DAILY SHOT</text><text class="tm" x="96" y="46" opacity=".75">RATS, 14 DAYS</text>'},
   {id:'day',name:'Days after the cut',info:'Checked on days 1, 4, 7, 10 and 14.',svg:'<text class="tm" x="290" y="30">DAY</text><text class="tb" x="322" y="33" font-size="22" data-from="1" data-to="14">14</text>'},
   {id:'sA',name:'Saline tendon',info:'Controls healed poorly: a wide, deep defect stayed between the cut ends.',svg:strip(96,'SALINE')},
   {id:'sB',name:'BPC-157 tendon',info:'Treated tendons had a smaller defect and carried more load before failing.',svg:strip(164,'BPC-157')},
   {id:'cA',name:'Gap (saline)',info:'Still a gap at day 14.',svg:clot(96)},
   {id:'cB',name:'Gap (BPC-157)',info:'The defect shrank and the tendon closed over.',svg:clot(164)},
   {id:'bB',name:'New tendon tissue',info:'More fibroblasts, reticulin and collagen bridged the cut.',svg:'<g fill="none" stroke="#2E8F82" stroke-width="1.8" stroke-linecap="round">'+bridge(164)+'</g>'},
   /* study: tendon cells in a dish */
   {id:'dishes',name:'Culture dishes',info:'Pieces of rat Achilles tendon were placed in dishes, with or without BPC-157.',svg:H.dish(93,112,80,'NO PEPTIDE')+H.dish(267,112,80,'WITH BPC-157')},
   {id:'expl',name:'Tendon piece',info:'The explant: cells crawl out of it onto the dish.',svg:'<rect x="83" y="103" width="20" height="18" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4"/><rect x="257" y="103" width="20" height="18" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4"/>'},
   {id:'outC',name:'Cells leaving (no peptide)',info:'Fewer cells, not as far.',svg:crawl(DC[0],RC)},
   {id:'outT',name:'Cells leaving (BPC-157)',info:'More cells crawled out, further, and spread faster; FAK and paxillin, the grip proteins, were switched on more with higher doses.',svg:crawl(DC[1],RT)}
  ],
  steps:[
   {key:'injury',btn:'Injury',title:'The injury',marks:[['h','Human anatomy']],
    text:'Collagen fibres tear and the gap fills with a blood clot. Tendons carry few blood vessels, so repair is slow.',
    model:'Textbook tendon healing',
    show:['skin','vessel','tendon','fibres','teno','clot'],
    labels:[{p:'fibres',t:'Torn collagen fibres',x:6,y:70,ax:147,ay:112},{p:'vessel',t:'Few blood vessels',x:222,y:70,ax:262,ay:60},{p:'clot',t:'Blood clot',x:150,y:208,ax:180,ay:160},{p:'teno',t:'Tendon cell',x:20,y:208,ax:92,ay:136}]},
   {key:'arrive',btn:'Arrives',title:'BPC-157 arrives',marks:[['a','Rat']],
    text:'Injected under the skin, usually near the injury. In rats it also helped when given far from the injury, so it travels in the blood. No receptor for it has been found.',
    model:'Rat injury models; rat and dog kinetics',
    show:['skin','vessel','tendon','fibres','teno','clot','needle','pep'],
    anim:[{p:'needle',type:'move',from:[0,-12],dur:700},{p:'pep',type:'flow'}],
    labels:[{p:'needle',t:'Under the skin',x:66,y:22,ax:50,ay:24},{p:'pep',t:'BPC-157',x:200,y:22,ax:150,ay:56},{p:'vessel',t:'Carried in the blood',x:208,y:70,ax:250,ay:58},{p:'clot',t:'Reaches the tear',x:122,y:208,ax:180,ay:132}]},
   {key:'vessels',btn:'Vessels',title:'New vessels',marks:[['c','Cells'],['a','Rat']],
    text:'Vessel-lining cells carry more VEGFR2, the receptor for the vessel growth signal (the signal itself does not rise). It switches on Akt and eNOS, which make nitric oxide, and new vessels sprout toward the tear.',
    model:'Endothelial cells, chick membrane, rat hind limb (2017, 2020)',
    show:['skin','vessel','tendon','fibres','teno','clot','sprout','no'],
    anim:[{p:'sprout',type:'draw',dur:2600},{p:'no',type:'fadeIn',delay:1800,dur:900}],
    labels:[{p:'sprout',t:'VEGFR2 → Akt/eNOS',x:96,y:22,ax:154,ay:62},{p:'no',t:'Nitric oxide',x:222,y:70,ax:216,ay:89},{p:'sprout',t:'New vessels',x:234,y:208,ax:203,ay:160},{p:'clot',t:'Blood clot',x:40,y:208,ax:157,ay:176}]},
   {key:'cells',btn:'Cells',title:'Repair cells move in',marks:[['c','Cells'],['a','Rat']],
    text:'Fibroblasts crawl into the gap and grip it through FAK and paxillin. Tendon cells make more growth hormone receptors, so they respond more to the growth hormone already there.',
    model:'Rat Achilles tendon cells; rat tendon tears',
    show:['skin','vessel','tendon','fibres','teno','ghr','clot','sprout','fibro','fa'],
    anim:[{p:'fibro',type:'move',from:[0,0],dur:2400,each:[[-34,4],[34,-4],[-36,2],[36,0]]},{p:'fa',type:'fadeIn',delay:2300,dur:700},{p:'ghr',type:'fadeIn',delay:900,dur:900}],
    labels:[{p:'fa',t:'Grip: FAK, paxillin',x:6,y:70,ax:152,ay:121},{p:'ghr',t:'More GH receptors',x:222,y:70,ax:268,ay:104},{p:'fibro',t:'Fibroblasts move in',x:150,y:208,ax:195,ay:174},{p:'teno',t:'Tendon cell',x:20,y:208,ax:92,ay:136}]},
   {key:'collagen',btn:'Collagen',title:'Collagen lines up',marks:[['a','Rat']],
    text:'New collagen is laid down as a tangle, then lines up along the pull of the tendon. In rats, cut Achilles tendons and torn ligaments healed faster.',
    model:'Rat Achilles and ligament injuries, mostly one Zagreb group',
    show:['skin','vessel','tendon','fibres','teno','sprout','fibro','colMessy','colL','colR'],
    anim:[{p:'colMessy',type:'fadeIn',dur:700},{p:'colMessy',type:'fadeOut',delay:2400,dur:900},{p:'colL',type:'draw',delay:2000,dur:1900},{p:'colR',type:'draw',delay:2000,dur:1900}],
    hideAtEnd:['colMessy'],
    labels:[{p:'colL',t:'Collagen lines up',x:126,y:208,ax:180,ay:150},{p:'colL',t:'Repair can carry load',x:6,y:70,ax:160,ay:104},{p:'fibro',t:'Fibroblast',x:266,y:208,ax:197,ay:136}]},
   {key:'rat',btn:'Rats',study:1,title:'In rats: a cut Achilles',marks:[['a','Rat']],ms:6400,
    text:'Rats had the Achilles tendon cut and got BPC-157 or saline each day. By day 14 the saline tendons still had a wide, deep gap; the BPC-157 tendons had a smaller defect, more collagen, walked better and held more load before tearing.',
    model:'Rats, 14 days',src:[{t:'Staresinic 2003, J Orthop Res',u:'https://doi.org/10.1016/S0736-0266(03)00110-4'}],
    show:['rat','day','sA','sB','cA','cB','bB'],
    anim:[{p:'day',type:'count',dur:4600,delay:400},{p:'cA',type:'shrink',to:.8,dur:4600,delay:400},{p:'cB',type:'shrink',to:0,dur:3600,delay:600},{p:'bB',type:'draw',dur:3200,delay:1600}],
    labels:[{p:'cA',t:'Gap stays open',x:228,y:70,ax:222,ay:96},{p:'bB',t:'Closes, holds more load',x:178,y:205,ax:212,ay:190}]},
   {key:'dish',btn:'Dish',study:1,title:'In a dish: tendon cells',marks:[['c','Rat tendon cells']],ms:6000,
    text:'Pieces of rat Achilles tendon were set in dishes. With BPC-157, more cells crawled out, further and faster, spread out sooner and survived stress better. It did not make them divide more: it made them move.',
    model:'Rat tendon fibroblasts',src:[{t:'Chang 2011, J Appl Physiol',u:'https://doi.org/10.1152/japplphysiol.00945.2010'}],
    show:['dishes','expl','outC','outT'],
    anim:[{p:'outC',type:'move',each:from(RC),dur:3600,delay:300},{p:'outT',type:'move',each:from(RT),dur:3600,delay:300},{p:'outC',type:'fadeIn',sel:'g',dur:900,delay:300},{p:'outT',type:'fadeIn',sel:'g',dur:900,delay:300}],
    labels:[{p:'outT',t:'More cells, further',x:226,y:4,ax:262,ay:50},{p:'outC',t:'Fewer cells',x:58,y:4,ax:80,ay:96}]}
  ]

 };
});
