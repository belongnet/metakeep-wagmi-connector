import {
  generateSiweNonce,
  verifySiweMessage,
  parseSiweMessage,
  type SiweMessage,
} from 'viem/siwe'
import { useSession } from '../composables/use-session'
import { createClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import type { Hex } from 'viem'

export function useApi() {
  const { session } = useSession()

  async function getNonce() {
    const nonce = await Promise.resolve(generateSiweNonce())

    session.value = {
      nonce,
    }

    return { nonce }
  }

  async function getSession() {
    if (!session.value?.siwe) {
      throw new Error('Unauthorized')
    }

    const { address, chainId } = session.value.siwe

    return {
      address,
      chainId,
    }
  }

  async function signIn({
    message,
    signature,
  }: {
    message: string
    signature: Hex
  }) {
    try {
      const nonce = session.value?.nonce

      if (!nonce) throw new Error('Nonce not found')

      const client = createClient({ chain: mainnet, transport: http() })

      const isValid = await verifySiweMessage(client, {
        message,
        signature,

        //TODO: addition check nonce
        //nonce: session.value?.nonce,
      })

      if (!isValid) throw new Error('Failed to verify message!')

      const siwe = parseSiweMessage(message)!

      session.value = {
        nonce,
        siwe: siwe as SiweMessage,
      }

      return {
        isValid,
      }
    } catch (error) {
      // clean session
      session.value = null

      throw new Error('Failed to verify message!', {
        cause: error,
      })
    }
  }

  async function signOut() {
    session.value = null

    return true
  }

  return {
    session,
    getSession,
    getNonce,
    signIn,
    signOut,
  }
}
