"""Library v121b (20 Nov 2026, live, built on v121, kept): the gap under the toolbar on All and Peptides is now 8px, matching
Supplements v33, Cases v23 and Goals v15 (toolbar v7), so the top of every Library tab sits in the same place.
Named v121b so it cannot collide with the v122 preview another thread is building; the same CSS is added to that v122
preview so the fix survives when it publishes. CSS only."""
import os, shutil
os.chdir('/home/claude/baresignals')
CSS = "\n/* v121b: 8px under the toolbar on every tab, like Supplements v33 */\n#toolsph{margin-bottom:-8px!important}\n.pep116 #brw{margin-top:4px!important;padding-top:0!important}\n"
def patch(p, comment=None):
    s = open(p, encoding='utf8').read()
    if 'v121b: 8px under the toolbar' in s: return
    assert '</style>' in s
    s = s.replace('</style>', CSS + '</style>', 1)
    if comment: s = s.replace('<!doctype html>\n', '<!doctype html>\n<!-- ' + comment + ' -->\n', 1)
    open(p, 'w', encoding='utf8').write(s)
src, dst = 'library/v121', 'library/v121b'
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src, dst)
patch(f'{dst}/index.html', 'Library v121b (20 Nov 2026, built on v121, kept): 8px gap under the toolbar on All and Peptides, matching Supplements, Cases and Goals.')
shutil.copy(f'{dst}/index.html', 'library/index.html')
if os.path.exists('library/v122/index.html'): patch('library/v122/index.html')
print('ok')
