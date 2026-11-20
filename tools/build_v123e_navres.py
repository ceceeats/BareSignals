"""Library v123e (20 Nov 2026, built on v123d, kept): the messy-visitor QA fix 'no jump on load' (reserve the site bar
height and width padding in the head; text-size fallback reads nav's bs-text2 keys, default A) applied on top of the newest
Library, since the QA clone built its copy on v123. Same patch as tools/build_navres_1120.py; also re-applied to the v122 preview."""
import os, re, shutil
os.chdir('/home/claude/bs-guide')
src = open('tools/build_navres_1120.py', encoding='utf8').read()
defs = src[src.index('MARK ='):src.index('# Library: root')]
exec(defs)
if os.path.exists('library/v123e'): shutil.rmtree('library/v123e')
shutil.copytree('library/v123d', 'library/v123e')
patch('library/v123e/index.html', 'Library v123e (20 Nov 2026, built on v123d, kept): ' + WHY)
shutil.copy('library/v123e/index.html', 'library/index.html')
if os.path.exists('library/v122/index.html'): patch('library/v122/index.html')
print('ok')
