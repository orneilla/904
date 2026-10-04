# -*- coding: utf-8 -*-
"""Molécules 3D du TD « Catalyse énantiosélective » (exercices 3 et 4).
Chaque structure est RELUE par RDKit avant d'être écrite."""
import sys, json, math
sys.path.insert(0, '.build')
from rdkit import Chem
from rdkit.Chem import AllChem, rdCIPLabeler
import numpy as np
exec(open('.build/gen3d.py').read().split('OUT = {}')[0])   # réutilise embed/align/pack/strip_h

OUT, RAP = {}, []

def prof_map(m):
    p = {a.GetIdx(): (0 if a.IsInRing() else 99) for a in m.GetAtoms()}
    for _ in range(6):
        for a in m.GetAtoms():
            p[a.GetIdx()] = min([p[n.GetIdx()]+1 for n in a.GetNeighbors()] + [p[a.GetIdx()]])
    return p

def pack2(m, idx, P, nom, extra=None):
    conv = {o: i for i, o in enumerate(idx)}
    pr = prof_map(m)
    atoms = [{'e': m.GetAtomWithIdx(o).GetSymbol(), 'p': [round(float(c),3) for c in P[k]],
              'd': min(pr[o],9)} for k,o in enumerate(idx)]
    bonds = [[conv[b.GetBeginAtomIdx()], conv[b.GetEndAtomIdx()], int(b.GetBondTypeAsDouble())]
             for b in m.GetBonds()
             if b.GetBeginAtomIdx() in conv and b.GetEndAtomIdx() in conv]
    d = {'nom': nom, 'atoms': atoms, 'bonds': bonds}
    if extra: d.update(extra)
    return d, conv

def sp2(m, c, o_idx, ref):
    """carbone sp2 au centre, plan dans le plan de l'écran, O vers le haut"""
    P = m.GetConformer().GetPositions() - m.GetConformer().GetPositions()[c]
    return align(P, P[o_idx], [0,1,0], P[ref], [-0.87,-0.5,0])

# ---------------------------------------------------- ex.3 : pyruvate d'éthyle
m = embed('CC(=O)C(=O)OCC')
cet = [a.GetIdx() for a in m.GetAtoms() if a.GetSymbol()=='C'
       and any(b.GetBondTypeAsDouble()==2 for b in a.GetBonds())
       and sum(1 for n in a.GetNeighbors() if n.GetSymbol()=='O')==1][0]
oket = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors() if a.GetSymbol()=='O'][0]
me  = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors()
       if a.GetSymbol()=='C' and a.GetDegree()==4][0]
est = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors()
       if a.GetSymbol()=='C' and a.GetIdx()!=me][0]
P = sp2(m, cet, oket, me)
idx = strip_h(m, set())
d, conv = pack2(m, idx, P[idx], "pyruvate d'éthyle")
d['sp2'] = conv[cet]; d['prioF'] = [conv[oket], conv[est], conv[me]]
OUT['pyruvate'] = d
RAP.append("pyruvate d'éthyle : carbone sp2 repéré ; priorités O > CO2Et > CH3")

# ---------------------------------------------------- ex.3 : le produit A (S)
m = embed('CCOC(=O)[C@@](C)(O)C[N+](=O)[O-]')
lab = {a.GetIdx(): a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')}
assert list(lab.values()) == ['S'], lab
c = list(lab)[0]
oh = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors()
      if a.GetSymbol()=='O' and any(n.GetSymbol()=='H' for n in a.GetNeighbors())][0]
P = m.GetConformer().GetPositions() - m.GetConformer().GetPositions()[c]
P = align(P, P[oh], [-0.82,0.58,0], P[[a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors()
      if a.GetSymbol()=='C' and any(n.GetSymbol()=='N' for n in a.GetNeighbors())][0]], [0,-0.58,0.82])
idx = strip_h(m, set())
d, conv = pack2(m, idx, P[idx], "A — (S)-2-hydroxy-2-méthyl-3-nitropropanoate d'éthyle")
d['centre'] = conv[c]
OUT['produitA'] = d
RAP.append("produit A : RDKit lit " + list(lab.values())[0])

# ------------------------------------------------- ex.3 : le ligand (S,S)-box
m = embed('CC(C)(C1=N[C@@H](C(C)(C)C)CO1)C1=N[C@@H](C(C)(C)C)CO1')
lab = {a.GetIdx(): a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')}
assert sorted(lab.values()) == ['S','S'], lab
cq = [a.GetIdx() for a in m.GetAtoms() if a.GetSymbol()=='C' and a.GetDegree()==4
      and sum(1 for n in a.GetNeighbors() if n.GetIsAromatic() or n.GetSymbol()=='C')==4
      and sum(1 for n in a.GetNeighbors() if any(x.GetSymbol()=='N' for x in n.GetNeighbors()))==2][0]
ns = [a.GetIdx() for a in m.GetAtoms() if a.GetSymbol()=='N']
P = m.GetConformer().GetPositions(); P = P - (P[ns[0]]+P[ns[1]])/2
P = align(P, P[ns[1]]-P[ns[0]], [1,0,0], P[cq], [0,1,0])
idx = strip_h(m, set())
d, conv = pack2(m, idx, P[idx], "(S,S)-t-Bu-box")
d['azotes'] = [conv[ns[0]], conv[ns[1]]]
d['centres'] = [conv[i] for i in lab]
OUT['box'] = d
RAP.append("ligand box : RDKit lit " + ", ".join(f"C{k}={v}" for k,v in lab.items()))

# ------------------------------------------------- ex.4 : acétophénone
m = embed('CC(=O)c1ccccc1')
cet = [a.GetIdx() for a in m.GetAtoms() if a.GetSymbol()=='C'
       and any(b.GetBondTypeAsDouble()==2 and b.GetOtherAtom(a).GetSymbol()=='O' for b in a.GetBonds())][0]
oket = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors() if a.GetSymbol()=='O'][0]
me  = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors()
       if a.GetSymbol()=='C' and a.GetDegree()==4][0]
ph  = [a.GetIdx() for a in m.GetAtomWithIdx(cet).GetNeighbors()
       if a.GetSymbol()=='C' and a.GetIsAromatic()][0]
P = sp2(m, cet, oket, me)
idx = strip_h(m, set())
d, conv = pack2(m, idx, P[idx], "acétophénone")
d['sp2'] = conv[cet]; d['prioF'] = [conv[oket], conv[ph], conv[me]]
OUT['acetophenone'] = d
RAP.append("acétophénone : priorités O > Ph > CH3")

# ------------------------------------------------- ex.4 : les deux produits
for lettre, smi in (('S','C=CC[C@](C)(O)c1ccccc1'), ('R','C=CC[C@@](C)(O)c1ccccc1')):
    m = embed(smi)
    lab = {a.GetIdx(): a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')}
    assert list(lab.values()) == [lettre], (smi, lab)
    c = list(lab)[0]
    oh = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors() if a.GetSymbol()=='O'][0]
    ph = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors() if a.GetIsAromatic()][0]
    P = m.GetConformer().GetPositions() - m.GetConformer().GetPositions()[c]
    P = align(P, P[oh], [-0.82,0.58,0], P[ph], [0.82,0.58,0])
    idx = strip_h(m, set())
    d, conv = pack2(m, idx, P[idx], f"2-phényl-pent-4-én-2-ol ({lettre})")
    d['centre'] = conv[c]
    OUT['prod4'+lettre] = d
    RAP.append(f"2-phényl-pent-4-én-2-ol ({lettre}) : RDKit lit {list(lab.values())[0]}")

# ------------------------------------------------- ex.4 : le (S)-3,3'-Br2-BINOL
def sens_axial(P, a1, a2, h1, h2):
    """renvoie 'R' ou 'S' : a1 = ipso avant, h1 = ortho prioritaire avant, idem a2/h2"""
    v = P[a2] - P[a1]; v = v/np.linalg.norm(v)          # l'axe, de l'avant vers l'arrière
    # base orthonormée : e3 = -v (vers l'observateur), e1 = droite, e2 = haut
    tmp = np.array([0,0,1.0]) if abs(v[2]) < 0.9 else np.array([1.0,0,0])
    e1 = np.cross(tmp, -v); e1 /= np.linalg.norm(e1)
    e2 = np.cross(-v, e1)
    ang = lambda p, o: math.degrees(math.atan2(np.dot(p-P[o], e2), np.dot(p-P[o], e1))) % 360
    a_1 = ang(P[h1], a1)                 # rang 1 : ortho prioritaire du cycle AVANT
    a_2 = (a_1 + 180) % 360              # rang 2 : l'autre ortho du cycle avant
    a_3 = ang(P[h2], a2)                 # rang 3 : ortho prioritaire du cycle ARRIÈRE
    d1 = (a_2 - a_1) % 360; d2 = (a_3 - a_2) % 360
    return 'S' if (d1 + d2) < 360.5 and d1 < 180.5 and d2 < 180.5 else 'R'

m = embed('Oc1c(Br)cc2ccccc2c1-c1c(O)c(Br)cc2ccccc12')
bnd = [b for b in m.GetBonds() if b.GetBeginAtom().GetIsAromatic()
       and b.GetEndAtom().GetIsAromatic() and not b.IsInRing()][0]
a1, a2 = bnd.GetBeginAtomIdx(), bnd.GetEndAtomIdx()
def ortho_prio(i, autre):
    vo = [a.GetIdx() for a in m.GetAtomWithIdx(i).GetNeighbors() if a.GetIdx() != autre]
    return [o for o in vo if any(n.GetSymbol()=='O' for n in m.GetAtomWithIdx(o).GetNeighbors())][0]
h1, h2 = ortho_prio(a1, a2), ortho_prio(a2, a1)
P = m.GetConformer().GetPositions(); P = P - (P[a1]+P[a2])/2
if sens_axial(P, a1, a2, h1, h2) == 'R':
    P = P * np.array([-1, 1, 1])        # miroir : on prend l'autre atropisomère
    RAP.append("BINOL-Br2 : l'atropisomère engendré était (aR), on a pris son miroir")
lu = sens_axial(P, a1, a2, h1, h2)
P = align(P, P[a2]-P[a1], [0,0,-1], P[h1]-P[a1], [0.71,0.71,0])
assert sens_axial(P, a1, a2, h1, h2) == lu, "l'alignement a changé la configuration"
idx = strip_h(m, set())
d, conv = pack2(m, idx, P[idx], "(aS)-3,3′-dibromo-BINOL")
d['axe'] = [conv[a1], conv[a2]]
em = Chem.RWMol(m); em.RemoveBond(a1, a2)
loin = [f for f in Chem.GetMolFrags(em.GetMol(), sanitizeFrags=False) if a2 in f][0]
d['rotor'] = sorted(conv[i] for i in loin if i in conv)
d['prioOrtho'] = [conv[h1], conv[h2]]
OUT['binolBr2'] = d
RAP.append(f"(aS)-3,3'-dibromo-BINOL : configuration axiale lue = a{lu}")

with open('.build/mol_td2.js','w') as f:
    f.write("\n/* ==== Coordonnées 3D du TD « catalyse » — .build/gen_td2.py, vérifiées RDKit ==== */\n")
    f.write("const MOLTD2 = " + json.dumps(OUT, ensure_ascii=False) + ";\n")
print("\n".join("  "+r for r in RAP))
print("\n.build/mol_td2.js :", sum(len(v['atoms']) for v in OUT.values()), "atomes")
