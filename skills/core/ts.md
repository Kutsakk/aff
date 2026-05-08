# TypeScript

You are an expert TypeScript developer with deep knowledge of modern TypeScript patterns, type system features, and best practices.

## Core Principles

- **Type Safety First**: Always prefer strict type checking and avoid `any` type
- **Inference over Annotation**: Let TypeScript infer types when obvious
- **Immutability**: Prefer `readonly` and `as const` for immutable data
- **Discriminated Unions**: Use tagged unions for complex state management

## Type System

### Utility Types

```typescript
// Built-in utility types — shown here for educational purposes (no need to redefine)
type Partial<T> = { [P in keyof T]?: T[P] };
type Required<T> = { [P in keyof T]-?: T[P] };
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
```

> **Note:** These utility type implementations are educational. They are built into TypeScript and should not be redefined in your code.

### Template Literal Types

```typescript
type EventName = `on${Capitalize<string>}`;
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Endpoint = `/${string}`;
```

### Conditional Types

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

## Best Practices

### Function Signatures

```typescript
// Prefer explicit return types for public APIs
function processData(input: string): ProcessedData {
  // implementation
}

// Use generics for reusable functions
function identity<T>(value: T): T {
  return value;
}
```

### Error Handling

```typescript
// Use Result types instead of throwing
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
```

### Readonly and Immutability

```typescript
// Use readonly for immutable data structures
interface Config {
  readonly apiUrl: string;
  readonly features: readonly string[];
}

// Use as const for literal types
const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const;
```

## Project Structure

- Organize types in dedicated `.types.ts` files
- Use barrel exports (`index.ts`) for clean imports
- Keep type definitions close to their usage
- Use `declare module` for extending third-party types

## Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

> **Note:** `noImplicitAny` and `strictNullChecks` are already included in `strict: true` and do not need to be listed separately.

Always write type-safe code that catches errors at compile time rather than runtime.

## Coding Rules

Note that these are not hard-and-fast rules. If there's a good reason not to apply a rule, don't apply it.

### Alphabetical Order

Maintain alphabetical order for better readability and consistency:

- **Function parameters** — Order by parameter name
- **Object literal fields** — Sort by key name
- **Type definitions** — Arrange fields alphabetically
- **Class properties** — Order by property name

**BAD:**

```typescript
type User = {
  name: string;
  age: number;
  email: string;
};
```

**GOOD:**

```typescript
type User = {
  age: number;
  email: string;
  name: string;
};
```

### Linting (BiomeJS)

Use **BiomeJS** for linting and formatting JavaScript and TypeScript code. Look for a `biome.jsonc` file and, if it's not present, create it.

**Exception:** project already uses ESLint and Prettier.

### Date/Time (dayjs)

Use the **dayjs** library for date calculations. Avoid using the native JavaScript `Date` object.

```typescript
import dayjs from "dayjs";

const now = dayjs();
const tomorrow = now.add(1, "day");
```

> **Future:** The [Temporal API](https://tc39.es/proposal-temporal/docs/) is the upcoming standard for date/time handling in JavaScript. Once it reaches Stage 4 and has broad runtime support, it will be the preferred approach. Until then, `dayjs` remains the recommended library.

### No any type

Never use the `any` type.

### forEach Callbacks

Use block body `{ }` for clarity when callbacks perform side effects. `forEach` ignores return values, so implicit returns can confuse readers.

**BAD:**

```typescript
// implicit return (confusing — looks like .map())
[].forEach((item) => console.log(item));
```

**GOOD:**

```typescript
// block body makes intent clear
[].forEach((item) => {
  console.log(item);
});
```

### TypeScript over JavaScript

Use TypeScript for all new code.

### interface vs type

Use `interface` for object shapes (props, API responses, entity models) — interfaces create cached flat object types, which is better for compiler performance. Prefer `interface extends` over type intersections for composing object shapes. Use `type` for unions, mapped types, and utility types. Be consistent within the project.

### Number.isNaN

**BAD:**

```typescript
const x = isNaN(y);
```

**GOOD:**

```typescript
const x = Number.isNaN(y);
```

### Comment Dividers

Use centered comment dividers for major section breaks.

**Format (80 chars total):**

```typescript
// -------------------------------------------------------------------------- //
//                                   TITLE                                    //
// -------------------------------------------------------------------------- //
```

**Rules:**

- Total width: 80 characters
- Title: UPPERCASE, centered with spaces
- Border line: dashes `-` filling the space between `//` and `//`

**When to use:**

- Major logical sections (imports, types, constants, main logic, exports)
- Separating distinct feature areas
- NOT for every function or small grouping

**Example:**

```typescript
// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Effect } from "effect";

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

type Config = {
  name: string;
};
```

## Advanced Types

Comprehensive guidance for mastering TypeScript's advanced type system including generics, conditional types, mapped types, template literal types, and utility types for building robust, type-safe applications.

**When to use advanced types:**

- Building type-safe libraries or frameworks
- Creating reusable generic components
- Implementing complex type inference logic
- Designing type-safe API clients
- Building form validation systems
- Creating strongly-typed configuration objects
- Implementing type-safe state management
- Migrating JavaScript codebases to TypeScript

### Generics

**Purpose:** Create reusable, type-flexible components while maintaining type safety.

**Basic Generic Function:**

```typescript
function identity<T>(value: T): T {
  return value;
}

const num = identity<number>(42);       // Type: number
const str = identity<string>("hello");  // Type: string
const auto = identity(true);            // Type inferred: boolean
```

**Generic Constraints:**

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): T {
  console.log(item.length);
  return item;
}

logLength("hello");          // OK: string has length
logLength([1, 2, 3]);        // OK: array has length
logLength({ length: 10 });   // OK: object has length
// logLength(42);            // Error: number has no length
```

**Multiple Type Parameters:**

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge(
  { name: "John" },
  { age: 30 }
);
// Type: { name: string } & { age: number }
```

### Conditional Types (Advanced)

**Purpose:** Create types that depend on conditions, enabling sophisticated type logic.

**Basic Conditional Type:**

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
```

**Extracting Return Types:**

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// Type: { id: number; name: string; }
```

**Distributive Conditional Types:**

```typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// Type: string[] | number[]
```

**Nested Conditions:**

```typescript
type TypeName<T> =
  T extends string    ? "string" :
  T extends number    ? "number" :
  T extends boolean   ? "boolean" :
  T extends undefined ? "undefined" :
  T extends (...args: any[]) => any ? "function" :
  "object";

type T1 = TypeName<string>;     // "string"
type T2 = TypeName<() => void>; // "function"
```

### Mapped Types

**Purpose:** Transform existing types by iterating over their properties.

**Basic Mapped Type:**

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Type: { readonly id: number; readonly name: string; }
```

**Optional Properties:**

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type PartialUser = Partial<User>;
// Type: { id?: number; name?: string; }
```

**Key Remapping:**

```typescript
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
  name: string;
  age: number;
}

type PersonGetters = Getters<Person>;
// Type: { getName: () => string; getAge: () => number; }
```

**Filtering Properties:**

```typescript
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
};

interface Mixed {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

type OnlyNumbers = PickByType<Mixed, number>;
// Type: { id: number; age: number; }
```

### Template Literal Types (Advanced)

**Purpose:** Create string-based types with pattern matching and transformation.

**Basic Template Literal:**

```typescript
type EventName = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventName>}`;
// Type: "onClick" | "onFocus" | "onBlur"
```

**String Manipulation:**

```typescript
type UppercaseGreeting = Uppercase<"hello">;    // "HELLO"
type LowercaseGreeting = Lowercase<"HELLO">;    // "hello"
type CapitalizedName = Capitalize<"john">;      // "John"
type UncapitalizedName = Uncapitalize<"John">;  // "john"
```

**Path Building:**

```typescript
type Path<T> = T extends object
  ? { [K in keyof T]: K extends string
    ? `${K}` | `${K}.${Path<T[K]>}`
    : never
  }[keyof T]
  : never;

interface Config {
  server: {
    host: string;
    port: number;
  };
  database: {
    url: string;
  };
}

type ConfigPath = Path<Config>;
// Type: "server" | "database" | "server.host" | "server.port" | "database.url"
```

### Utility Types (Built-in)

```typescript
// Partial<T> - Make all properties optional
type PartialUser = Partial<User>;

// Required<T> - Make all properties required
type RequiredUser = Required<PartialUser>;

// Readonly<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Pick<T, K> - Select specific properties
type UserName = Pick<User, "name" | "email">;

// Omit<T, K> - Remove specific properties
type UserWithoutPassword = Omit<User, "password">;

// Exclude<T, U> - Exclude types from union
type T1 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"

// Extract<T, U> - Extract types from union
type T2 = Extract<"a" | "b" | "c", "a" | "b">;  // "a" | "b"

// NonNullable<T> - Exclude null and undefined
type T3 = NonNullable<string | null | undefined>;  // string

// Record<K, T> - Create object type with keys K and values T
type PageInfo = Record<"home" | "about", { title: string }>;
```

## Advanced Patterns

### Type-Safe Event Emitter

```typescript
type EventMap = {
  "user:created": { id: string; name: string };
  "user:updated": { id: string };
  "user:deleted": { id: string };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: {
    [K in keyof T]?: Array<(data: T[K]) => void>;
  } = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
}

const emitter = new TypedEventEmitter<EventMap>();

emitter.on("user:created", (data) => {
  console.log(data.id, data.name);  // Type-safe!
});

emitter.emit("user:created", { id: "1", name: "John" });
// emitter.emit("user:created", { id: "1" });  // Error: missing 'name'
```

### Type-Safe API Client

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

type EndpointConfig = {
  "/users": {
    GET: { response: User[] };
    POST: { body: { name: string; email: string }; response: User };
  };
  "/users/:id": {
    GET: { params: { id: string }; response: User };
    PUT: { params: { id: string }; body: Partial<User>; response: User };
    DELETE: { params: { id: string }; response: void };
  };
};

type ExtractParams<T> = T extends { params: infer P } ? P : never;
type ExtractBody<T> = T extends { body: infer B } ? B : never;
type ExtractResponse<T> = T extends { response: infer R } ? R : never;

class APIClient<Config extends Record<string, Record<HTTPMethod, any>>> {
  async request<
    Path extends keyof Config,
    Method extends keyof Config[Path]
  >(
    path: Path,
    method: Method,
    ...[options]: ExtractParams<Config[Path][Method]> extends never
      ? ExtractBody<Config[Path][Method]> extends never
        ? []
        : [{ body: ExtractBody<Config[Path][Method]> }]
      : [{
          params: ExtractParams<Config[Path][Method]>;
          body?: ExtractBody<Config[Path][Method]>;
        }]
  ): Promise<ExtractResponse<Config[Path][Method]>> {
    // Implementation here
    throw new Error('Not implemented');
  }
}

const api = new APIClient<EndpointConfig>();

// Type-safe API calls
const users = await api.request("/users", "GET");
// Type: User[]

const newUser = await api.request("/users", "POST", {
  body: { name: "John", email: "john@example.com" }
});
// Type: User

const user = await api.request("/users/:id", "GET", {
  params: { id: "123" }
});
// Type: User
```

### Builder Pattern

```typescript
type BuilderState<T> = {
  [K in keyof T]: T[K] | undefined;
};

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

type IsComplete<T, S> =
  RequiredKeys<T> extends keyof S
    ? S[RequiredKeys<T>] extends undefined
      ? false
      : true
    : false;

class Builder<T, S extends BuilderState<T> = {}> {
  private state: S = {} as S;

  set<K extends keyof T>(
    key: K,
    value: T[K]
  ): Builder<T, S & Record<K, T[K]>> {
    this.state[key] = value;
    return this as unknown as Builder<T, S & Record<K, T[K]>>;
  }

  build(
    this: IsComplete<T, S> extends true ? this : never
  ): T {
    return this.state as T;
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

const builder = new Builder<User>();

const user = builder
  .set("id", "1")
  .set("name", "John")
  .set("email", "john@example.com")
  .build();  // OK: all required fields set

// const incomplete = builder
//   .set("id", "1")
//   .build();  // Error: missing required fields
```

### Deep Readonly/Partial

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends (...args: any[]) => any
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? T[P] extends Array<infer U>
      ? Array<DeepPartial<U>>
      : DeepPartial<T[P]>
    : T[P];
};

interface Config {
  server: {
    host: string;
    port: number;
    ssl: {
      enabled: boolean;
      cert: string;
    };
  };
  database: {
    url: string;
    pool: {
      min: number;
      max: number;
    };
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// All nested properties are readonly

type PartialConfig = DeepPartial<Config>;
// All nested properties are optional
```

### Type-Safe Form Validation

```typescript
type ValidationRule<T> = {
  validate: (value: T) => boolean;
  message: string;
};

type FieldValidation<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

type ValidationErrors<T> = {
  [K in keyof T]?: string[];
};

class FormValidator<T extends Record<string, any>> {
  constructor(private rules: FieldValidation<T>) {}

  validate(data: T): ValidationErrors<T> | null {
    const errors: ValidationErrors<T> = {};
    let hasErrors = false;

    for (const key in this.rules) {
      const fieldRules = this.rules[key];
      const value = data[key];

      if (fieldRules) {
        const fieldErrors: string[] = [];

        for (const rule of fieldRules) {
          if (!rule.validate(value)) {
            fieldErrors.push(rule.message);
          }
        }

        if (fieldErrors.length > 0) {
          errors[key] = fieldErrors;
          hasErrors = true;
        }
      }
    }

    return hasErrors ? errors : null;
  }
}

interface LoginForm {
  email: string;
  password: string;
}

const validator = new FormValidator<LoginForm>({
  email: [
    {
      validate: (v) => v.includes("@"),
      message: "Email must contain @"
    },
    {
      validate: (v) => v.length > 0,
      message: "Email is required"
    }
  ],
  password: [
    {
      validate: (v) => v.length >= 8,
      message: "Password must be at least 8 characters"
    }
  ]
});

const errors = validator.validate({
  email: "invalid",
  password: "short"
});
// Type: { email?: string[]; password?: string[]; } | null
```

### Discriminated Unions

```typescript
type Success<T> = {
  status: "success";
  data: T;
};

type ErrorState = {
  status: "error";
  error: string;
};

type Loading = {
  status: "loading";
};

type AsyncState<T> = Success<T> | ErrorState | Loading;

function handleState<T>(state: AsyncState<T>): void {
  switch (state.status) {
    case "success":
      console.log(state.data);   // Type: T
      break;
    case "error":
      console.log(state.error);  // Type: string
      break;
    case "loading":
      console.log("Loading...");
      break;
  }
}

// Type-safe state machine
type State =
  | { type: "idle" }
  | { type: "fetching"; requestId: string }
  | { type: "success"; data: unknown }
  | { type: "error"; error: Error };

type Event =
  | { type: "FETCH"; requestId: string }
  | { type: "SUCCESS"; data: unknown }
  | { type: "ERROR"; error: Error }
  | { type: "RESET" };

function reducer(state: State, event: Event): State {
  switch (state.type) {
    case "idle":
      return event.type === "FETCH"
        ? { type: "fetching", requestId: event.requestId }
        : state;
    case "fetching":
      if (event.type === "SUCCESS") {
        return { type: "success", data: event.data };
      }
      if (event.type === "ERROR") {
        return { type: "error", error: event.error };
      }
      return state;
    case "success":
    case "error":
      return event.type === "RESET" ? { type: "idle" } : state;
  }
}
```

## Type Inference

### infer Keyword

```typescript
// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

type NumArray = number[];
type Num = ElementType<NumArray>;  // number

// Extract promise type
type PromiseType<T> = T extends Promise<infer U> ? U : never;

type AsyncNum = PromiseType<Promise<number>>;  // number

// Extract function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

function foo(a: string, b: number) {}
type FooParams = Parameters<typeof foo>;  // [string, number]
```

### Type Guards

```typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isArrayOf<T>(
  value: unknown,
  guard: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

const data: unknown = ["a", "b", "c"];

if (isArrayOf(data, isString)) {
  data.forEach(s => s.toUpperCase());  // Type: string[]
}
```

### Assertion Functions

```typescript
function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("Not a string");
  }
}

function processValue(value: unknown) {
  assertIsString(value);
  // value is now typed as string
  console.log(value.toUpperCase());
}
```

## Best Practices Summary

- Use `unknown` over `any`: Enforce type checking
- Use `interface` for object shapes (props, API responses, entities): cached flat types (better compiler performance), clearer error messages, and extendable via `extends`
- Use `type` for unions, mapped types, and utility types: more flexible for non-object-shape composition
- **Leverage type inference**: Let TypeScript infer when possible
- **Create helper types**: Build reusable type utilities
- **Use const assertions**: Preserve literal types
- **Avoid type assertions**: Use type guards instead
- **Document complex types**: Add JSDoc comments
- **Use strict mode**: Enable all strict compiler options
- **Test your types**: Use type tests to verify type behavior

## Type Testing

```typescript
// Type assertion tests
type AssertEqual<T, U> =
  [T] extends [U]
    ? [U] extends [T]
      ? true
      : false
    : false;

type Test1 = AssertEqual<string, string>;          // true
type Test2 = AssertEqual<string, number>;          // false
type Test3 = AssertEqual<string | number, string>; // false

// Expect error helper
type ExpectError<T extends never> = T;

// Example usage
type ShouldError = ExpectError<AssertEqual<string, number>>;
```

## Common Pitfalls

- **Over-using `any`**: Defeats the purpose of TypeScript
- **Ignoring strict null checks**: Can lead to runtime errors
- **Too complex types**: Can slow down compilation
- **Not using discriminated unions**: Misses type narrowing opportunities
- **Forgetting `readonly` modifiers**: Allows unintended mutations
- **Circular type references**: Can cause compiler errors
- **Not handling edge cases**: Like empty arrays or null values

## Performance

- Avoid deeply nested conditional types
- Use simple types when possible
- Cache complex type computations
- Limit recursion depth in recursive types
- Use build tools to skip type checking in production

## Modern TypeScript (5.x)

### `satisfies` Operator

The `satisfies` operator validates that a value conforms to a type without widening it, preserving the narrowest inferred type.

```typescript
type ColorMap = Record<string, string | number[]>;

// With `satisfies`, TypeScript checks the type but preserves literal inference
const colors = {
  red: "#ff0000",
  green: [0, 255, 0],
} satisfies ColorMap;

colors.red.toUpperCase();     // OK — TypeScript knows it's a string
colors.green.map((c) => c);   // OK — TypeScript knows it's number[]
```

### `using` / `await using` (Explicit Resource Management)

Automatically disposes resources when they go out of scope. Requires `Symbol.dispose` / `Symbol.asyncDispose`.

```typescript
function openConnection(): Disposable {
  const conn = createConnection();
  return {
    [Symbol.dispose]() {
      conn.close();
    },
  };
}

{
  using conn = openConnection();
  // use conn...
} // conn[Symbol.dispose]() called automatically

// Async version
async function openFile(): AsyncDisposable {
  const handle = await fs.open("file.txt");
  return {
    async [Symbol.asyncDispose]() {
      await handle.close();
    },
  };
}

{
  await using file = await openFile();
  // use file...
} // file[Symbol.asyncDispose]() called automatically
```

### `const` Type Parameters

Infer literal types from generic arguments without requiring `as const` at the call site.

```typescript
function createRoutes<const T extends readonly string[]>(routes: T): T {
  return routes;
}

// Without `const`: T is string[]
// With `const`: T is readonly ["home", "about", "contact"]
const routes = createRoutes(["home", "about", "contact"]);
```

### `NoInfer<T>` Utility Type

Prevents TypeScript from inferring a type parameter from a specific position.

```typescript
function createFSM<S extends string>(config: {
  initial: NoInfer<S>;
  states: S[];
}) {
  return config;
}

// "initial" is NOT used for inference — only "states" determines S
createFSM({
  initial: "idle",           // checked against S, but doesn't infer S
  states: ["idle", "active"] // this infers S = "idle" | "active"
});

createFSM({
  initial: "unknown",        // Error: "unknown" is not in S
  states: ["idle", "active"]
});
```

## Resources

- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Type Challenges**: https://github.com/type-challenges/type-challenges
- **Total TypeScript**: https://www.totaltypescript.com/
- **Effective TypeScript**: 2nd Edition (2024) by Dan Vanderkam
