import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { Web3modalPlugin } from '../../playground/plugins/web3modal.js'
import { queryClient } from './config/query.js'
import { config } from './config/wagmi.js'
import { WagmiPlugin } from '@wagmi/vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(VueQueryPlugin, {
  queryClient,
})
app.use(WagmiPlugin, { config })
app.use(Web3modalPlugin, { config })

app.mount('#app')
