# Design

Dos direcciones vivas. **A es la landing**; B es una alternativa en evaluación.

| | Archivo | Estado |
|---|---|---|
| **A — «consultora»** | `index.html` | La página pública. Desplegada en `staging`. |
| **B — «Inter Tight + embudo oscuro»** | `variante-b.html` | Variante para comparar. `noindex, nofollow`, sin enlazar. |

Refinar preserva la dirección A. Solo un rediseño aprobado por el fundador la sustituye. Si B gana, este archivo se reescribe con B como sistema único.

---

# A — la landing (`index.html`)

## Tokens

```
--paper:#F7F8F7    fondo
--paper-2:#EEF1EF  fondo alterno de sección
--ink:#101917      texto principal y franjas oscuras
--ink-2:#3B4A45    texto secundario
--mute:#5B6E68     texto atenuado (5.09:1 sobre --paper, 4.76:1 sobre --paper-2)
--line:#CFDBD6     líneas
--line-soft:#E1E8E5
--green:#0A6B58    único acento (6.06:1 sobre --paper)
--green-soft:#E3F0EB
--warn:#C8893F     solo en las escenas del problema
--maxw:1120px
--tarjeta          la foto de la tarjeta de circulación, en base64, una sola vez
```

Colores de WhatsApp (`--wa-bg`, `--wa-out`, `--wa-in`, `--wa-time`, `--wa-check`) únicamente dentro de los marcos de teléfono y del dashboard. `--tarjeta` se declara una vez en `:root` y se aplica como `background`: antes estaba inline dos veces y era el 49 % del archivo.

El SVG del diagrama usa `var()`, no hexadecimales. Cambiar un token repinta también el diagrama.

`color-scheme: light` declarado. No hay modo oscuro y no se pretende.

## Tipografía

- Hanken Grotesk. 300 en titulares con tracking −0.02em; 400 en cuerpo (17 px, 1.55); 500 en UI.
- Dentro de los mockups (WhatsApp, dashboard, landing de ejemplo): fuente del sistema, como en el producto real.
- Escala: `h1 clamp(2rem,3.7vw,3.25rem)`; `h2 clamp(1.9rem,3.6vw,3rem)`; verbos `.k` `clamp(3rem,7vw,5.5rem)` con el punto final en verde; subtítulo del verbo `.vsub` 1.5rem/400.
- **Texto funcional nunca por debajo de 11 px reales.** Verificado: cero elementos.

## Layout

- Ancho máximo 1120 px, padding 24 px. Secciones a 96 px (64 en móvil), con `scroll-margin-top` de 76 px (104 en móvil) para que la nav pegajosa no tape las anclas.
- Rejilla de dos columnas para héroe y verbos, alternando lado; una columna por debajo de 900 px. `align-items:start` en las dos: el texto no se recentra cuando el artefacto cambia de altura.
- Líneas de 1 px como separadores. Sin tarjetas anidadas fuera de los mockups. Sin sombras.
- Radios: 22 px el teléfono, 14 px las demás superficies.
- Navegación: barra pegajosa de 60 px. Por debajo de 760 px los cuatro enlaces bajan a una segunda fila desplazable (93 px en total); el correo se queda arriba, siempre a un toque.

## Estructura

`main` contiene siete secciones, en este orden:

1. Héroe, con la conversación de EMITE.
2. El problema: cinco escenas ilustrativas con el fallo en ámbar `--warn`.
3. Los cuatro verbos: COTIZA, RESUELVE, EMITE, COBRA. COBRA lleva además la franja de cobranza.
4. Confianza / la IA (`#ia`): las cinco barreras.
5. Por qué contesta bien (`#confianza`): correcciones antes/ahora.
6. El control es tuyo (`#control`): dashboard con toma de control humano.
7. Cómo encaja (`#encaja`): diagrama de tres planos.
8. Cierre (`#contacto`): el correo.

**Nota de deriva:** los comentarios del HTML todavía numeran «5.bis» antes de «4». El orden real de secciones 4 y 5 es el de arriba. La sección de prueba con `[MÉTRICA POR CONFIRMAR]` se retiró; vuelve cuando haya cifras verificadas.

## Componentes

- **Teléfono** (`.phone > .bar + .chat`): borde 1 px, radio 22 px, sin sombras ni reflejos.
- **Burbujas** (`.msg.in|.out`): copia fiel de WhatsApp. La hora y el doble check a 0.72rem, en el rango de 11–12 px que se acepta dentro de los mockups.
- **Escenas del problema** (`.mini` + `.flag`): fondo apagado, señal ámbar sin borde lateral. El texto del `.flag` da 8.18:1 compuesto sobre `.mini`.
- **Franja de cobranza** (`.cobmini`): cifra, estado y botón con glifo de WhatsApp en píldora `--ink`. Datos ilustrativos, marcados.
- **Dashboard** (`.dash`): KPIs, lista de leads, conversación con toma de control. Las burbujas del operador llevan rótulo «Mariana · tu equipo»; sin él, la diferencia con el asistente era un borde de 1 px.
- **Diagrama**: SVG inline de tres planos, en tokens. Por debajo de 900 px vive en un scroller horizontal con `min-width:760px`, porque escalado al ancho del móvil sus etiquetas caían a 3.9 px.
- Botones: píldora de fondo `--ink`; enlace discreto `.quiet` con subrayado fino. **No hay CTA de demo.** El `mailto` va prellenado con asunto y cuerpo.

## Motion

- Solo CSS. `--at` fija el segundo de entrada de cada burbuja; `--dur` la duración de «escribiendo…».
- **Estado por defecto = estado final.** Con `prefers-reduced-motion` no hay animación y los controles se ocultan.
- El indicador de «escribiendo…» anima **solo `opacity`** y lleva `margin-bottom:-30px`, que cancela su huella. Nunca cambia la altura del chat: animar `height` movía el teléfono 41 px y el titular 21 px.
- Conversaciones de 8–18 s, pausables y repetibles. Cada control lleva `aria-label` con su conversación. Easing `ease-out`, nada elástico.

## Accesibilidad

- Outline `H1 · H2 ×2 · H3 ×4 · H2 ×5`, sin saltos. Un solo `h1`.
- Landmarks `header`, `nav`, `main`, `footer`, más skip link.
- Objetivos táctiles ≥ 24 px (WCAG 2.2 §2.5.8). Foco visible en los 23 elementos tabulables.
- Contraste AA en todo el texto funcional. **Única excepción documentada:** el doble check de WhatsApp da 1.92:1. Es fidelidad literal al producto y es una decisión, no un descuido.

---

# B — variante en evaluación (`variante-b.html`)

Copia de A con dos secciones rediseñadas. Todo lo demás —copy, conversaciones, emojis de producción, estructura, motion, accesibilidad— es idéntico, para que la comparación aísle la dirección visual.

## Qué cambia

**Héroe.** Titular en **Inter Tight** (alternativa: Archivo) con tres niveles dentro de un solo `h1`: «Agentes de IA» a 800, el puente a 500, y «cotizar, resolver, emitir y cobrar.» a 800 en `#14634f`. `clamp(2.6rem,5.3vw,6.25rem)`, `line-height:.98`, tracking −0.035em, `text-wrap:balance`. Barra corta de 72×4 px en lima sobre el titular. La rejilla del héroe pasa a `1.5fr/.82fr`: a 5.3vw el titular mide 76 px a 1440 y no cabía en la columna de A.

**El problema.** Banda en verde tinta `#071a16`. Los cinco momentos son un `<ol>`, cada uno con 01–05, hora y etiqueta del problema, así que el orden no depende de las horas. Cada conversación vive en una **ventana de aplicación** —barra, avatar, nombre, estado—, no en un marco de teléfono. Línea temporal continua con cinco nodos. La consecuencia comercial sale de la ventana y baja a una tarjeta arena. Por debajo de 1180 px es un carrusel con `scroll-snap` nativo, botones anterior/siguiente y teclado. Animación de 6.26 s.

## Tokens propios de B

```
#071a16  verde tinta, fondo de la banda del problema
#f4f2e9  blanco cálido sobre esa banda (16.03:1)
#d6ff62  lima, único acento de acento (15.7:1 sobre la banda)
#dfc6a8  arena, tarjetas de consecuencia
#10231f  texto oscuro sobre arena (9.97:1)
#14634f  verde de los verbos del titular (6.74:1 sobre --paper)
```

Fuentes: **Inter Tight** (titulares), **DM Mono** (horas y numeración), Hanken Grotesk (resto), fuente del sistema (mensajes).

La banda del problema usa 1320 px de ancho interior, no 1120: a 1120 las cinco columnas caían a 197 px y no admitían 14 px de texto.

## Deudas conocidas de B

- **B tiene cuatro familias tipográficas y seis colores fuera del sistema de A.** Si B gana, hay que consolidar: `#14634f` contra `--green`, y decidir si el lima es token o excepción de una sola sección.
- **`--warn` queda sin uso en B**: el ámbar era «el único uso permitido de ese color» y su única sección pasó a arena.
- El cromo de las maquetas de B (hora, estado, iniciales, checks) queda en 12.2–12.8 px, por debajo de los 14 px pedidos para esa sección pero por encima del piso de 11 px del proyecto.

---

## Cómo comparar

Sirve las dos con cualquier estático y ábrelas en el mismo dispositivo:

```
python3 -m http.server 8123
# A: http://127.0.0.1:8123/index.html
# B: http://127.0.0.1:8123/variante-b.html
```

La dirección anterior de B («producto vivo»: Outfit, bento, base clara fría) está en el commit `925d21d` y desplegada en `staging`. Para recuperarla como archivo:

```
git show 925d21d:variante-b.html > variante-outfit.html
```
