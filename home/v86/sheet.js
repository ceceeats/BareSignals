/* Guide v86 sheet (19 Nov 2026): Quick look and Full read open the real Library card and full page in one sheet over the Guide.
   Quick look = the Library card. Full read = the Library full page, covering the screen. Swipe left (or tap Full read) to go full,
   swipe right (or tap ‹ Quick look) to go back, swipe down or × to close; you stay exactly where you were on the Guide.
   ?embed=body shows only the body figure (used at the top of every Library full read). */
(function(){
var D=document,W=window,Q=new URLSearchParams(location.search),LIB='/library/v104/';
if(Q.get('embed')==='body'){
  var st=D.createElement('style');st.textContent='html,body{background:transparent!important}body>*:not(main):not(script){display:none!important}main#app>*:not(#stage){display:none!important}.bsbm,.bsdr,.bsbk,.stbar,#stage .zb,#bsarrow{display:none!important}body{padding:0!important;margin:0!important}main#app{padding:0!important;margin:0!important}#stage{margin:0!important}';
  D.head.appendChild(st);D.documentElement.classList.add('gemb');
  D.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a&&!a.target)a.target='_top'},true);
  var post=function(){var g=D.getElementById('stage');if(g)parent.postMessage({bsbodyh:Math.ceil(g.getBoundingClientRect().height)+4},'*')};W.addEventListener('load',function(){setTimeout(post,400);setTimeout(post,1500)});W.addEventListener('resize',post);
  return}
var css='.gs86-bg{position:fixed;inset:0;background:rgba(62,74,128,.25);z-index:70;opacity:0;transition:opacity .25s}.gs86-bg.on{opacity:1}'+
'.gs86{position:fixed;left:0;right:0;bottom:0;height:88vh;height:88dvh;background:#FFFFE2;border-top:1.5px solid #3E4A80;z-index:71;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .32s cubic-bezier(.2,.8,.2,1),height .32s cubic-bezier(.2,.8,.2,1),width .32s;box-shadow:0 -6px 0 rgba(62,74,128,.08)}'+
'.gs86.on{transform:none}.gs86.full{height:100vh;height:100dvh;border-top:0}'+
'@media (min-width:900px){.gs86{left:auto;top:0;height:auto!important;width:520px;border-top:0;border-left:1.5px solid #3E4A80;transform:translateX(100%)}.gs86.full{width:min(1240px,94vw)}}'+
'.gs86 .gr{width:44px;height:4px;background:#E3E0BF;margin:7px auto 0;flex:none}@media (min-width:900px){.gs86 .gr{display:none}}'+
'.gs86 .hd{display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1.5px solid #3E4A80;flex:none;touch-action:pan-y}'+
'.gs86 .hd i{width:14px;height:14px;border:1.2px solid #3E4A80;flex:none}'+
'.gs86 .hd h3{margin:0;font:700 19px/1.1 "Bricolage Grotesque",system-ui,sans-serif;color:#3E4A80;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}'+
'.gs86 .kd{font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase;padding:4px 6px 3px;border:1px solid #DB6830;color:#DB6830;flex:none}.gs86.full .kd{background:#3E4A80;border-color:#3E4A80;color:#fff}'+
'.gs86 .sw{all:unset;cursor:pointer;font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:#DB6830;border:1.5px solid #DB6830;padding:7px 8px;flex:none;background:#FFFFF4}'+
'.gs86 .x{all:unset;cursor:pointer;border:1.5px solid #3E4A80;width:30px;height:30px;text-align:center;font:600 18px/30px "JetBrains Mono",monospace;color:#3E4A80;flex:none;background:#FFFFF4}'+
'.gs86 iframe{flex:1;width:100%;border:0;background:#FFFFE2}'+
'.gs86 .hint{font:500 9px/1 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:#6B76A8;text-align:center;padding:4px 0 5px;flex:none;border-bottom:1px dashed #E3E0BF}@media (min-width:900px){.gs86 .hint{display:none}}';
var cur=null;
function entry(sl){try{return C.find(function(x){return x.s===sl})}catch(e){return null}}
function colOf(sl){var ch=D.querySelector('#list .cchip[data-s="'+sl+'"] .sq, #list .cchip[data-s="'+sl+'"] i');return ch?getComputedStyle(ch).backgroundColor:'#FFFFE2'}
function setKind(full,push){if(!cur)return;cur.full=full;cur.s.classList.toggle('full',full);cur.s.querySelector('.kd').textContent=full?'Full read':'Quick look';
  var b=cur.s.querySelector('.sw');b.textContent=full?'‹ Quick look':'Full read →';
  cur.s.querySelector('.hint').textContent=full?'Swipe right for the Quick look · down to close':'Swipe left for the Full read · down to close';
  var want='#/'+(full?'p/':'')+cur.slug;try{var w=cur.f.contentWindow;if(w.location.hash!==want)w.location.hash=want}catch(e){cur.f.src=LIB+'?embed=1'+want}}
function close(){if(!cur)return;var c=cur;cur=null;c.s.classList.remove('on');c.b.classList.remove('on');D.documentElement.style.overflow='';setTimeout(function(){c.s.remove();c.b.remove()},340)}
function open(sl,full){if(!sl)return;if(cur){cur.slug=sl;cur.s.querySelector('h3').textContent=(entry(sl)||{}).n||sl;setKind(!!full);return}
  if(!D.getElementById('gs86-css')){var st=D.createElement('style');st.id='gs86-css';st.textContent=css;D.head.appendChild(st)}
  var e=entry(sl),nm=e?e.n:sl;
  var b=D.createElement('div');b.className='gs86-bg';var s=D.createElement('div');s.className='gs86';s.setAttribute('role','dialog');
  s.innerHTML='<div class="gr"></div><div class="hd"><i style="background:'+colOf(sl)+'"></i><h3></h3><span class="kd">Quick look</span><button type="button" class="sw">Full read →</button><button type="button" class="x" aria-label="Close">×</button></div><p class="hint"></p><iframe title="Bare Signals Library" src="'+LIB+'?embed=1#/'+(full?'p/':'')+encodeURIComponent(sl)+'"></iframe>';
  s.querySelector('h3').textContent=nm;D.body.appendChild(b);D.body.appendChild(s);D.documentElement.style.overflow='hidden';
  cur={s:s,b:b,f:s.querySelector('iframe'),slug:sl,full:!!full};
  requestAnimationFrame(function(){b.classList.add('on');s.classList.add('on')});setKind(!!full);
  b.addEventListener('click',close);s.querySelector('.x').addEventListener('click',close);s.querySelector('.sw').addEventListener('click',function(){setKind(!cur.full)});
  var hd=s.querySelector('.hd'),x0=null,y0=null;
  [hd,s.querySelector('.gr'),s.querySelector('.hint')].forEach(function(el){el.addEventListener('touchstart',function(ev){x0=ev.touches[0].clientX;y0=ev.touches[0].clientY},{passive:true});
   el.addEventListener('touchend',function(ev){if(x0===null)return;var dx=ev.changedTouches[0].clientX-x0,dy=ev.changedTouches[0].clientY-y0;x0=y0=null;
     if(dy>80&&Math.abs(dy)>Math.abs(dx))close();else if(dx<-60&&!cur.full)setKind(true);else if(dx>60&&cur.full)setKind(false)},{passive:true})});
  D.addEventListener('keydown',function k(ev){if(ev.key==='Escape'){close();D.removeEventListener('keydown',k)}})}
/* the iframe tells us where it went (a synergy tapped inside, Full read pressed inside) */
W.addEventListener('message',function(ev){var m=ev.data;if(!m||!m.bs104||!cur)return;if(m.close){close();return}
  if(m.slug&&m.slug!==cur.slug){cur.slug=m.slug;cur.s.querySelector('h3').textContent=(entry(m.slug)||{}).n||m.slug}
  if((m.kind==='full')!==cur.full){cur.full=m.kind==='full';cur.s.classList.toggle('full',cur.full);cur.s.querySelector('.kd').textContent=cur.full?'Full read':'Quick look';cur.s.querySelector('.sw').textContent=cur.full?'‹ Quick look':'Full read →'}});
function selSlug(){var c=D.querySelector('#list .cchip[aria-pressed="true"]');return c?c.dataset.s:Q.get('p')}
/* take over the old Quick look tab and every Library link on the Guide */
D.addEventListener('click',function(e){if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey)return;
  var t=e.target;if(t.closest&&t.closest('.gs86'))return;
  var bm=t.closest&&t.closest('.bsbm');if(bm){e.preventDefault();e.stopImmediatePropagation();open(selSlug(),false);return}
  var a=t.closest&&t.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';
  var m=h.match(/^(?:https?:\/\/(?:www\.)?baresignals\.co)?\/library\/(?:v\d+\/)?#\/(p\/)?([a-z0-9-]+)$/i);
  if(m){e.preventDefault();e.stopImmediatePropagation();var d=D.querySelector('.bsdr');if(d){var bk=D.querySelector('.bsbk');d.remove();if(bk)bk.remove()}open(m[2],!!m[1]);return}
  if(/quick\s*look/i.test(a.textContent||'')){e.preventDefault();e.stopImmediatePropagation();open(selSlug(),false)}},true);
W.BS_SHEET86=open;
})();
