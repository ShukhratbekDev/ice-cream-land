# Getting Started

This guide will help you set up and run the Ice Cream Land project locally.

## Prerequisites

- Node.js (v18.0.0 or higher)
- pnpm (v8.0.0 or higher)
- PostgreSQL (v14 or higher)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ice-cream-land.git
cd ice-cream-land
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ice_cream_land

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
CLERK_SECRET_KEY=sk_test_your-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Set up Clerk Authentication:
   - Create an account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your API keys to the `.env` file
   - Configure your OAuth providers (if needed)

## Database Setup

For detailed database setup instructions, see our [Database Documentation](./database/README.md).

Quick start:

```bash
# Set up your database URL in .env
DATABASE_URL=postgres://[user]:[password]@[host]/[database]

# Run migrations
npm run drizzle:migrate

# ⚠️ IMPORTANT: Seed data (Development only)
# DO NOT run seed command on the remote database as we use a single stage
# This will override existing production data
# npm run drizzle:seed  # Uncomment only for local development
```

## Testing Setup

> 🚧 **Note**: Testing infrastructure is currently under development. The following commands will be available once implemented.

```bash
# These commands are not yet available
# Stay tuned for updates

# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

For future testing guidelines, see our [Testing Documentation](./testing/README.md).

## UI Components

We use [shadcn/ui](https://ui.shadcn.com/) for our component library. See our [UI Documentation](./ui/README.md) for:

- Available components and usage
- Customization options
- Best practices
- Adding new components

To add a new shadcn/ui component:

```bash
# Install a component
npx shadcn-ui@latest add button

# Install multiple components
npx shadcn-ui@latest add button card form input
```

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm db:push` - Push database changes
- `pnpm db:studio` - Open Drizzle Studio

## Project Structure

```
ice-cream-land/
├── app/                # Next.js app directory
├── components/         # React components
├── db/                # Database schema and migrations
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and configurations
├── providers/         # React context providers
├── public/            # Static assets
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## Development Guidelines

1. **Code Style**

   - Use TypeScript for type safety
   - Follow the ESLint and Prettier configurations
   - Write meaningful commit messages

2. **Component Structure**

   - Keep components small and focused
   - Use custom hooks for logic separation
   - Follow the component naming convention

3. **State Management**

   - Use React Query for server state
   - Use React Context for global state
   - Keep local state in components when possible

4. **Testing**
   - Write unit tests for utilities
   - Write integration tests for components
   - Test error cases and edge scenarios

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure database exists

2. **Build Errors**

   - Clear .next directory
   - Remove node_modules and reinstall
   - Check TypeScript errors

3. **Authentication Issues**
   - Verify NEXTAUTH configuration
   - Check environment variables
   - Clear browser cookies

For more issues, check the [troubleshooting guide](./troubleshooting.md) or open an issue on GitHub.
