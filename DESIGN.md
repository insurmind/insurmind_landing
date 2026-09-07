# Design

Sistema visual vigente de la landing. Refinar preserva esto; solo un rediseño aprobado por el fundador lo sustituye.

## Tokens

```
--paper:#F7F8F7    fondo
--paper-2:#EEF1EF  fondo alterno de sección
--ink:#101917      texto principal y franjas oscuras
--ink-2:#3B4A45    texto secundario
--mute:#5B6E68     texto atenuado (solo sobre --paper / --paper-2)
--line:#CFDBD6     líneas
--line-soft:#E1E8E5
--green:#0A6B58    único acento
--green-soft:#E3F0EB
--warn:#C8893F     solo en las escenas del problema
```

Colores de WhatsApp (`--wa-*`) únicamente dentro de los marcos de teléfono y del dashboard.

## Tipografía

- Hanken Grotesk. 300 en titulares con tracking −0.02em; 400 en cuerpo (17 px, 1.55); 500 en UI.
- Dentro de los mockups (WhatsApp, dashboard, landing de ejemplo): fuente del sistema, como en el producto real.
- Escala: h1 `clamp(2rem,3.7vw,3.25rem)`; h2 `clamp(1.9rem,3.6vw,3rem)`; verbos `clamp(3rem,7vw,5.5rem)` con el punto final en verde.
- Texto funcional nunca por debajo de 11 px reales.

## Layout

- Ancho máximo 1120 px, padding 24 px. Secciones a 96 px (64 en móvil).
- Rejilla de dos columnas para héroe y verbos, alternando lado en cada verbo; una columna por debajo de 900 px.
- Líneas de 1 px como separadores; sin tarjetas anidadas fuera de los mockups.

## Componentes

- **Teléfono** (`.phone > .bar + .chat`): borde 1 px, radio 22 px, sin sombras ni reflejos.
- **Burbujas** (`.msg.in|.out`): copia fiel de WhatsApp; hora y doble check a 0.72 rem.
- **Escenas del problema** (`.mini` + `.flag`): fondo apagado, señal ámbar sin borde lateral.
- **Dashboard** (`.dash`): KPIs, lista de leads, conversación con botón de toma de control.
- **Diagrama**: SVG inline de tres planos; funciona en blanco y negro.
- Botones: píldora de fondo `--ink`; enlace discreto `.quiet` con subrayado fino. No hay CTA de demo.

## Motion

- Solo CSS. `--at` fija el segundo de entrada de cada burbuja; `--dur` la duración de «escribiendo…».
- Estado por defecto = estado final. Con `prefers-reduced-motion` no hay animación.
- Conversaciones de 8–18 s, pausables y repetibles. Easing `ease-out`, nada elástico.
