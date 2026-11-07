#!/usr/bin/env python3
"""Open Graph thumbnail for baresignals.co (1200x630). Mashup of the real home:
torso from the body figure + role-colour stripe + wordmark + filled role tags.
Run from repo root; writes og.png (served at /og.png)."""
from PIL import Image, ImageDraw, ImageFont
S=2; W,H=1200*S,630*S
FB="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FR="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def f(path,px): return ImageFont.truetype(path,px*S)
torso=Image.open("/tmp/torso.png").convert("RGB")
bg=torso.getpixel((4,4))                      # match the figure's own cream so it melts in
im=Image.new("RGB",(W,H),bg); d=ImageDraw.Draw(im)
INK=(62,74,128); SOFT=(110,120,165)
# --- top role stripe ---
stripe=["#E1DE62","#FF5050","#6777B6","#DDD0F6","#DBFAB3","#FFA51F","#5271FF","#C2DCFF","#FF99D8","#924C1C","#99ACFF","#FFDE59"]
bw=W/len(stripe); hgt=16*S
for i,c in enumerate(stripe): d.rectangle([i*bw,0,(i+1)*bw,hgt],fill=c)
# --- torso on the left ---
th=486*S; tw=int(torso.width*th/torso.height); torso=torso.resize((tw,th),Image.LANCZOS)
tx,ty=70*S,(H-th)//2+10*S; im.paste(torso,(tx,ty))
# --- right column ---
RX=tx+tw+54*S
# wordmark with tracking
def tracked(draw,xy,text,font,fill,track):
    x,y=xy
    for ch in text:
        draw.text((x,y),ch,font=font,fill=fill)
        x+=draw.textlength(ch,font=font)+track*S
    return x
wf=f(FB,66); tracked(d,(RX,150*S),"BARE",wf,INK,6); 
tracked(d,(RX,224*S),"SIGNALS",wf,INK,6)
# tagline
tf=f(FR,25); 
d.text((RX,312*S),"The peptide & compound library.",font=tf,fill=INK)
d.text((RX,348*S),"See where each one works in the body.",font=tf,fill=SOFT)
# role tags (name, hex)
tags=[("TISSUE REPAIR","#E1DE62"),("SLEEP & RHYTHMS","#5271FF"),("FAT METABOLISM","#FFA51F"),
      ("SKIN","#FFEEEE"),("COGNITION","#C2DCFF"),("INFLAMMATION","#FF5050")]
def lum(hx): r,g,b=[int(hx[i:i+2],16) for i in (1,3,5)]; return 0.299*r+0.587*g+0.114*b
cf=f(FB,15); padx,pady=11*S,7*S; gx,gy=9*S,9*S
x,y=RX,410*S; maxx=W-50*S
for name,hx in tags:
    tw2=d.textlength(name,font=cf); cw=tw2+2*padx; chh=cf.size+2*pady
    if x+cw>maxx: x=RX; y+=chh+gy
    d.rounded_rectangle([x,y,x+cw,y+chh],radius=5*S,fill=hx,outline=INK,width=1*S)
    d.text((x+padx,y+pady-1*S),name,font=cf,fill=(255,255,255) if lum(hx)<150 else INK)
    x+=cw+gx
# footer
ff=f(FB,20); d.text((RX,H-54*S),"baresignals.co",font=ff,fill=INK)
im=im.resize((1200,630),Image.LANCZOS); im.save("og.png"); im.save("/tmp/og_preview.png")
print("og.png", im.size, "bg", bg)
