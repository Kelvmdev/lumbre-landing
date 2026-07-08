# LUMBRE — landing cinematográfica: glamping bajo las estrellas

`estado: 🟢 publicada, backlog 🟢 y 🟡 COMPLETOS + agentes/llms.txt OK; 🔴 #13 CMS full EN PROGRESO (Fase 1a hecha)` · `en vivo: https://lumbre-landing.vercel.app`

> ⏭️ **ARRANCAR AQUÍ (próxima sesión):** continuar CMS **Fase 1b** = cablear el resto de textos a `src/data.json` (Hero, CieloTexto, Experiencia, Faq, Mapa, Reserva, CTA, Footer, Nav, SEO del Layout), siguiendo el patrón ya probado en Galeria/Domos (leer de `src/lib/contenido.ts`, verificar "sin cambio visual" con build). Detalle completo en §#13. Luego Fases 2-5 (necesitan secretos, ver §#13).

**Stack:** Astro 5 · Tailwind v4 (@tailwindcss/vite) · GSAP + Lenis · Fontsource (Fraunces/Inter) · 100% estático (adapter Vercel llega en CMS Fase 2)
**Dev:** `npm run dev` · **Preview build:** `npm run build && npm run preview` · **Repo:** github.com/Kelvmdev/lumbre-landing
**⚠️ Antes de tocar código local:** cuando el CMS esté vivo, `git pull --no-rebase --no-edit` primero (el CMS edita el data.json en GitHub, tu copia local se desfasa — regla de oro tema 04). Por ahora el CMS no está vivo, el local manda.

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

### 🔴 EN PROGRESO — CMS full (Kervin lo quiere como pieza de portafolio, TODO editable)
13. **CMS propio** (tema 04) — un solo `data.json` + Contents API. Fases: (1) capa de datos + cablear páginas sin cambio visual · (2) `/admin` login cookie HMAC + `api/login` · (3) panel edición + `api/guardar` (GitHub Contents API) · (4) subida fotos Cloudinary · (5) probar ciclo real + blindaje guardado.
    - ✅ **Fase 1a (commit `6a6142a`)**: `src/data.json` (trackeado) + `src/lib/contenido.ts` (tipos + mapa `IMAGENES` clave→imagen local optimizada, puente a Cloudinary). Galería y Domos ya leen de ahí, sin cambio visual.
    - ⏳ **Fase 1b (ARRANCAR AQUÍ)**: cablear el resto de textos a `data.json`, sección por sección. **PATRÓN (ya probado en Domos/Galeria):** (a) añadir la sección a `src/data.json`; (b) añadir su `interface` a `Contenido` en `src/lib/contenido.ts`; (c) en el componente, reemplazar el texto/array hardcodeado por `import { contenido } from "../lib/contenido"` y leer `contenido.<seccion>`; (d) `npm run build` y verificar HTML idéntico (sin cambio visual). Imágenes → usar la clave + `IMAGENES[clave]`.
      **Componentes que faltan (cada uno = una mini-tanda):** `Hero.astro` (eyebrow, h1 con `<br>`+`<em>`, lede, labels CTAs) · `CieloTexto.astro` (h2 con `<br>`, párrafo) · `Experiencia.astro` (eyebrow, h2, features[] con icono SVG inline) · `Faq.astro` (array de preguntas/respuestas — OJO: alimenta también el schema FAQPage, mantener DRY) · `Mapa.astro` (eyebrow, h2 con `<br>`, texto; coords ya en enlaces.ts) · `Reserva.astro` (eyebrow, h2, texto, opciones domo del select) · `CTA.astro` (h2 con `<br>`, texto, label) · `Footer.astro` (tagline, textos) · `Nav.astro` (marca "LUMBRE", NAV ya en enlaces.ts) · **Layout.astro SEO** (titulo/descripcion default, name del JSON-LD LodgingBusiness). **Decisión pendiente:** ¿los datos de contacto (tel/email/redes/coords, hoy en `enlaces.ts`) se mueven también a `data.json` para editarlos por CMS? SÍ para "full CMS" — hacerlo en 1b o al final.
    - ⏳ **Fases 2-5 necesitan SECRETOS (Kervin los junta):** `ADMIN_PASSWORD` (elige él) · `SESSION_SECRET` (generar: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) · `GITHUB_TOKEN` (PAT classic, permiso `public_repo`) · `GITHUB_OWNER=Kelvmdev` · `GITHUB_REPO=lumbre-landing` · `GITHUB_BRANCH=main` · Cloudinary `cloud name` + `upload preset unsigned` (revisar si reusa `portafolio_unsigned` de otros proyectos). Todo en `.env.local` (gitignored) **Y** en Vercel. Fase 2 añade adapter `@astrojs/vercel` + `prerender=false` en `/admin` y `/api/*` (las páginas públicas siguen prerender). Auth = cookie HMAC firmada (tema 09, NO base64).

### ✅ PageSpeed "Navegación con agentes" 2/3 → ARREGLADO (8 jul, commit `f177d32`)
El check que fallaba era **"llms.txt no sigue las recomendaciones"**: el archivo no tenía vínculos Markdown (el estándar pide H1 + enlaces). Reescrito `public/llms.txt` con H1 + secciones con 6 enlaces (home/#domos/#reservar/#mapa/#faq/WhatsApp) + corregido el texto obsoleto "un solo domo"→tres. Desplegado y verificado (6 enlaces en vivo). FALTA que Kervin re-analice en pagespeed.web.dev para confirmar 3/3 (PageSpeed cachea).

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

<sub>actualizado 2026-07-08 · BLOQUES 🟢 y 🟡 COMPLETOS y desplegados (firma viva, Domos/Mapa/Reserva+CTAs, PageSpeed 97/100/100/100, llms.txt/agentes OK). AHORA: 🔴 #13 CMS full EN PROGRESO — Fase 1a hecha (commit `6a6142a`: data.json + contenido.ts + Galeria/Domos). PRÓXIMO = Fase 1b (cablear resto de textos), ver §#13 y el ⏭️ del encabezado. Último commit: `f177d32`.</sub>
