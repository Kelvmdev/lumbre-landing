// POST /api/guardar — recibe el data.json completo (ya con la sección editada
// encima) y lo persiste. Solo con sesión válida.
import type { APIRoute } from "astro";
import { COOKIE, tokenValido } from "../../lib/auth";
import { guardarDatos } from "../../lib/repo";

export const prerender = false;

// Secciones que data.json DEBE tener. Si el POST no las trae todas, se rechaza
// (evita que un guardado incompleto/corrupto sobreescriba el archivo y rompa
// el sitio en vivo). Las listas además deben ser arrays.
const REQUERIDAS = ["hero", "galeria", "domos", "cielo", "experiencia", "faq", "mapa", "reserva", "cta", "footer", "nav", "seo", "contacto"];
function formaValida(d: unknown): boolean {
  if (!d || typeof d !== "object") return false;
  const o = d as Record<string, unknown>;
  if (!REQUERIDAS.every((k) => k in o)) return false;
  if (!Array.isArray(o.galeria) || !Array.isArray(o.domos)) return false;
  // El teléfono alimenta todos los links de WhatsApp y el SEO: solo dígitos.
  const tel = (o.contacto as Record<string, unknown> | undefined)?.telefono;
  return typeof tel === "string" && /^[0-9]{7,15}$/.test(tel);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!tokenValido(cookies.get(COOKIE)?.value)) {
    return new Response("No autorizado", { status: 401 });
  }
  let datos: unknown;
  try {
    datos = await request.json();
  } catch {
    return new Response("JSON inválido", { status: 400 });
  }
  if (!formaValida(datos)) {
    return new Response("Datos incompletos: faltan secciones obligatorias", { status: 400 });
  }
  try {
    await guardarDatos(datos);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Error al guardar:", e);
    return new Response("Error al guardar", { status: 500 });
  }
};
