// POST /api/login — valida la contraseña y, si es correcta, deja la cookie de
// sesión firmada. Sin backend de usuarios: una sola clave (ADMIN_PASSWORD).
import type { APIRoute } from "astro";
import { COOKIE, claveValida, crearToken, cookieOpts } from "../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const clave = String(form.get("clave") ?? "");

  if (!claveValida(clave)) return redirect("/admin?error=1", 303);

  cookies.set(COOKIE, crearToken(), cookieOpts(import.meta.env.PROD));
  return redirect("/admin", 303);
};
