import { VueQueryPlugin } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#imports'
import { queryClient } from '../config/query'

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueQueryPlugin, {
    queryClient,
    enableDevtoolsV6Plugin: true,
  })
})
