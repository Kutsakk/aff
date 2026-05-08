---
name: nuxt-testing
description: Testing Vue components, pages, and composables in Nuxt with @nuxt/test-utils and Vitest.
---

# Nuxt Testing

Test Vue components, pages, and composables in Nuxt 4 using `@nuxt/test-utils` with Vitest.

---

## Setup

```bash
npm install -D @nuxt/test-utils @vue/test-utils happy-dom vitest
```

```typescript
// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: ['app/**/*.test.ts'],
  },
})
```

Co-locate tests: `ProjectCard.vue` → `ProjectCard.test.ts` (same directory).

---

## Component Testing

Use `mountSuspended` (not regular `mount`) — handles async setup and Nuxt context:

```typescript
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ProjectCard from './ProjectCard.vue'

describe('ProjectCard', () => {
  it('renders project name', async () => {
    const wrapper = await mountSuspended(ProjectCard, {
      props: { project: { id: 1, name: 'Test', status: 'active' } },
    })
    expect(wrapper.text()).toContain('Test')
  })
})
```

See `reference/mocking-patterns.md` for composable mocks, API endpoint mocks, and stubs.

---

## Key Gotchas

- **Use `mountSuspended`** — not regular `mount`
- **Mock composables before mounting** — `mockNuxtImport` must be called before `mountSuspended`
- **Register endpoints before mounting** — API mocks must exist before the component fetches
- **Await everything** — `mountSuspended`, `trigger()`, `nextTick()` are all async
