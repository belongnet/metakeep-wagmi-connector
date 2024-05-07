import { StorageSerializers, useStorage } from '@vueuse/core'
import { SiweMessage } from 'simple-siwe'

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
