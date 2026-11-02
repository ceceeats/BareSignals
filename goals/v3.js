/* Bare Signals goals v3 (2 Nov 2026): on the Guide body map, picking Bones & joints shows the goal pages (tennis elbow, Achilles, knee) above the peptide list. v2 kept at /goals/v2.js.
   Bare Signals goals v2 (2 Nov 2026): chips carry small elbow / Achilles / knee drawings instead of a colour square. v1 kept at /goals/v1.js.
   Bare Signals goals v1 (2 Nov 2026): one registry of goal pages (one deep read per common problem) and the links that tie them to
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
  '.bsgo span.so{border-style:dashed;color:#6B76A8}.bsgo svg{flex:none;width:20px;height:20px;margin:-3px 0}.bsgo span.so svg{opacity:.55}'+
  '.bsgo .bsgox{display:block;font-size:12px;line-height:1.35;margin:6px 0 0;color:#3E4A80}'+
  '.bsgo.gomin{margin:6px 0 4px;padding:0;border:0;background:none}.bsgo.gomin .bsgol{margin:0 0 4px}'+
  '.bsgo.gorow{margin:0 0 10px}'+'.bsgo.gofr{grid-column:1/-1;margin:0 0 12px}'+'.bsgo.gobody{margin:4px 0 8px;padding:6px 8px}'+
  '.bsgoh{display:inline;margin-left:8px;white-space:nowrap}.bsgoh a{font:500 10.5px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#6777B6;text-decoration:underline;text-underline-offset:2px}';
  function addCss(){if(D.getElementById('bsg-css'))return;var s=D.createElement('style');s.id='bsg-css';s.textContent=css;D.head.appendChild(s)}
  function goalsFor(slug){return G.filter(function(g){return g.for.indexOf(slug)>=0})}
  var IC={
    'tennis-elbow':'<path d="M8 3C7 9 7.5 15 9 20C10 24 12 27.5 15.5 28.8C20 30.3 27 30.4 34 30L35.5 29.6L35.5 25L34 24.6C28 24.4 22.5 23.8 19.5 22.4C18 21.6 17.4 19.8 17.4 17C17.4 12 18 7 17 3Z" fill="#FFFFF4" stroke="#3E4A80" stroke-width="2" stroke-linejoin="round"/><path d="M14.5 26.6C20 28 27 28.2 34 27.6" fill="none" stroke="#87CFC5" stroke-width="2.4" stroke-linecap="round"/><circle cx="11.6" cy="25.6" r="3.6" fill="#E1DE62" stroke="#3E4A80" stroke-width="1.8"/>',
    'achilles':'<path d="M9 2C6.5 7 6 12 8 17C9.5 21 11.5 24 11.8 28C12 30.5 11 32.5 11 34.5C11 36.5 12.8 37.6 15 37.6L35.5 37.6C37.8 37.6 38.3 35.4 36.6 34.2C33.5 32.3 28 31.2 24.5 29.6C22 28.4 21 26.4 20.8 23C20.6 16 21.5 8 21 2Z" fill="#FFFFF4" stroke="#3E4A80" stroke-width="2" stroke-linejoin="round"/><path d="M8.6 18.5C10.8 22 12.2 25.6 12.1 29.5C12 31.6 11.4 33 11.5 34.4" fill="none" stroke="#E1DE62" stroke-width="3.6" stroke-linecap="round"/>',
    'knee':'<path d="M2 6C9 5 17 6.5 25 9.5C28.5 11 31 13.5 31.5 17C31.8 20 31 22.5 30 25.5L28 38L20.5 38L22.5 25.5C22.8 23 22 21.5 19.5 20.6C14 18.8 8 18 2 17.5Z" fill="#FFFFF4" stroke="#3E4A80" stroke-width="2" stroke-linejoin="round"/><ellipse cx="31.2" cy="17.8" rx="3" ry="3.8" transform="rotate(-15 31.2 17.8)" fill="#E1DE62" stroke="#3E4A80" stroke-width="1.8"/>'
  };
  function ico(id){return IC[id]?'<svg viewBox="0 0 40 40" width="20" height="20" aria-hidden="true">'+IC[id]+'</svg>':'<i></i>'}
  function chips(list){return list.map(function(g){return g.live?'<a href="'+g.url+'">'+ico(g.id)+g.name+' →</a>':'<span class="so">'+ico(g.id)+g.name+' · soon</span>'}).join('')}
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
  function runBody(){var on=D.querySelector('#parts .sys[aria-pressed="true"]'),lst=D.getElementById('list'),ex=D.querySelector('.bsgo.gobody');
    var want=on&&/^Bones/.test(on.textContent.trim());if(!want){if(ex)ex.remove();return}if(ex||!lst)return;
    var e=strip(null,'gobody',false);if(!e)return;e.querySelector('.bsgol').textContent=LABEL+' · tendon and joint research reads';lst.parentNode.insertBefore(e,lst)}
  function runHome(){runBody();
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
