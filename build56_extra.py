# v56 additions, run by build56.py after the v55 steps (uses its sub() and src)
POP_JS = r'''function srcName(u){let m;if((m=u.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/)))return "PubMed "+m[1];if((m=u.match(/clinicaltrials\.gov\/study\/(NCT\d+)/)))return "ClinicalTrials.gov "+m[1];if((m=u.match(/articles\/(PMC\d+)/)))return "PMC "+m[1];if(/doi\.org/.test(u))return "Journal paper (DOI)";if(/rxiv/.test(u))return "Preprint, not peer reviewed";return "Source";}
let stPopClosedAt=0;function stPopOpen(){const p=document.getElementById("stpop");return !!(p&&!p.hidden)||performance.now()-stPopClosedAt<450;}
function studyPop(i){let p=document.getElementById("stpop");if(!p){p=document.createElement("div");p.id="stpop";p.className="stpop";p.hidden=true;p.setAttribute("role","dialog");p.addEventListener("click",e=>{if(e.target.closest(".spx"))studyPop(-1);});(document.querySelector(".stage")||document.body).appendChild(p);document.addEventListener("keydown",e=>{if(e.key==="Escape")studyPop(-1);});document.addEventListener("pointerdown",e=>{const q=document.getElementById("stpop");if(q&&!q.hidden&&!e.target.closest("#stpop")&&!(e.target.closest&&e.target.closest(".lb.lk"))){q.hidden=true;q.innerHTML="";stPopClosedAt=performance.now();}},true);}
 const L=LBS[i];if(!L){p.hidden=true;p.innerHTML="";return;}
 p.innerHTML=`<div class="sph"><b>${esc(L.L)}</b><button type="button" class="spx" aria-label="Close">Close ×</button></div>${L.note?`<p class="spc">On this page: ${esc(L.note)}</p>`:""}`+L.sts.map(z=>`<div class="sps"><div class="spm">${esc((STAG[z.type]||[""])[0])}${z.who?` · <span class="spw">${esc(z.who)}</span>`:""}</div>${z.f?`<p class="spf">${esc(z.f)}</p>`:""}<p class="spn">${esc(z.t||"")}</p><a class="spl" href="${esc(z.url)}" target="_blank" rel="noopener">${esc(srcName(z.url))} ↗</a></div>`).join("");
 p.hidden=false;p.scrollTop=0;}
'''
POP_CSS = (".stpop{position:absolute;z-index:8;left:8px;right:8px;bottom:8px;max-height:72%;overflow:auto;background:var(--chip);border:1px solid var(--ink);box-shadow:0 6px 24px rgba(62,74,128,.22);padding:12px 13px 11px;color:var(--ink);font:400 12.5px/1.42 var(--body)}"
    ".stpop[hidden]{display:none}"
    "@media (min-width:900px){.stpop{left:auto;right:16px;bottom:16px;width:380px}}"
    ".stpop .sph{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:6px}"
    ".stpop .sph b{font:500 12px/1.25 var(--mono);letter-spacing:.07em;text-transform:uppercase}"
    ".stpop .spx{all:unset;cursor:pointer;font:500 10px/1 var(--mono);letter-spacing:.07em;text-transform:uppercase;color:var(--act);padding:3px 0;white-space:nowrap}"
    ".stpop .spc{margin:0 0 4px;color:#5A6390;font-size:11.5px}"
    ".stpop .sps{border-top:1px solid rgba(62,74,128,.18);padding-top:8px;margin-top:8px}"
    ".stpop .spm{font:500 9.5px/1.45 var(--mono);letter-spacing:.06em;text-transform:uppercase;color:#6A6BC2}"
    ".stpop .spw{text-transform:none;letter-spacing:0;font-family:var(--body);font-size:11px;color:#5A6390}"
    ".stpop .spf{margin:4px 0}"
    ".stpop .spn{margin:0 0 7px;font-size:11px;color:#5A6390}"
    ".stpop .spl{font:500 10px/1 var(--mono);letter-spacing:.06em;color:#6A6BC2;text-decoration:underline;text-underline-offset:3px}")

def apply(sub, get, put):
    sub('let STUD={};', 'let STUD={},STUDA={},LBS=[];')
    sub('if(x&&x.slug)STUD[x.slug+"|"+x.r+"|"+x.at]=x;',
        'if(x&&x.slug){const k=x.slug+"|"+x.r+"|"+x.at;if(!STUD[k])STUD[k]=x;(STUDA[k]=STUDA[k]||[]).push(x);}')
    sub('const lk=r.stu&&okUrl(r.stu.url);h+=`<g class="lb${lk?" lk":""}"${lk?` data-u="${esc(r.stu.url)}"',
        'const lk=r.stu&&okUrl(r.stu.url);if(lk)LBS.push({L:r.L,note:(r.mm&&r.mm.note)||r.note||"",sts:(STUDA[r.stu.slug+"|"+r.stu.r+"|"+r.stu.at]||[r.stu]).filter(z=>okUrl(z.url))});h+=`<g class="lb${lk?" lk":""}"${lk?` data-i="${LBS.length-1}" data-u="${esc(r.stu.url)}"')
    sub('window.open(hit.dataset.u,"_blank","noopener");return;}}',
        'studyPop(+hit.dataset.i);return;}if(stPopOpen()){studyPop(-1);return;}}')
    sub("function drawTags(s){", "function drawTags(s){LBS=[];")
    sub(".fl .zb.ico{padding:1px 0!important;justify-content:center!important;align-self:stretch}",
        ".fl .zb.ico{padding:0!important;height:20px;justify-content:center!important;align-self:stretch}")
    sub(".tagl .tapin{pointer-events:auto;cursor:pointer}", ".tagl .tapin{pointer-events:auto;cursor:pointer}" + POP_CSS)
    s = get(); i = s.index("function studyOf("); put(s[:i] + POP_JS + s[i:])
