import { mainnet, polygon } from '@wagmi/vue/chains'
import { createConfig, http } from '@wagmi/vue'
import { metaKeep } from '@belongnet/metakeep-wagmi-connector'
import { walletConnect } from '@wagmi/vue/connectors'

const { appId, projectId } = useSession()

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  // multiInjectedProviderDiscovery: false,
  connectors: [
    walletConnect({
      projectId: projectId.value,
    }),
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
