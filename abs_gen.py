"""Organic rectus abdominis ("six-pack") shapes for the body SVGs.
Each column has one smooth outer contour (widest under the ribs, tapering to the pubis), a linea alba
that is wider above the navel and narrow below, three slightly slanted tendinous lines, and segments
that dome like soft pillows; corners are rounded with Chaikin smoothing."""
import math
def chaikin(pts, it=3):
    for _ in range(it):
        out=[];n=len(pts)
        for i in range(n):
            p,q=pts[i],pts[(i+1)%n]
            out.append((p[0]*.75+q[0]*.25,p[1]*.75+q[1]*.25));out.append((p[0]*.25+q[0]*.75,p[1]*.25+q[1]*.75))
        pts=out
    return pts
def column(mid, side, top, bot, w, gap=1.3, cuts=(.17,.345,.53), sg=2.1, seed=0.0):
    H=bot-top
    def outer(t):
        t=max(0,min(1,t)); return gap+w*(1.0+0.1*t-0.66*t*t)
    def inner(t):
        t=max(0,min(1,t)); return gap*(1.9-1.1*t)
    def line(c,tx):   # tendinous line, slightly higher toward the outside
        return top+H*c-H*0.012*tx+H*0.003*math.sin(tx*math.pi*1.5+seed+c*9)
    dome=H*0.009
    edges=[0]+list(cuts)+[1];segs=[];N=4
    for i in range(4):
        a,b=edges[i],edges[i+1];pts=[]
        for k in range(N+1):                      # top edge, inner -> outer
            tx=k/N
            ty=top+H*(0.012-0.024*tx)-dome*0.6*math.sin(math.pi*tx) if i==0 else line(a,tx)+sg-dome*math.sin(math.pi*tx)
            t=(ty-top)/H;pts.append((mid+side*(inner(t)+(outer(t)-inner(t))*tx),ty))
        y0=pts[-1][1];yb=(line(b,1)-sg) if i<3 else bot-H*0.05
        for k in range(1,N):                      # outer edge, down, bulging like a pillow
            u=k/N;y=y0+(yb-y0)*u;pts.append((mid+side*(outer((y-top)/H)+w*0.07*math.sin(math.pi*u)),y))
        for k in range(N,-1,-1):                  # bottom edge, outer -> inner
            tx=k/N
            ty=(line(b,tx)-sg+dome*math.sin(math.pi*tx)) if i<3 else bot-H*0.05*tx
            t=(ty-top)/H;pts.append((mid+side*(inner(t)+(outer(t)-inner(t))*tx),ty))
        y1=pts[-1][1];y2=pts[0][1]
        for k in range(1,N):                      # inner edge, up, slightly rounded
            u=k/N;y=y1+(y2-y1)*u;pts.append((mid+side*max(0.4,inner((y-top)/H)-w*0.025*math.sin(math.pi*u)),y))
        segs.append("M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in chaikin(pts))+"Z")
    return "".join(segs)
