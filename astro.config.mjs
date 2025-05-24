// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";
import { esES } from "@clerk/localizations";

import db from "@astrojs/db";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({ localization: esES }), db(), react()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    allowedHosts: [".trycloudflare.com"],
  },
  output: "server",
});
