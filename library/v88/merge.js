/* Library v79 merge (4 Nov 2026): since Library v50 the long fields and the community dose tiers live in page.js, not data.js.
   Pages outside the Library (Protocol, Dosage) load data.js + page.js + this file to get one full record per compound,
   the same shape the old v49 data.js had. The card headline (data.js dose) always wins over page.js. */
(function(){var D=window.BS_DATA||[],P=window.BS_PAGE||{};for(var i=0;i<D.length;i++){var d=D[i],p=P[d.slug];if(!p)continue;
 for(var k in p){if(k==='dose'){var o={},a;for(a in p.dose)o[a]=p.dose[a];for(a in (d.dose||{}))o[a]=d.dose[a];d.dose=o}else if(d[k]===undefined)d[k]=p[k]}}})();
