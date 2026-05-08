---
title: Nuxt Ecosystem Libraries
impact: LOW
type: reference
tags: [nuxt, pinia, vueuse, drizzle, modules]
---

# Ecosystem Libraries

> Check `package.json` before suggesting library-specific features.

## Core (Included by Default)

- **Vue** — Component framework (auto-imported)
- **Vue Router** — File-based routing (managed by Nuxt)
- **Nitro** — Server engine (built into Nuxt)

## Optional Libraries

**State & Utilities:**
- `pinia` / `@pinia/nuxt` — State management → [Pinia docs](https://pinia.vuejs.org/)
- `@vueuse/core` / `@vueuse/nuxt` — Composition utilities → [VueUse docs](https://vueuse.org/)
- `drizzle-orm` — Database ORM → [Drizzle docs](https://orm.drizzle.team/)
- `@nuxthub/core` — Full-stack platform (DB, blob, KV, cache) → [NuxtHub docs](https://hub.nuxt.com/)

**Core Nuxt Modules:**
- `@nuxt/ui` — UI component library → see `nuxt-ui` skill
- `@nuxtjs/seo` — SEO optimization → see `nuxt-seo` skill
- `@nuxt/image` — Image optimization → [docs](https://image.nuxt.com/)
- `@nuxt/content` — File-based CMS → [docs](https://content.nuxt.com/)
- `@nuxtjs/i18n` — Internationalization → [docs](https://i18n.nuxtjs.org/)
- `@nuxt/test-utils` + `vitest` — Testing → see `nuxt-testing` skill

**Other:** `@nuxt/icon`, `@nuxtjs/color-mode`, `@nuxt/eslint`, `@nuxt/fonts`, `@nuxt/scripts`, `nuxt-security` → [Nuxt Modules](https://nuxt.com/modules)
