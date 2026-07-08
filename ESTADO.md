# LUMBRE — landing cinematográfica: glamping bajo las estrellas

`estado: 🟡 construida — falta pase SEO/assets antes de publicar` · `en vivo: — (aún no desplegada)`

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

## Pendiente (siguiente = publicar)
1. **Deploy Vercel** (estático) e **inicializar git**.
2. Al tener dominio final: cambiarlo en `astro.config.mjs` Y `public/robots.txt`.
3. Medir **PageSpeed sobre la URL en vivo** (skill seo-pagespeed) y ajustar.

## Opcional / a decidir
- Foto destacada de galería (domo montaña, Pexels 33415953) es vertical y va recortada en la tarjeta ancha; alternativa: ponerla en tarjeta alta.
- Hero: sigue en SVG a propósito (parallax). Evaluar foto real solo si no rompe la firma.

## Gotchas
- Tailwind v4: NO usar `bg-x/opacidad` (genera `color-mix`, trampa manual-01) → usar hex de 8 dígitos o `rgba()` en `<style>`.
- El degradado tarde→noche lo hace el CSS (`body`), GSAP solo lo suaviza con Lenis; funciona sin JS.
- Preview reusa puerto: si 4321/2/3 ocupados, sube a 4324+.

<sub>actualizado 2026-07-07 · construida hoy con agentes maquetador (paralelo) + revisor-final · sin git aún</sub>
