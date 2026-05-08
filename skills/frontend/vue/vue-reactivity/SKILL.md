---
name: vue-reactivity-system
description: Vue reactivity API quick reference — ref, reactive, computed, watch. Use when working with Vue state management and reactive data.
---

# Vue Reactivity Quick Reference

Concise reference for Vue's reactivity APIs. For in-depth patterns see `vue-best-practices/references/reactivity.md`. For debugging reactivity issues see `vue-debug-guides`.

---

## ref vs reactive

```ts
import { ref, reactive } from 'vue'

// ref — works with any value, access via .value
const count = ref(0)
count.value++ // .value required in script

// reactive — deep proxy for objects, no .value needed
const state = reactive({ count: 0, user: { name: 'John' } })
state.count++ // direct access
state.user.name = 'Jane' // nested is reactive too
```

**When to choose:**
- `ref` for primitives, replaceable objects, or when you need `.value` explicitness
- `reactive` for complex objects you won't replace entirely
- **Default to `ref`** — it's simpler and works everywhere

---

## computed — Derived State

```ts
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2) // cached, auto-tracks deps

// Writable computed
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (v) => { [firstName.value, lastName.value] = v.split(' ') },
})
```

---

## watch — React to Changes

```ts
import { ref, reactive, watch } from 'vue'

const count = ref(0)
const state = reactive({ name: 'John' })

// Watch ref
watch(count, (newVal, oldVal) => { /* side effect */ })

// Watch reactive property (use getter)
watch(() => state.name, (newVal) => { /* ... */ })

// Watch multiple sources
watch([count, () => state.name], ([newCount, newName]) => { /* ... */ })

// Options
watch(count, handler, {
  immediate: true, // run on creation
  deep: true,      // deep watch (auto for reactive objects)
  flush: 'post',   // 'pre' | 'post' | 'sync'
})

// Stop watcher
const stop = watch(count, () => {})
stop()
```

---

## watchEffect — Auto-tracking

```ts
import { ref, watchEffect, onWatcherCleanup } from 'vue'

const count = ref(0)

// Auto-tracks all refs/reactive accessed inside
watchEffect(() => {
  console.log(count.value) // re-runs when count changes
})

// Cleanup (Vue 3.5+)
watchEffect(() => {
  const timer = setTimeout(() => console.log(count.value), 1000)
  onWatcherCleanup(() => clearTimeout(timer))
})

// Timing variants
// watchPostEffect() — after DOM update
// watchSyncEffect() — synchronous (use sparingly)
```

---

## Preserving Reactivity

```ts
import { reactive, toRefs, toRef } from 'vue'

const state = reactive({ count: 0, name: 'John' })

// WRONG: destructuring loses reactivity
const { count } = state // NOT reactive!

// RIGHT: toRefs preserves reactivity
const { count, name } = toRefs(state) // count.value is linked to state.count

// toRef for single property
const countRef = toRef(state, 'count')
```

---

## Shallow variants — Performance

```ts
import { shallowRef, shallowReactive, triggerRef } from 'vue'

// shallowRef: only .value replacement is reactive
const data = shallowRef({ items: [] })
data.value.items.push('x') // NOT reactive
data.value = { items: ['x'] } // reactive
triggerRef(data) // force update after mutation

// shallowReactive: only root properties are reactive
const state = shallowReactive({ nested: { count: 0 } })
state.nested = { count: 1 } // reactive
state.nested.count++ // NOT reactive
```

Use for large data structures (API responses, big lists) where deep reactivity is wasteful.

---

## Utilities

```ts
import { ref, unref, toValue, isRef, isReactive, readonly } from 'vue'

const count = ref(0)

unref(count)        // 0 — unwraps ref, passthrough for non-ref
toValue(count)      // 0 — like unref but also calls getters: toValue(() => 42) → 42
isRef(count)        // true
isReactive(reactive({})) // true

// readonly: prevent mutations (deep)
const state = reactive({ count: 0 })
const ro = readonly(state) // ro.count++ → warning in dev
```

---

## Key Rules

- Refs auto-unwrap in `<template>` — no `.value` needed
- Refs auto-unwrap inside `reactive()` — `reactive({ count: ref(0) })` → `state.count` (no .value)
- Refs do NOT auto-unwrap in reactive arrays/Maps — `reactive([ref(0)])[0].value`
- Never replace a `reactive()` object — breaks reactivity. Use `ref()` if you need replacement.
- `computed` is cached; functions in templates re-run every render
- `watch` on reactive object is automatically deep; `watch` on getter is shallow by default

---

## Resources

- [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html)
- [Reactivity API Reference](https://vuejs.org/api/reactivity-core.html)
