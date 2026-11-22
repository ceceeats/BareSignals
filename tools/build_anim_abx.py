#!/usr/bin/env python3
"""Generate /library/anim/antibiotics.js: the Antibiotics & your gut story for the shared
BSAnim engine (/library/anim.js), replacing the bespoke animation that was on the Case page.

Scene: a cross-section of the colon wall. Five timeline stages (day 0 to 6 months) then three
study scenes (12 men / 180 days, 3 people / two courses, clindamycin at 2 years) and one mouse
scene (diet decides the recovery).
"""
import os, random

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(REPO, 'library/anim/antibiotics.js')

# ---------------------------------------------------------------- geometry
VB = (360, 252)
LUM_T, LUM_B = 12, 112          # where residents live
MUC_T, MUC_B = 118, 142         # mucus coat
EPI_T, EPI_B = 142, 198         # lining cells
CRYPT_X0, CRYPT_X1 = 254, 306
VESSEL_Y = 236

# ---------------------------------------------------------------- residents
# cls decides what happens to each one:
#   d1   knocked down first (days 1-4), grows back in the rebound
#   d2   holds out a little longer, gone by the gap, back by 6 months
#   keep survives the whole course
#   lost gone by the gap and never detected again (the 9 of Palleja 2018)
FAM = {
    'but':  ('#AACC96', 'rod'),    # butyrate makers
    'bif':  ('#E1DE62', 'rod'),    # Bifidobacterium
    'bac':  ('#99ACFF', 'oval'),   # Bacteroides
    'oth':  ('#87CFC5', 'round'),  # other residents
}
PLAN = [  # (family, class, how many)
    ('but', 'd1', 4), ('but', 'd2', 3), ('but', 'keep', 2), ('but', 'lost', 3),
    ('bif', 'd1', 4), ('bif', 'd2', 2), ('bif', 'keep', 1), ('bif', 'lost', 3),
    ('bac', 'd1', 4), ('bac', 'd2', 4), ('bac', 'keep', 5), ('bac', 'lost', 2),
    ('oth', 'd1', 3), ('oth', 'd2', 4), ('oth', 'keep', 4), ('oth', 'lost', 1),
]

rnd = random.Random(20261122)


def spread(n, seen, x0=16, x1=330, y0=LUM_T + 4, y1=LUM_B - 4, minimum=19):
    """Blue-noise-ish placement so nothing overlaps and the field looks even."""
    pts = []
    tries = 0
    while len(pts) < n and tries < 9000:
        tries += 1
        x, y = rnd.uniform(x0, x1), rnd.uniform(y0, y1)
        if all((x - a) ** 2 + (y - b) ** 2 > minimum ** 2 for a, b in seen + pts):
            pts.append((x, y))
    return pts


placed = []
residents = []
for fam, cls, n in PLAN:
    for (x, y) in spread(n, placed):
        placed.append((x, y))
        residents.append(dict(f=fam, cls=cls, x=round(x, 1), y=round(y, 1),
                              r=round(rnd.uniform(-38, 38)), s=round(rnd.uniform(.88, 1.12), 2)))

blooms = [dict(x=round(x, 1), y=round(y, 1), r=round(rnd.uniform(-38, 38)), s=round(rnd.uniform(.9, 1.15), 2))
          for (x, y) in spread(15, placed, minimum=17)]
placed += [(b['x'], b['y']) for b in blooms]
yeast = [dict(x=round(x, 1), y=round(y, 1), s=round(rnd.uniform(.95, 1.2), 2))
         for (x, y) in spread(3, placed, minimum=22)]


def shape(fam, s):
    c, sh = FAM[fam]
    if sh == 'rod':
        w, h = 13 * s, 5.6 * s
        return f'<rect x="{-w/2:.1f}" y="{-h/2:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{h/2:.1f}" fill="{c}" stroke="#5E6B3F" stroke-width=".7"/>'
    if sh == 'oval':
        return f'<ellipse rx="{6.4*s:.1f}" ry="{4.4*s:.1f}" fill="{c}" stroke="#4A5790" stroke-width=".7"/>'
    return f'<circle r="{4.7*s:.1f}" fill="{c}" stroke="#3E7A72" stroke-width=".7"/>'


def grp(items, cls_prefix=''):
    out = []
    for m in items:
        out.append(f'<g class="{m["cls"]}" transform="translate({m["x"]} {m["y"]}) rotate({m["r"]})">{shape(m["f"], m["s"])}</g>')
    return ''.join(out)


resid_svg = grp(residents)
bloom_svg = ''.join(
    f'<g transform="translate({b["x"]} {b["y"]}) rotate({b["r"]})">'
    f'<rect x="{-6.8*b["s"]:.1f}" y="{-2.9*b["s"]:.1f}" width="{13.6*b["s"]:.1f}" height="{5.8*b["s"]:.1f}" rx="{2.9*b["s"]:.1f}" fill="#FF5050" stroke="#A62020" stroke-width=".8"/></g>'
    for b in blooms)
yeast_svg = ''.join(
    f'<g transform="translate({y["x"]} {y["y"]})"><circle r="{5.4*y["s"]:.1f}" fill="#FF99D8" stroke="#A8407F" stroke-width=".8"/>'
    f'<circle cx="{4.2*y["s"]:.1f}" cy="{-3.4*y["s"]:.1f}" r="{2.8*y["s"]:.1f}" fill="#FFC2E6" stroke="#A8407F" stroke-width=".7"/></g>'
    for y in yeast)
ghost_svg = ''.join(
    f'<g transform="translate({m["x"]} {m["y"]}) rotate({m["r"]})">'
    f'<rect x="-6.6" y="-2.9" width="13.2" height="5.8" rx="2.9" fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2"/></g>'
    for m in residents if m['cls'] == 'lost')

# ---------------------------------------------------------------- the wall
cells = []
x = 0
while x < VB[0]:
    if CRYPT_X0 <= x < CRYPT_X1:
        x += 26
        continue
    w = min(26, VB[0] - x)
    cells.append((x, w))
    x += 26
cells_svg = ''.join(
    f'<rect x="{cx}" y="{EPI_T}" width="{cw}" height="{EPI_B-EPI_T}" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/>'
    f'<ellipse cx="{cx+cw/2:.0f}" cy="{EPI_B-14}" rx="4.4" ry="5.4" fill="#F0C9B6" stroke="#D99C86" stroke-width=".8"/>'
    for cx, cw in cells)
crypt_svg = (f'<path d="M{CRYPT_X0} {EPI_T} C{CRYPT_X0} {EPI_B+26} {CRYPT_X0+14} {EPI_B+34} {(CRYPT_X0+CRYPT_X1)//2} {EPI_B+34}'
             f' C{CRYPT_X1-14} {EPI_B+34} {CRYPT_X1} {EPI_B+26} {CRYPT_X1} {EPI_T} Z" fill="#FFF3E7" stroke="#D99C86" stroke-width="1.2"/>'
             f'<path d="M{CRYPT_X0+8} {EPI_T+6} C{CRYPT_X0+8} {EPI_B+20} {CRYPT_X0+18} {EPI_B+26} {(CRYPT_X0+CRYPT_X1)//2} {EPI_B+26}'
             f' C{CRYPT_X1-18} {EPI_B+26} {CRYPT_X1-8} {EPI_B+20} {CRYPT_X1-8} {EPI_T+6}" fill="none" stroke="#E7B4A2" stroke-width=".9"/>')
brush_svg = ''.join(f'<path d="M{bx} {EPI_T}v-5"/>' for bx in range(5, 356, 7))


def mucus(th, op):
    top = MUC_B - th
    return (f'<rect x="0" y="{top}" width="360" height="{th}" fill="#CAF5F7" opacity="{op}"/>'
            f'<path d="M0 {top}q25-6 50 0t50 0t50 0t50 0t50 0t50 0t60 0" fill="none" stroke="#7CC6D0" stroke-width="1.3"/>')


def arrows(n):
    out = []
    for i in range(n):
        bx = 28 + i * 58
        out.append(f'<path d="M{bx} {MUC_T-14}V{EPI_T+6}" stroke="#6E9B52" stroke-width="2.4" marker-end="url(#abxArw)"/>')
    return ''.join(out)


BILE = ''.join(
    f'<g transform="translate({28+i*58} {MUC_T+10})"><circle r="4.2" fill="#F6E3A8" stroke="#A88400" stroke-width="1"/>'
    f'<path d="M-2 0h4M0 -2v4" stroke="#A88400" stroke-width="1.1" stroke-linecap="round"/></g>' for i in range(6))

RES = ''.join(
    f'<g transform="translate({26+i*44} {LUM_B+2})"><rect x="-6" y="-5" width="12" height="10" rx="1.6" fill="#F9DEDE" stroke="#C02626" stroke-width=".9"/>'
    f'<text x="0" y="3.4" font-family="JetBrains Mono,monospace" font-size="6.8" fill="#C02626" text-anchor="middle">R</text></g>'
    for i in range(7))

PILL = ('<g class="flowg"></g>')
PILL_BEAD = ('<g transform="rotate(-24)"><rect x="-10" y="-6" width="20" height="12" rx="6" fill="#FFFFF4" stroke="#3E4A80" stroke-width="1.4"/>'
             '<path d="M0 -6v12" stroke="#3E4A80" stroke-width="1.4"/>'
             '<path d="M-10 0a6 6 0 0 1 6-6h4v12h-4a6 6 0 0 1-6-6z" fill="#DB6830" opacity=".55"/></g>')

def _js(s):
    """Embed a python string as a JS single-quoted literal."""
    return "'" + s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '') + "'"


# ---------------------------------------------------------------- study scenes
def _T(x, y, s, anchor='start'):
    an = f' text-anchor="{anchor}"' if anchor != 'start' else ''
    return f'<text class="tm" x="{x}" y="{y}"{an}>{s}</text>'


def _cap(s):
    return _T(12, 240, s)


def _axes(x0, y0, x1, y1):
    return f'<path class="ln" d="M{x0} {y0}V{y1}H{x1}" fill="none" stroke="#3E4A80" stroke-width="1.3"/>'


def _study_palleja():
    x0, y0, x1, y1 = 34, 30, 220, 168
    g = _axes(x0, y0, x1, y1)
    g += _T(x0 - 4, y0 - 8, 'DIVERSITY')
    g += f'<path d="M{x0} 48H{x1}" stroke="#6B76A8" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>'
    g += _T(x1, 44, 'START LEVEL', 'end')
    g += (f'<path class="ln" d="M{x0} 48C54 48 58 150 76 154C98 159 112 96 140 82C168 69 194 62 {x1} 60" '
          f'fill="none" stroke="#2E8F82" stroke-width="2.6" stroke-linecap="round"/>')
    g += _T(78, 170, 'LOW POINT')
    g += _T(150, 76, '~1.5 MONTHS')
    g += ('<g class="gh"><text x="288" y="70" font-family="JetBrains Mono,monospace" font-size="38" font-weight="700" '
          'fill="#3E4A80" text-anchor="middle" data-from="0" data-to="9" data-dec="0">0</text>')
    g += _T(288, 88, 'SPECIES', 'middle') + _T(288, 100, 'STILL GONE', 'middle') + _T(288, 112, 'AT 6 MONTHS', 'middle')
    g += ('<g fill="none" stroke="#6B76A8" stroke-width="1.1" stroke-dasharray="2.4 2">'
          + ''.join(f'<rect x="{262+(i%3)*18}" y="{124+(i//3)*12}" width="13" height="5.8" rx="2.9"/>' for i in range(9))
          + '</g></g>')
    g += _cap('12 MEN  ·  3 DRUGS, 4 DAYS  ·  180 DAYS WATCHED')
    return g


def _study_cipro():
    x0, y0, x1, y1 = 34, 40, 326, 168
    g = _axes(x0, y0, x1, y1)
    g += f'<path d="M{x0} 56H{x1}" stroke="#6B76A8" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>'
    g += _T(x0 + 2, 52, 'START LEVEL')
    g += ('<path class="ln" d="M34 56C58 56 62 140 80 144C104 149 120 72 150 66C176 61 186 62 192 64'
          'C200 140 214 146 232 148C258 151 276 104 300 98C314 95 322 94 326 94" fill="none" stroke="#2E8F82" '
          'stroke-width="2.6" stroke-linecap="round"/>')
    g += ('<g class="mk"><path d="M74 26v14" stroke="#DB6830" stroke-width="2"/>' + _T(74, 22, 'DOSE 1', 'middle')
          + '<path d="M196 26v14" stroke="#DB6830" stroke-width="2"/>' + _T(196, 22, 'DOSE 2', 'middle') + '</g>')
    g += ('<g class="mk"><path d="M262 86h58" stroke="#C02626" stroke-width="1" stroke-dasharray="3 3"/>'
          + _T(320, 82, 'A NEW STABLE STATE', 'end') + '</g>')
    g += _cap('3 PEOPLE  ·  2 COURSES  ·  OVER 10 MONTHS')
    return g


def _study_clinda():
    g = _T(12, 22, 'BACTEROIDES: BACK TO ITS ORIGINAL MIX?')
    base = 176
    g += f'<path class="ln" d="M40 44V{base}H340" fill="none" stroke="#3E4A80" stroke-width="1.3"/>'
    bars = [(64, 108, '#AACC96', 'CONTROLS', 'ALMOST'), (168, 44, '#FF5050', 'CLINDA.', 'NO'), (268, 70, '#F9DEDE', 'RESIST.', 'HIGH')]
    for bx, bh, col, lab, top in bars:
        st = '#C02626' if col == '#F9DEDE' else '#3E4A80'
        g += f'<g class="g"><rect x="{bx}" y="{base-bh}" width="60" height="{bh}" fill="{col}" stroke="{st}" stroke-width="1.2"/></g>'
        g += _T(bx + 30, base + 15, lab, 'middle')
        g += _T(bx + 30, base - bh - 6, top, 'middle')
    g += _T(64 + 30, 40, 'barely changed over 2 years', 'middle') if False else ''
    g += _cap('4 ON CLINDAMYCIN  ·  4 CONTROLS  ·  2 YEARS')
    return g


def _study_mice():
    x0, y0, x1, y1 = 40, 34, 300, 164
    g = _axes(x0, y0, x1, y1)
    g += _T(x0 - 4, y0 - 8, 'RECOVERY')
    g += _T(x1, y1 + 16, 'TIME AFTER THE COURSE', 'end')
    g += ('<path class="ln" d="M40 140C70 138 96 84 140 70C190 55 240 50 300 48" fill="none" stroke="#2E8F82" '
          'stroke-width="2.6" stroke-linecap="round"/>')
    g += ('<path class="ln" d="M40 144C72 143 100 128 142 118C196 106 244 102 300 100" fill="none" stroke="#C9A100" '
          'stroke-width="2.6" stroke-linecap="round" stroke-dasharray="6 4"/>')
    g += '<g class="mk">' + _T(298, 42, 'FIBRE', 'end') + _T(298, 94, 'FIBRE-POOR', 'end') + '</g>'
    g += _cap('MICE WITH A HUMAN MICROBIOTA  ·  SAME DRUG')
    return g


os.makedirs(os.path.dirname(OUT), exist_ok=True)
TMPL = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '_abx_tmpl.js.txt'), encoding='utf8').read()
SUB = {
    '@@RESID@@': resid_svg, '@@BLOOMS@@': bloom_svg, '@@YEAST@@': yeast_svg, '@@GHOSTS@@': ghost_svg,
    '@@CELLS@@': cells_svg, '@@CRYPT@@': crypt_svg, '@@BRUSH@@': brush_svg,
    '@@MUCFULL@@': mucus(24, '.62'), '@@MUCTHIN@@': mucus(11, '.45'),
    '@@ARR6@@': arrows(6), '@@ARR2@@': arrows(2), '@@ARR4@@': arrows(4),
    '@@BILE@@': BILE, '@@RES@@': RES, '@@PILL@@': PILL, '@@PILLBEAD@@': PILL_BEAD,
    '@@SPALL@@': _study_palleja(), '@@SCIPRO@@': _study_cipro(),
    '@@SCLIN@@': _study_clinda(), '@@SMICE@@': _study_mice(),
}
for k, v in SUB.items():
    if k not in TMPL:
        raise SystemExit('marker missing in template: ' + k)
    # the markers sit inside JS single-quoted strings, so escape for that context
    TMPL = TMPL.replace(k, v.replace("\\", "\\\\").replace("'", "\\'"))
JS = TMPL
open(OUT, 'w', encoding='utf8').write(JS)
print('wrote', OUT, os.path.getsize(OUT), 'bytes')
