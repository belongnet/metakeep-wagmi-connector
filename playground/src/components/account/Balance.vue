<template>
  <div>
    {{ accountData?.formatted }}
    <button @click="() => accountRefetch()" class="button-small">
      refetch
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useAccount, useBalance } from 'use-wagmi'

const { address } = useAccount()
const { data: accountData, refetch: accountRefetch } = useBalance({
  address,
  watch: true,
})
</script>
