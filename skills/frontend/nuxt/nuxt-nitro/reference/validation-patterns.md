---
title: Server Route Input Validation
impact: MEDIUM
type: reference
tags: [nuxt, nitro, validation, zod, h3]
---

# Server Route Validation

Use `readValidatedBody` and `getValidatedQuery` with Zod for type-safe input validation.

## Body Validation

```typescript
// server/api/users/index.post.ts
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    email: z.string().email(),
    name: z.string().min(1),
    role: z.enum(['user', 'admin']).default('user'),
  }).parse)

  // body is typed: { email: string; name: string; role: 'user' | 'admin' }
  return createUser(body)
})
```

## Query Validation

```typescript
// server/api/users/index.get.ts
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(20),
    search: z.string().optional(),
  }).parse)

  return getUsers(query)
})
```

## Route Params + Error Handling

```typescript
// server/api/users/[id].patch.ts
import { z } from 'zod'

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
}).refine(data => Object.keys(data).length > 0, 'At least one field required')

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readValidatedBody(event, updateSchema.parse)

  const user = await updateUser(id, body)
  if (!user) throw createError({ statusCode: 404, statusMessage: 'User not found' })
  return user
})
```

> Zod validation errors automatically return 400 with details. No manual try/catch needed.
