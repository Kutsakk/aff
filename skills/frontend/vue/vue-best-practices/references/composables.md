---
title: Composable Organization Patterns
impact: MEDIUM
type: best-practice
tags: [vue3, composables, composition-api, code-organization, api-design, readonly]
---

# Composable Organization Patterns

## Compose from Smaller Primitives

Break complex behavior into small, focused composables that build on each other.

```ts
// composables/useEventListener.ts
export function useEventListener(target: EventTarget, event: string, cb: EventListener) {
  onMounted(() => toValue(target).addEventListener(event, cb))
  onUnmounted(() => toValue(target).removeEventListener(event, cb))
}

// composables/useMouse.ts — builds on useEventListener
export function useMouse() {
  const x = ref(0), y = ref(0)
  useEventListener(window, 'mousemove', (e: MouseEvent) => {
    x.value = e.pageX; y.value = e.pageY
  })
  return { x, y }
}

// composables/useMouseInElement.ts — builds on useMouse
export function useMouseInElement(el: Ref<HTMLElement | null>) {
  const { x, y } = useMouse()
  const isOutside = computed(() => {
    if (!el.value) return true
    const r = el.value.getBoundingClientRect()
    return x.value < r.left || x.value > r.right || y.value < r.top || y.value > r.bottom
  })
  return { x, y, isOutside }
}
```

## Use Options Object for Multiple Parameters

```ts
interface UseFetchOptions {
  method?: string
  timeout?: number
  retries?: number
  immediate?: boolean
}

export function useFetch(url: string, options: UseFetchOptions = {}) {
  const { method = 'GET', timeout = 30000, retries = 0, immediate = true } = options
  // ...
}
```

## Return Readonly State with Explicit Actions

```ts
export function useCart() {
  const _items = ref<CartItem[]>([])
  const total = computed(() => _items.value.reduce((sum, i) => sum + i.price * i.qty, 0))

  function addItem(product: Product, qty = 1) {
    const existing = _items.value.find(i => i.id === product.id)
    if (existing) { existing.qty += qty; return }
    _items.value.push({ ...product, qty })
  }

  function removeItem(id: string) {
    _items.value = _items.value.filter(i => i.id !== id)
  }

  return { items: readonly(_items), total, addItem, removeItem }
}
```

## Keep Utilities as Plain Functions

If there's no reactive state or lifecycle hooks, it's a utility, not a composable.

```ts
// ❌ export function useFormatters() { return { formatDate, formatCurrency } }
// ✅ utils/formatters.ts
export const formatDate = (d: Date) => new Intl.DateTimeFormat('en-US').format(d)
export const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
```

## Organize Code by Feature Concern

Extract composables when components grow. Group related state/logic together.

```vue
<script setup>
const { items, loading, fetchItems } = useItems()
const { query, visibleItems } = useSearch(items)
const { selectedItem, isModalOpen, selectItem } = useSelectionModal()
</script>
```
