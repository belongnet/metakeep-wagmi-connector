## Migration Guide

1. Follow the installation steps [Wagmi migrate from v1 to v2](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).
2. Update the `@belongnet/metakeep-wagmi-connector` to the latest version.
3. Update the connector configuration to use the new import

```diff

-import { MetaKeepConnector } from '@belongnet/metakeep-wagmi-connector';
+import { metaKeep } from '@belongnet/metakeep-wagmi-connector'
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
