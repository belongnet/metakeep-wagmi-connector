import type { MetaKeep, EthereumProvider } from 'metakeep'
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'
import type { Address } from 'viem'
import {
  ChainNotConfiguredError,
  ProviderNotFoundError,
  createConnector,
} from '@wagmi/core'
import type { Compute } from '@wagmi/core/internal'

export type MetaKeepParameters = Compute<
  Omit<ConstructorParameters<typeof MetaKeep>[0], 'user'> & {
    user?: { email: string }

    /**
     * Connect custom name
     *
     * @default 'MetaKeep'
     *
     * @example 'Connect with MetaKeep'
     */
    customName?: string
  }
>

export type MetaKeepProvider = EthereumProvider & {
  // private methods
  enable: () => Promise<string[]>
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  getUser: () => { email: string }
  setUser: (args: { email: string }) => void
}

const SESSION_TIMEOUT = 3 * 24 * 60 * 60 * 1000

export type StorageItem = {
  metakeep: {
    email: string
    accounts?: Address[]
    last?: string
  }
  store: {
    state: { chainId: number }
  }
  'wagmi.recentConnectorId': string
}

metaKeep.type = 'metakeep' as const

export function metaKeep(parameters: MetaKeepParameters) {
  type Provider = MetaKeepProvider
  type Properties = {
    setUser(args: { email: string }): Promise<void>
  }

  let provider_: Provider | undefined

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'metakeep',
    name: parameters.customName ?? 'MetaKeep',
    type: 'MetaKeep',

    async connect({ chainId } = {}) {
      try {
        const provider = await this.getProvider()
        if (!provider) throw new ProviderNotFoundError()

        let accounts = await this.getAccounts()

        if (!accounts.length) {
          accounts = (await provider.enable()).map((x) => getAddress(x))

          await config.storage?.setItem('metakeep', {
            email: provider.getUser().email,
            accounts: accounts as Address[],
            last: new Date().toISOString(),
          })
        }

        // Switch to chain if provided
        let currentChainId = await this.getChainId()

        if (chainId && currentChainId !== chainId) {
          const chain = await this.switchChain!({ chainId }).catch((error) => {
            if (error.code === UserRejectedRequestError.code) throw error
            return { id: currentChainId }
          })
          currentChainId = chain?.id ?? currentChainId
        }

        return { accounts, chainId: currentChainId }
      } catch (error: any) {
        if (error?.status === 'USER_REQUEST_DENIED') {
          throw new UserRejectedRequestError(error as Error)
        }

        throw error
      }
    },

    async disconnect() {
      provider_ = undefined
      await config.storage?.removeItem('metakeep')
      this.onDisconnect()
    },

    async getAccounts() {
      const provider = await this.getProvider()
      return provider.accounts.map((x) => getAddress(x))
    },

    async getChainId() {
      const provider = await this.getProvider()
      return Number(provider.chainId)
    },

    async getProvider({ chainId } = {}) {
      const session = await config.storage?.getItem('metakeep')
      const store = await config.storage?.getItem('store')

      const isRecentlyConnected =
        (await config.storage?.getItem('recentConnectorId')) === this.id

      if (!provider_) {
        const { MetaKeep } = await import('metakeep').then((m) =>
          m.MetaKeep ? m : m.default
        )

        const rpcNodeUrls = Object.fromEntries(
          config.chains.map((chain) => [
            chain.id,
            chain.rpcUrls.default.http[0]!,
          ])
        )

        const sdk = new MetaKeep({
          appId: parameters.appId,
          rpcNodeUrls: parameters.rpcNodeUrls ?? rpcNodeUrls,
          environment: parameters.environment,
          user: {
            email: session?.email ?? parameters.user?.email,
          },
          chainId: chainId ?? store?.state?.chainId ?? config.chains?.[0]?.id,
        })

        provider_ = (await sdk.ethereum) as MetaKeepProvider

        if (
          // Check if connector was recently connected
          isRecentlyConnected &&
          // Check if session exists
          session?.last &&
          session?.accounts?.length &&
          session?.email &&
          // Check if session is not expired
          Date.now() - Date.parse(session.last) < SESSION_TIMEOUT
        ) {
          provider_.accounts = session.accounts.map((x) => getAddress(x))
          provider_.connected = true
          provider_.setUser({
            email: session.email,
          })
        }
      }

      return provider_!
    },

    async isAuthorized() {
      const recentConnectorId =
        await config.storage?.getItem('recentConnectorId')

      if (recentConnectorId !== this.id) return false

      try {
        const accounts = await this.getAccounts()
        return !!accounts.length
      } catch {
        return false
      }
    },

    async switchChain({ chainId }) {
      const chain = config.chains.find((chain) => chain.id === chainId)
      if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

      const provider = await this.getProvider()
      const chainId_ = numberToHex(chain.id)

      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId_ }],
        })

        this.onChainChanged(chainId_)

        return chain
      } catch (error) {
        // Indicates chain is not added to provider
        if ((error as ProviderRpcError).code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: chainId_,
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: [chain.rpcUrls.default?.http[0] ?? ''],
                  blockExplorerUrls: [chain.blockExplorers?.default.url],
                },
              ],
            })

            this.onChainChanged(chainId_)

            return chain
          } catch (error) {
            throw new UserRejectedRequestError(error as Error)
          }
        }

        throw new SwitchChainError(error as Error)
      }
    },

    onAccountsChanged(accounts) {
      if (accounts.length === 0) this.onDisconnect()
      else
        config.emitter.emit('change', {
          accounts: accounts.map((x) => getAddress(x)),
        })
    },

    onChainChanged(chain) {
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },

    async onDisconnect(_error) {
      config.emitter.emit('disconnect')
    },

    async setUser({ email }: { email: string }) {
      const provider = await this.getProvider()
      const session = await config.storage?.getItem('metakeep')

      if (!provider) return

      provider.setUser({
        email,
      })

      await config.storage?.setItem('metakeep', {
        ...session,
        email,
      })
    },
  }))
}

export type MetaKeepConnector = ReturnType<ReturnType<typeof metaKeep>>
