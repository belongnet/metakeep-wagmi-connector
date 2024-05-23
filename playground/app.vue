<template>
  <header>
    <h1 style="margin-bottom: 0">MetaKeep wagmi Playground</h1>
    <p style="margin: 0">with Web3modal and Siwe</p>
  </header>

  <main class="container">
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
  </main>

  <footer>
    2024 &copy; by
    <a href="https://github.com/reslear" target="_blank">reslear</a>
  </footer>
</template>
