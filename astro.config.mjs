// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://petterjohansson.se',

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },

  integrations: [
    svelte(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      name: 'Instrument Sans',
      cssVariable: '--font-instrument-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal', 'italic'],
    },
    {
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      provider: fontProviders.google(),
      weights: [400],
      styles: ['normal', 'italic'],
    },
    {
      name: 'Datatype',
      cssVariable: '--font-datatype',
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600, 700],
      fallbacks: ['monospace'],
    },
  ],
});