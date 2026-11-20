"""Writes /search.js v2 (20 Nov 2026): the shared search for every search bar on baresignals.co.
v1 kept at /search/v1.js. Word lists live in tools/search_words_lists.py (one place for the whole site)."""
import os, sys, json, shutil
R = '/home/claude/baresignals'; os.chdir(R); sys.path.insert(0, 'tools')
import importlib, search_words_lists as W
importlib.reload(W)
os.makedirs('search', exist_ok=True)
if not os.path.exists('search/v1.js'): shutil.copy('search.js', 'search/v1.js')
JS = r"""/* Bare Signals shared search v2 (20 Nov 2026, v1 kept at /search/v1.js): one search for every search bar on the site
   (Guide, Library, Supplements, Cases, Goals, Dosage, Blood, Protocol, Aminos). Same name-first ranking as v1, plus:
   - reads what people type: everyday phrases mapped to the site's words ("lose weight", "low t", "can't sleep"),
     filler words dropped ("best peptide for skin" > skin), every remaining word must match;
   - word families (hormone also finds testosterone, estrogen, thyroid...; eczema finds dermatitis, itch...);
   - a word only mentioned as a side effect ("acne, headache, water retention") ranks low, never above what treats it;
   - short words match whole words only ("ear" never matches "year");
   - text matches stay listed under name matches (only 1 to 3 letter non-words still filter to names).
   - soft words (pain, health, problem, relief) add to a match but never sink one ("my knees hurt" finds knee).
   - every page also reads the Library's full index (/library/sx.js, loaded once after the page opens), so the Guide and Dosage
     find a compound by what it helps even when their own card text is short.
   Word lists: tools/search_words_lists.py. BS_WORDS: parse(raw), fam(word), hit(text, word) for pages with their own index.
   Use: BS_SEARCH.rank(name, alias, rest, query) · BS_SEARCH.best(scores) · BS_SEARCH.norm(text) */
(function(){
  var STOP=new Set(%(stop)s),PHR=%(phr)s,FAM=%(fam)s;
  var SOFT=new Set(['pain','health','problem','problems','issue','issues','relief','healthy','recovery']);
  var PK=Object.keys(PHR).sort(function(a,b){return b.length-a.length});
  var AFTER=/^[\s-]*(flares?|breakouts?|like breakouts?|eruptions?)?\s*(reported|are common|is common|common complaint)/,BEFORE=/(can|may|might) cause[a-z ]{0,12}$|causes?[a-z ]{0,8}$|plus[a-z ,]{0,20}$/;
  var SIDE=/side.?effect|adverse|flare|concern|complain|worsen|trigger|dropout|retention|nausea|downside|\bplus\b|\bbut\b.{0,12}(also|can)/;
  var norm=function(x){return String(x||'').toLowerCase().replace(/[\u00ad\u2060\u200b]/g,'').replace(/[\s\-–—()+.,'’/]/g,'')};
  var SPLIT=/[\s\-–—+/(),;·&]+/;
  var words=function(x){return String(x||'').toLowerCase().split(SPLIT).map(norm).filter(Boolean)};
  var stem=function(w){return w.replace(/ies$/,'y').replace(/(al|es|s)$/,'')};
  function parse(raw){var t=' '+String(raw||'').toLowerCase().replace(/[’`]/g,"'").replace(/[?!.,;:]+/g,' ').replace(/\s+/g,' ').trim()+' ',out=[];
    PK.forEach(function(k){if(t.indexOf(' '+k+' ')>=0){out.push(PHR[k]);t=t.split(' '+k+' ').join(' ')}});
    t.trim().split(/[^a-z0-9α-ωβ+\-']+/).forEach(function(w){w=w.replace(/'s$/,'');if(w&&w.length>1&&!STOP.has(w))out.push(PHR[w]||w)});
    return out.filter(function(x,i){return out.indexOf(x)===i})}
  function fam(raw){var q=String(raw||'').toLowerCase().trim().replace(/\s+/g,' ');if(!q)return [];var s=stem(q);
    var k=FAM[q]?q:FAM[s]?s:Object.keys(FAM).filter(function(k){return stem(k)===s})[0];
    var L=[q,s].concat(k?FAM[k]:[]);return L.filter(function(x,i){return x.length>=3&&L.indexOf(x)===i})}
  function known(raw){var q=String(raw||'').toLowerCase().trim();return !!(FAM[q]||FAM[stem(q)]||PHR[q])}
  function rx(w){return new RegExp('(^|[^a-z0-9])'+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+(w.length<5?'(?![a-z0-9])':''),'g')}
  /* 2 = a real mention, .6 = only ever mentioned next to side-effect words, 0 = none */
  function hitWord(t,w){var r=rx(w),m,any=0;while((m=r.exec(t))){any=1;var a=t.slice(Math.max(0,m.index-40),m.index),b=t.slice(m.index+m[0].length,m.index+m[0].length+60);
      if(!SIDE.test(a)&&!SIDE.test(b)&&!AFTER.test(b)&&!BEFORE.test(a))return 2;if(r.lastIndex===m.index)r.lastIndex++}return any?.6:0}
  function hit(text,raw){var t=String(text||'').toLowerCase();if(!t)return 0;var F=fam(raw);if(!F.length)return 0;
    var a=hitWord(t,F[0]);if(a===2)return 2;var b=0;for(var i=1;i<F.length;i++){var h=hitWord(t,F[i]);if(h===2){b=1.5;break}if(h)b=.6}return Math.max(a,b)}
  function rank1(name,alias,rest,q,raw){
    if(!q)return 1;
    var nm=norm(name),al=norm(alias);
    if(nm.indexOf(q)===0)return 10;
    if(words(name).some(function(w){return w.indexOf(q)===0}))return 9;
    if(words(alias).some(function(w){return w.indexOf(q)===0})||String(alias||'').toLowerCase().split(/[,;]/).some(function(a){return norm(a).indexOf(q)===0}))return 8;
    if(q.length<2)return 0;
    if(nm.indexOf(q)>=0)return 7;
    if(al.indexOf(q)>=0)return 6;
    if(q.length<3)return 0;
    var sx=window.BS_SX&&window.BS_SXN&&BS_SXN[norm(name)],extra=sx?BS_SX[sx]||'':'';
    if(!rest&&!extra)return 0;
    var h=hit(rest,raw);if(h<2&&extra)h=Math.max(h,hit(extra,raw));if(!h&&sx&&BS_SX2[sx]&&hit(BS_SX2[sx],raw))h=.6;if(h===2)return 3;if(h===1.5)return 2.5;
    if(h===0&&norm(rest).indexOf(q)>=0)return 2;
    return h?1:0;
  }
  var LASTQ='';
  function rank(name,alias,rest,q){LASTQ=q=String(q||'');var r=rank1(name,alias,rest,norm(q),q);var T=parse(q);
    if(T.length===1&&T[0]!==q.trim().toLowerCase())r=Math.max(r,rank1(name,alias,rest,norm(T[0]),T[0])*.98);
    else if(T.length>1){var v=T.map(function(t){return rank1(name,alias,rest,norm(t),t)});var hard=v.filter(function(x,i){return !SOFT.has(T[i])});if(hard.length&&hard.every(function(x){return x>0})&&v.length-hard.length<v.length)r=Math.max(r,v.reduce(function(p,c){return p+c},0)/v.length)}
    return r}
  /* only very short non-words (typing a name letter by letter) hide the text matches */
  function best(scores){var m=0;scores.forEach(function(x){if(x>m)m=x});var q=norm(LASTQ);return m>=6&&q.length<4&&!known(LASTQ)?6:0.01}
  /* the Library's full index (summary, what it helps, reports, Case keywords per compound), fetched once in the background */
  function loadSX(){if(window.BS_SX||document.querySelector('script[src="/library/sx.js"]'))return;var s=document.createElement('script');s.src='/library/sx.js';s.onload=function(){window.dispatchEvent(new Event('bs-sx'))};document.head.appendChild(s)}
  if(document.readyState==='complete')setTimeout(loadSX,300);else addEventListener('load',function(){setTimeout(loadSX,300)});
  window.BS_WORDS={parse:parse,fam:fam,hit:hit,known:known,stop:STOP,phrase:PHR,family:FAM};
  window.BS_SEARCH={rank:rank,norm:norm,best:best,parse:parse};
})();
""" % {'stop': json.dumps(W.STOP), 'phr': json.dumps(W.PHRASE, ensure_ascii=False), 'fam': json.dumps(W.FAM, ensure_ascii=False)}
open('search.js', 'w', encoding='utf8').write(JS)
print('search.js v2', len(JS))
