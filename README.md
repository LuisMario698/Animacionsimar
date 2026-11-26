# SiMAR Keynote

Presentación animada de producto en 3D, estilo keynote, de **SiMAR** (Sistema Integral de Manejo
Ambiental de Residuos), la plataforma de Puerto Peñasco, Sonora, que digitaliza los manifiestos de
residuos de las embarcaciones pesqueras. La desarrollan el ITSPP y DCK Conciencia y Cultura, con
respaldo de SEMARNAT. Sitio de la plataforma: <https://simar-app.vercel.app>.

Todo vive en un solo archivo, [`index.html`](./index.html) (es a la vez la fuente: se edita directamente): Three.js 0.159 y GSAP 3.12 se cargan
desde jsDelivr y las tipografías (Atkinson Hyperlegible Next y Mono) desde Google Fonts; lo demás
(pantallas, hojas, texturas, continentes) se genera dentro de la página. Tres modelos (el trabajador del
puerto, el camaronero y el kit de bodegas, contenedores, pangas, rocas y plantas) se modelaron en Blender
con 3D Jutsu de Higgsfield y van incrustados como GLB; sus fuentes están en [`modelos/`](./modelos/LEEME.md).

## Guion (119.5 s en bucle)

| Tiempo | Escena |
|---|---|
| 0:00 | Inicio: el emblema se arma en 3D al amanecer |
| 0:07 | El problema: manifiestos escritos a mano que se deterioran |
| 0:16 | La plataforma: laptop con el Panel y teléfono con "Nuevo manifiesto" |
| 0:24 | Cómo funciona, paso a paso, en un diorama del puerto: 1) llega el camaronero (estela de espuma, balanceo) y queda amarrado a las bitas; 2) la grúa del muelle baja la tarima de tambos y un montacargas la lleva al centro de acopio; 3) se llena el manifiesto en SiMAR (Keiko II, folio MAN22052026 001); 4) una empresa recolectora solicita la recolección y el centro de acopio la aprueba (Enviada → Aprobada); el camión entra por el camino de acceso y el montacargas sube la tarima a la plataforma; 5) el camión entra en reversa a la bahía de la planta de reciclaje (Recolectada). Alrededor: tierra con escollera, bodegas, estiba de contenedores, pangas varadas y fondeadas, matorral y sierras del desierto, y trabajadores con casco y chaleco (uno hace señas a la grúa, otro va en la cubierta del barco) |
| 0:48 | MARPOL Anexo V: ni un plástico al mar; el manifiesto que genera SiMAR, con sus firmas y su folio |
| 0:57 | Don Francisco: la cita y los principios de diseño |
| 1:03 | Conciencia azul: 1 L de aceite puede contaminar un millón de litros de agua (cubo de 10 m, a escala) |
| 1:11 | Impacto: 742 manifiestos, 80,957 kg de basura, 125,530 L de aceite, 125.6 t de CO₂ |
| 1:20 | Puertos: Puerto Peñasco y 8 puertos más en el globo, al atardecer |
| 1:28 | Plan México: mapa de México en 3D y las dos metas con las que SiMAR está en línea |
| 1:36 | La entrega: las fotos reales de la firma de recibido. Francisco Javier Bojórquez Ochoa (DCK) firma la entrega del software, del código fuente y de tres manuales; la constancia de terminación del ITSPP (desarrollo del 1 de febrero al 25 de mayo de 2026) |
| 1:46 | Colaboradores: Dr. Ixtoc Marlo Rivera Núñez (CIAD), Ing. Francisco Javier Bojórquez Ochoa (DCK Puerto Peñasco), Dr. Gabriel Rivera Solis (Centro de acopio Rivera) y Dr. Aarón Rivera Núñez (Reserva de la Biosfera El Pinacate y Gran Desierto de Altar) |
| 1:53 | Cierre, de noche |

El flujo del paso 4 sigue al sistema real: la solicitud de recolección pasa por Enviada, Aprobada y Recolectada
(`components/asociaciones/LineaDeTiempo.tsx` en DCK_react).

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

**Colaboradores:** nombres, cargos y fotos del documento *Colaboradores SiMAR* que entregó el equipo.

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

## Imagen y efectos

- **Dirección de arte: el Mar de Cortés del amanecer a la noche.** Cielo procedural y mar con oleaje
  que lo refleja (camino de luz del sol, bruma en el horizonte). La luz sigue la historia: amanecer
  en el inicio, día en la plataforma y el impacto, atardecer en los puertos y noche estrellada con luna
  en colaboradores y cierre. Los movimientos de cámara entre escenas vuelan sobre el agua.
- **Tipografía en movimiento:** titulares y cita entran palabra por palabra desde un desenfoque.

- **Posproceso de cine** escrito a mano sobre Three.js r159 (sin complementos): escena en HDR con
  MSAA, bloom por cadena de mips (Jimenez 2014), profundidad de campo con enfoque en el objetivo de
  cada toma (bokeh de 22 muestras a media resolución), desenfoque de movimiento de cámara por
  reproyección de profundidad, viñeta, grano y gradación.
- **Objetos con anatomía real:** el barco es un camaronero del Alto Golfo (casco con arrufo y
  proa abocinada, caseta al frente, mástil, tangones con jarcia, puertas de arrastre y redes) y el
  centro de acopio tiene lámina acanalada, cortina, tambos de 200 L, contenedor IBC y filtros.
- **Sombras suaves** que siguen a la escena activa (manifiestos, laptop, trazabilidad y MARPOL).
- Cada escena aparece cuando entra en cuadro (sin saltos) y el fondo azul del cubo se desvanece.
- Todo depende sólo del tiempo de la línea: ir y volver da el mismo cuadro (`tools/seekcheck.js`).
- **Calidad adaptable:** si el equipo no sostiene la fluidez, baja la resolución y luego, en orden,
  el MSAA, las muestras del desenfoque de movimiento, la profundidad de campo y las sombras.

## Herramientas de prueba (`tools/`, no se publican)

Necesitan Playwright y una carpeta con `three@0.159.0` y `gsap@3.12.5` instalados por npm:

```bash
node tools/shoot.js index.html <deps> capturas 10,30,84 1600   # capturas en esos segundos
node tools/seekcheck.js index.html <deps>                      # mismo cuadro al ir y volver
node tools/objshot.js modulo.js salida "30,15,5,0"             # banco para modelar un objeto 3D
python3 tools/incrustar-glb.py camaronero modelos/camaronero.glb # reincrusta un modelo de Blender
```

## Correr en local

Es una página estática; cualquier servidor sirve:

```bash
npx http-server .   # o: python3 -m http.server
```

## Despliegue

Vercel la sirve tal cual como sitio estático (sin paso de compilación) desde la rama `main`.
