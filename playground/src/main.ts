import { createApp } from 'vue'
import { http, createConfig, UseWagmiPlugin } from 'use-wagmi'
import { mainnet, polygon } from 'use-wagmi/chains'
import { injected, walletConnect } from 'use-wagmi/connectors'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { metaKeep } from '@reslear/metakeep-wagmi-connector'

import './style.css'
import App from './App.vue'

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors: [
    // walletConnect({
    //   projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    // }),
    injected(),
    metaKeep({
      appId: import.meta.env.VITE_META_KEEP_APP_ID,
    }),
  ],
})

const app = createApp(App)

app.use(VueQueryPlugin)
app.use(UseWagmiPlugin, { config })
app.mount('#app')

declare module 'use-wagmi' {
  interface Register {
    config: typeof config
  }
}
