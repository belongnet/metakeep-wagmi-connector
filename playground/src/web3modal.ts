import { createSIWEConfig } from '@web3modal/siwe'
import type {
  SIWECreateMessageArgs,
  SIWESession,
  SIWEVerifyMessageArgs,
} from '@web3modal/siwe'
import { createWeb3Modal } from '@web3modal/wagmi'
import { useConfig } from 'use-wagmi'
import { provide } from 'vue'
import { prepareMessage, verify, generateNonce } from 'simple-siwe'

export function initWeb3Modal() {
  const config = useConfig()

  async function getNonce(address?: string) {
    // backend call to get nonce
    return Promise.resolve(generateNonce() as string)
  }

  async function signOut() {
    // backend call to sign out

    console.log('web3modal SIWE: signing out')
    return true
  }

  /* Function that creates a SIWE message */
  function createMessage({ nonce, address, chainId }: SIWECreateMessageArgs) {
    return prepareMessage({
      version: '1',
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: 'Sign in With Ethereum.',
    })
  }

  /* Function that returns the user's session */
  async function getSession(): Promise<SIWESession | null> {
    const session = {
      address: '0x1234567890',
      chainId: 1,
    } //await getSession()

    if (!session) throw new Error('Failed to get session!')

    const { address, chainId } = session as unknown as SIWESession

    return { address, chainId }

    return null
  }

  /* Use your SIWE server to verify if the message and the signature are valid */
  async function verifyMessage({ message, signature }: SIWEVerifyMessageArgs) {
    try {
      console.log({ message, signature })

      // backend call to verify message
      const isValid = await verify({ message, signature })

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
    signOut,
  })

  const web3modal = createWeb3Modal({
    wagmiConfig: config,
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
    siweConfig,
  })

  provide('web3modal', web3modal)
}
