/* Bare Signals drawer v1 (5 Nov 2026): on Case and Goal pages, tapping a compound link (/library/#/p/slug or /library/#/slug) opens that compound's Library card in a drawer, so the reader stays in the article. Phone: sheet from the bottom, swipe down or tap outside to close. Laptop: panel on the right. Data from the live Library version (data.js, card.js, punch.js), loaded on first tap. "Open full page" still goes to the Library. */
(function(){
var D=document,W=window;if(W.BSDRAWER)return;W.BSDRAWER=1;
var css='.bsx-bg{position:fixed;inset:0;background:rgba(62,74,128,.28);z-index:60;opacity:0;transition:opacity .25s}.bsx-bg.on{opacity:1}'+
'.bsx{position:fixed;left:0;right:0;bottom:0;max-height:86vh;background:#FFFFE2;color:#3E4A80;border-top:1.5px solid #3E4A80;z-index:61;display:flex;flex-direction:column;transform:translateY(100%);transition:transform .3s cubic-bezier(.2,.8,.2,1);font:400 14px/1.5 "Hanken Grotesk",system-ui,sans-serif;padding-bottom:env(safe-area-inset-bottom,0px)}'+
'.bsx.on{transform:none}'+
'@media (min-width:900px){.bsx{left:auto;top:0;bottom:0;width:460px;max-height:none;border-top:0;border-left:1.5px solid #3E4A80;transform:translateX(100%)}}'+
'.bsx .gr{width:40px;height:4px;background:#E3E0BF;margin:7px auto 0;flex:none}@media (min-width:900px){.bsx .gr{display:none}}'+
'.bsx .hd{display:flex;align-items:flex-start;gap:10px;padding:8px 16px 8px;border-bottom:1.5px solid #3E4A80;flex:none}'+
'.bsx .hd h3{font:700 22px/1.1 "Bricolage Grotesque",system-ui,sans-serif;margin:0;flex:1;text-wrap:balance}'+
'.bsx .hd .u{display:block;font:400 12.5px/1.35 "Hanken Grotesk",sans-serif;color:#6B76A8;margin-top:3px}'+
'.bsx .x{border:1.5px solid #3E4A80;background:#FFFFF4;width:32px;height:32px;font:600 18px/1 "JetBrains Mono",monospace;cursor:pointer;flex:none;color:#3E4A80}'+
'.bsx .bd{overflow-y:auto;-webkit-overflow-scrolling:touch;padding:10px 16px 18px;overscroll-behavior:contain}'+
'.bsx .st{display:flex;height:9px;border:1.5px solid #3E4A80;margin:0 0 10px}.bsx .st i{display:block;height:100%}'+
'.bsx .pu{font:600 14px/1.4 "Hanken Grotesk",sans-serif;margin:0 0 8px}'+
'.bsx .sm{margin:0 0 10px}'+
'.bsx .ds{display:flex;flex-wrap:wrap;border:1.5px solid #3E4A80;margin:0 0 12px}'+
'.bsx .ds div{flex:1 1 auto;padding:5px 7px;border-right:1px dashed #E3E0BF;border-bottom:1px dashed #E3E0BF}'+
'.bsx .ds b{display:block;font:600 8.5px/1.2 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:#6B76A8}'+
'.bsx .ds span{font:600 12.5px/1.3 "Hanken Grotesk",sans-serif}'+
'.bsx h4{font:600 10.5px/1.2 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase;margin:12px 0 5px;border-bottom:1.5px solid #3E4A80;padding-bottom:4px}'+
'.bsx h4.w{color:#C4202B;border-color:#C4202B}'+
'.bsx ul{list-style:none;margin:0;padding:0}.bsx li{padding:4px 0;border-bottom:1px dashed #E3E0BF;font-size:13px}'+
'.bsx li .q{display:inline-block;width:10px;height:10px;border:1.5px solid #3E4A80;margin-right:6px;vertical-align:-1px}'+
'.bsx li b{font-weight:700}.bsx li small{display:block;color:#6B76A8;font-size:12px}'+
'.bsx .ft{display:flex;gap:10px;align-items:center;justify-content:space-between;padding:10px 16px;border-top:1.5px solid #3E4A80;flex:none}'+
'.bsx .ft a{font:600 10.5px/1 "JetBrains Mono",monospace;letter-spacing:.06em;text-transform:uppercase;color:#DB6830;border:1.5px solid #DB6830;padding:8px 10px;text-decoration:none}'+
'.bsx .ft span{font-size:11px;color:#6B76A8}'+
'.bsx .ld{padding:24px 0;color:#6B76A8;font:500 11px/1 "JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.06em}'+
'@media (prefers-reduced-motion:reduce){.bsx,.bsx-bg{transition:none}}';
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var LP=null;
function load(){if(LP)return LP;LP=fetch('/library/',{cache:'no-cache'}).then(function(r){return r.text()}).then(function(h){var m=h.match(/v(\d+)\//);var v=m?m[1]:'89';
 return Promise.all(['data.js','card.js','punch.js'].map(function(f){return new Promise(function(res){var s=D.createElement('script');s.src='/library/v'+v+'/'+f;s.onload=s.onerror=function(){res()};D.head.appendChild(s)})}))}).then(function(){return W.BS_DATA||[]});return LP}
function col(k){var p=W.BS_PALETTE||[];for(var i=0;i<p.length;i++)if(p[i][0]===k)return p[i];return [k,k,'#FFFFF4']}
function stripe(o){var r=o.roles||[];if(!r.length)return '';var w=[70];var rest=r.length>1?30/(r.length-1):0;return '<div class="st" aria-hidden="true">'+r.map(function(k,i){return '<i style="flex:'+(i?rest:70)+';background:'+col(k)[2]+'"></i>'}).join('')+'</div>'}
function render(o,body,ft){var c=(W.BS_CARD||{})[o.slug]||{},pu=(W.BS_PUNCH||{})[o.slug],d=o.dose||{},h='';
 h+=stripe(o);if(pu)h+='<p class="pu">'+esc(pu)+'</p>';
 if(c.sum)h+='<p class="sm">'+esc(c.sum)+'</p>';
 var cells=[['Dose',d.dose],['How often',d.freq],['Cycle',d.cycle],['Route',d.route],['Half-life',d.half]].filter(function(x){return x[1]});
 if(cells.length)h+='<div class="ds">'+cells.map(function(x){return '<div><b>'+x[0]+'</b><span>'+esc(x[1])+'</span></div>'}).join('')+'</div>';
 var ds=o.desc||{},rk=(o.roles||[]).concat(o.reported||[]).filter(function(k,i,a){return ds[k]&&a.indexOf(k)===i});
 if(rk.length)h+='<h4>What it does</h4><ul>'+rk.map(function(k){var p=col(k);return '<li><span class="q" style="background:'+p[2]+'"></span><b>'+esc(p[1])+'.</b> '+esc(ds[k])+'</li>'}).join('')+'</ul>';
 if(o.mech&&o.mech.length)h+='<h4>How it works</h4><ul>'+o.mech.slice(0,5).map(function(m){return '<li>'+esc(m[0])+'<small>'+esc(m[1])+'</small></li>'}).join('')+'</ul>';
 if(o.whoNot&&o.whoNot.length)h+='<h4 class="w">Who shouldn’t take it</h4><ul>'+o.whoNot.map(function(w){return '<li><b>'+esc(w.t)+'.</b> '+esc(w.why)+'</li>'}).join('')+'</ul>';
 if(o.status)h+='<h4>Status</h4><p style="font-size:13px;margin:0">'+esc(o.status)+'</p>';
 body.innerHTML=h;ft.innerHTML='<span>Library card</span><a href="/library/#/p/'+encodeURIComponent(o.slug)+'">Open full page →</a>'}
var cur=null,lastF=null;
function close(){if(!cur)return;var c=cur;cur=null;c.s.classList.remove('on');c.b.classList.remove('on');D.documentElement.style.overflow='';setTimeout(function(){c.s.remove();c.b.remove()},320);D.removeEventListener('keydown',onKey);if(lastF)try{lastF.focus()}catch(e){}}
function onKey(e){if(e.key==='Escape')close()}
function open(slug,name,a){if(!D.getElementById('bsx-css')){var st=D.createElement('style');st.id='bsx-css';st.textContent=css;D.head.appendChild(st)}
 close();lastF=a;var b=D.createElement('div');b.className='bsx-bg';var s=D.createElement('div');s.className='bsx';s.setAttribute('role','dialog');s.setAttribute('aria-modal','true');s.setAttribute('aria-label',name+' card');
 s.innerHTML='<div class="gr"></div><div class="hd"><h3>'+esc(name)+'<span class="u"></span></h3><button class="x" type="button" aria-label="Close">×</button></div><div class="bd"><div class="ld">Loading card</div></div><div class="ft"></div>';
 D.body.appendChild(b);D.body.appendChild(s);D.documentElement.style.overflow='hidden';
 requestAnimationFrame(function(){b.classList.add('on');s.classList.add('on')});cur={s:s,b:b};
 b.addEventListener('click',close);s.querySelector('.x').addEventListener('click',close);D.addEventListener('keydown',onKey);s.querySelector('.x').focus({preventScroll:true});
 var y0=null,bd=s.querySelector('.bd');s.addEventListener('touchstart',function(e){y0=(bd.scrollTop<=0)?e.touches[0].clientY:null},{passive:true});
 s.addEventListener('touchmove',function(e){if(y0===null)return;var dy=e.touches[0].clientY-y0;if(dy>0)s.style.transform='translateY('+dy+'px)'},{passive:true});
 s.addEventListener('touchend',function(e){if(y0===null)return;var dy=(e.changedTouches[0].clientY-y0);s.style.transform='';y0=null;if(dy>90)close()});
 load().then(function(L){var o=null;for(var i=0;i<L.length;i++)if(L[i].slug===slug){o=L[i];break}
  if(!cur||cur.s!==s)return;
  if(!o){bd.innerHTML='<p>This card isn’t in the Library yet.</p>';return}
  s.querySelector('.hd h3').firstChild.nodeValue=o.name;s.querySelector('.u').textContent=(o.dose&&o.dose.use)||'';render(o,bd,s.querySelector('.ft'))})}
D.addEventListener('click',function(e){if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
 var m=a.getAttribute('href').match(/^(?:https?:\/\/(?:www\.)?baresignals\.co)?\/library\/#\/(?:p\/)?([a-z0-9-]+)$/i);if(!m)return;
 e.preventDefault();open(decodeURIComponent(m[1]),(a.textContent||m[1]).trim(),a)},true);
})();
