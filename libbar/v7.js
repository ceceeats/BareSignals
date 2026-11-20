/* Library toolbar v7 (20 Nov 2026, built on v6, kept): CSS moved to /libbar/v7.css (linked in the page head, so nothing restyles after load); the Peptides tab and the toolbar are written into the Supplements, Cases and Goals HTML and this script only wires them (it still builds them if a page lacks them); phone tabs padding 0 3px like the Library; Case and Goal cards get the 3px offset edge. v6: Library toolbar v6 (20 Nov 2026, built on v5, kept): Cases and Goals search through the shared search v2 (/search.js: phrases, word families), loaded here if the page lacks it. v5: Library toolbar v5 (20 Nov 2026, built on v4, kept): smaller, same as Library v119 (36px controls, 38px icon buttons, 15px icons, search text 16px); the picked view fills inside its box. v4: Library toolbar v4 (20 Nov 2026, built on v3, kept): same sizes as the Library on every tab (28px tabs on phone, 44px controls, 16px search text, 20px under the tabs, count hidden on phone, Library-column width on laptop). v3: Library toolbar v3 (20 Nov 2026, built on v2, kept): adds the Peptides tab to the row; Supplements opens straight on the toolbar (intro, caution box and Try row hidden); Cases and Goals intro line hidden; smaller Case and Goal rows. v2: Library toolbar v2 (20 Nov 2026, built on v1, kept): one 44px height for search and icons; list groups full width with names in an even grid; supplement doses under the name; Case and Goal rows read as one sentence. v1 text: Library toolbar for the Supplements, Cases and Goals tabs: the same Finder-style bar as Library v114
   (search, cards | list icons, one sort button with a Sort by menu) and a list view. The view choice is shared with the
   Library (localStorage bs-view), so list stays list as you move between tabs. */
(function(){
  if(!window.BS_SEARCH&&!document.querySelector('script[src="/search.js"]')){var s0=document.createElement('script');s0.src='/search.js';document.head.appendChild(s0)}
  var K='bs-view',LV=false;try{LV=localStorage.getItem(K)==='list'}catch(e){}
  var P=location.pathname,PG=P.indexOf('/supplements')===0?'sup':P.indexOf('/library/goals')===0?'cas':P.indexOf('/library/aims')===0?'goa':'';
  if(!PG||new URLSearchParams(location.search).get('embed'))return;
  var IC={grid:'<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="5.5" height="5.5"/><rect x="10.5" y="2" width="5.5" height="5.5"/><rect x="2" y="10.5" width="5.5" height="5.5"/><rect x="10.5" y="10.5" width="5.5" height="5.5"/></svg>',
    list:'<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 4h10M6 9h10M6 14h10"/><circle cx="2.6" cy="4" r=".9" fill="currentColor"/><circle cx="2.6" cy="9" r=".9" fill="currentColor"/><circle cx="2.6" cy="14" r=".9" fill="currentColor"/></svg>',
    sort:'<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3v12M2 12l3 3 3-3M13 15V3M10 6l3-3 3 3"/></svg>'};
  var ALIAS={'tennis-elbow':'elbow tendon tendonitis lateral epicondylitis','achilles':'achilles tendon heel','knee':'knee acl meniscus','gut':'gut ibs leaky bloating colitis','endometriosis':'endometriosis endo period','pcos':'pcos polycystic fertility','period-pain':'period cramps menstrual pain','glp-1':'glp ozempic wegovy weight'};
  if(!document.querySelector('link[href="/libbar/v7.css"]')){var lk=document.createElement('link');lk.rel='stylesheet';lk.href='/libbar/v7.css';document.head.appendChild(lk)}
  var KW6={"tennis elbow": "elbow tendon tendonitis tendinopathy lateral epicondylitis arm pain", "achilles": "achilles tendon heel ankle calf tendinopathy", "knee": "knee knees acl meniscus ligament cartilage joint patellar", "gut": "gut ibs leaky bloating colitis digestion stomach bowel", "glp-1s": "glp-1 glp semaglutide tirzepatide ozempic weight loss appetite hormone", "endometriosis": "endometriosis endo period pelvic pain hormone estrogen", "pcos": "pcos polycystic hormone hormonal androgen testosterone insulin fertility period", "period pain": "period cramps menstrual pms hormone", "glps": "glp-1 weight loss appetite hormone semaglutide tirzepatide retatrutide", "energy": "energy fatigue tired mitochondria atp nad", "growth hormones": "growth hormone hgh gh sleep recovery muscle height", "brain": "brain focus memory cognition adhd brain fog nootropic mood"};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
  var nm=function(x){return String(x||'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9+ ]/g,' ').replace(/\s+/g,' ')};
  var sortK='page',bar,menu,list,q;
  function seg(){return '<div class="seg1" role="group" aria-label="View"><button type="button" class="ib1" data-v1="grid" aria-label="Cards">'+IC.grid+'</button><button type="button" class="ib1" data-v1="list" aria-label="List">'+IC.list+'</button></div><button type="button" class="ib1 sq1" id="sb1" aria-label="Sort" aria-haspopup="menu" aria-expanded="false">'+IC.sort+'</button><div class="m1" id="m1" role="menu" hidden></div>'}
  function opts(){if(PG==='sup')return [].map.call(document.querySelectorAll('#view button'),function(b){return [b.dataset.v,b.textContent.trim().replace(/^Groups$/,'Group'),b.getAttribute('aria-pressed')==='true']});
    return [['page','Page order',sortK==='page'],['az','A to Z',sortK==='az']]}
  function openMenu(o){if(o===undefined)o=menu.hidden;if(o)menu.innerHTML='<p>Sort by</p>'+opts().map(function(x){return '<button type="button" role="menuitemradio" data-s1="'+x[0]+'"><span class="ck">'+(x[2]?'✓':'')+'</span>'+esc(x[1])+'</button>'}).join('');
    menu.hidden=!o;document.getElementById('sb1').setAttribute('aria-expanded',o)}
  /* Cases and Goals: tiles in .bcg */
  var grid,tiles=[];
  function bcFilter(){var t=nm(q.value).trim(),L=tiles.slice();if(sortK==='az')L.sort(function(a,b){return a.dataset.n.localeCompare(b.dataset.n)});
    L.forEach(function(a){grid.appendChild(a);a.classList.toggle('lb1hit',!!t&&(window.BS_SEARCH?BS_SEARCH.rank(a.dataset.n||'','',(a.dataset.k||'')+' '+(KW6[(a.dataset.n||'').toLowerCase()]||''),q.value)<=0:nm(a.dataset.k).indexOf(t)<0))});
    if(LV){var vis=L.filter(function(a){return !a.classList.contains('lb1hit')});
      list.innerHTML='<ul class="rows">'+vis.map(function(a){var b=a.querySelector('b'),s=a.querySelector('.bs'),l=a.querySelector('.bl');return '<li><a href="'+a.getAttribute('href')+'"><span class="n"><b>'+esc(b&&b.textContent)+'</b></span><span class="l">'+(s?'<em>'+esc(s.textContent)+'</em> ':'')+esc(l&&l.textContent)+'</span></a></li>'}).join('')+'</ul>'+(vis.length?'':'<p class="lede">Nothing matches.</p>')}}
  /* Supplements: read the page's own grid */
  function supList(){if(!LV)return;var g=document.getElementById('grid'),h='',open=false,body='';
    [].forEach.call(g.children,function(el){if(el.classList.contains('ghead')){if(open)h+=body+'</ul></div>';var em=el.querySelector('em');var lab=el.cloneNode(true);if(lab.querySelector('em'))lab.querySelector('em').remove();h+='<div class="grp"><p class="gh">'+lab.innerHTML+' <em>'+(em?em.textContent:'')+'</em></p><ul>';open=true;body=''}
      else if(el.classList.contains('tl')){var n=el.querySelector('.nm'),d=el.querySelector('.dz b');if(!open){h+='<div class="grp"><ul>';open=true}body+='<li><button type="button" data-id1="'+el.dataset.id+'"><span class="n">'+esc(n&&n.childNodes[0].textContent)+'</span>'+(d?'<span class="t s">'+esc(d.textContent)+'</span>':'')+'</button></li>'}});
    if(open)h+=body+'</ul></div>';list.innerHTML='<div>'+(h||'<p class="lede">Nothing matches.</p>')+'</div>'}
  function setV(v){LV=v==='list';try{localStorage.setItem(K,LV?'list':'grid')}catch(e){}document.body.classList.toggle('lv1on',LV);list.hidden=!LV;
    [].forEach.call(document.querySelectorAll('[data-v1]'),function(b){var on=(b.dataset.v1==='list')===LV;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
    if(PG==='sup')supList();else bcFilter()}
  function tabs(){var n=document.querySelector('.lsw');if(!n||n.querySelector('[href="/library/?pep"]'))return;var a=n.querySelector('a');if(!a)return;a.insertAdjacentHTML('afterend','<a href="/library/?pep"><svg viewBox=\"0 0 18 18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><path d=\"M6.5 1.5h5M7.5 1.5v3.5L4.5 15a1.5 1.5 0 0 0 1.4 1.5h6.2A1.5 1.5 0 0 0 13.5 15L10.5 5V1.5M5.8 11h6.4\"/></svg><span>Peptides</span></a>')}
  function init(){tabs();
    if(PG==='sup'){var ctl=document.querySelector('.ctl'),qw=ctl&&ctl.querySelector('.qw');if(!qw)return;
      if(!ctl.querySelector('.lb1')){var w=document.createElement('div');w.className='lb1';w.style.margin='0';w.style.flex='1 1 100%';ctl.insertBefore(w,qw);w.appendChild(qw);qw.style.flex='1 1 auto';w.insertAdjacentHTML('beforeend',seg())}
      var qq0=document.getElementById('q');if(qq0)qq0.placeholder='Search supplements';var vw=document.getElementById('view');if(vw)vw.style.display='none';
      list=document.createElement('div');list.className='lv1';list.hidden=true;document.getElementById('lay').before(list);
      document.getElementById('lay').classList.add('lv1hide');
      new MutationObserver(function(){supList()}).observe(document.getElementById('grid'),{childList:true});
      list.addEventListener('click',function(e){var b=e.target.closest('[data-id1]');if(!b)return;var t=document.querySelector('#grid .tl[data-id="'+b.dataset.id1+'"]');if(!t)return;
        document.body.classList.remove('lv1on');t.click();setTimeout(function(){var cw=document.getElementById('cw');var y=(cw&&!cw.hidden&&cw.offsetParent?cw:t).getBoundingClientRect().top+scrollY-70;scrollTo(0,y)},60)});
    }else{grid=document.querySelector('.bcg');var lead=document.querySelector('.lead');if(!grid||!lead)return;
      tiles=[].slice.call(grid.querySelectorAll('a.bc'));tiles.forEach(function(a){var id=(a.getAttribute('href').match(/\/([a-z0-9-]+)\/$/)||[])[1]||'';a.dataset.n=(a.querySelector('b')||{}).textContent||'';a.dataset.k=a.textContent+' '+(ALIAS[id]||'')});
      if(!document.getElementById('q1'))lead.insertAdjacentHTML('afterend','<div class="lb1"><input class="q1" id="q1" type="search" placeholder="Search '+(PG==='cas'?'cases':'goals')+'" aria-label="Search" autocomplete="off">'+seg()+'</div>');
      q=document.getElementById('q1');q.addEventListener('input',bcFilter);
      list=document.createElement('div');list.className='lv1';list.hidden=true;grid.before(list);grid.classList.add('lv1hide')}
    bar=document.querySelector('.lb1');menu=document.getElementById('m1');
    document.addEventListener('click',function(e){var t=e.target;var v=t.closest&&t.closest('[data-v1]');if(v){setV(v.dataset.v1);return}
      if(t.closest&&t.closest('#sb1')){openMenu();return}
      var s=t.closest&&t.closest('[data-s1]');if(s){if(PG==='sup'){var b=document.querySelector('#view [data-v="'+s.dataset.s1+'"]');if(b)b.click()}else{sortK=s.dataset.s1;bcFilter()}openMenu(false);return}
      if(!(t.closest&&t.closest('#m1')))openMenu(false)},true);
    setV(LV?'list':'grid');gap()}
  function gap(){var t=document.querySelector('.lsw'),x=document.querySelector('.lb1');if(!t||!x)return;var qq=x.querySelector('#q,.q1')||x;var d=qq.getBoundingClientRect().top-t.getBoundingClientRect().bottom;var m=parseFloat(getComputedStyle(x).marginTop)||0;x.style.marginTop=(m+(innerWidth>=900?22:20)-d)+'px'}
  addEventListener('resize',function(){var x=document.querySelector('.lb1');if(x){x.style.marginTop='';gap()}});
  if(document.readyState==='loading')addEventListener('DOMContentLoaded',function(){setTimeout(init,0)});else setTimeout(init,0);
  /* Supplements: a card opened from the list brings the list back when closed */
  if(PG==='sup')addEventListener('hashchange',function(){if(LV&&(!location.hash||location.hash==='#/'))document.body.classList.add('lv1on')});
})();
