---
title: Use Pinia for Large-Scale Vue Applications
impact: MEDIUM
type: best-practice
tags: [vue3, pinia, state-management, devtools, architecture]
---

# Use Pinia for Large-Scale Vue Applications

> **Nuxt note:** In Nuxt, Pinia is auto-installed via `@pinia/nuxt`. Skip the "Quick Start" install section.

Hand-rolled `reactive()` stores lack DevTools, HMR, SSR support, TypeScript inference, and plugin ecosystem. Use Pinia for any non-trivial app.

## When Hand-Rolled State is OK

Prototypes, small single-developer apps, or learning. Otherwise, use Pinia.

## Pinia vs Hand-Rolled

| Feature | `reactive()` | Pinia |
|---------|-------------|-------|
| DevTools (timeline, inspection, time-travel) | No | Yes |
| TypeScript inference | Manual | Automatic |
| HMR (state survives code changes) | No | Yes |
| SSR (per-request isolation, hydration) | Manual | Built-in |
| Plugins (persistedstate, etc.) | No | Yes |
| Bundle size | Smaller | ~1KB |

## Persisted State Plugin

```ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useSettingsStore = defineStore('settings', {
  state: () => ({ theme: 'light', language: 'en' }),
  persist: true, // auto-saves to localStorage
})
```

## Store Styles

```ts
// Options style
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: { double: (state) => state.count * 2 },
  actions: { increment() { this.count++ } },
})

// Setup style (Composition API) — preferred for complex stores
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, double, increment }
})
```

## Migrating from Vuex

Vuex is deprecated. Key differences: no mutations (actions mutate directly), better TypeScript, no nested modules.

> **Note:** `mapStores`, `mapState`, `mapActions` helpers are deprecated. Use `useXxxStore()` in `<script setup>` instead.

## Reference
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue.js - State Management](https://vuejs.org/guide/scaling-up/state-management.html)
