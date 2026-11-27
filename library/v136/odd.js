/* Random facts v1 (27 Nov 2026, Library v133): a short "Random facts" section in the Full read, after Where it comes from.
   Data: BS_ODD[slug] = [[headline, text, tag, source title, source url], ...]. Tags as the rest of the Library:
   verified = primary source read; reported = secondary source. Any compound can get facts by adding a key here. */
window.BS_ODD={
 "adderall":[
  ["It began as a 1960s diet pill with meth in it","Adderall’s formula was approved in 1960 as Obetrol, a weight-loss pill. Two of its four salts were methamphetamine; they were swapped for amphetamine salts in the 1970s, and the pill was renamed Adderall for ADHD in 1996.","verified","Obetrol (Wikipedia, citing the 1972 Physicians’ Desk Reference)","https://en.wikipedia.org/wiki/Obetrol"],
  ["Andy Warhol’s drug of choice","Warhol was prescribed Obetrol in 1963 and kept taking it. He was on his way to pick up a refill the morning he was shot in 1968.","reported","Dazed, a brief history of diet pills","https://www.dazeddigital.com/beauty/article/58533/1/brief-history-diet-pills-weight-loss-drugs-ozempic-obetrol-fenphen-benzedrine"],
  ["The mathematician who won $500 and lost a month","Friends bet Paul Erdős, the most prolific mathematician in history, $500 that he couldn’t stop stimulants for a month. He won, then told them they had set mathematics back a month, and went straight back on.","reported","Bellevue College maths department, Paul Erdős","https://www.bellevuecollege.edu/math/?p=79"],
  ["Bomber pilots’ “go pills”","On B-2 missions over Iraq in 2003, pilots on the shorter flights took dextroamphetamine, Adderall’s main ingredient, on 97% of sorties. On the 35-hour flights they napped instead and used it on 58%.","verified","Kenagy 2004, Aviat Space Environ Med","https://pubmed.ncbi.nlm.nih.gov/15152888/"],
  ["Benzedrine never really left","Benzedrine, the 1930s inhaler and pill, was a 50:50 mix of the two amphetamine mirror images. The same mix came back in 2012 as the prescription drug Evekeo.","verified","Evekeo label and amphetamine history (Wikipedia)","https://en.wikipedia.org/wiki/Levoamphetamine"],
  ["Its cousin Vyvanse is locked until your blood opens it","Vyvanse is amphetamine bolted to the amino acid lysine, and does nothing until enzymes inside red blood cells cut it free. In animal tests, snorting or injecting it gave no faster effect.","verified","Hutson 2014, Neuropharmacology","https://pubmed.ncbi.nlm.nih.gov/24594478/"],
  ["It helped rats recover from stroke, not people","From the 1980s, amphetamine plus training sped recovery in brain-injured rats. Ten small human trials could not show the same, and it raised blood pressure by about 9 mmHg.","verified","Cochrane review, amphetamines after stroke","https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD002090.pub2/full"],
  ["Japan bans it, even with a prescription","Amphetamine is a banned stimulant in Japan with no medical import route. Vyvanse is allowed in with a permit, and has been sold there since 2019.","verified","Japan Ministry of Health, bringing medicines into Japan","https://www.ncd.mhlw.go.jp/en/application2.html"],
  ["Illegal in Bali, while Concerta is on pharmacy shelves","A Bali prosecutor told the court amphetamine ADHD pills are illegal in Indonesia with no exceptions. Methylphenidate (Concerta) is sold here on prescription.","reported","AP via Macau Daily Times; Alodokter, Concerta","https://macaudailytimes.com.mo/trial-opens-in-bali-for-us-man-charged-with-receiving-illegal-adhd-pills.html"]
 ]
};
(function(){
var CSS='.k-odd .t65 small{font:500 calc(10.5px*var(--k,1))/1 var(--mono);letter-spacing:.06em;color:#6B76A8;margin-left:6px}'+
'.odd133{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr;gap:0}'+
'.odd133 li{padding:8px 0 9px;border-top:1.5px solid #E3E0BF;display:grid;grid-template-columns:22px 1fr;gap:0 6px}'+
'.odd133 li:last-child{border-bottom:1.5px solid #E3E0BF}'+
'.odd133 .on{font:700 calc(12px*var(--k,1))/1.45 var(--mono);color:#6B76A8}'+
'.odd133 b{display:block;font:700 calc(14.5px*var(--k,1))/1.3 var(--body);margin:0 0 2px}'+
'.odd133 p{margin:0;font-size:calc(13.5px*var(--k,1));line-height:1.45}'+
'.odd133 .os{margin:3px 0 0;font:500 calc(10.5px*var(--k,1))/1.4 var(--mono);color:#6B76A8;letter-spacing:.02em}'+
'.odd133 .os a{color:#2F5BE0;text-decoration:underline;text-underline-offset:2px}'+
'.odd133 .os i{font-style:normal;text-transform:uppercase;letter-spacing:.06em;margin-right:5px}'+
'.rodd133 .c65{max-width:none}'+
'@media (min-width:900px){.odd133{grid-template-columns:1fr 1fr 1fr;column-gap:24px}.odd133 li{border-bottom:0}.odd133 li:nth-last-child(-n+3){border-bottom:1.5px solid #E3E0BF}}';
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function add(){var pv=document.getElementById('pagev');if(!pv||pv.hidden)return;var m=location.hash.match(/^#\/p\/(.+)$/);if(!m)return;
 var s=decodeURIComponent(m[1]),F=(window.BS_ODD||{})[s];if(!F||!F.length)return;var fp=pv.querySelector('.fp65');if(!fp||fp.querySelector('.k-odd'))return;
 if(!document.getElementById('odd133-css')){var st=document.createElement('style');st.id='odd133-css';st.textContent=CSS;document.head.appendChild(st)}
 var w=document.createElement('div');w.className='r65 rodd133';w.style.setProperty('--nc','1');
 w.innerHTML='<div class="c65"><section class="s65 k-odd"><h2 class="t65">Random facts <small>'+F.length+'</small></h2><ol class="odd133">'+
  F.map(function(f,i){return '<li><span class="on">'+(i+1)+'</span><div><b>'+esc(f[0])+'</b><p>'+esc(f[1])+'</p><p class="os"><i>'+esc(f[2])+'</i><a href="'+esc(f[4])+'" target="_blank" rel="noopener">'+esc(f[3])+'</a></p></div></li>'}).join('')+'</ol></section></div>';
 var r5=fp.querySelector('.r65.r5');if(r5&&r5.nextSibling)fp.insertBefore(w,r5.nextSibling);else{var dp=fp.querySelector('.rdeep123b');if(dp)fp.insertBefore(w,dp);else fp.appendChild(w)}}
var mo=new MutationObserver(function(){add()});
function start(){var pv=document.getElementById('pagev');if(pv)mo.observe(pv,{childList:true,subtree:false});add()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
addEventListener('hashchange',function(){setTimeout(add,0)})})();
