# LUMBRE — landing cinematográfica: glamping bajo las estrellas

`estado: 🟢 publicada, firma REVIVIDA en prod + bloque fácil de auditoría cerrado; queda backlog 🟡/🔴` · `en vivo: https://lumbre-landing.vercel.app`

**Stack:** Astro 5 · Tailwind v4 (@tailwindcss/vite) · GSAP + Lenis · Fontsource (Fraunces/Inter) · 100% estático (sin adapter)
**Dev:** `npm run dev` · **Preview build:** `npm run build && npm run preview` · **Repo:** — (sin git aún)

## Concepto
"Del atardecer a las estrellas": la página ES un anochecer. Al hacer scroll el fondo baja de brasa de atardecer → crepúsculo → noche, y al final se encienden las estrellas sobre un domo iluminado. Firma: *el sol se pone mientras haces scroll*. Marca de ejemplo **LUMBRE** (nicho: glamping/eco-lodge, Antioquia). Paleta: noche azul + dorado (único acento) + hueso cálido. Tipografía: Fraunces (display) + Inter (cuerpo).

## Hecho
- Base Astro+Tailwind v4, tokens `@theme` en `src/styles/global.css`, Layout con SEO/OG/JSON-LD (LodgingBusiness), fuentes self-host + preload del H1 (LCP), skip-link.
- 7 componentes: Nav (hamburguesa accesible), Hero (bosque SVG en capas + domo, parallax), CieloTexto (texto-máscara), Galeria (5 fotos reales), Experiencia (3 features), CTA, Footer.
- Firma en `src/scripts/cine.ts`: Lenis smooth scroll + parallax bosque + reveals (ScrollTrigger.batch) + estrellas canvas por scroll. Respeta `reduced-motion`.
- Galería con **fotos reales** (Pexels) en `src/assets/fotos/`, optimizadas con `astro:assets <Image>` (webp multi-tamaño, lazy). Grid 3 col → encaja 5 fotos sin huecos.
- Reserva = WhatsApp centralizado en `src/lib/enlaces.ts`.
- Auditoría adversarial (revisor-final) + arreglos: contraste AA (atardecer bajado a brasa, token `tenue` subido), CTAs/links muertos → WhatsApp, tile galería móvil, scroll-padding nav sticky, reduced-motion.
- `npm run build` pasa limpio.

## Pase SEO — hecho (2026-07-07, 2ª sesión)
- ✅ **robots.txt** (`public/`): bots IA permitidos + sitemap declarado. OJO: dominio a mano, cambiar al desplegar.
- ✅ **llms.txt** (`public/`): ficha GEO del negocio.
- ✅ **404.astro** con tema (usa Layout → nav+footer, `noindex`).
- ✅ **Faq.astro** enchufado antes del CTA: acordeón `<details>` nativo (sin JS) + schema **FAQPage** del mismo array (DRY). Respuestas seguras; TODOs de datos reales marcados en el componente.
- ✅ **JSON-LD**: `telephone` (reusa `TELEFONO_E164` de enlaces.ts) + `geo` en LodgingBusiness. Coords = placeholder Antioquia (TODO cliente).
- ✅ **og.png** 1200×630 + **apple-touch-icon.png** 180×180: generadas con `sharp` (paleta/gradiente del sitio), enlazadas en Layout. Script one-off, no quedó en el repo.
- ✅ **Datos demo coherentes** (glamping ficticio en **Jardín, Antioquia**): teléfono/WhatsApp/Instagram/Maps en `enlaces.ts`, coords `geo` reales de Jardín, FAQ sin TODOs. ES UN DEMO — datos inventados a propósito.
- Build limpio (2 páginas), todo copiado a `dist`. `site` en astro.config = placeholder vercel.

## Git/GitHub — hecho (2026-07-07)
- ✅ **git init** + primer commit. **Repo público:** https://github.com/Kelvmdev/lumbre-landing (cuenta Kelvmdev).
- `.gitignore` estándar Astro (excluye node_modules/dist/.astro/.env).
- Gotcha red: push fallaba con `curl 55/408` (HTTP/2) → fix `git config http.version HTTP/1.1`.

## Deploy + auditoría — hecho (2026-07-07)
- ✅ **Desplegada en Vercel**: https://lumbre-landing.vercel.app (home/og/robots 200, 404 real). El dominio coincidió con el placeholder → nada que cambiar en config/robots.
- ✅ **Auditoría SEO/rendimiento/a11y sobre HTML en vivo**: todo verde estructuralmente — title/desc/lang/canonical/robots OK, 1 h1, JSON-LD (LodgingBusiness+geo/tel y FAQPage), og:image absoluto, preload fuente H1 (LCP), 5 imgs con alt+width+lazy+srcset (CLS~0), CDN cache HIT.
- ⏳ **Número exacto PageSpeed**: API pública con cuota diaria agotada. Correr manual en pagespeed.web.dev (móvil, 2 veces) para el score; estructura ya está en verde.

## 🔎 BACKLOG de auditoría vs manual (2026-07-08) → ATACAR PRÓXIMA SESIÓN
Auditoría doble (yo + agente revisor-final) contra manual 01/03/04/05/10. Orden sugerido: bloque 🟢 primero (1 commit temático), luego decidir 🟡, y 🔴 solo si se quiere.

### ✅ 🟢 FÁCIL — HECHO (2026-07-08, commit `00e288d`, desplegado + verificado en prod)
1. ✅ **[CRÍTICO] FIRMA revivida** — Hero ahora es `<section id="inicio">` con clases `.eyebrow/.lede/.hero-cta`; `cine.ts` apunta a `#inicio`. Parallax bosque/domo + entrada escalonada vuelven a correr. Verificado: prod ya sirve `#inicio ...` y sin `#contenido header`.
2. ✅ **Datos demo** — Footer lee `TELEFONO_E164` de enlaces.ts; ubicación unificada a "Jardín, Antioquia".
3. ✅ **Crédito "Sitio por Kervin Martínez"** → portafolio, en la barra inferior del footer.
4. ✅ **404** — botón con `active:scale-95` + `duration-150`.
5. ✅ **DRY** — `NAV`/`EMAIL`/`UBICACION` centralizados en enlaces.ts; Nav importa `NAV`, Footer lo filtra (sin "Contacto") y lee email/ubicación/tel de las constantes.
6. ✅ **Logo Nav** `href="/"`.

### 🟡 MEDIA (una sesión c/u)
7. **Sección "Domos" vacía** — el ancla `#domos` (Nav/Footer) cae en `CTA.astro` (CTA genérico), no en info de domos. No hay tipos/capacidad/precio/fotos. Renombrar la sección o darle contenido real (agente maquetador o cms-datos).
8. **Formulario de reserva** (fecha + nº personas → arma mensaje WhatsApp con prefill, patrón checkout-WhatsApp tema 09; o HubSpot tema 03 + `/gracias`). Hoy los 4 CTAs son el mismo `wa.me` con texto fijo. En desktop WhatsApp es fricción → un form o `mailto:` visible ayuda.
9. **Ubicación/mapa** (tema 02) — iframe Google anti-hijack; glamping se beneficia de "cómo llegar".
10. **[verificar] Responsive 320px** — a 320px los 2 titulares grandes (Hero `Hero.astro:63` clamp 9vw + CieloTexto `CieloTexto.astro:6` clamp 13vw, `leading` muy ajustado) podrían apretarse/envolver feo. Confirmar en DevTools real (no rompe scroll: hay `overflow-x:clip`).
11. **PageSpeed en vivo (número)** — pendiente: API pública con cuota agotada el 7 jul. Correr manual en pagespeed.web.dev (móvil, 2 veces) o reintentar API.
12. **Legales** (privacidad/términos) o quitar del footer — opcional en demo.

### 🔴 DIFÍCIL (cambio de arquitectura, varias sesiones)
13. **CMS propio** (tema 04) — HOY ES 100% ESTÁTICA (sin adapter/SSR). Montar CMS = añadir `@astrojs/vercel`+`prerender=false`, mover TODO el contenido a `data.json` (hero/textos/FAQ/galería/contacto), panel `/admin` login cookie HMAC (tema 09), proxy `/api/guardar` GitHub Contents API, 5 env vars en Vercel, blindaje del guardado. **Recomendación: para un DEMO no hace falta (YAGNI); montarlo solo si se quiere como pieza de portafolio que demuestre la capacidad de CMS.**

### ✅ Confirmado EN VERDE por la auditoría (NO tocar)
Contraste AA (ratios ~5:1–9:1), foco visible global (`:focus-visible`), reduced-motion (CSS+JS), skip-link, `<main>` landmark, aria de hamburguesa (expanded/controls/Escape+focus), FAQ `<details>` accesible por teclado, sin lorem/TODO en `src/`, anclas del nav (#exp/#galeria/#contacto/#domos/#faq) todas con `id` real. SEO/OG/JSON-LD/robots/sitemap/404/og.png/deploy ya verificados antes.

## Opcional / a decidir
- Foto destacada de galería (domo montaña, Pexels 33415953) es vertical y va recortada en la tarjeta ancha; alternativa: ponerla en tarjeta alta.
- Hero: sigue en SVG a propósito (parallax). Evaluar foto real solo si no rompe la firma.

## Gotchas
- Tailwind v4: NO usar `bg-x/opacidad` (genera `color-mix`, trampa manual-01) → usar hex de 8 dígitos o `rgba()` en `<style>`.
- El degradado tarde→noche lo hace el CSS (`body`), GSAP solo lo suaviza con Lenis; funciona sin JS.
- Preview reusa puerto: si 4321/2/3 ocupados, sube a 4324+.

<sub>actualizado 2026-07-08 · bloque 🟢 completo + desplegado (commit 00e288d): firma revivida en prod, datos coherentes, crédito, DRY. PRÓXIMA SESIÓN = bloque 🟡 (empezar por #7 sección "Domos" o #10 responsive 320px).</sub>
