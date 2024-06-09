import { createSIWEConfig, formatMessage } from '@web3modal/siwe'
import type { SIWECreateMessageArgs } from '@web3modal/siwe'
import { createWeb3Modal, useWalletInfo } from '@web3modal/wagmi/vue'
import { useApi } from '../services/api'
import type { Config } from '@wagmi/core'
import type { Hex } from 'viem'
import { useAccount } from '@wagmi/vue'

export function initWeb3Modal({ config }: { config: Config }) {
  const api = useApi()
  const { session, projectId } = useSession()

  const { connector } = useAccount()

  async function signIn() {
    // backend call to sign in

    console.log('web3modal SIWE: signing in')
    return true
  }

  /* Create a SIWE configuration object */
  const siweConfig = createSIWEConfig({
    getMessageParams: async () => ({
      domain: window.location.host,
      uri: window.location.origin,
      chains: config.chains.map((chain) => chain.id),
      statement: 'Please sign with your account',
      iat: new Date().toISOString(),
    }),
    createMessage: ({ address, ...args }: SIWECreateMessageArgs) =>
      formatMessage(args, address),

    getNonce: async (address) => {
      console.log('web3modal SIWE: getting nonce', { address })

      //Backend call to get nonce
      const { nonce } = await api.getNonce()

      return nonce
    },
    getSession: async () => {
      console.log('web3modal SIWE: getting session')

      try {
        const { address, chainId } = await api.getSession()
        return { address, chainId }
      } catch (error) {
        throw new Error('Failed to get session!', {
          cause: error,
        })
      }
    },
    verifyMessage: async ({ message, signature }) => {
      console.log('web3modal SIWE: verifying message', { message, signature })

      if (connector.value) {
        const { id, type, name } = connector.value
        console.log({ id, type, name })
      }

      try {
        const { isValid } = await api.signIn({
          message,
          signature: signature as Hex,
        })
        return isValid
      } catch (error) {
        console.log(error)
        return false
      }
    },
    signOut: async () => {
      console.log('web3modal SIWE: signing out')

      await api.signOut()
      return true
    },
  })

  const web3modal = projectId.value
    ? createWeb3Modal({
        wagmiConfig: config,
        projectId: projectId.value,
        enableAnalytics: true, // Optional - defaults to your Cloud configuration
        enableOnramp: true, // Optional - false as default
        siweConfig,
      })
    : null

  return {
    web3modal,
  }
}
