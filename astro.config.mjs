// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// `site` = URL base del proyecto: pieza clave del SEO (canonical + og:image
// absolutos). Placeholder hasta desplegar en Vercel; cámbiala al dominio real.
const SITE = 'https://lumbre-landing.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Páginas públicas siguen estáticas (rápidas/cacheadas). Solo /admin y /api
  // opt-in a SSR con `export const prerender = false` (leen secretos, escriben a GitHub).
  adapter: vercel(),
  // El checkOrigin de Astro se confunde detrás del proxy de Vercel y bloquea
  // hasta el POST legítimo del form ("Cross-site POST forbidden"). Lo apagamos:
  // la cookie de sesión es SameSite=Lax, que ya da la protección CSRF real.
  security: { checkOrigin: false },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
