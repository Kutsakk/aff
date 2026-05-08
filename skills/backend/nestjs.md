---
name: NestJS Framework
description: Node.js/TypeScript backend framework with dependency injection and modular architecture
version: 1.0.0
category: backend
---

# NestJS Framework Skill

## Quick Reference

- **When to Use:** Building scalable Node.js/TypeScript backend applications with modular architecture
- **Core Strengths:** Dependency injection, modular design, enterprise patterns, comprehensive testing
- **Target Coverage:** Services ≥80%, Controllers ≥70%, E2E ≥60%, Overall ≥75%

---

## Essential Patterns

### Module Architecture

```typescript
@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
```

**Key Principles:**
- Clear module boundaries and responsibilities
- Export only what other modules need
- Import shared modules (AuthModule, PrismaModule)
- Use token-based providers for abstraction

### Dependency Injection

```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashingService: HashingService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(dto.password);
    const user = await this.prisma.user.create({
      data: { ...dto, password: hashedPassword },
    });
    this.eventEmitter.emit('user.created', user);
    return user;
  }
}
```

**Best Practices:**
- Use constructor injection for all dependencies
- Inject interfaces/tokens, not concrete implementations
- Keep services focused on single responsibility
- Emit events for cross-cutting concerns

### DTO Validation

```typescript
export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'StrongP@ss123', minLength: 8 })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: 'Password must contain uppercase, lowercase, number, symbol',
  })
  password: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
```

**Validation Rules:**
- All inputs validated with class-validator decorators
- API documentation via `@ApiProperty`
- Custom error messages for user clarity
- Optional fields with `@IsOptional()`

### Controller Best Practices

```typescript
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(
    @Body(ValidationPipe) dto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return plainToInstance(UserResponseDto, user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(id);
    return plainToInstance(UserResponseDto, user);
  }
}
```

**Controller Checklist:**
- `@ApiTags` for logical grouping
- `@ApiOperation` for endpoint description
- `@ApiResponse` for status codes + types
- `ValidationPipe` for DTO validation
- Guards for authentication/authorization
- Transform responses with DTOs

### Authentication & Authorization

```typescript
// auth/guards/jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return user;
  }
}

// auth/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}

// Usage in controller
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Delete(':id')
async delete(@Param('id') id: string): Promise<void> {
  await this.userService.delete(id);
}
```

**Auth Patterns:**
- JWT strategy with Passport.js
- Role-based access control with custom decorators
- Guard composition for complex rules
- Secure password hashing (bcrypt, argon2)

### Exception Handling

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as Record<string, unknown>).message,
    });
  }
}

// Usage in main.ts
app.useGlobalFilters(new HttpExceptionFilter());
```

**Error Strategy:**
- Global exception filter for consistency
- Domain-specific exceptions (UserNotFoundException)
- Include correlation IDs for debugging
- Log errors with appropriate severity

---

## Testing

```typescript
describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useFactory: mockDeep<PrismaService> },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(PrismaService);
  });

  describe('createUser', () => {
    it('should hash password and create user', async () => {
      const dto = { email: 'test@test.com', password: 'Pass123!' };
      prisma.user.create.mockResolvedValue({ id: '1', ...dto, password: 'hashed' });

      const result = await service.createUser(dto);

      expect(prisma.user.create).toHaveBeenCalled();
      expect(result.id).toBe('1');
    });
  });
});
```

**Test Strategy:**
- Unit tests for services (≥80% coverage)
- Integration tests for repositories
- E2E tests for critical workflows (≥60% coverage)
- Mock external dependencies
- Test error paths and edge cases

---

## Common Anti-Patterns

### Tight Coupling

```typescript
// ❌ Bad: Direct dependency on implementation
@Injectable()
export class UserService {
  async createUser(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10); // Tight coupling!
  }
}

// ✅ Good: Depend on abstraction
@Injectable()
export class UserService {
  constructor(private readonly hashingService: HashingService) {}

  async createUser(dto: CreateUserDto) {
    const hashed = await this.hashingService.hash(dto.password);
  }
}
```

### No Input Validation

```typescript
// ❌ Bad: No validation
@Post()
async create(@Body() body: any) {
  return this.service.create(body);
}

// ✅ Good: Strong typing + validation
@Post()
async create(@Body(ValidationPipe) dto: CreateUserDto): Promise<UserResponseDto> {
  return this.service.create(dto);
}
```

### Exposing Sensitive Data

```typescript
// ❌ Bad: Returns password field
@Get(':id')
async findOne(@Param('id') id: string) {
  return this.userService.findOne(id);
}

// ✅ Good: Use response DTO with @Exclude()
@Get(':id')
@UseInterceptors(ClassSerializerInterceptor)
async findOne(@Param('id') id: string): Promise<UserResponseDto> {
  const user = await this.userService.findById(id);
  return plainToInstance(UserResponseDto, user);
}
```

---

## Performance Patterns

### Caching

```typescript
@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async findById(id: string): Promise<User> {
    const cacheKey = `user:${id}`;
    const cached = await this.cacheManager.get<User>(cacheKey);
    if (cached) return cached;

    const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    await this.cacheManager.set(cacheKey, user, 3600);
    return user;
  }
}
```

### Background Jobs

```typescript
@Processor('email')
export class EmailProcessor {
  @Process('welcome')
  async sendWelcomeEmail(job: Job<{ email: string; name: string }>) {
    const { email, name } = job.data;
    await this.emailService.sendWelcome(email, name);
  }
}

// In service
await this.emailQueue.add('welcome', { email: user.email, name: user.name });
```

### Query Optimization

```typescript
// ❌ Bad: N+1 query problem
const users = await this.prisma.user.findMany();
for (const user of users) {
  user.orders = await this.prisma.order.findMany({ where: { userId: user.id } });
}

// ✅ Good: Use includes
const users = await this.prisma.user.findMany({
  include: { orders: true },
});
```

---

## Integration Checklist

- [ ] Module properly structured with clear boundaries
- [ ] All dependencies injected via constructor
- [ ] DTOs with class-validator decorators
- [ ] Guards for authentication/authorization
- [ ] Exception filters for consistent errors
- [ ] OpenAPI/Swagger documentation
- [ ] Unit tests ≥80% coverage
- [ ] Caching for frequently accessed data
- [ ] Background jobs for async operations

## Quick Commands

```bash
# Generate resources
nest g module users
nest g controller users
nest g service users

# Generate complete CRUD
nest g resource users

# Run tests
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run test:cov       # Coverage report

# Build and run
npm run build
npm run start:dev      # Watch mode
npm run start:prod     # Production
```
