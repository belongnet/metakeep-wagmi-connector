import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import Inspect from 'vite-plugin-inspect'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
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
      externals: [
        '@web3modal/siwe',
        '@walletconnect/modal',
        '@metamask/sdk',
        '@coinbase/wallet-sdk',
      ],
    }),

    nodePolyfills(),
  ],

  resolve: {
    alias: {
      '@reslear/metakeep-wagmi-connector': resolve('../src/index.ts'),
      metakeep: resolve('../node_modules/metakeep/lib/index.js'),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          metakeep: ['metakeep'],
          '@reslear/metakeep-wagmi-connector': [
            '@reslear/metakeep-wagmi-connector',
          ],
          '@wagmi/connectors': ['@wagmi/connectors'],
          zod: ['zod'],
        },
      },
    },
  },
})
