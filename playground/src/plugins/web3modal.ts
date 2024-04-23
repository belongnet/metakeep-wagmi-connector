import type { Plugin } from 'vue'

import { initWeb3Modal } from '../web3modal'

// plugins/i18n.js
export const Web3modalPlugin: Plugin = {
  install: (app, options) => {
    const { config } = options
    const { web3modal } = initWeb3Modal({ config })

    app.provide('web3modal', web3modal)
  },
}
