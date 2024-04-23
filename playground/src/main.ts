import { createApp } from 'vue'
import { http, createConfig, UseWagmiPlugin } from 'use-wagmi'
import { mainnet, polygon } from 'use-wagmi/chains'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { metaKeep } from '@reslear/metakeep-wagmi-connector'
import { Web3modalPlugin } from './plugins/web3modal.js'

import './style.css'
import App from './App.vue'

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  // multiInjectedProviderDiscovery: false,
  connectors: [
    // walletConnect({
    //   projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    // }),
    metaKeep({
      appId: import.meta.env.VITE_META_KEEP_APP_ID,
    }),
  ],
})

const app = createApp(App)

app.use(VueQueryPlugin, {})
app.use(UseWagmiPlugin, { config })
app.use(Web3modalPlugin, { config })

app.mount('#app')

declare module 'use-wagmi' {
  interface Register {
    config: typeof config
  }
}
