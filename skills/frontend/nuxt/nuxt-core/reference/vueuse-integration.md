---
title: VueUse Integration Guidelines
impact: LOW
type: reference
tags: [nuxt, vueuse, composables, utilities]
---

# VueUse Integration

> Only suggest if `@vueuse/core` or `@vueuse/nuxt` is in `package.json`.

## Common Replacements

| Pattern | VueUse composable |
|---|---|
| localStorage/sessionStorage | `useLocalStorage`, `useSessionStorage` |
| Debounce/throttle | `refDebounced`, `useDebounceFn`, `refThrottled`, `useThrottleFn` |
| Mouse/scroll tracking | `useMouse`, `useScroll`, `useElementVisibility` |
| Intersection observer | `useIntersectionObserver` |
| Resize observer | `useResizeObserver` |
| Clipboard | `useClipboard` |
| Media queries | `useMediaQuery`, `useDark`, `usePreferredDark` |
| Geolocation | `useGeolocation` |
| Timers | `useInterval`, `useTimeout` |
| Toggle/counter | `useToggle`, `useCounter` |

## When to Suggest

- Detecting bespoke implementations of common patterns above
- Building features that need browser API abstractions
- User asks about utility composables

## When NOT to Suggest

- Library not installed and user didn't ask
- Simple one-off logic that doesn't need a composable
