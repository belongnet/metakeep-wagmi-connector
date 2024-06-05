import { mainnet, polygon } from '@wagmi/vue/chains'
import { createConfig, http } from '@wagmi/vue'
import { metaKeep } from '@belongnet/metakeep-wagmi-connector'

const { appId } = useSession()

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
      appId: appId.value,
    }),
  ],
})

declare module '@wagmi/vue' {
  interface Register {
    config: typeof config
  }
}
