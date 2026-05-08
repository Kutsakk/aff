---
title: Nuxt UI v4 Components Catalog
impact: LOW
type: reference
tags: [nuxt, nuxt-ui, components, dashboard, forms, overlays]
---

# Components Catalog (120+)

## Dashboard (10) — Admin Interfaces

`UDashboardGroup`, `UDashboardSidebar`, `UDashboardPanel`, `UDashboardNavbar`, `UDashboardToolbar`, `UDashboardSearch`, `UDashboardSearchButton`, `UDashboardSidebarCollapse`, `UDashboardSidebarToggle`, `UDashboardResizeHandle`

```vue
<UDashboardGroup>
  <UDashboardSidebar>
    <UNavigationMenu :items="menuItems" />
  </UDashboardSidebar>
  <UDashboardPanel>
    <template #header><UDashboardNavbar /></template>
    <template #body><NuxtPage /></template>
  </UDashboardPanel>
</UDashboardGroup>
```

## Chat / AI (5) — AI SDK v5 Integration

`UChatMessage`, `UChatMessages`, `UChatPalette`, `UChatPrompt`, `UChatPromptSubmit`

```vue
<UChatMessages :messages="messages" :status="status">
  <template #content="{ message }">{{ message.content }}</template>
</UChatMessages>
<UChatPrompt v-model="input" @submit="handleSubmit">
  <UChatPromptSubmit :status="status" />
</UChatPrompt>
```

## Editor (6) — TipTap Rich Text

`UEditor`, `UEditorToolbar`, `UEditorDragHandle`, `UEditorMentionMenu`, `UEditorEmojiMenu`, `UEditorSuggestionMenu`

## Page Layout (15) — Landing Pages

`UPage`, `UPageHeader`, `UPageHero`, `UPageSection`, `UPageGrid`, `UPageColumns`, `UPageFeature`, `UPageCTA`, `UPageCard`, `UPageList`, `UPageLogos`, `UPageAnchors`, `UPageAside`, `UPageBody`, `UPageLinks`

## Content (9) — Docs & Blog

`UBlogPost`, `UBlogPosts`, `UChangelogVersion`, `UChangelogVersions`, `UContentNavigation`, `UContentSearch`, `UContentSearchButton`, `UContentSurround`, `UContentToc`

## Pricing (3) — SaaS Pages

`UPricingPlan`, `UPricingPlans`, `UPricingTable`

## Forms (20)

`UInput`, `UInputDate`, `UInputTime`, `UInputNumber`, `UInputTags`, `UInputMenu`, `USelect`, `USelectMenu`, `UTextarea`, `UCheckbox`, `UCheckboxGroup`, `URadioGroup`, `USwitch`, `USlider`, `UCalendar`, `UColorPicker`, `UPinInput`, `UForm`, `UFormField`, `UFileUpload`, `UAuthForm`

```vue
<UForm :state="state" :schema="schema" @submit="onSubmit">
  <UFormField name="email" label="Email">
    <UInput v-model="state.email" type="email" />
  </UFormField>
  <UButton type="submit">Submit</UButton>
</UForm>
```

## Navigation (8)

`UTabs`, `UBreadcrumb`, `ULink`, `UPagination`, `UCommandPalette`, `UNavigationMenu`, `UStepper`, `UTree`

## Overlays (8)

`UModal`, `UDrawer`, `USlideover`, `UDialog`, `UPopover`, `UDropdownMenu`, `UContextMenu`, `UTooltip`

## Feedback (7)

`UAlert`, `UToast`, `UProgress`, `USkeleton`, `UEmpty`, `UError`, `UBanner`

## Layout (7)

`UCard`, `UContainer`, `UMain`, `UHeader`, `UFooter`, `UFooterColumns`, `USeparator`

## Data (2)

`UTable` (with virtualization), `UScrollArea`

## General (14)

`UButton`, `UAvatar`, `UAvatarGroup`, `UBadge`, `UAccordion`, `UCarousel`, `UChip`, `UCollapsible`, `UIcon`, `UKbd`, `UMarquee`, `UTimeline`, `UUser`, `UApp`

## Color Mode (6)

`UColorModeAvatar`, `UColorModeButton`, `UColorModeImage`, `UColorModeSelect`, `UColorModeSwitch`, `ULocaleSelect`

---

Full docs: [ui.nuxt.com/components](https://ui.nuxt.com/components)
