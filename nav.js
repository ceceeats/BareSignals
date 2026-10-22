/* Bare Signals site navigation: one bar shared by every page. Include with <script src="/nav.js" defer></script>. */
(function(){
  if(document.querySelector('.bsn'))return;
  var P=location.pathname;
  var L=[['/','Home'],['/library/','Library'],['/aminos/','Aminos'],['/dosage/','Dosage'],['/draw/','Calculator']];
  var on=function(h){return h==='/'?(P==='/'||P==='/index.html'):P.indexOf(h)===0};
  var css='.bsn{position:relative;z-index:30;background:#FFFFE2;border-bottom:1.5px solid #3E4A80;font-family:"JetBrains Mono",ui-monospace,Menlo,monospace}'+
  '.bsn .bsb{display:flex;height:5px}.bsn .bsb i{display:block}'+
  '.bsn .bsi{max-width:1300px;margin:0 auto;display:flex;align-items:center;gap:14px;padding:8px max(16px,env(safe-area-inset-left,0px))}'+
  '.bsn .bsw{font:700 15px/1 "Bricolage Grotesque","Hanken Grotesk",system-ui,sans-serif;letter-spacing:.06em;color:#3E4A80;text-decoration:none;white-space:nowrap;flex:none;border:0}'+
  '.bsn .bsl{display:flex;gap:4px;margin-left:auto;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}'+
  '.bsn .bsl::-webkit-scrollbar{display:none}'+
  '.bsn .bsl a{font:500 11px/1 "JetBrains Mono",ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;color:#3E4A80;text-decoration:none;padding:7px 8px;border:1.5px solid transparent;white-space:nowrap}'+
  '.bsn .bsl a:hover{border-color:#3E4A80}'+
  '.bsn .bsl a[aria-current="page"]{background:#3E4A80;color:#FFFFE2;border-color:#3E4A80}'+
  '.bsn .bsl a.home{display:none}'+
  '@media (max-width:560px){.bsn .bsi{flex-wrap:wrap;gap:6px;padding-top:7px;padding-bottom:7px}.bsn .bsw{font-size:13px}.bsn .bsl{width:100%;margin-left:0;gap:3px}.bsn .bsl a{flex:1;text-align:center;padding:6px 2px;font-size:10px;letter-spacing:.05em}}'+
  '@media print{.bsn{display:none}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var n=document.createElement('nav');n.className='bsn';n.setAttribute('aria-label','Bare Signals');
  var bar='<span class="bsb" aria-hidden="true"><i style="flex:3;background:#E1DE62"></i><i style="flex:1;background:#FF5050"></i><i style="flex:2;background:#6777B6"></i><i style="flex:1;background:#DDD0F6"></i><i style="flex:1;background:#AACC96"></i><i style="flex:1;background:#FFA51F"></i></span>';
  n.innerHTML=bar+'<div class="bsi"><a class="bsw" href="/">BARE SIGNALS</a><div class="bsl">'+L.map(function(x){return '<a href="'+x[0]+'"'+(x[0]==='/'?' class="home"':'')+(on(x[0])?' aria-current="page"':'')+'>'+x[1]+'</a>'}).join('')+'</div></div>';
  document.body.insertBefore(n,document.body.firstChild);
  var cur=n.querySelector('[aria-current]');if(cur&&cur.scrollIntoView)try{n.querySelector('.bsl').scrollLeft=cur.offsetLeft-40}catch(e){}
})();
