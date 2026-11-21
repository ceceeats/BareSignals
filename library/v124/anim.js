/* BSAnim v2 (21 Nov 2026, built on v1 of 20 Nov in /library/v123d/anim.js, kept): one shared "How it works" animation engine
   for the whole site (Library Full read, Quick look, the Guide, each compound's own How it works page /library/how/<slug>/).
   v2: no "In people" end card and no hedge line (readers know the evidence base); study steps show what happened in
   dishes, mice, rats and trials as their own animated scenes (marked Cells / Mouse / Rat / Human); stories load as one
   file each from /library/anim/<slug>.js; new motion types (grow, scale, shrink, pulse, count); per-step length;
   source line under each step links the paper; tap hint only after a tap (no empty box).
   Story data: BSAnim.define(slug, function(H,C){ return {title, sub, aria, vb:[w,h], parts:[...], steps:[...] } })
     parts : {id, name, info, svg, flow?}            tap a part for its one-line explanation
     steps : {key, btn, title, marks:[[m,label]], text, model, src:[{t,u}], ms?, show:[ids], anim:[...], labels:[...], study?}
     marks : h human ●, t human tissue ◆, a animal ▲, c cells ■, o theory ○
     anim  : {p, type:'draw'|'move'|'fadeIn'|'fadeOut'|'flow'|'grow'|'scale'|'shrink'|'pulse'|'count', sel?, delay, dur, from, to, axis, each}
     labels: {p, t, x, y, ax, ay}   chip top-left (x,y) and the point it names (ax,ay), viewBox units
   Rule (Cece, 21 Nov 2026): the best animation is used everywhere; improve it here once and every page gets it. */
var BSAnim=(function(){
var NS='http://www.w3.org/2000/svg',UID=0,BASE='/library/anim/';
var INK='#3E4A80',SOFT='#6B76A8',CHIP='#FFFFF4',BLUE='#2F5BE0';
var MARK={h:['Human','#4E9A3E'],t:['Human tissue','#3557C8'],a:['Animal','#C9A100'],c:['Cells','#B493E8'],o:['Theory','#6B76A8']};
/* compounds with a story, and the scene each one is set in (pages read this to know when to show the section) */
var HAS={'bpc-157':'torn tendon'};
var ALIAS={};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mk(t,a,p){var e=document.createElementNS(NS,t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
function markHTML(m,label){var M=MARK[m];return '<span class="bsa-mk"><i class="bsa-pm bsa-pm-'+m+'" aria-hidden="true"></i>'+esc(label||M[0])+'</span>'}

var CSS='.bsa{--bsak:var(--k,1);color:'+INK+'}'+
'.bsa .bsa-ctl{display:flex;flex-wrap:wrap;gap:4px;margin:0 0 6px}'+
'.bsa .bsa-b{all:unset;cursor:pointer;box-sizing:border-box;font:600 calc(11.5px*var(--bsak))/1.1 var(--mono,ui-monospace,monospace);letter-spacing:.03em;text-transform:uppercase;padding:6px 7px;min-height:32px;display:inline-flex;align-items:center;gap:4px;background:'+CHIP+';color:'+INK+';box-shadow:inset 0 0 0 1.5px color-mix(in srgb,'+INK+' 28%,transparent);touch-action:manipulation}'+
'.bsa .bsa-b b{font-weight:700;color:'+SOFT+'}.bsa .bsa-b.on{background:#FFF0A8;box-shadow:inset 0 0 0 1.5px '+INK+'}.bsa .bsa-b.on b{color:'+INK+'}'+
'.bsa .bsa-b.st{box-shadow:inset 0 0 0 1.5px color-mix(in srgb,'+INK+' 28%,transparent);background:color-mix(in srgb,#E3E0BF 28%,'+CHIP+')}.bsa .bsa-b.st.on{background:#FFF0A8;box-shadow:inset 0 0 0 1.5px '+INK+'}'+
'.bsa .bsa-b .bsa-pm{margin-right:1px}'+
'.bsa .bsa-b.pl{color:'+BLUE+';box-shadow:inset 0 0 0 1.5px '+BLUE+'}.bsa .bsa-b:focus-visible{outline:2px solid '+BLUE+';outline-offset:2px}'+
'.bsa .bsa-dg{border:1.5px solid '+INK+';background:'+CHIP+'}'+
'.bsa svg{display:block;width:100%;height:auto;font-family:var(--body,"Hanken Grotesk",system-ui,sans-serif);touch-action:manipulation;overflow:hidden}'+
'.bsa svg .pt{transition:opacity .45s ease}.bsa svg .pt.off{opacity:0;pointer-events:none}'+
'.bsa svg .pt[data-info]{cursor:pointer}.bsa svg .pt.sel{filter:drop-shadow(0 0 2.5px '+BLUE+')}'+
'.bsa svg .lk{cursor:pointer;transition:opacity .35s}.bsa svg .lk rect{fill:'+CHIP+';stroke:'+INK+';stroke-width:1.2}'+
'.bsa svg .lk text{font-size:12.5px;font-weight:600;fill:'+INK+'}.bsa svg .lk line{stroke:'+SOFT+';stroke-width:1}.bsa svg .lk circle{fill:'+INK+'}'+
'.bsa svg .lk.sel rect{stroke:'+BLUE+';stroke-width:1.8}.bsa svg .lk.sel text{fill:'+BLUE+'}'+
'.bsa svg text{fill:'+INK+'}.bsa svg .tm{font:600 10.5px/1 var(--mono,ui-monospace,monospace);letter-spacing:.06em}.bsa svg .tb{font-weight:700}'+
'.bsa .bsa-prog{display:flex;align-items:center;gap:8px;padding:6px 8px 7px;border-top:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent);font:600 calc(11.5px*var(--bsak))/1.2 var(--mono,ui-monospace,monospace);letter-spacing:.05em;text-transform:uppercase}'+
'.bsa .bsa-step{flex:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70%}.bsa .bsa-bar{flex:1;min-width:36px;height:5px;background:color-mix(in srgb,'+INK+' 12%,transparent)}.bsa .bsa-bar i{display:block;height:100%;width:0;background:'+BLUE+'}'+
'.bsa .bsa-cap{padding:9px 10px 10px;border-top:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent)}'+
'.bsa .bsa-ct{display:flex;flex-wrap:wrap;align-items:center;gap:5px 7px;margin:0 0 4px;font:700 calc(15px*var(--bsak))/1.2 var(--body,"Hanken Grotesk",system-ui,sans-serif)}'+
'.bsa .bsa-mk{display:inline-flex;align-items:center;gap:5px;font:600 calc(11px*var(--bsak))/1 var(--mono,ui-monospace,monospace);letter-spacing:.05em;text-transform:uppercase;padding:3px 5px;border:1.5px solid '+INK+';background:'+CHIP+';white-space:nowrap}'+
'.bsa .bsa-pm{display:inline-block;flex:none}'+
'.bsa .bsa-pm-h{width:9px;height:9px;border-radius:50%;background:#4E9A3E}.bsa .bsa-pm-t{width:7px;height:7px;background:#3557C8;transform:rotate(45deg)}'+
'.bsa .bsa-pm-a{width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-bottom:9px solid #C9A100}'+
'.bsa .bsa-pm-c{width:8px;height:8px;background:#B493E8}.bsa .bsa-pm-o{width:9px;height:9px;border-radius:50%;box-sizing:border-box;border:2px solid '+SOFT+'}'+
'.bsa .bsa-tx{margin:0;font-size:calc(14px*var(--bsak));line-height:1.45}'+
'.bsa .bsa-md{margin:5px 0 0;font:500 calc(11.5px*var(--bsak))/1.4 var(--mono,ui-monospace,monospace);letter-spacing:.02em;color:'+SOFT+'}'+
'.bsa .bsa-md a{color:'+BLUE+';text-decoration:underline;text-underline-offset:2px}'+
'.bsa .bsa-info{margin:6px 0 0;font-size:calc(13px*var(--bsak));line-height:1.4;color:'+INK+';padding:5px 8px;background:color-mix(in srgb,#E3E0BF 30%,'+CHIP+');border-left:4px solid #E3E0BF}.bsa .bsa-info:empty{display:none}'+
'.bsa .bsa-info b{font-weight:700}'+
'.bsa .bsa-hint{font:500 calc(10.5px*var(--bsak))/1 var(--mono,ui-monospace,monospace);letter-spacing:.04em;color:'+SOFT+';text-transform:none;white-space:nowrap}'+
'@media (min-width:900px){.bsa .bsa-dg{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(250px,1fr);grid-template-rows:auto 1fr}.bsa .bsa-dg>svg{grid-column:1;grid-row:1;max-height:62vh}.bsa .bsa-prog{grid-column:1;grid-row:2;align-self:start}.bsa .bsa-cap{grid-column:2;grid-row:1/3;border-top:0;border-left:1.5px solid color-mix(in srgb,'+INK+' 18%,transparent);padding:12px 14px}.bsa .bsa-b{font-size:calc(12px*var(--bsak));padding:7px 9px;min-height:34px}}'+
'@media (prefers-reduced-motion:reduce){.bsa svg *{transition:none!important}}';
function css(){if(document.getElementById('bsa-css'))return;var s=document.createElement('style');s.id='bsa-css';s.textContent=CSS;document.head.appendChild(s)}

/* ---------- drawing helpers stories share (one look across every compound) ---------- */
var H={
 INK:INK,SOFT:SOFT,CHIP:CHIP,BLUE:BLUE,
 crimp:function(x0,x1,y,a,wl){var d='M'+x0+' '+y,x;for(x=x0;x<x1;x+=wl/2){var xe=Math.min(x+wl/2,x1);d+='Q'+((x+xe)/2).toFixed(1)+' '+(y+((Math.round((x-x0)/(wl/2))%2)?a:-a)).toFixed(1)+' '+xe.toFixed(1)+' '+y}return d},
 spindle:function(x,y,rot,s,fill,stroke,nuc){return '<g transform="translate('+x+' '+y+') rotate('+rot+') scale('+s+')"><path d="M-14 0C-7 -5.5 7 -5.5 14 0C7 5.5 -7 5.5 -14 0Z" fill="'+fill+'" stroke="'+(stroke||INK)+'" stroke-width="1.5"/><ellipse rx="3.6" ry="2.1" fill="'+(nuc||INK)+'"/></g>'},
 /* a short peptide drawn as beads (n beads, colour pair) */
 bead:function(x,y,f,s,n){f=f||'#A9BCFA';s=s||BLUE;n=n||5;var o='<g class="pep" transform="translate('+x+' '+y+')">',i,w=(n-1)*3.6/2;for(i=0;i<n;i++)o+='<circle cx="'+(i*3.6-w).toFixed(1)+'" cy="'+((i%2)?1.4:-1.4)+'" r="2.1" fill="'+f+'" stroke="'+s+'" stroke-width=".9"/>';return o+'</g>'},
 /* a round cell with nucleus */
 cell:function(x,y,r,fill,stroke,nuc){return '<g transform="translate('+x+' '+y+')"><circle r="'+r+'" fill="'+fill+'" stroke="'+(stroke||INK)+'" stroke-width="1.5"/><circle cx="'+(r*.18).toFixed(1)+'" cy="'+(-r*.1).toFixed(1)+'" r="'+(r*.38).toFixed(1)+'" fill="'+(nuc||'#C9C3F0')+'" stroke="'+(stroke||INK)+'" stroke-width="1"/></g>'},
 /* lab dish seen from above */
 dish:function(cx,cy,r,label){return '<g><ellipse cx="'+cx+'" cy="'+(cy+3)+'" rx="'+r+'" ry="'+(r*.96)+'" fill="#E3E0BF" opacity=".5"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#FDFBEA" stroke="'+INK+'" stroke-width="1.5"/><circle cx="'+cx+'" cy="'+cy+'" r="'+(r-4)+'" fill="none" stroke="'+SOFT+'" stroke-width=".8" opacity=".6"/>'+(label?'<text class="tm" x="'+cx+'" y="'+(cy+r+14)+'" text-anchor="middle">'+esc(label)+'</text>':'')+'</g>'},
 /* friendly lab rodent, side view, facing right; s = scale (1 ~ 60 units long). Soft, cartoon, nothing gory. */
 rodent:function(x,y,s,fill){fill=fill||'#F2EEE2';return '<g transform="translate('+x+' '+y+') scale('+s+')"><path d="M-30 4C-44 4 -52 -2 -58 -8" fill="none" stroke="#D9A5A0" stroke-width="2.2" stroke-linecap="round"/><path d="M-30 6C-34 -12 -16 -22 2 -20C14 -19 22 -12 28 -4L34 0C35 3 32 6 28 6Z" fill="'+fill+'" stroke="'+INK+'" stroke-width="1.6" stroke-linejoin="round"/><ellipse cx="12" cy="-20" rx="5" ry="6" fill="#F6D2CC" stroke="'+INK+'" stroke-width="1.4"/><circle cx="22" cy="-8" r="1.7" fill="'+INK+'"/><circle cx="34" cy="1.5" r="1.6" fill="#D9A5A0"/><path d="M-18 6v4M-4 6v4M14 6v4" stroke="'+INK+'" stroke-width="1.6" stroke-linecap="round"/></g>'},
 /* a bar pair with labels; v0,v1 in 0..1 of max height h; returns bars with class g for grow */
 bars:function(x,y,h,w,vals,cols,labs){var o='<g>',i;o+='<path d="M'+(x-6)+' '+y+'H'+(x+vals.length*(w+14)+2)+'" stroke="'+INK+'" stroke-width="1.2"/>';for(i=0;i<vals.length;i++){var bx=x+i*(w+14),bh=Math.max(2,vals[i]*h);o+='<rect class="g" x="'+bx+'" y="'+(y-bh)+'" width="'+w+'" height="'+bh+'" fill="'+cols[i]+'" stroke="'+INK+'" stroke-width="1.2"/>';if(labs&&labs[i])o+='<text class="tm" x="'+(bx+w/2)+'" y="'+(y+13)+'" text-anchor="middle">'+esc(labs[i])+'</text>'}return o+'</g>'},
 /* a simple Y receptor in a membrane at x,y pointing up (dir=-1) or down (1) */
 receptor:function(x,y,col,dir){dir=dir||-1;return '<path d="M'+x+' '+y+'v'+(9*dir)+'m0 0l-3.2 '+(4.5*dir)+'m3.2 '+(-4.5*dir)+'l3.2 '+(4.5*dir)+'" stroke="'+(col||'#A88400')+'" stroke-width="2" fill="none" stroke-linecap="round"/>'},
 /* membrane band of lipid heads between x0..x1 at y */
 membrane:function(x0,x1,y,col){var o='<g><rect x="'+x0+'" y="'+(y-5)+'" width="'+(x1-x0)+'" height="10" fill="#FCEFD9"/>',x;for(x=x0+3;x<x1;x+=7)o+='<circle cx="'+x+'" cy="'+(y-4)+'" r="2.2" fill="'+(col||'#F1D3A8')+'" stroke="#C9A06A" stroke-width=".6"/><circle cx="'+x+'" cy="'+(y+4)+'" r="2.2" fill="'+(col||'#F1D3A8')+'" stroke="#C9A06A" stroke-width=".6"/>';return o+'</g>'},
 /* little speech-free signal puffs (cytokines etc.) */
 puffs:function(pts,f,s,r){var o='<g>';pts.forEach(function(p){o+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(p[2]||r||2.6)+'" fill="'+f+'" stroke="'+s+'" stroke-width=".8"/>'});return o+'</g>'},
 esc:esc
};

/* ---------- story registry; each story is its own file, loaded once ---------- */
var STORIES={},WAIT={};
function define(slug,fn){STORIES[slug]=fn(H,INK);(WAIT[slug]||[]).forEach(function(cb){cb(STORIES[slug])});delete WAIT[slug]}
function load(slug,cb){slug=ALIAS[slug]||slug;if(STORIES[slug])return cb(STORIES[slug]);if(!HAS[slug]){cb(null);return}
 if(WAIT[slug]){WAIT[slug].push(cb);return}WAIT[slug]=[cb];var s=document.createElement('script');s.src=BASE+slug+'.js?v=2';
 s.onerror=function(){(WAIT[slug]||[]).forEach(function(f){f(null)});delete WAIT[slug]};document.head.appendChild(s)}

/* ---------- engine ---------- */
function mount(el,slug,opt){
 opt=opt||{};css();
 if(typeof slug==='string'&&!STORIES[ALIAS[slug]||slug]){var h={dead:0,go:function(){},play:function(){},pause:function(){},replay:function(){},destroy:function(){h.dead=1}};
  load(slug,function(S){if(h.dead)return;if(!S){if(opt.onFail)opt.onFail();return}var r=mount(el,S,opt);for(var k in r)h[k]=r[k]});return h}
 var S=typeof slug==='object'?slug:STORIES[ALIAS[slug]||slug];if(!S){el.textContent='';return null}
 var id='bsa'+(++UID),RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
 var ALL=S.steps,N=ALL.length,MS=ALL.map(function(s){return s.ms||S.stepMs||5200}),T0=[],acc=0;MS.forEach(function(m){T0.push(acc);acc+=m});var TOT=acc;
 el.classList.add('bsa');
 var btns='<div class="bsa-ctl" role="group" aria-label="Steps">';
 ALL.forEach(function(s,i){var mk0=s.study&&s.marks&&s.marks[0]?'<i class="bsa-pm bsa-pm-'+s.marks[0][0]+'" aria-hidden="true"></i>':'<b>'+(i+1)+'</b>';
  btns+='<button type="button" class="bsa-b'+(s.study?' st':'')+'" data-k="'+s.key+'">'+mk0+esc(s.btn)+'</button>'});
 btns+='<button type="button" class="bsa-b pl" data-k="play" aria-pressed="false">Play</button></div>';
 el.innerHTML=btns+'<div class="bsa-dg"><svg viewBox="0 0 '+S.vb[0]+' '+S.vb[1]+'" role="img" aria-labelledby="'+id+'t"><title id="'+id+'t">'+esc(S.aria)+'</title></svg>'+
  '<div class="bsa-prog"><span class="bsa-step" aria-live="polite"></span><span class="bsa-bar" aria-hidden="true"><i></i></span><span class="bsa-hint">tap a part</span></div>'+
  '<div class="bsa-cap"><div class="bsa-ct"></div><p class="bsa-tx"></p><p class="bsa-md"></p><p class="bsa-info" aria-live="polite"></p></div></div>';
 var svg=el.querySelector('svg'),defs=mk('defs',{},svg),scene=mk('g',{'class':'scene'},svg),labG=mk('g',{'class':'labs'},svg);
 if(S.defs)defs.innerHTML=S.defs;
 var stepEl=el.querySelector('.bsa-step'),bar=el.querySelector('.bsa-bar i'),ct=el.querySelector('.bsa-ct'),tx=el.querySelector('.bsa-tx'),md=el.querySelector('.bsa-md'),info=el.querySelector('.bsa-info'),hint=el.querySelector('.bsa-hint');
 var G={};S.parts.forEach(function(p){var g=mk('g',{'class':'pt off','data-p':p.id},scene);g.innerHTML=p.svg;if(p.info)g.setAttribute('data-info','1');G[p.id]=g});
 var cur=-1,anims=[],counts=[],raf=0,craf=0,pl={on:false,paused:false,t:0,last:0};
 function stopAnims(){anims.forEach(function(a){try{a.cancel()}catch(e){}});anims=[];counts=[];if(raf)cancelAnimationFrame(raf);raf=0;if(craf)cancelAnimationFrame(craf);craf=0;
  S.parts.forEach(function(p){if(p.flow)G[p.id].querySelector('.flowg').innerHTML=''});
  scene.querySelectorAll('[data-to]').forEach(function(t){t.textContent=t.getAttribute('data-end')||t.getAttribute('data-to')})}
 function A(node,kf,o){if(RM||!node.animate)return null;var a=node.animate(kf,o);anims.push(a);if(pl.paused)a.pause();return a}
 function targets(g,a){return a.sel?[].slice.call(g.querySelectorAll(a.sel)):a.each?[].slice.call(g.children):[g]}
 function runAnims(s){(s.anim||[]).forEach(function(a){var g=G[a.p];if(!g)return;var d=a.delay||0,du=a.dur||1000,T=targets(g,a);
  if(a.type==='draw'){g.querySelectorAll(a.sel||'path').forEach(function(p){var L=p.getTotalLength();A(p,[{strokeDasharray:L+' '+L,strokeDashoffset:L},{strokeDasharray:L+' '+L,strokeDashoffset:0}],{duration:du,delay:d,easing:'ease-in-out',fill:'backwards'})})}
  else if(a.type==='move'){T.forEach(function(k,i){var f=a.each?a.each[i]:a.from;if(!f)return;var t=a.to||[0,0];A(k,[{translate:f[0]+'px '+f[1]+'px'},{translate:t[0]+'px '+t[1]+'px'}],{duration:du,delay:d+(a.stagger||0)*i,easing:a.ease||'ease-out',fill:a.to?'both':'backwards'})})}
  else if(a.type==='fadeIn')T.forEach(function(k,i){A(k,[{opacity:0},{opacity:1}],{duration:du,delay:d+(a.stagger||0)*i,fill:'backwards'})});
  else if(a.type==='fadeOut')T.forEach(function(k,i){var an=A(k,[{opacity:1},{opacity:0}],{duration:du,delay:d+(a.stagger||0)*i,fill:'forwards'});if(!an)k.style.opacity='0'});
  else if(a.type==='grow')T.forEach(function(k,i){k.style.transformBox='fill-box';k.style.transformOrigin=a.axis==='x'?'left center':'center bottom';A(k,[{transform:a.axis==='x'?'scaleX(0)':'scaleY(0)'},{transform:'none'}],{duration:du,delay:d+(a.stagger||0)*i,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'})});
  else if(a.type==='scale')T.forEach(function(k,i){k.style.transformBox='fill-box';k.style.transformOrigin='center';A(k,[{transform:'scale('+(a.from==null?0:a.from)+')'},{transform:'scale('+(a.to==null?1:a.to)+')'}],{duration:du,delay:d+(a.stagger||0)*i,easing:a.ease||'cubic-bezier(.2,.7,.2,1)',fill:'both'})});
  else if(a.type==='shrink')T.forEach(function(k,i){k.style.transformBox='fill-box';k.style.transformOrigin='center';var an=A(k,[{transform:'scale(1)'},{transform:'scale('+(a.to==null?0:a.to)+')'}],{duration:du,delay:d+(a.stagger||0)*i,easing:'ease-in-out',fill:'both'});if(!an)k.style.transform='scale('+(a.to||0)+')'});
  else if(a.type==='pulse')T.forEach(function(k,i){k.style.transformBox='fill-box';k.style.transformOrigin='center';A(k,[{transform:'scale(1)',opacity:1},{transform:'scale('+(a.to||1.12)+')',opacity:a.op==null?.75:a.op},{transform:'scale(1)',opacity:1}],{duration:du,delay:d+(a.stagger||0)*i,iterations:Infinity,easing:'ease-in-out'})});
  else if(a.type==='count')g.querySelectorAll('[data-to]').forEach(function(t){var an=A(t,[{opacity:1},{opacity:1}],{duration:du,delay:d});if(!an)return;var from=+t.getAttribute('data-from')||0,to=+t.getAttribute('data-to'),dec=+(t.getAttribute('data-dec')||0),suf=t.getAttribute('data-suf')||'',pre=t.getAttribute('data-pre')||'';
   counts.push(function(){var ct=an.currentTime,p=Math.max(0,Math.min(1,(ct-d)/du));p=1-Math.pow(1-p,3);t.textContent=pre+(from+(to-from)*p).toFixed(dec)+suf});if(!craf)craf=requestAnimationFrame(function cl(){counts.forEach(function(f){f()});craf=requestAnimationFrame(cl)})});
  else if(a.type==='flow')flowStart(a.p)})}
 function flowStart(pid){var p=S.parts.filter(function(x){return x.id===pid})[0],F=p.flow,host=G[pid].querySelector('.flowg');
  var path=mk('path',{d:F.path,fill:'none',stroke:'none'},host),L=path.getTotalLength(),beads=[];
  for(var i=0;i<F.n;i++){var w=mk('g',{},host);w.innerHTML=F.bead||H.bead(0,0);beads.push(w)}
  function place(t){beads.forEach(function(b,i){var u=((t/F.ms)+i/F.n)%1,q=path.getPointAtLength(u*L);b.setAttribute('transform','translate('+q.x.toFixed(1)+' '+q.y.toFixed(1)+')');b.setAttribute('opacity',u<.06?u/.06:u>.94?(1-u)/.06:1)})}
  if(RM){place(0);return}
  var tp=0,last=0;function loop(now){if(!pl.paused&&last)tp+=now-last;last=now;place(tp);raf=requestAnimationFrame(loop)}raf=requestAnimationFrame(loop)}
 function labels(s){labG.innerHTML='';(s.labels||[]).forEach(function(L){var g=mk('g',{'class':'lk','data-p':L.p,role:'button',tabindex:'0','aria-label':L.t},labG);
  var ln=mk('line',{},g),dot=L.ax!=null?mk('circle',{cx:L.ax,cy:L.ay,r:2},g):null,r=mk('rect',{x:L.x,y:L.y,height:19,rx:0},g),t=mk('text',{x:L.x+6,y:L.y+13.6},g);t.textContent=L.t;
  var w=Math.ceil(t.getComputedTextLength())+12;r.setAttribute('width',w);
  if(L.ax==null){ln.remove();return}
  var bx=Math.max(L.x,Math.min(L.ax,L.x+w)),by=L.ay<L.y?L.y:L.y+19;if(L.ay>=L.y&&L.ay<=L.y+19){by=L.y+9.5;bx=L.ax<L.x?L.x:L.x+w}
  ln.setAttribute('x1',bx);ln.setAttribute('y1',by);ln.setAttribute('x2',L.ax);ln.setAttribute('y2',L.ay)})}
 function caption(s,i){ct.innerHTML='<span>'+(i+1)+' · '+esc(s.title)+'</span>'+(s.marks||[]).map(function(m){return markHTML(m[0],m[1])}).join('');
  tx.textContent=s.text;
  var src=(s.src||[]).map(function(r){return r.u?'<a href="'+esc(r.u)+'" target="_blank" rel="noopener">'+esc(r.t)+'</a>':esc(r.t)}).join(' · ');
  md.innerHTML=(s.model?esc(s.model):'')+(src?(s.model?' · ':'')+src:'');md.hidden=!(s.model||src);
  stepEl.textContent=(i+1)+'/'+N}
 function go(k,fromPlay){var i=typeof k==='number'?k:ALL.map(function(s){return s.key}).indexOf(k);if(i<0)return;
  if(!fromPlay)stop();cur=i;var s=ALL[i];stopAnims();
  S.parts.forEach(function(p){var on=s.show.indexOf(p.id)>=0;G[p.id].classList.toggle('off',!on);G[p.id].style.opacity=''});
  labels(s);runAnims(s);caption(s,i);sel(null);
  el.querySelectorAll('.bsa-b').forEach(function(b){b.classList.toggle('on',b.dataset.k===s.key)});
  if(!pl.on)bar.style.width=(N>1?i/(N-1)*100:100).toFixed(1)+'%';
  if(opt.onStep)opt.onStep(s.key,i)}
 function sel(pid){svg.querySelectorAll('.sel').forEach(function(e){e.classList.remove('sel')});
  if(!pid){info.innerHTML='';return}var p=S.parts.filter(function(x){return x.id===pid})[0];if(!p||!p.info)return;
  G[pid].classList.add('sel');labG.querySelectorAll('.lk[data-p="'+pid+'"]').forEach(function(e){e.classList.add('sel')});
  info.innerHTML='<b>'+esc(p.name)+':</b> '+esc(p.info);hint.style.visibility='hidden'}
 svg.addEventListener('click',function(e){var t=e.target.closest('.lk,.pt[data-info]');if(!t||t.classList.contains('off'))return;sel(t.getAttribute('data-p'))});
 svg.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('lk')){e.preventDefault();sel(e.target.getAttribute('data-p'))}});
 var pb=el.querySelector('[data-k=play]');
 function pbText(){var live=pl.on&&!pl.paused;pb.textContent=live?'Pause':(pl.done?'Replay':'Play');pb.setAttribute('aria-pressed',live?'true':'false');pb.classList.toggle('on',live)}
 function idx(t){for(var i=N-1;i>=0;i--)if(t>=T0[i])return i;return 0}
 function tick(now){if(!pl.on)return;if(!pl.paused){pl.t+=now-pl.last}pl.last=now;
  var i=idx(Math.min(pl.t,TOT-1));if(i!==cur)go(i,true);
  bar.style.width=(Math.min(1,pl.t/TOT)*100).toFixed(1)+'%';
  if(pl.t>=TOT){pl.on=false;pl.done=true;pbText();return}pl.raf=requestAnimationFrame(tick)}
 function play(){if(pl.on&&pl.paused){pl.paused=false;pl.last=performance.now();anims.forEach(function(a){a.play()});pbText();return}
  if(pl.on)return;var start=(cur>0&&cur<N-1&&!pl.done)?T0[cur]:0;stop();pl.done=false;pl.on=true;pl.paused=false;pl.t=start;pl.last=performance.now();cur=-1;pbText();pl.raf=requestAnimationFrame(tick)}
 function pause(){if(!pl.on)return;pl.paused=true;anims.forEach(function(a){a.pause()});pbText()}
 function stop(){if(pl.raf)cancelAnimationFrame(pl.raf);pl.raf=0;pl.on=false;pl.paused=false;pbText()}
 function replay(){stop();pl.done=false;cur=0;play()}
 el.querySelector('.bsa-ctl').addEventListener('click',function(e){var b=e.target.closest('.bsa-b');if(!b)return;var k=b.dataset.k;
  if(k==='play'){pl.on&&!pl.paused?pause():(pl.done?replay():play())}else{pl.done=false;go(k)}});
 go(0);
 if(opt.autoplay&&!RM){var io=window.IntersectionObserver?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!pl.on&&!pl.done&&cur===0){play();io.disconnect()}})},{threshold:.5}):null;if(io)io.observe(el)}
 if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(cur>=0)labels(ALL[cur])});
 return {go:go,play:play,pause:pause,replay:replay,sel:sel,story:S,destroy:function(){stop();stopAnims();el.innerHTML='';el.classList.remove('bsa')}};
}
return {mount:mount,define:define,load:load,HAS:HAS,ALIAS:ALIAS,STORIES:STORIES,H:H};
})();
