import { MetaKeep as _MetaKeep } from 'metakeep'

export declare class MetaKeep extends _MetaKeep {
  getUser(): { email: string }
  internalOptions: Record<string, any>
  loginUser(email: string): void
  prefetch(): Promise<void>
  setUser(email: string): void
  user: { email: string }
  get ethereum(): Promise<{
    accounts: string[]
    chainId: number
    connected: boolean
    getUser(): { email: string }
    loginUser(email: string): void
    rpcNodeUrl: string
    rpcNodeUrls: Record<number, string>
    setUser(email: string): void
    signMessage(message: string): Promise<string>
    signTransaction(transaction: Record<string, any>): Promise<string>
    signTypedData(typedData: Record<string, any>): Promise<string>
  }>
}

export type MetaKeepParameters = ConstructorParameters<typeof MetaKeep>[0]
