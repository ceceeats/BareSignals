/* BSAnim v1 (20 Nov 2026): shared Bare Signals "How it works, animated" engine for Library Full read pages.
   One engine, one story per peptide, written as data in BSAnim.STORIES[slug]:
     parts  : [{id, name, info, svg}]   drawing pieces (inline SVG markup); tap one for its one-line explanation
     steps  : [{key, btn, title, marks, text, model, show:[part ids], anim:[...], labels:[...] }]
              marks: 'h' human ●, 't' human tissue ◆, 'a' animal ▲, 'c' cells ■, 'o' theory ○
              anim : {p, type:'draw'|'move'|'fadeIn'|'fadeOut'|'flow', delay, dur, from:[dx,dy], path}
              labels: {p, t, x, y, ax, ay}  chip top-left (x,y) and the point it names (ax,ay), viewBox units
     people : {title, marks, text, rows:[...]}  honest end card ("In people")
   Usage: BSAnim.mount(el,'bpc-157')  ->  {go(key), play(), pause(), replay(), destroy()}
   Light palette only (paper #FFFFE2, chip #FFFFF4, ink #3E4A80, rule #E3E0BF); proof mark colours from /legend. */
var BSAnim=(function(){
var NS='http://www.w3.org/2000/svg',UID=0;
var INK='#3E4A80',SOFT='#6B76A8',CHIP='#FFFFF4';
var MARK={h:['Human','#4E9A3E'],t:['Human tissue','#3557C8'],a:['Animal','#C9A100'],c:['Cells','#B493E8'],o:['Theory','#6B76A8']};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mk(t,a,p){var e=document.createElementNS(NS,t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function markHTML(m,label){var M=MARK[m];return '<span class="bsa-mk"><i class="bsa-pm bsa-pm-'+m+'" aria-hidden="true"></i>'+esc(label||M[0])+'</span>'}

var CSS='.bsa{--bsak:var(--k,1);color:'+INK+'}'+
'.bsa .bsa-ctl{display:flex;flex-wrap:wrap;gap:5px;margin:0 0 6px}'+
'.bsa .bsa-b{all:unset;cursor:pointer;box-sizing:border-box;font:600 calc(12px*var(--bsak))/1.1 var(--mono,ui-monospace,monospace);letter-spacing:.04em;text-transform:uppercase;padding:8px 9px;min-height:36px;display:inline-flex;align-items:center;gap:5px;background:'+CHIP+';color:'+INK+';box-shadow:inset 0 0 0 1.5px color-mix(in srgb,'+INK+' 30%,transparent);touch-action:manipulation}'+
'.bsa .bsa-b b{font-weight:700;color:'+SOFT+'}.bsa .bsa-b.on{background:#FFF0A8;box-shadow:inset 0 0 0 1.5px '+INK+'}.bsa .bsa-b.on b{color:'+INK+'}'+
'.bsa .bsa-b.pl{color:#2F5BE0}.bsa .bsa-b:focus-visible{outline:2px solid #2F5BE0;outline-offset:2px}'+
'.bsa .bsa-dg{border:1.5px solid '+INK+';background:'+CHIP+'}'+
'.bsa svg{display:block;width:100%;height:auto;font-family:var(--body,"Hanken Grotesk",system-ui,sans-serif);touch-action:manipulation}'+
'.bsa svg .pt{transition:opacity .45s ease}.bsa svg .pt.off{opacity:0;pointer-events:none}'+
'.bsa svg .pt[data-info]{cursor:pointer}.bsa svg .pt.sel{filter:drop-shadow(0 0 2.5px #2F5BE0)}'+
'.bsa svg .lk{cursor:pointer;transition:opacity .35s}.bsa svg .lk rect{fill:'+CHIP+';stroke:'+INK+';stroke-width:1.2}'+
'.bsa svg .lk text{font-size:12.5px;font-weight:600;fill:'+INK+'}.bsa svg .lk line{stroke:'+SOFT+';stroke-width:1}.bsa svg .lk circle{fill:'+INK+'}'+
'.bsa svg .lk.sel rect{stroke:#2F5BE0;stroke-width:1.8}.bsa svg .lk.sel text{fill:#2F5BE0}'+
'.bsa svg .scene{transition:opacity .5s}.bsa svg.ppl .scene{opacity:.16}.bsa svg .card{transition:opacity .5s;opacity:0;pointer-events:none}.bsa svg.ppl .card{opacity:1}'+
'.bsa svg .card text{fill:'+INK+'}'+
'.bsa .bsa-prog{display:flex;align-items:center;gap:8px;padding:7px 8px 8px;border-top:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent);font:600 calc(12px*var(--bsak))/1.2 var(--mono,ui-monospace,monospace);letter-spacing:.05em;text-transform:uppercase}'+
'.bsa .bsa-step{flex:none;white-space:nowrap}.bsa .bsa-bar{flex:1;min-width:36px;height:5px;background:color-mix(in srgb,'+INK+' 12%,transparent)}.bsa .bsa-bar i{display:block;height:100%;width:0;background:#2F5BE0}'+
'.bsa .bsa-cap{padding:9px 10px 10px;border-top:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent)}'+
'.bsa .bsa-ct{display:flex;flex-wrap:wrap;align-items:center;gap:6px 8px;margin:0 0 4px;font:700 calc(15px*var(--bsak))/1.2 var(--body,"Hanken Grotesk",system-ui,sans-serif)}'+
'.bsa .bsa-mk{display:inline-flex;align-items:center;gap:5px;font:600 calc(12px*var(--bsak))/1 var(--mono,ui-monospace,monospace);letter-spacing:.05em;text-transform:uppercase;padding:4px 6px;border:1.5px solid '+INK+';background:'+CHIP+';white-space:nowrap}'+
'.bsa .bsa-pm{display:inline-block;flex:none}'+
'.bsa .bsa-pm-h{width:9px;height:9px;border-radius:50%;background:#4E9A3E}.bsa .bsa-pm-t{width:7px;height:7px;background:#3557C8;transform:rotate(45deg)}'+
'.bsa .bsa-pm-a{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid #C9A100}'+
'.bsa .bsa-pm-c{width:8px;height:8px;background:#B493E8}.bsa .bsa-pm-o{width:9px;height:9px;border-radius:50%;box-sizing:border-box;border:2px solid '+SOFT+'}'+
'.bsa .bsa-tx{margin:0;font-size:calc(14px*var(--bsak));line-height:1.45}'+
'.bsa .bsa-md{margin:5px 0 0;font:500 calc(12px*var(--bsak))/1.35 var(--mono,ui-monospace,monospace);letter-spacing:.03em;color:'+SOFT+'}'+
'.bsa .bsa-info{margin:6px 0 0;min-height:2.9em;font-size:calc(13px*var(--bsak));line-height:1.4;color:'+INK+';padding:6px 9px;background:color-mix(in srgb,#E3E0BF 30%,'+CHIP+');border-left:4px solid #E3E0BF}'+
'.bsa .bsa-info b{font-weight:700}'+
'@media (min-width:900px){.bsa .bsa-dg{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(250px,1fr);grid-template-rows:auto 1fr}.bsa .bsa-dg>svg{grid-column:1;grid-row:1}.bsa .bsa-prog{grid-column:1;grid-row:2;align-self:start}.bsa .bsa-cap{grid-column:2;grid-row:1/3;border-top:0;border-left:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent);padding:12px 14px}}'+
'@media (prefers-reduced-motion:reduce){.bsa svg *{transition:none!important}}';
function css(){if(document.getElementById('bsa-css'))return;var s=document.createElement('style');s.id='bsa-css';s.textContent=CSS;document.head.appendChild(s)}

/* ---------- drawing helpers for story data ---------- */
var H={
 crimp:function(x0,x1,y,a,wl){var d='M'+x0+' '+y,x;for(x=x0;x<x1;x+=wl/2){var xe=Math.min(x+wl/2,x1);d+='Q'+((x+xe)/2).toFixed(1)+' '+(y+((Math.round((x-x0)/(wl/2))%2)?a:-a)).toFixed(1)+' '+xe.toFixed(1)+' '+y}return d},
 spindle:function(x,y,rot,s,fill,stroke,nuc){return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+s+')"><path d="M-14 0C-7 -5.5 7 -5.5 14 0C7 5.5 -7 5.5 -14 0Z" fill="'+fill+'" stroke="'+stroke+'" stroke-width="1.5"/><ellipse rx="3.6" ry="2.1" fill="'+(nuc||INK)+'"/></g>'},
 bead:function(x,y){var s='<g class="pep" transform="translate('+x+' '+y+')">',i;for(i=0;i<5;i++)s+='<circle cx="'+(i*3.6-7.2)+'" cy="'+((i%2)?1.4:-1.4)+'" r="2.1" fill="#A9BCFA" stroke="#2F5BE0" stroke-width=".9"/>';return s+'</g>'}
};

/* ---------- BPC-157 story ---------- */
function bpcStory(){
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
   {id:'pep',name:'BPC-157',info:'A 15 amino acid chain; in rats and dogs half of it is gone within 30 minutes. No receptor has been found.',svg:'<g class="flowg"></g>',flow:{path:FLOW,n:6,ms:3600}}
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
    labels:[{p:'colL',t:'Collagen lines up',x:126,y:208,ax:180,ay:150},{p:'colL',t:'Gap closes faster (rats)',x:6,y:70,ax:160,ay:104},{p:'fibro',t:'Fibroblast',x:266,y:208,ax:197,ay:136}]}
  ],
  people:{key:'people',btn:'In people',title:'In people',marks:[['h','Human, limited']],
   text:'Three small studies, none with a control group, all led by one Florida clinic doctor who offers it. No controlled tendon trial yet; one rotator cuff trial is registered.',
   model:'Knee pain chart review 2021, bladder pilot 2024, IV safety pilot 2025',
   rows:['3 small studies, no control group','All led by one Florida clinic doctor','0 controlled tendon trials so far','1 rotator cuff trial registered']}
 };
}
var STORIES={'bpc-157':bpcStory()};

/* ---------- engine ---------- */
function mount(el,slug,opt){
 opt=opt||{};css();var S=typeof slug==='object'?slug:STORIES[slug];if(!S){el.textContent='';return null}
 var id='bsa'+(++UID),RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var ALL=S.steps.concat(S.people?[S.people]:[]),N=S.steps.length;
 el.classList.add('bsa');
 var btns='<div class="bsa-ctl" role="group" aria-label="Steps">';
 ALL.forEach(function(s,i){btns+='<button type="button" class="bsa-b" data-k="'+s.key+'">'+(i<N?'<b>'+(i+1)+'</b>':'')+esc(s.btn)+'</button>'});
 btns+='<button type="button" class="bsa-b pl" data-k="play" aria-pressed="false">Play</button><button type="button" class="bsa-b" data-k="replay">Replay</button></div>';
 el.innerHTML=btns+'<div class="bsa-dg"><svg viewBox="0 0 '+S.vb[0]+' '+S.vb[1]+'" role="img" aria-labelledby="'+id+'t"><title id="'+id+'t">'+esc(S.aria)+'</title></svg>'+
  '<div class="bsa-prog"><span class="bsa-step" aria-live="polite"></span><span class="bsa-bar" aria-hidden="true"><i></i></span></div>'+
  '<div class="bsa-cap"><div class="bsa-ct"></div><p class="bsa-tx"></p><p class="bsa-md"></p><p class="bsa-info" aria-live="polite"></p></div></div>';
 var svg=el.querySelector('svg'),scene=mk('g',{'class':'scene'},svg),labG=mk('g',{'class':'labs'},svg),card=mk('g',{'class':'card'},svg);
 var stepEl=el.querySelector('.bsa-step'),bar=el.querySelector('.bsa-bar i'),ct=el.querySelector('.bsa-ct'),tx=el.querySelector('.bsa-tx'),md=el.querySelector('.bsa-md'),info=el.querySelector('.bsa-info');
 var INFO0='Tap any part of the picture for a one-line explanation.';
 var G={};S.parts.forEach(function(p){var g=mk('g',{'class':'pt off','data-p':p.id},scene);g.innerHTML=p.svg;if(p.info)g.setAttribute('data-info','1');G[p.id]=g});
 /* end card */
 if(S.people){var P=S.people,cw=300,chh=44+P.rows.length*30,cx=(S.vb[0]-cw)/2,cy=(S.vb[1]-chh)/2;
  var c='<rect x="'+cx+'" y="'+cy+'" width="'+cw+'" height="'+chh+'" fill="#FFFFF4" stroke="'+INK+'" stroke-width="1.5"/><rect x="'+cx+'" y="'+cy+'" width="5" height="'+chh+'" fill="#4E9A3E"/>'+
   '<circle cx="'+(cx+22)+'" cy="'+(cy+22)+'" r="5.5" fill="#4E9A3E"/><text x="'+(cx+34)+'" y="'+(cy+27)+'" font-size="14" font-weight="700" letter-spacing=".08em" font-family="var(--mono,monospace)">IN PEOPLE · LIMITED</text>';
  P.rows.forEach(function(r,i){var yy=cy+56+i*30;c+='<line x1="'+(cx+16)+'" x2="'+(cx+cw-14)+'" y1="'+(yy-19)+'" y2="'+(yy-19)+'" stroke="#E3E0BF"/><text x="'+(cx+18)+'" y="'+yy+'" font-size="13.5" font-weight="600">'+esc(r)+'</text>'});
  card.innerHTML=c}
 var cur=-1,anims=[],flows=[],raf=0,pl={on:false,paused:false,t:0,last:0},TOT=ALL.length*S.stepMs;
 function stopAnims(){anims.forEach(function(a){try{a.cancel()}catch(e){}});anims=[];flows=[];if(raf)cancelAnimationFrame(raf);raf=0;
  S.parts.forEach(function(p){if(p.flow)G[p.id].querySelector('.flowg').innerHTML=''})}
 function A(node,kf,o){if(RM||!node.animate)return null;var a=node.animate(kf,o);anims.push(a);if(pl.paused)a.pause();return a}
 function runAnims(s){(s.anim||[]).forEach(function(a){var g=G[a.p];if(!g)return;var d=a.delay||0,du=a.dur||1000;
  if(a.type==='draw'){g.querySelectorAll('path').forEach(function(p){var L=p.getTotalLength();A(p,[{strokeDasharray:L+' '+L,strokeDashoffset:L},{strokeDasharray:L+' '+L,strokeDashoffset:0}],{duration:du,delay:d,easing:'ease-in-out',fill:'backwards'})})}
  else if(a.type==='move'){var kids=a.each?[].slice.call(g.children):[g];kids.forEach(function(k,i){var f=a.each?a.each[i]:a.from;if(!f)return;A(k,[{translate:f[0]+'px '+f[1]+'px'},{translate:'0px 0px'}],{duration:du,delay:d,easing:'ease-out',fill:'backwards'})})}
  else if(a.type==='fadeIn')A(g,[{opacity:0},{opacity:1}],{duration:du,delay:d,fill:'backwards'});
  else if(a.type==='fadeOut'){var an=A(g,[{opacity:1},{opacity:0}],{duration:du,delay:d,fill:'forwards'});if(!an)g.style.opacity='0'}
  else if(a.type==='flow')flowStart(a.p)})}
 function flowStart(pid){var p=S.parts.filter(function(x){return x.id===pid})[0],F=p.flow,host=G[pid].querySelector('.flowg');
  var path=mk('path',{d:F.path,fill:'none',stroke:'none'},host),L=path.getTotalLength(),beads=[];
  for(var i=0;i<F.n;i++){var w=mk('g',{},host);w.innerHTML=H.bead(0,0);beads.push(w)}
  function place(t){beads.forEach(function(b,i){var u=((t/F.ms)+i/F.n)%1,q=path.getPointAtLength(u*L);b.setAttribute('transform','translate('+q.x.toFixed(1)+' '+q.y.toFixed(1)+')');b.setAttribute('opacity',u<.06?u/.06:u>.94?(1-u)/.06:1)})}
  if(RM){place(0);return}
  var t0=performance.now(),tp=0;flows.push(1);
  function loop(now){if(!pl.paused){tp+=now-(loop.l||now)}loop.l=now;place(tp);raf=requestAnimationFrame(loop)}raf=requestAnimationFrame(loop)}
 function labels(s){labG.innerHTML='';(s.labels||[]).forEach(function(L){var g=mk('g',{'class':'lk','data-p':L.p,role:'button',tabindex:'0','aria-label':L.t},labG);
  var ln=mk('line',{},g),dot=mk('circle',{cx:L.ax,cy:L.ay,r:2},g),r=mk('rect',{x:L.x,y:L.y,height:19,rx:0},g),t=mk('text',{x:L.x+6,y:L.y+13.6},g);t.textContent=L.t;
  var w=Math.ceil(t.getComputedTextLength())+12;r.setAttribute('width',w);
  var bx=Math.max(L.x,Math.min(L.ax,L.x+w)),by=L.ay<L.y?L.y:L.y+19;if(L.ay>=L.y&&L.ay<=L.y+19){by=L.y+9.5;bx=L.ax<L.x?L.x:L.x+w}
  ln.setAttribute('x1',bx);ln.setAttribute('y1',by);ln.setAttribute('x2',L.ax);ln.setAttribute('y2',L.ay)})}
 function caption(s,i){ct.innerHTML='<span>'+(i<N?(i+1)+' · ':'')+esc(s.title)+'</span>'+s.marks.map(function(m){return markHTML(m[0],m[1])}).join('');
  tx.textContent=s.text;md.textContent='From: '+s.model;stepEl.textContent=i<N?'Step '+(i+1)+' of '+N+' · '+s.title:s.title+' · the evidence'}
 function go(k,fromPlay){var i=typeof k==='number'?k:ALL.map(function(s){return s.key}).indexOf(k);if(i<0)return;
  if(!fromPlay)stop();cur=i;var s=ALL[i],isP=i>=N,base=isP?S.steps[N-1]:s;stopAnims();
  S.parts.forEach(function(p){var on=base.show.indexOf(p.id)>=0&&!(isP&&(base.hideAtEnd||[]).indexOf(p.id)>=0);G[p.id].classList.toggle('off',!on);G[p.id].style.opacity=''});
  svg.classList.toggle('ppl',isP);
  if(isP){labG.innerHTML='';(base.hideAtEnd||[]).forEach(function(id){G[id].classList.add('off')})}else{labels(s);runAnims(s)}
  caption(s,i);sel(null);
  el.querySelectorAll('.bsa-b').forEach(function(b){b.classList.toggle('on',b.dataset.k===s.key)});
  if(!pl.on)bar.style.width=(i/(ALL.length-1)*100).toFixed(1)+'%';
  if(opt.onStep)opt.onStep(s.key,i)}
 function sel(pid){svg.querySelectorAll('.sel').forEach(function(e){e.classList.remove('sel')});
  if(!pid){info.textContent=INFO0;return}var p=S.parts.filter(function(x){return x.id===pid})[0];if(!p)return;
  G[pid].classList.add('sel');labG.querySelectorAll('.lk[data-p="'+pid+'"]').forEach(function(e){e.classList.add('sel')});
  info.innerHTML='<b>'+esc(p.name)+':</b> '+esc(p.info)}
 svg.addEventListener('click',function(e){var t=e.target.closest('.lk,.pt[data-info]');if(!t||t.classList.contains('off'))return;sel(t.getAttribute('data-p'))});
 svg.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('lk')){e.preventDefault();sel(e.target.getAttribute('data-p'))}});
 /* play */
 var pb=el.querySelector('[data-k=play]');
 function pbText(){pb.textContent=pl.on&&!pl.paused?'Pause':'Play';pb.setAttribute('aria-pressed',pl.on&&!pl.paused?'true':'false');pb.classList.toggle('on',pl.on&&!pl.paused)}
 function tick(now){if(!pl.on)return;if(!pl.paused){pl.t+=now-pl.last}pl.last=now;
  var i=Math.min(ALL.length-1,Math.floor(pl.t/S.stepMs));if(i!==cur)go(i,true);
  bar.style.width=(Math.min(1,pl.t/TOT)*100).toFixed(1)+'%';
  if(pl.t>=TOT){pl.on=false;pbText();return}pl.raf=requestAnimationFrame(tick)}
 function play(){if(pl.on&&pl.paused){pl.paused=false;anims.forEach(function(a){a.play()});pbText();return}
  if(pl.on)return;stop();pl.on=true;pl.paused=false;pl.t=(cur>0&&cur<ALL.length-1)?cur*S.stepMs:0;pl.last=performance.now();cur=-1;pbText();pl.raf=requestAnimationFrame(tick)}
 function pause(){if(!pl.on)return;pl.paused=true;anims.forEach(function(a){a.pause()});pbText()}
 function stop(){if(pl.raf)cancelAnimationFrame(pl.raf);pl.raf=0;pl.on=false;pl.paused=false;pbText()}
 function replay(){stop();cur=0;pl.on=true;pl.paused=false;pl.t=0;pl.last=performance.now();cur=-1;pbText();pl.raf=requestAnimationFrame(tick)}
 el.querySelector('.bsa-ctl').addEventListener('click',function(e){var b=e.target.closest('.bsa-b');if(!b)return;var k=b.dataset.k;
  if(k==='play'){pl.on&&!pl.paused?pause():play()}else if(k==='replay')replay();else go(k)});
 go(0);
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(cur>=0&&cur<N)labels(ALL[cur])});
 return {go:go,play:play,pause:pause,replay:replay,sel:sel,destroy:function(){stop();stopAnims();el.innerHTML='';el.classList.remove('bsa')}};
}
return {mount:mount,STORIES:STORIES,H:H};
})();
