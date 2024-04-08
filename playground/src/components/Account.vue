<script setup lang="ts">
import { Address, useAccount, useDisconnect } from 'use-wagmi'
import truncateEthAddress from 'truncate-eth-address'
import { computed } from 'vue'
import Balance from './account/Balance.vue'
import SignMessage from './account/SignMessage.vue'

const { address, connector } = useAccount({
  onConnect: (data) => console.log('connected', data),
  onDisconnect: () => console.log('disconnected'),
})

const displayAddress = computed(
  () => address.value && truncateEthAddress(address.value as Address)
)

const { disconnect } = useDisconnect()
</script>

<template>
  <div v-if="address">
    <br />

    <div>
      <span>{{ displayAddress }}</span>
    </div>

    <br />

    <div>
      <button v-if="address" @click="() => disconnect()">Disconnect</button>

      <br />
      <br />
      <span v-if="connector?.name">Connected to {{ connector.name }}</span>
    </div>

    <h4>Balance</h4>
    <Balance />

    <h4>Sign Message</h4>
    <SignMessage />
  </div>
</template>
