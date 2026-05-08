---
name: Prisma Development
description: Prisma ORM for Node.js/TypeScript — schema design, migrations, and query patterns
version: 0.1.6
category: backend
---

# Prisma Development

Configure and work with Prisma ORM in Node.js/TypeScript projects, focusing on schema design, migrations, and query patterns.

---

## Project Structure

```
project/
├── prisma/
│   ├── schema.prisma      # Main schema file
│   ├── migrations/        # Migration history (managed by prisma migrate)
│   │   ├── 20240101_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── seed.ts           # Optional seed script
├── node_modules/
│   └── .prisma/client/   # Generated client
└── package.json
```

---

## Core Commands

| Command | Purpose |
|---------|---------|
| `npx prisma init` | Initialize Prisma in a project |
| `npx prisma generate` | Generate Prisma Client from schema |
| `npx prisma db push` | Push schema to database (no migration) |
| `npx prisma migrate dev` | Create and apply migration (dev) |
| `npx prisma migrate deploy` | Apply migrations (production) |
| `npx prisma studio` | Open database GUI |
| `npx prisma format` | Format schema file |

---

## Migration Safety

**Important:** Never manually create `.sql` files in `prisma/migrations/`.

Always use the Prisma CLI:

```bash
# Create a new migration (interactive - names the migration)
npx prisma migrate dev --name descriptive_name

# Create migration without applying (for review)
npx prisma migrate dev --create-only --name descriptive_name
```

### PostgreSQL Constraint Names

PostgreSQL truncates identifier names to **63 characters**. Always use short names for constraints:

```prisma
// ❌ Bad: name too long, will be silently truncated
@@unique([trainerProfileId, sportId, weekday, type])

// ✅ Good: explicit short name
@@unique([trainerProfileId, sportId, weekday, type], map: "twa_profile_sport_weekday_type_key")
```

### Resolving Failed Migrations

```bash
# Mark migration as rolled back
npx prisma migrate resolve --rolled-back "migration_name"

# Mark migration as applied
npx prisma migrate resolve --applied "migration_name"

# Execute raw SQL
npx prisma db execute --stdin --schema=./prisma/schema.prisma
```

---

## Common Workflows

### Initial Setup

```bash
npx prisma init
# Configure datasource in schema.prisma
# Add models to schema.prisma
npx prisma generate
npx prisma db push
```

### Schema Changes

1. Modify `schema.prisma`
2. Run `npx prisma migrate dev --name change_description`
3. Prisma Client auto-regenerates
4. Update application code if needed

### Production Deployment

```bash
npx prisma migrate deploy
npx prisma generate
```

---

## Query Patterns

### Relations with `connect`

```typescript
// ✅ Correct: use connect for relations
await prisma.trainerProfile.update({
  where: { id },
  data: {
    city: { connect: { id: cityId } },
    district: { connect: { id: districtId } },
  },
});

// ❌ Wrong: direct FK assignment may fail depending on schema
await prisma.trainerProfile.update({
  where: { id },
  data: { cityId, districtId },
});
```

### Avoiding N+1 Queries

```typescript
// ❌ Bad: N+1
const users = await prisma.user.findMany();
for (const user of users) {
  user.orders = await prisma.order.findMany({ where: { userId: user.id } });
}

// ✅ Good: include
const users = await prisma.user.findMany({
  include: { orders: true },
});
```

### Batch Operations

```typescript
// Use groupBy instead of per-record COUNT
const counts = await prisma.booking.groupBy({
  by: ['trainerId'],
  _count: true,
});
```

---

## Troubleshooting

### DROP INDEX vs DROP CONSTRAINT

If an index backs a constraint, you cannot drop the index directly:

```sql
-- First drop the constraint
ALTER TABLE "table_name" DROP CONSTRAINT IF EXISTS "constraint_name";
-- Index is removed automatically
```

### Common Issues

- **Migration drift:** `npx prisma migrate diff` to compare schema vs database
- **Client out of sync:** `npx prisma generate` to regenerate
- **Shadow database errors:** Ensure dev database user has `CREATE DATABASE` permission

---

## Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma GitHub](https://github.com/prisma/prisma)
- [Prisma Examples](https://github.com/prisma/prisma-examples)
