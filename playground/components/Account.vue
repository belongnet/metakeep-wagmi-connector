<script setup lang="ts">
import truncateEthAddress from 'truncate-eth-address'
import { useAccount, useDisconnect } from '@wagmi/vue'

const { address, chainId, status } = useAccount()
const { disconnect } = useDisconnect()
</script>

<template>
  <div v-if="address">
    <h2>Account</h2>

    <div>
      account: {{ truncateEthAddress(address as string) }}
      <br />
      chainId: {{ chainId }}
      <br />
      status: {{ status }}
    </div>

    <button
      v-if="status !== 'disconnected'"
      type="button"
      @click="() => disconnect()"
    >
      Disconnect
    </button>
  </div>
</template>
