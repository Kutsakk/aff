---
title: Single-File Component Structure, Styling, and Template Patterns
impact: MEDIUM
type: best-practice
tags: [vue3, sfc, scoped-css, styles, template, v-for, v-if, v-show, v-html]
---

# SFC Structure, Styling, and Template Patterns

## Colocate template, script, and styles

Keep everything in one `.vue` file — no separate `.js`/`.css` per component.

```vue
<script setup>
const props = defineProps({ user: { type: Object, required: true } })
const displayName = computed(() => `${props.user.firstName} ${props.user.lastName}`)
</script>

<template>
  <div class="user-card">
    <h3 class="name">{{ displayName }}</h3>
  </div>
</template>

<style scoped>
.user-card { padding: 1rem; }
.name { margin: 0; }
</style>
```

## Use PascalCase for component names

```vue
<!-- ❌ --><user-profile :user="currentUser" />
<!-- ✅ --><UserProfile :user="currentUser" />
```

## Scoped Styles

- Use `<style scoped>` for component styles. Keep global CSS in `src/assets/main.css`.
- Use `:deep()` sparingly.
- **Use class selectors, not element selectors** — element selectors in scoped CSS are slower.

```vue
<!-- ❌ -->
<style scoped>
article { max-width: 800px; }
h1 { font-size: 2rem; }
</style>

<!-- ✅ -->
<style scoped>
.article { max-width: 800px; }
.article-title { font-size: 2rem; }
</style>
```

## Template Refs with `useTemplateRef()` (Vue 3.5+)

```vue
<script setup lang="ts">
const inputRef = useTemplateRef<HTMLInputElement>('input')
onMounted(() => inputRef.value?.focus())
</script>

<template>
  <input ref="input" />
</template>
```

## Use camelCase in `:style` bindings

```vue
<!-- ❌ --><div :style="{ 'font-size': size + 'px' }">
<!-- ✅ --><div :style="{ fontSize: size + 'px' }">
```

## `v-for` Rules

- Always provide a stable primitive `:key`.
- **Never use `v-if` + `v-for` on the same element.** Filter with `computed` or wrap with `<template v-if>`.

```vue
<!-- ❌ --><li v-for="u in users" v-if="u.active" :key="u.id">

<!-- ✅ -->
<li v-for="u in activeUsers" :key="u.id">
<!-- or -->
<ul v-if="shouldShow">
  <li v-for="u in users" :key="u.id">
</ul>
```

## Never render untrusted HTML with `v-html`

```vue
<script setup>
import DOMPurify from 'dompurify'
const safeHtml = computed(() => DOMPurify.sanitize(props.trustedHtml ?? ''))
</script>

<template>
  <p>{{ props.plainText }}</p>              <!-- escaped interpolation -->
  <article v-html="safeHtml"></article>     <!-- only sanitized HTML -->
</template>
```

## Reactive CSS with `v-bind()` in `<style>`

```vue
<style scoped>
.text {
  color: v-bind('theme.color');
  font-size: v-bind('theme.fontSize');
  opacity: v-bind('isActive ? 1 : 0.5');
}
</style>
```

Compiles to CSS custom property updated via inline styles. Prefer referencing a `ref`/`computed` over complex expressions.

## `v-if` vs `v-show`

| Directive | Use when | Reason |
|-----------|----------|--------|
| `v-show` | Frequent toggles | Keeps element in DOM, toggles `display` |
| `v-if` | Rare condition or heavy component | Lazy render, no initial cost |
