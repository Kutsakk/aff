---
name: vue-testing-best-practices
version: 1.0.0
license: MIT
author: github.com/vuejs-ai
description: Use for Vue.js testing. Covers Vitest 3.x, Vue Test Utils 2.x, component testing, mocking, testing patterns, and Playwright for E2E testing.
---

> **Nuxt note:** In Nuxt projects, use `@nuxt/test-utils` with `mountSuspended()` instead of raw `mount()`/`shallowMount()` from `@vue/test-utils`. Nuxt auto-imports, plugins, and composables require the Nuxt test context. See the `nuxt-testing` skill for Nuxt-specific patterns. The Vitest config, mocking, and general assertion patterns below still apply.

Vue.js testing best practices, patterns, and common gotchas.

**Vitest 3.x note:** Vitest 3.x prefers a separate `vitest.config.js` (or `vitest.config.ts`) over embedding test config in `vite.config.ts`. This avoids plugin conflicts and makes test configuration explicit. Use `defineConfig` from `vitest/config` in the dedicated file.

### Testing
- Setting up test infrastructure for Vue 3 projects → See [testing-vitest-recommended-for-vue](reference/testing-vitest-recommended-for-vue.md)
- Tests keep breaking when refactoring component internals → See [testing-component-blackbox-approach](reference/testing-component-blackbox-approach.md)
- Tests fail intermittently with race conditions → See [testing-async-await-flushpromises](reference/testing-async-await-flushpromises.md)
- Composables using lifecycle hooks or inject fail to test → See [testing-composables-helper-wrapper](reference/testing-composables-helper-wrapper.md)
- Getting "injection Symbol(pinia) not found" errors in tests → See [testing-pinia-store-setup](reference/testing-pinia-store-setup.md)
- Components with async setup won't render in tests → See [testing-suspense-async-components](reference/testing-suspense-async-components.md)
- Snapshot tests keep passing despite broken functionality → See [testing-no-snapshot-only](reference/testing-no-snapshot-only.md)
- Choosing end-to-end testing framework for Vue apps → See [testing-e2e-playwright-recommended](reference/testing-e2e-playwright-recommended.md)
- Tests need to verify computed styles or real DOM events → See [testing-browser-vs-node-runners](reference/testing-browser-vs-node-runners.md)
- Testing components created with defineAsyncComponent fails → See [async-component-testing](reference/async-component-testing.md)
- Teleported modal content can't be found in wrapper queries → See [teleport-testing-complexity](reference/teleport-testing-complexity.md)

### Mocking Patterns
- Use `vi.mock()` to mock modules (e.g., API clients, composables). Place `vi.mock()` calls at the top level of the test file (they are hoisted automatically by Vitest).
- For mocking Vue composables: `vi.mock('@/composables/useFoo', () => ({ useFoo: vi.fn(() => ({ data: ref(null) })) }))`.
- Use `vi.spyOn()` for partial mocking when you only need to override specific methods.

### Component Mounting Configuration
- Use `mount()` for full rendering (includes child components). Use `shallowMount()` to stub child components for isolated unit tests.
- Pass `global.plugins` to provide Pinia, Router, or i18n to mounted components: `mount(Comp, { global: { plugins: [createTestingPinia()] } })`.
- Pass `global.stubs` to stub specific components or `global.mocks` to mock injected values.

### @vue/test-utils 2.x Patterns
- Use `wrapper.find()` / `wrapper.findAll()` with CSS selectors or `findComponent()` for child Vue components.
- Use `await nextTick()` (from `vue`) or `await flushPromises()` after state changes before asserting DOM updates.
- Use `wrapper.emitted()` to assert emitted events: `expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['newValue'])`.

## Reference

- [Vue.js Testing Guide](https://vuejs.org/guide/scaling-up/testing)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
