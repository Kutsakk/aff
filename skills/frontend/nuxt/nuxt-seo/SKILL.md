---
name: nuxt-seo
description: All-in-one SEO for Nuxt — robots.txt, sitemaps, OG images, Schema.org, canonical URLs. Use when building SEO-optimized Nuxt apps.
---

# Nuxt SEO

**Status:** Production Ready | **Last Updated:** 2026-02 | **Nuxt Compatibility:** v3 and v4

`@nuxtjs/seo` (v3.4.0) bundles 7 modules: robots, sitemap, og-image, schema-org, link-checker, seo-utils, site-config.

---

## Quick Start

```bash
bunx nuxi module add @nuxtjs/seo
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: 'My Site',
    description: 'Site description',
    defaultLocale: 'en',
  },
  robots: {
    disallow: process.env.NUXT_PUBLIC_ENV === 'staging' ? ['/'] : ['/admin'],
  },
})
```

Verify: visit `/robots.txt` and `/sitemap.xml` after `bun run dev`.

---

## Page-Level SEO

```vue
<script setup lang="ts">
useSeoMeta({
  title: 'Page Title',
  description: 'Page description',
  ogImage: 'https://example.com/og.png',
  twitterCard: 'summary_large_image',
})

// Dynamic/reactive (server variant avoids client overhead)
const { data: post } = await useFetch('/api/post/1')
useServerSeoMeta({
  title: () => post.value?.title ?? '',
  ogImage: () => post.value?.image ?? '',
})
</script>
```

---

## Critical Rules

- **MUST** set `site.url` — sitemaps, canonical URLs, and OG images depend on it
- **MUST** block staging from crawlers — `robots.disallow: ['/']` on non-production
- Add Schema.org to key pages (products, articles, events)
- Use `defineOgImage()` on important pages for social sharing
- Let modules handle meta tags — don't mix manual `<meta>` with module automation

See `reference/common-issues.md` for troubleshooting.

---

## Documentation

- [Nuxt SEO](https://nuxtseo.com/) — Full docs
- [nuxt-sitemap](https://nuxtseo.com/sitemap) | [nuxt-og-image](https://nuxtseo.com/og-image) | [nuxt-schema-org](https://nuxtseo.com/schema-org)
