// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// `site` = URL base del proyecto: pieza clave del SEO (canonical + og:image
// absolutos). Placeholder hasta desplegar en Vercel; cámbiala al dominio real.
const SITE = 'https://lumbre-landing.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Landing 100% estática (rápida y cacheable): sin adapter, sin SSR.
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
