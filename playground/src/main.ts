import { createApp } from 'vue'
import { UseWagmiPlugin, createConfig } from 'use-wagmi'
import { configureChains } from '@wagmi/core'
import { publicProvider } from 'use-wagmi/providers/public'
import { mainnet, polygon } from 'use-wagmi/chains'
import { InjectedConnector } from 'use-wagmi/connectors/injected'
import { CoinbaseWalletConnector } from '@wagmi/connectors/coinbaseWallet'
import { MetaKeepConnector } from '@reslear/metakeep-wagmi-connector'

import './style.css'
import App from './App.vue'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'use-wagmi',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: (detectedName) =>
          `Injected (${
            typeof detectedName === 'string'
              ? detectedName
              : detectedName.join(', ')
          })`,
        shimDisconnect: true,
      },
    }),
    new MetaKeepConnector({
      chains,
      options: {
        appId: import.meta.env.VITE_META_KEEP_APP_ID,
      },
    }),
  ],
})

const app = createApp(App)

app.use(UseWagmiPlugin, config)

app.mount('#app')
