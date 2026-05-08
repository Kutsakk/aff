---
name: nuxt-ui
description: Nuxt UI v4 (@nuxt/ui 4.x) — 120+ accessible components, Tailwind CSS v4, Reka UI. Use for dashboards, forms, overlays, AI chat, landing pages.
---

# Nuxt UI v4

120+ accessible components with Tailwind CSS v4 and Reka UI. Unifies former UI + UI Pro into single open-source library.

**Version:** @nuxt/ui 4.x (latest 4.5.0) | **License:** MIT | **Last Verified:** 2026-02

**DON'T use:** Vue-only (no Nuxt), React, Tailwind v3. For Nuxt 3 use @nuxt/ui v2.x.

---

## Quick Start

```bash
bun add @nuxt/ui
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({ modules: ['@nuxt/ui'] })
```

```vue
<!-- app.vue -->
<template><UApp><NuxtPage /></UApp></template>
<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
```

---

## Composables

```typescript
const { add } = useToast()
add({ title: 'Success', color: 'success' })

defineShortcuts({ 'meta_k': () => openSearch() })
```

Core: `useToast`, `useOverlay`, `useColorMode`, `useFormField`

---

## Common Errors

1. **Missing `UApp` wrapper** → Wrap root with `<UApp>`
2. **CSS import order** → `@import "tailwindcss"` FIRST, then `@import "@nuxt/ui"`
3. **Template refs (v4.2+)** → `ref.value?.focus()` not `ref.value.$el.focus()`
4. **Module not found** → Add `'@nuxt/ui'` to `modules` in `nuxt.config.ts`
5. **Dark mode** → Ensure `<UApp>` wraps app + `@nuxtjs/color-mode` configured

See `reference/components-catalog.md` for full component list by category.

---

## MCP Integration

Official Nuxt UI MCP server (`https://ui.nuxt.com/mcp`): component listing, docs, migration guides.

Commands: `/nuxt-ui-v4:setup`, `/nuxt-ui:migrate`, `/nuxt-ui:theme`, `/nuxt-ui:component`

---

## Documentation

- [Nuxt UI docs](https://ui.nuxt.com)
- [Components](https://ui.nuxt.com/components) | [Composables](https://ui.nuxt.com/composables/use-toast)
