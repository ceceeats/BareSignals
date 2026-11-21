/* GHK-Cu story v1 (21 Nov 2026). Library master: BS_PAGE['ghk-cu'].mx and BS_DATA desc (ulcer numbers).
   Scene: skin in cross-section (epidermis, dermis, a small vessel), then a dish of human skin cells and a topical trial in people. */
BSAnim.define('ghk-cu',function(H,INK){
 var CU='#DB6830',TEAL='#2E8F82';
 var EPI='M0 0H360V22C340 28 320 18 300 24S260 30 240 22S200 16 180 24S140 30 120 22S80 16 60 24S20 28 0 22Z';
 var FB=[[70,92],[150,128],[236,90],[300,142],[106,170]];
 var fib=FB.map(function(p,i){return H.spindle(p[0],p[1],[8,-6,4,-10,6][i],.9,'#E1DE62',INK)}).join('');
 var OLD=[[30,70,12],[96,64,-10],[188,60,8],[262,64,-14],[322,70,10],[40,120,-8],[210,122,12],[268,112,-6],[40,186,10],[160,186,-12],[230,176,8],[326,182,-10]];
 var old=OLD.map(function(p){return '<path d="M'+(p[0]-14)+' '+p[1]+'q7 '+(-p[2]/3)+' 14 0t14 0" transform="rotate('+p[2]+' '+p[0]+' '+p[1]+')"/>'}).join('');
 var PAIRS=[56,108,186];
 function pair(y){return '<path d="'+H.crimp(10,350,y,1.4,22)+'"/><path d="'+H.crimp(10,350,y+6,1.4,22)+'"/>'}
 var colNew=PAIRS.map(pair).join('');
 var rung='';PAIRS.forEach(function(y){for(var x=22;x<350;x+=22)rung+='<path d="M'+x+' '+(y+1.5)+'V'+(y+4.5)+'"/>'});
 var LOX=[[60,50],[200,50],[128,102],[278,102],[52,180],[250,180]],lox=LOX.map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+')"><ellipse rx="6" ry="4.4" fill="#F6D6C2" stroke="'+CU+'" stroke-width="1.2"/><circle r="1.8" fill="'+CU+'"/></g>'}).join('');
 var el='';[[20,150],[180,150]].forEach(function(s){var d='M'+s[0]+' '+s[1];for(var i=1;i<=28;i++){var x=s[0]+i*5.5,y=s[1]+Math.sin(i*1.1)*4;d+='L'+x.toFixed(1)+' '+y.toFixed(1)}el+='<path d="'+d+'"/>'});
 var gag=H.puffs([[44,140],[88,132],[132,152],[190,138],[226,150],[276,128],[330,160],[60,90],[330,90],[180,90]],'#D6ECFA','#5A9BC8',2.2);
 var MM=[[30,78],[96,74],[210,132],[322,80],[160,196],[40,196]],mmp=MM.map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+')"><path d="M0 0L6.5 -3.8A7.5 7.5 0 1 0 6.5 3.8Z" fill="#E4D8FA" stroke="#7A5CC8" stroke-width="1.1"/></g>'}).join('');
 var infl=H.puffs([[120,72],[132,64],[226,120],[238,112],[286,168],[80,150],[92,144],[300,60]],'#FFD2D2','#E05050',3);
 var MOL='<g fill="none" stroke="'+INK+'" stroke-width="1" stroke-dasharray="2 2"><path d="M270 70L292 88M292 58L292 88M314 70L292 88"/></g>'+
  [['G',270,70,'#EFEAD0'],['H',292,56,'#A9BCFA'],['K',314,70,'#EFEAD0']].map(function(b){return '<circle cx="'+b[1]+'" cy="'+b[2]+'" r="9" fill="'+b[3]+'" stroke="'+INK+'" stroke-width="1.2"/><text x="'+b[1]+'" y="'+(b[2]+4)+'" font-size="11" font-weight="700" text-anchor="middle">'+b[0]+'</text>'}).join('')+
  '<circle cx="292" cy="90" r="8" fill="'+CU+'" stroke="'+INK+'" stroke-width="1.2"/><text x="292" y="93.5" font-size="9" font-weight="700" text-anchor="middle" fill="#FFFFF4" style="fill:#FFFFF4">Cu</text>';
 var BEAD='<g><circle cx="-4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/><circle cy="-2.2" r="2.3" fill="#A9BCFA" stroke="#2F5BE0" stroke-width=".8"/><circle cx="4.4" r="2.3" fill="#EFEAD0" stroke="#8A8460" stroke-width=".8"/><circle cy="2.8" r="2" fill="'+CU+'"/></g>';
 var FLOW='M-6 209H140C152 209 156 202 154 190L150 136';
 /* study: dose curve in a dish */
 var XS=[[80,'1 pM'],[150,'10 pM'],[220,'100 pM'],[290,'1 nM']],ax='<path d="M62 196H318M62 196V46" stroke="'+INK+'" stroke-width="1.3" fill="none"/>'+XS.map(function(t){return '<path d="M'+t[0]+' 196v4" stroke="'+INK+'"/><text class="tm" x="'+t[0]+'" y="212" text-anchor="middle">'+t[1]+'</text>'}).join('')+'<text class="tm" x="190" y="228" text-anchor="middle" opacity=".75">GHK-CU IN THE DISH (LOG SCALE)</text><text class="tm" transform="translate(48 152) rotate(-90)">COLLAGEN MADE</text>';
 var CURVE='M80 176L150 172C184 156 206 120 244 92C262 79 278 72 290 71';
 /* study: ulcer trial */
 function tile(cx,lab){return '<rect x="'+(cx-74)+'" y="30" width="148" height="122" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/><text class="tm" x="'+cx+'" y="22" text-anchor="middle">'+lab+'</text>'}
 function wound(cx){return '<ellipse cx="'+cx+'" cy="91" rx="46" ry="40" fill="#E9A49A" stroke="#C0392B" stroke-width="1.2"/><ellipse cx="'+(cx+4)+'" cy="94" rx="30" ry="24" fill="#E07A6E" opacity=".7"/>'}
 return {
  title:'GHK-Cu in the skin',aria:'Animated diagram: how GHK-Cu carries copper into the skin and switches fibroblasts to rebuild collagen, with a dish study and a human gel trial.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'epi',name:'Epidermis',info:'The outer skin layer. GHK-Cu works below it, in the dermis.',svg:'<path d="'+EPI+'" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/>'},
   {id:'vessel',name:'Small blood vessel',info:'GHK circulates in human plasma; injected GHK-Cu also reaches tissue from here.',svg:'<rect x="-4" y="204" width="368" height="10" rx="5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 209H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   {id:'fib',name:'Fibroblast',info:'The dermis cell that makes collagen, elastin and the gel between them.',svg:fib},
   {id:'old',name:'Old, broken collagen',info:'Aged or scarred matrix: short, disordered, poorly linked fibres.',svg:'<g fill="none" stroke="#B8B39A" stroke-width="1.6" stroke-linecap="round">'+old+'</g>'},
   {id:'mol',name:'GHK-Cu',info:'Three amino acids, glycine, histidine, lysine, holding one copper ion tightly.',svg:'<circle cx="292" cy="74" r="38" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.4"/>'+MOL},
   {id:'pep',name:'GHK-Cu',info:'Travels in the blood and into the dermis carrying copper.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:6,ms:4200,bead:BEAD}},
   {id:'glow',name:'Fibroblast switched on',info:'More collagen, elastin and glycosaminoglycan output in cell studies.',svg:FB.map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" fill="none" stroke="'+CU+'" stroke-width="1.4" opacity=".7"/>'}).join('')},
   {id:'colNew',name:'New collagen',info:'Long fibres laid down by the fibroblasts.',svg:'<g fill="none" stroke="'+TEAL+'" stroke-width="1.6" stroke-linecap="round">'+colNew+'</g>'},
   {id:'el',name:'Elastin',info:'The springy protein that lets skin snap back.',svg:'<g fill="none" stroke="#C9A100" stroke-width="1.5" stroke-linecap="round">'+el+'</g>'},
   {id:'gag',name:'Glycosaminoglycans',info:'Water-holding gel between the fibres; it keeps the dermis plump.',svg:gag},
   {id:'lox',name:'Lysyl oxidase',info:'A copper-dependent enzyme: it needs copper to cross-link collagen and elastin.',svg:lox},
   {id:'rung',name:'Cross-links',info:'Ties between neighbouring fibres that turn loose strands into strong rope.',svg:'<g stroke="'+CU+'" stroke-width="1.6" stroke-linecap="round">'+rung+'</g>'},
   {id:'mmp',name:'MMPs',info:'Enzymes that cut old matrix. GHK-Cu shifts the balance between them and their brakes, the TIMPs.',svg:mmp},
   {id:'infl',name:'TNF-α, IL-6',info:'Inflammatory messengers; lower with GHK-Cu in cell studies.',svg:infl},
   /* dish study */
   {id:'ax',name:'Dose chart',info:'Collagen made by human skin fibroblasts at each GHK-Cu concentration.',svg:ax},
   {id:'dishI',name:'Human skin fibroblasts',info:'Cells grown in a dish; collagen output was measured, cell number did not change.',svg:H.dish(110,52,22)+'<g>'+H.spindle(104,48,20,.5,'#E1DE62',INK)+H.spindle(118,58,-30,.5,'#E1DE62',INK)+'</g>'},
   {id:'curve',name:'Collagen output',info:'Starts rising between 1 and 10 pM and peaks at 1 nM.',svg:'<path d="'+CURVE+'" fill="none" stroke="'+TEAL+'" stroke-width="2.4" stroke-linecap="round"/>'},
   {id:'peak',name:'Peak',info:'1 nanomolar: one billionth of a mole per litre, a very small amount.',svg:'<circle cx="290" cy="71" r="4.5" fill="'+CU+'" stroke="'+INK+'"/>'},
   /* trial */
   {id:'tiles',name:'Diabetic foot ulcers',info:'A randomised topical trial: GHK-Cu gel against the same gel without it.',svg:tile(95,'PLAIN GEL')+tile(265,'GHK-CU GEL')},
   {id:'wA',name:'Ulcer, plain gel',info:'Median closure 60.8%.',svg:wound(95)},
   {id:'wB',name:'Ulcer, GHK-Cu gel',info:'Median closure 98.5%, about three times faster.',svg:wound(265)},
   {id:'num',name:'Median closure',info:'Infections: 34% with plain gel, 7% with GHK-Cu gel.',svg:'<text class="tb" x="95" y="186" font-size="22" text-anchor="middle" data-to="60.8" data-dec="1" data-suf="%">60.8%</text><text class="tb" x="265" y="186" font-size="22" text-anchor="middle" data-to="98.5" data-dec="1" data-suf="%">98.5%</text><text class="tm" x="95" y="206" text-anchor="middle">CLOSED · 34% INFECTED</text><text class="tm" x="265" y="206" text-anchor="middle">CLOSED · 7% INFECTED</text>'}
  ],
  steps:[
   {key:'carry',btn:'Copper',title:'A copper carrier',marks:[['h','Human plasma']],
    text:'GHK is three amino acids found in human plasma. It grips one copper ion tightly and carries it through the blood into tissue. Plasma GHK falls with age.',
    model:'Human plasma; chemistry',
    show:['epi','vessel','fib','old','mol','pep'],
    anim:[{p:'mol',type:'scale',from:.6,dur:900},{p:'pep',type:'flow'}],
    labels:[{p:'mol',t:'Grips copper',x:186,y:118,ax:284,ay:92},{p:'pep',t:'In the blood',x:14,y:178,ax:60,ay:206},{p:'old',t:'Aged collagen',x:8,y:32,ax:30,ay:68}]},
   {key:'switch',btn:'Cells',title:'Fibroblasts switch on',marks:[['c','Cells']],
    text:'In the dermis, GHK-Cu reaches fibroblasts, the cells that build the skin’s frame. In cell studies they make more collagen, elastin and the water-holding gel between them.',
    model:'Human and animal fibroblast cultures',
    show:['epi','vessel','fib','old','pep','glow'],
    anim:[{p:'pep',type:'flow'},{p:'glow',type:'pulse',sel:'circle',to:1.18,dur:1800,stagger:250}],
    labels:[{p:'glow',t:'Fibroblast switched on',x:178,y:40,ax:236,ay:76},{p:'pep',t:'GHK-Cu arrives',x:10,y:178,ax:152,ay:150}]},
   {key:'build',btn:'Collagen',title:'New collagen and elastin',marks:[['c','Cells'],['h','Human, topical']],
    text:'New collagen, elastin and glycosaminoglycans fill the dermis. In a double-blind cream study, 40 women had thicker skin and shallower wrinkles after 8 weeks.',
    model:'Fibroblast cultures; Badenhorst 2016, 40 women, topical',
    show:['epi','vessel','fib','old','colNew','el','gag'],
    anim:[{p:'colNew',type:'draw',dur:2600},{p:'el',type:'draw',delay:1400,dur:2200},{p:'gag',type:'fadeIn',sel:'circle',delay:2200,dur:500,stagger:90}],
    labels:[{p:'colNew',t:'New collagen',x:236,y:30,ax:300,ay:57},{p:'el',t:'Elastin',x:8,y:160,ax:40,ay:150},{p:'gag',t:'Water-holding gel',x:220,y:160,ax:276,ay:130}]},
   {key:'link',btn:'Links',title:'Copper ties the fibres',marks:[['c','Biochemistry']],
    text:'Lysyl oxidase, an enzyme that only works with copper, ties neighbouring collagen and elastin strands together. Loose strands become strong rope.',
    model:'Enzyme biochemistry',
    show:['epi','vessel','fib','colNew','el','gag','lox','rung'],
    anim:[{p:'lox',type:'scale',sel:'g',from:0,dur:600,stagger:150},{p:'rung',type:'draw',delay:900,dur:2200}],
    labels:[{p:'lox',t:'Lysyl oxidase (needs copper)',x:116,y:30,ax:200,ay:47},{p:'rung',t:'Cross-links',x:8,y:128,ax:66,ay:111}]},
   {key:'remodel',btn:'Remodel',title:'Old out, new in',marks:[['c','Cells'],['h','Human, topical']],
    text:'GHK-Cu shifts the balance between MMPs, enzymes that cut old matrix, and TIMPs, their brakes. Old scar tissue is cleared while new matrix goes down. TNF-α and IL-6 also fall in cell studies.',
    model:'Fibroblast cultures; topical skin studies',
    show:['epi','vessel','fib','old','colNew','mmp','infl'],
    anim:[{p:'mmp',type:'scale',sel:'g',from:0,dur:600,stagger:120},{p:'old',type:'fadeOut',delay:1400,dur:1600},{p:'infl',type:'shrink',sel:'circle',to:.45,delay:1000,dur:2400},{p:'colNew',type:'draw',delay:1800,dur:2200}],
    labels:[{p:'mmp',t:'MMPs cut old fibres',x:150,y:30,ax:210,ay:126},{p:'infl',t:'Less TNF-α, IL-6',x:8,y:160,ax:80,ay:150}]},
   {key:'dish',btn:'Dish',study:1,title:'In a dish: a tiny dose works',marks:[['c','Human skin cells']],ms:6000,
    text:'Human skin fibroblasts made more collagen from between 1 and 10 trillionths of a mole per litre, peaking at 1 nanomolar. Cell numbers did not change: each cell made more.',
    model:'Human skin fibroblasts',src:[{t:'Maquart 1988, FEBS Lett',u:'https://doi.org/10.1016/0014-5793(88)80509-x'}],
    show:['ax','dishI','curve','peak'],
    anim:[{p:'curve',type:'draw',dur:3200,delay:300},{p:'peak',type:'scale',from:0,delay:3300,dur:600}],
    labels:[{p:'peak',t:'Peak at 1 nM',x:216,y:40,ax:288,ay:68},{p:'curve',t:'Starts rising',x:100,y:118,ax:150,ay:172}]},
   {key:'ulcer',btn:'People',study:1,title:'In people: diabetic ulcers',marks:[['h','Human, topical']],ms:6400,
    text:'In a randomised trial on diabetic foot ulcers, GHK-Cu gel closed the wounds by a median 98.5% against 60.8% for the plain gel, about three times faster, with fewer infections (7% vs 34%).',
    model:'Randomised topical gel trial (Mulder 1994)',
    show:['tiles','wA','wB','num'],
    anim:[{p:'wA',type:'shrink',sel:'ellipse',to:.63,delay:400,dur:4200},{p:'wB',type:'shrink',sel:'ellipse',to:.12,delay:400,dur:4200},{p:'num',type:'count',delay:400,dur:4200}]}
  ]
 };
});
