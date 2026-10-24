/* Bare Signals Scan builder. Run from the repo root:  node scan/tools/build.js
   Reads the live Library data and the Protocol page's vial, stock and dose rules, then writes
   1) /scan/<V>/data.js  compact data for the scan page (the Library file is 1.5 MB, too heavy for a vial scan)
   2) /S/<CODE>/index.html  one tiny page per locked code in /S/codes.js
   3) /S/index.html  the no-code page (scan a vial, my list, every code)
   Rerun after any Library or Protocol release so scan pages carry the new data. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const ROOT=path.resolve(__dirname,'../..');
const V='v2'; /* v2: community dose first (never the label dose), dose diary */
const LIB=(fs.readFileSync(ROOT+'/library/index.html','utf8').match(/replace\('(v\d+)\//)||[])[1];
const PRO=(fs.readFileSync(ROOT+'/protocol/index.html','utf8').match(/(v\d+)\//)||[])[1];
if(!LIB||!PRO)throw new Error('could not find live Library or Protocol version');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(ROOT+'/library/'+LIB+'/data.js','utf8'),ctx);
vm.runInContext(fs.readFileSync(ROOT+'/S/codes.js','utf8'),ctx);
const D=ctx.window.BS_DATA,PAL=ctx.window.BS_PALETTE,CODES=ctx.window.BS_CODES,ALIAS=ctx.window.BS_CODE_ALIAS;
const proto=fs.readFileSync(ROOT+'/protocol/'+PRO+'/index.html','utf8');
function grab(name){const m=proto.match(new RegExp('const '+name+'=(\\{[\\s\\S]*?\\});'));if(!m)throw new Error('no '+name);return vm.runInNewContext('('+m[1]+')')}
const VIAL=grab('VIAL'),STOCK=grab('STOCK'),PREC=grab('PREC');
const libHtml=fs.readFileSync(ROOT+'/library/'+LIB+'/index.html','utf8');
const NP=vm.runInNewContext('('+libHtml.match(/const NP=(\{[^;]*\});/)[1]+')');

/* same rules as Protocol v23 (parseFreq, doseChips, routeOf, waterFor) so a scan and the builder agree */
function parseFreq(s){s=String(s||'').toLowerCase();if(!s)return 'D';
 if(/as needed|prn|once, may|rescue/.test(s)&&!/daily or prn/.test(s))return 'PRN';
 if(/5 on|5 days\/wk/.test(s))return '5on2';
 if(/3x daily|3× daily|before major meals/.test(s))return 'D3';
 if(/2–3× daily|2-3× daily|twice daily|2× daily(?! loading)|2x daily/.test(s)&&!/1–2×/.test(s))return 'D2';
 if(/every 2-3 days|eod|every other/.test(s)&&!/daily or eod/.test(s))return 'EOD';
 if(/days 1, 3, 5|2–3× weekly|2-3× weekly|3× weekly|3x weekly|3–4× weekly/.test(s))return '3W';
 if(/1–3× weekly|twice weekly|2× weekly|1–2× weekly|2x weekly/.test(s))return '2W';
 if(/once weekly|1× weekly|weekly/.test(s)&&!/daily/.test(s))return '1W';
 return 'D'}
function doseChips(ds){const s=String(ds||'').replace(/(\d),(\d{3})/g,'$1$2').replace(/^~\s*/,'');const m=s.match(/^([\d.]+)\s*(?:[–-]\s*([\d.]+))?\s*(mcg|mg|IU|mL|g|units?|U)\b(?!\s*\/)/i);
 if(!m)return [];const u=m[3];const out=[m[1]+' '+u];if(m[2])out.push(m[2]+' '+u);return out}
function routeOf(ds){const r=String((ds&&ds.route)||'').toLowerCase();if(!r)return '';if(/nasal/.test(r)&&!/sub-?q|inj|im\b/.test(r))return 'nasal';if(/^oral|sublingual/.test(r))return 'oral';if(/^topical/.test(r))return 'topical';return 'inj'}
function parseWeeks(s){s=String(s||'').toLowerCase();return /ongoing|continuous|similar to|same as|prn|no cycling|up to 2 years/.test(s)}
function waterFor(k){if(k==='nadplus')return 5;if(/tesa/.test(k))return 3;return 2}
function cls(o){if(o.kind==='water')return 'Solvent';if(o.blend)return 'Blend';const n=(o.seq||'').length;if(!n)return NP[o.name]||'Not a peptide';return n+' AA'}

const codeOf={};Object.entries(CODES).forEach(([c,s])=>codeOf[s]=c);
const out={};
for(const d of D){
 const c=codeOf[d.slug];if(!c)continue;
 const ds0=d.dose||{};const pr=PREC[d.slug]||{};
 /* Cece's rule (24 Oct 2026): people here self-experiment with grey-market peptides, so the recommended dose is always the
    community dose: the first tier that is not a label or trial tier. Label doses are never the default. */
 const tier=(ds0.tiers||[]).find(t=>!/label|trial|clinical|fda|rx/i.test(t.label||'')&&t.tag!=='label')||null;
 const ds=Object.assign({},ds0,tier?{dose:tier.dose,freq:tier.freq||ds0.freq,cycle:tier.dur||ds0.cycle,route:tier.route||ds0.route}:{dose:String(ds0.dose||'').replace(/;\s*[^;]*\(label[^)]*\)\s*$/i,'').replace(/\s*\(?community\)?/i,'')});
 const dsrc=tier?'Community · '+tier.label:ds0.conf==='logged'?'Logged':/label/i.test(String(ds0.dose))?'Community':ds0.conf==='verified'?'Reported':'Community';
 const route=pr.route||routeOf(ds);
 const chips=pr.chips||doseChips(ds.dose);
 const bd=d.blend&&d.blend.draw;
 let start=pr.start||chips[0]||'';
 const vial=STOCK[d.slug]||VIAL[d.slug]||(d.blend&&parseFloat(d.blend.total))||0;
 const water=bd&&bd.ml?bd.ml:(vial?waterFor(d.slug):0);
 const all=(d.roles||[]).concat((d.reported||[]).filter(r=>(d.roles||[]).indexOf(r)<0));
 out[c]={c,s:d.slug,n:d.name,cl:cls(d),p:d.primary,r:d.roles||[],rp:(d.reported||[]).filter(r=>(d.roles||[]).indexOf(r)<0),
  ds:Object.fromEntries((all).map(r=>[r,(d.desc||{})[r]||''])),
  u:ds.use||d.fn||'',fda:!!d.fda,o:d.otl||d.originDetail||'',
  d:{dose:(pr.range?pr.range.split(' · ')[0]:ds.dose)||'',freq:ds.freq||'',cycle:ds.cycle||'',route:pr.route==='inj'&&pr.range?'Sub-Q':ds.route||'',half:ds0.half||'',src:pr.range?'Bare Signals start':dsrc,dose2:pr.range||''},
  rt:route,ch:chips,st:start,f:pr.f||parseFreq(ds.freq),vm:vial,vw:water,bu:bd&&bd.units||0,
  bl:d.blend?d.blend.parts.map(p=>[p[2],p[1]]):null,bu2:d.blend&&d.blend.unit||'',
  kind:d.kind||'',go:parseWeeks(ds.cycle),stock:!!STOCK[d.slug],rank:d.rank};
}
const pal={};PAL.forEach(p=>pal[p[0]]=[p[1],p[2]]);
const js='/* Bare Signals Scan '+V+' data, built '+new Date().toISOString().slice(0,10)+' from Library '+LIB+' and Protocol '+PRO+' by scan/tools/build.js. Do not edit by hand. */\n'+
 'window.BS_SCAN={lib:'+JSON.stringify(LIB)+',pro:'+JSON.stringify(PRO)+',pal:'+JSON.stringify(pal)+',items:'+JSON.stringify(out)+'};\n';
fs.writeFileSync(ROOT+'/scan/'+V+'/data.js',js);

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function page(code,title){return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${esc(title)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500;600;700&display=swap">
<link rel="stylesheet" href="/scan/${V}/scan.css">
<script>window.BS_CODE=${JSON.stringify(code)};</script>
<script src="/S/codes.js"></script>
<script src="/scan/${V}/data.js"></script>
<script src="/scan/${V}/app.js" defer></script>
<script src="/nav.js" defer></script>
</head><body><main id="app"><noscript><p class="nojs">This page needs JavaScript. <a href="/library/">Open the Library</a>.</p></noscript></main></body></html>
`}
let n=0;
for(const [c,it] of Object.entries(out)){fs.mkdirSync(ROOT+'/S/'+c,{recursive:true});fs.writeFileSync(ROOT+'/S/'+c+'/index.html',page(c,it.n+' · Bare Signals'));n++}
fs.writeFileSync(ROOT+'/S/index.html',page('','Scan · Bare Signals'));
console.log('scan',V,'· Library',LIB,'· Protocol',PRO,'·',n,'code pages');
