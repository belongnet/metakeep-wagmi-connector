import type { SiweMessage } from 'viem/siwe'
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

  const appId = useStorage(
    'meta-keep-app-id',
    (import.meta.env.VITE_META_KEEP_APP_ID as string) || '',
    undefined,
    {
      mergeDefaults: true,
    }
  )

  return {
    appId,
    session,
  }
}
