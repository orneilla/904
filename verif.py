# -*- coding: utf-8 -*-
"""
Vérification stéréochimique des deux supports CH0904.

Principe : on ne vérifie PAS des SMILES écrits à la main (cela ne prouverait rien
sur ce qui est réellement dessiné). On transcrit les coordonnées EXACTES de chaque
atome telles qu'elles figurent dans le code des figures (repère SVG, y vers le bas),
on construit un molfile V2000 en inversant y (convention molfile : y vers le haut),
et on laisse RDKit attribuer les descripteurs CIP.

    pip install rdkit && python3 verif.py
"""
from rdkit import Chem
from rdkit.Chem import rdCIPLabeler
import math

ERREURS = []

def build(atoms, bonds, name="m", svg_y_down=True):
    f = -1.0 if svg_y_down else 1.0
    L = [name, "  CH0904", "", f"{len(atoms):3d}{len(bonds):3d}  0  0  1  0  0  0  0  0999 V2000"]
    for s, x, y in atoms:
        L.append(f"{x:10.4f}{f*y:10.4f}{0.0:10.4f} {s:<3s} 0  0  0  0  0  0  0  0  0  0  0  0")
    for i, j, o, w in bonds:
        L.append(f"{i:3d}{j:3d}{o:3d}{w:3d}")
    L.append("M  END")
    return "\n".join(L)

def lire(mb):
    m = Chem.MolFromMolBlock(mb)
    if m is None: return None, "molblock invalide", ""
    Chem.AssignStereochemistry(m, cleanIt=True, force=True)
    rdCIPLabeler.AssignCIPLabels(m)
    out = []
    for a in m.GetAtoms():
        if a.HasProp('_CIPCode'): out.append(f"{a.GetSymbol()}{a.GetIdx()+1}={a.GetProp('_CIPCode')}")
    for b in m.GetBonds():
        if b.GetStereo() != Chem.BondStereo.STEREONONE:
            d = b.GetPropsAsDict()
            out.append(f"liaison {b.GetBeginAtomIdx()+1}={b.GetEndAtomIdx()+1} : {d.get('_CIPCode', str(b.GetStereo()))}")
    return m, "; ".join(out) if out else "aucun descripteur", Chem.MolToSmiles(m)

def check(mb, quoi, attendu):
    """attendu : chaîne devant apparaître dans la lecture, ou None si on veut juste afficher."""
    m, lu, smi = lire(mb)
    ok = (attendu is None) or (attendu in lu)
    tag = "  OK " if ok else "  !! "
    print(f"{tag}{quoi}")
    print(f"       lu       : {lu}")
    if attendu: print(f"       attendu  : {attendu}")
    print(f"       SMILES   : {smi}")
    if not ok: ERREURS.append(quoi)
    return lu

def achirale(mb):
    m, _, smi = lire(mb)
    mir = smi.replace('@@', '\x00').replace('@', '@@').replace('\x00', '@')
    return Chem.MolToSmiles(Chem.MolFromSmiles(mir)) == smi

def titre(t):
    print("\n" + "=" * 74); print(t); print("=" * 74)

def hexagone(A, B, cx, cy, att=0, r=26):
    st = len(A) + 1
    for i in range(6):
        a = math.radians(60 * i); A.append(('C', cx + r * math.cos(a), cy + r * math.sin(a)))
    for i in range(6): B.append((st + i, st + (i + 1) % 6, 2 if i % 2 == 0 else 1, 0))
    return st + att

# ---------------------------------------------------------------- témoin d'axe
titre("0. TÉMOIN — convention d'axe (le molfile est en y VERS LE HAUT)")
A = [('C',0,0),('O',0,25),('C',-22,-13),('C',22,-13),('C',44,0)]
B = [(1,2,1,1),(1,3,1,0),(1,4,1,0),(4,5,1,0)]
check(build(A,B,"t",svg_y_down=False), "(R)-butan-2-ol : OH en gras vers le HAUT, Me bas-gauche, Et bas-droite", "C1=R")
check(build(A,B,"t",svg_y_down=True),  "le même dessin lu en y VERS LE BAS (doit donner l'inverse)", "C1=S")

# ============================================================ CHAPITRE 1
RING = {'O1':(0,28), 'C2':(8,0), 'N':(37,0), 'C4':(46,28), 'C5':(23,46)}
def oxaz(P, aux, wedge, extraA=None, extraB=None):
    px, py = P
    A = [('O',px+RING['O1'][0],py+RING['O1'][1]), ('C',px+RING['C2'][0],py+RING['C2'][1]),
         ('N',px+RING['N'][0],py+RING['N'][1]),   ('C',px+RING['C4'][0],py+RING['C4'][1]),
         ('C',px+RING['C5'][0],py+RING['C5'][1]), ('O',px+RING['C2'][0]-10,py+RING['C2'][1]-24)]
    B = [(1,2,1,0),(2,3,1,0),(3,4,1,0),(4,5,1,0),(5,1,1,0),(2,6,2,0)]
    w = 1 if wedge else 6
    if aux == 'ipr':
        A += [('C',px+58,py+54),('C',px+44,py+76),('C',px+80,py+62)]
        B += [(4,7,1,w),(7,8,1,0),(7,9,1,0)]
    else:
        A += [('C',px+66,py+48)]; B += [(4,7,1,w)]
        phx, phy = px+9, py+71
        A += [('C',phx,phy)]; B += [(5,8,1,w)]
        v = hexagone(A,B,phx-24,phy+12,3); B += [(8,v,1,0)]
    for a in (extraA or []): A.append(a)
    for b in (extraB or []): B.append(b)
    return A, B

titre("1. AUXILIAIRES D'EVANS (chapitre 1)")
check(build(*oxaz((80,70),'ipr',True),  name="a"), "oxaz(ipr, gras) — auxiliaire du valinol", "C4=S")
check(build(*oxaz((80,70),'noreph',False), name="a"), "oxaz(noreph, pointillé) — auxiliaire de la noréphédrine", "C4=R")

titre("2. PRODUITS D'ALKYLATION D'EVANS (E = benzyle)")
def produit(up):
    n0 = 9 if up else 14   # ipr : 6+3 atomes ; noréphédrine : 6+1+1+6 atomes
    eA = [('C',151,54),('O',151,26),('C',185,70),('C',219,54),('C',185,106)]
    eB = [(3,n0+1,1,0),(n0+1,n0+2,2,0),(n0+1,n0+3,1,0),(n0+3,n0+4,1,0),(n0+3,n0+5,1,6 if up else 1)]
    A,B = oxaz((80,70),'ipr' if up else 'noreph',up,eA,eB)
    v = hexagone(A,B,211,124,0); B.append((n0+5,v,1,0))
    return A,B
check(build(*produit(True),  name="p"), "valinol, E en POINTILLÉ", "C4=S")
check(build(*produit(True),  name="p"), "valinol : carbone alpha", "C12=R")
check(build(*produit(False), name="p"), "noréphédrine, E en GRAS : carbone alpha", "C17=S")

titre("3. GÉOMÉTRIE DE L'ÉNOLATE")
for geo,(mx,my) in (('Z',(215,78)),('E',(215,116))):
    eA=[('C',141,96),('O',141,68),('C',183,96),('C',mx,my)]
    eB=[(3,10,1,0),(10,11,1,0),(10,12,2,0),(12,13,1,0)]
    check(build(*oxaz((68,112),'ipr',True,eA,eB), name="e"), f"énolate du bouton « {geo} »", f"liaison 10=12 : {geo}")

titre("4. CARTON « CARBONE STÉRÉOGÈNE » (section 0b) — disposition en Y")
def carton(lft,rgt,down,wedge):
    cx,cy=120,100; A=[('C',cx,cy)]; B=[]
    def put(px,py,kind,flag):
        st=len(A)+1
        if kind=='CH3': A.append(('C',px,py)); B.append((1,st,1,flag))
        elif kind=='CO2H':
            A.extend([('C',px,py),('O',px-14,py-22),('O',px+14,py-22)])
            B.extend([(1,st,1,flag),(st,st+1,2,0),(st,st+2,1,0)])
        else:
            A.append(('C',px,py)); B.append((1,st,1,flag)); v=hexagone(A,B,px,py+56,0); B.append((st,v,1,0))
    put(cx-34,cy-16,lft,0); put(cx+34,cy-16,rgt,0); put(cx,cy+34,down,1 if wedge else 6)
    return A,B
check(build(*carton('CO2H','CH3','CH2Ph',False), name="c"), "CO2H h-g, CH3 h-d, CH2Ph POINTILLÉ → majoritaire", "C1=R")
check(build(*carton('CO2H','CH3','CH2Ph',True),  name="c"), "CO2H h-g, CH3 h-d, CH2Ph GRAS → minoritaire", "C1=S")
check(build(*carton('CH3','CO2H','CH2Ph',True),  name="c"), "miroir du précédent", "C1=R")

titre("5. PRODUIT DE HOPPE")
def hoppe(pos,flag):
    cx,cy=180,120
    A=[('C',cx,cy),('O',cx-40,cy-20),('C',cx-68,cy-38),('O',cx-68,cy-68),('N',cx-96,cy-20),
       ('C',cx-124,cy-38),('C',cx-96,cy+10),('C',cx+40,cy-20)]
    B=[(1,2,1,0),(2,3,1,0),(3,4,2,0),(3,5,1,0),(5,6,1,0),(5,7,1,0),(1,8,1,0)]
    dx,dy = (-24,38) if pos=='a' else (24,38)
    A+=[('C',cx+dx,cy+dy),('O',cx+dx-18,cy+dy+26),('O',cx+dx+18,cy+dy+26)]
    B+=[(1,9,1,flag),(9,10,2,0),(9,11,1,0)]
    return A,B
check(build(*hoppe('a',1), name="h"), "Ha (gras, bas-gauche) → CO2H", "C1=S")
check(build(*hoppe('b',6), name="h"), "Hb (pointillé, bas-droite) → CO2H  [c'est celui que le support retient]", "C1=R")

titre("6. ÉPOXYDE DE LA CHALCONE (TADDOL)")
def epox(ph,co):
    A=[('C',150,130),('C',200,130),('O',175,100),('C',232,158),('O',232,190)]
    B=[(1,2,1,0),(1,3,1,0),(2,3,1,0),(2,4,1,co),(4,5,2,0)]
    v=hexagone(A,B,278,140,3); B.append((4,v,1,0))
    v2=hexagone(A,B,104,150,0); B.append((1,v2,1,ph))
    return A,B
check(build(*epox(1,6), name="x"), "Ph GRAS sur C3, C(=O)Ph POINTILLÉ sur C2", "C1=R")
check(build(*epox(1,6), name="x"), "     — et l'autre centre", "C2=S")

titre("7. ÉPOXYDE DE SHARPLESS")
def sharp(rf,cf):
    A=[('C',150,130),('C',200,130),('O',175,100)]
    B=[(1,2,1,0),(1,3,1,0),(2,3,1,0)]
    x,y,prev=150,130,1
    for i in range(7):
        x-=24; y+= 14 if i%2==0 else -14
        A.append(('C',x,y)); B.append((prev,len(A),1, rf if i==0 else 0)); prev=len(A)
    A.append(('C',232,152)); B.append((2,len(A),1,cf)); c1=len(A)
    A.append(('O',264,140)); B.append((c1,len(A),1,0))
    return A,B
check(build(*sharp(6,1), name="s"), "C7H15 POINTILLÉ, CH2OH GRAS  [bouton L-(+)-DET]", "C1=S")
check(build(*sharp(6,1), name="s"), "     — et l'autre centre", "C2=S")
check(build(*sharp(1,6), name="s"), "C7H15 GRAS, CH2OH POINTILLÉ  [bouton D-(−)-DET]", "C1=R")

titre("8. SULFINAMIDE D'ELLMAN")
def sulf(tbu,o,nf,coords):
    (sx,sy),(tx,ty),(ox,oy),(nx,ny)=coords
    A=[('S',sx,sy),('C',tx,ty),('C',tx-24,ty-14),('C',tx+24,ty-14),('C',tx,ty-28),('O',ox,oy),('N',nx,ny)]
    B=[(1,2,1,tbu),(2,3,1,0),(2,4,1,0),(2,5,1,0),(1,6,2,o),(1,7,1,nf)]
    return A,B
check(build(*sulf(1,0,0,[(186,88),(182,48),(216,104),(158,108)]), name="u"),
      "figEllmanEq : tBu GRAS en haut, O bas-droite, NH2 bas-gauche", "S1=R")
check(build(*sulf(1,0,0,[(150,92),(98,46),(210,120),(96,132)]), name="u"),
      "figSoufre (après correction : un seul trait gras)", "S1=R")

# ============================================================ LES BASES
titre("9. ARBRE DE DÉCISION — acides tartriques (projections de Fischer)")
def tart(c2,c3):
    A=[('C',0,60),('O',-16,84),('O',16,84),('C',0,30),('C',0,0),('C',0,-30),('O',-16,-54),('O',16,-54)]
    B=[(1,2,2,0),(1,3,1,0),(1,4,1,0),(4,5,1,0),(5,6,1,0),(6,7,2,0),(6,8,1,0)]
    for ci,oh_right in ((4,c2),(5,c3)):
        y = 30 if ci==4 else 0
        A.append(('O', 28 if oh_right else -28, y)); B.append((ci,len(A),1,1))
        A.append(('H',-28 if oh_right else  28, y)); B.append((ci,len(A),1,1))
    return A,B
check(build(*tart(True,False), name="t", svg_y_down=False), "OH droite / OH gauche → étiqueté « (2R,3R) = acide (+) »", "C4=R")
check(build(*tart(False,True), name="t", svg_y_down=False), "OH gauche / OH droite → étiqueté « (2S,3S) = acide (−) »", "C4=S")
mb = build(*tart(True,True), name="t", svg_y_down=False)
check(mb, "les deux OH à droite → étiqueté « (2R,3S) = méso »", "C4=R")
print(f"       achiral ? {achirale(mb)}   (doit être True pour un méso)")
if not achirale(mb): ERREURS.append("le méso dessiné n'est pas achiral")

titre("10. ARBRE DE DÉCISION — les deux dessins de butan-2-ol (cas « homomères »)")
def but2ol(l,r,d):
    cx,cy=160,120; A=[('C',cx,cy)]; B=[]
    def put(px,py,kind,flag):
        st=len(A)+1
        A.append(('O' if kind=='HO' else 'C',px,py)); B.append((1,st,1,flag))
        if kind=='C2H5':
            A.append(('C',px+(22 if px>cx else -22),py+18)); B.append((st,len(A),1,0))
    put(cx-34,cy-16,l,0); put(cx+34,cy-16,r,0); put(cx,cy+34,d,1)
    return A,B
g=check(build(*but2ol('HO','CH3','C2H5'), name="b"), "dessin de gauche  [étiqueté (S)-butan-2-ol]", "C1=S")
dr=check(build(*but2ol('CH3','C2H5','HO'), name="b"), "dessin de droite   [étiqueté (S)-butan-2-ol]", "C1=S")
print(f"       les deux dessins sont-ils la même molécule ? {g.split('=')[1]==dr.split('=')[1]}")

titre("11. ATTRIBUTION R/S PAS À PAS — glycéraldéhyde")
A=[('C',170,120),('O',136,104),('C',204,104),('O',204,78),('C',170,156),('O',170,188)]
B=[(1,2,1,0),(1,3,1,0),(3,4,2,0),(1,5,1,1),(5,6,1,0)]
check(build(A,B,"g"), "OH h-g, CHO h-d, CH2OH en GRAS vers le bas  [le support affiche R]", "C1=R")

titre("12. LES QUATRE MANIPULATIONS DE FISCHER")
def fisch(rows,top='CO2H'):
    """Projection de Fischer : groupe du haut - C2 - C3 - CO2H du bas.
    top='OH' signifie un OH porte directement par C2 (et non un carbone de plus)."""
    A=[]; B=[]
    def groupe(kind,x,y,sens):
        if kind=='CO2H':
            A.append(('C',x,y)); i=len(A)
            A.append(('O',x-16,y+24*sens)); A.append(('O',x+16,y+24*sens))
            B.append((i,i+1,2,0)); B.append((i,i+2,1,0)); return i
        A.append(('O',x,y)); return len(A)
    t = groupe(top,0,60,+1)
    A.append(('C',0,30)); c2=len(A); B.append((t,c2,1,0))
    A.append(('C',0,0));  c3=len(A); B.append((c2,c3,1,0))
    b = groupe('CO2H',0,-30,-1); B.append((c3,b,1,0))
    for ci,(l,r) in zip((c2,c3),rows):
        y = 30 if ci==c2 else 0
        for txt,x in ((l,-28),(r,28)):
            if txt=='CO2H':
                A+=[('C',x,y),('O',x+(-14 if x<0 else 14),y+22),('O',x+(-14 if x<0 else 14),y-22)]
                B+=[(ci,len(A)-2,1,1),(len(A)-2,len(A)-1,2,0),(len(A)-2,len(A),1,0)]
            else:
                A.append(('O' if txt in ('OH','HO') else 'H',x,y)); B.append((ci,len(A),1,1))
    return A,B

def smi(mb):
    return lire(mb)[2]

dep = build(*fisch([['H','OH'],['HO','H']]), name="f", svg_y_down=False)
check(dep, "DÉPART, annoncé (2R,3R)", "C4=R")
p1  = build(*fisch([['H','HO'],['OH','H']]), name="f", svg_y_down=False)
check(p1, "panneau 1 — rotation 180° (doit rester 2R,3R)", "C4=R")
p3  = build(*fisch([['OH','H'],['H','HO']]), name="f", svg_y_down=False)
check(p3, "panneau 3 — retournement (doit donner 2S,3S)", "C4=S")
p4  = build(*fisch([['CO2H','H'],['HO','H']],top='OH'), name="f", svg_y_down=False)
# la chaîne est réorientée : la numérotation RDKit change, on compare donc les SMILES
check(p4, "panneau 4 — permutation circulaire (doit rester 2R,3R)", "C2=R")
for nom, mb, meme in (("panneau 1", p1, True), ("panneau 3", p3, False), ("panneau 4", p4, True)):
    ident = (smi(mb) == smi(dep))
    ok = (ident == meme)
    print(f"{'  OK ' if ok else '  !! '}{nom} : même molécule que le départ ? {ident} (attendu {meme})")
    if not ok: ERREURS.append(nom + " — identité avec le départ")

titre("13. D/L CONTRE R/S — acides aminés")
def amino(chain):
    A=[('C',0,30),('O',-16,54),('O',16,54),('C',0,0),('N',-28,0),('H',28,0)]
    B=[(1,2,2,0),(1,3,1,0),(1,4,1,0),(4,5,1,1),(4,6,1,1)]
    prev=4
    for i,sym in enumerate(chain):
        A.append((sym,0,-30*(i+1))); B.append((prev,len(A),1,0)); prev=len(A)
    return A,B
check(build(*amino(['C']), name="n", svg_y_down=False), "L-alanine (NH2 à gauche)", "C4=S")
check(build(*amino(['C','S']), name="n", svg_y_down=False), "L-cystéine — le soufre renverse le classement", "C4=R")
check(build(*amino(['C','C','S','C']), name="n", svg_y_down=False), "L-méthionine — le soufre est trop loin", "C4=S")

titre("14. PSEUDO-ASYMÉTRIE — acide 2,3,4-trihydroxyglutarique")
def glut(rows):
    A=[('C',0,90),('O',-16,114),('O',16,114)]; B=[(1,2,2,0),(1,3,1,0)]; prev=1
    for i,(l,r) in enumerate(rows):
        y=60-30*i; A.append(('C',0,y)); c=len(A); B.append((prev,c,1,0)); prev=c
        for txt,x in ((l,-28),(r,28)):
            A.append(('O' if txt in ('OH','HO') else 'H',x,y)); B.append((c,len(A),1,1))
    A.append(('C',0,-30)); B.append((prev,len(A),1,0)); cb=len(A)
    A+=[('O',-16,-54),('O',16,-54)]; B+=[(cb,len(A)-1,2,0),(cb,len(A),1,0)]
    return A,B
for rows,lab in (([['H','OH'],['H','OH'],['H','OH']],'forme de gauche, étiquetée r'),
                 ([['H','OH'],['HO','H'],['H','OH']],'forme de droite, étiquetée s')):
    mb=build(*glut(rows), name="q", svg_y_down=False)
    check(mb, lab, 'r' if lab.endswith('r') else 's')
    print(f"       achiral ? {achirale(mb)}   (doit être True : les deux formes sont méso)")
    if not achirale(mb): ERREURS.append(lab+" n'est pas achirale")

titre("15. PRO-R / PRO-S — éthanol")
def etha(which):
    cx,cy=160,120
    ha='D' if which=='a' else 'H'; hb='H' if which=='a' else 'D'
    A=[('C',cx,cy),('C',cx-34,cy-16),('O',cx+34,cy-16),(ha,cx-24,cy+38),(hb,cx+24,cy+38)]
    B=[(1,2,1,0),(1,3,1,0),(1,4,1,1),(1,5,1,6)]
    return A,B
check(build(*etha('a'), name="d"), "Ha promu (trait gras, bas-gauche)  → Ha est pro-S", "C1=S")
check(build(*etha('b'), name="d"), "Hb promu (trait pointillé, bas-droite) → Hb est pro-R", "C1=R")

# ---------------------------------------------------------------------------

# ============================================================ TD DE RÉVISION
titre("16. TD DE RÉVISION — ce que dessine l'ÉNONCÉ")

def hexa(A,B,cx,cy,r=26,att=0):
    st=len(A)+1
    for i in range(6):
        a=math.radians(60*i); A.append(('C',cx+r*math.cos(a),cy+r*math.sin(a)))
    for i in range(6): B.append((st+i, st+(i+1)%6, 2 if i%2==0 else 1, 0))
    return st+att

# --- exercice 1, molécule 2 : (E)-PhCH=CH-CH(OMe)CH3, OMe en GRAS
A=[('C',92,178),('C',122,160),('O',122,122),('C',110,96),('C',152,180),('C',184,160),('C',216,180)]
B=[(1,2,1,0),(2,3,1,1),(3,4,1,0),(2,5,1,0),(5,6,2,0),(6,7,1,0)]
v=hexa(A,B,216+26,180+26); B.append((7,v,1,0))
check(build(A,B,"ex1m2"), "ex. 1, molécule 2 — centre porteur de l'OMe", "C2=R")

# --- exercice 3a : produit, époxyde en pointillé des deux côtés
A=[('C',-52,-44),('C',-26,-26),('O',-8,4),('C',10,-26),('C',36,-8),('O',62,-8)]
B=[(1,2,1,0),(2,3,1,6),(4,3,1,6),(2,4,1,0),(4,5,1,0),(5,6,1,0)]
check(build(A,B,"ex3a",svg_y_down=False), "ex. 3a — époxyde de Sharpless dessiné (annoncé 2S,3S)", "C2=S")

# --- exercice 3b : substrat (Z) et produit
A=[('C',-70,-56),('C',-70,-26),('C',-44,-8),('C',-18,-26),('C',-18,-56),('C',8,-8),('O',34,-26)]
B=[(1,2,1,0),(2,3,2,0),(3,4,1,0),(4,5,1,1),(4,6,1,0),(6,7,1,0)]
check(build(A,B,"ex3b",svg_y_down=False), "ex. 3b — substrat dessiné (annoncé 2S, 3Z)", "C4=S")
A=[('C',-40,-50),('C',-40,-20),('O',-30,14),('C',-10,0),('C',18,-18),('C',18,-48),('C',46,0),('O',74,-18)]
B=[(1,2,1,0),(2,3,1,6),(4,3,1,6),(2,4,1,0),(4,5,1,0),(5,6,1,1),(5,7,1,0),(7,8,1,0)]
lu=check(build(A,B,"ex3bp",svg_y_down=False), "ex. 3b — produit dessiné (annoncé 4S, 3R, 2R)", "C2=S")
for att in ("C4=R","C5=R"): check(build(A,B,"ex3bp",svg_y_down=False), "ex. 3b — produit, autres centres ("+att+")", att)

# --- exercice 3e : produit dessiné (OH en pointillé, tBu en gras)
def cyclohexanol(oh,tbu):
    A=[];B=[];r=30
    for i in range(6):
        a=math.radians(90+60*i); A.append(('C',r*math.cos(a),r*math.sin(a)))
    for i in range(6): B.append((i+1,(i+1)%6+1,1,0))
    A.append(('O',0,r+28)); B.append((1,7,1,oh))
    A.append(('C',0,-r-28)); B.append((4,8,1,tbu))
    A+=[('C',-26,-r-44),('C',26,-r-44),('C',0,-r-56)]
    B+=[(8,9,1,0),(8,10,1,0),(8,11,1,0)]
    return A,B
lu=check(build(*cyclohexanol(6,1),name="ex3e",svg_y_down=False), "ex. 3e — alcool dessiné (annoncé r, r)", "C1=r")
check(build(*cyclohexanol(6,1),name="ex3e",svg_y_down=False), "ex. 3e — second descripteur", "C4=r")
print(f"       achirale ? {achirale(build(*cyclohexanol(6,1),name='x',svg_y_down=False))}   (la mention « (±) » de l'énoncé est donc de trop)")

titre("17. TD DE RÉVISION — ce que dessine MON corrigé")
# a) substrat (E)-but-2-én-1-ol du corrigé
A=[('C',78,104),('C',104,86),('C',130,104),('C',156,86),('O',182,104)]
B=[(1,2,1,0),(2,3,2,0),(3,4,1,0),(4,5,1,0)]
check(build(A,B,"mya"), "mon dessin a) — alcool de départ (doit être E)", "E")
# a) produit
A=[('C',78,254),('C',104,236),('O',119,210),('C',134,236),('C',160,218),('O',186,236)]
B=[(1,2,1,0),(2,3,1,6),(4,3,1,6),(2,4,1,0),(4,5,1,0),(5,6,1,0)]
check(build(A,B,"myap"), "mon dessin a) — époxyde (doit être 2S,3S)", "C2=S")
check(build(A,B,"myap"), "mon dessin a) — second centre", "C4=S")
# b) substrat
A=[('C',74,112),('C',74,84),('C',100,68),('C',126,86),('C',126,116),('C',152,68),('O',178,86)]
B=[(1,2,1,0),(2,3,2,0),(3,4,1,0),(4,5,1,1),(4,6,1,0),(6,7,1,0)]
check(build(A,B,"myb"), "mon dessin b) — substrat (doit être 2S et Z)", "C4=S")
check(build(A,B,"myb"), "mon dessin b) — géométrie de l'alcène", "Z")
# b) produit
A=[('C',74,262),('C',100,244),('O',115,218),('C',130,244),('C',156,262),('C',156,292),('C',182,244),('O',208,262)]
B=[(1,2,1,0),(2,3,1,6),(4,3,1,6),(2,4,1,0),(4,5,1,0),(5,6,1,1),(5,7,1,0),(7,8,1,0)]
for att in ("C2=S","C4=R","C5=R"):
    check(build(A,B,"mybp"), "mon dessin b) — produit ("+att+")", att)
# e) produit : cycle dessiné en SVG (y vers le bas), OH en pointillé vers le haut, tBu en gras vers le bas
A=[]; B=[]
import math as _m
for i in range(6):
    a=_m.radians(-90+60*i); A.append(('C',280+30*_m.cos(a),150+30*_m.sin(a)))
for i in range(6): B.append((i+1,(i+1)%6+1,1,0))
A.append(('O',280,80)); B.append((1,7,1,6))
A.append(('C',280,218)); B.append((4,8,1,1))
A+=[('C',254,236),('C',306,236),('C',280,248)]
B+=[(8,9,1,0),(8,10,1,0),(8,11,1,0)]
check(build(A,B,"mye"), "mon dessin e) — alcool trans (doit être 1r,4r)", "C1=r")
check(build(A,B,"mye"), "mon dessin e) — second descripteur", "C4=r")
print(f"       achirale ? {achirale(build(A,B,'mye'))}")

print("\n" + "=" * 74)
if ERREURS:
    print(f"BILAN : {len(ERREURS)} VÉRIFICATION(S) EN ÉCHEC")
    for e in ERREURS: print("  - " + e)
else:
    print("BILAN : toutes les vérifications passent.")
print("=" * 74)
