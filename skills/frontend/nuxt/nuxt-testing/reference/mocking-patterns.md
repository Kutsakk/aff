---
title: Nuxt Testing Mocking Patterns
impact: MEDIUM
type: reference
tags: [nuxt, testing, vitest, mocking, composables, api]
---

# Mocking Patterns

## Mock Composables with `mockNuxtImport`

```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useUserSession', () => {
  return () => ({
    user: { id: 1, name: 'Test User' },
    loggedIn: true,
  })
})

mockNuxtImport('useAddress', () => {
  return () => ({
    getDisplayAddress: (project: { address?: string }) => project.address || 'No address',
  })
})
```

## Mock API Endpoints with `registerEndpoint`

```typescript
import { registerEndpoint } from '@nuxt/test-utils/runtime'

registerEndpoint('/api/projects', {
  method: 'GET',
  handler: () => [
    { id: 1, name: 'Project A', status: 'active' },
    { id: 2, name: 'Project B', status: 'completed' },
  ],
})

registerEndpoint('/api/projects/:id', {
  method: 'GET',
  handler: (event) => ({
    id: parseInt(event.context.params.id),
    name: 'Project Detail',
  }),
})
```

## Testing Pages with Routes

```typescript
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import TaskPage from './[id].vue'

it('renders task details', async () => {
  registerEndpoint('/api/tasks/123', {
    method: 'GET',
    handler: () => ({ id: 123, name: 'Fix bug', status: 'open' }),
  })

  const wrapper = await mountSuspended(TaskPage, {
    route: { params: { id: '123' } },
  })

  expect(wrapper.text()).toContain('Fix bug')
})
```

## Stubbing UI Library Components

```typescript
const wrapper = await mountSuspended(MyComponent, {
  global: {
    stubs: { UTable: true, UModal: true, UForm: true },
  },
})
```

## Async Interactions

```typescript
import { nextTick } from 'vue'

it('updates after click', async () => {
  const wrapper = await mountSuspended(Counter)
  await wrapper.find('button').trigger('click')
  await nextTick()
  expect(wrapper.text()).toContain('Count: 1')
})
```
