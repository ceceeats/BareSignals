/* Bare Signals shared search v1 (25 Oct 2026): one ranking for every search bar, the same rule as Library v52.
   Name starts with what you typed (10) > a word in the name starts with it (9) > an alias starts with it (8) >
   name contains it (7) > alias contains it (6) > anything else on the card contains it (3, from 3 letters).
   One letter only matches names or aliases starting with that letter. 0 = hide.
   Use: BS_SEARCH.rank(name, alias, rest, query)  ·  BS_SEARCH.norm(text) */
(function(){
  var norm=function(x){return String(x||'').toLowerCase().replace(/[\s\-–—()+.,'’/]/g,'')};
  var SPLIT=/[\s\-–—+/(),;·&]+/;
  var words=function(x){return String(x||'').toLowerCase().split(SPLIT).map(norm).filter(Boolean)};
  function rank(name,alias,rest,q){
    q=norm(q);if(!q)return 1;
    var nm=norm(name),al=norm(alias);
    if(nm.indexOf(q)===0)return 10;
    if(words(name).some(function(w){return w.indexOf(q)===0}))return 9;
    if(words(alias).some(function(w){return w.indexOf(q)===0})||String(alias||'').toLowerCase().split(/[,;]/).some(function(a){return norm(a).indexOf(q)===0}))return 8;
    if(q.length<2)return 0;
    if(nm.indexOf(q)>=0)return 7;
    if(al.indexOf(q)>=0)return 6;
    if(q.length>=3&&rest&&norm(rest).indexOf(q)>=0)return 3;
    return 0;
  }
  /* when some names match, hide the matches that only came from other text, so the list filters letter by letter */
  function best(scores){var m=0;scores.forEach(function(x){if(x>m)m=x});return m>=6?6:1}
  window.BS_SEARCH={rank:rank,norm:norm,best:best};
})();
