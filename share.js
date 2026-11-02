/* Bare Signals share v3 (2 Nov 2026): Share is a quiet word, not a boxed icon. On goal pages it sits next to the page title (no top-bar button there); elsewhere the top-bar version is the plain word. The bottom button is lighter and sits above the Glossary. v2 kept at /share/v2.js.
   Bare Signals share v2 (2 Nov 2026): section share marks removed (they confused what was being shared); a second Share this page button sits at the bottom of goal pages. Both share the whole page. v1 kept at /share/v1.js.
   Bare Signals share v1 (2 Nov 2026): a Share button in the top bar of every page, plus a small share mark on each section heading
   (section[id] > h2). On iPhone it opens the phone's own share sheet; elsewhere it copies the link and says so.
   Links always point at the live page, never a frozen version folder (/v7/ is dropped), so a friend gets the newest read.
   Guide: when a compound is open on the body map the link is /?p=<slug>, and opening that link opens the same compound.
   Library: the #/p/<slug> part is kept, so the exact compound card or full page opens. Loaded by nav.js. */
(function(){
  if(window.BS_SHARE_ON)return;window.BS_SHARE_ON=1;
  var D=document,P=location.pathname,O=location.origin;
  var ICO='<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M10 2.5v10M6.2 6.2 10 2.5l3.8 3.7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/><path d="M6.5 9H4v8.5h12V9h-2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  var css=
  '.bssh{appearance:none;-webkit-appearance:none;margin:0;border:0;background:none;color:#6B76A8;height:28px;padding:0 2px;display:flex;align-items:center;justify-content:center;border-radius:0;cursor:pointer;flex:none;font:500 10.5px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase}'+
  '.bssht{appearance:none;-webkit-appearance:none;border:0;background:none;padding:0;margin:0 0 0 12px;cursor:pointer;font:500 calc(10.5px*var(--k,1))/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#6B76A8;vertical-align:middle;text-decoration:underline;text-decoration-color:rgba(107,118,168,.35);text-underline-offset:3px}.bssht:hover{color:#3E4A80}'+
  '.bssh:hover{color:#3E4A80}.bssh:focus-visible{outline:2px solid #DB6830;outline-offset:1px}'+
  '@media (max-width:999.98px){.bsn .bssh{font-size:9.5px;letter-spacing:.03em;padding:0}.bsn.lib .bsi.hs,.bsn.c .bsi.hs{column-gap:6px}.bsn .bsi.hs{grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:"w l s"}.bsn.lib .bsi.hs,.bsn.c .bsi.hs{grid-template-columns:auto minmax(0,1fr) auto auto;grid-template-areas:"w l t s"}.bsn .bssh{grid-area:s}}'+
  '.bsshs{all:unset;cursor:pointer;display:inline-flex;vertical-align:-2px;margin-left:8px;color:#6777B6;opacity:.8}.bsshs:hover{opacity:1}.bsshs svg{width:.95em;height:.95em}.bsshs:focus-visible{outline:2px solid #DB6830;outline-offset:2px}'+
  '.bstoast{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:99999;background:#3E4A80;color:#FFFFE2;font:500 12px/1.3 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.04em;padding:9px 12px;max-width:calc(100vw - 32px);box-sizing:border-box;text-align:center;pointer-events:none;opacity:0;transition:opacity .2s}.bstoast.on{opacity:1}'+
  '.bsshb{appearance:none;-webkit-appearance:none;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin:14px 0 4px;padding:10px;border:0;background:#F2F0CC;color:#3E4A80;font:500 11px/1 "JetBrains Mono",ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;border-radius:0}.bsshb:hover{background:#E9E6B8}.bsshb svg{width:13px;height:13px}'+
  '@media print{.bssh,.bsshb,.bstoast{display:none!important}}';
  function addCss(){if(D.getElementById('bssh-css'))return;var s=D.createElement('style');s.id='bssh-css';s.textContent=css;D.head.appendChild(s)}
  /* the live address of this page, version folders removed */
  function base(){var p=P.replace(/index\.html$/,'');
    if(/^\/home\/[a-z]?\d+\/$/.test(p))return '/';
    p=p.replace(/\/v\d+\/$/,'/');return p}
  function name(){return (D.title||'Bare Signals').replace(/\s*[·|]\s*Bare Signals\s*$/i,'').trim()||'Bare Signals'}
  function isHome(){return base()==='/'}
  function target(){var b=base(),h=location.hash||'';
    if(isHome()){var c=D.querySelector('#list .cchip[aria-pressed="true"]');
      if(c)return{url:O+'/?p='+encodeURIComponent(c.dataset.s),title:c.textContent.replace(/⁠/g,'').trim()+' · Bare Signals body map'};
      return{url:O+'/',title:'Bare Signals body map'}}
    if(b==='/library/'){var m=h.match(/^#\/(p\/)?([^/?#]+)$/),t=name();
      if(m&&!/^(c|t|d)$/.test(m[2])){var hd=D.querySelector('.fp65 h1,.fp65 h2,#cardwrap:not([hidden]) .card h2,#cardwrap:not([hidden]) .card h3');if(hd&&hd.textContent.trim())t=hd.textContent.trim()+' · Bare Signals Library'}
      return{url:O+b+h,title:t}}
    return{url:O+b+h,title:name()}}
  var tt=0;function toast(msg){var e=D.querySelector('.bstoast');if(!e){e=D.createElement('div');e.className='bstoast';e.setAttribute('role','status');D.body.appendChild(e)}e.textContent=msg;e.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){e.classList.remove('on')},2200)}
  function copy(u){if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(u);
    return new Promise(function(ok,no){try{var a=D.createElement('textarea');a.value=u;a.setAttribute('readonly','');a.style.cssText='position:fixed;left:-9999px';D.body.appendChild(a);a.select();var r=D.execCommand('copy');a.remove();r?ok():no()}catch(e){no(e)}})}
  function share(t){window.BS_LAST_SHARE=t;
    if(navigator.share&&(navigator.maxTouchPoints>0||/Mac|iPhone|iPad/.test(navigator.platform||''))){navigator.share({title:t.title,url:t.url}).catch(function(e){if(e&&e.name!=='AbortError')copy(t.url).then(function(){toast('Link copied')},function(){toast(t.url)})});return}
    copy(t.url).then(function(){toast('Link copied · '+t.url.replace(/^https?:\/\//,''))},function(){toast(t.url)})}
  function bar(){var h1=D.querySelector('.hd h1');
    if(h1){if(!h1.parentNode.querySelector('.bssht')){var t=D.createElement('button');t.type='button';t.className='bssht';t.textContent='Share';t.setAttribute('aria-label','Share this page');t.addEventListener('click',function(){share(target())});h1.insertAdjacentElement('afterend',t);var p=h1.parentNode;if(getComputedStyle(h1).display==='block'){h1.style.display='inline';}}return}
    var n=D.querySelector('.bsn .bsi');if(!n||n.querySelector('.bssh'))return;
    var b=D.createElement('button');b.type='button';b.className='bssh';b.setAttribute('aria-label','Share this page');b.title='Share this page';b.textContent='Share';
    b.addEventListener('click',function(){share(target())});n.appendChild(b);n.classList.add('hs')}
  function sections(){if(isHome()||base()==='/library/')return;if(!D.querySelector('section.sec')||D.querySelector('.bsshb'))return;
    var w=D.querySelector('.w')||D.body,b=D.createElement('button');b.type='button';b.className='bsshb';b.innerHTML=ICO+'<span>Share this page</span>';
    b.addEventListener('click',function(){share(target())});var gl=D.getElementById('glossary');if(gl)gl.parentNode.insertBefore(b,gl);else w.appendChild(b)}
  /* Guide: /?p=<slug> opens that compound */
  function openFromLink(){if(!isHome())return;var s=new URLSearchParams(location.search).get('p');if(!s)return;var n=0;
    (function tryOpen(){var c=D.querySelector('#list .cchip[data-s="'+(window.CSS&&CSS.escape?CSS.escape(s):s)+'"]');
      if(c){if(c.getAttribute('aria-pressed')!=='true'){try{sessionStorage.setItem('bs-home-intro','1')}catch(e){}c.click()}return}
      if(++n<60)setTimeout(tryOpen,100)})()}
  function start(){addCss();bar();sections();openFromLink();
    var k=0;new MutationObserver(function(){clearTimeout(k);k=setTimeout(function(){bar();sections()},120)}).observe(D.body,{childList:true,subtree:true})}
  if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
})();
