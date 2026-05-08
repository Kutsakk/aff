---
title: Reactivity Core Patterns (ref, reactive, shallowRef, computed, watch)
impact: MEDIUM
type: efficiency
tags: [vue3, reactivity, ref, reactive, shallowRef, computed, watch, watchEffect, best-practice]
---

# Reactivity Core Patterns

> For quick API reference (ref, reactive, computed, watch, watchEffect, utilities), see `vue-reactivity/SKILL.md`.

## Choosing the Right Reactive Primitive

| Use | When | Example |
|-----|------|---------|
| `ref()` | Primitives, or objects you replace entirely | `ref(0)`, `ref({ name: 'Alice' })` |
| `reactive()` | Objects you mutate in place (stores, forms) | `reactive({ count: 0, user: { name: '' } })` |
| `shallowRef()` | Class instances, SDK clients, large opaque data | `shallowRef(new SDK())` |
| `shallowReactive()` | Container where only top-level keys change | `shallowReactive({ config: rawPayload })` |

**Default to `ref()`** — it works everywhere and `.value` makes mutations explicit.

```ts
const count = ref(0)                       // primitives
const sdkClient = shallowRef(new SDK())    // class instances — no deep proxy
const largeData = shallowRef(rawPayload)   // opaque data

// Force update after mutating shallowRef internals
largeData.value.nested.field = 'updated'
triggerRef(largeData)
```

## Reactive Gotchas

### Don't destructure `reactive()`

```ts
const state = reactive({ count: 0 })
const { count } = state // ❌ disconnected from reactivity
const { count } = toRefs(state) // ✅ count is a ref linked to state.count
```

### Watch reactive properties with a getter

```ts
const state = reactive({ count: 0 })

watch(state.count, () => {}) // ❌ passing a plain value
watch(() => state.count, () => {}) // ✅ getter
```

## Computed Best Practices

### Prefer `computed` over watcher-assigned refs

```ts
// ❌ BAD
const total = ref(0)
watchEffect(() => {
  total.value = items.value.reduce((sum, i) => sum + i.price, 0)
})

// ✅ GOOD — cached, auto-tracks deps
const total = computed(() => items.value.reduce((sum, i) => sum + i.price, 0))
```

### Move filter/sort logic out of templates

```ts
// ❌ <li v-for="item in items.filter(i => i.active)">
// ✅
const visibleItems = computed(() =>
  items.value.filter(i => i.active).sort((a, b) => a.name.localeCompare(b.name))
)
```

### Use `computed` for reusable class logic

```vue
<script setup>
const buttonClasses = computed(() => ({
  btn: true,
  [`btn-${props.type}`]: !props.disabled,
  'btn-disabled': props.disabled,
}))
</script>

<template>
  <button :class="buttonClasses">{{ label }}</button>
</template>
```

### Keep computed getters pure

No mutations, API calls, or side effects. Use `watch()` for side effects.

```ts
// ❌ side effect in computed
const doubled = computed(() => {
  if (count.value > 10) console.warn('Too big!')
  return count.value * 2
})

// ✅ pure computed + watch for effects
const doubled = computed(() => count.value * 2)
watch(count, (v) => { if (v > 10) console.warn('Too big!') })
```

## Watcher Best Practices

### Use `immediate: true` instead of duplicate initial call

```ts
// ❌ onMounted(() => loadUser(userId.value)) + watch(userId, loadUser)
// ✅
watch(userId, (id) => loadUser(id), { immediate: true })
```

### Clean up async effects

Cancel previous requests on rapid changes (search, filters):

```ts
// Vue 3.5+ (preferred)
watch(query, async (q) => {
  const controller = new AbortController()
  onWatcherCleanup(() => controller.abort())
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
  results.value = await res.json()
})

// Pre-3.5: use third-argument onCleanup
watch(query, async (q, _prev, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  // ...same fetch logic
})
```
