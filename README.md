# SiMAR Keynote

Presentación animada de producto en 3D, estilo keynote, de **SiMAR** (Sistema Integral de Manejo
Ambiental de Residuos), la plataforma de Puerto Peñasco, Sonora, que digitaliza los manifiestos de
residuos de las embarcaciones pesqueras. La desarrollan el ITSPP y DCK Conciencia y Cultura, con
respaldo de SEMARNAT. Sitio de la plataforma: <https://simaryisus-app.vercel.app>.

Todo vive en un solo archivo, [`index.html`](./index.html): Three.js 0.159 y GSAP 3.12 se cargan
desde jsDelivr y las tipografías (Atkinson Hyperlegible Next y Mono) desde Google Fonts; lo demás
(pantallas, hojas, texturas, continentes) se genera dentro de la página.

## Guion (71 s en bucle)

| Tiempo | Escena |
|---|---|
| 0:00 | Inicio: el emblema se arma en 3D |
| 0:07 | El problema: manifiestos escritos a mano que se deterioran |
| 0:16 | La plataforma: laptop con el Panel y teléfono con "Nuevo manifiesto" |
| 0:25 | Trazabilidad: embarcación → centro de acopio → reciclaje o relleno |
| 0:33 | Don Francisco: la cita y los principios de diseño |
| 0:39 | Conciencia azul: 1 L de aceite en 1 m³ de agua |
| 0:47 | Impacto: 55 manifiestos, 209 kg, 49.2 L, 69 kg de CO₂ |
| 0:56 | Puertos: Puerto Peñasco y 8 puertos más en el globo |
| 1:04 | Cierre |

Controles: reproducir/pausar, reiniciar, barra para adelantar, pantalla completa y botones por
escena. <kbd>Espacio</kbd> pausa y <kbd>←</kbd> <kbd>→</kbd> cambian de escena. Con
`prefers-reduced-motion` empieza en pausa.

## Fuentes de los datos

Se tomaron de la rama `online` de [DCK_react](https://github.com/LuisMario698/DCK_react):

- Colores, tipografía y menú del Panel: `DISEÑO_SIMAR.md` y `components/layout/Sidebar.tsx`.
- Coordenadas de los puertos: `components/landing/mapa/puertos.ts`.
- 1 L de aceite = 1,000 L de agua: `lib/constants/impacto.ts`.
- Cita de Don Francisco: `components/landing/VariantCinematic.tsx`.

Los continentes del globo son [world-atlas](https://github.com/topojson/world-atlas) `land-50m`
rasterizado a 0.5° e incrustado en el HTML como una máscara de bits (base64).

## Correr en local

Es una página estática; cualquier servidor sirve:

```bash
npx http-server .   # o: python3 -m http.server
```

## Despliegue

Vercel la sirve tal cual como sitio estático (sin paso de compilación) desde la rama `main`.
