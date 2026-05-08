---
title: Suspense Component Best Practices
impact: MEDIUM
impactDescription: Suspense coordinates async dependencies with fallback UI; misconfiguration leads to missing loading states or confusing UX
type: best-practice
tags: [vue3, suspense, async-components, async-setup, loading, fallback, router, transition, keepalive]
---

# Suspense Component Best Practices

> **Experimental Feature:** `<Suspense>` is still an experimental feature as of Vue 3.5. Its API may change before it becomes stable. While it is usable in production, be aware that breaking changes could occur in future minor releases. Always check the [official documentation](https://vuejs.org/guide/built-ins/suspense.html) for the latest status.

**Impact: MEDIUM** - `<Suspense>` coordinates async dependencies (async components or async setup) and renders a fallback while they resolve. Misconfiguration leads to missing loading states, empty renders, or subtle UX bugs.

## Single Root in Default and Fallback Slots

Suspense tracks a single immediate child in both slots. Wrap multiple elements in a single element or component.

**BAD:**
```vue
<template>
  <Suspense>
    <AsyncHeader />
    <AsyncList />

    <template #fallback>
      <LoadingSpinner />
      <LoadingHint />
    </template>
  </Suspense>
</template>
```

**GOOD:**
```vue
<template>
  <Suspense>
    <div>
      <AsyncHeader />
      <AsyncList />
    </div>

    <template #fallback>
      <div>
        <LoadingSpinner />
        <LoadingHint />
      </div>
    </template>
  </Suspense>
</template>
```

## Fallback Timing on Reverts (`timeout`)

When Suspense is already resolved and new async work starts, the previous content remains visible until the timeout elapses. Use `timeout="0"` for immediate fallback or a short delay to avoid flicker.

**BAD:**
```vue
<template>
  <Suspense>
    <component :is="currentView" :key="viewKey" />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

**GOOD:**
```vue
<template>
  <Suspense :timeout="200">
    <component :is="currentView" :key="viewKey" />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

## Pending State Only Re-triggers on Root Replacement

Once resolved, Suspense only re-enters pending when the root node of the default slot changes. If async work happens deeper in the tree, no fallback appears.

**BAD:**
```vue
<template>
  <Suspense>
    <TabContainer>
      <AsyncDashboard v-if="tab === 'dashboard'" />
      <AsyncSettings v-else />
    </TabContainer>

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

**GOOD:**
```vue
<template>
  <Suspense>
    <component :is="tabs[tab]" :key="tab" />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

## Use `suspensible` for Nested Suspense (Vue 3.3+)

Nested Suspense boundaries need `suspensible` on the inner boundary so the parent can coordinate loading state. Without it, inner async content may render empty nodes until resolved.

**BAD:**
```vue
<template>
  <Suspense>
    <LayoutShell>
      <Suspense>
        <AsyncWidget />
        <template #fallback>Loading widget...</template>
      </Suspense>
    </LayoutShell>

    <template #fallback>Loading layout...</template>
  </Suspense>
</template>
```

**GOOD:**
```vue
<template>
  <Suspense>
    <LayoutShell>
      <Suspense suspensible>
        <AsyncWidget />
        <template #fallback>Loading widget...</template>
      </Suspense>
    </LayoutShell>

    <template #fallback>Loading layout...</template>
  </Suspense>
</template>
```

## Track Loading with Suspense Events

Use `@pending`, `@resolve`, and `@fallback` for analytics, global loading indicators, or coordinating UI outside the Suspense boundary.

```vue
<script setup>
import { ref } from 'vue'

const isLoading = ref(false)

const onPending = () => {
  isLoading.value = true
}

const onResolve = () => {
  isLoading.value = false
}
</script>

<template>
  <LoadingBar v-if="isLoading" />

  <Suspense @pending="onPending" @resolve="onResolve">
    <AsyncPage />
    <template #fallback>
      <PageSkeleton />
    </template>
  </Suspense>
</template>
```

## Recommended Nesting with RouterView, Transition, KeepAlive

When combining these components, the nesting order should be `RouterView` -> `Transition` -> `KeepAlive` -> `Suspense` so each wrapper works correctly.

**BAD:**
```vue
<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <KeepAlive>
        <Transition mode="out-in">
          <component :is="Component" />
        </Transition>
      </KeepAlive>
    </Suspense>
  </RouterView>
</template>
```

**GOOD:**
```vue
<template>
  <RouterView v-slot="{ Component }">
    <Transition mode="out-in">
      <KeepAlive>
        <Suspense>
          <component :is="Component" />
          <template #fallback>Loading...</template>
        </Suspense>
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
```

## Treat Suspense Cautiously in Production

In production code, keep Suspense boundaries minimal, document where they are used, and have a fallback loading strategy if you ever need to replace or refactor them.
