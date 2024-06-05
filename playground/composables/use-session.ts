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

  const defaults = {
    appId: import.meta.env.VITE_META_KEEP_APP_ID,
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  }

  const appId = useStorage('meta-keep-app-id', defaults.appId)
  const projectId = useStorage('wc-project-id', defaults.projectId)

  return {
    defaults,
    appId,
    projectId,
    session,
  }
}
