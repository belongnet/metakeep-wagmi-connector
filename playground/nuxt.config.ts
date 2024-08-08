import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@wagmi/vue/nuxt'],
  devtools: { enabled: true },
  css: ['assets/style.css'],

  app: {
    head: {
      title: 'Metakeep connector',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@belongnet/metakeep-wagmi-connector': resolve('../src/index.ts'),
      },
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.includes('-'),
    },
  },

  compatibilityDate: '2024-08-08',
})