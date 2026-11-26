# Modelos 3D de la keynote

Modelados en Blender con 3D Jutsu de Higgsfield (escena hospedada) y exportados a GLB. Están en
metros, con Z hacia arriba en Blender y el frente hacia +X; la página los escala a 1 unidad = 4.4 m.

| Archivo | Qué es | Proyecto en 3D Jutsu |
|---|---|---|
| `trabajador.glb` | Trabajador del puerto con casco y chaleco. Piezas con pivote: `head`, `arm_L`, `arm_R`, `leg_L`, `leg_R`, `torso` | <https://higgsfield.ai/3d-jutsu/f57c5216-d36b-4f06-9ff1-81fdf9bb8aa2> |
| `camaronero.glb` | Camaronero de 21.5 m. Origen en la línea de flotación. Marcadores `MARK_deck_cargo`, `MARK_cleat_bow`, `MARK_cleat_stern` | <https://higgsfield.ai/3d-jutsu/37f09262-6ded-452b-918b-75c391805343> |
| `kit.glb` | Kit del puerto: `BODEGA_A`, `BODEGA_B`, `CONTENEDOR`, `ROCA_1..3`, `PANGA`, `OCOTILLO`, `ARBUSTO`, `POSTE` | <https://higgsfield.ai/3d-jutsu/80ba0266-2a4a-4e0e-80bd-59b40f4b9a61> |

Los materiales se llaman `M_...`; la página tiñe por nombre (`M_skin`, `M_helmet`, `M_cont_body`,
`M_panga_stripe`). Para volver a incrustar un modelo en `index.html`:

```
python3 tools/incrustar-glb.py camaronero modelos/camaronero.glb
```
