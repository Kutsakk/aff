---
title: Component Data Flow Best Practices
impact: HIGH
type: best-practice
tags: [vue3, props, emits, v-model, provide-inject, data-flow, typescript]
---

# Component Data Flow

**Core principle: Props Down / Events Up.** One-way flow scales well.

## Props: Read-Only Inputs

Never mutate props in the child. Emit an event, use `v-model`, or create a local copy.

```vue
<!-- ❌ props.count++ -->
<!-- ✅ emit('update:count', props.count + 1) -->
```

## Prefer props/emit over component refs

Use refs only for imperative APIs (e.g., `.focus()`, `.open()`).

```vue
<!-- ❌ Parent reaching into child internals -->
<UserForm ref="formRef" />
<button @click="formRef.value.submit()">Submit</button>

<!-- ✅ Events-based -->
<UserForm @submit="handleSubmit" />
```

When refs are required, expose only the intended API with `defineExpose` and type the ref:

```vue
<!-- Child -->
<script setup lang="ts">
function open() { /* ... */ }
defineExpose({ open })
</script>

<!-- Parent (Vue 3.5+) -->
<script setup lang="ts">
const panelRef = useTemplateRef('panelRef')
// Pre-3.5: const panelRef = ref<InstanceType<typeof DialogPanel> | null>(null)
onMounted(() => panelRef.value?.open())
</script>
<template>
  <DialogPanel ref="panelRef" />
</template>
```

## Emits: Explicit Events Up

Vue events **do not bubble**. Re-emit explicitly through intermediate components.

```vue
<!-- Child.vue -->
<script setup>
const emit = defineEmits(['saved'])
</script>
<template>
  <Grandchild @saved="(p) => emit('saved', p)" />
</template>
```

Event naming: kebab-case in templates (`@update-user`), camelCase in script (`defineEmits(['updateUser'])`).

## `v-model` with `defineModel` (Vue 3.4+)

```vue
<!-- ✅ Modern (3.4+) -->
<script setup>
const model = defineModel({ type: String })
</script>
<template>
  <input v-model="model" />
</template>

<!-- Pre-3.4 fallback -->
<script setup>
const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <input :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>
```

## Provide/Inject: Cross-Tree State

Use for shared context over ~3+ layers. Keep mutations in the provider.

```ts
// Provider
const theme = reactive({ dark: false })
provide(themeKey, readonly(theme))
provide(themeActionsKey, { toggle: () => { theme.dark = !theme.dark } })

// Consumer
const theme = inject(themeKey)        // readonly
const { toggle } = inject(themeActionsKey)
```

Use symbols for keys to avoid collisions:
```ts
export const themeKey: InjectionKey<Readonly<{ dark: boolean }>> = Symbol('theme')
export const themeActionsKey = Symbol('theme-actions')
```

## TypeScript: Type Component Boundaries

Use type-based `defineProps`, `defineEmits`, and `InjectionKey` so invalid payloads fail at compile time.

```vue
<script setup lang="ts">
interface Props { userId: string }
interface Emits { save: [payload: { id: string; draft: boolean }] }

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const settings = inject(settingsKey) // typed via InjectionKey<Settings>
</script>
```
