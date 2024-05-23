<script lang="ts" setup>
import { useSignMessage } from '@wagmi/vue'
const { data, signMessageAsync } = useSignMessage()

const { session } = useSession()

async function onSubmit(event: Event) {
  event.preventDefault()
  const formData = new FormData(event.target as HTMLFormElement)

  const message = formData.get('message') as string

  const signedMessage = await signMessageAsync({ message })

  session.value = {
    ...session.value,
    message: message,
    signedMessage,
  }
}
</script>

<template>
  <form @submit="onSubmit">
    <input name="message" :value="session?.message || ''" />
    <button type="submit">Sign Message</button>
  </form>

  <pre>{{ data || session?.signedMessage }}</pre>
</template>

<style scoped>
pre {
  white-space: pre-wrap;
}
</style>
