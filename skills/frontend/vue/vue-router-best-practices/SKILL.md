---
name: vue-router-best-practices
description: "Vue Router 4.5+ patterns, navigation guards, route params, and route-component lifecycle interactions."
version: 1.0.0
license: MIT
author: github.com/vuejs-ai
---

> **NUXT PROJECT? SKIP THIS SKILL.** Nuxt uses file-based routing (`pages/` directory) with its own auto-generated router. Manual `createRouter()`, `router.beforeEach()`, route config objects, and `<RouterView>` setup from this skill do NOT apply. Use the `nuxt` and `nuxt-fullstack` skills instead. The only universally applicable sections below are reactive `useRoute()`/`useRouter()` patterns and `route.params` watchers.

Vue Router best practices, common gotchas, and navigation patterns.

### Navigation Guards
- Navigating between same route with different params → See [router-beforeenter-no-param-trigger](reference/router-beforeenter-no-param-trigger.md)
- Accessing component instance in beforeRouteEnter guard → See [router-beforerouteenter-no-this](reference/router-beforerouteenter-no-this.md)
- Navigation guard making API calls without awaiting → See [router-guard-async-await-pattern](reference/router-guard-async-await-pattern.md)
- Users trapped in infinite redirect loops → See [router-navigation-guard-infinite-loop](reference/router-navigation-guard-infinite-loop.md)
- Navigation guard using deprecated next() function → See [router-navigation-guard-next-deprecated](reference/router-navigation-guard-next-deprecated.md)
- **Note:** `next()` is deprecated in Vue Router 4+. Use return-based guards instead: return `false` to cancel, return a route location to redirect, or return nothing / `true` to proceed.

### Route Lifecycle
- Stale data when navigating between same route → See [router-param-change-no-lifecycle](reference/router-param-change-no-lifecycle.md)
- Event listeners persisting after component unmounts → See [router-simple-routing-cleanup](reference/router-simple-routing-cleanup.md)

### Setup
- Building production single-page application → See [router-use-vue-router-for-production](reference/router-use-vue-router-for-production.md)

### Typed Routes
- Use the `unplugin-vue-router` package (or Nuxt's built-in typed routes) for auto-generated route types. This provides type-safe `router.push()`, `<RouterLink :to="...">`, and route param access.

### RouterView Slot API
- Use `<RouterView v-slot="{ Component, route }">` to wrap route components with `<Transition>`, `<KeepAlive>`, or add per-route logic without nesting issues.

### Data Fetching Patterns
- **Before navigation:** Fetch data in navigation guards (`beforeEach`, route-level `beforeEnter`) to block navigation until data is ready. Note: `beforeRouteEnter` is only available in Options API, not in `<script setup>`.
- **After navigation:** Fetch data in `onMounted` or `watchEffect` inside the component for a snappier navigation feel with loading states.
- Use watchers on `route.params` to refetch when navigating between same-route with different params.

### useRoute / useRouter Composable Patterns
- Use `useRoute()` to access the current route reactively inside `<script setup>`. Avoid storing `route.params` in local variables (use computed or watchers to stay reactive).
- Use `useRouter()` to access the router instance for programmatic navigation.
