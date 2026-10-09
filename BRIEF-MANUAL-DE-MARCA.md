# Encargo: manual de marca de Insurmind

**Para el agente que lo redacte.** Este documento no es el manual. Es el encargo, con todo lo que se puede verificar ya extraído, para que no inventes nada.

---

## 0. Antes de empezar: dos trampas

**No uses `DESIGN.md` ni `PRODUCT.md`.** Son del 2026-09-07 y describen una dirección visual que ya no existe —verde `#0A6B58`, Hanken Grotesk, Inter Tight—. Esa página vive archivada en `variante-a.html` y `variante-b.html`, con `noindex`. Si los lees, acabarás documentando una marca muerta.

**La única fuente de verdad es `index.html` en `main`**, más `aviso-de-privacidad.html`. Lo que esté ahí, está decidido. Lo que no esté, no te lo inventes: pregunta.

Lo segundo: este encargo sale de **una landing**. Una landing no contiene una marca entera. Hay cosas que un manual debe cubrir y que aquí sencillamente no existen todavía —variantes del logotipo, impresión, fotografía, aplicaciones—. Están listadas en la sección 7, y la respuesta correcta para todas ellas es **preguntar a Alberto**, no rellenar el hueco con lo que suele hacerse.

---

## 1. Qué es Insurmind

**Agentes de IA para la venta y postventa de Seguros**, que se conectan con cualquier aseguradora en México. El eslogan vigente, que no se toca:

> Agentes de IA para la venta y postventa de Seguros.
> Una plataforma que puede trabajar mano a mano con tu equipo para acelerar las ventas.

- **A quién le habla**: al director comercial o de sistemas de una aseguradora o un broker. **No al asegurado.** Esto condiciona todo el tono: es una conversación entre profesionales que ya tienen una operación montada.
- **Qué promete**: no sustituir, sino operar. Los agentes llevan la conversación y el equipo la toma en cualquier momento para empujar la venta, y la devuelve. Esa reversibilidad es el posicionamiento, y cambió el 2026-10-07: antes se vendía autonomía.
- **Qué NO es**: un core asegurador. No guarda la póliza de registro, ni siniestros, ni contabilidad. Es lo que pasa antes y después del core.

---

## 2. Identidad visual, extraída de la página

### Marca gráfica

Monograma **IM** en una pastilla cuadrada de esquinas muy redondeadas (`rx 20` sobre `64×64`, es decir ~31 % del lado), con la **M** dibujada a trazo —no tipografiada— junto a una barra vertical:

```svg
<rect width="64" height="64" rx="20" fill="url(#degradado)"/>
<g fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 21V43"/>
  <path d="M28 43V21l8.5 11L45 21v22"/>
</g>
```

El relleno es el degradado de marca. El trazo es blanco, con remates redondos. Vive hoy en tres sitios: el favicon, el logotipo de la cabecera y los avatares de las maquetas.

**El nombre se escribe «Insurmind»**, una sola palabra, con mayúscula inicial y nada más. No «InsurMind». Se unificó a propósito el 2026-10-06.

### Color

Estos son los tokens reales de `:root`. Documenta estos, no otros:

| Token | Valor | Para qué |
|---|---|---|
| `--indigo` | `#4f46e5` | acento principal, botones, enlaces |
| `--indigo-dark` | `#3730a3` | texto sobre fondos claros de acento |
| `--violet` | `#7c3aed` | **solo** el extremo del degradado |
| `--lavender` | `#ddd8ff` | bordes y realces suaves |
| `--soft` | `#f2f1ff` | fondo de estados activos |
| `--success` | `#1d9a6c` | el lado «lo que ya tienes», confirmaciones |
| `--ink` | `#151526` | texto principal |
| `--muted` | `#626176` | texto secundario |
| `--line` | `#e7e6ef` | separadores y bordes |
| `--canvas` | `#fbfbfe` | fondo de página |
| `--white` | `#ffffff` | superficies |

**El degradado de marca** es `linear-gradient(135deg, #4f46e5, #7c3aed)`. Aparece con varios ángulos según el elemento —115°, 135°, 140°, 145°, 150°—; **en el manual propón un ángulo canónico y dilo como propuesta**, no como hecho.

**Violeta nunca va solo.** En toda la página solo existe como final de un degradado que empieza en índigo. Si el manual lo presenta como color de marca independiente, estará documentando algo que la página no hace.

### Tipografía

Dos familias, las dos **SIL Open Font License 1.1** y autoalojadas en `assets/fonts/`:

- **Manrope** (`--heading`) — titulares y nombres de componente. Pesos en uso: 600, 700, 800.
- **Inter** (`--body`) — cuerpo, interfaz, todo lo demás. Pesos en uso: 400, 500, 600, 700.

Titulares con `clamp()`, nunca fijos:

| Dónde | Cuerpo |
|---|---|
| `h1` del héroe | `clamp(2.2rem, 4.6vw, 4.4rem)` |
| `h2` de sección | `clamp(2.5rem, 5vw, 4.8rem)`, con `max-width: 14ch` |
| Entradilla de sección | `clamp(1.05rem, 1.5vw, 1.25rem)` |

El titular lleva `letter-spacing` negativo fuerte (`-0.055em` en los `h2`). Es deliberado y es parte del carácter.

**Suelo tipográfico: 11 px reales.** Ningún texto funcional baja de ahí, en ningún ancho. Es la regla más vigilada del proyecto y debe aparecer en el manual como norma, no como recomendación.

### Forma

| | Valor |
|---|---|
| Ancho de contenido | `min(1180px, 100vw - 3rem)` |
| Excepción | el héroe llega a `min(1440px, max(contenedor, 100vw - 5rem))` |
| Radio de tarjeta | `1rem`–`1.75rem` según jerarquía |
| Radio de píldora | `999px` |
| Ritmo vertical de sección | `clamp(5.5rem, 9vw, 9rem)` |
| Sombra de elevación | `0 24px 80px rgba(44, 38, 94, 0.12)` |

Las sombras de acento llevan **el color del elemento**, no negro: `0 10px 24px rgba(79, 70, 229, 0.2)` bajo un botón índigo. Documéntalo, porque es lo que evita que la página parezca gris.

### Movimiento

Hay tres piezas animadas y las tres comparten un contrato que el manual debe recoger:

1. **El estado por defecto es el estado final.** Sin JavaScript, o con `prefers-reduced-motion`, todo se ve completo y quieto.
2. **Todo lo animado se puede pausar**, y con movimiento reducido el control desaparece porque ya no controla nada.
3. **Nada que se mueva puede cambiar el alto de su contenedor.** Ya se rompió dos veces por esto.

---

## 3. Tono de voz

Esto no se deduce de la página: está escrito como norma en `CLAUDE.md` §4 y es tan parte de la marca como el color.

- **Español de México**, registro directo. Sin tuteo empalagoso ni jerga de startup.
- **Nunca «vende y cobra solo»**: en español «solo» se lee como *solamente*.
- **«Sin intervención» vale, pero nunca como absoluto.** Prohibido acompañarlo de «de principio a fin», «siempre» o «todo». Se retiró de la página el 2026-10-07 porque **no era verdad**: el equipo entra cuando hace falta, y eso es la propuesta, no una excepción.
- **Nunca «entrenado»**. Di «afinado», «corregido con conversaciones reales», «aprendido en producción».
- **Ninguna cifra sin verificar.** Y cualquier cifra no verificada tiene que vivir dentro de un bloque con una marca **visible** de entorno demostrativo. Un `aria-label` no cuenta.
- **Ningún logo ni nombre de aseguradora real.** Cajas neutras, salvo instrucción expresa.
- Tecnología: **Anthropic / Claude, sí**. Proveedores de orquestación, no. Versiones de modelo, nunca. **«IA» no es una caja en ningún diagrama.**

---

## 4. Lo que el manual debe contener

1. **Marca** — significado, monograma, construcción, área de respeto, tamaño mínimo, usos indebidos.
2. **Color** — paleta con tokens, el degradado, proporciones de uso, y **las parejas que cumplen AA**. Esto no es opcional: la página se audita contra WCAG AA y el manual tiene que dar las combinaciones ya verificadas para que nadie tenga que calcularlas.
3. **Tipografía** — familias, licencia, escala, pesos, el suelo de 11 px, el `letter-spacing` de titulares.
4. **Forma y espacio** — rejilla, radios, sombras, ritmo vertical.
5. **Movimiento** — los tres principios de arriba, con ejemplos.
6. **Voz** — la sección 3 entera, con ejemplos de «sí» y «no» sacados de la página real.
7. **Aplicaciones** — qué existe hoy (web, tarjeta social) y qué está por decidir.

---

## 5. Deuda conocida, que hay que documentar como deuda y no como sistema

Sé honesto sobre esto en el manual. Es más útil que fingir que el sistema está limpio.

- **Hay decenas de hexadecimales crudos fuera de los tokens.** Los más repetidos: `#6b687a`, `#55526a`, `#667781`, `#f3efff`, `#eee8ff`. Muchos vienen de maquetas que imitan interfaces reales —WhatsApp, el panel del producto— donde el color **es el producto** y no debe tokenizarse. Otros son deuda de verdad. Distínguelos.
- **Conviven dos escalas tipográficas**: la del sitio, en `rem`, y la de las maquetas, en `px` (11, 11.5, 12, 13). La segunda imita interfaces reales y por eso es fija. No las fundas.
- **El degradado aparece con seis ángulos distintos.**
- Los prefijos de componente son por sección, no por sistema: `cc-`, `dt-`, `dd-`, `nx-`, `ciclo-`, `wa-`, `cm-`, `arch-`. No hay librería; hay una página.

---

## 6. Cómo verificar en vez de suponer

El proyecto tiene una norma: **se mide, no se mira.** Aplícala.

- Los valores de este encargo salen de `index.html` en `main`. Si dudas de uno, vuelve al fichero.
- Para contrastes, calcúlalos. No los estimes.
- `npx impeccable detect index.html` da la línea base de avisos del proyecto.

---

## 7. Lo que NO está decidido: pregunta, no rellenes

Ninguna de estas cosas existe en la landing. **No inventes ninguna.** Deja el hueco marcado y pregúntale a Alberto:

- **Logotipo**: solo existe el monograma más el nombre en Manrope. No hay versión horizontal, ni apilada, ni monocroma, ni negativa, ni área de respeto definida, ni tamaño mínimo.
- **Color**: no hay versión en escala de grises, ni equivalencias Pantone/CMYK, ni paleta de impresión.
- **Significado**: por qué índigo y violeta. Hoy no está escrito en ninguna parte.
- **Fotografía e ilustración**: la página no usa ninguna. Si el manual dicta un estilo, lo estará inventando.
- **Aplicaciones**: presentaciones, correo, firmas, documentación, producto. No hay nada.
- **Nombre**: no hay normas de uso escrito más allá de la grafía «Insurmind».
- **Marca sonora, animación de logotipo, iconografía propia**: no existen. El sitio usa iconos de Lucide.

---

## 8. Formato de entrega

Un solo `MARCA.md` en la raíz del repositorio, en español de México, con el mismo registro directo que la página. Cada afirmación o sale de un valor verificable de `index.html`, o va marcada como propuesta pendiente de aprobación. **Si no puedes verificarlo y no te lo han dicho, no lo escribas.**
