"""Library v107 (19 Nov 2026, live), built on v106 (kept): Quick look as summary + questions.
The card's top is unchanged (structure, name, one line, numbers, colour strip, summary).
Under it, everything else now sits behind plain questions that open with a tap (dot on the right):
What's in this blend? / What does it do? / Why do people take it, and does it work? / What's the usual dose? /
What can I pair it with? / Who shouldn't take it? / Where does it act in the body? (Guide body, loads on open) /
Which blood tests, and why? / Similar compounds and other names / then the compound's own FAQ questions.
Some questions show a short answer preview (dose, count) without opening. Nothing removed, only folded."""
import os, shutil
R = '/home/claude/baresignals/library'
SRC, DST = f'{R}/v106', f'{R}/v107'
if os.path.exists(DST): shutil.rmtree(DST)
shutil.copytree(SRC, DST)
s = open(f'{DST}/index.html', encoding='utf8').read()
def rep(old, new):
    global s
    assert old in s, old[:80]
    s = s.replace(old, new, 1)

OLD = """    ${ktHTML(o)}
    <div class="cbody">${roles}</div>
    ${dose}
    ${bloodMini(o)}
    ${whoNotHTML(o)}
    ${rxCard(o)}
    ${blendHTML(o)}
    ${syn}
    ${simHTML(o)}
    ${inBlendsHTML(o)}
    ${nm}
"""
NEW = """    ${ktHTML(o)}
    ${qa107(o,{roles,dose,syn,nm})}
"""
rep(OLD, NEW)

JS = r"""
/* v107: Quick look as questions. Summary stays open; each question opens with a tap. */
function qa107(o,P){
  const Q=[],add=(q,html,pv,solo)=>{if(html&&html.replace(/<[^>]+>/g,'').trim())Q.push({q,html,pv,solo})};
  const d=o.dose,W=(o.whoNot||[]).filter(x=>x&&x.t);
  if(o.blend)add('What’s in this blend?',blendHTML(o),(o.blend.parts||[]).length+' parts',true);
  add('What does it do?','<div class="cbody">'+P.roles+'</div>',(rolesOf(o)[0]||[])[0]?esc(LONG[rolesOf(o)[0][0]]||''):'',true);
  add('Why do people take it, and does it work?',ktHTML(o,true),'',false);
  add('What’s the usual dose?',P.dose,d&&d.dose?esc(String(d.dose)):'',true);
  add('What can I pair it with?',(o.syn?P.syn:'')+inBlendsHTML(o),o.syn?o.syn.length+' options':'',false);
  add('Who shouldn’t take it, and why?',whoNotHTML(o)+rxCard(o),W.length?W.length+(W.length>1?' groups':' group'):'',false);
  if((window.BS_GSL||[]).includes(o.slug))Q.push({q:'Where does it act in the body?',html:`<div class="k-body104 b107" data-src="${GUIDE104}?p=${encodeURIComponent(o.slug)}&amp;embed=body"></div><p class="note">Tap a label on the body for its study.</p>`,pv:'',body:1});
  add('Which blood tests, and why?',bloodMini(o),'',true);
  add('Similar compounds and other names',(simHTML(o)||'')+(P.nm||''),'',false);
  const F=((window.BS_FAQ||{})[o.slug]||[]).filter(x=>!/who shouldn|shouldn’t|shouldn't/i.test(x[0]));
  F.forEach(x=>Q.push({q:x[0],html:`<div class="cs fq107"><p>${esc(x[1])}</p></div>`,pv:''}));
  if(!Q.length)return '';
  return `<div class="qa107"><p class="qh107">Questions <span>tap to open</span></p>${Q.map(x=>`<details class="q107${x.solo?' solo':''}"${x.body?' data-body':''}><summary><span class="qt">${esc(x.q)}</span>${x.pv?`<small>${x.pv}</small>`:''}<i class="dt" aria-hidden="true"></i></summary><div class="ans">${x.html}</div></details>`).join('')}</div>`;
}
document.addEventListener('toggle',e=>{const t=e.target;if(!t.matches||!t.matches('details.q107[data-body]')||!t.open)return;
  const b=t.querySelector('.b107');if(b&&!b.querySelector('iframe')){b.innerHTML=`<iframe title="Where it acts" loading="lazy" src="${b.dataset.src}"></iframe>`}},true);
"""
rep('function page65(o){', JS + '\nfunction page65(o){')

CSS = """
/* v107: Quick look questions */
.qa107{margin:2px 0 0;padding:0 0 4px;border-top:1.5px solid var(--rule)}
.qh107{font:500 calc(9.5px*var(--k))/1 var(--mono);letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin:10px 12px 2px;display:flex;justify-content:space-between}
.qh107 span{color:var(--ink-soft);letter-spacing:.06em}
.q107{border-bottom:1px solid rgba(62,74,128,.18)}
.q107:last-child{border-bottom:0}
.q107>summary{list-style:none;display:flex;align-items:center;gap:8px;padding:11px 12px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.q107>summary::-webkit-details-marker{display:none}
.q107 .qt{font-weight:600;font-size:calc(15px*var(--k));line-height:1.3;color:var(--ink);flex:1 1 auto;min-width:0}
.q107 summary small{flex:none;max-width:42%;font:500 calc(10px*var(--k))/1.2 var(--mono);color:var(--ink-soft);text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.q107 .dt{flex:none;width:20px;height:20px;border:1.5px solid #3E4A80;border-radius:50%;position:relative;background:#FFFFF4}
.q107 .dt::before,.q107 .dt::after{content:'';position:absolute;left:50%;top:50%;width:9px;height:1.5px;background:#3E4A80;transform:translate(-50%,-50%)}
.q107 .dt::after{transform:translate(-50%,-50%) rotate(90deg);transition:transform .2s}
.q107[open] .dt{background:#3E4A80}
.q107[open] .dt::before{background:#fff}
.q107[open] .dt::after{background:#fff;transform:translate(-50%,-50%) rotate(0)}
.q107[open]>summary .qt{color:#3E4A80}
.q107 .ans{padding:0 0 8px}
.q107 .ans>.cs,.q107 .ans>.cbody{border-top:0!important;padding-top:0!important}
.q107 .cbody{grid-template-columns:minmax(0,1fr)!important}
.q107.solo .ans .olab:first-child,.q107.solo .ans .wbox>.olab:first-child,.q107.solo .ans .cbody>.cs>.olab:first-child{display:none}
.q107 .ans>.kt{margin:0 12px}
.q107 .fq107{padding:0 12px}.q107 .fq107 p{margin:0;font-size:calc(14px*var(--k));line-height:1.5}
.q107 .ans>.note{padding:0 12px;margin:4px 0 0}
.q107 .b107{padding:0 6px}.q107 .b107 iframe{display:block;width:100%;height:560px;border:0;background:transparent}
@media (min-width:900px){.q107 .b107 iframe{height:640px}}
"""
rep('</style>', CSS + '</style>')
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v107 (19 Nov 2026, built on v106, v106 kept): Quick look as summary + questions. Top of the card unchanged; every other section folded behind a plain question that opens with a tap (dot on the right), some with a short answer preview. New question: Where does it act in the body? (Guide body, loads when opened). The compound FAQ joins the list. -->\n', 1)
open(f'{DST}/index.html', 'w', encoding='utf8').write(s)
for f in os.listdir(DST):
    p = f'{DST}/{f}'
    if os.path.isfile(p): shutil.copy(p, f'{R}/{f}')
print('ok')
