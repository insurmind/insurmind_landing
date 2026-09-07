# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Directores comerciales, de distribución y de sistemas de aseguradoras y brokers en México. Llegan por referencia, por una reunión previa o por búsqueda; saben lo que es un cotizador y desconfían de «IA para seguros». Quieren ver el producto funcionando, no leer sobre él. Más de la mitad entra desde el móvil.

No es una página para el asegurado final. Nunca se optimiza para él.

## Product Purpose

Insurmind es un SaaS con agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver dudas, emitir pólizas y cobrar recibos por canales conversacionales (hoy WhatsApp; después asistentes de IA), sobre la tarificación, emisión y pagos que la aseguradora ya tiene. La landing tiene un solo objetivo: que un director de aseguradora o broker entienda en dos minutos que el recorrido se completa de verdad —cotiza, resuelve, emite y cobra sin intervención— y que el control sigue siendo suyo, y escriba a hola@insurmind.ai.

## Positioning

Infraestructura de distribución conversacional, no un chatbot ni un core asegurador. El broker es la parte visible; Insurmind opera detrás. Cuatro verbos como prueba, un agente que los recorre, barreras deterministas que impiden que la IA invente cifras o coberturas, y un dashboard desde el que la aseguradora mide y toma el control.

## Operating Context

Archivo único `index.html` servido por Vercel desde `insurmind/insurmind_landing` (`dev` → `staging` → `main`). Sin build, sin frameworks, sin dependencias salvo Google Fonts. Las conversaciones de WhatsApp de las secciones de producto son copy real de producción y se muestran animadas con CSS; el estado por defecto es el estado final para que funcionen sin JS y con `prefers-reduced-motion`.

## Capabilities and Constraints

- El titular está decidido y no se reescribe: «Agentes de IA que se conectan a cualquier aseguradora en México para cotizar, resolver, emitir y cobrar.»
- Nunca «vende y cobra solo» (en español «solo» se lee como «solamente»). Nunca «entrenado» (di «afinado con conversaciones reales»).
- Ninguna cifra, cliente, logo o nombre de aseguradora que no esté verificado y aprobado. Los huecos se marcan como `[MÉTRICA POR CONFIRMAR]`.
- Las conversaciones de producción se usan literales; no se «mejoran».
- Insurmind no es un core asegurador: no guarda la póliza de registro, ni siniestros, ni contabilidad. Cualquier texto que lo sugiera se corrige.
- Anthropic / Claude se puede nombrar; proveedores de orquestación y versiones de modelo, no. «IA» no es una caja en ningún diagrama.
- Sin botón de «Ver una demo» por ahora; el único contacto es el correo.

## Brand Commitments

Sobrio, preciso, de consultora. Español de México, registro directo, sin jerga de startup. Referencias: Linear, Stripe, Notion; calidad de Big 4, no de startup de IA. Tres palabras: **preciso, sereno, verificable**.

Evitar: gradientes, blobs, brillos, ilustraciones isométricas, iconos de nube/engranaje/cerebro, mockups de teléfono con reflejos, fotografía de stock, «Impulsado por IA» como titular, cifras inventadas.

## Evidence on Hand

- Producto en producción con un broker y una aseguradora de auto en México; conversaciones reales de WhatsApp (cotización, duda de deducible, descuento, emisión con lectura de tarjeta de circulación, aviso de cobranza).
- Diagrama de tres planos (`assets/insurmind-tres-planos.svg`) validado por el fundador.
- No hay cifras públicas verificadas todavía ni clientes nombrables. No se inventan.

## Product Principles

1. **Enseñar el producto funcionando, no describirlo.** Las conversaciones son la prueba; el resto de la página las enmarca.
2. **Promesa arriba, tranquilidad debajo.** Primero los cuatro verbos; después las barreras y el control humano.
3. **Un solo acento.** El verde `#0A6B58` marca lo que importa; el ámbar solo señala el error en la sección del problema.
4. **Funciona en blanco y negro y a 390 px.** Si necesita color para entenderse, está mal.
5. **Nada que un comprador pueda desmontar en dos preguntas.**

## Accessibility & Inclusion

WCAG 2.1 AA. Contraste verificado, foco visible, `prefers-reduced-motion` respetado en todas las animaciones, HTML semántico, texto funcional nunca por debajo de 11 px, animaciones pausables y repetibles.
