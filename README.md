# SiMAR Keynote

Presentación animada de producto en 3D, estilo keynote, de **SiMAR** (Sistema Integral de Manejo
Ambiental de Residuos), la plataforma de Puerto Peñasco, Sonora, que digitaliza los manifiestos de
residuos de las embarcaciones pesqueras. La desarrollan el ITSPP y DCK Conciencia y Cultura, con
respaldo de SEMARNAT. Sitio de la plataforma: <https://simaryisus-app.vercel.app>.

Todo vive en un solo archivo, [`index.html`](./index.html): Three.js 0.159 y GSAP 3.12 se cargan
desde jsDelivr y las tipografías (Atkinson Hyperlegible Next y Mono) desde Google Fonts; lo demás
(pantallas, hojas, texturas, continentes) se genera dentro de la página.

## Guion (87 s en bucle)

| Tiempo | Escena |
|---|---|
| 0:00 | Inicio: el emblema se arma en 3D |
| 0:07 | El problema: manifiestos escritos a mano que se deterioran |
| 0:16 | La plataforma: laptop con el Panel y teléfono con "Nuevo manifiesto" |
| 0:25 | Trazabilidad: embarcación → centro de acopio → reciclaje o relleno |
| 0:32 | MARPOL Anexo V: ni un plástico al mar; el manifiesto que genera SiMAR, con sus firmas y su folio |
| 0:41 | Don Francisco: la cita y los principios de diseño |
| 0:47 | Conciencia azul: 1 L de aceite puede contaminar un millón de litros de agua (cubo de 10 m, a escala) |
| 0:55 | Impacto: 742 manifiestos, 80,957 kg de basura, 125,530 L de aceite, 125.6 t de CO₂ |
| 1:04 | Puertos: Puerto Peñasco y 8 puertos más en el globo |
| 1:12 | Plan México: mapa de México en 3D y las dos metas con las que SiMAR está en línea |
| 1:20 | Cierre |

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

**Manifiesto de la escena MARPOL (0:32):** es el manifiesto `MAN22052026 001` de la base de DCK
(embarcación Keiko II, 23 de mayo de 2026: 140 L de aceite usado, 4 filtros de aceite, 4 de diésel,
1 de aire y 120 kg de basura), dibujado con el formato del PDF que genera SiMAR
(`lib/utils/pdfGenerator.ts`). Es una representación: se omiten los nombres de las personas, el
logotipo de SEMARNAT, los números de registro y autorización y el código postal del encabezado; el
sello es la marca de registro de SiMAR (no una certificación de MARPOL) y el renglón de quien recibe
señala que la basura es del Anexo V y el aceite usado del Anexo I.

**MARPOL 73/78, Anexo V** (reglas para prevenir la contaminación por las basuras de los buques):
desde 1988 prohíbe descargar plásticos al mar, incluidas las artes de pesca; la versión revisada
(resolución MEPC.201(62), en vigor desde el 1 de enero de 2013) prohíbe en general descargar cualquier
basura, salvo los casos previstos en el Anexo, y aplica a todos los buques, también a los pesqueros. La
OMI recomienda entregar la basura en las instalaciones de recepción del puerto. México se adhirió al
Anexo V en 1998. El aceite lubricante usado corresponde al Anexo I; el formulario de SiMAR lo registra
junto con la basura. SiMAR registra las entregas; no certifica el cumplimiento de MARPOL.

**Plan México** ("Estrategia de Desarrollo Económico Equitativo y Sustentable para la Prosperidad
Compartida"): lo presentó la Presidencia de la República el 13 de enero de 2025, con 13 metas. La escena
nombra las dos con las que SiMAR está en línea: sostenibilidad ambiental empresarial y talento técnico
(150 mil profesionistas y técnicos más cada año). No se numeran porque las fuentes no coinciden. **SiMAR es un proyecto independiente: la escena
no es material oficial del Plan México** ni usa su identidad gráfica, y las cifras de SiMAR no se
presentan como resultados del Plan. El mapa es la silueta de México de world-atlas `countries-50m`
rasterizada a 0.2°.

**Diseño:** rama `online` de [DCK_react](https://github.com/LuisMario698/DCK_react):

- Logotipo y símbolo: `public/assets/simar/` (el logotipo va incrustado como WebP, con `nombre-claro.png`
  sobre la hoja blanca del manifiesto; el emblema 3D se modeló midiendo los bordes y colores de
  `simbolo-grande.png`).
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
