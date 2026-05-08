---
name: vue-pinia-best-practices
description: "Pinia stores, state management patterns, store setup, and reactivity with stores."
version: 1.0.0
license: MIT
author: github.com/vuejs-ai
---

> **Nuxt note:** In Nuxt, Pinia is auto-installed — do NOT manually call `app.use(createPinia())`. Stores are auto-imported from `stores/` directory. The "getActivePinia" error section below is mostly irrelevant in Nuxt. All other patterns (storeToRefs, $patch, setup vs options stores, store composition) apply normally.

Pinia best practices, common gotchas, and state management patterns.

**Best practice:** Options API helpers (`mapStores`, `mapState`, `mapActions`, `mapWritableState`) are deprecated. Use the Composition API with `useXxxStore()` directly in `<script setup>` instead.

### Store Setup
- Getting "getActivePinia was called" error at startup → See [pinia-no-active-pinia-error](reference/pinia-no-active-pinia-error.md)
- Setup stores missing state in DevTools or SSR → See [pinia-setup-store-return-all-state](reference/pinia-setup-store-return-all-state.md)

### Reactivity
- Store destructuring stops updating UI reactively → See [pinia-store-destructuring-breaks-reactivity](reference/pinia-store-destructuring-breaks-reactivity.md)
- Store methods lose context in template calls → See [store-method-binding-parentheses](reference/store-method-binding-parentheses.md)

### State Patterns
- Filters reset on refresh or can't be shared → See [state-url-for-ephemeral-filters](reference/state-url-for-ephemeral-filters.md)
- Building production app without DevTools or conventions → See [state-use-pinia-for-large-apps](reference/state-use-pinia-for-large-apps.md)

### storeToRefs
- Always use `storeToRefs()` when destructuring state/getters from a store to preserve reactivity. Only actions can be destructured directly.
- `const { count, doubled } = storeToRefs(store)` for state/getters; `const { increment } = store` for actions.

### Store Composition
- Stores can import and use other stores inside their actions/getters. Call the store function inside the action, not at the top level of a setup store, to avoid circular dependency issues.

### $patch Best Practices
- Use `$patch` with an object for simple updates: `store.$patch({ count: 1, name: 'new' })`.
- Use `$patch` with a function for mutations involving collections or conditional logic: `store.$patch((state) => { state.items.push(newItem) })`.
- `$patch` groups multiple changes into a single reactivity flush, improving performance over individual property assignments.

### Setup Store vs Options Store
- **Options stores** (`defineStore('id', { state, getters, actions })`) are simpler and mirror the Options API. Good for straightforward CRUD stores.
- **Setup stores** (`defineStore('id', () => { ... })`) offer full flexibility with refs, computed, and watchers. Preferred for complex stores with watchers, composable usage, or conditional logic.
- Setup stores must explicitly return all state, getters, and actions that should be accessible.
