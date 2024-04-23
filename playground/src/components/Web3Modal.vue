<script setup lang="ts">
// https://github.com/WalletConnect/web3modal/blob/V4/examples/vue-wagmi/src/App.vue

import { useWeb3Modal } from '@web3modal/wagmi/vue'

const modal = useWeb3Modal()
</script>

<template>
  <div class="center">
    <h4>Web components</h4>
    <div>
      <w3m-button />
      <w3m-network-button />
    </div>

    <h4>Composition API</h4>
    <div>
      <button @click="modal.open()">Open Connect Modal</button>
      <button @click="modal.open({ view: 'Networks' })">
        Open Network Modal
      </button>
    </div>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>
