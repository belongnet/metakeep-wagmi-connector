import { metaKeep } from '@belongnet/metakeep-wagmi-connector'
import { injected, walletConnect } from '@wagmi/vue/connectors'
import { mainnet, polygon, type AppKitNetwork } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { http } from 'viem'

const { appId, projectId } = useSession()

// TODO: move to store
// 2. Create a metadata object
export const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
}

// 3. Set the networks
export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [mainnet, polygon]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: projectId.value,
  connectors: [
    metaKeep({
      appId: appId.value,
      customName: 'Metakeep Connector',
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
})

declare module '@wagmi/vue' {
  interface Register {
    config: typeof wagmiAdapter.wagmiConfig
  }
}
