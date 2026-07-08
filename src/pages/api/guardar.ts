// POST /api/guardar — recibe el data.json completo (ya con la sección editada
// encima) y lo persiste. Solo con sesión válida.
import type { APIRoute } from "astro";
import { COOKIE, tokenValido } from "../../lib/auth";
import { guardarDatos } from "../../lib/repo";

export const prerender = false;

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
  try {
    await guardarDatos(datos);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Error al guardar:", e);
    return new Response("Error al guardar", { status: 500 });
  }
};
