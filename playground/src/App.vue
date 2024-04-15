<script setup>
/**
 * Example from:
 * - https://github.com/unicape/use-wagmi/blob/main/playgrounds/vite-vue/src/App.vue
 */
import truncateEthAddress from 'truncate-eth-address'
import Connect from './components/Connect.vue'
import Account from './components/Account.vue'
import SwitchChain from './components/SwitchChain.vue'
import MetaKeepSdk from './components/MetaKeepSdk.vue'
import SignMessage from './components/account/SignMessage.vue'
import Web3Modal from './components/Web3Modal.vue'

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi'
import { useConfig } from 'use-wagmi'

const config = useConfig()

createWeb3Modal({
  wagmiConfig: config,
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
})
</script>

<template>
  <header>
    <h1>MetaKeep Playground</h1>
  </header>

  <main class="container">
    <h2>Wagmi</h2>
    <section>
      <Connect />
    </section>
    <Account />
    <SwitchChain />
    <SignMessage />
    <MetaKeepSdk />
    <h2>Web3Modal</h2>
    <Web3Modal />
  </main>

  <footer>2024</footer>
</template>
