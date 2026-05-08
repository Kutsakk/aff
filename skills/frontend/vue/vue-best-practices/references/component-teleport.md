---
title: Teleport Component Best Practices
impact: MEDIUM
impactDescription: Teleport renders content outside the component's DOM position, which is essential for overlays but affects styling and layout
type: best-practice
tags: [vue3, teleport, modal, overlay, positioning, responsive]
---

# Teleport Component Best Practices

**Impact: MEDIUM** - `<Teleport>` renders part of a component's template in a different place in the DOM while preserving the Vue component hierarchy. Use it for overlays (modals, toasts, tooltips) or any UI that must escape stacking contexts, overflow, or fixed positioning constraints.

## Teleport Overlays Out of Transformed Containers

When an ancestor has `transform`, `filter`, or `perspective`, fixed-position overlays can behave like they are locally positioned. Teleport escapes that context.

**BAD:**
```vue
<template>
  <div class="animated-container">
    <button @click="open = true">Open</button>

    <!-- Broken: fixed positioning is scoped to the transformed parent -->
    <div v-if="open" class="modal">Modal</div>
  </div>
</template>

<style>
.animated-container {
  transform: translateZ(0);
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
}
</style>
```

**GOOD:**
```vue
<template>
  <div class="animated-container">
    <button @click="open = true">Open</button>

    <Teleport to="body">
      <div v-if="open" class="modal">Modal</div>
    </Teleport>
  </div>
</template>
```

## Responsive Layouts with `disabled`

Use `:disabled` to render inline on mobile and teleport on larger screens:

```vue
<script setup>
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <Teleport to="body" :disabled="isMobile">
    <nav class="sidebar">Navigation</nav>
  </Teleport>
</template>
```

## Logical Hierarchy Is Preserved

Teleport changes DOM position, not the Vue component tree. Props, emits, slots, and provide/inject still work:

```vue
<template>
  <Teleport to="body">
    <ChildPanel :message="message" @close="open = false" />
  </Teleport>
</template>
```

## Multiple Teleports to the Same Target

Teleports to the same target append in declaration order:

```vue
<template>
  <Teleport to="#notifications">
    <div>First</div>
  </Teleport>

  <Teleport to="#notifications">
    <div>Second</div>
  </Teleport>
</template>
```

Use a shared container to keep stacking predictable, and apply z-index only when you need explicit layering.

## Deferred Teleport with `defer` (Vue 3.5+)

By default, `<Teleport>` requires its target to exist when the component mounts. The `defer` prop tells Vue to wait until the current render cycle finishes before resolving the target. This allows you to teleport to a target rendered by Vue in the same update, including elements that appear later in the template or in child components.

```vue
<template>
  <!-- The target is rendered after this Teleport, but defer waits for it -->
  <Teleport defer to="#late-target">
    <p>This content is teleported to a target rendered below.</p>
  </Teleport>

  <div id="late-target"></div>
</template>
```

Use `defer` when the teleport target is rendered by Vue itself and may not exist in the DOM at mount time. Without `defer`, the teleport would fail silently or produce a warning because the target element has not been created yet.
