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

- `index.html` es un **archivo único**: HTML, CSS y JS mínimo. Sin frameworks, sin build, sin dependencias salvo la tipografía de Google Fonts.
- Deploy en **Vercel** desde GitHub (`insurmind/insurmind_landing`). Dominio en name.com, DNS ya configurado.
- Ramas: `dev` → PR a `staging` → PR a `main`. **Nunca commits directos a `main`.**
- Antes de tocar nada: **lee `index.html` completo y el diagrama `insurmind-tres-planos.svg`** para entender el sistema visual. No introduzcas un segundo sistema.

## 3. Sistema visual — no lo cambies sin pedirlo

```
--paper:#F7F8F7   fondo
--paper-2:#EEF1EF fondo alterno de sección
--ink:#101917     texto y bloques oscuros
--ink-2:#3B4A45   texto secundario
--mute:#5B6E68    texto atenuado
--line:#CFDBD6    líneas
--green:#0A6B58   único acento (puntos finales de los verbos, flechas, pills)
--green-soft:#E3F0EB
```

- Tipografía: **Hanken Grotesk**, peso 300 en titulares con tracking negativo, 400 en cuerpo, 500 para UI. Dentro de los mockups de WhatsApp y del dashboard: fuente del sistema.
- Colores de WhatsApp (`--wa-*`) se usan **solo** dentro de los marcos de teléfono y del dashboard.
- Referencias de tono: Linear, Stripe, Notion. Calidad de consultora, no de startup.
- **Prohibido**: gradientes, blobs, sombras dramáticas, mockups de teléfono con brillos, ilustraciones isométricas, iconos de nube/engranaje/cerebro, tarjetas con esquinas redondeadas por todas partes, fotografía de stock, la palabra «IA» como titular.
- Todo tiene que funcionar en **blanco y negro** y en **móvil a 390 px**. Más de la mitad del tráfico B2B llega por móvil.

## 4. Copy — reglas duras

- **El titular está decidido y no se toca**:
  > Agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar.
  > Sin intervención, de principio a fin.
  > Tú ves cada conversación, mides la conversión y tomas el control cuando el negocio lo pida.
- «Cotiza, resuelve, emite y cobra, sin intervención» sigue siendo la frase interna de los cuatro verbos y del diagrama; no vuelve al titular.
- **Nunca «vende y cobra solo»**: en español «solo» se lee como *solamente*. Usa «sin intervención», «sin que nadie lo empuje», «de principio a fin».
- **Nunca «entrenado»**. Di «afinado», «corregido con conversaciones reales», «aprendido en producción».
- **Ninguna cifra inventada.** Conversiones, clientes, tiempos, porcentajes: si no está verificada y aprobada por Alberto, se deja `[MÉTRICA POR CONFIRMAR]`. Los datos del dashboard son ilustrativos y se marcan como tales.
- **Ningún logo ni nombre de aseguradora real** salvo instrucción explícita. Cajas neutras.
- **Las conversaciones de WhatsApp son copy real de producción: se usan literales.** No reescribir, no «mejorar», no corregir emojis ni puntuación.
- **Insurmind no es un core asegurador.** No guarda la póliza de registro, ni siniestros, ni contabilidad. Es lo que pasa antes y después del core. Cualquier texto que sugiera lo contrario se corrige.
- Tecnología: **Anthropic / Claude, sí**. Proveedores de orquestación, no (di la capacidad). Versiones de modelo, nunca. «IA» no es una caja en ningún diagrama.
- Idioma: español de México, registro directo, sin tuteo empalagoso ni jerga de startup.

## 5. Estructura de la página — mantener el orden

1. Héroe con la conversación de **EMITE** corriendo.
2. El problema: cinco escenas de WhatsApp **ilustrativas** (la de 18:52 muestra un chatbot genérico afirmando una cobertura que el cliente no contrató) (no son de producción y la página lo dice) con el punto de fallo resaltado en ámbar `--warn`, el único uso permitido de ese color.
3. Los cuatro verbos, uno por sección, cada uno con su captura: **COTIZA** (maqueta de landing), **RESUELVE** (dos conversaciones: duda y descuento), **EMITE**, **COBRA**.
4. Por qué contesta bien (correcciones reales: antes tachado / después).
5. El control es tuyo (dashboard con toma de control humano).
6. Confianza (las cinco barreras).
7. Cómo encaja (diagrama de tres planos, SVG inline).
8. Prueba (`[MÉTRICA POR CONFIRMAR]`).
9. Cierre: contacto por correo (sin botón de demo, por ahora).

Cambiar el orden requiere justificación escrita en el PR.

## 6. Animaciones — requisitos no negociables

- CSS puro con `--at` (segundo de entrada) y `--dur`; JS solo para arrancar al entrar en viewport, pausar y repetir.
- **Estado por defecto = estado final.** Sin JS, o con `prefers-reduced-motion`, la conversación se ve completa y quieta.
- Ritmo humano: «escribiendo…» antes de cada burbuja del bot, pausa de lectura entre burbujas. Una conversación entera en 12–20 s.
- Pausable y rebobinable con los botones existentes (`[data-pause]`, `[data-replay]`).
- Al añadir una conversación, copia la estructura existente (`.demo[data-seq] > .phone > .chat > .msg[--at]`). No inventes otro mecanismo.

## 7. Flujo de trabajo

1. Trabaja en `dev`. Commits pequeños con mensaje en español que diga *qué* y *por qué*.
2. Antes de proponer un cambio visual o de copy, **describe qué vas a cambiar y dónde, y espera aprobación.** Alberto valida estructura y contenido antes de que se escriba código.
3. Antes de abrir PR a `staging`: prueba en 1280 px y en 390 px, con y sin `prefers-reduced-motion`, y comprueba que las animaciones arrancan, pausan y repiten.
4. En el PR incluye capturas de escritorio y móvil de cada sección tocada.
5. `main` solo recibe PRs desde `staging` aprobados por Alberto.

## 8. Definición de terminado

Una tarea está terminada cuando:

- El archivo sigue siendo único y sin dependencias nuevas.
- Se ve correcto en escritorio y en móvil.
- No hay cifras, logos ni nombres que violen la sección 4.
- Las animaciones cumplen la sección 6.
- Lighthouse en móvil: rendimiento y accesibilidad por encima de 90.
- El PR lleva capturas y una lista de decisiones tomadas.

## 9. Backlog conocido (no lo ejecutes sin que se pida)

- Sustituir `[MÉTRICA POR CONFIRMAR]` cuando Alberto entregue cifras verificadas.
- Sustituir por copy real de producción, cuando se entregue: la respuesta del bot en RESUELVE (a), la confirmación de lectura de la tarjeta de circulación en EMITE («Leí tu tarjeta de circulación…») y el resumen de póliza.
- Segunda dirección visual («producto vivo») como variante para comparar.
- Posible tercera puerta en el plano 1 del diagrama («Asistentes de IA») y sección para los servicios de consultoría (API Readiness Assessment, Architecture Implementation).
- Botón/flujo de «Ver una demo» cuando Alberto lo decida (hoy solo `mailto:`).

## 10. Si tienes dudas

Pregunta antes de asumir. En particular sobre: cambios de copy en cualquier titular, cualquier número, cualquier nombre de empresa, y cualquier cambio en el orden de secciones o en el sistema visual.
