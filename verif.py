# -*- coding: utf-8 -*-
"""Verification CIP : on transcrit EXACTEMENT les coordonnees SVG des figures du
   fichier HTML (y vers le BAS) puis on les convertit en convention molfile (y vers
   le HAUT) en changeant le signe de y."""
from rdkit import Chem
from rdkit.Chem import rdCIPLabeler

def build(atoms,bonds,name="m",svg_y_down=True):
    f=-1.0 if svg_y_down else 1.0
    L=[name,"  CH0904","",f"{len(atoms):3d}{len(bonds):3d}  0  0  1  0  0  0  0  0999 V2000"]
    for s,x,y in atoms:
        L.append(f"{x:10.4f}{f*y:10.4f}{0.0:10.4f} {s:<3s} 0  0  0  0  0  0  0  0  0  0  0  0")
    for i,j,o,w in bonds:
        L.append(f"{i:3d}{j:3d}{o:3d}{w:3d}")
    L.append("M  END")
    return "\n".join(L)

def report(mb,label,expect=None):
    m=Chem.MolFromMolBlock(mb)
    if m is None: print(f"### {label}\n  !! molblock invalide\n"); return
    Chem.AssignStereochemistry(m,cleanIt=True,force=True)
    rdCIPLabeler.AssignCIPLabels(m)
    out=[]
    for a in m.GetAtoms():
        if a.HasProp('_CIPCode'):
            out.append(f"C{a.GetIdx()+1}[{'/'.join(n.GetSymbol()+str(n.GetIdx()+1) for n in a.GetNeighbors())}] = {a.GetProp('_CIPCode')}")
    for b in m.GetBonds():
        if b.GetStereo()!=Chem.BondStereo.STEREONONE:
            d=b.GetPropsAsDict()
            out.append(f"liaison {b.GetBeginAtomIdx()+1}={b.GetEndAtomIdx()+1} : {d.get('_CIPCode',str(b.GetStereo()))}")
    print(f"### {label}")
    print(f"  SMILES canonique : {Chem.MolToSmiles(m)}")
    print(f"  descripteurs     : {'; '.join(out) if out else 'aucun'}")
    if expect: print(f"  attendu          : {expect}")
    print()

# coordonnees du cycle oxazolidinone telles qu'ecrites dans le HTML (RING, y SVG)
O1=(0,28); C2=(8,0); N=(37,0); C4=(46,28); C5=(23,46)
def ring(P, extra_atoms, extra_bonds, aux, wedge):
    px,py=P
    A=[('O',px+O1[0],py+O1[1]),('C',px+C2[0],py+C2[1]),('N',px+N[0],py+N[1]),
       ('C',px+C4[0],py+C4[1]),('C',px+C5[0],py+C5[1]),('O',px+C2[0]-10,py+C2[1]-24)]
    B=[(1,2,1,0),(2,3,1,0),(3,4,1,0),(4,5,1,0),(5,1,1,0),(2,6,2,0)]
    w = 1 if wedge else 6
    if aux=='ipr':
        A+= [('C',px+C4[0]+12,py+C4[1]+26),('C',px+C4[0]-2,py+C4[1]+48),('C',px+C4[0]+34,py+C4[1]+34)]
        B+= [(4,7,1,w),(7,8,1,0),(7,9,1,0)]
    else:
        A+= [('C',px+C4[0]+20,py+C4[1]+20)]                       # Me sur C4
        B+= [(4,7,1,w)]
        phx,phy = px+C5[0]-14, py+C5[1]+25                        # Ph sur C5
        A+= [('C',phx,phy),('C',phx-26,phy+6),('C',phx-46,phy-12),('C',phx-40,phy-38),
             ('C',phx-14,phy-44),('C',phx+6,phy-26)]
        B+= [(5,8,1,w),(8,9,2,0),(9,10,1,0),(10,11,2,0),(11,12,1,0),(12,13,2,0),(13,8,1,0)]
    n0=len(A)
    for a in extra_atoms: A.append(a)
    for (i,j,o,w2) in extra_bonds: B.append((i,j,o,w2))
    return A,B

print("="*74)
print("A. AUXILIAIRES TELS QUE DESSINES DANS LES FIGURES")
print("="*74)
A,B=ring((80,70),[],[],'ipr',True)
report(build(A,B,"aux_ipr"),"oxaz(aux='ipr', wedge=true) — auxiliaire du valinol","C4 = S")
A,B=ring((80,70),[],[],'noreph',False)
report(build(A,B,"aux_nor"),"oxaz(aux='noreph', wedge=false) — auxiliaire de la norephedrine","C4 = R et C5 = S")

print("="*74)
print("B. PRODUITS D'ALKYLATION (figProduit), E = benzyle")
print("="*74)
# figProduit : Cac=[151,54], Oac=[151,26], Ca=[185,70], Me=[219,54], Ee=[185,106]
def produit(auxKey):
    up = (auxKey=='ipr')
    extraA=[('C',151,54),('O',151,26),('C',185,70),('C',219,54),
            ('C',185,106),('C',211,124),('C',237,112),('C',263,126),('C',263,152),('C',237,164),('C',211,150)]
    # indices : n0+1 = Cac ... (n0 = nb atomes du cycle)
    n0 = 9 if up else 13
    Cac=n0+1; Oac=n0+2; Ca=n0+3; Me=n0+4; E1=n0+5; Ph1=n0+6
    extraB=[(3,Cac,1,0),(Cac,Oac,2,0),(Cac,Ca,1,0),(Ca,Me,1,0),
            (Ca,E1,1, 6 if up else 1),(E1,Ph1,1,0),
            (Ph1,Ph1+1,2,0),(Ph1+1,Ph1+2,1,0),(Ph1+2,Ph1+3,2,0),(Ph1+3,Ph1+4,1,0),(Ph1+4,Ph1+5,2,0),(Ph1+5,Ph1,1,0)]
    A,B=ring((80,70),extraA,extraB,'ipr' if up else 'noreph',up)
    return A,B
A,B=produit('ipr');  report(build(A,B,"prod_ipr"),"Valinol : E (benzyle) en POINTILLES — produit majoritaire","C4 = S, Calpha = R")
A,B=produit('nor');  report(build(A,B,"prod_nor"),"Norephedrine : E (benzyle) en GRAS — produit majoritaire","C4 = R, C5 = S, Calpha = S")

print("="*74)
print("C. GEOMETRIE DE L'ENOLATE (figEnolate)")
print("="*74)
# P=[68,112] -> N=(105,112) ; Ce=[141,96], Cb=[183,96], Ox=[141,68], Me=[215,78], H=[215,114]
for geo,me,hh in (('Z',(215,78),(215,114)),('E',(215,116),(215,78))):
    extraA=[('C',141,96),('O',141,68),('C',183,96),('C',me[0],me[1])]
    n0=9; Ce=n0+1; Ox=n0+2; Cb=n0+3; Me=n0+4
    extraB=[(3,Ce,1,0),(Ce,Ox,1,0),(Ce,Cb,2,0),(Cb,Me,1,0)]
    A,B=ring((68,112),extraA,extraB,'ipr',True)
    report(build(A,B,"enol"),f"Enolate dessine pour le bouton « {geo} »",f"liaison C=C : {geo}")

print("="*74)
print("D. CARTON « CARBONE STEREOGENE » DE LA SECTION 0b")
print("   (disposition en Y : 2 liaisons en haut, 1 liaison gras/pointille en bas)")
print("="*74)
# acide 2-methyl-3-phenylpropanoique
def carton(lft,rgt,down,wedge,name):
    cx,cy=120,100
    A=[('C',cx,cy)]; B=[]
    def put(px,py,kind,flag):
        st=len(A)+1
        if kind=='CH3':
            A.append(('C',px,py)); B.append((1,st,1,flag))
        elif kind=='CO2H':
            A.extend([('C',px,py),('O',px-14,py-22),('O',px+14,py-22)])
            B.extend([(1,st,1,flag),(st,st+1,2,0),(st,st+2,1,0)])
        elif kind=='CH2Ph':
            A.extend([('C',px,py),('C',px,py+30),('C',px-26,py+45),('C',px-26,py+75),
                      ('C',px,py+90),('C',px+26,py+75),('C',px+26,py+45)])
            B.extend([(1,st,1,flag),(st,st+1,1,0),(st+1,st+2,2,0),(st+2,st+3,1,0),
                      (st+3,st+4,2,0),(st+4,st+5,1,0),(st+5,st+6,2,0),(st+6,st+1,1,0)])
    put(cx-34,cy-16,lft,0); put(cx+34,cy-16,rgt,0); put(cx,cy+34,down, 1 if wedge else 6)
    report(build(A,B,'c'),name)
carton('CO2H','CH3','CH2Ph',False,"CO2H haut-gauche, CH3 haut-droite, CH2Ph POINTILLE en bas -> (R)")
carton('CO2H','CH3','CH2Ph',True ,"CO2H haut-gauche, CH3 haut-droite, CH2Ph GRAS en bas -> (S)")
carton('CH3','CO2H','CH2Ph',True ,"miroir : CH3 haut-gauche, CO2H haut-droite, CH2Ph GRAS -> (R)")

# ============================================================================
# Deuxième vague : Hoppe, époxyde de la chalcone, époxyde de Sharpless, cartons
# ============================================================================
import math
def phenyl(A,B,cx,cy,att):
    st=len(A)+1
    for i in range(6):
        a=math.radians(60*i); A.append(('C',cx+26*math.cos(a),cy+26*math.sin(a)))
    for i in range(6): B.append((st+i, st+(i+1)%6, 2 if i%2==0 else 1, 0))
    return st+att

print("="*74); print("E. PRODUIT DE HOPPE (figHoppeTopic)"); print("="*74)
def hoppe(pos,flag):
    cx,cy=180,120
    A=[('C',cx,cy)]; B=[]
    A+=[('O',cx-40,cy-20),('C',cx-68,cy-38),('O',cx-68,cy-68),('N',cx-96,cy-20),
        ('C',cx-124,cy-38),('C',cx-96,cy+10)]
    B+=[(1,2,1,0),(2,3,1,0),(3,4,2,0),(3,5,1,0),(5,6,1,0),(5,7,1,0)]
    A+=[('C',cx+40,cy-20)]; B+=[(1,8,1,0)]
    dx,dy = ((-24,38) if pos=='a' else (24,38))
    A+=[('C',cx+dx,cy+dy),('O',cx+dx-18,cy+dy+26),('O',cx+dx+18,cy+dy+26)]
    B+=[(1,9,1,flag),(9,10,2,0),(9,11,1,0)]
    return A,B
A,B=hoppe('a',1); report(build(A,B,'h'),"Hₐ (bas-gauche, GRAS) remplacé par CO2H")
A,B=hoppe('b',6); report(build(A,B,'h'),"Hᵦ (bas-droite, POINTILLÉ) remplacé par CO2H")

print("="*74); print("F. ÉPOXYDE DE LA CHALCONE (figWeitz, étape 5)"); print("="*74)
def epox(ph_flag,co_flag,name):
    A=[('C',150,130),('C',200,130),('O',175,100)]
    B=[(1,2,1,0),(1,3,1,0),(2,3,1,0)]
    A.append(('C',232,158)); B.append((2,4,1,co_flag))
    A.append(('O',232,190)); B.append((4,5,2,0))
    v=phenyl(A,B,278,140,3); B.append((4,v,1,0))
    v2=phenyl(A,B,104,150,0); B.append((1,v2,1,ph_flag))
    report(build(A,B,'e'),name)
epox(1,6,"Ph en GRAS sur C3 ; C(=O)Ph en POINTILLÉ sur C2  (trans)")
epox(6,1,"Ph en POINTILLÉ sur C3 ; C(=O)Ph en GRAS sur C2  (trans)")

print("="*74); print("H. ÉPOXYDE DE SHARPLESS (figSharpMnemo)"); print("="*74)
def sharp(r_flag,ch2_flag,name):
    A=[('C',150,130),('C',200,130),('O',175,100)]
    B=[(1,2,1,0),(1,3,1,0),(2,3,1,0)]
    x,y=150,130; prev=1
    for i in range(7):
        x-=24; y+= 14 if i%2==0 else -14
        A.append(('C',x,y)); B.append((prev,len(A),1, r_flag if i==0 else 0)); prev=len(A)
    A.append(('C',232,152)); B.append((2,len(A),1,ch2_flag)); c1=len(A)
    A.append(('O',264,140)); B.append((c1,len(A),1,0))
    report(build(A,B,'s'),name)
sharp(6,1,"C7H15 en POINTILLÉ sur C3 ; CH2OH en GRAS sur C2  → attendu (2S,3S)")
sharp(1,6,"C7H15 en GRAS sur C3 ; CH2OH en POINTILLÉ sur C2  → attendu (2R,3R)")
