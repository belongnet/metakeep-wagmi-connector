<script setup>
import { useAccount, useConnect, useDisconnect } from 'use-wagmi'
import { InjectedConnector } from 'use-wagmi/connectors/injected'
import truncateEthAddress from 'truncate-eth-address'
import Connect from './components/Connect.vue'
import Account from './components/Account.vue'
import NetworkSwitcher from './components/NetworkSwitcher.vue'

const { address, isConnected } = useAccount()
const { connect } = useConnect({
  connector: new InjectedConnector(),
})
const { disconnect } = useDisconnect()
</script>

<template>
  <Connect />
  <Account />
  <NetworkSwitcher />
</template>
