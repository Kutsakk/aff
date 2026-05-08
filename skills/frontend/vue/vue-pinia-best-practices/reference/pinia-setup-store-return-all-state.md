---
title: Return All State Properties in Pinia Setup Stores
impact: HIGH
type: gotcha
tags: [vue3, pinia, state-management, setup-stores, ssr, devtools]
---

# Return All State Properties in Pinia Setup Stores

In setup stores, you MUST return all state from the setup function. Unreturned state breaks SSR hydration, DevTools, and plugins (like persistedstate).

## The Problem

```ts
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const authToken = ref('') // NOT returned below!

  const isLoggedIn = computed(() => !!authToken.value)

  async function login(credentials: LoginPayload) {
    const data = await $fetch('/api/login', { method: 'POST', body: credentials })
    authToken.value = data.token // Won't transfer to client in SSR!
    name.value = data.name
  }

  // WRONG: authToken is missing from return
  return { name, isLoggedIn, login }
})
```

**What breaks:** SSR won't serialize `authToken` → client has empty token after hydration. DevTools can't inspect it. Persistence plugins ignore it.

## The Fix

```ts
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const authToken = ref('')

  const isLoggedIn = computed(() => !!authToken.value)

  async function login(credentials: LoginPayload) { /* ... */ }
  function logout() { authToken.value = ''; name.value = '' }

  // CORRECT: return ALL state, getters, and actions
  return { name, authToken, isLoggedIn, login, logout }
})
```

## `skipHydrate()` for Non-Serializable State

For values that can't be serialized (WebSocket, Map, class instances) — return them but wrap with `skipHydrate()`:

```ts
import { defineStore, skipHydrate } from 'pinia'

export const useConnectionStore = defineStore('connection', () => {
  const socket = shallowRef<WebSocket | null>(null)
  const messages = ref<string[]>([])

  function connect(url: string) { socket.value = new WebSocket(url) }

  return {
    socket: skipHydrate(socket), // visible in DevTools, skipped during SSR serialization
    messages,
    connect,
  }
})
```

## "Private" State Convention

Don't hide state — use underscore prefix to signal internal use:

```ts
return {
  _authToken, // signals "internal" but still returned for SSR/DevTools
  name,
  isLoggedIn,
}
```

## Options Stores Don't Have This Problem

In options syntax, all `state()` properties are automatically tracked:

```ts
export const useUserStore = defineStore('user', {
  state: () => ({ name: '', authToken: '' }), // all automatically included
  getters: { isLoggedIn: (state) => !!state.authToken },
})
```

## Reference
- [Pinia - Setup Stores](https://pinia.vuejs.org/core-concepts/#setup-stores)
- [Pinia - SSR](https://pinia.vuejs.org/ssr/)
