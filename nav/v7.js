/* Bare Signals site navigation v7: adds Made (/made/) after Aminos; v6 kept at /nav/v6.js. Previously v6: one boxed bar shared by every page. Include with <script src="/nav.js" defer></script>. v6 adds the site-wide extras every page gets without touching it: the tracking helper (/track.js, GoatCounter site code set in BS_GC below), favicon and home-screen icon, web app manifest and the cream theme colour. v5 (full labels on wide screens) kept at /nav/v5.js; v1 to v4 in /nav/. */
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
  var P=location.pathname;
  var L=[['/library/','Library'],['/dosage/','Dosage'],['/blood/','Blood','Blood Work'],['/supplements/','Supps','Supplements'],['/aminos/','Aminos'],['/made/','Made'],['/draw/','Calculator']];
  var on=function(h){return P.indexOf(h)===0};
  var css='.bsn{position:relative;z-index:30;background:#FFFFE2;border-bottom:1.5px solid #3E4A80;font-family:"JetBrains Mono",ui-monospace,Menlo,monospace}'+
  '.bsn .bsb{display:flex;height:5px}.bsn .bsb i{display:block}'+
  '.bsn .bsi{max-width:1300px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:9px max(16px,env(safe-area-inset-left,0px))}'+
  '.bsn .bsw{font:700 15px/1 "Bricolage Grotesque","Hanken Grotesk",system-ui,sans-serif;letter-spacing:.06em;color:#3E4A80;text-decoration:none;white-space:nowrap;flex:none;border:0}'+
  '.bsn .bsl{display:flex;margin-left:auto;border:1.5px solid #3E4A80;background:#FFFFF4}'+
  '.bsn .bsl a{font:500 11px/1 "JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#3E4A80;text-decoration:none;padding:8px 13px;border:0;border-right:1.5px solid #3E4A80;white-space:nowrap;text-align:center}'+
  '.bsn .bsl a:last-child{border-right:0}'+
  '.bsn .bsl a:hover{background:#F2F0CC}'+
  '.bsn .bsl a[aria-current="page"]{background:#3E4A80;color:#FFFFE2}'+
  '@media (max-width:560px){.bsn .bsi{flex-wrap:wrap;gap:7px;padding-top:7px;padding-bottom:8px}.bsn .bsw{font-size:13px}.bsn .bsl{width:100%;margin-left:0}.bsn .bsl a{flex:1 1 auto;min-width:0;padding:8px 4px;font-size:10px;letter-spacing:.04em}}'+
  '@media (max-width:380px){.bsn .bsl a{padding:8px 3px;font-size:9px;letter-spacing:.02em}}'+
  '.bsn .ls{display:none}@media (max-width:1050px){.bsn .lf{display:none}.bsn .ls{display:inline}}'+
  '@media print{.bsn{display:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var n=document.createElement('nav');n.className='bsn';n.setAttribute('aria-label','Bare Signals');
  var bar='<span class="bsb" aria-hidden="true"><i style="flex:3;background:#E1DE62"></i><i style="flex:1;background:#FF5050"></i><i style="flex:2;background:#6777B6"></i><i style="flex:1;background:#DDD0F6"></i><i style="flex:1;background:#AACC96"></i><i style="flex:1;background:#FFA51F"></i></span>';
  n.innerHTML=bar+'<div class="bsi"><a class="bsw" href="/">BARE SIGNALS</a><div class="bsl">'+L.map(function(x){return '<a href="'+x[0]+'"'+(on(x[0])?' aria-current="page"':'')+'>'+(x[2]?'<span class="lf">'+x[2]+'</span><span class="ls">'+x[1]+'</span>':x[1])+'</a>'}).join('')+'</div></div>';
  document.body.insertBefore(n,document.body.firstChild);
})();
