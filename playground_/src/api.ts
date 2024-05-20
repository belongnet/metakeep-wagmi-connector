import { generateNonce, parseMessage, verify } from 'simple-siwe'
import { useSession } from './use-session'

export function useApi() {
  const { session } = useSession()

  async function getNonce() {
    const nonce = await Promise.resolve(generateNonce())

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

  async function verifyMessage({
    message,
    signature,
  }: {
    message: string
    signature: string
  }) {
    try {
      const nonce = session.value?.nonce

      if (!nonce) throw new Error('Nonce not found')

      const isValid = await verify({
        message,
        signature,

        //TODO: addition check nonce
        //nonce: session.value?.nonce,
      })

      if (!isValid) throw new Error('Failed to verify message!')

      session.value = {
        nonce,
        siwe: parseMessage(message),
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

  return {
    session,
    getSession,
    getNonce,
    verifyMessage,
  }
}
