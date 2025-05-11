// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations"

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({ localization: esES }), db()],
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
});