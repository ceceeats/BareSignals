/* Guide v91b sheet (20 Nov 2026, built on the v89 sheet in /home/v90/, kept): Quick look is a side drawer again, sliding in from the right
   (as on Guide v85 and earlier), with the real Library card inside (v86+). Full read still rises as a sheet from the bottom.
   No more "swipe left for the Full read / down to close" hint or swipe between the two: a Full read button does it, × or a tap
   outside closes, swipe right on the drawer's top bar closes it on the phone. Back (v88) and ?ql= reopen (v89) kept.
   ?embed=body (the body inside every Library Full read): the body fills the frame the Library gives it, so it no longer
   shrinks itself on every resize (the old frame reported 67% of its own height back to the Library, which then shrank
   the frame, over and over: the body ended ~190px tall with its labels cut off). The mouse wheel scrolls the page there
   instead of zooming the body.
   Earlier: Guide v89 sheet (20 Nov 2026): ?ql=slug so Back from a page opened inside the Quick look reopens it. Guide v88 sheet:
   opening the sheet adds a history step, so the phone Back button closes it. Guide v86/v87 sheet: Quick look and Full read open
   the real Library card and full page over the Guide; reads /library/. */
(function(){
var D=document,W=window,Q=new URLSearchParams(location.search),LIB='/library/';
if(Q.get('embed')==='body'){
  var st=D.createElement('style');st.textContent='html,body{background:transparent!important;overflow:hidden!important;height:100%!important}body>*:not(main):not(script){display:none!important}main#app>*:not(#stage){display:none!important}.bsbm,.bsdr,.bsbk,.stbar,#stage .zb,#bsarrow{display:none!important}body{padding:0!important;margin:0!important}main#app{padding:0!important;margin:0!important;display:block!important;height:100vh!important;min-height:0!important;max-height:none!important}#stage{margin:0!important;height:100vh!important;min-height:0!important;max-height:none!important;box-sizing:border-box!important}';
  D.head.appendChild(st);D.documentElement.classList.add('gemb');
  D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a&&!a.target)a.target='_top'},true);
  /* the wheel scrolls the Library page, it does not zoom the body (the body keeps pinch and drag on touch) */
  W.addEventListener('wheel',function(e){e.stopPropagation()},{capture:true,passive:true});
  return}
var css='.gs86-bg{position:fixed;left:0;right:0;bottom:0;top:var(--bsnav-h,0px);background:rgba(62,74,128,.22);z-index:70;opacity:0;transition:opacity .25s}.gs86-bg.on{opacity:1}.gs86-bg.full{top:0}'+
/* Quick look: a drawer from the right, under the site bar, the Guide still showing on its left */
'.gs86{position:fixed;right:0;top:var(--bsnav-h,0px);bottom:0;width:min(380px,90vw);background:#FFFFE2;border-left:1.5px solid #3E4A80;z-index:71;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);box-shadow:-8px 0 24px rgba(62,74,128,.18);padding-bottom:env(safe-area-inset-bottom,0px)}'+
'.gs86.on{transform:none}'+
'@media (min-width:900px){.gs86{width:440px}}'+
/* Full read: a sheet that rises from the bottom over the whole screen (laptop: a wide panel on the right, as before) */
'.gs86.full{top:0;left:0;width:auto;border-left:0;box-shadow:none}'+
'@media (min-width:900px){.gs86.full{left:auto;width:min(1240px,94vw);border-left:1.5px solid #3E4A80;box-shadow:-8px 0 24px rgba(62,74,128,.18)}}'+
'@keyframes gs91up{from{transform:translateY(100%)}to{transform:none}}@keyframes gs91in{from{transform:translateX(100%)}to{transform:none}}'+
'.gs86.up{animation:gs91up .32s cubic-bezier(.2,.8,.2,1)}.gs86.in{animation:gs91in .28s cubic-bezier(.2,.8,.2,1)}'+
'@media (min-width:900px){.gs86.up{animation-name:gs91in}}'+
'@media (prefers-reduced-motion:reduce){.gs86,.gs86-bg{transition:none}.gs86.up,.gs86.in{animation:none}}'+
'.gs86 .hd{display:flex;align-items:center;gap:7px;padding:7px 8px 7px 10px;border-bottom:1.5px solid #3E4A80;flex:none;touch-action:pan-y;background:#FFFFE2}'+
'.gs86 .hd i{width:13px;height:13px;border:1.2px solid #3E4A80;flex:none}'+
'.gs86 .hd h3{margin:0;font:700 18px/1.1 "Bricolage Grotesque",system-ui,sans-serif;color:#3E4A80;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.gs86 .sg{display:inline-flex;border:1.5px solid #3E4A80;background:#FFFFF4;flex:none}.gs86 .sg button{all:unset;cursor:pointer;font:600 9.5px/1 "JetBrains Mono",monospace;letter-spacing:.07em;text-transform:uppercase;padding:8px 8px 7px;color:#3E4A80;white-space:nowrap}.gs86 .sg button.on{background:#3E4A80;color:#fff}'+
'.gs86 .sg button[data-k=f]:not(.on){color:#DB6830}'+
'.gs86 .x{all:unset;cursor:pointer;border:1.5px solid #3E4A80;width:30px;height:30px;text-align:center;font:600 18px/30px "JetBrains Mono",monospace;color:#3E4A80;flex:none;background:#FFFFF4}'+
'.gs86 iframe{flex:1;width:100%;min-height:0;border:0;background:#FFFFE2}';
var cur=null;
function qlUrl(v){var u=new URL(location.href);if(v)u.searchParams.set('ql',v);else u.searchParams.delete('ql');return u.pathname+u.search+u.hash}
function entry(sl){try{return C.find(function(x){return x.s===sl})}catch(e){return null}}
function colOf(sl){var ch=D.querySelector('#list .cchip[data-s="'+sl+'"] .sq, #list .cchip[data-s="'+sl+'"] i');return ch?getComputedStyle(ch).backgroundColor:'#FFFFE2'}
/* the drawer or the sheet look; animate only when the kind changes */
function look(full){if(!cur)return;var was=cur.s.classList.contains('full');cur.full=full;
  cur.s.classList.toggle('full',full);cur.b.classList.toggle('full',full);
  cur.s.querySelectorAll('.sg button').forEach(function(b){b.classList.toggle('on',(b.dataset.k==='f')===full)});
  if(was!==full&&cur.s.classList.contains('on')){cur.s.classList.remove('up','in');void cur.s.offsetWidth;cur.s.classList.add(full?'up':'in')}}
function setKind(full){if(!cur)return;look(full);
  var want='#/'+(full?'p/':'')+cur.slug;try{var w=cur.f.contentWindow;if(w.location.pathname.indexOf(LIB)!==0){if(cur.f.getAttribute('src').indexOf(want)<0)cur.f.src=LIB+'?embed=1'+want;return}if(w.location.hash!==want)w.location.replace(w.location.pathname+w.location.search+want)}catch(e){cur.f.src=LIB+'?embed=1'+want}}
function close(){if(!cur)return;var n=history.length-cur.L+1;if(cur.L&&history.state&&n>0){history.go(-n);return}shut()}
function shut(){if(!cur)return;var c=cur;cur=null;c.s.classList.remove('up','in');
  if(c.full)c.s.style.transform='translateY(100%)';
  c.s.classList.remove('on');c.b.classList.remove('on');D.documentElement.style.overflow='';setTimeout(function(){c.s.remove();c.b.remove()},340)}
function open(sl,full){if(!sl)return;if(cur){cur.slug=sl;cur.s.querySelector('h3').textContent=(entry(sl)||{}).n||sl;setKind(!!full);return}
  if(!D.getElementById('gs86-css')){var st=D.createElement('style');st.id='gs86-css';st.textContent=css;D.head.appendChild(st)}
  var e=entry(sl),nm=e?e.n:sl;
  var b=D.createElement('div');b.className='gs86-bg';var s=D.createElement('div');s.className='gs86';s.setAttribute('role','dialog');s.setAttribute('aria-label','Quick look');
  s.innerHTML='<div class="hd"><i style="background:'+colOf(sl)+'"></i><h3></h3><span class="sg"><button type="button" data-k="q" class="on">Quick look</button><button type="button" data-k="f">Full read</button></span><button type="button" class="x" aria-label="Close">×</button></div><iframe title="Bare Signals Library" src="'+LIB+'?embed=1#/'+(full?'p/':'')+encodeURIComponent(sl)+'"></iframe>';
  s.querySelector('h3').textContent=nm;D.body.appendChild(b);D.body.appendChild(s);D.documentElement.style.overflow='hidden';
  try{history.pushState({gs88:1},'',qlUrl((full?'f:':'')+sl))}catch(e){}
  cur={s:s,b:b,f:s.querySelector('iframe'),slug:sl,full:!!full,L:history.length};
  look(!!full);if(full)s.classList.add('up');
  requestAnimationFrame(function(){b.classList.add('on');s.classList.add('on')});
  b.addEventListener('click',close);s.querySelector('.x').addEventListener('click',close);s.querySelectorAll('.sg button').forEach(function(b){b.addEventListener('click',function(){setKind(b.dataset.k==='f')})});
  /* phone: swipe the drawer's top bar to the right to close it */
  var hd=s.querySelector('.hd'),x0=null,y0=null;
  hd.addEventListener('touchstart',function(ev){x0=ev.touches[0].clientX;y0=ev.touches[0].clientY},{passive:true});
  hd.addEventListener('touchend',function(ev){if(x0===null)return;var dx=ev.changedTouches[0].clientX-x0,dy=ev.changedTouches[0].clientY-y0;x0=y0=null;
    if(cur&&!cur.full&&dx>60&&Math.abs(dx)>1.5*Math.abs(dy))close()},{passive:true});
  D.addEventListener('keydown',function k(ev){if(ev.key==='Escape'){close();D.removeEventListener('keydown',k)}})}
/* the iframe tells us where it went (a synergy tapped inside, Full read pressed inside) */
W.addEventListener('message',function(ev){var m=ev.data;if(!m||!m.bs104||!cur)return;if(m.close){close();return}
  if(m.slug&&(m.slug!==cur.slug||(m.kind==='full')!==cur.full)){try{if(history.state&&history.state.gs88)history.replaceState({gs88:1},'',qlUrl((m.kind==='full'?'f:':'')+m.slug))}catch(e){}}
  if(m.slug&&m.slug!==cur.slug){cur.slug=m.slug;cur.s.querySelector('h3').textContent=(entry(m.slug)||{}).n||m.slug}
  if((m.kind==='full')!==cur.full)look(m.kind==='full')});
function selSlug(){var c=D.querySelector('#list .cchip[aria-pressed="true"]');return c?c.dataset.s:Q.get('p')}
/* take over the old Quick look tab and every Library link on the Guide */
D.addEventListener('click',function(e){if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey)return;
  var t=e.target;if(t.closest&&t.closest('.gs86'))return;
  var bm=t.closest&&t.closest('.bsbm');if(bm){e.preventDefault();e.stopImmediatePropagation();open(selSlug(),false);return}
  var a=t.closest&&t.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
  var m=h.match(/^(?:https?:\/\/(?:www\.)?baresignals\.co)?\/library\/(?:v\d+[a-z]?\/)?#\/(p\/)?([a-z0-9-]+)$/i);
  if(m){e.preventDefault();e.stopImmediatePropagation();var d=D.querySelector('.bsdr');if(d){var bk=D.querySelector('.bsbk');d.remove();if(bk)bk.remove()}open(m[2],!!m[1]);return}
  if(/quick\s*look/i.test(a.textContent||'')){e.preventDefault();e.stopImmediatePropagation();open(selSlug(),false)}},true);
W.addEventListener('popstate',function(){if(cur)shut()});
/* v89: back from another page reopens the Quick look the reader left from */
(function(){var v=Q.get('ql');if(!v)return;try{history.replaceState(null,'',qlUrl(''))}catch(e){}var f=v.indexOf('f:')===0,sl=f?v.slice(2):v;var go=function(){open(sl,f)};if(D.readyState==='complete')setTimeout(go,300);else W.addEventListener('load',function(){setTimeout(go,300)})})();
W.BS_SHEET86=open;
})();
