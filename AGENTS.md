# AGENT.md — insurmind-landing

Este archivo gobierna a cualquier agente de código que trabaje en este repositorio. Guárdalo como `CLAUDE.md` (Claude Code) o `AGENTS.md` (Codex); el contenido es el mismo.

**Alcance: solo la landing pública de insurmind.ai.** Nada de MCP server, ni WhatsApp, ni n8n, ni integraciones con aseguradoras. Si una tarea toca eso, detente y dilo: vive en otro proyecto.

---

## 1. Qué es esto

La web pública de **Insurmind**, **agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar**, por canales conversacionales, sobre la tarificación, emisión y pagos que el cliente ya tiene — una o varias aseguradoras a la vez.

- **Comprador**: director comercial o de sistemas de una aseguradora o broker. No el asegurado.
- **Estrategia de la página**: enseñar el producto funcionando, no describirlo. **Qué hace de prueba cambió el 2026-10-06**: antes eran las conversaciones de WhatsApp animadas, y el resto de la página existía para enmarcarlas; ahora la prueba es el **centro de control**, y las conversaciones lo sostienen. Alberto firmó el cambio al aprobar el orden de secciones del rediseño. Si vuelve a invertirse, se anota aquí con fecha.
- **Hay formulario de demo** desde el 2026-10-06. Los tres botones «Solicitar un demo» abren un `<dialog>` modal de tres pasos. Esto **revierte** la decisión anterior de no tener CTA de demo. El correo hola@insurmind.ai sigue siendo contacto válido y vive dentro del propio formulario. No añadas más CTAs sin que se pida.
- **Envío del formulario**: `const DEMO_ENDPOINT` en el `<script>`. Mientras esté vacío, cae a `mailto:`. Al pegar el endpoint del servicio de formularios pasa a `POST` con `fetch`.

## 2. Estado actual y punto de partida

- **`index.html`** es la página publicada: HTML, CSS y JS mínimo en un archivo. Sin frameworks, sin build, sin dependencias salvo Google Fonts.
- **`variante-a.html`** guarda la dirección visual anterior («consultora sobria»: Hanken Grotesk en todo, sin banda oscura, sin NEGOCIA). Lleva `noindex, nofollow` y no está enlazada. Es archivo, no alternativa viva. No la mantengas al día.
- **`assets/`**: `og-image.png` (1200×630) y `insurmind-tres-planos.svg` (el diagrama va inline en el HTML, el SVG suelto es la fuente).
- Deploy en **Vercel** desde GitHub (`insurmind/insurmind_landing`). El dominio de producción es el ápice: `www.insurmind.ai` redirige con **308** a `insurmind.ai`, y el `canonical`, el `og:url` y el `og:image` apuntan al ápice. Si alguna vez vuelves a tocarlo, el orden importa: primero se quita la redirección del destino, luego se pone la nueva, o Vercel la rechaza por bucle.
- Antes de tocar nada: **lee `index.html` completo y `DESIGN.md`**. `DESIGN.md` describe el sistema vigente con más detalle que este archivo y lleva una sección con las decisiones que se apartan de aquí.

## 3. Sistema visual — no lo cambies sin pedirlo

> **⚠️ Esta sección está desactualizada desde el 2026-10-06.** Describe la página de los cuatro verbos —verde `#0A6B58`, Hanken Grotesk, Inter Tight—, que ahora vive en `variante-b.html`. La página publicada usa la dirección del rediseño: índigo `#4f46e5`, violeta `#7c3aed`, Manrope e Inter, y gradientes. **No «corrijas» la página publicada para que encaje con lo de abajo.** Pendiente de reescribir con Alberto; hasta entonces, lo de abajo gobierna solo las variantes archivadas.

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

- **El eslogan está decidido y no se toca. Cambió el 2026-10-07**, dictado por Alberto. Vigente:
  > Agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar.
  > Una plataforma que puede trabajar mano a mano con tu equipo para acelerar las ventas.

  La primera línea es el `h1` y **no se ha movido ni una coma** desde el principio. Lo que cambió es la segunda. La anterior decía: «Sin intervención, de principio a fin. Tú ves cada conversación, mides la conversión y tomas el control cuando el negocio lo pida.»

  **El giro es de posicionamiento, no de redacción.** La segunda línea antes vendía autonomía —el agente trabaja y tú miras—; ahora vende colaboración: la plataforma trabaja *con* el equipo. Si alguien propone «recuperar» la frase anterior, esto es deliberado.

  **«Sin intervención» sigue siendo la fórmula obligatoria** del punto siguiente, y sigue viva en la `meta description` y en el `og:description`, que Alberto no pidió cambiar. Si algún día se unifican, que sea una decisión consciente y no un arrastre.
- «Cotiza, resuelve, emite y cobra, sin intervención» sigue siendo la frase interna de los cuatro verbos y del diagrama; no vuelve al titular. **NEGOCIA no es un verbo canónico**: vive dentro de RESUELVE y no aparece ni en el titular ni en el diagrama.
- **Nunca «vende y cobra solo»**: en español «solo» se lee como *solamente*. Usa «sin intervención», «sin que nadie lo empuje», «de principio a fin».
- **Nunca «entrenado»**. Di «afinado», «corregido con conversaciones reales», «aprendido en producción». *(El h2 de la sección `.moat` dice «No lo entrenamos en un laboratorio»: es negación deliberada, no un descuido.)*
- **Ninguna cifra inventada.** Conversiones, clientes, tiempos, porcentajes: si no está verificada y aprobada por Alberto, se deja `[MÉTRICA POR CONFIRMAR]`.
- **Ningún logo ni nombre de aseguradora real** salvo instrucción explícita. Cajas neutras.
- **Las conversaciones de WhatsApp son copy de producción: se usan literales.** No reescribir, no «mejorar», no corregir emojis ni puntuación. Solo Alberto las cambia; lo ha hecho una vez, para localizar una respuesta a español de México.
- **Insurmind no es un core asegurador.** No guarda la póliza de registro, ni siniestros, ni contabilidad. Es lo que pasa antes y después del core.
- Tecnología: **Anthropic / Claude, sí**. Proveedores de orquestación, no. Versiones de modelo, nunca. «IA» no es una caja en ningún diagrama.
- Idioma: español de México, registro directo, sin tuteo empalagoso ni jerga de startup.

**Decisión vigente sobre las marcas de «ilustrativo». Cambió, y depende de la página.**

- **En `variante-a.html` y en la landing de los cuatro verbos**, las marcas se retiraron a petición expresa de Alberto tras revisar el detalle: «Escenas ilustrativas…», «Los datos del panel son ilustrativos» (×2) y «Conversación real de producción, sin intervención humana». Si hiciera falta recuperarlas ahí: `git revert 417fa35 93fdc91`.
- **En el rediseño de agentes por proceso, las marcas se quedan.** Alberto lo decidió el 2026-10-06, al elegir entre mantenerlas o defender las cifras del panel. Son cuatro, todas visibles y ninguna solo para lector de pantalla: el chip «Entorno demostrativo» en la barra del mock del héroe y en la del centro de control, «Vista demostrativa del centro de control de InsurMind» sobre la sección de producto, y «Escenas representativas basadas en mensajes y reglas verificadas de InsurMind. Datos anonimizados» sobre las conversaciones.

**Regla que se deriva de esto:** en esa página, cualquier cifra sin verificar tiene que quedar dentro de un bloque que lleve una marca **visible**. Si añades números fuera de los mocks ya marcados, o marcas el bloque o usas `[MÉTRICA POR CONFIRMAR]`. Un `aria-label` no cuenta: el héroe tenía dos y sus siete cifras se leían como reales para cualquiera que viese la página.

## 5. Estructura de la página — mantener el orden

**Orden vigente desde el 2026-10-06.** Nueve bloques; el menú apunta a cuatro.

| # | Sección | id | Menú |
|---|---|---|---|
| 1 | Héroe: titular canónico + **diagrama de encaje** | `top` | — |
| 2 | **Dónde actuamos: el ciclo de venta y postventa** | `donde-actuamos` | Dónde actuamos |
| 3 | Un chatbot responde, un agente hace avanzar el proceso | `agentes` | Agentes |
| 4 | Producto en operación: el centro de control completo | `producto` | Producto |
| 5 | Plataforma: seis agentes, disponibles hoy o extensibles | `plataforma` | — |
| 6 | IA con control: agente · reglas · sistemas · personas | `control` | — |
| 7 | Arquitectura: canales → agentes → core → integraciones | `arquitectura` | Arquitectura |
| 8 | Preguntas frecuentes | `preguntas` | — |
| 9 | Cierre + formulario de demo | `contacto` | — |

**Justificación del cambio, firmada por Alberto el 2026-10-06** (lo que §5 exige): el orden anterior abría por el problema y dejaba el dashboard en sexto lugar. Este abre por la distinción de categoría —chatbot frente a agente— y pone el centro de control en tercero, antes que las conversaciones. Es un cambio de estrategia, no de maquetación: **mueve la prueba del chat al panel**. Se acepta porque el comprador es un director comercial o de sistemas, y a ese perfil le convence antes una consola de operación que una conversación.

**El héroe abre con el diagrama del núcleo conectado** (7 oct 2026, decisión de Alberto). Quién opera a la izquierda —tus clientes, los agentes de IA, tu equipo—, Insurmind en el centro con sus seis capacidades, y a la derecha «Lo que ya tienes»: aseguradoras, brokers e insurtech. **Cajas neutras, sin un solo logo.** Sustituye al mock del centro de control, y con él salen del héroe siete cifras sin verificar.

El diagrama tuvo dos versiones el mismo día. La primera era un SVG estático con el patrón de LiteLLM (PR #28). La segunda, la vigente, la entregó Alberto en `insurmind-nucleo-conectado.html`: la misma lectura, pero en HTML con iconos y con los cables animados. Lo que cambió al adoptarla:

- **El héroe es de dos columnas: titular y copy a la izquierda, diagrama a la derecha**, con el patrón del héroe de LiteLLM. Alberto lo decidió el 7 oct 2026 **después** de ver montada una versión a una sola columna, que él mismo había elegido unas horas antes. Si alguien se encuentra el commit de en medio, ese es el motivo.
- **El reparto es 0,85 / 1,15, no mitad y mitad.** A 1180 de contenedor son 478 px para el texto y 646 para el diagrama. La asimetría no es estética: el diagrama necesita unos 620 px para sostener sus tres columnas, y por debajo de 520 se apila y se pierde la lectura izquierda → núcleo → derecha, que es lo que el gráfico cuenta.
- **El titular bajó de 2,7rem a 2rem.** Tiene 103 caracteres; el de LiteLLM tiene 31. En una columna de 478 px, a 2,7rem salían siete líneas. A 2rem salen cuatro en todo el escritorio. **Y hay dos reglas `.hero h1` con el mismo valor, una pisando a la otra**: si cambias el tamaño, cámbialo en las dos o no pasará nada. El tope de 2rem es deliberado: el contenedor topa en 1180, así que por encima de 1280 px de pantalla la columna ya no crece y un titular que siguiera creciendo con el `vw` saltaría a cinco líneas.
- **Los cortes van con `@container`, no con `@media`.** El diagrama vive en una caja cuyo ancho no es el del viewport. Con los `@media` del fichero original, en una pantalla de 1440 px aplicaba las reglas de «escritorio» dentro de una columna de 540 y los laterales quedaban en **27 px**. Tres escalones: tres columnas desde **520 px de caja**, más holgura a 820 y a 1000. El de 520 es el que usa el héroe en escritorio; los otros dos solo entran cuando el héroe se apila por debajo de 980 px de pantalla y el diagrama se queda con el contenedor entero.
- **Cuidado otra vez con el orden de las reglas**: `@container` no suma especificidad, igual que `@media`. Las reglas base van antes de los bloques `@container`. Ya se rompió dos veces por esto en este repo.
- Se le quitó el código de `window.openai.widgetState` —venía como widget de ChatGPT—, se pasaron los trece iconos de `<img src="data:…base64">` a SVG en línea con `currentColor` (menos peso y funciona en blanco y negro) y se subieron a 11 px los seis textos que venían a 9 y 10.
- Tres colores de etiqueta del original fallaban AA: 3,05:1 y 3,68:1 sobre la zona teñida de la tarjeta, a 11 px. Ahora usan `--muted`, que da 5,35:1 y además quita dos hexadecimales fuera de paleta.

**Medir el texto de un SVG es distinto.** `getComputedStyle(...).fontSize` devuelve el valor del lienzo, no el que se ve: hay que multiplicarlo por `ancho renderizado / viewBox.width`. Por no hacerlo se publicaron los números del ciclo a **7,67 px** creyendo que eran 13. Si tocas un SVG, mide el renderizado.

**La sección 2 es la columna vertebral de la página** (7 oct 2026, decisión de Alberto: «rehacer la home a nivel de contenido, cómo mostramos lo que hacemos»). Una rueda de ocho etapas —seis de venta, dos de postventa— y, al lado, la prueba de la etapa activa. Las dos se mueven juntas.

- **Absorbió dos secciones**, que decían lo mismo peor: la franja de proceso bajo el héroe, y «El agente en acción», cuyas conversaciones viven ahora dentro del ciclo, cada una en su etapa.
- **Seis etapas tienen conversación**, con copy de producción reutilizado literal de `index.html` y de `variante-b.html`. **La etapa 07 sigue con ficha descriptiva** porque no hay material. Alberto entregará esa escena. **Hasta entonces no inventes una conversación para rellenarla**: §4 manda.
- **La etapa 01 lleva un cuadro de mando en tres vistas** (7 oct 2026, fichero de Alberto `insurmind-cuadro-mando.html`): gasto por canal, rendimiento semanal y el recorrido de las ventas. El original está maquetado a 900 px y el panel mide 368, así que en vez de encogerlo hasta hacerlo ilegible se partió en las tres piezas que ya tenía. Las cifras son literales del fichero y llevan sus marcas de «Datos ilustrativos». Se dejaron fuera los logos de Google, Instagram y Facebook que traía incrustados: no son aseguradoras, así que §4 no los prohíbe, pero el nombre en texto basta.
- **La duración es por etapa, no uniforme.** La 01 dura 10,5 s porque rota tres vistas de 3,5; el resto, 7 s. Si añades vistas a una etapa, ajusta `DURACIONES` en el script.
- El gráfico base lo entregó Alberto. Se le quitó el código de `window.openai.widgetState` —venía como widget de ChatGPT— y su hoja embebida, cuyos selectores apuntaban a un contenedor inexistente. Los ids del SVG van renombrados para no chocar con el diagrama de arquitectura.
- La etapa dura **7 s**, no los 2,8 s del original: una conversación corta no se lee en menos. La rueda solo avanza con la sección en pantalla.
- Por debajo de 980 px se apila; por debajo de 540 la rueda deja solo los números y el rótulo de estado nombra la etapa.

- Las cinco escenas del embudo y los cuatro verbos como secciones **ya no existen** en esta página. Siguen en `variante-a.html` y en `variante-b.html`, que son archivo.
- Cambiar el orden sigue requiriendo justificación escrita en el PR.

## 6. Animaciones — requisitos no negociables

- CSS puro con `--at` (segundo de entrada) y `--dur`; JS solo para arrancar al entrar en viewport, pausar y repetir.
- **Estado por defecto = estado final.** Sin JS, o con `prefers-reduced-motion`, todo se ve completo y quieto, y los controles se ocultan.
- Ritmo humano: «escribiendo…» antes de cada burbuja del bot, pausa de lectura entre burbujas. Conversaciones de 8–18 s; el embudo, 9,83 s.
- Pausable y rebobinable con `[data-pause]` y `[data-replay]`. Son **iconos de 24 px sin texto visible**: el `aria-label` es su único nombre accesible, así que si tocas un botón, tócalo también.

**Tres reglas que costaron encontrar. No las deshagas:**

1. El indicador de «escribiendo…» anima **solo `opacity`** y lleva `margin-bottom:-30px` que cancela su huella. Animar `height` movía el teléfono 41 px y el titular 21 px.
2. Las animaciones del embudo usan `animation-fill-mode: both`, **nunca `backwards`**. La regla global `.anim .msg{opacity:0}` también las alcanza, y `backwards` no conserva el estado final: con `backwards` quedaban 2 de 12 burbujas visibles.
3. Arrancan cuando se ve el **60 %** del demo (o del alto de pantalla, si el demo es más alto). Al 45 % empezaban mientras la sección aún subía.

**El diagrama del héroe es la excepción a la primera regla.** No es CSS con `--at`: es un bucle de `requestAnimationFrame` que mueve puntos por un SVG cuyos cables se recalculan con el ancho. No se puede hacer en CSS puro porque la geometría depende de dónde cae cada caja. A cambio cumple el resto, y de una forma que conviene no deshacer:

- **Dibujar y animar son dos cosas distintas.** `dibujar()` traza cables y puertos y corre **siempre**, también con `prefers-reduced-motion`: si no corriera, no habría cables. `pintar()` mueve los puntos y solo corre con el diagrama en pantalla y el movimiento permitido.
- **En reposo no se congela, se apaga.** Al pausar, al salir de pantalla o con movimiento reducido, los puntos se esconden y las cajas se apagan. La primera versión llamaba a `pintar()` al terminar de dibujar y dejaba el fotograma cero: un punto suelto a mitad de cable, que es justo lo que prohíbe «estado por defecto = estado final».
- `latido()` pinta en cada fotograma, incluso cuando no ha avanzado el reloj. Si solo pintara al avanzar, al reanudar se veía un fotograma con todo apagado.
- **Sin JS no hay cables.** Es el único punto en el que esta pieza se queda corta frente a §6. Mientras el tablero no lleva la clase `cableado`, un trazo de CSS entre bloques mantiene legible la relación. Si algún día alguien quiere cerrarlo del todo, hace falta geometría fija, y con ella se va la adaptación al ancho.
- Medir esto en Chrome headless **no funciona con `--virtual-time-budget`**: el `requestAnimationFrame` real solo se dispara tres o cuatro veces en dos segundos y parece que la animación está parada. Para medirla hay que sustituir `requestAnimationFrame` por un reloj de pasos fijos sobre `setTimeout` en una copia del fichero.

## 7. Flujo de trabajo

1. Trabaja en `dev`. Commits pequeños con mensaje en español que diga *qué* y *por qué*.
2. Antes de proponer un cambio visual o de copy, **describe qué vas a cambiar y dónde, y espera aprobación.** Alberto valida estructura y contenido antes de que se escriba código.
3. Antes de abrir PR: prueba a 1440 y 390 px, con y sin `prefers-reduced-motion`, y comprueba que las animaciones arrancan, pausan y repiten.
4. `dev` → PR a `staging` → PR a `main`. **Nunca commits directos a `main`.**
5. `main` está protegida: exige PR, con **cero aprobaciones** (Alberto trabaja solo y no puede auto-aprobar). Push directo, force push y borrado de rama, bloqueados.
6. **El merge lo puede ejecutar el agente, pero pidiendo autorización a Alberto en cada caso.** Decidido el 2026-10-06; antes lo ejecutaba siempre Alberto. La regla está implementada en `.claude/settings.json` como `permissions.ask` sobre `Bash(gh pr merge:*)`, de modo que cada merge abre una confirmación explícita. No la muevas a `allow`: el punto es que nadie mergee a `main` sin que una persona lo vea, porque la protección de rama exige **cero** aprobaciones.

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
