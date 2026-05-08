---
title: Rendering Modes and Deployment Targets
impact: MEDIUM
type: reference
tags: [nuxt, ssr, ssg, deployment, cloudflare, vercel, netlify, docker]
---

# Rendering Modes & Deployment

## Hybrid Rendering with Route Rules

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/':          { prerender: true },           // SSG — built at build time
    '/blog/**':   { isr: 3600 },                 // ISR — revalidate every hour
    '/admin/**':  { ssr: false },                 // SPA — client-only
    '/api/**':    { cors: true, cache: false },   // SSR — no cache
  },
})
```

## Deployment Targets

| Platform | Preset | Notes |
|---|---|---|
| Vercel | `vercel` | Zero-config, auto-detected |
| Netlify | `netlify` | Add `netlify.toml` for redirects |
| Cloudflare Pages | `cloudflare-pages` | Add `wrangler.toml` |
| Node.js (Docker) | `node-server` | Use `Dockerfile` with `node .output/server/index.mjs` |
| AWS Lambda | `aws-lambda` | Via serverless framework |

```typescript
// nuxt.config.ts — explicit preset
export default defineNuxtConfig({
  nitro: { preset: 'node-server' },
})
```

## Docker Example

```dockerfile
FROM node:20-slim AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY --from=build /app/.output .output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

## `<ClientOnly>` for Hydration Safety

```vue
<template>
  <!-- Browser-only content (charts, maps, localStorage UI) -->
  <ClientOnly>
    <MyChart :data="chartData" />
    <template #fallback>
      <USkeleton class="h-64" />
    </template>
  </ClientOnly>
</template>
```
