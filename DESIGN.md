# Design

Sistema visual vigente de `index.html`. Refinar preserva esto; solo un rediseño aprobado por el fundador lo sustituye.

`variante-a.html` guarda la dirección anterior («consultora sobria»: Hanken Grotesk en todo, sin banda oscura, sin NEGOCIA). Lleva `noindex, nofollow` y no está enlazada. Es archivo, no alternativa viva.

---

## Tipografía

Cuatro familias, cada una con un trabajo:

| Familia | Dónde |
|---|---|
| **Inter Tight** (alt. Archivo) | Titular del héroe y titular del problema |
| **Hanken Grotesk** | Todo lo demás: h2, cuerpo, UI |
| **DM Mono** | Horas, numeración 01–05 y etiquetas de sistema del embudo |
| Fuente del sistema | Dentro de las maquetas (WhatsApp, dashboard, landing de ejemplo) |

- Héroe: `clamp(2.6rem,5.3vw,6.25rem)`, `line-height:.98`, tracking −0.035em, tres niveles dentro de un solo `h1` — «Agentes de IA» a 800, el puente a 500, «cotizar, resolver, emitir y cobrar.» a 800 en `#14634f`.
- Resto: h2 `clamp(1.9rem,3.6vw,3rem)` a peso 300; verbos `.k` `clamp(3rem,7vw,5.5rem)` con el punto final en verde.
- **Texto funcional nunca por debajo de 11 px reales.**

## Tokens

```
--paper:#F7F8F7    fondo            --line:#CFDBD6     líneas
--paper-2:#EEF1EF  fondo alterno    --line-soft:#E1E8E5
--ink:#101917      texto            --green:#0A6B58    acento (6.06:1 sobre --paper)
--ink-2:#3B4A45    secundario       --green-soft:#E3F0EB
--mute:#5B6E68     atenuado         --warn:#C8893F     sin uso desde el rediseño del embudo
--maxw:1120px
```

Colores de WhatsApp (`--wa-*`) solo dentro de maquetas. El SVG del diagrama usa `var()`, no hexadecimales: cambiar un token repinta también el diagrama.

**La sección del problema tiene paleta propia**, declarada en `.problem`:

```
#071a16  verde tinta, fondo de la banda
#f4f2e9  blanco cálido sobre ella (16.03:1)
#d6ff62  lima, acento de la sección (15.7:1)
#dfc6a8  arena, tarjetas de consecuencia
#10231f  texto sobre arena (9.97:1)
```

Más `#14634f` en los verbos del titular del héroe (6.74:1 sobre `--paper`).

**Deuda conocida:** son seis colores fuera del sistema base y `--warn` quedó sin uso. Si se consolida, `#14634f` debería fundirse con `--green`.

## Layout

- Ancho 1120 px, padding 24. **Excepción:** la banda del problema usa 1320 px; a 1120 las cinco columnas caían a 197 px y no admitían 14 px de texto.
- Secciones a 72 px (56 en móvil). El problema a 44, el control a 40: son las dos que se apretaron para caber en pantalla.
- `scroll-padding-top` de 62 px (94 en móvil) en `html`, y **ninguna sección lleva `scroll-margin-top`**: si están las dos, se suman y el ancla aterriza 152 px abajo.
- Rejilla de dos columnas alternando lado; una columna por debajo de 900 px. `align-items:start` siempre.
- Sin `scroll-snap` vertical: con secciones más altas que la pantalla generaba siete zonas muertas de ~737 px.

## Estructura

`main` contiene ocho secciones. El menú apunta a siete:

1. **Héroe** (`#inicio`) — titular Inter Tight, barra lima, conversación de EMITE.
2. **El problema** (`#problema`) — banda verde tinta. `<ol>` de cinco momentos: número 01–05, hora, etiqueta, ventana de aplicación de WhatsApp, línea temporal con nodos y tarjeta arena con la consecuencia. Carrusel con `scroll-snap` horizontal por debajo de 1180 px.
3. **Capacidades** (`#producto`) — COTIZA, RESUELVE + **NEGOCIA**, EMITE, COBRA. NEGOCIA vive dentro de RESUELVE, con su conversación al lado; no es un verbo canónico y no aparece ni en el titular ni en el diagrama.
4. **IA** (`#ia`) — las cinco barreras.
5. Por qué contesta bien (`#confianza`).
6. **Dashboard** (`#control`) — titular y lede en paralelo, panel con lista de leads y conversación con toma de control.
7. **Arquitectura** (`#encaja`) — diagrama de tres planos.
8. **Contacto** (`#contacto`) — `min-height` de una pantalla, porque si no el documento se acaba antes de poder subirla bajo la nav.

## Componentes

- **Teléfono** (`.phone > .bar + .chat`): borde 1 px, radio 22, sin sombras. En EMITE ocupa toda la columna (504 px a 1440), sin columna de notas.
- **Ventana de aplicación** (`.wa`) en el embudo: barra con avatar, nombre y estado; sin marco de teléfono.
- **Dashboard** (`.dash`): sin KPIs. Papel pintado de puntos, burbujas al 64 %, doble check y cabecera con avatar, para que lea como WhatsApp y no como una tabla.
- **Controles** (`.ctl`): dos iconos de 24 px —pausa/reproducir y repetir— en la misma línea que el pie. Sin texto visible: el `aria-label` es el único nombre accesible.
- Botones: píldora `--ink`. **No hay CTA de demo.** El `mailto` va prellenado.

## Motion

- Solo CSS. `--at` fija el segundo de entrada de cada burbuja; `--dur` la duración de «escribiendo…».
- **Estado por defecto = estado final.** Con `prefers-reduced-motion` no hay animación y los controles se ocultan.
- El indicador de «escribiendo…» anima **solo `opacity`** y lleva `margin-bottom:-30px` que cancela su huella. Animar `height` movía el teléfono 41 px y el titular 21.
- Las animaciones del embudo usan `animation-fill-mode: both`, no `backwards`: la regla global `.anim .msg{opacity:0}` también las alcanza, y `backwards` no conserva el estado final. Con `backwards` quedaban 2 de 12 burbujas visibles.
- **Arrancan al 60 %** del demo visible (o del alto de pantalla, si el demo es más alto). Al 45 % empezaban mientras la sección aún subía.
- Embudo: 9.83 s. Conversaciones: 8–18 s. Todas pausables y repetibles.

## Accesibilidad

- Outline `H1 · H2 ×2 · H3 ×5 · H2 ×5`, sin saltos. Un solo `h1`.
- Landmarks `header`, `nav`, `main`, `footer`, más skip link.
- Objetivos táctiles ≥ 24 px. Foco visible en todos los tabulables.
- Contraste AA en todo el texto funcional. **Excepción documentada:** el doble check de WhatsApp da 1.92:1; es fidelidad literal al producto.

## Decisiones que se apartan de CLAUDE.md

Anotadas aquí para que se encuentren, no para discutirlas:

1. **No hay marcas de «ilustrativo».** Se retiraron «Escenas ilustrativas…», «Los datos del panel son ilustrativos» (×2) y «Conversación real de producción, sin intervención humana». §4 y §5 las piden. La página presenta las cinco escenas del embudo y las cifras del panel sin distinguirlas de lo real. Reversible: `git revert 417fa35 93fdc91`.
2. **Cuatro familias tipográficas y seis colores** fuera del sistema base.
3. **La banda del problema rompe el ancho de 1120 px.**
