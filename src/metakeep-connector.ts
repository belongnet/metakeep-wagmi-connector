import type { MetaKeep } from 'metakeep'
import {
  Address,
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  getAddress,
  numberToHex,
} from 'viem'
import {
  ChainNotConfiguredError,
  ProviderNotFoundError,
  createConnector,
} from '@wagmi/core'

type MetaKeepParameters = ConstructorParameters<typeof MetaKeep>[0]

type MetaKeepProvider = {
  chainId: number
  accounts: string[]
  enable: () => Promise<string[]>
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
  getUser: () => { email: string }
  setUser: (email: string) => void
}

export function metakeep(parameters: MetaKeepParameters) {
  type Provider = MetaKeepProvider
  type Properties = {}
  type StorageItem = {
    'metakeep-user': string
    store: {
      state: { chainId: number }
    }
  }

  let provider_: Provider | undefined

  return createConnector<Provider, Properties, StorageItem>((config) => ({
    id: 'metakeep',
    name: 'MetaKeep',
    type: 'MetaKeep',

    async connect({ chainId } = {}) {
      const provider = await this.getProvider()
      if (!provider) throw new ProviderNotFoundError()

      const accounts = (await provider?.enable()) as Address[]

      // const user = await config.storage?.getItem('metakeep-user')

      const user = provider.getUser()
      await config.storage?.setItem('metakeep-user', user.email)

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
    },

    async disconnect() {
      provider_ = undefined
      await config.storage?.removeItem('metakeep-user')
      this.onDisconnect()
    },

    async getAccounts() {
      const provider = await this.getProvider()
      return provider.accounts as Address[]
    },

    async getChainId() {
      const provider = await this.getProvider()
      const chainId = provider.chainId

      console.log('chainId', chainId, Number(chainId))

      return Number(chainId)
    },

    async getProvider({ chainId } = {}) {
      const user = await config.storage?.getItem('metakeep-user')
      const store = await config.storage?.getItem('store')

      if (!provider_) {
        const { MetaKeep } = await import('metakeep')

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
          user: user ?? parameters.user,
          chainId: chainId ?? store?.state?.chainId ?? config.chains?.[0]?.id,
        })

        provider_ = (await sdk.ethereum) as MetaKeepProvider
      }

      return provider_!
    },

    async isAuthorized() {
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
      console.log('onChainChanged', chain)
      const chainId = Number(chain)
      config.emitter.emit('change', { chainId })
    },

    async onDisconnect(_error) {
      config.emitter.emit('disconnect')
    },
  }))
}
