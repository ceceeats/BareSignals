# v58: phone summary = nickname + first two whole sentences, in the same size as the label notes; laptop keeps the full intro
def apply(sub, get, put):
    sub('function sumText(c){const p=PUNCH[c.s]||"",lead=(p.match(/^[^.;]{2,40}\\.\\s/)||[""])[0].trim(),body=c.in||p;return (lead&&!body.startsWith(lead)?lead+" ":"")+body;}',
        'function sumText(c){const p=PUNCH[c.s]||"",lead=(p.match(/^[^.;]{2,40}\\.\\s/)||[""])[0].trim();let body=c.in||p;if(isPhone()&&c.in){const ss=c.in.split(/(?<=[.!?])\\s+(?=[A-Z0-9])/);body=ss.slice(0,2).join(" ");}return (lead&&!body.startsWith(lead)?lead+" ":"")+body;}')
    sub("@media (max-width:899px){.ctags .pl{font-size:9.5px;line-height:1.3;", "@media (max-width:899px){.ctags .pl{font-size:8.4px;line-height:1.32;")
