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

## Monitor del stand (modo kiosco)

La página es sólo la presentación: sin encabezado, botones ni barra. Ocupa toda la ventana en
16:9 (con franjas negras si el monitor tiene otra proporción) y se reproduce en bucle sola.

- **Pausar o reanudar:** clic o toque en cualquier parte, o las teclas <kbd>Espacio</kbd> o
  <kbd>Enter</kbd>.
- **Pantalla completa:** doble clic (sólo entra, no sale) o la tecla <kbd>F</kbd>. Lo más
  seguro es abrir el navegador ya en modo kiosco, porque así la pantalla completa también se
  conserva si la página se reinicia sola:

  ```bat
  :: Windows (Chrome). El perfil propio conserva la copia sin conexión entre reinicios.
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --user-data-dir=C:\SimarKiosco --noerrdialogs --disable-domain-blocking-for-3d-apis https://animacionsimar.vercel.app
  ```

  ```bash
  # macOS o Linux (Chrome)
  google-chrome --kiosk --user-data-dir="$HOME/simar-kiosco" --noerrdialogs --disable-domain-blocking-for-3d-apis https://animacionsimar.vercel.app
  ```

  Evita `msedge --kiosk`: el modo kiosco de Edge es InPrivate y borra la copia sin conexión al
  cerrarse. Para salir del modo kiosco: <kbd>Alt</kbd>+<kbd>F4</kbd> (Windows) o
  <kbd>Cmd</kbd>+<kbd>Q</kbd> (macOS).
- El cursor se oculta solo y reaparece al mover el mouse. El clic derecho, la pulsación larga y el
  zoom con pellizco están desactivados.
- La página pide que la pantalla no se apague mientras se muestra (Screen Wake Lock); conviene
  además desactivar el apagado de pantalla del sistema.
- **Sin internet:** después de abrirla una vez con conexión, el navegador guarda una copia
  (service worker en [`sw.js`](./sw.js)) y la presentación sigue funcionando aunque el stand pierda
  internet. Con conexión, siempre carga la versión más reciente. **Antes del evento:** ábrela una
  vez con internet, cierra el navegador, desconecta la red y confirma que vuelve a reproducirse.
- Si el navegador pierde WebGL, no carga las bibliotecas o no termina de cargar, la página se
  reinicia sola.

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
