/* Bare Signals Library facts builder.
   Writes plain-text twins of the live Library so ChatGPT (or anyone) can fact check it without running JavaScript.
   Run from the repo root after every Library push:  node library/build-facts.js
   Output: library/facts.txt (index), library/facts/<slug>.txt (one per entry), library/facts/all.txt (everything, for upload).
   Reads whichever version library/index.html redirects to. Owner's sticker rows are left out. */
const fs=require('fs'),path=require('path');
const LIB=path.join(__dirname);
const live=(fs.readFileSync(path.join(LIB,'index.html'),'utf8').match(/replace\('(v\d+)\//)||[])[1];
if(!live)throw new Error('Could not find the live version in library/index.html');
const V=path.join(LIB,live);
global.window={};
for(const f of['data.js','page.js','punch.js','deep.js'])if(fs.existsSync(path.join(V,f)))require(path.join(V,f));
const D=window.BS_DATA,P=window.BS_PAGE||{},U=window.BS_PUNCH||{},W=window.BS_DEEP||{};
const PAL={};(window.BS_PALETTE||[]).forEach(r=>PAL[r[0]]=r[1]);
const role=k=>PAL[k]||k;
const today=new Date().toISOString().slice(0,10);
const SITE='https://baresignals.co';
const clean=s=>String(s==null?'':s).replace(/\*\*/g,'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const ORIGIN={body:'Made by the body',lab:'Made in a lab',np:'Natural product',frag:'Fragment of a natural protein',blend:'Blend',water:'Mixing water'};

function entry(d,withDeep){
  const p=P[d.slug]||{},out=[];let n=0;const sources=[];
  const src=(t,u)=>{if(!u&&!t)return'';const i=sources.findIndex(s=>s[1]===u&&s[0]===t);if(i>=0)return' [S'+(i+1)+']';sources.push([t||u,u||'']);return' [S'+sources.length+']'};
  const L=(s,tag)=>{s=clean(s);if(s)out.push(`${++n}. ${s}${tag?' ('+tag+')':''}`)};
  const H=h=>out.push('','## '+h);
  out.push('# '+d.name,'Page: '+SITE+'/library/#/p/'+d.slug,'Checked against Library '+live+', exported '+today);
  H('Identity');
  if(d.alias)L('Also called: '+d.alias);
  if(d.origin)L('Origin: '+(p.originDetail||ORIGIN[d.origin]||d.origin));
  if(d.kind)L('Class: '+d.kind);
  if(d.seq)L('Sequence: '+d.seq+' ('+d.seq.length+' amino acids)'+(d.seqNote?'. '+d.seqNote:''));
  if(d.fda)L('Shown with an FDA approved badge');
  if(d.status)L('Legal and approval status: '+d.status);
  H('Summary');
  if(p.sum)L(p.sum);
  if(U[d.slug]||d.punch)L('Punch line: '+(U[d.slug]||(typeof d.punch==='string'?d.punch:'')));
  if(d.dose&&d.dose.use)L('Used for: '+d.dose.use);
  H('Roles (what it is used for, strongest first)');
  (d.roles||[]).forEach(r=>L(role(r)+': '+((d.desc||{})[r]||'')));
  (d.reported||[]).forEach(r=>L(role(r)+' (backed only by animal or user reports): '+((d.desc||{})[r]||'')));
  H('How it works');
  (d.mech||[]).forEach((m,i)=>{L(m[0]+' · '+m[1]+' · role '+role(m[2]));if(p.mx&&p.mx[i])out.push('   '+clean(p.mx[i]))});
  if(p.deep)L('Mechanism overview: '+p.deep);
  if(d.blend){const b=d.blend;H('What is inside the blend');
    (b.parts||[]).forEach(x=>L(x[2]+': '+x[1]+' '+(b.unit||'')+' · '+x[3]));
    if(b.common)L('Most common ratio: '+b.common.text+' = '+b.common.total+(b.common.seen?' ('+b.common.seen+')':''));
    (b.common&&b.common.others||[]).forEach(o=>L('Other ratio seen: '+o[0]+' = '+o[1]+(o[2]?' ('+o[2]+')':'')));
    (b.versions||[]).filter(v=>!/owner/i.test(v[0])).forEach(v=>L('Version '+v[0]+': '+v[1]+' = '+v[2]));
    (b.why||[]).forEach(w=>L('Why '+w[0]+' is in it: '+w[1]));
    (b.chem||[]).forEach(c=>L('Mixing chemistry: '+c));
    if(b.selfmix)L('Self-mixing: '+b.selfmix);}
  if(d.water){const w=d.water;H('Water');
    (w.made_of||[]).forEach(m=>L('Made of: '+m[0]+', '+m[1]));
    if(w.ph)L('pH: '+w.ph);(w.when||[]).forEach(x=>L('When used: '+x));
    Object.keys(w).filter(k=>!['made_of','ph','when'].includes(k)).forEach(k=>{const v=w[k];(Array.isArray(v)?v:[v]).forEach(x=>L(k+': '+(Array.isArray(x)?x.join(', '):typeof x==='object'?JSON.stringify(x):x)))});}
  H('Dosage (community reported unless tagged)');
  const ds=d.dose||{};
  L('Typical: '+[ds.dose,ds.freq,ds.cycle&&('cycle '+ds.cycle),ds.route&&('route '+ds.route)].filter(Boolean).join(' · '),ds.conf);
  if(ds.half)L('Half-life: '+ds.half);
  if(ds.tiernote)L('Dose note: '+ds.tiernote);
  const pd=p.dose||{};
  if(pd.main)L('Most people take: '+pd.main);
  if(pd.course)L(pd.course);
  (pd.tiers||[]).forEach(t=>L(t.label+': '+[t.dose,t.freq,t.dur,t.route].filter(Boolean).join(' · ')+(t.who?' · for '+t.who:'')+(t.src||[]).map(s=>src(s[0],s[1])).join(''),t.tag));
  (pd.rows||[]).forEach(r=>L('Logged: '+r[0]+', '+r[1]));
  H('What people report');
  (p.pools||[]).forEach(x=>L(x[0]+' '+x[1]));
  if(p.reports)L(p.reports);
  (p.wk||[]).forEach(x=>L('Liked / worked: '+x));
  if(p.worked)L('What worked: '+p.worked);
  (p.dn||[]).forEach(x=>L('Went wrong / did not work: '+x));
  if(p.didnt)L('What went wrong: '+p.didnt);
  (p.rp||[]).forEach(x=>L('Most reported: '+x));
  H('What has been tested');
  (d.tst||[]).forEach(t=>L(role(t[0])+': '+t[1]+' ('+t[2]+')'));
  if(p.tested)L(p.tested);
  if(p.helps)L('What it helps: '+p.helps);
  if(d.trial){const t=d.trial;L('Trial: '+[t.status,t.phase,t.what,t.id,t.sponsor].filter(Boolean).join(' · ')+(t.note?'. '+t.note:'')+(t.checked?' (checked '+t.checked+')':'')+src(t.id||'Trial',t.src),t.conf)}
  if(d.whoNot&&d.whoNot.length){H("Who shouldn't take it");d.whoNot.forEach(w=>L(w.t+': '+w.why,w.conf))}
  if(d.syn&&d.syn.length){H('Synergies (paired with)');d.syn.forEach(s=>L(s+(p.sx&&p.sx[s]?': '+p.sx[s]:'')))}
  H('Where it comes from');
  if(p.found)L(p.found);if(p.first)L('First studied for: '+p.first);
  if(d.nameNote)L('Name story: '+d.nameNote.t+(d.nameNote.src?src(d.nameNote.src[0],d.nameNote.src[1]):''),d.nameNote.conf);
  (d.tl||[]).forEach(t=>L(t[0]+': '+t[1]));
  if(withDeep&&W[d.slug]){const w=W[d.slug];H('Deep read (as of '+(w.asof||'?')+')');
    (w.sections||[]).forEach(s=>{out.push('','### '+clean(s.h)+(s.where?' ['+s.where+']':''));(s.body||[]).forEach(b=>L(b))});
    if((w.refs||[]).length)out.push('','Deep read references:');(w.refs||[]).forEach((r,i)=>out.push('['+(r.n||i+1)+'] '+(Array.isArray(r)?r.filter(Boolean).join(' · '):clean([r.t,r.year].filter(Boolean).join(', '))+(r.url||r.u?' · '+(r.url||r.u):''))));}
  (p.sources||[]).forEach(s=>src(s[0],s[1]));
  if(sources.length){H('Sources');sources.forEach((s,i)=>out.push('[S'+(i+1)+'] '+clean(s[0])+(s[1]?' · '+s[1]:'')))}
  return out.join('\n')+'\n';
}

const HEAD=`BARE SIGNALS LIBRARY · PLAIN-TEXT FACTS
Live Library version ${live}, exported ${today}. ${D.length} entries.
This is a text copy of ${SITE}/library/ for fact checking. The site itself is built by JavaScript, so readers that do not run scripts see nothing there.
Doses are what people report using (community data), not medical advice and not label doses unless marked.
Tags in brackets: verified = primary source read; reported = from user reports, aggregators or secondary sources; inferred = reasoned from related evidence; logged = from Bare Signals research logs; speculated = unproven idea.
Every claim is numbered. When checking, quote the entry name and claim number.
`;
const dir=path.join(LIB,'facts');fs.mkdirSync(dir,{recursive:true});
const order=D.slice().sort((a,b)=>((a.rank||999)-(b.rank||999))||a.name.localeCompare(b.name));/* same Popular order as the site */
let all=HEAD+'\n',idx=HEAD+`
One file per entry (most popular first). Open the one you want to check:
`;
for(const d of order){
  const t=entry(d,true);fs.writeFileSync(path.join(dir,d.slug+'.txt'),HEAD+'\n'+t);
  all+='\n\n'+t;idx+=`${d.name} · ${SITE}/library/facts/${d.slug}.txt\n`;
}
idx+=`\nEverything in one file (large, for upload): ${SITE}/library/facts/all.txt\n`;
fs.writeFileSync(path.join(LIB,'facts.txt'),idx);fs.writeFileSync(path.join(dir,'all.txt'),all);
console.log('Library',live,'·',D.length,'entries · all.txt',Math.round(all.length/1024),'KB');
