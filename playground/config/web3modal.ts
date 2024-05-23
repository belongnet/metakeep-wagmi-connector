import { createSIWEConfig } from '@web3modal/siwe'
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from '@web3modal/siwe'
import { createWeb3Modal } from '@web3modal/wagmi/vue'
import { prepareMessage } from 'simple-siwe'
import { useApi } from '../services/api'
import type { Config } from '@wagmi/core'

export function initWeb3Modal({ config }: { config: Config }) {
  const api = useApi()

  async function getNonce(address?: string) {
    console.log('web3modal SIWE: getting nonce', { address })

    //Backend call to get nonce
    const { nonce } = await api.getNonce()

    return nonce
  }

  /* Function that creates a SIWE message */
  function createMessage({ nonce, address, chainId }: SIWECreateMessageArgs) {
    const message = prepareMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: 'Sign in With Ethereum.',
    })

    console.log('web3modal SIWE: created message', {
      nonce,
      address,
      chainId,
      message,
    })

    return message
  }

  /* Function that returns the user's session */
  async function getSession(): Promise<SIWESession | null> {
    console.log('web3modal SIWE: getting session')

    try {
      const session = await api.getSession()
      return session
    } catch (error) {
      throw new Error('Failed to get session!', {
        cause: error,
      })
    }
  }

  /* Use your SIWE server to verify if the message and the signature are valid */
  async function verifyMessage({ message, signature }: SIWEVerifyMessageArgs) {
    console.log('web3modal SIWE: verifying message', { message, signature })

    try {
      const { isValid } = await api.verifyMessage({ message, signature })
      return isValid
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function signIn() {
    // backend call to sign in

    console.log('web3modal SIWE: signing in')
    return true
  }

  /* Create a SIWE configuration object */
  const siweConfig = createSIWEConfig({
    createMessage,
    getNonce,
    getSession,
    verifyMessage,
    signOut: async () => true,
  })

  const web3modal = createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    siweConfig,
  })

  return {
    web3modal,
  }
}
