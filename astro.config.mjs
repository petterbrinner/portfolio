// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte()],

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