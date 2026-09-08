# AGENT.md — insurmind-landing

Este archivo gobierna a cualquier agente de código que trabaje en este repositorio. Guárdalo como `CLAUDE.md` (Claude Code) o `AGENTS.md` (Codex); el contenido es el mismo.

**Alcance: solo la landing pública de insurmind.ai.** Nada de MCP server, ni WhatsApp, ni n8n, ni integraciones con aseguradoras. Si una tarea toca eso, detente y dilo: vive en otro proyecto.

---

## 1. Qué es esto

La web pública de **Insurmind**, **agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar**, por canales conversacionales, sobre la tarificación, emisión y pagos que el cliente ya tiene — una o varias aseguradoras a la vez.

- **Comprador**: director comercial o de sistemas de una aseguradora o broker. No el asegurado.
- **Estrategia de la página**: enseñar el producto funcionando, no describirlo. Las conversaciones de WhatsApp animadas son la prueba; el resto de la página existe para enmarcarlas.
- **Sin botón de «Ver una demo» por ahora** (decisión de Alberto). El único contacto es el correo hola@insurmind.ai en el menú y en el cierre. No añadas CTAs sin que se pida.

## 2. Estado actual y punto de partida

- **`index.html`** es la página publicada: HTML, CSS y JS mínimo en un archivo. Sin frameworks, sin build, sin dependencias salvo Google Fonts.
- **`variante-a.html`** guarda la dirección visual anterior («consultora sobria»: Hanken Grotesk en todo, sin banda oscura, sin NEGOCIA). Lleva `noindex, nofollow` y no está enlazada. Es archivo, no alternativa viva. No la mantengas al día.
- **`assets/`**: `og-image.png` (1200×630) y `insurmind-tres-planos.svg` (el diagrama va inline en el HTML, el SVG suelto es la fuente).
- Deploy en **Vercel** desde GitHub (`insurmind/insurmind_landing`). El dominio de producción es el ápice: `www.insurmind.ai` redirige con **308** a `insurmind.ai`, y el `canonical`, el `og:url` y el `og:image` apuntan al ápice. Si alguna vez vuelves a tocarlo, el orden importa: primero se quita la redirección del destino, luego se pone la nueva, o Vercel la rechaza por bucle.
- Antes de tocar nada: **lee `index.html` completo y `DESIGN.md`**. `DESIGN.md` describe el sistema vigente con más detalle que este archivo y lleva una sección con las decisiones que se apartan de aquí.

## 3. Sistema visual — no lo cambies sin pedirlo

**Cuatro familias, cada una con un trabajo:**

| Familia | Dónde |
|---|---|
| **Inter Tight** (alt. Archivo) | Titular del héroe y titular del problema |
| **Hanken Grotesk** | Todo lo demás: h2, cuerpo, UI |
| **DM Mono** | Horas, numeración 01–05 y etiquetas de sistema del embudo |
| Fuente del sistema | Dentro de las maquetas (WhatsApp, dashboard, landing de ejemplo) |

**Paleta base:**

```
--paper:#F7F8F7   fondo            --line:#CFDBD6     líneas
--paper-2:#EEF1EF fondo alterno    --line-soft:#E1E8E5
--ink:#101917     texto            --green:#0A6B58    acento
--ink-2:#3B4A45   secundario       --green-soft:#E3F0EB
--mute:#5B6E68    atenuado         --warn:#C8893F     sin uso
--maxw:1120px
```

**La sección del problema tiene paleta propia**, declarada en `.problem`: `#071a16` (verde tinta, fondo), `#f4f2e9` (blanco cálido), `#d6ff62` (lima), `#dfc6a8` (arena, tarjetas de consecuencia), `#10231f` (texto sobre arena). Más `#14634f` en los verbos del titular del héroe.

- Colores de WhatsApp (`--wa-*`) solo dentro de las maquetas.
- El SVG del diagrama usa `var()`, no hexadecimales. Cambiar un token repinta también el diagrama.
- Ancho 1120 px. **Única excepción:** la banda del problema usa 1320 px; a 1120 sus cinco columnas caían a 197 px y no admitían 14 px de texto.
- **Prohibido**: gradientes, blobs, sombras dramáticas, mockups de teléfono con brillos, ilustraciones isométricas, iconos de nube/engranaje/cerebro, fotografía de stock, la palabra «IA» como titular.
- Todo tiene que funcionar en **blanco y negro** y en **móvil a 390 px**. Más de la mitad del tráfico B2B llega por móvil.
- **Texto funcional nunca por debajo de 11 px reales.** Verificado en cada cambio.

**Deuda conocida y aceptada:** son cuatro familias tipográficas y seis colores fuera de la paleta base, y `--warn` quedó sin uso al rediseñar el embudo. Si algún día se consolida, `#14634f` debería fundirse con `--green`.

## 4. Copy — reglas duras

- **El titular está decidido y no se toca**:
  > Agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar.
  > Sin intervención, de principio a fin.
  > Tú ves cada conversación, mides la conversión y tomas el control cuando el negocio lo pida.
- «Cotiza, resuelve, emite y cobra, sin intervención» sigue siendo la frase interna de los cuatro verbos y del diagrama; no vuelve al titular. **NEGOCIA no es un verbo canónico**: vive dentro de RESUELVE y no aparece ni en el titular ni en el diagrama.
- **Nunca «vende y cobra solo»**: en español «solo» se lee como *solamente*. Usa «sin intervención», «sin que nadie lo empuje», «de principio a fin».
- **Nunca «entrenado»**. Di «afinado», «corregido con conversaciones reales», «aprendido en producción». *(El h2 de la sección `.moat` dice «No lo entrenamos en un laboratorio»: es negación deliberada, no un descuido.)*
- **Ninguna cifra inventada.** Conversiones, clientes, tiempos, porcentajes: si no está verificada y aprobada por Alberto, se deja `[MÉTRICA POR CONFIRMAR]`.
- **Ningún logo ni nombre de aseguradora real** salvo instrucción explícita. Cajas neutras.
- **Las conversaciones de WhatsApp son copy de producción: se usan literales.** No reescribir, no «mejorar», no corregir emojis ni puntuación. Solo Alberto las cambia; lo ha hecho una vez, para localizar una respuesta a español de México.
- **Insurmind no es un core asegurador.** No guarda la póliza de registro, ni siniestros, ni contabilidad. Es lo que pasa antes y después del core.
- Tecnología: **Anthropic / Claude, sí**. Proveedores de orquestación, no. Versiones de modelo, nunca. «IA» no es una caja en ningún diagrama.
- Idioma: español de México, registro directo, sin tuteo empalagoso ni jerga de startup.

**Decisión vigente sobre las marcas de «ilustrativo».** La página **no** distingue lo real de lo ilustrativo. Se retiraron a petición expresa de Alberto, tras revisar el detalle: «Escenas ilustrativas…», «Los datos del panel son ilustrativos» (×2) y «Conversación real de producción, sin intervención humana». En consecuencia, las cinco escenas del embudo —incluida la de las 18:52, un chatbot afirmando una cobertura que el cliente no contrató— y las cifras del dashboard se presentan al mismo nivel que las conversaciones reales. **No lo reviertas por tu cuenta ni lo vuelvas a plantear**: está decidido. Si Alberto lo cambia de opinión: `git revert 417fa35 93fdc91`.

## 5. Estructura de la página — mantener el orden

Ocho secciones. El menú apunta a siete:

| # | Sección | id | Menú |
|---|---|---|---|
| 1 | Héroe, con la conversación de EMITE | `inicio` | Home |
| 2 | El problema: cinco momentos en banda oscura | `problema` | El problema |
| 3 | Los verbos: COTIZA, RESUELVE + **NEGOCIA**, EMITE, COBRA | `producto` | Capacidades |
| 4 | Confianza: las cinco barreras | `ia` | IA |
| 5 | Por qué contesta bien: correcciones antes/ahora | `confianza` | — |
| 6 | El control es tuyo: dashboard | `control` | Dashboard |
| 7 | Cómo encaja: diagrama de tres planos | `encaja` | Arquitectura |
| 8 | Cierre: contacto por correo | `contacto` | Contacto |

- La sección de prueba con `[MÉTRICA POR CONFIRMAR]` está retirada; vuelve cuando haya cifras verificadas.
- El problema son cinco **ventanas de aplicación de WhatsApp** —barra, avatar, nombre, estado—, no marcos de teléfono, en un `<ol>` con número, hora y etiqueta, línea temporal con nodos y tarjeta arena con la consecuencia. Carrusel horizontal por debajo de 1180 px.
- Cambiar el orden requiere justificación escrita en el PR.

## 6. Animaciones — requisitos no negociables

- CSS puro con `--at` (segundo de entrada) y `--dur`; JS solo para arrancar al entrar en viewport, pausar y repetir.
- **Estado por defecto = estado final.** Sin JS, o con `prefers-reduced-motion`, todo se ve completo y quieto, y los controles se ocultan.
- Ritmo humano: «escribiendo…» antes de cada burbuja del bot, pausa de lectura entre burbujas. Conversaciones de 8–18 s; el embudo, 9,83 s.
- Pausable y rebobinable con `[data-pause]` y `[data-replay]`. Son **iconos de 24 px sin texto visible**: el `aria-label` es su único nombre accesible, así que si tocas un botón, tócalo también.

**Tres reglas que costaron encontrar. No las deshagas:**

1. El indicador de «escribiendo…» anima **solo `opacity`** y lleva `margin-bottom:-30px` que cancela su huella. Animar `height` movía el teléfono 41 px y el titular 21 px.
2. Las animaciones del embudo usan `animation-fill-mode: both`, **nunca `backwards`**. La regla global `.anim .msg{opacity:0}` también las alcanza, y `backwards` no conserva el estado final: con `backwards` quedaban 2 de 12 burbujas visibles.
3. Arrancan cuando se ve el **60 %** del demo (o del alto de pantalla, si el demo es más alto). Al 45 % empezaban mientras la sección aún subía.

## 7. Flujo de trabajo

1. Trabaja en `dev`. Commits pequeños con mensaje en español que diga *qué* y *por qué*.
2. Antes de proponer un cambio visual o de copy, **describe qué vas a cambiar y dónde, y espera aprobación.** Alberto valida estructura y contenido antes de que se escriba código.
3. Antes de abrir PR: prueba a 1440 y 390 px, con y sin `prefers-reduced-motion`, y comprueba que las animaciones arrancan, pausan y repiten.
4. `dev` → PR a `staging` → PR a `main`. **Nunca commits directos a `main`.**
5. `main` está protegida: exige PR, con **cero aprobaciones** (Alberto trabaja solo y no puede auto-aprobar). Push directo, force push y borrado de rama, bloqueados.
6. **El merge lo ejecuta siempre Alberto**, no el agente.

**Verifica midiendo, no mirando.** Inyecta un `<script>` en una copia del HTML y mide con `getBoundingClientRect`, `getComputedStyle` y `getAnimations().finish()` en Chrome headless. Chrome recorta la ventana por debajo de 500 px, así que para anchos móviles reales hace falta un iframe. Regenera el archivo de sonda tras cada edición. Casi todos los bugs de este repo se encontraron así, no en capturas.

## 8. Definición de terminado

- El archivo sigue siendo único y sin dependencias nuevas.
- Se ve correcto en escritorio y en móvil, sin desbordamiento horizontal de 390 a 1920 px.
- Ningún texto funcional por debajo de 11 px; ningún objetivo táctil por debajo de 24 px.
- No hay cifras, logos ni nombres que violen la sección 4.
- Las animaciones cumplen la sección 6.
- Lighthouse en móvil: rendimiento y accesibilidad por encima de 90.
- El PR lleva las medidas y una lista de decisiones tomadas.

## 9. Backlog conocido (no lo ejecutes sin que se pida)

- Sustituir `[MÉTRICA POR CONFIRMAR]` y devolver la sección de prueba cuando Alberto entregue cifras verificadas.
- Sustituir por copy real de producción, cuando se entregue: la respuesta del bot en RESUELVE (a), la confirmación de lectura de la tarjeta de circulación en EMITE y el resumen de póliza.
- Posible tercera puerta en el plano 1 del diagrama («Asistentes de IA») y sección para los servicios de consultoría.
- Botón/flujo de «Ver una demo» cuando Alberto lo decida (hoy solo `mailto:`).

**Ojo con la tarjeta social**: WhatsApp, Facebook y LinkedIn cachean `og-image.png` de forma agresiva. Si cambia, no basta con reemplazar el archivo — hay que renombrarlo o purgar con el depurador de Facebook.

## 10. Si tienes dudas

Pregunta antes de asumir. En particular sobre: cambios de copy en cualquier titular, cualquier número, cualquier nombre de empresa, y cualquier cambio en el orden de secciones o en el sistema visual.

**Y una que se aprendió por las malas: las maquetas mandan sobre el layout, no al revés.** Si una sección no cabe en pantalla, la respuesta es que la sección sea más larga o que sobre menos aire — nunca encoger `.phone`, `.chat`, `.dash` ni las ventanas del embudo. Un scroll de más cuesta menos que una prueba ilegible.

## 11. Impeccable (skill de diseño instalada)

El repo lleva la skill [Impeccable](https://github.com/pbakaus/impeccable) en `.claude/skills/impeccable` y `.agents/skills/impeccable`. `PRODUCT.md` y `DESIGN.md` son su fuente de verdad; mantenlos al día cuando cambie algo de fondo.

**Precedencia: este archivo gana.** Si una recomendación de Impeccable choca con las secciones 3, 4, 5 o 6, se ignora y se anota en el PR.

Comandos que sí se usan, siempre con aprobación previa del cambio: `/impeccable audit`, `critique`, `polish`, `typeset`, `layout`, `adapt`, `harden`, `optimize`, `clarify`, `extract`.

Comandos que **no** se usan sin que Alberto lo pida por escrito: `bolder`, `colorize`, `delight`, `overdrive`, `animate`, `craft` y cualquier cosa que introduzca un segundo acento, gradientes o efectos.

Detector: `npx impeccable detect index.html`. `.impeccable/config.json` ignora `nested-cards` y `pulsing-dot` porque las burbujas de WhatsApp y el indicador de «escribiendo…» son el producto real. La línea base actual es de **7 avisos**; si sube, mira qué añadiste.

**Otras skills instaladas** (`Leonxlnx/taste-skill`, trece en `.agents/skills/`): varias exigen React, Tailwind, GSAP, gradientes o bento grids. Chocan con las secciones 2 y 3 y **no se aplican**. `design-taste-frontend-v1` se usó una vez para generar la dirección visual actual, ignorando su mandato de stack y su prohibición de emojis; queda anotado en el historial.
