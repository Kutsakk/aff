# TDD (Test-Driven Development) Rules

## Red-Green-Refactor Workflow

### Phase 1: RED — Write tests

1. Write **ALL** tests for the module/feature
2. Tests **MUST FAIL** — this is normal and expected
3. Do NOT write implementation code at this stage

> **Note:** Incremental TDD (one test at a time: write one test, make it pass, repeat) is also acceptable. Choose the approach that fits the task — writing all tests upfront works well for well-defined features, while incremental TDD works better for exploratory or complex logic.

```bash
npm test src/users/  # → 0/41 passed
```

### Phase 2: GREEN — Write code

1. Write the **minimum code necessary** to pass tests
2. Run `npm test` after each significant change
3. Continue until all tests are green

```bash
npm test src/users/  # → 41/41 passed
```

### Phase 3: REFACTOR — Improve code

1. Code works, tests are green
2. Improve structure, remove duplication
3. After each change — verify tests still pass

## Black-Box Testing

Tests are written as a **black box** — test behavior, not implementation.

### Test categories

#### 1. Happy Paths
```typescript
it('should return user when found', async () => {
  const user = await service.findById('existing-id');
  expect(user).toMatchObject({ id: 'existing-id', name: 'John' });
});
```

#### 2. Error Paths
```typescript
it('should throw NotFoundException when user not found', async () => {
  await expect(service.findById('non-existing')).rejects.toThrow(NotFoundException);
});
```

#### 3. Corner Cases
```typescript
it('should handle empty string id', async () => {
  await expect(service.findById('')).rejects.toThrow(ValidationError);
});

it('should handle null input gracefully', async () => {
  const result = await service.findByUsername(null as any);
  expect(result).toBeNull();
});
```

## Critical Rules

### Tests MUST NOT change before Green Phase

After writing tests in Red Phase:

- **FORBIDDEN** to change tests to make them pass
- **FORBIDDEN** to delete failing tests
- **FORBIDDEN** to add `.skip` to tests

Code must conform to tests, not the other way around.

### If tests fail — STOP

When tests fail after a code change:

1. **STOP**
2. Report which tests failed and why
3. Propose solutions
4. **WAIT for explicit command** to proceed

```text
BAD:
1. Wrote code
2. Tests failed
3. "Fixed" tests to match the new code
4. Committed

GOOD:
1. Wrote code
2. Tests failed
3. Reported: "Tests X, Y failed because of Z"
4. Proposed solutions
5. Waited for command
6. Fixed code (not tests!)
```

## Mandatory Checks

### Before completing a task

```bash
npm run lint    # Must pass without errors
npm test        # ALL tests must be green
```

Use the project's configured test runner (Jest, Vitest, or Node.js built-in test runner). For TDD workflow, prefer running tests in `--watch` mode for rapid feedback:

```bash
npm test -- --watch           # Jest/Vitest watch mode
npx vitest --watch            # Vitest watch mode
node --test --watch src/      # Node.js built-in test runner
```

### Exceptions (when checks can be skipped)

- Changes to `.md` files
- Changes to `.json`, `.env`, `.gitignore`
- SQL migration changes

## Task Completion Criteria

A task is considered **DONE** only if:

1. `npm run lint` — no errors
2. `npm test` — all tests green
3. Application starts without errors
4. Code follows architectural rules

## Coverage Requirements

| Component | Minimum |
|-----------|---------|
| Services | 80% |
| Repositories | 80% |
| Handlers | 70% |
| Conversations | 70% |
| Utils | 90% |

> **Note:** "Handlers" and "Conversations" are project-specific categories (e.g., Telegram bot handlers/conversations). Adapt coverage categories to your project's architecture.

## TDD Workflow Example

```text
PHASE: Users Module

STEP 1 - RED (write tests):
  users.service.spec.ts (15 tests) → ALL RED
  users.repository.spec.ts (12 tests) → ALL RED
  Total: 27 tests, all failing

STEP 2 - GREEN (write code):
  1. Created users.repository.ts → 12/27 green
  2. Created users.service.ts → 27/27 green

STEP 3 - REFACTOR:
  1. Extracted shared logic into helper
  2. Verified tests → 27/27 green
  3. Done!
```
