/* Thymosin Beta-4 (TB-500) story v1 (22 Nov 2026). Scene: a skin wound. Tb4 holds a pool of G-actin so cells can
   rebuild their skeleton and crawl in to close the gap, and switches on Akt for survival; then a rat wound study
   (+42% day 4, +61% day 7) and a mouse heart study. */
BSAnim.define('thymosin-beta-4',function(H,INK){
 var TEAL='#2E8F82',RED='#C0392B',ACT='#A9BCFA',GLOW='#DB6830';
 var epi='<rect x="-4" y="20" width="150" height="20" rx="3" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/><rect x="214" y="20" width="150" height="20" rx="3" fill="#FBE6DA" stroke="#C98A7A" stroke-width="1.2"/>';
 var gap='<path d="M146 20H214L200 74H160Z" fill="#E9A49A" stroke="#C0392B" stroke-width="1.1"/>';
 var gactin='';[[72,96],[92,104],[110,94],[86,118],[108,120],[128,110],[70,124],[124,130],[96,134]].forEach(function(p){gactin+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="3.2" fill="'+ACT+'" stroke="'+INK+'" stroke-width=".8"/>'});
 var fil='<g transform="translate(166 92)"><g fill="'+ACT+'" stroke="'+INK+'" stroke-width=".8">'+[0,1,2,3,4,5].map(function(i){return '<circle cx="'+(i*6).toFixed(1)+'" cy="'+((i%2)?2:-2)+'" r="3"/>'}).join('')+'</g></g>';
 function kera(x,rot){return H.spindle(x,60,rot,.9,'#F4F0C4',INK,'#C9C3F0')}
 var cells=kera(160,-6)+kera(200,8);
 var vess='<g fill="none" stroke-linecap="round"><path d="M180 150C178 130 184 112 182 96" stroke="'+RED+'" stroke-width="4.5"/><path d="M182 118C190 114 196 118 198 126" stroke="'+RED+'" stroke-width="3"/><path d="M180 150C178 130 184 112 182 96" stroke="#F6C9C2" stroke-width="2"/></g>';
 var col='<g fill="none" stroke="'+TEAL+'" stroke-width="1.7" stroke-linecap="round"><path d="'+H.crimp(150,214,132,1.5,16)+'"/><path d="'+H.crimp(150,214,140,1.5,16)+'"/></g>';
 var ilk='<g transform="translate(180 92)"><rect x="-13" y="-2" width="12" height="9" rx="2" fill="#D8CBF4" stroke="#7A5CC8" stroke-width="1.1"/><rect x="1" y="-2" width="12" height="9" rx="2" fill="#CFE6DE" stroke="'+TEAL+'" stroke-width="1.1"/><circle cx="0" cy="-8" r="3" fill="'+ACT+'" stroke="#2F5BE0" stroke-width=".8"/><text class="tm" x="0" y="20" text-anchor="middle">PINCH·ILK</text></g>';
 var aktg='<g fill="none" stroke="'+GLOW+'" stroke-width="1.6">'+[[160,60],[200,60]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="15" opacity=".75"/>'}).join('')+'</g><text class="tm" x="206" y="40" fill="'+GLOW+'">Akt ↑</text>';
 var FLOW='M70 208L96 128';
 var TBEAD=H.bead(0,0,'#A9BCFA','#2F5BE0',4);
 /* study: rat wounds */
 var ratb='<text class="tm" x="206" y="34" text-anchor="middle">REEPITHELIALISATION vs SALINE</text>'+H.bars(150,178,100,44,[.6,.87],[TEAL,TEAL],['DAY 4','DAY 7'])+
  '<text class="tb" x="172" y="108" text-anchor="middle" font-size="17" data-from="0" data-to="42" data-suf="%" data-pre="+">+42%</text>'+
  '<text class="tb" x="230" y="80" text-anchor="middle" font-size="17" data-from="0" data-to="61" data-suf="%" data-pre="+">+61%</text>';
 /* study: mouse heart */
 var heart='<path d="M250 86C250 72 232 64 216 73C203 80 205 101 250 126C295 101 297 80 284 73C268 64 250 72 250 86Z" fill="#F6C9C2" stroke="'+RED+'" stroke-width="1.6"/>'+
  '<path d="M238 70C236 88 248 104 256 120" fill="none" stroke="'+RED+'" stroke-width="2.4"/>'+
  '<path d="M238 86l-6 -3M238 86l-6 3" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/><text class="tm" x="196" y="78">TIE-OFF</text>';
 return {
  title:'Thymosin β-4 (TB-500) in a wound',aria:'Animated diagram: how Thymosin beta-4 holds a pool of G-actin so cells can crawl in and close a wound, and switches on Akt for survival, with a rat wound study and a mouse heart study.',
  vb:[360,234],stepMs:5200,
  parts:[
   {id:'epi',name:'Skin edges',info:'The epidermis on each side of the wound; it has to grow back across the gap.',svg:epi},
   {id:'gap',name:'Wound gap',info:'The open break cells must cross and fill for the wound to close.',svg:gap},
   {id:'cells',name:'Repair cells',info:'Keratinocytes and vessel-lining cells that crawl in from the edges.',svg:'<g>'+cells+'</g>'},
   {id:'gactin',name:'G-actin',info:'Loose actin monomers, the building blocks of the cell’s internal skeleton.',svg:'<g>'+gactin+'</g>'},
   {id:'fil',name:'Actin skeleton',info:'Monomers assembled into a filament; building and dismantling it is how a cell moves.',svg:fil},
   {id:'tb4',name:'Thymosin β-4',info:'A 43-amino-acid peptide (TB-500 is a close relative); it binds and holds G-actin.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:5,ms:3800,bead:TBEAD}},
   {id:'vess',name:'New vessels',info:'Vessels sprout into the wound, bringing blood and cells.',svg:vess},
   {id:'col',name:'New collagen',info:'Fibres laid down in the dermis to fill and strengthen the gap.',svg:col},
   {id:'ilk',name:'PINCH-ILK complex',info:'Tβ-4 clips onto this complex, which switches on the survival kinase Akt.',svg:ilk},
   {id:'akt',name:'Akt survival signal',info:'Keeps cells in the damaged zone alive while they rebuild.',svg:aktg},
   {id:'dermis',name:'Dermis',info:'The living layer under the skin where repair cells and vessels work.',svg:'<rect x="-4" y="40" width="368" height="110" fill="#FBF3E6" opacity=".4"/>'},
   {id:'vessel',name:'Blood vessel',info:'Tβ-4 is given on the skin or by injection and reaches the wound from here.',svg:'<rect x="-4" y="210" width="368" height="9" rx="4.5" fill="#F6C9C2" stroke="#C0392B" stroke-width="1.2"/><path d="M-4 214.5H364" stroke="#E8988D" stroke-dasharray="3 5"/>'},
   /* study: rats */
   {id:'rat',name:'Rat wounds',info:'Full-thickness skin wounds treated with Tβ-4 on the skin or injected, against saline.',svg:H.rodent(48,150,.82)+'<text class="tm" x="98" y="128">FULL-THICKNESS WOUNDS</text><text class="tm" x="98" y="144" opacity=".75">Tβ4 vs SALINE</text>'},
   {id:'ratb',name:'Skin regrowth',info:'Reepithelialisation, how far the skin had regrown, measured against saline controls.',svg:ratb},
   /* study: mouse heart */
   {id:'heart',name:'Mouse heart',info:'A coronary artery tied off to injure the heart, with or without Tβ-4.',svg:heart},
   {id:'func',name:'Better function',info:'More heart-muscle cells survived early and the heart pumped better.',svg:'<text class="tb" x="250" y="150" font-size="14" text-anchor="middle" fill="#2E8F82">FUNCTION ↑</text><text class="tm" x="250" y="168" text-anchor="middle">MORE MYOCYTES SURVIVE</text>'}
  ],
  steps:[
   {key:'wound',btn:'Wound',title:'A gap to cross',marks:[['h','Human anatomy']],
    text:'A wound leaves a gap. To close it, cells at the edges have to crawl across, and that means constantly building and taking down their internal skeleton.',
    model:'Textbook wound healing',
    show:['dermis','epi','gap','cells','vessel'],
    anim:[],
    labels:[{p:'gap',t:'Wound gap',x:150,y:8,ax:180,ay:40},{p:'cells',t:'Cells must cross',x:6,y:74,ax:160,ay:60}]},
   {key:'actin',btn:'Actin',title:'A ready pool of actin',marks:[['c','Cell biology']],
    text:'Thymosin β-4 binds G-actin, the loose building blocks of that skeleton, and holds a ready pool. With spare parts on hand a cell can put up and take down its scaffold fast, so it can move.',
    model:'Cell biology (actin)',
    show:['dermis','epi','gap','cells','gactin','fil','tb4','vessel'],
    anim:[{p:'tb4',type:'flow'},{p:'gactin',type:'fadeIn',sel:'circle',dur:700,stagger:70},{p:'fil',type:'draw',sel:'circle',delay:1600,dur:1200}],
    labels:[{p:'gactin',t:'G-actin pool',x:6,y:150,ax:96,ay:118},{p:'fil',t:'Skeleton builds',x:206,y:74,ax:184,ay:92}]},
   {key:'crawl',btn:'Crawl',title:'Cells crawl in',marks:[['a','Rat']],
    text:'Keratinocytes and vessel-lining cells migrate into the wound. The skin re-covers, new vessels grow in, and collagen fills the gap.',
    model:'Rat wounds (Malinda 1999)',
    show:['dermis','epi','gap','cells','vess','col','vessel'],
    anim:[{p:'cells',type:'move',each:[[-30,0],[30,0]],dur:2400},{p:'vess',type:'draw',sel:'path',delay:1200,dur:2000},{p:'col',type:'draw',sel:'path',delay:1600,dur:2000}],
    labels:[{p:'cells',t:'Cells crawl in',x:6,y:74,ax:168,ay:60},{p:'vess',t:'New vessels, collagen',x:206,y:170,ax:184,ay:132}]},
   {key:'survive',btn:'Survive',title:'A survival switch',marks:[['c','Cells']],
    text:'Tβ-4 also clips onto a PINCH-ILK complex and switches on Akt, a survival signal. Cells in the damaged zone are more likely to stay alive while they work.',
    model:'Cells and mouse heart (Bock-Marquette 2004)',
    show:['dermis','epi','gap','cells','ilk','akt','vessel'],
    anim:[{p:'ilk',type:'scale',from:0,dur:600},{p:'akt',type:'draw',sel:'circle',delay:700,dur:1600},{p:'akt',type:'pulse',sel:'circle',to:1.1,delay:2000,dur:1500}],
    labels:[{p:'ilk',t:'PINCH-ILK',x:6,y:150,ax:172,ay:94},{p:'akt',t:'Akt: cells survive',x:206,y:34,ax:200,ay:52}]},
   {key:'rats',btn:'Rats',study:1,title:'In rats: skin regrows faster',marks:[['a','Rat']],ms:6200,
    text:'In rat full-thickness wounds, Tβ-4 on the skin or injected sped skin regrowth: reepithelialisation rose 42% at day 4 and 61% at day 7, with more wound contraction, collagen and vessels.',
    model:'Rats, full-thickness wounds',src:[{t:'Malinda 1999, J Invest Dermatol',u:'https://doi.org/10.1046/j.1523-1747.1999.00708.x'}],
    show:['rat','ratb'],
    anim:[{p:'ratb',type:'grow',sel:'.g',dur:1500,delay:400,stagger:320},{p:'ratb',type:'count',delay:500,dur:1900}],
    labels:[]},
   {key:'heart',btn:'Heart',study:1,title:'In mice: an injured heart',marks:[['a','Mouse']],ms:6400,
    text:'After the coronary artery was tied off in mice, Tβ-4 raised ILK and Akt activity in the heart, kept more heart-muscle cells alive early, and improved how the heart pumped.',
    model:'Mice, coronary artery ligation',src:[{t:'Bock-Marquette 2004, Nature',u:'https://doi.org/10.1038/nature03000'}],
    show:['heart','func'],
    anim:[{p:'heart',type:'fadeIn',dur:800},{p:'func',type:'fadeIn',delay:1400,dur:900}],
    labels:[{p:'heart',t:'Coronary tied off',x:188,y:60,ax:238,ay:84}]}
  ]
 };
});
