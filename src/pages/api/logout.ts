// POST /api/logout — borra la cookie de sesión y vuelve al login.
import type { APIRoute } from "astro";
import { COOKIE } from "../../lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(COOKIE, { path: "/" });
  return redirect("/admin", 303);
};
