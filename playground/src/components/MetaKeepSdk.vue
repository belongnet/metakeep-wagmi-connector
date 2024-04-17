<script setup lang="ts">
import { useAccount } from 'use-wagmi'
import type { MetaKeepProvider } from '@reslear/metakeep-wagmi-connector'
import { ref } from 'vue'

const { connector } = useAccount()

const email = ref('example@mail.com')

async function setMetakeepNativeUser() {
  console.log(connector)
  // get current metakeep provider
  if (connector.value?.id !== 'metakeep') return
  const provider = <MetaKeepProvider>await connector.value?.getProvider()

  const user = provider.getUser()

  console.log(user)

  // call native methods
  provider.setUser({ email: email.value })

  provider.connected = false

  console.log(provider)

  const result = await provider.enable()

  console.log(result)
}
</script>

<template>
  <input type="email" v-model="email" placeholder="Email Address..." />
  <button @click="setMetakeepNativeUser()">Set Native User Email</button>
</template>
