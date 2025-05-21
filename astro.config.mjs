// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations"

import db from '@astrojs/db';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({ localization: esES }), db(), react()],
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    allowedHosts: [
      ".trycloudflare.com"
    ]
  },
  output: "server",
});