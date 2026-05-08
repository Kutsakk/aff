---
name: nuxt-nitro
description: Nitro server routes, middleware, validation, and config for Nuxt server-side code.
---

# Nuxt / Nitro Server Patterns

Nitro is the server engine powering Nuxt. Use when working with `server/api/`, `server/routes/`, `server/middleware/`, or `server/utils/`.

---

## Server Routes

```typescript
// server/api/users/index.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  return { users: [] }
})

// server/api/users/[id].get.ts
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const user = await findUser(id)
  if (!user) throw createError({ statusCode: 404, statusMessage: 'Not found' })
  return user
})
```

See `reference/validation-patterns.md` for input validation with Zod.

---

## Server Middleware & Utilities

```typescript
// server/middleware/auth.ts — runs on every request
export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/admin') && !getHeader(event, 'authorization')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
})

// server/utils/auth.ts — auto-imported in all server/ files
import type { H3Event } from 'h3'

export async function requireAuth(event: H3Event) {
  const session = await getUserSession(event)
  if (!session?.user) throw createError({ statusCode: 401 })
  return session.user
}
```

---

## Nitro Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: '',             // server-only
    public: { apiBase: '' },   // client + server
  },
  nitro: {
    preset: 'node-server',
    routeRules: {
      '/api/**': { cors: true },
      '/api/public/**': { cache: { maxAge: 60 } },
    },
  },
})
```

---

## Key Gotchas

- **File naming = HTTP method**: `index.get.ts`, `index.post.ts`, `[id].patch.ts`, `[id].delete.ts`
- **Auto-imported**: `defineEventHandler`, `createError`, `getQuery`, `readBody`, `getRouterParam`
- **`server/utils/`** auto-imported in all server code
- **`server/middleware/`** runs on every request (no file-based filtering)
- **Runtime config**: use `useRuntimeConfig()`, not `process.env` directly
