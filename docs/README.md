# Ice Cream Land Documentation

Welcome to Ice Cream Land documentation! This guide will help you understand and contribute to our multi-regional ice cream e-commerce platform.

## Table of Contents

1. [Getting Started](./getting-started.md)

   - Prerequisites
   - Installation
   - Environment Setup
   - Quick Start Guide

2. [Architecture](./architecture/README.md)

   - System Overview
   - Tech Stack
   - Design Patterns
   - Database Schema
   - Security Model

3. [Database](./database/README.md)

   - Neon PostgreSQL Setup
   - Schema Design
   - Migrations
   - Seeding
   - Performance Optimization

4. [Components](./components/README.md)

   - UI Components
   - Cart Components
   - Form Components
   - Shared Components
   - Best Practices

5. [API](./api/README.md)

   - Endpoints
   - Authentication
   - Rate Limiting
   - Error Handling
   - API Documentation

6. [Hooks](./hooks/README.md)

   - Custom Hooks
   - State Management
   - Side Effects
   - Best Practices

7. [Testing](./testing/README.md)

   - Unit Tests
   - Integration Tests
   - E2E Tests
   - CI/CD Testing
   - Test Coverage

8. [Deployment](./deployment/README.md)

   - Environment Setup
   - Build Process
   - CI/CD Pipeline
   - Monitoring
   - Security

9. [Contributing](./contributing.md)
   - Code Style Guide
   - Pull Request Process
   - Development Workflow
   - Issue Guidelines

## Quick Links

- [Live Demo](https://ice-cream-land.example.com)
- [GitHub Repository](https://github.com/example/ice-cream-land)
- [Bug Tracker](https://github.com/example/ice-cream-land/issues)
- [API Documentation](https://api.ice-cream-land.example.com/docs)

## Tech Stack

### Frontend

- **Next.js 14** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component Library ([Documentation](./ui/README.md))
- **Clerk** - Authentication

### Backend

- **Next.js API Routes** - Backend API
- **Drizzle ORM** - Database ORM
- **Neon** - Serverless PostgreSQL (Single Stage)
- **Vercel** - Deployment Platform

> ⚠️ **Important Database Note**: We use a single Neon database for all environments. Never run seed commands on the remote database to avoid overriding production data.

### Testing

> 🚧 **Note**: Testing infrastructure is planned but not yet implemented. The following tools will be used:

- **Jest & React Testing Library** - Unit/Integration Tests _(Planned)_
- **Cypress** - E2E Testing _(Planned)_
- **MSW** - API Mocking _(Planned)_
- **Vitest** - Unit Testing Runner _(Planned)_

## Getting Started

See our [Getting Started Guide](./getting-started.md) for setup instructions.

## Contributing

Please read our [Contributing Guide](./contributing.md) before submitting any changes.

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
