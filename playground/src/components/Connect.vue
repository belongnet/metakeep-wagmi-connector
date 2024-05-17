<script lang="ts" setup>
import { Connector, useChainId, useConnect, useConnections } from '@wagmi/vue'
import { computed } from 'vue'
import { useSession } from '../use-session'
import type { MetaKeepConnector } from '@belongnet/metakeep-wagmi-connector'

const { session } = useSession()

const metakeepEmail = computed({
  get: () => session.value?.email || '',
  set: (value) => {
    session.value = {
      ...session.value,
      email: value,
    }
  },
})

const chainId = useChainId()
const { connectors, connect, status, error } = useConnect()
const connections = useConnections()

const connectionIds = computed(() => {
  return connections.value.map((connection) => connection.connector.uid)
})

async function setMetakeepEmail() {
  const metakeepConnector = connectors.value.find(
    (connector) => connector.id === 'metakeep'
  ) as (Connector & MetaKeepConnector) | undefined

  if (!metakeepConnector) return

  await metakeepConnector.setUser({
    email: metakeepEmail.value,
  })
}
</script>

<template>
  <h2>Connect</h2>

  <div>
    Set metakeep email before: <input type="text" v-model="metakeepEmail" />
    <button @click="setMetakeepEmail()">Set</button>
  </div>

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
