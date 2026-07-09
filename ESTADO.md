# LUMBRE — landing cinematográfica: glamping bajo las estrellas

`estado: 🟢 TERMINADA · CMS full COMPLETO y probado en prod` · `en vivo: https://lumbre-landing.vercel.app` · `panel: /admin` · `repo: github.com/Kelvmdev/lumbre-landing`

> 📁 **Ubicación:** `C:\Users\pc\Documents\Trabajos\Landings\Proyectos\lumbre-landing`. OJO: `lumen-landing` (misma carpeta) es OTRO proyecto (landing financiera), no una copia.
> ⚠️ **Si se retoma el código:** `git pull --no-rebase --no-edit` ANTES de tocar nada. El CMS edita `data.json` en GitHub desde `/admin`, así que tu copia local se desfasa con cada guardado (regla de oro tema 04). Lo vivimos: un guardado en prod dejó el local detrás.

## Concepto
"Del atardecer a las estrellas": la página ES un anochecer. Al hacer scroll el fondo baja de brasa de atardecer → crepúsculo → noche, y al final se encienden las estrellas sobre un domo iluminado. Firma: *el sol se pone mientras haces scroll*. Marca de ejemplo **LUMBRE** (nicho glamping/eco-lodge, demo ubicado en Jardín, Antioquia). Paleta: noche azul + dorado (único acento) + hueso cálido. Tipografía: Fraunces (display) + Inter (cuerpo). **Todos los datos son ficticios a propósito (es un demo de portafolio).**

## Stack
Astro 5 · Tailwind v4 (@tailwindcss/vite) · GSAP + Lenis · Fontsource (Fraunces/Inter) · adapter `@astrojs/vercel@^8` (páginas públicas prerenderizadas, `/admin`+`/api` con `prerender=false`).
**Dev:** `npm run dev` · **Build/preview:** `npm run build && npm run preview`.

## La página (hecho)
- Base Astro+Tailwind v4, tokens `@theme` en `src/styles/global.css`, Layout con SEO/OG/JSON-LD (LodgingBusiness), fuentes self-host + preload del H1 (LCP), skip-link.
- Componentes: Nav (hamburguesa accesible), Hero (bosque SVG en capas + domo, parallax), CieloTexto (texto-máscara), Domos (3 domos con foto/precio/features), Galeria (fotos reales Pexels, `astro:assets`), Experiencia, Reserva (form → WhatsApp), Mapa (iframe Google anti-hijack), Faq (`<details>` + schema FAQPage), CTA, Footer.
- Firma en `src/scripts/cine.ts`: Lenis smooth scroll + parallax bosque + reveals (ScrollTrigger.batch) + estrellas canvas por scroll. Respeta `reduced-motion`.
- Reserva = WhatsApp, helpers centralizados (`waReserva` / `waReservaDetalle`). Patrón checkout-WhatsApp tema 09.
- **SEO/GEO:** robots.txt (bots IA + sitemap), llms.txt (H1 + enlaces), 404 temática `noindex`, og.png 1200×630 + apple-touch-icon, JSON-LD con `telephone`+`geo`, sitemap.
- **Deploy Vercel** verificado sobre HTML en vivo. **PageSpeed móvil: 97 / 100 / 100 / 100** (rendimiento/a11y/best-practices/SEO). Los 3 puntos de perf ≈ foto de galería ~600KB lazy (no-LCP) — exprimirlo es pulir por pulir (YAGNI).
- **Auditoría adversarial (revisor-final) en verde:** contraste AA (~5:1–9:1), foco visible global, reduced-motion (CSS+JS), skip-link, `<main>`, aria de hamburguesa, FAQ accesible por teclado, sin lorem/TODO, anclas del nav con `id` real.

## CMS full (tema 04) — COMPLETO y probado en prod
Un solo `src/data.json` (trackeado) editable desde `/admin`. Ciclo real verificado: **editar → Guardar → commit en GitHub (Contents API) → Vercel rebuild → vivo.** Todo editable: textos, listas (domos/galería/FAQ/features), fotos (Cloudinary) y contacto (tel/email/ubicación/coords/redes).

**Arquitectura (reutilizable en otros proyectos):**
- `src/lib/contenido.ts` — `data.json` tipado + `IMAGENES` (clave→imagen local optimizada) + `esRemota()`/`optimizar()` (inserta `f_auto,q_auto` a URLs Cloudinary).
- `src/lib/enlaces.ts` — solo LÓGICA (helpers WhatsApp, nav). Los DATOS de contacto salen de `contenido.contacto`.
- `src/lib/auth.ts` — cookie HMAC firmada: token `expira.HMAC-SHA256(expira, SESSION_SECRET)`, `crypto.timingSafeEqual`, httpOnly+Secure(prod)+SameSite=Lax+8h. NO base64.
- `src/lib/repo.ts` — guardado dual: `fs` en dev, GitHub Contents API en prod (GET sha→PUT base64 UTF-8).
- `api/login.ts` · `api/logout.ts` · `api/guardar.ts` (exige `tokenValido`; valida forma del payload — todas las secciones presentes, listas son arrays, teléfono solo dígitos — para que un guardado corrupto no rompa el sitio).
- `pages/admin/index.astro` — panel config-driven en pestañas; listas con agregar/quitar fila vía `<template>`. **Blindaje anti-mina:** copia profunda del original (`JSON.parse(JSON.stringify)`) + solo sobreescribe los campos recolectados → lo no editable (SEO, icono SVG) sobrevive.

**8 env vars cargadas en Vercel (Production+Preview) Y en `.env.local` (gitignored):** `ADMIN_PASSWORD` · `SESSION_SECRET` · `GITHUB_TOKEN` (PAT, `public_repo`) · `GITHUB_OWNER` · `GITHUB_REPO` · `GITHUB_BRANCH` · `CLOUDINARY_CLOUD_NAME` · `CLOUDINARY_UPLOAD_PRESET`. **Nunca mostrar valores.**

## Gotchas (dolieron, no repetir)
- **Tailwind v4:** NO `bg-x/opacidad` (genera `color-mix`, trampa manual-01) → hex de 8 dígitos o `rgba()`.
- **adapter `@astrojs/vercel@^8`** (NO v11, que pide Astro 7). `security:{checkOrigin:false}` en astro.config es OBLIGATORIO o el POST del form de `/admin` da "Cross-site POST forbidden" en Vercel (la cookie SameSite=Lax ya da el CSRF).
- **Astro:** un comentario JSX `{/* */}` pegado a un `{map}` rompe el parser ("Expected )"). No mezclar.
- **Git pull antes de codear** (ver aviso arriba): cada guardado del CMS mueve el repo.
- **Push OOM ("malloc 500MB"):** `http.postBuffer` viejo en 500MiB con RAM justa → bajado a 10MiB. Si reaparece, `git config --get http.postBuffer`.
- **Build OOM intermitente** (poca RAM): reintentar 1-2 veces; cerrar previews huérfanos (`taskkill` por puerto 432x) y pestañas Chrome.
- **Puerto dev:** 4321 lo suele ocupar Public House → lumbre arranca en 4322. Leer el puerto real del log, no asumir.
- **Node local 24** no soportado por Vercel Functions (solo aviso en build local; Vercel usa Node 22). Inofensivo.

## Opcional (si algún día se retoma, no urgente)
- Foto destacada de galería (domo montaña, Pexels 33415953) es vertical y va recortada en tarjeta ancha; alternativa: tarjeta alta.
- Legales (`/privacidad` + `/terminos`, noindex) solo si pasa a cliente real que recoja datos. Para demo, YAGNI.

<sub>actualizado 2026-07-08 · proyecto TERMINADO, CMS full cerrado y probado en prod. Nada pendiente.</sub>
