#!/usr/bin/env python3
"""Home v80 = Body v80, from Home v79 = Body v79: body labels that have community data (community.json) get a second
tag line "COMMUNITY DATA" (or "COMMUNITY DATA · NONE FOUND"). Tapping the label opens the card, which now has a
"What people say" section: each pool on its own (never summed), source, n and whether n is people or entries,
date, finding, tagged reported. Labels with community data but no study are tappable too. Home v79 kept at /home/v79/."""
import pathlib, shutil
R = pathlib.Path(__file__).resolve().parent
src = (R/"index.html").read_text(encoding="utf-8")
(R/"home"/"v79").mkdir(parents=True, exist_ok=True); shutil.copy(R/"index.html", R/"home"/"v79"/"index.html")
def rep(a, b):
    global src
    assert src.count(a) == 1, a[:80]
    src = src.replace(a, b)

rep("let STUD={},STUDA={},LBS=[];", "let STUD={},STUDA={},LBS=[],COMM={};")
# load community.json next to studies.json
rep('fetch(sb+"/studies.json",{cache:"no-cache"})',
    'fetch(sb+"/community.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).then(a=>{(a||[]).forEach(x=>{if(x&&x.slug)(x.at||[]).forEach(t=>{const k=x.slug+"|"+String(t).toLowerCase();(COMM[k]=COMM[k]||[]).push(x);});});try{const s=svgOf();if(s&&s.__list&&s.__list.length)drawTags(s);}catch(_){}}).catch(()=>{});'
    'fetch(sb+"/studies.json",{cache:"no-cache"})')
rep("function studyOf(mm){",
    'function commOf(mm,L){const c=st.comp;if(!c||!mm)return null;for(const n of [mm.label,L,NAME[mm.k]]){const x=n&&COMM[c.s+"|"+String(n).toLowerCase()];if(x)return x;}return null;}\nfunction studyOf(mm){')
rep("els,mm,stu:studyOf(mm)};", "els,mm,stu:studyOf(mm),cm:commOf(mm,L)};")
# measure: community tag line adds height under the study tag
rep("const sg=r.stu?STAG[r.stu.type]:null,tf=fs*.6,tgH=sg?tf*1.45:0,tgW=sg?Math.min(W,sg[0].length*tf*.62+pad*.4):0;",
    'const sg=r.stu?STAG[r.stu.type]:null,tf=fs*.6,cg=r.cm?(r.cm.some(z=>z.n>0)?"COMMUNITY DATA":"COMMUNITY DATA · NONE FOUND"):"",tgH=(sg?tf*1.45:0)+(cg?tf*1.45:0),tgW=Math.min(W,Math.max(sg?sg[0].length*tf*.62+pad*.4:0,cg?cg.length*tf*.62+pad*.4:0));')
rep("return {tl,nl,ch,chH,sg,tf,tgH,tgW,", "return {tl,nl,ch,chH,sg,cg,tf,tgH,tgW,")
# render: label tappable with a study or community data
rep('const lk=r.stu&&okUrl(r.stu.url);if(lk)LBS.push({L:r.L,note:(r.mm&&r.mm.note)||r.note||"",sts:(STUDA[r.stu.slug+"|"+r.stu.r+"|"+r.stu.at]||[r.stu]).filter(z=>okUrl(z.url))});h+=`<g class="lb${lk?" lk":""}"${lk?` data-i="${LBS.length-1}" data-u="${esc(r.stu.url)}" role="link" aria-label="${esc((r.stu.t||"Study")+" ("+M.sg[0].toLowerCase()+")")}"`:""}>`;',
    'const ls=r.stu&&okUrl(r.stu.url),lk=ls||!!r.cm;if(lk)LBS.push({L:r.L,note:(r.mm&&r.mm.note)||r.note||"",sts:ls?(STUDA[r.stu.slug+"|"+r.stu.r+"|"+r.stu.at]||[r.stu]).filter(z=>okUrl(z.url)):[],cm:r.cm||[]});h+=`<g class="lb${lk?" lk":""}"${lk?` data-i="${LBS.length-1}"${ls?` data-u="${esc(r.stu.url)}"`:""}${r.cm?` data-c="1"`:""} role="link" aria-label="${esc(ls?(r.stu.t||"Study")+" ("+M.sg[0].toLowerCase()+")":r.L+", community data")}"`:""}>`;')
rep('fill="#6A6BC2" text-decoration="underline">${M.sg[0]}</text>`;}',
    'fill="#6A6BC2" text-decoration="underline">${M.sg[0]}</text>`;}if(M.cg){const ty=y0+th+(M.sg?M.tf*1.45:0)+M.tf*1.12;h+=`<text x="${side<0?x1:x0+pad*.2}" y="${ty}" text-anchor="${side<0?"end":"start"}" font-family="JetBrains Mono,monospace" font-size="${M.tf}" letter-spacing="${.25*k}" fill="#B0603A" text-decoration="underline">${esc(M.cg)}</text>`;}')
rep("if(hit&&okUrl(hit.dataset.u)){", "if(hit&&(okUrl(hit.dataset.u)||hit.dataset.c)){")
# card: research first, then what people say (pools kept apart, never summed)
rep('<a class="spl" href="${esc(z.url)}" target="_blank" rel="noopener">${esc(srcName(z.url))} ↗</a></div>`).join("");',
    '<a class="spl" href="${esc(z.url)}" target="_blank" rel="noopener">${esc(srcName(z.url))} ↗</a></div>`).join("")'
    '+((L.cm&&L.cm.length)?`<div class="spcm"><div class="spch">What people say · community data</div>`+L.cm.map(z=>`<div class="sps"><div class="spm spmc">${esc(z.pool||"Community")}${z.n>0?` · ${esc(z.n)} ${esc(z.base==="entries"?"entries":"people")}`:" · none found"}${z.weight==="main"?" · main source":z.weight==="supporting"?" · supporting":""}</div>${z.f?`<p class="spf">${esc(z.f)}</p>`:""}<p class="spn">${(z.at&&z.at.length)?"About: "+esc(z.at.join(", "))+" · ":""}${esc(z.src||"")}</p><p class="spr">${z.tag==="reported"?"Reported by users, not tested":"Community data"}${z.updated?" · checked "+esc(z.updated):""}</p>${/^https:\\/\\//.test(z.url||"")?`<a class="spl" href="${esc(z.url)}" target="_blank" rel="noopener">${esc((z.url.match(/^https:\\/\\/([^/]+)/)||["",""])[1])} ↗</a>`:""}</div>`).join("")+`<p class="spr">Each source is shown on its own; numbers are never added together.</p></div>`:"");')
rep("for(let i=rows.length-1;i>=0;i--)if(rows[i]!==head&&br.includes(rows[i]))rows.splice(i,1);}}}",
    "{const cm=[...new Set(br.flatMap(r=>r.cm||[]))];head.cm=cm.length?cm:null;}for(let i=rows.length-1;i>=0;i--)if(rows[i]!==head&&br.includes(rows[i]))rows.splice(i,1);}}}")
rep(".spf{margin:4px 0}", ".spf{margin:4px 0}.spcm{margin-top:12px}.spch{font:600 10px/1.4 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:#B0603A;border-top:1px solid var(--ink);padding-top:9px}.spmc{color:#B0603A}")
old = "<!doctype html><!-- Home v79 = Body v79 (31 Oct 2026):"
assert src.startswith(old)
src = src.replace(old, "<!doctype html><!-- Home v80 = Body v80 (31 Oct 2026): labels with community data get a COMMUNITY DATA tag; the label card adds a What people say section (each pool on its own, n people or entries, reported). Home v79 kept at /home/v79/. Earlier: Home v79 = Body v79 (31 Oct 2026):", 1)
(R/"index.html").write_text(src, encoding="utf-8"); print("ok")
