/* Bare Signals goals v6 (4 Nov 2026): a Cases tab joins the Peptides / Supplements switch on the Library and Supplements pages; on the Guide the Cases line moves out of the body box to just above the peptide search, and a tapped case opens its card in place there (never over the body); Endometriosis no longer listed under BPC-157, TB-500 or KPV (that page says they have no endometriosis data). v5 kept at /goals/v5.js.
/* Bare Signals goals v5 (4 Nov 2026): section renamed Cases; GLP-1s, Endometriosis and PCOS added as live cases with teasers; the Library strip ends with an All cases link to /library/goals/. v4 kept at /goals/v4.js.
/* Bare Signals goals v4 (2 Nov 2026): on the Guide body map, a small Uses line sits under Read more in the compound summary; tapping a live use opens a teaser card (one line, three numbers, Read the full research). v3 kept at /goals/v3.js.
   Bare Signals goals v3 (2 Nov 2026): on the Guide body map, picking Bones & joints shows the goal pages (tennis elbow, Achilles, knee) above the peptide list. v2 kept at /goals/v2.js.
   Bare Signals goals v2 (2 Nov 2026): chips carry small elbow / Achilles / knee drawings instead of a colour square. v1 kept at /goals/v1.js.
   Bare Signals goals v1 (2 Nov 2026): one registry of goal pages (one deep read per common problem) and the links that tie them to
   the Library cards, Library full pages, the Library list and the Guide summary + card. Loaded by nav.js on every page.
   To rename the door, change LABEL. To add a page, add a row and set live:true once the page exists. */
(function(){
  if(window.BS_GOALS_ON)return;window.BS_GOALS_ON=1;
  var LABEL='Cases';
  var TENDON=['bpc-157','tb-500-frag-17-23','thymosin-beta-4','bpc-157-tb-500','glow','klow','tb4-bpc-kpv','ghk-cu-bpc-157','collagen-peptides'];
  var G=[
    {id:'tennis-elbow',name:'Tennis elbow',url:'/library/goals/tennis-elbow/',live:true,line:'Outer elbow tendon wear: studies, numbers, every option',for:TENDON,teaser:{t:'Wear where the wrist tendon meets the outer elbow. 9 in 10 get better within a year anyway, so anything has to beat that.',n:[['14 days','a cut rat Achilles rejoined on BPC-157','Rat'],['8 of 13','elbow tendon tears closed after collagen shots','Human'],['14 of 33','clear Reddit reports felt clearly better','Reports']]}},
    {id:'glp-1',name:'GLP-1s',url:'/library/goals/glp-1/',live:true,line:'65 effects beyond weight loss, each asking: the drug, or the weight?',for:['semaglutide','tirzepatide','retatrutide','cagrilintide','eloralintide','liraglutide','ecnoglutide','reta-cagri'],teaser:{t:'Everything people report on GLP-1 drugs beyond weight loss, from endometriosis to cravings, each graded and asking whether it is the drug or the weight.',n:[['20%','fewer heart attacks, strokes and heart deaths on semaglutide','RCT'],['2.5 h','for brain pressure to fall, too fast for weight loss','RCT'],['3,808','people in the Alzheimer trials that found no effect','RCT']]}},
    {id:'endometriosis',name:'Endometriosis',url:'/library/goals/endometriosis/',live:true,line:'Pain, studies and reports; GLP-1s carry the only signal',for:['semaglutide','tirzepatide','thymosin-alpha-1'],teaser:{t:'Womb-like tissue growing outside the womb, in about 1 in 10 women. No research peptide has an endometriosis study yet.',n:[['63%','of 227 GLP-1 users in a survey said they improved','Survey'],['8 of 22','Reddit GLP-1 users were clearly better','Reports'],['NNT 2','GnRH antagonists for period pain','Meta']]}},
    {id:'pcos',name:'PCOS',url:'/library/goals/pcos/',live:true,line:'Cycles, fertility and the 2026 rename to PMOS',for:['semaglutide','tirzepatide','liraglutide','kisspeptin-10','mots-c'],teaser:{t:'Irregular cycles, high androgens and stalled follicles, renamed PMOS in May 2026. Only GLP-1s have PCOS trials.',n:[['3x','natural pregnancy on GLP-1s vs metformin, 3 small trials','Meta'],['1 in 4','ovulate on a dummy pill within 6 to 8 weeks','RCT'],['27.5%','live births on letrozole, vs 19.1% on clomiphene','RCT']]}},
    {id:'achilles',name:'Achilles',url:'',live:false,line:'',for:TENDON},
    {id:'knee',name:'Knee',url:'',live:false,line:'',for:TENDON.concat(['cartalax','cartalax-tb4-bpc'])},
    {id:'gut',name:'Gut',url:'',live:false,line:'',for:['bpc-157','kpv','tb4-bpc-kpv','bpc-157-tb-500']}
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
  '.gouse{margin:8px 0 0;display:flex;flex-wrap:wrap;align-items:center;gap:4px}.gouse .gul{font:500 9.5px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;color:#6B76A8;margin-right:2px}'+
  '.gouse button,.gouse span.so{appearance:none;-webkit-appearance:none;margin:0;border:0;border-radius:0;cursor:pointer;font:500 10px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.05em;text-transform:uppercase;padding:5px 6px;background:#EFEDA6;color:#3E4A80}.gouse button:after{content:" ▸"}.gouse button[aria-expanded=true]{background:#3E4A80;color:#FFFFE2}.gouse .gsoon{flex-basis:100%;font:500 9px/1.3 \"JetBrains Mono\",ui-monospace,monospace;letter-spacing:.04em;text-transform:uppercase;color:#8C93B8}'+
  '.goteaser a.go{border:0!important;padding:0!important;background:none!important}'+
  '.goteaser{position:absolute;z-index:60;width:min(300px,calc(100% - 24px));background:#FFFFF4;box-shadow:0 6px 24px rgba(62,74,128,.22),inset 4px 0 0 #E1DE62;padding:10px 12px 10px 14px;font:400 12.5px/1.45 "Hanken Grotesk",system-ui,sans-serif;color:#3E4A80}'+
  '.goteaser h4{margin:0 22px 4px 0;font:700 15px/1.2 "Bricolage Grotesque",system-ui,sans-serif}.goteaser p{margin:0 0 6px}.goteaser ul{list-style:none;margin:0 0 8px;padding:0}.goteaser li{display:grid;grid-template-columns:62px 1fr;gap:6px;padding:4px 0;border-top:1px solid rgba(62,74,128,.12)}.goteaser li b{font:700 13px/1.2 "JetBrains Mono",ui-monospace,monospace}.goteaser li i{font-style:normal;font:500 8.5px/1 "JetBrains Mono",monospace;text-transform:uppercase;letter-spacing:.05em;background:#ECE9D2;padding:2px 4px;margin-left:4px}'+
  '.goteaser a.go{display:inline-block;font:600 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#2F5BE0;text-decoration:underline;text-underline-offset:3px}.goteaser .x{position:absolute;top:6px;right:6px;appearance:none;border:0;background:none;font:400 18px/1 system-ui;color:#6B76A8;cursor:pointer;padding:2px 6px}'+
  '.bsgoh{display:inline;margin-left:8px;white-space:nowrap}.bsgoh a{font:500 10.5px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:#6777B6;text-decoration:underline;text-underline-offset:2px}';
  css+='.gouse.goside{margin:10px 0 12px;padding:8px 0;border-top:1.5px solid #3E4A80;border-bottom:1.5px solid #3E4A80}.goteaser.inl{position:relative;left:auto!important;top:auto!important;width:auto;box-shadow:inset 4px 0 0 #E1DE62;margin:8px 0 0;flex-basis:100%}'+
  '.tsw a.bscases{display:flex;align-items:center;gap:6px;color:#3E4A80;text-decoration:none;font:500 10.5px/1 "JetBrains Mono",monospace;letter-spacing:.05em;text-transform:uppercase;padding:8px 10px;white-space:nowrap}.tsw a.bscases svg{width:14px;height:14px;flex:none}.tsw a.bscases[aria-current=page]{background:#3E4A80;color:#FFFFE2}'+
  '@media (max-width:640px){.tsw a.bscases{padding:7px 7px;font-size:9.5px;letter-spacing:.03em;gap:4px}.tsw a.bscases svg{display:none}}';
  function addTab(){D.querySelectorAll('.tsw').forEach(function(t){if(t.querySelector('.bscases'))return;var prev=t.lastElementChild,a=D.createElement('a');a.className='bscases';a.href='/library/goals/';a.innerHTML='<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3.5" y="2" width="11" height="14"></rect><path d="M6.5 6h5M6.5 9h5M6.5 12h3"></path></svg><span data-bsw="1">Cases</span>';a.style.borderLeft=(prev&&prev.classList.contains('tsa'))?'1.5px solid #3E4A80':'0';t.appendChild(a)})}
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
    d.innerHTML='<span class="bsgol">'+LABEL+' · full research reads</span><div class="bsgoc">'+chips(L)+(slug?'':'<a href="/library/goals/">All cases →</a>')+'</div>'+(withLine&&live.length?'<span class="bsgox">'+live.map(function(g){return '<b>'+g.name+':</b> '+g.line}).join('<br>')+'</span>':'');return d}
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
  function closeT(){var t=D.querySelector('.goteaser');if(t)t.remove();D.querySelectorAll('.gouse button[aria-expanded=true]').forEach(function(b){b.setAttribute('aria-expanded','false')})}
  function openT(btn,g){var was=btn.getAttribute('aria-expanded')==='true';closeT();if(was)return;var st=D.getElementById('stage');if(!st)return;var tz=g.teaser||{t:g.line,n:[]};
    var c=D.createElement('div');c.className='goteaser';c.setAttribute('role','dialog');c.setAttribute('aria-label',g.name+' research');
    c.innerHTML='<button type="button" class="x" aria-label="Close">×</button><h4>'+g.name+'</h4><p>'+tz.t+'</p><ul>'+tz.n.map(function(x){return '<li><b>'+x[0]+'</b><span>'+x[1]+'<i>'+x[2]+'</i></span></li>'}).join('')+'</ul><a class="go" href="'+g.url+'">Read the full research →</a>';
    var host=btn.closest('.goside');if(host){c.classList.add('inl');host.appendChild(c);btn.setAttribute('aria-expanded','true');c.querySelector('.x').addEventListener('click',closeT);return}
    var sr=st.getBoundingClientRect(),br=btn.getBoundingClientRect();if(getComputedStyle(st).position==='static')st.style.position='relative';
    c.style.left=Math.max(8,Math.min(br.left-sr.left,sr.width-308))+'px';c.style.top=(br.bottom-sr.top+6)+'px';st.appendChild(c);btn.setAttribute('aria-expanded','true');
    c.querySelector('.x').addEventListener('click',closeT)}
  function runUses(){var ct=D.getElementById('ctags');if(!ct||ct.hidden)return;var rm=ct.querySelector('.rmt');if(!rm)return;
    var ch=D.querySelector('#list .cchip[aria-pressed="true"]'),sl=ch&&ch.dataset.s;if(!sl)return;var ex=D.querySelector('.gouse.goside')||ct.querySelector('.gouse');if(ex&&ex.dataset.slug===sl)return;if(ex)ex.remove();
    var L=goalsFor(sl);if(!L.length)return;var w=D.createElement('div');w.className='gouse';w.dataset.slug=sl;w.innerHTML='<span class="gul">'+LABEL+'</span>';
    var soon=[];L.forEach(function(g){if(g.live){var b=D.createElement('button');b.type='button';b.textContent=g.name;b.setAttribute('aria-expanded','false');b.addEventListener('click',function(e){e.stopPropagation();openT(b,g)});w.appendChild(b)}else soon.push(g.name)});
    if(soon.length){var s=D.createElement('span');s.className='gsoon';s.textContent=soon.join(' · ')+' soon';w.appendChild(s)}
    var side=D.querySelector('.side');w.classList.add('goside');var nm=ch.textContent.replace(/\u2060/g,'').trim();w.querySelector('.gul').textContent=LABEL+' · '+nm;var old=D.querySelector('.gouse.goside');if(old)old.remove();
    if(side)side.insertBefore(w,side.firstChild);else rm.insertAdjacentElement('afterend',w);closeT()}
  /* the Guide places its little round pictures under the summary; move them down past the Uses line */
  function relay(){var sg=D.querySelector('.stage'),ct=D.getElementById('ctags');if(!sg||!ct||ct.hidden)return;var A=sg.getBoundingClientRect(),cb=ct.getBoundingClientRect().bottom-A.top;
    var cm=D.getElementById('cmini');if(cm&&!cm.hidden)cm.style.top=Math.round(cb+6)+'px';
    var wm=D.getElementById('wmini');if(wm&&!wm.hidden){var t=cb+10;if(cm&&!cm.hidden){var r=cm.getBoundingClientRect();if(r.height)t=Math.max(t,r.bottom-A.top+10)}wm.style.top=t+'px'}}
  D.addEventListener('click',function(e){if(!e.target.closest('.goteaser,.gouse'))closeT()});
  function runHome(){runBody();runUses();relay();
    /* Guide top-corner summary is 120 px wide on phones and boxes there may not cover the body, so the link lives at the top of the Read more card instead. */
    var syn=D.getElementById('cardsyn');if(syn){var card=syn.closest('.bscard')||syn.parentNode,a2=card.querySelector('a[href*="/library/#/p/"]');if(a2){var m=a2.getAttribute('href').match(/#\/p\/([^/?#]+)/),sl=m&&m[1],ex=card.querySelector('.bsgo');
      if(!(ex&&ex.dataset.slug===sl)){if(ex)ex.remove();var e3=strip(sl,'',true);if(e3){var bd=card.querySelector('.bd');if(bd)bd.insertBefore(e3,bd.firstChild);else place(e3,syn,'before')}}}}
  }
  var isLib=/^\/library\/(v\d+\/)?$/.test(P)||/^\/library\/v\d+\//.test(P),isHome=P==='/'||P==='/index.html'||/^\/home\//.test(P),isSupp=/^\/supplements\//.test(P);
  if(!isLib&&!isHome&&!isSupp)return;
  var t=0;function tick(){clearTimeout(t);t=setTimeout(function(){try{addCss();if(isLib||isSupp)addTab();if(isLib)runLibrary();else if(isHome)runHome()}catch(e){}},60)}
  function start(){tick();new MutationObserver(tick).observe(D.body,{childList:true,subtree:true});addEventListener('hashchange',tick)}
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
})();
