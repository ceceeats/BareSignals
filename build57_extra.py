# v57 additions, run by build57.py after the v56 steps (uses its sub() and src)
def apply(sub, get, put):
    # study card: text one step smaller
    sub("color:var(--ink);font:400 12.5px/1.42 var(--body)}", "color:var(--ink);font:400 11.5px/1.4 var(--body)}")
    sub(".stpop .spc{margin:0 0 4px;color:#5A6390;font-size:11.5px}", ".stpop .spc{margin:0 0 4px;color:#5A6390;font-size:10.5px}")
    sub(".stpop .spn{margin:0 0 7px;font-size:11px;color:#5A6390}", ".stpop .spn{margin:0 0 7px;font-size:10px;color:#5A6390}")
    sub(".stpop .spw{text-transform:none;letter-spacing:0;font-family:var(--body);font-size:11px;color:#5A6390}",
        ".stpop .spw{text-transform:none;letter-spacing:0;font-family:var(--body);font-size:10.5px;color:#5A6390}")
    sub(".stpop .sph b{font:500 12px/1.25 var(--mono);", ".stpop .sph b{font:500 11px/1.25 var(--mono);")
    # top-left summary: the nickname line, then the full plain intro (not just the teaser)
    sub('${PUNCH[c.s]?`<p class="pl">${esc(PUNCH[c.s])}</p>`:""}',
        '${(PUNCH[c.s]||c.in)?`<p class="pl">${esc(sumText(c))}</p>`:""}')
    s = get(); i = s.index("function ctags(){")
    put(s[:i] + 'function sumText(c){const p=PUNCH[c.s]||"",lead=(p.match(/^[^.;]{2,40}\\.\\s/)||[""])[0].trim(),body=c.in||p;return (lead&&!body.startsWith(lead)?lead+" ":"")+body;}\n' + s[i:])
    # phone: smaller summary text; the box may reach across the arm to the shoulder joint
    sub("@media (max-width:899px){.ctags .pl{font-size:10.5px;line-height:1.32;", "@media (max-width:899px){.ctags .pl{font-size:9.5px;line-height:1.3;")
    sub(".ctags .pl{margin:0;font:500 11.5px/1.36 var(--body);", ".ctags .pl{margin:0;font:500 11px/1.36 var(--body);")
    sub('let left=ex?(ex[0]-V.x)/V.k:sr.width*.3;',
        'let left=ex?(ex[0]-V.x)/V.k:sr.width*.3;{const hd=extAt(s,V.y,V.y+V.h*.13);if(hd){const sh=(hd[0]-V.x)/V.k-(isPhone()?18:30);left=Math.max(left,Math.min(sh,sr.width*(isPhone()?.47:.36)));}}')
    sub('if(!e2)break;left=Math.max(left,(e2[0]-V.x)/V.k);}', 'if(!e2)break;}')
