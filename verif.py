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
print("D. CARTON DE LA SECTION 0b (acide 2-methyl-3-phenylpropanoique)")
print("="*74)
# stereoC : U=(0,-28) gras, D=(0,28) pointille, L=(-34,0), R=(+34,0)  [coords SVG]
for tag,lft,rgt in (('gauche','CH3','CH2Ph'),('droite','CH2Ph','CH3')):
    cx,cy=100,100
    A=[('C',cx,cy),('C',cx,cy-28),('O',cx-16,cy-50),('O',cx+16,cy-50)]   # CO2H en GRAS vers le haut
    B=[(1,2,1,1),(2,3,2,0),(2,4,1,0)]
    def chain(px,py,kind,start):
        if kind=='CH3': return [('C',px,py)],[(1,start,1,0)]
        aa=[('C',px,py),('C',px+(26 if px>cx else -26),py+16),('C',px+(52 if px>cx else -52),py+4),
            ('C',px+(78 if px>cx else -78),py+20),('C',px+(78 if px>cx else -78),py+46),
            ('C',px+(52 if px>cx else -52),py+58),('C',px+(26 if px>cx else -26),py+42)]
        bb=[(1,start,1,0),(start,start+1,1,0),(start+1,start+2,2,0),(start+2,start+3,1,0),
            (start+3,start+4,2,0),(start+4,start+5,1,0),(start+5,start+6,2,0),(start+6,start+1,1,0)]
        return aa,bb
    a1,b1=chain(cx-34,cy,lft,5); A+=a1; B+=b1
    a2,b2=chain(cx+34,cy,rgt,len(A)+1); A+=a2; B+=b2
    report(build(A,B,"cart"),f"Carton {tag} : CO2H en gras vers le haut, {lft} a gauche, {rgt} a droite",
           "R" if tag=='gauche' else "S")
