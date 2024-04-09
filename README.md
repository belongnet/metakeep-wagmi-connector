# metakeep-wagmi-connector

[![Version](https://img.shields.io/npm/v/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)
[![Downloads](https://img.shields.io/npm/dt/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)
[![License](https://img.shields.io/npm/l/@reslear/metakeep-wagmi-connector)](https://www.npmjs.com/package/@reslear/metakeep-wagmi-connector)

Connector for integrating [wagmi v1.x](https://1.x.wagmi.sh/) with the [MetaKeep.xyz](https://metakeep.xyz/) platform provided by PassbirdCo. 

## Installation

You can install **metakeep-wagmi-connector** using npm, yarn, or pnpm:


```bash
pnpm add @reslear/metakeep-wagmi-connector
```

Once installed, add metakeep-wagmi-connector to your wagmi configuration as a connector. Here's a sample configuration:

```ts
import { MetaKeepConnector } from '@reslear/metakeep-wagmi-connector';

const config = createConfig({
  // ...
  connectors: [
    new MetaKeepConnector({
      chains,
      options: {
        appId: import.meta.env.VITE_META_KEEP_APP_ID,
      },
    }),
  ],
})
```

Make sure to set the `appId` in your environment variables, for example in a `.env` file:


```env
VITE_META_KEEP_APP_ID=your-app-id
```

Enjoy!


## Links
- https://docs.metakeep.xyz/reference/web3-provider
- https://github.com/PassbirdCo

## License
This project is licensed under the terms of the [MIT license](LICENSE).
