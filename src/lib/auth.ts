// Auth del panel /admin: cookie de sesión firmada con HMAC (NO base64).
// La cookie solo lleva una fecha de expiración pública + su firma; sin el
// SESSION_SECRET no se puede falsificar ni extraer la contraseña. (Tema 09.)
import crypto from "node:crypto";

export const COOKIE = "lumbre_sesion";
const OCHO_HORAS = 8 * 60 * 60 * 1000;

// Los secretos: import.meta.env en dev (Astro carga .env.local), process.env en Vercel.
const env = (k: string) =>
  (import.meta.env as Record<string, string | undefined>)[k] ?? process.env[k];

function secret(): string {
  const s = env("SESSION_SECRET");
  if (!s) throw new Error("Falta SESSION_SECRET (revisa .env.local y las env vars de Vercel).");
  return s;
}

// Comparación en tiempo constante (no filtra por tiempo cuánto coincide).
function iguales(a: string, b: string): boolean {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function firmar(dato: string): string {
  return crypto.createHmac("sha256", secret()).update(dato).digest("hex");
}

// ¿La contraseña enviada coincide con ADMIN_PASSWORD? (tiempo constante)
export function claveValida(intento: string): boolean {
  const real = env("ADMIN_PASSWORD");
  if (!real) throw new Error("Falta ADMIN_PASSWORD (revisa .env.local y Vercel).");
  return iguales(intento, real);
}

// Token = "expira.firma(expira)". La cookie solo lleva esto.
export function crearToken(): string {
  const expira = String(Date.now() + OCHO_HORAS);
  return `${expira}.${firmar(expira)}`;
}

// Válido = la firma recalculada coincide (tiempo constante) Y no expiró.
export function tokenValido(token: string | undefined): boolean {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const expira = token.slice(0, i);
  const firma = token.slice(i + 1);
  const esperada = firmar(expira);
  if (firma.length !== esperada.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(firma), Buffer.from(esperada))) return false;
  return Number(expira) > Date.now();
}

// Opciones de la cookie: httpOnly (JS no la lee), Secure en prod, SameSite lax, 8h.
export function cookieOpts(prod: boolean) {
  return {
    httpOnly: true,
    secure: prod,
    sameSite: "lax" as const,
    path: "/",
    maxAge: OCHO_HORAS / 1000,
  };
}
