/* MitoPrime blend story v1 (22 Nov 2026). NAD+ + MOTS-c + 5-Amino-1MQ, shown working together on the bigger picture:
   5-Amino-1MQ stops the NAD+ drain, NAD+ is the shared currency, MOTS-c feeds fuel into the mitochondria. Each piece
   is sourced in its own compound story; the combination is rational stacking, not tested together in people (matches
   the Library's hedge). */
BSAnim.define('mitoprime',function(H,INK){
 var TEAL='#2E8F82',GOLD='#C9A100',BLUE='#2F5BE0',GLU='#4E9A3E',ORANGE='#DB6830',GREY='#9AA0C8';
 var cell='<rect x="4" y="30" width="352" height="182" rx="34" fill="#FBF3E6" stroke="'+INK+'" stroke-width="2"/><rect x="12" y="38" width="336" height="166" rx="28" fill="none" stroke="'+INK+'" stroke-width="1" opacity=".5"/>';
 /* mitochondrion, right side */
 var mitoOut='<rect x="206" y="70" width="140" height="92" rx="44" fill="#F3E8D8" stroke="'+INK+'" stroke-width="1.8"/>';
 var mSHELF='M226 92H318Q332 92 332 103Q332 114 318 114H240Q226 114 226 125Q226 136 240 136H318';
 var cristae='<path d="'+mSHELF+'" fill="none" stroke="'+INK+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
 var etc='<g>'+[[244,92,'#B493E8'],[280,92,'#8FD0C4'],[312,92,'#F1C27A']].map(function(c){return '<rect x="'+(c[0]-7)+'" y="'+(c[1]-6)+'" width="14" height="12" rx="2" fill="'+c[2]+'" stroke="'+INK+'" stroke-width="1"/>'}).join('')+'<circle cx="300" cy="146" r="8" fill="#FFF0A8" stroke="'+INK+'" stroke-width="1.2"/><rect x="297.5" y="136" width="5" height="10" fill="'+GOLD+'"/></g>';
 /* NAD+ tank (shared currency) */
 function tank(fill){return '<g><rect x="158" y="74" width="30" height="88" rx="5" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.5"/><rect class="fill" x="161" y="'+(159-fill)+'" width="24" height="'+fill+'" rx="3" fill="'+TEAL+'"/><text class="tm" x="173" y="70" text-anchor="middle">NAD+</text></g>'}
 /* inputs, left */
 function nnmt(on){var c=on?'#A88400':'#B5B5B5',f=on?'#F6E2B0':'#ECECEC';return '<g transform="translate(74 74)"><path d="M-15 0A15 15 0 1 1 15 0 Q15 9 0 9 Q-15 9 -15 0Z" fill="'+f+'" stroke="'+c+'" stroke-width="1.5"/><text y="-1" style="font-size:8px" font-weight="700" text-anchor="middle" fill="'+INK+'">NNMT</text></g>'}
 function ampk(on){var c=on?TEAL:'#B5B5B5',f=on?'#CFE6DE':'#ECECEC';return '<g transform="translate(80 128)"><rect x="-16" y="-11" width="32" height="22" rx="7" fill="'+f+'" stroke="'+c+'" stroke-width="2"/><circle cx="'+(on?7:-7)+'" cy="0" r="8" fill="'+c+'"/><text x="0" y="-17" style="font-size:9px" font-weight="700" text-anchor="middle" fill="'+INK+'">AMPK</text></g>'}
 var fat='<circle cx="86" cy="180" r="20" fill="#FCEAB0" stroke="'+GOLD+'" stroke-width="1.4"/><text class="tm" x="86" y="183" text-anchor="middle" style="font-size:8px" opacity=".7">FAT</text>';
 var glucose=H.puffs([[150,24],[180,22],[210,24],[135,20]],'#D8F0D0',GLU,3.2);
 var atp='<g>'+[[330,176],[346,150],[344,120]].map(function(p){return '<g transform="translate('+p[0]+' '+p[1]+')"><path d="M0 -7L6 -3V4L0 8L-6 4V-3Z" fill="#FFF0A8" stroke="'+INK+'" stroke-width="1"/><text y="3" style="font-size:6.5px" font-weight="700" text-anchor="middle">ATP</text></g>'}).join('')+'</g>';
 /* legend of the three ingredients */
 var legend='<g><text class="tm" x="12" y="20">IN THE BLEND:</text>'+
  '<circle cx="122" cy="16" r="5" fill="'+TEAL+'"/><text class="tm" x="132" y="19">NAD+</text>'+
  '<path d="M176 18c3 -6 6 1 9 -3" fill="none" stroke="'+BLUE+'" stroke-width="2" stroke-linecap="round"/><text class="tm" x="190" y="19">MOTS-c</text>'+
  '<path d="M246 13h10l-2.5 6h-5z" fill="#FFFBDE" stroke="'+INK+'" stroke-width="1"/><text class="tm" x="262" y="19">5-AMINO-1MQ</text></g>';
 /* flows */
 var MOTbead=H.bead(0,0,'#A9BCFA',BLUE,4);
 var AMQbead='<path d="M-5 2h10l-2.5 -5h-5z" fill="#FFFBDE" stroke="'+INK+'" stroke-width="1"/>';
 var NADbead='<circle r="3.4" fill="'+TEAL+'" stroke="#1C6B5E" stroke-width=".8"/>';
 var base=['cell','mitoOut','cristae','etc','legend'];
 return {
  title:'MitoPrime: three routes to more energy',aria:'Animated diagram: how the MitoPrime blend of NAD+, MOTS-c and 5-Amino-1MQ works together, with 5-Amino-1MQ stopping the NAD+ drain, NAD+ as the shared currency, and MOTS-c feeding fuel into the mitochondria. The combination is rational stacking, not tested together in people.',
  vb:[360,234],stepMs:5400,
  parts:[
   {id:'cell',name:'Cell',info:'The blend’s three parts all act inside the cell, on its energy metabolism.',svg:cell},
   {id:'mitoOut',name:'Mitochondrion',info:'The power plant where fuel and NAD+ are turned into ATP.',svg:mitoOut},
   {id:'cristae',name:'Cristae',info:'The folded inner membrane that carries the electron transport chain.',svg:cristae},
   {id:'etc',name:'Electron transport chain + ATP synthase',info:'Where NAD+ hands over electrons and ATP is made.',svg:etc},
   {id:'legend',name:'In the blend',info:'NAD+, MOTS-c and 5-Amino-1MQ, the three ingredients of MitoPrime.',svg:legend},
   {id:'nnmtOn',name:'NNMT (draining NAD+)',info:'The enzyme that burns through nicotinamide and drains the NAD+ supply.',svg:nnmt(1)},
   {id:'nnmtOff',name:'NNMT (blocked)',info:'Blocked by 5-Amino-1MQ, so NAD+ stops leaking.',svg:nnmt(0)},
   {id:'ampkOff',name:'AMPK (off)',info:'The cell’s fuel switch, at rest.',svg:ampk(0)},
   {id:'ampkOn',name:'AMPK (on)',info:'Switched on by MOTS-c: glucose in, fat burned.',svg:ampk(1)},
   {id:'fat',name:'Fat',info:'Stored fuel, burned down and fed into the mitochondria.',svg:fat},
   {id:'glucose',name:'Glucose',info:'Blood sugar pulled into the cell for fuel.',svg:glucose},
   {id:'nadLow',name:'NAD+ (low)',info:'Without help, NNMT keeps the NAD+ tank low.',svg:tank(24)},
   {id:'nadHigh',name:'NAD+ (full)',info:'Topped up directly and spared by 5-Amino-1MQ: the shared currency both the chain and the sirtuins run on.',svg:tank(80)},
   {id:'atp',name:'ATP',info:'The energy the mitochondria turn out.',svg:atp},
   {id:'amq',name:'5-Amino-1MQ',info:'Blocking NNMT to protect the NAD+ supply.',svg:'<g class="flowg"></g>',flow:{path:'M40 40C56 50 66 58 74 66',n:3,ms:3200,bead:AMQbead}},
   {id:'mots',name:'MOTS-c',info:'Switching on AMPK to feed fuel in.',svg:'<g class="flowg"></g>',flow:{path:'M150 40C120 70 100 100 80 118',n:3,ms:3400,bead:MOTbead}},
   {id:'nadin',name:'NAD+ topped up',info:'NAD+ added directly by the blend, filling the tank.',svg:'<g class="flowg"></g>',flow:{path:'M300 40C240 48 200 58 173 76',n:3,ms:3400,bead:NADbead}},
   {id:'feed',name:'Fuel to the mitochondria',info:'Glucose and fat carried in to be burned for ATP.',svg:'<g class="flowg"></g>',flow:{path:'M96 150C150 150 170 130 210 118',n:4,ms:3200,bead:NADbead}}
  ],
  steps:[
   {key:'stack',btn:'Stack',title:'Three routes, one target',marks:[['c','Cell biology']],
    text:'MitoPrime stacks three things that all push the same way: toward more cellular energy. They meet at one place, the NAD+ supply and the mitochondria that spend it.',
    model:'Rational stack of the three mechanisms',
    show:base.concat(['nadLow','nnmtOn','ampkOff','fat']),
    anim:[{p:'legend',type:'fadeIn',sel:'text',dur:700,stagger:120}],
    labels:[{p:'mitoOut',t:'Mitochondria',x:214,y:208,ax:276,ay:162},{p:'nadLow',t:'NAD+ supply',x:120,y:60,ax:173,ay:120}]},
   {key:'amq',btn:'Spare',title:'5-Amino-1MQ stops the drain',marks:[['c','Cell biology']],
    text:'5-Amino-1MQ blocks NNMT, the enzyme that burns through the raw material for NAD+. With the drain shut off, NAD+ stops leaking away.',
    model:'Neelakantan 2018 (NNMT)',
    show:base.concat(['nnmtOff','amq','nadLow','ampkOff','fat']),
    anim:[{p:'amq',type:'flow'},{p:'nnmtOff',type:'fadeIn',delay:900,dur:600}],
    labels:[{p:'nnmtOff',t:'NNMT blocked',x:6,y:56,ax:74,ay:74}]},
   {key:'nad',btn:'NAD+',title:'NAD+ is the shared currency',marks:[['c','Cell biology']],
    text:'NAD+ is topped up directly too, and it is the currency the whole system runs on: the electron transport chain hands its electrons to it, and the sirtuins use it. A fuller tank raises the ceiling on energy.',
    model:'Cell biology',
    show:base.concat(['nnmtOff','nadin','nadHigh']),
    anim:[{p:'nadin',type:'flow'},{p:'nadHigh',type:'grow',sel:'.fill',axis:'y',delay:600,dur:1800}],
    labels:[{p:'nadHigh',t:'NAD+ full',x:120,y:60,ax:173,ay:110},{p:'etc',t:'Powers the chain',x:214,y:208,ax:280,ay:92}]},
   {key:'mots',btn:'Fuel',title:'MOTS-c feeds the fire',marks:[['c','Cell biology']],
    text:'MOTS-c switches on AMPK, which pulls glucose in and burns fat, the exercise-like shift. That sends more fuel into the mitochondria, where NAD+ helps turn it into ATP.',
    model:'Lee 2015 (MOTS-c / AMPK)',
    show:base.concat(['nnmtOff','nadHigh','mots','ampkOn','glucose','fat','feed']),
    anim:[{p:'mots',type:'flow'},{p:'ampkOn',type:'scale',from:.7,delay:700,dur:600},{p:'glucose',type:'fadeIn',sel:'circle',delay:900,dur:600,stagger:100},{p:'feed',type:'flow'},{p:'fat',type:'shrink',sel:'circle',to:.6,delay:1200,dur:2000}],
    labels:[{p:'ampkOn',t:'AMPK on',x:6,y:170,ax:80,ay:122},{p:'feed',t:'Fuel to the mitochondria',x:120,y:60,ax:170,ay:128}]},
   {key:'together',btn:'Together',title:'Together: more in, more out',marks:[['c','Cell biology']],
    text:'Stacked, the picture is one state: a full NAD+ tank, more fuel coming in, more ATP going out, and less held as fat. An exercise-like, energy-spending cell.',
    model:'The three mechanisms combined',
    show:base.concat(['nnmtOff','nadHigh','ampkOn','etc','atp']),
    anim:[{p:'atp',type:'fadeIn',sel:'g',dur:700,stagger:220},{p:'etc',type:'pulse',sel:'rect',to:1.1,dur:1500,stagger:120},{p:'nadHigh',type:'pulse',sel:'.fill',to:1.04,dur:1600}],
    labels:[{p:'atp',t:'More ATP',x:214,y:208,ax:344,ay:150}]},
   {key:'honest',btn:'Truth',title:'What is and isn’t known',marks:[['o','The honest bit']],ms:6400,
    text:'Each piece is shown on its own, mostly in cells and mice: 5-Amino-1MQ on NAD+ and fat, MOTS-c on AMPK and endurance, NAD+ as the cofactor. The way they fit together is sound reasoning. The combination itself has not been tested as a blend in people.',
    model:'Rational stack, not a trial',
    show:base.concat(['nnmtOff','nadHigh','ampkOn']),
    anim:[{p:'nadHigh',type:'pulse',sel:'.fill',to:1.03,dur:1800}],
    labels:[]}
  ]
 };
});
