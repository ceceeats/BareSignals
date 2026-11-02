/* Bare Signals goals v1 (2 Nov 2026): one registry of goal pages (one deep read per common problem) and the links that tie them to
   the Library cards, Library full pages, the Library list and the Guide summary + card. Loaded by nav.js on every page.
   To rename the door, change LABEL. To add a page, add a row and set live:true once the page exists. */
(function(){
  if(window.BS_GOALS_ON)return;window.BS_GOALS_ON=1;
  var LABEL='Uses';
  var TENDON=['bpc-157','tb-500-frag-17-23','thymosin-beta-4','bpc-157-tb-500','glow','klow','tb4-bpc-kpv','ghk-cu-bpc-157','collagen-peptides'];
  var G=[
    {id:'tennis-elbow',name:'Tennis elbow',url:'/library/goals/tennis-elbow/',live:true,line:'Outer elbow tendon wear: studies, numbers, every option',for:TENDON},
    {id:'achilles',name:'Achilles',url:'',live:false,line:'',for:TENDON},
    {id:'knee',name:'Knee',url:'',live:false,line:'',for:TENDON.concat(['cartalax','cartalax-tb4-bpc'])}
  ];
  window.BS_GOALS=G;window.BS_GOALS_LABEL=LABEL;
  var D=document,P=location.pathname;
  var css='.bsgo{margin:8px 0 10px;padding:8px 10px;border:1.5px solid #3E4A80;background:#FFFFF4;font-family:"Hanken Grotesk",system-ui,sans-serif;color:#3E4A80}'+
  '.bsgo .bsgol{display:block;font:500 10px/1.2 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#6B76A8;margin:0 0 6px}'+
  '.bsgo .bsgoc{display:flex;flex-wrap:wrap;gap:6px}'+
  '.bsgo a,.bsgo span.so{display:inline-flex;align-items:center;gap:6px;font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.05em;text-transform:uppercase;padding:6px 8px;border:1.5px solid #3E4A80;background:#FFFFE2;color:#3E4A80;text-decoration:none;white-space:nowrap}'+
  '.bsgo a{color:#6777B6;text-decoration:underline;text-underline-offset:2px}'+
  '.bsgo a i{display:inline-block;width:9px;height:9px;background:#E1DE62;border:1.2px solid #3E4A80}'+
  '.bsgo span.so{border-style:dashed;color:#6B76A8}'+
  '.bsgo .bsgox{display:block;font-size:12px;line-height:1.35;margin:6px 0 0;color:#3E4A80}'+
  '.bsgo.gomin{margin:6px 0 4px;padding:0;border:0;background:none}.bsgo.gomin .bsgol{margin:0 0 4px}'+
  '.bsgo.gorow{margin:0 0 10px}'+'.bsgo.gofr{grid-column:1/-1;margin:0 0 12px}'+
  '.bsgoh{display:inline;margin-left:8px;white-space:nowrap}.bsgoh a{font:500 10.5px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#6777B6;text-decoration:underline;text-underline-offset:2px}';
  function addCss(){if(D.getElementById('bsg-css'))return;var s=D.createElement('style');s.id='bsg-css';s.textContent=css;D.head.appendChild(s)}
  function goalsFor(slug){return G.filter(function(g){return g.for.indexOf(slug)>=0})}
  function chips(list){return list.map(function(g){return g.live?'<a href="'+g.url+'"><i></i>'+g.name+' →</a>':'<span class="so">'+g.name+' · soon</span>'}).join('')}
  function strip(slug,cls,withLine){var L=slug?goalsFor(slug):G;if(!L.length)return null;var d=D.createElement('div');d.className='bsgo'+(cls?' '+cls:'');d.dataset.slug=slug||'all';
    var live=L.filter(function(g){return g.live});
    d.innerHTML='<span class="bsgol">'+LABEL+' · full research reads</span><div class="bsgoc">'+chips(L)+'</div>'+(withLine&&live.length?'<span class="bsgox">'+live.map(function(g){return '<b>'+g.name+':</b> '+g.line}).join('<br>')+'</span>':'');return d}
  function place(el,ref,where){if(!ref||!ref.parentNode)return;if(where==='after')ref.parentNode.insertBefore(el,ref.nextSibling);else ref.parentNode.insertBefore(el,ref)}
  function libSlug(){var h=location.hash,m=h.match(/^#\/p\/([^/?#]+)/);if(m)return{s:decodeURIComponent(m[1]),full:1};m=h.match(/^#\/([^/?#]+)$/);if(m&&m[1]!=='p'&&m[1]!=='c'&&m[1]!=='t'&&m[1]!=='d')return{s:decodeURIComponent(m[1]),full:0};return null}
  function runLibrary(){
    var grid=D.getElementById('grid');if(grid&&!D.querySelector('.bsgo.gorow')){var r=strip(null,'gorow');place(r,grid,'before')}
    var cur=libSlug();if(!cur)return;
    if(cur.full){var hd=D.querySelector('.fp65>.hd65,.fp65>.fp57');var pg=hd?hd.parentNode:null;if(!pg)return;var old=pg.querySelector(':scope>.bsgo');if(old&&old.dataset.slug===cur.s)return;if(old)old.remove();
      var el=strip(cur.s,'gofr',true);if(!el)return;place(el,hd,'after')}
    else{var cw=D.getElementById('cardwrap');if(!cw||cw.hidden)return;var c=cw.querySelector('.card');if(!c)return;var cb=c.querySelector('.cbody');if(!cb)return;var o=cb.querySelector(':scope>.bsgo');if(o&&o.dataset.slug===cur.s)return;if(o)o.remove();
      var e2=strip(cur.s,'gomin');if(!e2)return;cb.insertBefore(e2,cb.firstChild)}
  }
  function homeSlugByName(n){n=(n||'').replace(/⁠/g,'').trim();var ch=D.querySelectorAll('#list .cchip');for(var i=0;i<ch.length;i++){if(ch[i].textContent.replace(/⁠/g,'').trim()===n)return ch[i].dataset.s}return null}
  function runHome(){
    /* Guide top-corner summary is 120 px wide on phones and boxes there may not cover the body, so the link lives at the top of the Read more card instead. */
    var syn=D.getElementById('cardsyn');if(syn){var card=syn.closest('.bscard')||syn.parentNode,a2=card.querySelector('a[href*="/library/#/p/"]');if(a2){var m=a2.getAttribute('href').match(/#\/p\/([^/?#]+)/),sl=m&&m[1],ex=card.querySelector('.bsgo');
      if(!(ex&&ex.dataset.slug===sl)){if(ex)ex.remove();var e3=strip(sl,'',true);if(e3){var bd=card.querySelector('.bd');if(bd)bd.insertBefore(e3,bd.firstChild);else place(e3,syn,'before')}}}}
  }
  var isLib=/^\/library\/(v\d+\/)?$/.test(P)||/^\/library\/v\d+\//.test(P),isHome=P==='/'||P==='/index.html'||/^\/home\//.test(P);
  if(!isLib&&!isHome)return;
  var t=0;function tick(){clearTimeout(t);t=setTimeout(function(){try{addCss();isLib?runLibrary():runHome()}catch(e){}},60)}
  function start(){tick();new MutationObserver(tick).observe(D.body,{childList:true,subtree:true});addEventListener('hashchange',tick)}
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
})();
