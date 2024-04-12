<script lang="ts" setup>
import { useChainId, useConnect, useConnections } from 'use-wagmi'
import { computed } from 'vue'

const chainId = useChainId()
const { connectors, connect, status, error } = useConnect()
const connections = useConnections()

const connectionIds = computed(() => {
  return connections.value.map((connection) => connection.connector.uid)
})
</script>

<template>
  <h2>Connect</h2>
  <button
    v-for="connector in connectors"
    :key="connector.uid"
    @click="() => connect({ connector, chainId })"
    type="button"
    :disabled="connectionIds.includes(connector.uid)"
  >
    {{ connector.name }}
  </button>
  <div>{{ status }}</div>
  <div>{{ error?.message }}</div>
</template>
