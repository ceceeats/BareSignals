global.window={};const fs=require('fs');
for(const f of ['/home/claude/baresignals/blood/v21/lib.js','data.js','page.js'])eval(fs.readFileSync(f,'utf8'));
const D=window.BS_DATA.filter(o=>o.kind!=='supp'),P=window.BS_PAGE,L=window.BW_LIB;
const rows=[];let tot={syn:0,bw:0,who:0,blend:0};
for(const o of D){const p=P[o.slug]||{},sx=p.sx||{};const g={syn:[],bw:[],who:[],blend:[]};
 (o.syn||[]).forEach(n=>{if(!sx[n])g.syn.push(n)});
 const c=L.comps[o.slug];if(c){[...(c.before||[]),...(c.monitor||[])].forEach(t=>{const mk=(c.mk||[]).some(m=>m[3]==='t/'+t[0]);if(!t[5]&&!mk)g.bw.push((L.tests[t[0]]||[t[0]])[0])})}
 (o.whoNot||[]).forEach(w=>{if(!w.why)g.who.push(w.t)});
 D.filter(b=>b.blend&&b.blend.parts.some(q=>q[0]===o.slug)).forEach(b=>{if(!(b.blend.why||[]).length)g.blend.push(b.name)});
 const n=g.syn.length+g.bw.length+g.who.length+g.blend.length;for(const k in g)tot[k]+=g[k].length;
 if(n)rows.push([o.name,o.slug,o.rank||999,g,n])}
rows.sort((a,b)=>a[2]-b[2]);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const li=(lab,a)=>a.length?`<p><b>${lab}</b> ${a.map(esc).join(' · ')}</p>`:'';
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Why gaps · Bare Signals</title>
<style>body{margin:0;background:#FFFFE2;color:#3E4A80;font:400 14px/1.5 "Hanken Grotesk",system-ui,sans-serif;padding:20px 16px 60px;max-width:900px;margin:auto}h1{font:700 26px/1.1 "Bricolage Grotesque",sans-serif;margin:0 0 6px}.k{font:600 10px/1 "JetBrains Mono",monospace;letter-spacing:.1em;text-transform:uppercase}.sum{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0 18px}.sum span{border:1.5px solid #3E4A80;padding:6px 8px;background:#FFFFF4}section{border:1.5px solid #3E4A80;background:#FFFFF4;padding:10px 12px;margin:0 0 10px}section h2{font:700 17px/1.2 "Bricolage Grotesque",sans-serif;margin:0 0 4px;display:flex;justify-content:space-between;gap:8px}section h2 a{color:#5271FF}section p{margin:4px 0;font-size:13px}section p b{font:600 9px/1 "JetBrains Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:#DB6830;margin-right:4px}</style></head><body>
<p class="k">Library v104 · research queue · 19 Nov 2026</p><h1>Why gaps</h1><p>Every place a full read shows a list without a reason yet. Each line is a research question: why does this pair, test or warning matter for this compound? Most popular first.</p>
<div class="sum"><span class="k">${rows.length} compounds</span><span class="k">${tot.syn} synergies</span><span class="k">${tot.bw} blood tests</span><span class="k">${tot.who} warnings</span><span class="k">${tot.blend} blends</span></div>
${rows.map(r=>`<section><h2><span>${esc(r[0])}</span><a class="k" href="/library/v104/#/p/${r[1]}">Full read →</a></h2>${li('Synergy',r[3].syn)}${li('Blood test',r[3].bw)}${li('Warning',r[3].who)}${li('Blend',r[3].blend)}</section>`).join('')}
</body></html>`;
fs.writeFileSync('questions.html',html);console.log(rows.length,JSON.stringify(tot));
