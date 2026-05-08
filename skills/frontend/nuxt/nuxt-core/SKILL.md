---
name: nuxt-core
description: Core Nuxt development — auto-imports, file-based conventions, CLI, component/TypeScript conventions. Use when working in any Nuxt project.
---

# Nuxt Core

Specialized guidance for Nuxt v4 applications. For server routes see `nuxt-nitro`, for UI components see `nuxt-ui`.

## When to Use

- Working in a project with `nuxt` in `package.json`
- Creating/editing `.vue` components or `.ts` files in Nuxt directories
- Questions about Nuxt architecture, routing, SSR/SSG

## Documentation

Fetch up-to-date docs when uncertain: `https://nuxt.com/llms.txt`

---

## Auto-Imported APIs (No Import Needed)

**Vue:** `ref`, `reactive`, `computed`, `watch`, `onMounted`, `defineProps`, `defineEmits`, `defineModel`

**Nuxt:** `useState`, `useFetch`, `useAsyncData`, `useRoute`, `useRouter`, `navigateTo`, `useCookie`, `useHead`, `useSeoMeta`, `useRuntimeConfig`, `showError`, `clearError`, `useRequestFetch`, `useRequestHeaders`, `useRequestEvent`

> `useLazyFetch` and `useLazyAsyncData` are deprecated. Use `useFetch('/url', { lazy: true })` instead.

**Auto-imports:** Components from `components/`, composables from `composables/`, server utils from `server/utils/`

---

## File-Based Conventions

| File path | Maps to |
|---|---|
| `pages/index.vue` | `/` |
| `pages/users/[id].vue` | `/users/:id` |
| `server/api/users.get.ts` | `GET /api/users` |
| `server/api/users.post.ts` | `POST /api/users` |
| `middleware/auth.ts` | Named middleware (`definePageMeta({ middleware: 'auth' })`) |
| `middleware/analytics.global.ts` | Global middleware (every route) |

---

## CLI Commands

```bash
nuxt dev          # Dev server
nuxt build        # Production build
nuxt generate     # Static site generation
nuxt preview      # Preview production build
nuxt typecheck    # Type checking
nuxt analyze      # Bundle analysis
```

---

## Important Conventions

### Component Files

- Use `<script setup lang="ts">` syntax
- Script → Template → Style order
- Type-based `defineProps()`, `defineEmits()`, `defineModel()`
- Multi-word component names (except pages/layouts)
- Prefer `ref()` over `reactive()`

### TypeScript

- Types in `/types` (or `/app/types` in Nuxt 4)
- Organize by domain: `types/user.ts`, `types/auth.ts`
- **NO barrel exports** — import directly: `import type { User } from '~/types/user'`
- PascalCase: `ButtonProps`, `AuthState`, `CreateUserRequest`

### Nuxt 4 File Structure

Nuxt 4 (stable since mid-2025, latest 4.3) uses `/app` directory for app-specific code. Server code stays in `/server/`. Migrating from Nuxt 3? Set `compatibilityVersion: 4`. Nuxt 3 EOL: July 31, 2026.

### Data Fetching

- Use `status` (not deprecated `pending`): `'idle' | 'pending' | 'success' | 'error'`
- `const { data, status, error } = await useFetch(...)`

### Styling

- If Tailwind installed: prefer utility classes
- If not: `<style scoped>`

---

## Related Skills

| Skill | When |
|---|---|
| `nuxt-ui` | Nuxt UI v4 components, theming, forms |
| `nuxt-seo` | SEO modules, sitemaps, OG images, Schema.org |
| `nuxt-nitro` | Nitro server routes, middleware, validation |
| `nuxt-testing` | Testing with @nuxt/test-utils |
| `nuxt-fullstack` | SSR/SSG, rendering modes, deployment |
