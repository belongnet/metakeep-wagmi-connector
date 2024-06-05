<script setup lang="ts">
const { appId: _appId, projectId: _projectId, defaults } = useSession()
const appId = ref(toValue(_appId))
const projectId = ref(toValue(_projectId))

function setAppId() {
  _appId.value = appId.value
  _projectId.value = projectId.value

  setTimeout(() => {
    window.location.reload()
  }, 10)
}

function setDefault() {
  appId.value = defaults.appId
  projectId.value = defaults.projectId
}
</script>

<template>
  <header>
    <h1 style="margin-bottom: 0">MetaKeep wagmi Playground</h1>
    <p style="margin: 0">with Web3modal and Siwe</p>
  </header>

  <main class="container">
    <template v-if="_appId && _projectId">
      <section>
        <h2>Wagmi</h2>
        <Connect />
      </section>
      <Account />
      <SwitchChain />
      <section>
        <h3>Sign Message</h3>
        <SignMessage />
      </section>
      <section>
        <h2>Web3Modal</h2>
        <Web3Modal />
      </section>
      <section>
        <h2>MetaKeep SDK</h2>
        <MetaKeepSdk />
      </section>
    </template>

    <section>
      <h2>Set keys</h2>
      <div>Metakeep appId: <input v-model="appId" /></div>

      <div>
        WalletConnect projectId:
        <input v-model="projectId" />
      </div>

      <a href class="link" @click.prevent="setDefault()">default</a>
      <button @click="() => setAppId()">Set</button>
    </section>
  </main>

  <footer>
    2024 &copy; by
    <a href="https://github.com/reslear" target="_blank">reslear</a>
  </footer>
</template>
