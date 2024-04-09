# metakeep-wagmi-connector

[![Version](https://img.shields.io/npm/v/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)
[![Downloads](https://img.shields.io/npm/dt/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)
[![License](https://img.shields.io/npm/l/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)

Connector for integrating [wagmi v2.x](https://wagmi.sh/) with the [MetaKeep.xyz](https://metakeep.xyz/) platform provided by PassbirdCo. 

## Installation

You can install **metakeep-wagmi-connector** using npm, yarn, or pnpm:


```bash
pnpm add @reslear/metakeep-wagmi-connector
```

Once installed, add **metakeep** to your wagmi configuration as a connector. Here's a sample configuration:

```ts
import { metaKeep } from '@reslear/metakeep-wagmi-connector';

const config = createConfig({
  // ...
  connectors: [
    metaKeep({
      appId: import.meta.env.VITE_META_KEEP_APP_ID,
    }),
  ],
})
```

Make sure to set the `appId` in your environment variables, for example in a `.env` file:


```env
VITE_META_KEEP_APP_ID=your-app-id
```

Enjoy!

## Migration Guide


1. Follow the installation steps [Wagmi migrate from v1 to v2](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).
2. Update the `@reslear/metakeep-wagmi-connector` to the latest version.
3. Update the connector configuration to use the new import

```diff

-import { MetaKeepConnector } from '@reslear/metakeep-wagmi-connector';
+import { metaKeep } from '@reslear/metakeep-wagmi-connector'
```

4. Update the connector configuration to use the new import

```diff
  connectors: [
-    new MetaKeepConnector({
-     chains,
-      options: {
-        appId: import.meta.env.VITE_META_KEEP_APP_ID,
-      },
-    }),
+   metaKeep({
+     appId: import.meta.env.VITE_META_KEEP_APP_ID,
+   }),
  ],
```

Also connector for Wagmi v1 docs are still available at [0.x branch](https://github.com/reslear/metakeep-wagmi-connector/tree/0.x)


## Links
- https://docs.metakeep.xyz/reference/web3-provider
- https://github.com/PassbirdCo

## License
This project is licensed under the terms of the [MIT license](LICENSE).
