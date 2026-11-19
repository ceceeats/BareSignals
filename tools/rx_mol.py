import math,json
def u(a):r=math.radians(a);return (math.cos(r),math.sin(r))
def add(p,a,d=1.0):x,y=u(a);return (round(p[0]+x*d,3),round(p[1]+y*d,3))
class M:
    def __init__(s):s.a=[];s.b=[]
    def at(s,el,p):s.a.append([el,round(p[0],3),round(p[1],3)]);return len(s.a)-1
    def bd(s,i,j,o=1):s.b.append([i,j,o])
    def pos(s,i):return (s.a[i][1],s.a[i][2])
    def out(s,cid):return {"a":s.a,"b":s.b,"cid":cid}
R={}
# metronidazole: pentagon
m=M();r=1/(2*math.sin(math.radians(36)))
ang={'N1':-126,'C2':-54,'N3':18,'C4':90,'C5':162}
P={k:(r*math.cos(math.radians(v)),r*math.sin(math.radians(v))) for k,v in ang.items()}
i={k:m.at(k[0],P[k]) for k in ['N1','C2','N3','C4','C5']}
for a,b,o in [('N1','C2',1.5),('C2','N3',1.5),('N3','C4',1.5),('C4','C5',1.5),('C5','N1',1.5)]:m.bd(i[a],i[b],o)
me=m.at('C',add(P['C2'],-54));m.bd(i['C2'],me)
nN=m.at('N',add(P['C5'],162));m.bd(i['C5'],nN)
o1=m.at('O',add(m.pos(nN),102));o2=m.at('O',add(m.pos(nN),222));m.bd(nN,o1,2);m.bd(nN,o2)
c1=m.at('C',add(P['N1'],-126));m.bd(i['N1'],c1)
c2=m.at('C',add(m.pos(c1),-66));m.bd(c1,c2)
oh=m.at('O',add(m.pos(c2),-126));m.bd(c2,oh)
R['metronidazole']=m.out(4173)
# tranexamic acid: hexagon pointy-left/right
m=M();ring=[m.at('C',u(a)) for a in [0,60,120,180,240,300]]
for k in range(6):m.bd(ring[k],ring[(k+1)%6])
cc=m.at('C',add(m.pos(ring[0]),0));m.bd(ring[0],cc)
m.bd(cc,m.at('O',add(m.pos(cc),60)),2);m.bd(cc,m.at('O',add(m.pos(cc),-60)))
ch=m.at('C',add(m.pos(ring[3]),180));m.bd(ring[3],ch)
m.bd(ch,m.at('N',add(m.pos(ch),120)))
R['tranexamic-acid']=m.out(5526)
# dexketoprofen
m=M();A=[90,30,-30,-90,-150,150]
B=[m.at('C',u(a)) for a in A]
for k in range(6):m.bd(B[k],B[(k+1)%6],1.5)
co=m.at('C',add(m.pos(B[5]),150));m.bd(B[5],co)
m.bd(co,m.at('O',add(m.pos(co),90)),2)
a1=add(m.pos(co),210);cen=add(a1,210)
RA=[m.at('C',add(cen,30+60*k)) for k in range(6)]
for k in range(6):m.bd(RA[k],RA[(k+1)%6],1.5)
m.bd(co,RA[0])
ca=m.at('C',add(m.pos(B[1]),30));m.bd(B[1],ca)
m.bd(ca,m.at('C',add(m.pos(ca),90)))
cx=m.at('C',add(m.pos(ca),-30));m.bd(ca,cx)
m.bd(cx,m.at('O',add(m.pos(cx),30)),2);m.bd(cx,m.at('O',add(m.pos(cx),-90)))
R['dexketoprofen']=m.out(667550)
# doxycycline: rings D C B A left to right
m=M();s3=math.sqrt(3);cx={'D':0,'C':s3,'B':2*s3,'A':3*s3}
V={};
def vp(ring,a):return add((cx[ring],0),a)
names={'A':{90:'C4',30:'C3',-30:'C2',-90:'C1',-150:'C12a',150:'C4a'},
       'B':{90:'C5',30:'C4a',-30:'C12a',-90:'C12',-150:'C11a',150:'C5a'},
       'C':{90:'C6',30:'C5a',-30:'C11a',-90:'C11',-150:'C10a',150:'C6a'},
       'D':{90:'C7',30:'C6a',-30:'C10a',-90:'C10',-150:'C9',150:'C8'}}
for rg,d in names.items():
    for a,n in d.items():
        if n not in V:V[n]=m.at('C',vp(rg,a))
done=set()
for rg,d in names.items():
    seq=[d[a] for a in [90,30,-30,-90,-150,150]]
    for k in range(6):
        x,y=seq[k],seq[(k+1)%6];key=frozenset((x,y))
        if key in done:continue
        done.add(key);o=1.5 if rg=='D' else 1
        if key in (frozenset(('C2','C3')),frozenset(('C11a','C12'))):o=2
        m.bd(V[x],V[y],o)
P=lambda n:m.pos(V[n])
def sub(n,el,a,o=1):j=m.at(el,add(P(n),a));m.bd(V[n],j,o);return j
nn=sub('C4','N',90);m.bd(nn,m.at('C',add(m.pos(nn),30)));m.bd(nn,m.at('C',add(m.pos(nn),150)))
sub('C5','O',90);sub('C6','C',90);sub('C10','O',-90);sub('C11','O',-90,2);sub('C12','O',-90)
sub('C12a','O',-90);sub('C1','O',-90,2);sub('C3','O',30)
am=sub('C2','C',-30);m.bd(am,m.at('O',add(m.pos(am),-90)),2);m.bd(am,m.at('N',add(m.pos(am),30)))
R['doxycycline']=m.out(54671203)
json.dump(R,open('mol.json','w'))
print({k:len(v['a']) for k,v in R.items()})
