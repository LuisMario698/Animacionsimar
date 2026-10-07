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
| 0:39 | Conciencia azul: 1 L de aceite puede contaminar un millón de litros de agua (cubo de 10 m, a escala) |
| 0:47 | Impacto: 742 manifiestos, 80,957 kg de basura, 125,530 L de aceite, 125.6 t de CO₂ |
| 0:56 | Puertos: Puerto Peñasco y 8 puertos más en el globo |
| 1:04 | Cierre |

Controles: reproducir/pausar, reiniciar, barra para adelantar, pantalla completa y botones por
escena. <kbd>Espacio</kbd> pausa y <kbd>←</kbd> <kbd>→</kbd> cambian de escena. Con
`prefers-reduced-motion` empieza en pausa.

## Fuentes de los datos

**Cifras:** base de datos de DCK (proyecto Supabase "CIAD"), consultada en sólo lectura el 7 de
octubre de 2026, con las mismas sumas que `estadisticas_publicas()` de SiMAR:

| Dato | Valor |
|---|---|
| Manifiestos | 742, de 172 embarcaciones (abril 2024 a mayo 2026) |
| Aceite usado | 125,530 L |
| Basura | 80,957 kg |
| Basurón | 156 kg (1 viaje) |
| CO₂ evitado (estimado) | 125.6 t = 125,530 × 1.0 + 156 × 0.5 kg (`lib/utils/equivalencias.ts`) |

La gráfica del Panel usa los manifiestos por mes de abril 2024 a mayo 2026. Tres registros tienen
fecha de emisión posterior a su captura (dos en agosto 2026 y uno en octubre 2029): cuentan en el
total de 742, como en la app, pero se dejan fuera de la gráfica. Las hojas de papel y la tabla de
"Últimos manifiestos" muestran manifiestos reales (folio, embarcación, cantidades y fecha).

**Conciencia azul:** 1 litro de aceite puede contaminar 1,000,000 de litros de agua (1,000 m³, un
cubo de 10 m por lado). El cubito de aceite mide 10 cm por lado, a la misma escala.

**Diseño:** rama `online` de [DCK_react](https://github.com/LuisMario698/DCK_react):

- Logotipo y símbolo: `public/assets/simar/` (el logotipo va incrustado como WebP; el emblema 3D
  se modeló midiendo los bordes y colores de `simbolo-grande.png`).
- Colores, tipografía y menú del Panel: `DISEÑO_SIMAR.md` y `components/layout/Sidebar.tsx`.
- Coordenadas de los puertos: `components/landing/mapa/puertos.ts`.
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
