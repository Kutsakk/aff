---
title: Fix "No Active Pinia" Error - Store Setup Timing
impact: HIGH
type: gotcha
tags: [vue3, pinia, state-management, setup, initialization, error]
---

# Fix "No Active Pinia" Error

> **Nuxt note:** This error is rare in Nuxt because `@pinia/nuxt` auto-installs Pinia. If you see it in Nuxt, check for module-level `useXxxStore()` calls (Cause 2 below).

```
[🍍]: "getActivePinia()" was called but there was no active Pinia.
```

## Cause 1: Wrong Plugin Order

```ts
// WRONG
app.use(router) // router guard calls useAuthStore() — fails!
app.use(createPinia())

// CORRECT
app.use(createPinia()) // Pinia first
app.use(router)
app.mount('#app')
```

## Cause 2: Store Used at Module Level

```ts
// WRONG: runs immediately when module is imported
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore() // ERROR!

export function fetchUser() {
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
}

// CORRECT: call inside function
export function fetchUser() {
  const authStore = useAuthStore() // called at runtime, Pinia is active
  return fetch('/api/user', {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
}
```

## Cause 3: `<script>` Instead of `<script setup>`

```vue
<!-- WRONG: <script> runs before component setup -->
<script>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore() // ERROR!
</script>

<!-- CORRECT: <script setup> runs during setup -->
<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore() // works
</script>
```

## Cause 4: Router Guards

```ts
// WRONG: may run before Pinia is ready
router.beforeEach((to) => {
  const authStore = useAuthStore() // may fail
  if (to.meta.requiresAuth && !authStore.isLoggedIn) return '/login'
})

// FIX 1: ensure app.use(pinia) before app.use(router) in main.ts
// FIX 2: lazy import
router.beforeEach(async (to) => {
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isLoggedIn) return '/login'
})
```

## Debugging Checklist

1. Is `app.use(pinia)` before other plugins in main.ts?
2. Any top-level `useXxxStore()` calls outside functions/setup?
3. Using `<script>` instead of `<script setup>`?
4. Import chain triggering store usage at load time?

## Reference
- [Pinia - Using a Store Outside of a Component](https://pinia.vuejs.org/core-concepts/outside-component-usage.html)
