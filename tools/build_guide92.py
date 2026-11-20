"""Guide v92 PREVIEW (20 Nov 2026, built on v91, kept): the Guide's doses come from the Library (the master)
instead of its own copy. Loads /library/data.js and reads page.js at its live address (was pinned to v101).
Not live until Cece approves the 25 doses that change on the Guide."""
import os, re
os.chdir('/home/claude/baresignals')
s = open('home/v91/index.html', encoding='utf8').read()
s = s.replace('<!doctype html><!-- Guide v91', '<!doctype html><!-- Guide v92 (20 Nov 2026, built on v91, kept; PREVIEW): doses read from the Library (/library/data.js), the one master, instead of the Guide\'s own copy; page.js read at its live address (was v101). --><!-- Guide v91', 1)
n = s.count('/library/v101/page.js'); assert n, 'page.js pin'
s = s.replace('/library/v101/page.js', '/library/page.js')
s = s.replace('</head>', '<script src="/library/data.js"></script></head>', 1)
i = s.index('const C=[{'); j = s.index('}];\n', i) + 4
s = s[:j] + "/* v92: doses from the Library, the one master */\n;(function(){try{const M={};(window.BS_DATA||[]).forEach(o=>M[o.slug]=o);C.forEach(c=>{const o=M[c.s];if(o&&o.dose&&o.dose.dose)c.ds=Object.assign({},c.ds||{},{d:o.dose.dose,f:o.dose.freq||'',c:o.dose.cycle||'',r:o.dose.route||''})})}catch(e){}})();\n" + s[j:]
os.makedirs('home/v92', exist_ok=True)
open('home/v92/index.html', 'w', encoding='utf8').write(s)
print('guide v92 preview', n)
