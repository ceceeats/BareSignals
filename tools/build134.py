"""Library v134 (27 Nov 2026, built on v133, kept): Full read, Where it acts. On phones the body map ran edge to edge and
the body captures every touch (drag and pinch to explore), so a swipe over it moved the body instead of the page.
Now on phones the map sits inside a 44px scroll lane on each side (page background, with a faint guide line), so a thumb on
either edge always scrolls the page. Laptop unchanged. No compound facts changed."""
import os, shutil
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); os.chdir(REPO)
src, dst = 'library/v133', 'library/v134'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
p = f'{dst}/index.html'; s = open(p, encoding='utf8').read()
css = ('<style>/* v134: scroll lanes beside the body map on phones */@media (max-width:899px){'
       '.k-body104 .b65{padding:0 44px!important;position:relative;background:transparent}'
       '.k-body104 .b65::before,.k-body104 .b65::after{content:"";position:absolute;top:12px;bottom:12px;width:0;border-left:1.5px dashed #E3E0BF}'
       '.k-body104 .b65::before{left:21px}.k-body104 .b65::after{right:21px}'
       '.k-body104 iframe{min-height:400px!important}}</style>\n')
assert '</head>' in s
s = s.replace('</head>', css + '</head>', 1)
s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- Library v134 (27 Nov 2026, built on v133, kept): phones get a 44px scroll lane on each side of the Where it acts body map, so swiping beside the body scrolls the page instead of moving the body. Laptop unchanged. No compound numbers changed. -->\n', 1)
open(p, 'w', encoding='utf8').write(s)
shutil.copy(p, 'library/index.html')
print('ok v134')
