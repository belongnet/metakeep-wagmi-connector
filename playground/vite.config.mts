import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import externalize from 'vite-plugin-externalize-dependencies'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    }),
    Inspect(),

    // https://github.com/WalletConnect/web3modal/issues/2159
    externalize({
      externals: ['@wagmi/connectors'],
    }),
  ],
  resolve: {
    alias: {
      '@reslear/metakeep-wagmi-connector': resolve('../src/index.ts'),
      metakeep: resolve('../node_modules/metakeep/lib/index.js'),
    },
  },
})
