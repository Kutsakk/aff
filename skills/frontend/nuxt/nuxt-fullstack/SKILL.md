---
name: nuxt-fullstack
description: Nuxt SSR/SSG rendering modes, deployment strategies, and fullstack architecture. Use for fullstack Nuxt apps with server/ directory.
---

# Nuxt Fullstack Patterns

> **This skill is for fullstack Nuxt apps** that use `server/` (API routes, SSR). For client-only SPA or static sites, see `nuxt-core`.

For file-based routing and auto-imports see `nuxt-core`. For Nitro server routes see `nuxt-nitro`.

---

## Rendering & Deployment

| Mode | Config | Use Case |
|---|---|---|
| SSR | `ssr: true` | Dynamic content |
| SSG | `routeRules: { prerender }` | Static content |
| SPA | `ssr: false` | Client-only |
| Hybrid | `routeRules` per route | Mixed |

See `reference/rendering-deployment.md` for platform-specific deployment configs.

---

## Key Gotchas

- **Hydration mismatch**: SSR/client HTML differs → use `<ClientOnly>` for browser-only content
- **`server/utils/`** auto-imports only work in `server/` code, not `app/`
- **`useRuntimeConfig()`** returns public + private on server; only `public` on client
- **Route rules order**: more specific rules must come after generic ones

---

## Related Skills

- `nuxt-core` — Core conventions, routing, data fetching
- `nuxt-nitro` — Server routes, middleware, validation
- `nuxt-testing` — Testing components and API routes
