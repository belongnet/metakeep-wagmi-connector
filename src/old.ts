export class MetaKeepConnector extends Connector<
  MetaKeepProvider,
  MetaKeepOptions
> {
  readonly id = 'metakeep'
  readonly name = 'MetaKeep'
  readonly ready = true

  #provider?: MetaKeepProvider

  constructor(config: { chains?: Chain[]; options: MetaKeepOptions }) {
    super(config)
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    console.log('connect')
    try {
      const stringifiedUser = localStorage.getItem('metakeep-user')
      const isUserEmail = stringifiedUser
        ? JSON.parse(stringifiedUser)
        : undefined

      let provider = await this.getProvider()

      if (provider && provider.accounts.length === 0 && isUserEmail) {
        await this.disconnect(false)
        provider = await this.getProvider({ create: true, chainId })
      }

      if (!provider) await this.getProvider({ create: true, chainId })

      // provider.on('accountsChanged', this.onAccountsChanged)

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const accounts = await provider?.enable()
      const account = getAddress(accounts[0] as string)

      // Switch to chain if provided
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId)
        id = chain.id
        unsupported = this.isChainUnsupported(id)
      }

      // Save user email
      const user = provider.getUser()

      console.log(user)
      if (user) localStorage.setItem('metakeep-user', JSON.stringify(user))

      this.onAccountsChanged(accounts)

      return {
        account,
        chain: { id, unsupported },
      }
    } catch (error) {
      if (
        /(user closed modal|accounts received is empty)/i.test(
          (error as Error).message
        )
      )
        throw new UserRejectedRequestError(error as Error)
      throw error
    }
  }

  async getAccount(): Promise<Address> {
    const { accounts } = await this.getProvider()
    return getAddress(accounts[0])
  }

  // @ts-ignore
  async getProvider({ chainId, create } = { create: false }) {
    if (
      !this.#provider ||
      (chainId && numberToHex(chainId) !== numberToHex(this.#provider.chainId))
    ) {
      if (create || chainId || !this.#provider) {
        const rpc = this.chains.reduce(
          (rpc, chain) => ({
            ...rpc,
            [chain.id]: chain.rpcUrls.default.http[0],
          }),
          {}
        )

        const stringifiedUser = localStorage.getItem('metakeep-user')
        const user = stringifiedUser ? JSON.parse(stringifiedUser) : undefined

        const sdk = new MetaKeep({
          user: user ?? undefined,
          // @ts-ignore
          rpcNodeUrls: rpc,
          chainId: chainId ?? this.chains[0].id,
          appId: this.options.appId,
        })

        this.#provider = await sdk.ethereum

        if (user) {
          console.log('enable')
          // @ts-ignore
          const accounts = await this.#provider.enable()
          console.log('accounts', accounts)
          this.onAccountsChanged(accounts)
        }
      }
    }

    return this.#provider
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = normalizeChainId(provider.chainId)

    console.log('chainId', chainId)
    return chainId
  }

  async switchChain(chainId: number) {
    console.log(chainId)
    const provider = await this.getProvider()
    const id = numberToHex(chainId)

    const onChainChanged = () => {
      setTimeout(() => {
        this.onChainChanged(chainId)
      }, 100)
    }

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })

      const result = this.chains.find((x) => x.id === chainId) ?? {
        id: chainId,
        name: `Chain ${id}`,
        network: `${id}`,
        nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
        rpcUrls: { default: { http: [''] }, public: { http: [''] } },
      }

      onChainChanged()

      return result
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId)
      if (!chain)
        throw new ChainNotConfiguredForConnectorError({
          chainId,
          connectorId: this.id,
        })

      // Indicates chain is not added to provider
      if ((error as ProviderRpcError).code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.public?.http[0] ?? ''],
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
              },
            ],
          })

          onChainChanged()

          return chain
        } catch (error) {
          throw new UserRejectedRequestError(error as Error)
        }
      }

      throw new SwitchChainError(error as Error)
    }
  }

  async getWalletClient({
    chainId,
  }: { chainId?: number } = {}): Promise<WalletClient> {
    console.log('getWalletClient', { chainId })

    const [provider, account] = await Promise.all([
      // @ts-ignore
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    const chain = this.chains.find((x) => x.id === chainId)
    if (!provider) throw new Error('provider is required.')
    return createWalletClient({
      account,
      chain,
      transport: custom(provider),
    })
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async disconnect(removeLocalUser = true): Promise<void> {
    const provider = await this.getProvider()
    if (removeLocalUser) localStorage.removeItem('metakeep-user')

    setTimeout(() => this.onDisconnect(), 100)
    this.#provider = undefined
  }

  async getNonce(): Promise<any> {
    const provider = await this.getProvider()
    const account = await this.getAccount()
    return provider?.request({
      method: 'eth_getTransactionCount',
      params: [account, 'latest'],
    })
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }
}
