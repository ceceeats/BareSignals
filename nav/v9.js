/* Bare Signals site navigation v9 (23 Oct 2026): the bar now stays on screen (fixed to the top with an in-flow spacer of its roomy height, so nothing below jumps when it compacts) and owns the site-wide three-step text size control (small A / A / large A, right on the wordmark line; s=0.88 m=1 l=1.15, localStorage bs-text; dispatches window 'bs-text' {key,k} and sets html[data-bs-text]). Phone: wordmark + A A A on top, links in two rows of four; once scrolled past 30px it compacts to one line (wordmark, one scrollable row of links with the current page scrolled into view, A A A). Laptop (1000px+): one line always. Sets --bsnav-h (current bar height) and --bsnav-h0 (reserved space) on <html> and scroll-padding-top so page toolbars can stick at top:var(--bsnav-h). v8 kept at /nav/v8.js. Previously v8: adds Protocol (/protocol/) after Calculator; with 8 links the phone bar becomes two rows of four; v7 kept at /nav/v7.js. v7: adds Made (/made/) after Aminos. v6: one boxed bar shared by every page, plus the site-wide extras every page gets without touching it: the tracking helper (/track.js, GoatCounter site code set in BS_GC below), favicon and home-screen icon, web app manifest and the cream theme colour. v5 (full labels on wide screens) kept at /nav/v5.js; v1 to v4 in /nav/. Include with <script src="/nav.js" defer></script>. */
window.BS_GC='';  /* GoatCounter site code, e.g. 'baresignals' for baresignals.goatcounter.com. Empty = tracking off. */
(function(){
  var H=document.head,add=function(tag,attrs){var e=document.createElement(tag);for(var k in attrs)e.setAttribute(k,attrs[k]);H.appendChild(e);return e};
  if(!document.querySelector('link[rel="icon"]'))add('link',{rel:'icon',href:'/favicon.svg',type:'image/svg+xml'});
  if(!document.querySelector('link[rel="apple-touch-icon"]'))add('link',{rel:'apple-touch-icon',href:'/apple-touch-icon.png'});
  if(!document.querySelector('link[rel="manifest"]'))add('link',{rel:'manifest',href:'/manifest.webmanifest'});
  if(!document.querySelector('meta[name="theme-color"]'))add('meta',{name:'theme-color',content:'#FFFFE2'});
  var t=add('script',{src:'/track.js'});t.async=true;
})();
(function(){
  if(document.querySelector('.bsn'))return;
  var P=location.pathname,D=document,R=D.documentElement;
  var L=[['/library/','Library'],['/dosage/','Dosage'],['/blood/','Blood','Blood Work'],['/supplements/','Supps','Supplements'],['/aminos/','Aminos'],['/made/','Made'],['/draw/','Calculator'],['/protocol/','Protocol']];
  var on=function(h){return P.indexOf(h)===0};
  var K={s:.88,m:1,l:1.15};
  var M='"JetBrains Mono",ui-monospace,Menlo,monospace';
  var css=
  ':root{--bsnav-h:0px;--bsnav-h0:0px}html{scroll-padding-top:calc(var(--bsnav-h) + 8px)}'+
  '.bsn{position:fixed;top:0;left:0;right:0;z-index:60;background:#FFFFE2;border-bottom:1.5px solid #3E4A80;font-family:'+M+';-webkit-text-size-adjust:100%;text-size-adjust:100%}'+
  '.bsn-sp{display:block;height:var(--bsnav-h0)}'+
  '.bsn *{box-sizing:border-box}'+
  '.bsn .bsb{display:flex;height:5px}.bsn .bsb i{display:block}'+
  '.bsn .bsi{max-width:1300px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:8px max(16px,env(safe-area-inset-left,0px)) 8px}'+
  '.bsn .bsw{font:700 15px/1 "Bricolage Grotesque","Hanken Grotesk",system-ui,sans-serif;letter-spacing:.06em;color:#3E4A80;text-decoration:none;white-space:nowrap;flex:none;border:0}'+
  '.bsn .bsl{display:flex;margin-left:auto;border:1.5px solid #3E4A80;background:#FFFFF4;min-width:0}'+
  '.bsn .bsl a{font:500 11px/1 '+M+';letter-spacing:.08em;text-transform:uppercase;color:#3E4A80;text-decoration:none;padding:8px 12px;border:0;border-right:1.5px solid #3E4A80;white-space:nowrap;text-align:center;flex:none}'+
  '.bsn .bsl a:last-child{border-right:0}'+
  '.bsn .bsl a:hover{background:#F2F0CC}'+
  '.bsn .bsl a[aria-current="page"]{background:#3E4A80;color:#FFFFE2}'+
  /* text size control: three square cells */
  '.bsn .bst{display:flex;flex:none;border:1.5px solid #3E4A80;background:#FFFFF4}'+
  '.bsn .bst button{appearance:none;-webkit-appearance:none;margin:0;border:0;border-right:1.5px solid #3E4A80;background:none;color:#3E4A80;font:700 12px/1 "Bricolage Grotesque","Hanken Grotesk",system-ui,sans-serif;width:27px;height:27px;padding:0;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:0}'+
  '.bsn .bst button:last-child{border-right:0}'+
  '.bsn .bst button[data-bsz="s"]{font-size:10px}.bsn .bst button[data-bsz="l"]{font-size:15px}'+
  '.bsn .bst button:hover{background:#F2F0CC}'+
  '.bsn .bst button[aria-pressed="true"]{background:#3E4A80;color:#FFFFE2}'+
  '.bsn .bst button:focus-visible,.bsn .bsl a:focus-visible{outline:2px solid #DB6830;outline-offset:-3px}'+
  '.bsn .ls{display:none}@media (max-width:1050px){.bsn .lf{display:none}.bsn .ls{display:inline}}'+
  /* under 1000px: wordmark + A A A on the top line, links below (roomy); compact = one line */
  '@media (max-width:999.98px){'+
    '.bsn .bsi{display:grid;grid-template-columns:1fr auto;grid-template-areas:"w t" "l l";gap:7px 10px;padding-top:7px;padding-bottom:8px}'+
    '.bsn .bsw{grid-area:w;font-size:14px}.bsn .bst{grid-area:t}.bsn .bsl{grid-area:l;margin-left:0}'+
    '.bsn .bsl a{flex:1 1 auto;padding:8px 6px;font-size:10px;letter-spacing:.05em}'+
    '.bsn.c .bsb{height:3px}'+
    '.bsn.c .bsi{grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"w l t";gap:8px;padding-top:5px;padding-bottom:5px}'+
    '.bsn.c .bsw{font-size:11.5px;letter-spacing:.04em}'+
    '.bsn.c .bsl{overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}'+
    '.bsn.c .bsl::-webkit-scrollbar{display:none}'+
    '.bsn.c .bsl a{flex:1 0 auto;padding:7px 8px;font-size:9.5px;letter-spacing:.04em}'+
    '.bsn.c .bst button{width:24px;height:24px}'+
  '}'+
  '@media (max-width:560px){.bsn:not(.c) .bsl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.bsn:not(.c) .bsl a{padding:8px 2px;font-size:10px;min-width:0}.bsn:not(.c) .bsl a:nth-child(4n){border-right:0}.bsn:not(.c) .bsl a:nth-child(n+5){border-top:1.5px solid #3E4A80}}'+
  '@media (max-width:380px){.bsn:not(.c) .bsl a{padding:8px 1px;font-size:9px;letter-spacing:.02em}.bsn.c .bsw{font-size:10.5px}}'+
  '@media print{.bsn,.bsn-sp{display:none}}';
  var st=D.createElement('style');st.textContent=css;D.head.appendChild(st);
  var n=D.createElement('nav');n.className='bsn';n.setAttribute('aria-label','Bare Signals');
  var bar='<span class="bsb" aria-hidden="true"><i style="flex:3;background:#E1DE62"></i><i style="flex:1;background:#FF5050"></i><i style="flex:2;background:#6777B6"></i><i style="flex:1;background:#DDD0F6"></i><i style="flex:1;background:#AACC96"></i><i style="flex:1;background:#FFA51F"></i></span>';
  var tsz='<span class="bst" role="group" aria-label="Text size"><button type="button" data-bsz="s" aria-label="Smaller text" title="Smaller text">A</button><button type="button" data-bsz="m" aria-label="Standard text" title="Standard text">A</button><button type="button" data-bsz="l" aria-label="Bigger text" title="Bigger text">A</button></span>';
  n.innerHTML=bar+'<div class="bsi"><a class="bsw" href="/">BARE SIGNALS</a><div class="bsl">'+L.map(function(x){return '<a href="'+x[0]+'"'+(on(x[0])?' aria-current="page"':'')+'>'+(x[2]?'<span class="lf">'+x[2]+'</span><span class="ls">'+x[1]+'</span>':x[1])+'</a>'}).join('')+'</div>'+tsz+'</div>';
  var sp=D.createElement('div');sp.className='bsn-sp';sp.setAttribute('aria-hidden','true');
  D.body.insertBefore(sp,D.body.firstChild);D.body.insertBefore(n,sp);
  var row=n.querySelector('.bsl');

  /* text size */
  var cur='m';try{cur=localStorage.getItem('bs-text')||'m'}catch(e){}if(!K[cur])cur='m';
  function setT(v,save){if(!K[v])v='m';cur=v;R.dataset.bsText=v;
    [].forEach.call(n.querySelectorAll('.bst button'),function(b){b.setAttribute('aria-pressed',String(b.dataset.bsz===v))});
    if(save){try{localStorage.setItem('bs-text',v)}catch(e){}}
    window.dispatchEvent(new CustomEvent('bs-text',{detail:{key:v,k:K[v]}}));}
  window.BS_TEXT={get:function(){return {key:cur,k:K[cur]}},set:function(v){setT(v,true)},K:K};
  n.querySelector('.bst').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setT(b.dataset.bsz,true)});
  addEventListener('storage',function(e){if(e.key==='bs-text'&&e.newValue&&e.newValue!==cur)setT(e.newValue,false)});
  setT(cur,false);

  /* height bookkeeping: spacer keeps the roomy height so content never jumps; --bsnav-h follows the live bar */
  var narrow=matchMedia('(max-width:999.98px)'),last=-1,h0=-1;
  function setH(){var h=n.offsetHeight;if(h!==last){last=h;R.style.setProperty('--bsnav-h',h+'px')}}
  function measure(){var c=n.classList.contains('c');if(c)n.classList.remove('c');var h=n.offsetHeight;if(c)n.classList.add('c');
    if(h!==h0){h0=h;R.style.setProperty('--bsnav-h0',h+'px')}setH()}
  function showCur(){var a=row.querySelector('a.hl:not([aria-current])')||row.querySelector('a[aria-current]');if(!a||row.scrollWidth<=row.clientWidth+1)return;
    var x=a.offsetLeft-row.offsetLeft-(row.clientWidth-a.offsetWidth)/2;row.scrollLeft=Math.max(0,x)}
  window.BS_NAV={showCurrent:showCur,el:n};
  function onScroll(){var y=window.scrollY||R.scrollTop||0,c=n.classList.contains('c'),want=narrow.matches&&(c?y>12:y>30);
    if(want!==c){n.classList.toggle('c',want);setH();if(want)showCur()}}
  measure();onScroll();
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){measure();onScroll()});
  if(window.ResizeObserver)new ResizeObserver(function(){if(n.classList.contains('c'))setH();else measure()}).observe(n);
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(measure);
  addEventListener('load',measure);
})();
