# Contributing to Ice Cream Land

Thank you for your interest in contributing to Ice Cream Land! This document provides guidelines and instructions for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18.x or later
- Git
- IDE with TypeScript support (VS Code recommended)

### Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/ice-cream-land-itpu.git
cd ice-cream-land-itpu
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Set up the database:

- Create a new project in [Neon](https://neon.tech)
- Copy the connection string to your `.env` file
- Run migrations:

```bash
npm run drizzle:migrate
```

5. Seed the database:

```bash
npm run drizzle:seed
```

## Code Style Guide

### TypeScript Guidelines

1. **Type Safety**

   - Always use proper TypeScript types
   - Avoid using `any` type
   - Use interfaces for object shapes
   - Implement proper error handling

2. **Naming Conventions**

   - Use PascalCase for components and interfaces
   - Use camelCase for variables and functions
   - Use UPPER_CASE for constants
   - Prefix interfaces with 'I' (e.g., IProduct)

3. **File Structure**
   ```
   components/
   ├── ui/                 # Reusable UI components
   ├── [feature]/         # Feature-specific components
   └── index.ts           # Export all components
   ```

### React Best Practices

1. **Component Structure**

   - One component per file
   - Use functional components
   - Implement proper prop types
   - Keep components small and focused

2. **Hooks Usage**

   - Follow hooks rules
   - Create custom hooks for reusable logic
   - Use proper dependency arrays
   - Implement proper cleanup

3. **State Management**
   - Use local state when possible
   - Implement proper loading states
   - Handle errors gracefully
   - Use proper form validation

### Styling Guidelines

1. **Tailwind CSS**

   - Use utility classes
   - Follow responsive design principles
   - Maintain consistent spacing
   - Use proper color scheme

2. **CSS Modules**
   - Use when Tailwind is insufficient
   - Follow BEM naming convention
   - Keep styles scoped to components
   - Avoid global styles

## Database Development

### Neon PostgreSQL Setup

1. **Project Setup**

   - Create account at [Neon](https://neon.tech)
   - Create new project
   - Copy connection string
   - Add to `.env` as `DATABASE_URL`

2. **Schema Management**

   ```bash
   # Generate migrations
   npm run drizzle:generate

   # Apply migrations
   npm run drizzle:migrate

   # Seed database
   npm run drizzle:seed
   ```

3. **Best Practices**
   - Always create migrations for schema changes
   - Test migrations locally before committing
   - Keep seed data up to date
   - Document schema changes

### Database Guidelines

1. **Schema Design**

   - Use meaningful table names
   - Follow naming conventions
   - Implement proper relationships
   - Add appropriate indexes

2. **Migration Strategy**

   - One change per migration
   - Make migrations reversible
   - Test both up and down migrations
   - Include migration description

3. **Data Seeding**

   - Maintain realistic test data
   - Cover edge cases
   - Include all required relationships
   - Keep seed data minimal

4. **Performance**
   - Optimize queries
   - Use appropriate indexes
   - Monitor query performance
   - Implement connection pooling

### Working with Drizzle ORM

1. **Schema Definition**

   ```typescript
   // Example schema
   export const products = pgTable('products', {
     id: serial('id').primaryKey(),
     name: text('name').notNull(),
     price: decimal('price').notNull(),
     createdAt: timestamp('created_at').defaultNow(),
   });
   ```

2. **Query Guidelines**

   - Use type-safe queries
   - Implement proper error handling
   - Use transactions when needed
   - Optimize for performance

3. **Relationship Handling**

   - Define relationships explicitly
   - Use proper join conditions
   - Handle nullable relationships
   - Implement cascading properly

4. **Testing Database Code**
   - Write integration tests
   - Use test transactions
   - Mock database when appropriate
   - Test edge cases

## Pull Request Process

### 1. Branch Naming

Use the following format:

- `feature/description` for new features
- `fix/description` for bug fixes
- `docs/description` for documentation
- `refactor/description` for code refactoring

### 2. Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### 3. PR Description Template

```markdown
## Description

[Describe the changes made]

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Other (please describe)

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing performed

## Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Dependencies updated
```

### 4. Review Process

1. Submit PR to `development` branch
2. Ensure all checks pass
3. Request review from maintainers
4. Address review comments
5. Await approval and merge

## Development Workflow

### 1. Feature Development

1. Create feature branch
2. Implement changes
3. Write/update tests
4. Update documentation
5. Submit PR

### 2. Bug Fixes

1. Create fix branch
2. Reproduce the bug
3. Write failing test
4. Implement fix
5. Verify tests pass
6. Submit PR

### 3. Documentation Updates

1. Create docs branch
2. Make documentation changes
3. Preview changes locally
4. Submit PR

### 4. Code Review Guidelines

1. **What to Look For**

   - Code style compliance
   - Type safety
   - Test coverage
   - Performance implications
   - Security considerations

2. **Review Process**
   - Read the description
   - Check the code changes
   - Run tests locally
   - Provide constructive feedback
   - Approve or request changes

## Testing Guidelines

### 1. Unit Tests

- Use Jest and React Testing Library
- Test component behavior
- Test custom hooks
- Test utility functions

### 2. Integration Tests

- Test component interactions
- Test API integrations
- Test form submissions
- Test error handling

### 3. E2E Tests

- Use Cypress or Playwright
- Test critical user flows
- Test responsive design
- Test error scenarios

## Continuous Integration

All PRs must pass:

- Linting checks
- Type checking
- Unit tests
- Integration tests
- Build process

## Questions and Support

- Create an issue for bugs
- Use discussions for questions
- Join our Discord community
- Check existing documentation

Remember to keep the codebase clean, documented, and well-tested. Happy contributing!
