#!/usr/bin/env python3
"""Incrusta un modelo GLB en index.html (constante GLB_B64).

Uso: python3 tools/incrustar-glb.py <clave> <archivo.glb>
Claves: trabajador, camaronero, kit. Los GLB fuente están en modelos/.
El lector de la página (glbParse) sólo entiende lo básico: nodos con TRS, mallas con
POSITION/NORMAL e índices y materiales PBR de valores planos; sin texturas, huesos,
animación ni compresión Draco/meshopt.
"""
import base64, json, re, struct, sys, pathlib

clave, archivo = sys.argv[1], pathlib.Path(sys.argv[2])
datos = archivo.read_bytes()
if datos[:4] != b'glTF':
    sys.exit('No es un GLB')
largo = struct.unpack('<I', datos[12:16])[0]
gltf = json.loads(datos[20:20 + largo])
usadas = gltf.get('extensionsUsed', [])
if any('draco' in e.lower() or 'meshopt' in e.lower() for e in usadas) or gltf.get('images') or gltf.get('skins'):
    sys.exit('El GLB usa algo que el lector de la página no entiende (compresión, texturas o huesos)')
html = pathlib.Path(__file__).resolve().parent.parent / 'index.html'
s = html.read_text(encoding='utf-8')
patron = re.compile(r"(const GLB_B64 = \{[^\n]*?\b" + re.escape(clave) + r": ')[A-Za-z0-9+/=]*(')")
if not patron.search(s):
    sys.exit('No encontré la clave ' + clave + ' en GLB_B64')
s = patron.sub(lambda m: m.group(1) + base64.b64encode(datos).decode() + m.group(2), s, count=1)
html.write_text(s, encoding='utf-8')
print(clave, 'incrustado:', len(datos), 'bytes,', len(gltf.get('nodes', [])), 'nodos')
