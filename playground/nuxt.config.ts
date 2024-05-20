import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@wagmi/vue/nuxt'],
  devtools: { enabled: true },
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
})
