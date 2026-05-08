---
title: State Management Strategy
impact: HIGH
impactDescription: Choosing the wrong store pattern can cause SSR request leaks, brittle mutation flows, and poor scaling
type: best-practice
tags: [vue3, state-management, pinia, composables, ssr, vueuse]
---

# State Management Strategy

**Impact: HIGH** - Use the lightest state solution that fits your app architecture. SPA-only apps can use lightweight global composables, while SSR/Nuxt apps should default to Pinia for request-safe isolation and predictable tooling.

## Choose the Lightest Store Approach

- **Feature composable:** Default for reusable logic with local/feature-level state.
- **Singleton composable or VueUse `createGlobalState`:** Small non-SSR apps needing shared app state.
- **Pinia:** SSR/Nuxt apps, medium-to-large apps, and cases requiring DevTools, plugins, or action tracing.

## Avoid Exporting Mutable Module State

**BAD:**
```ts
// store/cart.ts
import { reactive } from 'vue'

export const cart = reactive({
  items: [] as Array<{ id: string; qty: number }>
})
```

**GOOD:**
```ts
// composables/useCartStore.ts
import { reactive, readonly } from 'vue'

let _store: ReturnType<typeof createCartStore> | null = null

function createCartStore() {
  const state = reactive({
    items: [] as Array<{ id: string; qty: number }>
  })

  function addItem(id: string, qty = 1) {
    const existing = state.items.find((item) => item.id === id)
    if (existing) {
      existing.qty += qty
      return
    }
    state.items.push({ id, qty })
  }

  return {
    state: readonly(state),
    addItem
  }
}

export function useCartStore() {
  if (!_store) _store = createCartStore()
  return _store
}
```

## Do Not Use Runtime Singletons in SSR

Module singletons live for the runtime lifetime. In SSR this can leak state between requests.

**BAD:**
```ts
// shared singleton reused across requests
const cartStore = useCartStore()

export function useServerCart() {
  return cartStore
}
```

**GOOD:**

> `pinia` dependency required.

```ts
// stores/cart.ts — Options Store syntax
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as Array<{ id: string; qty: number }>
  }),
  actions: {
    addItem(id: string, qty = 1) {
      const existing = this.items.find((item) => item.id === id)
      if (existing) {
        existing.qty += qty
        return
      }
      this.items.push({ id, qty })
    }
  }
})
```

```ts
// stores/cart.ts — Setup Store syntax (recommended for Composition API projects)
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Array<{ id: string; qty: number }>>([])

  const totalQty = computed(() =>
    items.value.reduce((sum, item) => sum + item.qty, 0)
  )

  function addItem(id: string, qty = 1) {
    const existing = items.value.find((item) => item.id === id)
    if (existing) {
      existing.qty += qty
      return
    }
    items.value.push({ id, qty })
  }

  return { items, totalQty, addItem }
})
```

> **Pinia 3.x note:** Pinia 3 (currently in development) will bring breaking changes including stricter TypeScript types, removal of some deprecated APIs, and deeper integration with Vue DevTools. When upgrading, review the [Pinia migration guide](https://pinia.vuejs.org/) for the latest details.

## Use `createGlobalState` for Small SPA Global State

> `@vueuse/core` dependency required.

If the app is non-SSR and already uses VueUse, `createGlobalState` removes singleton boilerplate.

```ts
import { createGlobalState } from '@vueuse/core'
import { computed, ref } from 'vue'

export const useAuthState = createGlobalState(() => {
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => token.value !== null)

  function setToken(next: string | null) {
    token.value = next
  }

  return {
    token,
    isAuthenticated,
    setToken
  }
})
```
