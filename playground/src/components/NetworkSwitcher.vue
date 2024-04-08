<template>
  <div v-if="chain">
    <h4>Network Switcher</h4>

    <div>{{ chain && chain.name }}</div>

    <br />

    <template v-for="x in chains" :key="x.id">
      <button
        :disabled="!supports || x.id === chain?.id"
        @click="() => switchNetwork(x.id)"
      >
        Switch to {{ x.name }}
        {{ status === 'loading' && x.id === pendingChainId ? '…' : '' }}
      </button>
      &nbsp;
    </template>

    <div v-if="error">{{ error?.message ?? 'Failed to switch' }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useNetwork, useSwitchNetwork } from 'use-wagmi'

const { chain } = useNetwork()
const { chains, error, pendingChainId, supports, switchNetwork, status } =
  useSwitchNetwork()
</script>
