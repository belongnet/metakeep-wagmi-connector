import type { Plugin } from 'vue'

import { initWeb3Modal } from '../../playground_/src/web3modal'

export const Web3modalPlugin: Plugin = {
  install: (app, options) => {
    const { config } = options
    const { web3modal } = initWeb3Modal({ config })

    app.provide('web3modal', web3modal)
  },
}
