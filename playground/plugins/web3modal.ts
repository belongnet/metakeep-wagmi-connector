import { initWeb3Modal } from '../config/web3modal'
import { config } from '../config/wagmi'

export default defineNuxtPlugin((nuxtApp) => {
  const { web3modal } = initWeb3Modal({ config })
  nuxtApp.vueApp.provide('web3modal', web3modal)
})
