# JavaScript/TypeScript Coding Standards

When reviewing or generating JavaScript/TypeScript code, follow these rules:

## File Naming

- Source files: kebab-case (e.g., `user-service.js`, `api-client.ts`)
- Component files: kebab-case (e.g., `user-profile.js`, `data-table.tsx`)
- Test files: `.test.js` or `.spec.js` suffix (e.g., `user-service.test.js`)
- Type definition files: `.d.ts` suffix (e.g., `api-types.d.ts`)

## Variable Naming

- Variables: camelCase (e.g., `userName`, `isActive`, `totalCount`)
- Constants: UPPER_SNAKE_CASE for true constants (e.g., `MAX_RETRIES`, `API_BASE_URL`)
- Boolean variables: prefix with `is`, `has`, `can`, `should` (e.g., `isLoading`, `hasError`)

## Function Naming

- Functions: camelCase (e.g., `calculateTotal()`, `fetchUserData()`)
- Async functions: prefix with action verb (e.g., `loadUsers()`, `saveDocument()`)
- Event handlers: prefix with `handle` or `on` (e.g., `handleClick`, `onSubmit`)
- Factory functions: prefix with `create` (e.g., `createUser()`, `createConnection()`)

## Class/Constructor Naming

- Classes: PascalCase (e.g., `UserService`, `DataProcessor`, `ApiClient`)
- Interfaces (TS): PascalCase without prefix (e.g., `UserService`, `UserRepository`)
- Type aliases (TS): PascalCase (e.g., `UserResponse`, `ConfigOptions`)
- Enums (TS): PascalCase for enum name, UPPER_SNAKE_CASE for values

## Private Members

- Private fields: use TypeScript `private` keyword or native `#` private fields (e.g., `private data`, `#internalState`)
- Private methods: use TypeScript `private` keyword or native `#` private methods (e.g., `private validateInput()`, `#processData()`)
- Avoid underscore prefix convention (`_name`) — it provides no enforcement and is considered legacy

## Module Organization

- Group imports: external packages first, then internal modules
- Export public API at the bottom of the file
- One class/component per file when possible

## KISS Principle

Keep It Simple, Stupid — simplicity above all.

- Don't add features "for the future"
- Don't create abstractions for a single use case
- Three similar lines are better than a premature abstraction
- Minimum code for the current task

```typescript
// BAD: Over-engineering
class UserValidatorFactory {
  createValidator(type: string): UserValidator {
    return this.validators.get(type) ?? new DefaultValidator();
  }
}

// GOOD: KISS
function validateUser(user: User): boolean {
  return user.name.length > 0 && user.email.includes('@');
}
```
