import { SiweMessage } from 'simple-siwe'
import { StorageSerializers, useStorage } from '@vueuse/core'

export function useSession() {
  const session = useStorage<{
    nonce?: string
    siwe?: SiweMessage
    message?: string
    signedMessage?: string
    email?: string
  } | null>('siwe-session', null, undefined, {
    mergeDefaults: true,
    deep: true,
    serializer: StorageSerializers.object,
  })

  return {
    session,
  }
}
