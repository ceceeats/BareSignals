/* Bare Signals site navigation v3: one boxed bar shared by every page. Include with <script src="/nav.js" defer></script>. v1 and v2 kept at /nav/v1.js and /nav/v2.js. */
(function(){
  if(document.querySelector('.bsn'))return;
  var P=location.pathname;
  var L=[['/library/','Library'],['/dosage/','Dosage'],['/blood/','Blood'],['/aminos/','Aminos'],['/draw/','Calculator']];
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
  '@media (max-width:560px){.bsn .bsi{flex-wrap:wrap;gap:7px;padding-top:7px;padding-bottom:8px}.bsn .bsw{font-size:13px}.bsn .bsl{width:100%;margin-left:0}.bsn .bsl a{flex:1 1 0;min-width:0;padding:8px 2px;font-size:10px;letter-spacing:.04em}}'+
  '@media print{.bsn{display:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var n=document.createElement('nav');n.className='bsn';n.setAttribute('aria-label','Bare Signals');
  var bar='<span class="bsb" aria-hidden="true"><i style="flex:3;background:#E1DE62"></i><i style="flex:1;background:#FF5050"></i><i style="flex:2;background:#6777B6"></i><i style="flex:1;background:#DDD0F6"></i><i style="flex:1;background:#AACC96"></i><i style="flex:1;background:#FFA51F"></i></span>';
  n.innerHTML=bar+'<div class="bsi"><a class="bsw" href="/">BARE SIGNALS</a><div class="bsl">'+L.map(function(x){return '<a href="'+x[0]+'"'+(on(x[0])?' aria-current="page"':'')+'>'+x[1]+'</a>'}).join('')+'</div></div>';
  document.body.insertBefore(n,document.body.firstChild);
})();
