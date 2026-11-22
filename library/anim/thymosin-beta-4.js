/* Thymosin Beta-4 (TB-500) story v2 (22 Nov 2026). Full-frame skin wound to the BPC-157/GHK-Cu standard: open wound,
   G-actin pool, cells crawl in, vessels and collagen build, Akt survival; then a rat wound study (+42% day 4,
   +61% day 7) and a mouse heart study, each as two labelled panels. */
BSAnim.define('thymosin-beta-4',function(H,INK){
 var TEAL='#2E8F82',RED='#C0392B',ACT='#A9BCFA',GLOW='#DB6830',FIBR='#E9A49A';
 var strat='';for(var sx=-2;sx<150;sx+=6)strat+='<path d="M'+sx+' 18v-4"/>';for(var sx2=210;sx2<362;sx2+=6)strat+='<path d="M'+sx2+' 18v-4"/>';
 var epi='<rect x="-4" y="18" width="154" height="22" rx="3" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/><rect x="210" y="18" width="158" height="22" rx="3" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/>';
 var wound='<path d="M150 20H210L198 100H162Z" fill="'+FIBR+'" stroke="'+RED+'" stroke-width="1.1"/>';
 var fibrin='<g fill="none" stroke="#C0392B" stroke-width=".7" opacity=".5">'+[0,1,2,3].map(function(i){return '<path d="M'+(158+i*4)+' 30L'+(200-i*3)+' 92M'+(202-i*4)+' 30L'+(160+i*3)+' 92"/>'}).join('')+'</g>';
 var FB=[[46,66,10],[92,92,-14],[250,70,8],[300,100,-10],[70,128,6],[150,138,-8],[228,132,12],[318,140,-6]];
 var fib=FB.map(function(p){return H.spindle(p[0],p[1],p[2],.82,'#E1DE62',INK)}).join('');
 var derm='<rect x="-4" y="40" width="368" height="112" fill="#FBF3E6" opacity=".45"/><g fill="none" stroke="#E4DcC4" stroke-width="1" opacity=".55">'+[112,140].map(function(y){return '<path d="'+H.crimp(6,354,y,1.2,26)+'"/>'}).join('')+'</g>';
 var gactin='';[[96,70],[116,78],[134,68],[108,92],[130,96],[150,86],[92,104],[146,110],[118,112],[72,88]].forEach(function(p){gactin+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.2" fill="'+ACT+'" stroke="'+INK+'" stroke-width=".8"/>'});
 var fil='<g transform="translate(250 112)"><g fill="'+ACT+'" stroke="'+INK+'" stroke-width=".8">'+[0,1,2,3,4,5,6].map(function(i){return '<circle cx="'+(i*6).toFixed(1)+'" cy="'+((i%2)?2:-2)+'" r="3"/>'}).join('')+'</g></g>';
 function tongue(x,dir){return '<path d="M'+x+' 24c'+(14*dir)+' 1 '+(24*dir)+' 7 '+(30*dir)+' 16c'+(2*dir)+' 3 '+(-6*dir)+' 6 '+(-14*dir)+' 6H'+x+'Z" fill="#FFF4E8" stroke="'+INK+'" stroke-width="1.3"/>'+H.spindle(x+18*dir,32,dir>0?12:-12,.6,'#F4F0C4',INK,'#C9C3F0')}
 var tong='<g>'+tongue(150,1)+tongue(210,-1)+'</g>';
 var vess='<g fill="none" stroke-linecap="round"><g stroke="'+RED+'" stroke-width="4"><path d="M172 150C170 128 180 112 178 96"/><path d="M178 112C186 108 192 112 194 120"/><path d="M188 150C190 130 184 116 184 100"/></g><g stroke="#F6C9C2" stroke-width="1.8"><path d="M172 150C170 128 180 112 178 96"/><path d="M188 150C190 130 184 116 184 100"/></g></g>';
 var col='<g fill="none" stroke="'+TEAL+'" stroke-width="1.7" stroke-linecap="round">'+[116,128,140].map(function(y){return '<path d="'+H.crimp(150,214,y,1.5,16)+'"/>'}).join('')+'</g>';
 var ilk='<g transform="translate(182 90)"><rect x="-14" y="-2" width="12" height="9" rx="2" fill="#D8CBF4" stroke="#7A5CC8" stroke-width="1.1"/><rect x="0" y="-2" width="12" height="9" rx="2" fill="#CFE6DE" stroke="'+TEAL+'" stroke-width="1.1"/><circle cx="-1" cy="-8" r="3" fill="'+ACT+'" stroke="#2F5BE0" stroke-width=".8"/></g>';
 var akt='<g fill="none" stroke="'+GLOW+'" stroke-width="1.7">'+[[164,34],[196,34],[180,68]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" opacity=".75"/>'}).join('')+'</g>';
 var MOL='<circle cx="316" cy="40" r="26" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.3"/>'+
  '<path d="M300 48c2 -10 10 -2 8 -12s8 -4 10 2" fill="none" stroke="#2F5BE0" stroke-width="2.2" stroke-linecap="round"/>'+
  '<circle cx="318" cy="50" r="3.4" fill="'+ACT+'" stroke="#2F5BE0" stroke-width=".8"/>'+
  '<text class="tm" x="316" y="32" text-anchor="middle" font-size="8">Tβ4</text><text class="tm" x="316" y="60" text-anchor="middle" font-size="7">BINDS G-ACTIN</text>';
 var FLOW='M70 200L110 96';
 var TBEAD=H.bead(0,0,'#A9BCFA','#2F5BE0',4);
 /* study: rat wounds, two panels + counts */
 function wpanel(cx,lab,healed){var openw=healed?10:40;
  return '<text class="tm" x="'+cx+'" y="30" text-anchor="middle">'+lab+'</text>'+
   '<rect x="'+(cx-62)+'" y="36" width="124" height="52" rx="3" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/>'+
   '<path d="M'+(cx-openw)+' 40q'+openw+' 30 0 44q-'+openw+' -14 0 -44Z" fill="'+FIBR+'" stroke="'+RED+'" stroke-width="1.1"/>'+
   '<g fill="none" stroke="#C98A7A" stroke-width="1.2"><path d="M'+(cx-62)+' 44H'+(cx-openw-2)+'M'+(cx+openw+2)+' 44H'+(cx+62)+'"/></g>'}
 var ratb=wpanel(96,'SALINE',0)+wpanel(264,'Tβ4',1)+
  '<text class="tb" x="96" y="116" font-size="18" text-anchor="middle">—</text>'+
  '<text class="tb" x="264" y="112" font-size="17" text-anchor="middle" fill="'+TEAL+'" data-from="0" data-to="42" data-suf="%" data-pre="+">+42%</text>'+
  '<text class="tb" x="264" y="134" font-size="17" text-anchor="middle" fill="'+TEAL+'" data-from="0" data-to="61" data-suf="%" data-pre="+">+61%</text>'+
  '<text class="tm" x="96" y="132" text-anchor="middle">CONTROL</text>'+
  '<text class="tm" x="264" y="150" text-anchor="middle">REEPITHELIALISATION D4 / D7</text>'+
  '<text class="tm" x="180" y="172" text-anchor="middle" opacity=".8">MORE CONTRACTION, COLLAGEN, VESSELS</text>';
 /* study: mouse heart, risk area + function bars */
 var heart='<text class="tm" x="110" y="30" text-anchor="middle">INJURED HEART</text>'+
  '<path d="M110 60C110 46 92 38 76 47C63 54 65 75 110 100C155 75 157 54 144 47C128 38 110 46 110 60Z" fill="#F6C9C2" stroke="'+RED+'" stroke-width="1.6"/>'+
  '<path d="M96 46C94 64 106 80 114 96" fill="none" stroke="'+RED+'" stroke-width="2.4"/>'+
  '<path d="M96 60l-6 -3M96 60l-6 3" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/>'+
  '<g class="risk"><path d="M110 64C104 74 102 86 110 98C120 86 118 74 112 64Z" fill="#9AA0C8" opacity=".7"/></g>'+
  '<text class="tm" x="150" y="44">TIE-OFF</text>';
 var hbars='<text class="tm" x="266" y="34" text-anchor="middle">HEART FUNCTION</text>'+H.bars(228,148,84,40,[.58,.84],['#9AA0C8',TEAL],['SALINE','Tβ4'])+'<text class="tm" x="266" y="186" text-anchor="middle" opacity=".8">MORE MYOCYTES SURVIVE</text>';
 var base=['epi','strat','derm','fib','vessel'];
 return {
  title:'Thymosin β-4 (TB-500) in a wound',aria:'Animated diagram: how Thymosin beta-4 holds a pool of G-actin so cells crawl in and close a wound, builds vessels and collagen, and switches on Akt for survival, with a rat wound study and a mouse heart study.',
  vb:[360,234],stepMs:5200,
  parts:[
   {id:'epi',name:'Skin edges',info:'The epidermis on each side of the wound; it has to grow back across the gap.',svg:epi},
   {id:'strat',name:'Skin surface',info:'The outer keratin layer.',svg:'<g fill="none" stroke="#C98A7A" stroke-width="1.1" stroke-linecap="round">'+strat+'</g>'},
   {id:'derm',name:'Dermis',info:'The living layer under the skin where repair cells and vessels work.',svg:derm},
   {id:'fib',name:'Fibroblasts',info:'Dermis cells that build collagen and the matrix; they must migrate into the gap.',svg:'<g>'+fib+'</g>'},
   {id:'wound',name:'Wound gap',info:'The open break, filled first with a fibrin clot, that cells must cross and fill.',svg:wound},
   {id:'fibrin',name:'Fibrin mesh',info:'The first scaffold in the gap; cells crawl along it.',svg:fibrin},
   {id:'gactin',name:'G-actin',info:'Loose actin monomers, the building blocks of the cell’s internal skeleton.',svg:'<g>'+gactin+'</g>'},
   {id:'fil',name:'Actin skeleton',info:'Monomers assembled into a filament; building and dismantling it is how a cell moves.',svg:fil},
   {id:'tong',name:'Advancing skin',info:'Sheets of keratinocytes crawling in from each edge to re-cover the wound.',svg:tong},
   {id:'vess',name:'New vessels',info:'Vessels sprout into the wound, bringing blood and cells.',svg:vess},
   {id:'col',name:'New collagen',info:'Fibres laid down in the dermis to fill and strengthen the gap.',svg:col},
   {id:'ilk',name:'PINCH-ILK complex',info:'Tβ-4 clips onto this complex, which switches on the survival kinase Akt.',svg:ilk},
   {id:'akt',name:'Akt survival signal',info:'Keeps cells in the damaged zone alive while they rebuild.',svg:akt},
   {id:'mol',name:'Thymosin β-4',info:'A 43-amino-acid peptide (TB-500 is a close relative); it binds and holds G-actin.',svg:MOL},
   {id:'tb4',name:'Thymosin β-4 arriving',info:'Tβ-4 reaching the wound from the blood.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3800,bead:TBEAD}},
   {id:'vessel',name:'Blood vessel',info:'Tβ-4 is given on the skin or by injection and reaches the wound from here.',svg:'<rect x="-4" y="200" width="368" height="11" rx="5.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 205.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   /* study: rats */
   {id:'ratb',name:'Rat wounds',info:'Full-thickness skin wounds treated with Tβ-4 on the skin or injected, against saline.',svg:'<g>'+H.rodent(300,196,.7)+ratb+'</g>'},
   /* study: heart */
   {id:'heart',name:'Mouse heart',info:'A coronary artery tied off to injure the heart; the pale wedge is the muscle at risk.',svg:heart},
   {id:'hbars',name:'Heart function',info:'The heart pumped better with Tβ-4, and more heart-muscle cells survived early.',svg:hbars}
  ],
  steps:[
   {key:'wound',btn:'Wound',title:'A gap to cross',marks:[['h','Human anatomy']],
    text:'A wound leaves a gap, filled first by a fibrin clot. To close it, cells at the edges have to crawl across, and that means constantly building and taking down their internal skeleton.',
    model:'Textbook wound healing',
    show:base.concat(['wound','fibrin']),
    anim:[{p:'fibrin',type:'fadeIn',sel:'path',dur:900,stagger:120}],
    labels:[{p:'wound',t:'Wound gap',x:150,y:8,ax:180,ay:30},{p:'fib',t:'Repair cells at the edges',x:6,y:178,ax:92,ay:92}]},
   {key:'actin',btn:'Actin',title:'A ready pool of actin',marks:[['c','Cell biology']],
    text:'Thymosin β-4 binds G-actin, the loose building blocks of the cell’s skeleton, and holds a ready pool. With spare parts on hand a cell can put up and take down its scaffold fast, so it can move.',
    model:'Cell biology (actin)',
    show:base.concat(['wound','fibrin','gactin','fil','tb4','mol']),
    anim:[{p:'tb4',type:'flow'},{p:'mol',type:'scale',from:.6,dur:700},{p:'gactin',type:'fadeIn',sel:'circle',dur:700,stagger:60},{p:'fil',type:'draw',sel:'circle',delay:1600,dur:1200}],
    labels:[{p:'gactin',t:'G-actin pool',x:6,y:60,ax:118,ay:90},{p:'fil',t:'Skeleton builds',x:214,y:150,ax:262,ay:112}]},
   {key:'crawl',btn:'Crawl',title:'Cells crawl in',marks:[['a','Rat']],
    text:'Keratinocytes crawl in from each edge to re-cover the wound, and fibroblasts migrate into the gap. In rats, Tβ-4 also pulled keratinocytes across faster in a migration assay.',
    model:'Rat wounds and keratinocyte migration (Malinda 1999)',
    show:base.concat(['wound','fibrin','tong']),
    anim:[{p:'tong',type:'move',each:[[-26,0],[26,0]],dur:2600},{p:'fib',type:'move',each:[[0,0],[0,0],[-24,8],[-20,4],[0,0],[14,-6],[-16,2],[-22,0]],dur:2400}],
    labels:[{p:'tong',t:'Skin crawls across',x:120,y:8,ax:180,ay:30},{p:'fib',t:'Fibroblasts move in',x:214,y:178,ax:228,ay:132}]},
   {key:'build',btn:'Build',title:'Vessels and collagen',marks:[['a','Rat']],
    text:'New vessels sprout into the wound and fibroblasts lay down collagen, filling and strengthening the gap. Treated wounds also contracted more.',
    model:'Rat wounds (Malinda 1999)',
    show:base.concat(['wound','tong','vess','col']),
    anim:[{p:'vess',type:'draw',sel:'path',dur:2400},{p:'col',type:'draw',sel:'path',delay:1400,dur:2200}],
    labels:[{p:'vess',t:'New vessels',x:6,y:178,ax:178,ay:120},{p:'col',t:'New collagen',x:214,y:178,ax:184,ay:128}]},
   {key:'survive',btn:'Survive',title:'A survival switch',marks:[['c','Cells']],
    text:'Tβ-4 also clips onto a PINCH-ILK complex and switches on Akt, a survival signal. Cells in the damaged zone are more likely to stay alive while they work, which matters most where tissue is dying.',
    model:'Cells and mouse heart (Bock-Marquette 2004)',
    show:base.concat(['wound','tong','ilk','akt']),
    anim:[{p:'ilk',type:'scale',from:0,dur:600},{p:'akt',type:'draw',sel:'circle',delay:700,dur:1600},{p:'akt',type:'pulse',sel:'circle',to:1.1,delay:2000,dur:1500}],
    labels:[{p:'ilk',t:'PINCH-ILK',x:6,y:60,ax:178,ay:90},{p:'akt',t:'Akt: cells survive',x:214,y:8,ax:196,ay:34}]},
   {key:'rats',btn:'Rats',study:1,title:'In rats: skin regrows faster',marks:[['a','Rat']],ms:6200,
    text:'In rat full-thickness wounds, Tβ-4 on the skin or injected sped skin regrowth: reepithelialisation rose 42% at day 4 and 61% at day 7, with more wound contraction, collagen and vessels.',
    model:'Rats, full-thickness wounds',src:[{t:'Malinda 1999, J Invest Dermatol',u:'https://doi.org/10.1046/j.1523-1747.1999.00708.x'}],
    show:['ratb'],
    anim:[{p:'ratb',type:'count',delay:500,dur:1900}],
    labels:[{p:'ratb',t:'Wound closes',x:150,y:206,ax:264,ay:60}]},
   {key:'heart',btn:'Heart',study:1,title:'In mice: an injured heart',marks:[['a','Mouse']],ms:6400,
    text:'After the coronary artery was tied off in mice, Tβ-4 raised ILK and Akt activity in the heart, kept more heart-muscle cells alive early, and improved how the heart pumped.',
    model:'Mice, coronary artery ligation',src:[{t:'Bock-Marquette 2004, Nature',u:'https://doi.org/10.1038/nature03000'}],
    show:['heart','hbars'],
    anim:[{p:'heart',type:'fadeIn',dur:700},{p:'heart',type:'shrink',sel:'.risk path',to:.3,delay:1400,dur:2400},{p:'hbars',type:'grow',sel:'.g',delay:1000,dur:1500,stagger:280}],
    labels:[{p:'heart',t:'Muscle at risk shrinks',x:6,y:120,ax:110,ay:80}]}
  ]
 };
});
