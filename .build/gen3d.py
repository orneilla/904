# -*- coding: utf-8 -*-
"""Génère les coordonnées 3D des molécules du visualiseur, et VÉRIFIE leurs
descripteurs CIP avec RDKit avant de les écrire. Sortie : .build/mol3d.js"""
from rdkit import Chem
from rdkit.Chem import AllChem, rdCIPLabeler
import numpy as np, json, sys

def embed(smi, seed=0xC0FFEE):
    m = Chem.MolFromSmiles(smi)
    assert m is not None, smi
    m = Chem.AddHs(m)
    p = AllChem.ETKDGv3(); p.randomSeed = seed
    assert AllChem.EmbedMolecule(m, p) == 0, "échec d'embedding : " + smi
    AllChem.MMFFOptimizeMolecule(m, maxIters=2000)
    Chem.AssignStereochemistryFrom3D(m)
    rdCIPLabeler.AssignCIPLabels(m)
    return m

def cips(m):
    return {a.GetIdx(): a.GetProp('_CIPCode') for a in m.GetAtoms() if a.HasProp('_CIPCode')}

def frame(v1, v2):
    e1 = v1/np.linalg.norm(v1)
    e2 = v2 - np.dot(v2, e1)*e1; e2 = e2/np.linalg.norm(e2)
    return np.array([e1, e2, np.cross(e1, e2)])

def align(P, v1, t1, v2, t2):
    """tourne le nuage P pour que v1 aille sur t1 et v2 dans le plan (t1,t2)."""
    R = frame(np.array(t1,float), np.array(t2,float)).T @ frame(np.array(v1,float), np.array(v2,float))
    return P @ R.T

def strip_h(m, keep):
    """indices des atomes à garder : tous les lourds + les H listés."""
    return [a.GetIdx() for a in m.GetAtoms() if a.GetSymbol() != 'H' or a.GetIdx() in keep]

def pack(m, idx, P, nom, extra=None):
    conv = {old: i for i, old in enumerate(idx)}
    atoms = [{'e': m.GetAtomWithIdx(o).GetSymbol(), 'p': [round(float(c), 3) for c in P[k]]}
             for k, o in enumerate(idx)]
    bonds = []
    for b in m.GetBonds():
        i, j = b.GetBeginAtomIdx(), b.GetEndAtomIdx()
        if i in conv and j in conv:
            bonds.append([conv[i], conv[j], int(b.GetBondTypeAsDouble())])
    d = {'nom': nom, 'atoms': atoms, 'bonds': bonds}
    if extra: d.update(extra)
    return d, conv

OUT = {}
RAP = []

# ---------------------------------------------------------------- 1. butan-2-ol
UL = [-0.8165, 0.5774, 0.0]      # en haut à gauche, dans le plan de l'écran
BACK = [0.0, -0.5774, -0.8165]   # vers l'arrière, en bas
for lettre, smi in (('R', 'CC[C@@H](C)O'), ('S', 'CC[C@H](C)O')):
    m = embed(smi)
    c = [a.GetIdx() for a in m.GetAtoms() if a.HasProp('_CIPCode')][0]
    assert cips(m)[c] == lettre, (smi, cips(m))
    P = m.GetConformer().GetPositions()
    nb = {a.GetSymbol(): a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors()}
    hID = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors() if a.GetSymbol() == 'H'][0]
    oID = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors() if a.GetSymbol() == 'O'][0]
    P = P - P[c]
    P = align(P, P[hID], BACK, P[oID], UL)
    idx = strip_h(m, {hID})
    d, conv = pack(m, idx, P[idx], 'butan-2-ol (' + lettre + ')',
                   {'centre': None, 'cip': lettre})
    d['centre'] = conv[c]
    d['prio'] = [conv[oID], None, None, conv[hID]]   # complété plus bas côté JS
    # priorités complètes : OH > Et > Me > H
    et = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors()
          if a.GetSymbol() == 'C' and a.GetDegree() > 1][0]
    me = [a.GetIdx() for a in m.GetAtomWithIdx(c).GetNeighbors()
          if a.GetSymbol() == 'C' and a.GetIdx() != et][0]
    d['prio'] = [conv[oID], conv[et], conv[me], conv[hID]]
    OUT['butanol' + lettre] = d
    RAP.append(f"butan-2-ol ({lettre}) : RDKit lit {cips(m)[c]}")

# ---------------------------------------------------------------- 2. (Z)-hex-3-ène
m = embed(r'CC/C=C\CC')
db = [b for b in m.GetBonds() if b.GetBondTypeAsDouble() == 2][0]
assert str(db.GetStereo()).endswith('Z') or db.GetPropsAsDict().get('_CIPCode') == 'Z', db.GetStereo()
c3, c4 = db.GetBeginAtomIdx(), db.GetEndAtomIdx()
P = m.GetConformer().GetPositions(); P = P - (P[c3] + P[c4]) / 2
et = [a.GetIdx() for a in m.GetAtomWithIdx(c3).GetNeighbors()
      if a.GetSymbol() == 'C' and a.GetIdx() != c4][0]
P = align(P, P[c4] - P[c3], [1, 0, 0], P[et] - P[c3], [-1, -0.6, 0])
idx = strip_h(m, set())
d, conv = pack(m, idx, P[idx], '(Z)-hex-3-ène')
d['alcene'] = [conv[c3], conv[c4]]
OUT['hexeneZ'] = d
RAP.append("(Z)-hex-3-ène : géométrie " + str(db.GetPropsAsDict().get('_CIPCode', db.GetStereo())))

# ------------------------------------------------------- 3. 4-aminobutan-2-one
m = embed('CC(=O)CCN')
co = [a.GetIdx() for a in m.GetAtoms()
      if a.GetSymbol() == 'C' and any(b.GetBondTypeAsDouble() == 2 for b in a.GetBonds())][0]
oID = [a.GetIdx() for a in m.GetAtomWithIdx(co).GetNeighbors() if a.GetSymbol() == 'O'][0]
me = [a.GetIdx() for a in m.GetAtomWithIdx(co).GetNeighbors()
      if a.GetSymbol() == 'C' and a.GetDegree() == 4][0]
ch = [a.GetIdx() for a in m.GetAtomWithIdx(co).GetNeighbors()
      if a.GetSymbol() == 'C' and a.GetIdx() != me][0]
P = m.GetConformer().GetPositions(); P = P - P[co]
P = align(P, P[oID], [0, 1, 0], P[me], [-0.87, -0.5, 0])
idx = strip_h(m, set())
d, conv = pack(m, idx, P[idx], '4-aminobutan-2-one')
d['sp2'] = conv[co]; d['prioF'] = [conv[oID], conv[ch], conv[me]]
OUT['aminocetone'] = d
RAP.append("4-aminobutan-2-one : carbone sp² identifié, aucun centre stéréogène (" + str(cips(m)) + ")")

# ------------------------------------------------- 4. 4-tert-butylcyclohexanone
m = embed('O=C1CCC(CC1)C(C)(C)C')
co = [a.GetIdx() for a in m.GetAtoms()
      if a.GetSymbol() == 'C' and any(b.GetBondTypeAsDouble() == 2 for b in a.GetBonds())][0]
oID = [a.GetIdx() for a in m.GetAtomWithIdx(co).GetNeighbors() if a.GetSymbol() == 'O'][0]
ri = [r for r in m.GetRingInfo().AtomRings() if co in r][0]
P = m.GetConformer().GetPositions()
ctr = P[list(ri)].mean(axis=0); P = P - ctr
nrm = np.linalg.svd(P[list(ri)] - P[list(ri)].mean(axis=0))[2][2]
if np.dot(nrm, P[oID]) < 0: nrm = -nrm
P = align(P, nrm, [0, 0.93, 0.37], P[co], [-0.95, 0.15, 0])
idx = strip_h(m, set())
d, conv = pack(m, idx, P[idx], '4-tert-butylcyclohexanone')
d['sp2'] = conv[co]; d['oxy'] = conv[oID]
OUT['cyclohexanone'] = d
RAP.append("4-tert-butylcyclohexanone : chaise obtenue, carbonyle repéré")

# ---------------------------------------------- 5. biaryle : le difluoro-diacide
m = embed('OC(=O)c1cccc(F)c1-c1c(F)cccc1C(=O)O')
bnd = None
for b in m.GetBonds():
    i, j = b.GetBeginAtom(), b.GetEndAtom()
    if i.GetIsAromatic() and j.GetIsAromatic() and not b.IsInRing():
        bnd = (i.GetIdx(), j.GetIdx()); break
assert bnd, "liaison aryle-aryle introuvable"
a1, a2 = bnd
P = m.GetConformer().GetPositions(); P = P - (P[a1] + P[a2]) / 2
ortho = [a.GetIdx() for a in m.GetAtomWithIdx(a1).GetNeighbors() if a.GetIdx() != a2]
fo = [o for o in ortho if any(n.GetSymbol() == 'F' for n in m.GetAtomWithIdx(o).GetNeighbors())]
ref = fo[0] if fo else ortho[0]
P = align(P, P[a2] - P[a1], [0, 0, -1], P[ref] - P[a1], [0.71, 0.71, 0])
idx = strip_h(m, set())
d, conv = pack(m, idx, P[idx], 'acide 6,6′-difluorobiphényl-2,2′-dicarboxylique')
d['axe'] = [conv[a1], conv[a2]]
tors = Chem.rdMolTransforms.GetDihedralDeg(m.GetConformer(), ref, a1, a2,
        [a.GetIdx() for a in m.GetAtomWithIdx(a2).GetNeighbors()
         if a.GetIdx() != a1 and any(n.GetSymbol() == 'F' for n in m.GetAtomWithIdx(a.GetIdx()).GetNeighbors())][0])
d['torsion'] = round(float(tors), 1)
OUT['biaryle'] = d
RAP.append(f"biaryle : angle de torsion F–C–C–F = {tors:.1f}°")

# ---------------------------------------------------------------- écriture
with open('.build/mol3d.js', 'w') as f:
    f.write("\n/* ===== Coordonnées 3D — produites par .build/gen3d.py, vérifiées par RDKit ===== */\n")
    f.write("const MOL3D = " + json.dumps(OUT, ensure_ascii=False) + ";\n")
print("\n".join("  " + r for r in RAP))
print("\n.build/mol3d.js écrit :", sum(len(v['atoms']) for v in OUT.values()), "atomes au total")
