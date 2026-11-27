"""Library v136 (27 Nov 2026, built on v135, kept): no double meanings.
1. Mixing it with: 'Fine' now reads 'No known clash' (it never meant tested or good together).
2. Blood work: a one-line key under the chips explains the symbols (rises, falls, can shift, warning, worth checking).
3. Side effects logged: drops parser junk that was not a side effect ('high-risk tag', '2007 trial').
4. Synergies is now 'Often taken with', since it lists pairs people use together, not proven boosts.
No compound facts changed."""
import os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
src, dst = 'library/v135', 'library/v136'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
def rep(a, b, n=1):
    global s
    c = s.count(a); assert c == n, (a[:50], c); s = s.replace(a, b)
rep("ok:['Fine','#2F6B46','#EAF4E2']", "ok:['No known clash','#2F6B46','#EAF4E2']")
rep("const seh=se.length?", "se.splice(0,se.length,...se.filter(c=>!/tag$|trial|study|^\\d/i.test(c[0])));const seh=se.length?")
key = ("${b?(()=>{const all=b.before.concat(b.monitor);const syms=new Set(b.mk.map(x=>x[0]));const ks=[];"
       "if(syms.has('↑'))ks.push('↑ rises');if(syms.has('↓'))ks.push('↓ falls');"
       "if(syms.has('⚠')||all.some(t=>t[3]))ks.push('• can shift, direction not settled');"
       "if(syms.has('⚡')||all.some(t=>t[2]))ks.push('! warning sign');if(syms.has('🔍'))ks.push('◎ worth checking');"
       "return ks.length?`<p class=\"bwkey\">${ks.join(' · ')}</p>`:''})():''}")
rep("${b&&b.flags?warn(b.flags,'Red flags'):''}", key + "${b&&b.flags?warn(b.flags,'Red flags'):''}")
rep("sec65('k-syn',`Synergies <small>", "sec65('k-syn',`Often taken with <small>")
rep("sec65('k-syn','Synergies',", "sec65('k-syn','Often taken with',")
s = s.replace('</head>', '<style>/* v136 */.bwkey{margin:6px 0 0;font:500 calc(11px*var(--k,1))/1.4 var(--mono);letter-spacing:.02em;color:#6B76A8}</style>\n</head>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v136 (27 Nov 2026, built on v135, kept): Mixing it with "Fine" reads "No known clash"; Blood work gets a symbol key; Side effects logged drops non-symptom chips; Synergies reads "Often taken with". No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
shutil.copy(p, 'library/index.html')
print('ok v136')
