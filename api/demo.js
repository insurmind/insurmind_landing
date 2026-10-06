// Formulario de demo de la landing.
//
// Recibe el POST del modal de index.html y envía un correo desde la cuenta de
// Google Workspace de hola@insurmind.ai a esa misma dirección, con el correo
// del visitante en Reply-To.
//
// Por qué el remitente es la propia cuenta autenticada y no otra: insurmind.ai
// no tiene SPF ni DKIM publicados (medido el 6 oct 2026). Cualquier otro
// remitente «desde» @insurmind.ai acabaría en spam sin dejar rastro.
//
// Handoff: Agente-Arquitecto handoffs/2026-10-06-landing-formulario-demo-vercel-workspace.md

const nodemailer = require("nodemailer");

const OBLIGATORIOS = ["nombre", "apellido", "correo", "empresa", "tipo", "cargo", "pais", "proceso", "consentimiento"];
const OPCIONALES = ["telefono", "ramo", "aseguradoras"];
const ETIQUETAS = {
  nombre: "Nombre", apellido: "Apellido", correo: "Correo", telefono: "Teléfono",
  empresa: "Empresa", tipo: "Tipo de operación", cargo: "Cargo", pais: "País",
  proceso: "Proceso a poner en movimiento", ramo: "Ramo",
  aseguradoras: "Aseguradoras", consentimiento: "Consentimiento",
};
const MAX_CAMPO = 500;
const MAX_PROCESO = 2000;
const MAX_CUERPO = 10000;
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Costura para las pruebas: permite inyectar un transporte simulado sin tocar
// la ruta real. En producción nunca se llama.
let transporteInyectado = null;
function transporte() {
  if (transporteInyectado) return transporteInyectado;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_APP_PASSWORD },
  });
}

async function leerCuerpo(req) {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;
  let crudo = typeof req.body === "string" ? req.body : "";
  if (!crudo) {
    const trozos = [];
    let total = 0;
    for await (const t of req) {
      total += t.length;
      if (total > MAX_CUERPO) throw new Error("cuerpo_demasiado_grande");
      trozos.push(t);
    }
    crudo = Buffer.concat(trozos).toString("utf8");
  }
  if (crudo.length > MAX_CUERPO) throw new Error("cuerpo_demasiado_grande");
  const out = {};
  new URLSearchParams(crudo).forEach(function (v, k) { out[k] = v; });
  return out;
}

function validar(d) {
  for (const c of OBLIGATORIOS) {
    const v = (d[c] || "").toString().trim();
    if (!v) return "falta_" + c;
    const tope = c === "proceso" ? MAX_PROCESO : MAX_CAMPO;
    if (v.length > tope) return "largo_" + c;
  }
  for (const c of OPCIONALES) {
    if ((d[c] || "").toString().length > MAX_CAMPO) return "largo_" + c;
  }
  if (!CORREO.test(d.correo.trim())) return "correo_invalido";
  return null;
}

function cuerpoCorreo(d) {
  const lineas = [];
  for (const c of OBLIGATORIOS.concat(OPCIONALES)) {
    const v = (d[c] || "").toString().trim();
    if (v) lineas.push(ETIQUETAS[c] + ": " + v);
  }
  lineas.push("", "Enviado desde el formulario de demo de insurmind.ai");
  return lineas.join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  let datos;
  try {
    datos = await leerCuerpo(req);
  } catch (e) {
    return res.status(400).json({ ok: false, error: "cuerpo" });
  }

  // Campo trampa: si un bot lo rellena, respondemos 200 y no enviamos nada,
  // para no darle señal de que ha sido detectado.
  if ((datos._gotcha || "").toString().trim()) return res.status(200).json({ ok: true });

  const fallo = validar(datos);
  if (fallo) return res.status(400).json({ ok: false, error: fallo });

  const usuario = process.env.SMTP_USER;
  if (!usuario || !process.env.SMTP_APP_PASSWORD) {
    console.error("demo: faltan las variables SMTP");
    return res.status(502).json({ ok: false });
  }

  try {
    await transporte().sendMail({
      from: usuario,
      to: usuario,
      replyTo: datos.correo.trim(),
      subject: "Solicitud de demo — Insurmind — " + datos.empresa.toString().trim(),
      text: cuerpoCorreo(datos),
    });
  } catch (e) {
    // Solo el código. Nunca los datos del visitante ni las variables.
    console.error("demo: fallo de envío", (e && e.code) || "desconocido");
    return res.status(502).json({ ok: false });
  }

  return res.status(200).json({ ok: true });
};

module.exports.__inyectarTransporte = function (t) { transporteInyectado = t; };
