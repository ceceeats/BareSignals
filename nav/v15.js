/* Bare Signals site navigation v15 (25 Oct 2026): text set like a book on every page: numbers stay with their units, no single short word alone on the last line, short labels and cells break at their commas (end of file; v14 kept at /nav/v14.js). v14 (25 Oct 2026): small capital tags site-wide are trimmed to their capital letters and padded equally, so the letters sit in the exact middle on every phone and text size (end of file; v13 kept at /nav/v13.js). v13 (25 Oct 2026): the BARE SIGNALS wordmark and the dynamic logo open the Library, not the home page (v12 kept at /nav/v12.js). v12: phone compact bar (after scrolling) swaps the BARE SIGNALS wordmark for a small sticker-style colour box that keeps changing colour and still goes home; the three A cells fold into one A that steps through the sizes; the page links fade at the edge that has more to scroll to. Roomy bar and laptop unchanged. v11 kept at /nav/v11.js. Previously v11 (24 Oct 2026): one content width for the whole site. On laptop (1000px+) the inner row (.bsi) is the shared 1240px box with 24px side padding, so the wordmark lines up with every page's left content edge and the A buttons with its right edge; phone keeps 16px. Sets --bs-w (1240px), --bs-pad (24px, 16px under 1000px) and --bs-k (current text size number, updated on every bs-text event) on <html>. Phone default text is now l (1.15) when never chosen (bs-text); laptop unchanged (five steps, default l, bs-text-w). Still one line on laptop with five A buttons from 1000px. v10 kept at /nav/v10.js. Previously v10 (23 Oct 2026): laptop gets its own text scale. Wide (1000px+) shows five A buttons s/m/l/xl/xxl = 0.88/1/1.15/1.3/1.45 (glyphs 10/11.5/13/14.5/16px), default l, stored in localStorage bs-text-w; phone keeps three s/m/l = 0.88/1/1.15, default m, bs-text, so the two never mix. Dispatches window 'bs-text' {key,k,wide} on load, on click, when the viewport crosses 1000px, and again on DOMContentLoaded and load; sets html[data-bs-text] and html[data-bs-wide]; BS_TEXT.get() gives {key,k,wide}, BS_TEXT.K the active map. Pages apply detail.k. Laptop link padding tightened so the five buttons fit on the one line from 1000px. v9 kept at /nav/v9.js. Previously v9 (23 Oct 2026): the bar now stays on screen (fixed to the top with an in-flow spacer of its roomy height, so nothing below jumps when it compacts) and owns the site-wide three-step text size control (small A / A / large A, right on the wordmark line; s=0.88 m=1 l=1.15, localStorage bs-text; dispatches window 'bs-text' {key,k} and sets html[data-bs-text]). Phone: wordmark + A A A on top, links in two rows of four; once scrolled past 30px it compacts to one line (wordmark, one scrollable row of links with the current page scrolled into view, A A A). Laptop (1000px+): one line always. Sets --bsnav-h (current bar height) and --bsnav-h0 (reserved space) on <html> and scroll-padding-top so page toolbars can stick at top:var(--bsnav-h). v8 kept at /nav/v8.js. Previously v8: adds Protocol (/protocol/) after Calculator; with 8 links the phone bar becomes two rows of four; v7 kept at /nav/v7.js. v7: adds Made (/made/) after Aminos. v6: one boxed bar shared by every page, plus the site-wide extras every page gets without touching it: the tracking helper (/track.js, GoatCounter site code set in BS_GC below), favicon and home-screen icon, web app manifest and the cream theme colour. v5 (full labels on wide screens) kept at /nav/v5.js; v1 to v4 in /nav/. Include with <script src="/nav.js" defer></script>. */
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
  var KN={s:.88,m:1,l:1.15},KW={s:.88,m:1,l:1.15,xl:1.3,xxl:1.45};
  var M='"JetBrains Mono",ui-monospace,Menlo,monospace';
  var css=
  ':root{--bsnav-h:0px;--bsnav-h0:0px;--bs-w:1240px;--bs-pad:24px;--bs-k:1}@media (max-width:999.98px){:root{--bs-pad:16px}}html{scroll-padding-top:calc(var(--bsnav-h) + 8px)}'+
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
  '.bsn .bst button[data-bsz="s"]{font-size:10px}.bsn .bst button[data-bsz="m"]{font-size:11.5px}.bsn .bst button[data-bsz="l"]{font-size:13px}.bsn .bst button[data-bsz="xl"]{font-size:14.5px}.bsn .bst button[data-bsz="xxl"]{font-size:16px}'+
  '.bsn .bst button{width:25px}'+
  /* laptop: tighter links so wordmark + links + five A fit one line from 1000px */
  '@media (min-width:1000px){.bsn .bsi{gap:10px;max-width:var(--bs-w,1240px);padding-left:var(--bs-pad,24px);padding-right:var(--bs-pad,24px)}.bsn .bsl a{padding:8px 9px;letter-spacing:.06em}}'+
  '@media (min-width:1000px) and (max-width:1120px){.bsn .bsl a{padding:8px 7px;letter-spacing:.04em}.bsn .bsw{font-size:14px}}'+
  '.bsn .bst button:hover{background:#F2F0CC}'+
  '.bsn .bst button[aria-pressed="true"]{background:#3E4A80;color:#FFFFE2}'+
  '.bsn .bst button:focus-visible,.bsn .bsl a:focus-visible{outline:2px solid #DB6830;outline-offset:-3px}'+
  '.bsn .ls{display:none}@media (max-width:1050px){.bsn .lf{display:none}.bsn .ls{display:inline}}'+
  /* under 1000px: wordmark + A A A on the top line, links below (roomy); compact = one line */
  '@media (max-width:999.98px){'+
    '.bsn .bsi{display:grid;grid-template-columns:1fr auto;grid-template-areas:"w t" "l l";gap:7px 10px;padding-top:7px;padding-bottom:8px}'+
    '.bsn .bsw{grid-area:w;font-size:14px}.bsn .bst{grid-area:t}.bsn .bsl{grid-area:l;margin-left:0}'+
    '.bsn .bst button{width:27px}.bsn .bst button[data-bsz="m"]{font-size:12px}.bsn .bst button[data-bsz="l"]{font-size:15px}.bsn .bst button[data-bsz="xl"],.bsn .bst button[data-bsz="xxl"]{display:none}.bsn .bst button[data-bsz="l"]{border-right:0}'+
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
  /* v12: logo box (sticker in box form) and the one-tap A for the compact phone bar */
  '.bsn .bslg{display:none;width:26px;height:26px;border:1.5px solid #3E4A80;grid-template-columns:15fr 25fr 49fr;grid-template-rows:58fr 42fr;grid-template-areas:"a b c" "d b c"}'+
  '.bsn .bslg i{display:block;transition:background-color .6s ease}.bsn .bslg i:nth-child(1){grid-area:a}.bsn .bslg i:nth-child(2){grid-area:d}.bsn .bslg i:nth-child(3){grid-area:b;border-left:1px solid #3E4A80}.bsn .bslg i:nth-child(4){grid-area:c;border-left:1px solid #3E4A80}'+
  '.bsn .bsa{display:none;appearance:none;-webkit-appearance:none;margin:0;border:1.5px solid #3E4A80;background:#FFFFF4;color:#3E4A80;font:700 13px/1 "Bricolage Grotesque","Hanken Grotesk",system-ui,sans-serif;width:28px;height:28px;padding:0;align-items:center;justify-content:center;border-radius:0;cursor:pointer}'+
  '.bsn .bsa small{font-size:8px;margin-left:1px;opacity:.7}'+
  '@media (max-width:999.98px){'+
    '.bsn.c .bsw .bswt{display:none}.bsn.c .bslg{display:grid}.bsn.c .bst{display:none}.bsn.c .bsa{display:flex}'+
    '.bsn.c .bsl.fr{-webkit-mask-image:linear-gradient(to right,#000 calc(100% - 26px),transparent);mask-image:linear-gradient(to right,#000 calc(100% - 26px),transparent)}'+
    '.bsn.c .bsl.fl{-webkit-mask-image:linear-gradient(to left,#000 calc(100% - 26px),transparent);mask-image:linear-gradient(to left,#000 calc(100% - 26px),transparent)}'+
    '.bsn.c .bsl.fl.fr{-webkit-mask-image:linear-gradient(to right,transparent,#000 26px,#000 calc(100% - 26px),transparent);mask-image:linear-gradient(to right,transparent,#000 26px,#000 calc(100% - 26px),transparent)}'+
  '}'+
  '@media print{.bsn,.bsn-sp{display:none}}';
  var st=D.createElement('style');st.textContent=css;D.head.appendChild(st);
  var n=D.createElement('nav');n.className='bsn';n.setAttribute('aria-label','Bare Signals');
  var bar='<span class="bsb" aria-hidden="true"><i style="flex:3;background:#E1DE62"></i><i style="flex:1;background:#FF5050"></i><i style="flex:2;background:#6777B6"></i><i style="flex:1;background:#DDD0F6"></i><i style="flex:1;background:#AACC96"></i><i style="flex:1;background:#FFA51F"></i></span>';
  var tsz='<span class="bst" role="group" aria-label="Text size"><button type="button" data-bsz="s" aria-label="Smaller text" title="Smaller text">A</button><button type="button" data-bsz="m" aria-label="Standard text" title="Standard text">A</button><button type="button" data-bsz="l" aria-label="Bigger text" title="Bigger text">A</button><button type="button" data-bsz="xl" aria-label="Large text" title="Large text">A</button><button type="button" data-bsz="xxl" aria-label="Largest text" title="Largest text">A</button></span>';
  n.innerHTML=bar+'<div class="bsi"><a class="bsw" href="/library/" aria-label="Bare Signals Library"><span class="bswt">BARE SIGNALS</span><span class="bslg" aria-hidden="true"><i></i><i></i><i></i><i></i></span></a><div class="bsl">'+L.map(function(x){return '<a href="'+x[0]+'"'+(on(x[0])?' aria-current="page"':'')+'>'+(x[2]?'<span class="lf">'+x[2]+'</span><span class="ls">'+x[1]+'</span>':x[1])+'</a>'}).join('')+'</div>'+tsz+'<button type="button" class="bsa" aria-label="Text size, tap to change">A</button></div>';
  var sp=D.createElement('div');sp.className='bsn-sp';sp.setAttribute('aria-hidden','true');
  D.body.insertBefore(sp,D.body.firstChild);D.body.insertBefore(n,sp);
  var row=n.querySelector('.bsl');

  /* text size: phone s/m/l (bs-text, default l), laptop s..xxl (bs-text-w, default l) */
  var wideQ=matchMedia('(min-width:1000px)'),wide=wideQ.matches;
  var rd=function(key,map,def){var v=def;try{v=localStorage.getItem(key)||def}catch(e){}return map[v]?v:def};
  var curN=rd('bs-text',KN,'l'),curW=rd('bs-text-w',KW,'l');
  function st_(){return wide?{key:curW,k:KW[curW],wide:true}:{key:curN,k:KN[curN],wide:false}}
  function fire(){var d=st_();R.dataset.bsText=d.key;R.style.setProperty('--bs-k',String(d.k));R.dataset.bsWide=wide?'1':'0';
    [].forEach.call(n.querySelectorAll('.bst button'),function(b){b.setAttribute('aria-pressed',String(b.dataset.bsz===d.key))});
    window.dispatchEvent(new CustomEvent('bs-text',{detail:d}));}
  function setT(v,save){if(wide){if(!KW[v])v='l';curW=v;if(save){try{localStorage.setItem('bs-text-w',v)}catch(e){}}}
    else{if(!KN[v])v='l';curN=v;if(save){try{localStorage.setItem('bs-text',v)}catch(e){}}}fire();}
  window.BS_TEXT={get:st_,set:function(v){setT(v,true)},get K(){return wide?KW:KN},KN:KN,KW:KW};
  n.querySelector('.bst').addEventListener('click',function(e){var b=e.target.closest('button');if(b)setT(b.dataset.bsz,true)});
  addEventListener('storage',function(e){if(!e.newValue)return;
    if(e.key==='bs-text'&&KN[e.newValue]&&e.newValue!==curN){curN=e.newValue;if(!wide)fire()}
    if(e.key==='bs-text-w'&&KW[e.newValue]&&e.newValue!==curW){curW=e.newValue;if(wide)fire()}});
  var onWide=function(){var w=wideQ.matches;if(w!==wide){wide=w;fire()}};
  if(wideQ.addEventListener)wideQ.addEventListener('change',onWide);else if(wideQ.addListener)wideQ.addListener(onWide);
  n.querySelector('.bsa').addEventListener('click',function(){var o=['s','m','l'],i=o.indexOf(curN);setT(o[(i+1)%3],true)});
  var bsaUpd=function(){var a=n.querySelector('.bsa');if(a)a.innerHTML='A<small>'+({s:'1',m:'2',l:'3'}[curN]||'')+'</small>'};addEventListener('bs-text',bsaUpd);
  fire();
  /* v12: the logo box cycles through the palette, one block at a time */
  (function(){var C=['#E1DE62','#FF5050','#6777B6','#DDD0F6','#AACC96','#FFA51F','#C2DCFF','#CC007E','#FFDE59','#5271FF','#F28E79','#99ACFF'],B=n.querySelectorAll('.bslg i'),k=0;
    var paint=function(){for(var j=0;j<B.length;j++)B[j].style.backgroundColor=C[(k+j*3)%C.length]};paint();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setInterval(function(){if(!document.hidden&&n.classList.contains('c')){k=(k+1)%C.length;paint()}},1100)})();
  var fade=function(){var m=row.scrollWidth-row.clientWidth;row.classList.toggle('fl',row.scrollLeft>4);row.classList.toggle('fr',m>4&&row.scrollLeft<m-4)};
  row.addEventListener('scroll',fade,{passive:true});addEventListener('resize',fade);
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',fire);
  if(D.readyState!=='complete')addEventListener('load',fire);

  /* height bookkeeping: spacer keeps the roomy height so content never jumps; --bsnav-h follows the live bar */
  var narrow=matchMedia('(max-width:999.98px)'),last=-1,h0=-1;
  function setH(){var h=n.offsetHeight;if(h!==last){last=h;R.style.setProperty('--bsnav-h',h+'px')}}
  function measure(){var c=n.classList.contains('c');if(c)n.classList.remove('c');var h=n.offsetHeight;if(c)n.classList.add('c');
    if(h!==h0){h0=h;R.style.setProperty('--bsnav-h0',h+'px')}setH()}
  function showCur(){var a=row.querySelector('a.hl:not([aria-current])')||row.querySelector('a[aria-current]');if(!a||row.scrollWidth<=row.clientWidth+1)return;
    var x=a.offsetLeft-row.offsetLeft-(row.clientWidth-a.offsetWidth)/2;row.scrollLeft=Math.max(0,x)}
  window.BS_NAV={showCurrent:showCur,el:n};
  function onScroll(){var y=window.scrollY||R.scrollTop||0,c=n.classList.contains('c'),want=narrow.matches&&(c?y>12:y>30);
    if(want!==c){n.classList.toggle('c',want);setH();if(want)showCur();fade()}}
  measure();onScroll();
  addEventListener('scroll',onScroll,{passive:true});
  addEventListener('resize',function(){measure();onScroll()});
  if(window.ResizeObserver)new ResizeObserver(function(){if(n.classList.contains('c'))setH();else measure()}).observe(n);
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(measure);
  addEventListener('load',measure);
})();
/* v14 (25 Oct 2026): every small capital tag on every page has its letters in the exact middle, equal space above and below.
   Mono uppercase tags kept the font's descender space under the letters, so on iPhones they sat low. Where the browser supports
   text-box-trim (Safari/iOS 18.2+, Chrome 133+), each tag's text box is trimmed to the capital letters and the trimmed space is given
   back as equal padding, so the tag keeps its size. Runs on load, when fonts arrive, on text size changes and when pages redraw. */
(function(){var D=document;if(!window.CSS||!CSS.supports('text-box-trim','trim-both')||!CSS.supports('text-box-edge','cap alphabetic'))return;
  var SEL='.rtg,.tagx,.bdg,.tags .t,.tags .tag,.tag,.tp,.tierb,.kl,.ms,.rb,.ev,.pt,.cc,.kw,.seg button,.tchips>span,.otag b,.rtl b,.rp-more,.wy,.tn,.back,.btn,.linkbtn,.olab .tip,.sxb a span,.rtgs,.ttag,.chip,.badge';
  var CAP={};
  function capOf(cs){var k=cs.fontFamily+'|'+cs.fontWeight;if(CAP[k])return CAP[k];var p=D.createElement('div');p.textContent='H';
    p.style.cssText='position:absolute;visibility:hidden;left:-999px;top:0;display:block;line-height:2;padding:0;border:0;font-size:100px;text-box-trim:trim-both;text-box-edge:cap alphabetic';
    p.style.fontFamily=cs.fontFamily;p.style.fontWeight=cs.fontWeight;D.body.appendChild(p);var h=p.getBoundingClientRect().height/100;p.remove();if(h>.4&&h<1)CAP[k]=h;return h>.4&&h<1?h:0}
  var G='';function fix(el){if(el.dataset.cpg===G)return;if(el.closest('svg'))return;var tt=el.dataset.cp;var cs;
    if(tt===undefined){cs=getComputedStyle(el);if(cs.textTransform!=='uppercase')return void(el.dataset.cp='x');
      if(/^(inline|table-cell|table-row|contents|none)$/.test(cs.display))return void(el.dataset.cp='x');
      if(/flex|grid/.test(cs.display)){if(el.children.length)return void(el.dataset.cp='x');el.style.setProperty('display',/inline/.test(cs.display)?'inline-block':'block','important');el.style.setProperty('text-align',cs.justifyContent==='center'?'center':cs.textAlign,'important')}
      el.dataset.cp=parseFloat(cs.paddingTop)+','+parseFloat(cs.paddingBottom);tt=el.dataset.cp}
    if(tt==='x'){el.dataset.cpg=G;return}cs=cs||getComputedStyle(el);var fs=parseFloat(cs.fontSize);if(!fs)return;
    var key=fs+'|'+cs.lineHeight;if(el.dataset.cpk===key)return;
    var cap=capOf(cs);if(!cap)return;var lh=parseFloat(cs.lineHeight);if(isNaN(lh))lh=fs*1.32;var pp=tt.split(',');
    /* a symbol in the tag (▲, ✓) can make its line taller than the line-height: keep that height too */
    if(el.dataset.cr===undefined&&!el.dataset.cpk){var ch=el.clientHeight-(+pp[0])-(+pp[1]);if(ch>0)el.dataset.cr=(ch/fs).toFixed(4)}
    var cr=el.dataset.cr?+el.dataset.cr*fs:0,one=lh;if(cr&&cr<lh*1.6)one=Math.max(lh,cr);
    var add=Math.max(0,(one-cap*fs)/2);
    el.style.setProperty('text-box-trim','trim-both','important');el.style.setProperty('text-box-edge','cap alphabetic','important');
    el.style.setProperty('padding-top',(+pp[0]+add).toFixed(2)+'px','important');el.style.setProperty('padding-bottom',(+pp[1]+add).toFixed(2)+'px','important');
    el.dataset.cpk=key;el.dataset.cpg=G}
  var q=0;function run(){q=0;G=(D.documentElement.style.getPropertyValue('--bs-k')||'')+'|'+innerWidth+'|'+(D.documentElement.getAttribute('data-bs-text')||'');var L=D.querySelectorAll(SEL);for(var i=0;i<L.length;i++)fix(L[i])}
  function soon(){if(!q)q=setTimeout(run,40)}
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',run);else run();
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(function(){CAP={};D.querySelectorAll('[data-cpk]').forEach(function(e){delete e.dataset.cpk;delete e.dataset.cpg});run()});
  addEventListener('bs-text',function(){setTimeout(run,30)});addEventListener('load',run);var rz;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(run,150)});
  new MutationObserver(soon).observe(D.documentElement,{childList:true,subtree:true});
})();
/* v15 (25 Oct 2026): set text like a book on every page. A number never leaves its unit (1–2 h, 250 mcg, 8–12 wk); a line never ends
   with one short word left alone below it; short labels and cells break at their commas and dots, so "Pro-Hyp peaks in blood at 1–2 h,"
   sits on one line and "gone by ~12 h" on the next, never "… ~12" then "h". Paragraphs use the browser's pretty wrapping where it exists. */
(function(){var D=document;
  var st=D.createElement('style');st.textContent='p,li,dd,td,th,blockquote,figcaption{text-wrap:pretty}h1,h2,h3,h4,h5{text-wrap:balance}bs-ph{display:inline-block;text-indent:0;font:inherit;color:inherit;letter-spacing:inherit;text-transform:inherit}';
  (D.head||D.documentElement).appendChild(st);
  var NB=' ',UNIT=/(\d|~)[  ]+(mg|mcg|µg|μg|ng|g|kg|mL|ml|L|IU|iu|U|units?|h|hr|hrs|hours?|min|mins|minutes?|s|sec|d|days?|wk|wks|weeks?|mo|months?|yrs?|years?|x|×|%|°C|g\/mol|kDa|AA|amino)(?![\w])/g;
  var SKIP={SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,CODE:1,PRE:1,SVG:1,svg:1,title:1,text:1,tspan:1,OPTION:1,SELECT:1};
  var BLK=/^(P|LI|DD|DT|TD|TH|H1|H2|H3|H4|H5|BLOCKQUOTE|FIGCAPTION|SUMMARY|LABEL)$/;
  var done=new WeakSet(),BC=new WeakMap();
  function glue(t){if(done.has(t))return;done.add(t);var v=t.nodeValue;if(!v||v.length<3||!/\d/.test(v))return;var w=v.replace(UNIT,function(m,a,u){return a+NB+u}).replace(/(\d)([\u2013-])(?=\d)/g,'$1$2\u2060').replace(/\b([A-Za-z]{2,5})-(?=[A-Z0-9]{1,2}\b)/g,'$1-\u2060').replace(/(\d\s?[×x])[ ](daily|weekly|monthly|a day|a week|per)/g,'$1'+NB+'$2');if(w!==v)t.nodeValue=w}
  function blockOf(el){while(el&&el!==D.body){var d=getComputedStyle(el).display;if(d==='none')return null;if(d!=='inline'&&d!=='contents')return /^(BUTTON|A|SELECT|svg)$/.test(el.nodeName)?null:el;el=el.parentElement}return null}
  /* the last short word of a block holds on to the word before it */
  function widow(el){if(el.dataset.bsw||el.closest('.tl,[data-nofit]'))return;el.dataset.bsw=1;var txt=el.textContent;if(txt.length<12)return;var words=txt.trim().split(/[ \t\n]+/);if(words.length<3)return;
    var tw=D.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),n,last=null;while(n=tw.nextNode()){if(n.nodeValue.trim())last=n}if(!last)return;
    if(last.parentElement&&last.parentElement.closest('bs-ph,button,a.bmore'))return;
    var v=last.nodeValue.replace(/\s+$/,''),i=v.lastIndexOf(' ');if(i<1)return;var tail=v.slice(i+1);if(tail.replace(/[^\wÀ-￿]/g,'').length>14)return;
    last.nodeValue=v.slice(0,i)+NB+tail+last.nodeValue.slice(v.length)}
  /* short labels and cells: keep each phrase between commas or dots together */
  function phrase(el){if(el.dataset.bsp||el.children.length||el.closest('.tl,[data-nofit]'))return;el.dataset.bsp=1;var v=el.textContent;if(v.length<14||v.length>90||!/(, |; | · )/.test(v))return;
    for(var a=el,k=0;a&&k<3;a=a.parentElement,k++){var c=getComputedStyle(a);if(/nowrap/.test(c.whiteSpace)||c.textOverflow==='ellipsis'||(+c.webkitLineClamp>0))return}
    var parts=v.split(/(?<=, |; | · )/);if(parts.length<2)return;el.textContent='';parts.forEach(function(p,k){var s=D.createElement('bs-ph');var tr=k<parts.length-1?p.replace(/ $/,''):p;s.textContent=tr;el.appendChild(s);if(k<parts.length-1)el.appendChild(D.createTextNode(' '))})}
  var PH='.dtf,.dtw,td,th,dd,.cells b,.hdc b,.drow b,.dfl b,.dt65 td,.cell b,.dc b,.tf,.d-o,.bwf,.f,.tw,.tt';
  function scan(root){if(!root||root.nodeType!==1&&root.nodeType!==9)return;var base=root.nodeType===9?root.body:root;if(!base)return;
    if(base.closest&&base.closest('svg'))return;
    var tw=D.createTreeWalker(base,NodeFilter.SHOW_TEXT,{acceptNode:function(t){var p=t.parentNode;return p&&!SKIP[p.nodeName]&&!(p.closest&&p.closest('svg'))?1:3}}),t,blocks=new Set();
    while(t=tw.nextNode()){glue(t);var pe=t.parentElement;if(!pe||!t.nodeValue.trim())continue;var b=BC.get(pe);if(b===undefined){b=BLK.test(pe.nodeName)?pe:blockOf(pe);BC.set(pe,b||null)}if(b)blocks.add(b)}
    var L=base.querySelectorAll?base.querySelectorAll(PH):[];for(var i=0;i<L.length;i++)phrase(L[i]);if(base.matches&&base.matches(PH))phrase(base);
    base.querySelectorAll&&base.querySelectorAll('p,li,dd,td,th,h2,h3,h4,.para,.rds,.mt,.lead2,.punch,.psL,.psum').forEach(function(b){blocks.add(b)});
    blocks.forEach(widow)}
  var pend=[],tm=0;function flush(){tm=0;var P=pend;pend=[];if(P.indexOf(D)>-1){scan(D);return}P.forEach(function(n){if(n.isConnected)scan(n)})}
  function go(n){pend.push(n);if(!tm)tm=setTimeout(flush,30)}
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',function(){go(D)});else go(D);
  new MutationObserver(function(R){R.forEach(function(r){r.addedNodes.forEach(function(n){if(n.nodeType===1)go(n);else if(n.nodeType===3&&n.parentElement)go(n.parentElement)})})}).observe(D.documentElement,{childList:true,subtree:true,characterData:false});
})();
