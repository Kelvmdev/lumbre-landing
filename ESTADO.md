# LUMBRE — landing cinematográfica: glamping bajo las estrellas

`estado: 🟢 publicada, backlog 🟢 y 🟡 COMPLETOS (firma viva, Domos/Mapa/Reserva, PageSpeed 97/100/100/100); solo queda 🔴 #13 CMS = YAGNI` · `en vivo: https://lumbre-landing.vercel.app`

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
7. ✅ **HECHO (8 jul, commit `fd12f2b`, desplegado)** — `Domos.astro`: 3 domos (Estrella/Luna/Fuego) con foto, capacidad, precio COP (demo) y features; cada "Reservar" abre WhatsApp con el domo prellenado (helper `waReserva` en enlaces.ts). `#domos` movido de CTA a la sección real. FALTA: que Kervin valide nombres/precios demo en vivo.
8. ✅ **HECHO (8 jul, commit `5caef24`, desplegado)** — `Reserva.astro` (id="reservar"): form nativo (date + number + select domo) → arma mensaje WhatsApp con fecha/personas/domo (helper `waReservaDetalle`). Patrón checkout-WhatsApp tema 09 (encodeURIComponent, window.open dentro del clic, valida fecha no pasada + personas≥1). Va entre Faq y CTA. Lógica verificada con check node. ✅ **CTAs repuntados (commit `4f260e6`)**: Nav(x2)/Hero/Footer "Reserva tu noche" → `#reservar` (scroll al form); CTA final y botones por-domo siguen directos a WhatsApp.
9. ✅ **HECHO (8 jul, commit `edd652e`, desplegado)** — `Mapa.astro`: sección "Cómo llegar" 2 columnas (info + iframe Google embed enmarcado, tema noche con filtro oscuro + overlay anti-hijack, patrón manual-02). Coords centralizadas en `enlaces.ts` (`COORDS` Jardín demo); Layout JSON-LD y `REDES.maps` las leen (fin del hardcode duplicado). Va entre Domos y Faq.
10. ✅ **VERIFICADO OK (8 jul)** — Kervin confirmó en DevTools a 320px: los 2 titulares grandes NO sobresalen ni envuelven feo. Los espacios permiten wrap y `overflow-x:clip` evita scroll. Sin cambios (YAGNI).
11. ✅ **HECHO (8 jul) — PageSpeed móvil medido en pagespeed.web.dev: Rendimiento 97 · Accesibilidad 100 · Best Practices 100 · SEO 100.** Los 3 puntos de perf ≈ foto destacada galería ~600KB (lazy, no-LCP); exprimir a 100 = pulir por pulir, YAGNI. ("2/3 Navegación con agentes" = métrica experimental Google, no afecta score).
12. ✅ **CERRADO como N/A (8 jul)** — no existe ningún enlace legal en el sitio (grep sin resultados), así que no hay links muertos que quitar. Para un DEMO no hacen falta legales (YAGNI). Solo montar `/privacidad` + `/terminos` (noindex) si pasa a cliente real que recoja datos.

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
- **Push fallaba con "Out of memory, malloc 500MB":** `http.postBuffer` local estaba en `524288000` (500MiB, fix viejo). Con RAM justa git no lo reserva → bajado a `10485760` (10MiB). Si vuelve a fallar el push por OOM, revisar `git config --get http.postBuffer`.
- **Build hace OOM intermitente (zlib/esbuild "insufficient memory"):** máquina con poca RAM libre; reintentar 1-2 veces suele bastar. Ayuda cerrar previews huérfanos (`taskkill` por puerto 432x) y pestañas Chrome.

<sub>actualizado 2026-07-08 · bloque 🟢 completo (00e288d) + 🟡 #7 Domos (fd12f2b) + #9 Mapa (edd652e) + #8 Reserva + CTAs (5caef24/4f260e6) desplegados; #10 verificado OK; #11 PageSpeed móvil 97/100/100/100; #12 legales N/A demo. BLOQUES 🟢 y 🟡 COMPLETOS. Solo queda 🔴 #13 CMS = YAGNI para demo (montar solo si se quiere como pieza de portafolio de CMS).</sub>
