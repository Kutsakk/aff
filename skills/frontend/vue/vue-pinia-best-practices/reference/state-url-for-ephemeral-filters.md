---
title: Use URL State for Shareable Filters Instead of Stores
impact: MEDIUM
type: best-practice
tags: [vue3, state-management, url, router, filters, ux]
---

# Use URL State for Shareable Filters

Storing filters/search/pagination only in stores means users lose state on refresh and can't share links. Use URL query parameters for "view" state.

## What Goes Where

| State | URL | Store | Why |
|-------|-----|-------|-----|
| Filters, search, sort, pagination, tab | Yes | Optional | Shareable, bookmarkable, survives refresh |
| Modal open state | Maybe | Yes | Usually not shareable |
| Form drafts, user session, cart | No | Yes | Private or needs persistence |

## URL-Based Filters

```vue
<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const selectedCategory = computed({
  get: () => (route.query.category as string) || 'all',
  set: (v) => updateQuery({ category: v === 'all' ? undefined : v }),
})

const sortBy = computed({
  get: () => (route.query.sort as string) || 'newest',
  set: (v) => updateQuery({ sort: v === 'newest' ? undefined : v }),
})

const page = computed({
  get: () => parseInt(route.query.page as string) || 1,
  set: (v) => updateQuery({ page: v === 1 ? undefined : String(v) }),
})

// replace (not push) to avoid polluting browser history with each filter change
function updateQuery(params: Record<string, string | undefined>) {
  router.replace({ query: { ...route.query, ...params } })
}
</script>
```

Result: `/products?category=electronics&sort=price-low&page=2` — shareable, bookmarkable, refresh-safe.

## VueUse Shortcut

If `@vueuse/router` is installed:

```vue
<script setup lang="ts">
import { useRouteQuery } from '@vueuse/router'

const category = useRouteQuery('category', 'all')
const sort = useRouteQuery('sort', 'newest')
const search = useRouteQuery('q', '')
const page = useRouteQuery('page', 1, { transform: Number })
</script>
```

## Hybrid: URL + Store

For complex filtering logic, sync URL with a store. Key: use `router.currentRoute` (a ref) instead of `useRoute()` inside stores:

```ts
import router from '@/router'

export const useFiltersStore = defineStore('filters', () => {
  const route = router.currentRoute

  const category = ref('all')
  const sortBy = ref('newest')

  // URL → store
  watch(() => route.value.query, () => {
    category.value = (route.value.query.category as string) || 'all'
    sortBy.value = (route.value.query.sort as string) || 'newest'
  }, { immediate: true })

  // Store → URL
  watch([category, sortBy], () => {
    router.replace({
      query: {
        category: category.value !== 'all' ? category.value : undefined,
        sort: sortBy.value !== 'newest' ? sortBy.value : undefined,
      },
    })
  })

  return { category, sortBy }
})
```

> **Note:** `useRoute()`/`useRouter()` require component context — they don't work directly in Pinia stores. Use `import router from '@/router'` and `router.currentRoute` instead.

## Reference
- [VueUse - useRouteQuery](https://vueuse.org/router/useRouteQuery/)
