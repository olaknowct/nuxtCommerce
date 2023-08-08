import { resolve } from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  // alias: {
  //   '@': resolve(__dirname, '/'),
  // },
  modules: [
    // ...
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
});
