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
</script>

<template>
  <Connect />
  <Account />
  <SwitchChain />

  <SignMessage />
  <hr />

  <MetaKeepSdk />
</template>
