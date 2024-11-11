import {
  type SIWECreateMessageArgs,
  createSIWEConfig,
  formatMessage,
} from '@reown/appkit-siwe'
import { useApi } from '../services/api'
import type { Hex } from 'viem'
import { useAccount } from '@wagmi/vue'
import { createAppKit } from '@reown/appkit/vue'
import { wagmiAdapter, networks, metadata } from '~/config/wagmi'

export default defineNuxtPlugin((nuxtApp) => {
  const api = useApi()
  const { session, projectId } = useSession()
  const { connector } = useAccount()

  async function signIn() {
    // backend call to sign i
    console.log('web3modal SIWE: signing in')
    return true
  }

  /* Create a SIWE configuration object */
  const siweConfig = createSIWEConfig({
    getMessageParams: async () => ({
      domain: window.location.host,
      uri: window.location.origin,
      chains: networks.map((chain) => chain.id as number),
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

  const appKit = projectId.value
    ? createAppKit({
        adapters: [wagmiAdapter],
        networks,
        projectId: projectId.value,
        metadata,
        features: {
          analytics: true,
          email: false,
          socials: false,
        },
        siweConfig,
      })
    : null

  nuxtApp.vueApp.provide('appKit', appKit)
})
