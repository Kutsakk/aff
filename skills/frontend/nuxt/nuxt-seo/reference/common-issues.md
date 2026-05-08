---
title: Nuxt SEO Common Issues
impact: MEDIUM
type: reference
tags: [nuxt, seo, troubleshooting, sitemap, robots, og-image]
---

# Common SEO Issues

| Problem | Cause | Fix |
|---|---|---|
| `/sitemap.xml` 404 | Missing `site.url` | Set `site.url` in config |
| `/robots.txt` missing | Module not installed | `bunx nuxi module add nuxt-robots` |
| OG image error | Satori CSS incompatibility | Use Satori-safe CSS or switch to Chromium |
| Invalid JSON-LD | Bad Schema.org structure | Validate with Google Rich Results Test |
| Duplicate meta tags | Manual + module conflict | Remove manual tags, let modules handle it |
| Wrong canonical URL | Bad `site.url` or trailing slash | Check `site.url` and `trailingSlash` config |
| Staging indexed by Google | No robots blocking | Add staging disallow rule |
| Build errors | Stale cache | Clear `.nuxt`, `node_modules/.cache`, reinstall |

## Sitemap Configuration

```typescript
// nuxt.config.ts — multi-sitemap for large sites
export default defineNuxtConfig({
  sitemap: {
    sitemaps: {
      blog: { sources: ['/api/__sitemap__/blog'] },
      pages: { sources: ['/api/__sitemap__/pages'] },
    },
  },
})
```

## OG Image with `defineOgImage`

```vue
<script setup lang="ts">
// Uses Satori renderer by default (fast, limited CSS)
defineOgImage({
  title: 'My Page Title',
  description: 'Page description',
  // Switch to Chromium for complex layouts:
  // renderer: 'chromium',
})
</script>
```

## Schema.org

```vue
<script setup lang="ts">
useSchemaOrg([
  defineArticle({
    headline: 'Article Title',
    image: '/images/article.jpg',
    datePublished: '2026-01-15',
    author: { name: 'Author Name' },
  }),
])
</script>
```
