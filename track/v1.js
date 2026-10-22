/* Bare Signals tracking v1. Loaded by nav.js on every page. Counts page opens (one row per path, so every version shows separately) and named actions via window.bsTrack(name, title). Cookie-free, no personal data: GoatCounter sees the path, the action name, device type and country, never who. Nothing loads until the site code is set in nav.js (window.BS_GC). Actions fired before the counter is ready are queued and sent when it loads. */
(function(){
  var code=window.BS_GC||'';
  var q=[];
  function flush(){
    if(!(window.goatcounter&&window.goatcounter.count))return;
    while(q.length){var e=q.shift();try{window.goatcounter.count({path:'ev:'+e[0],title:e[1]||e[0],event:true})}catch(x){}}
  }
  window.bsTrack=function(name,title){
    if(!name)return;
    q.push([String(name).slice(0,120),title?String(title).slice(0,120):'']);
    flush();
  };
  if(!code)return;
  var s=document.createElement('script');
  s.async=true;
  s.src='https://gc.zgo.at/count.js';
  s.setAttribute('data-goatcounter','https://'+code+'.goatcounter.com/count');
  s.onload=flush;
  document.head.appendChild(s);
})();
