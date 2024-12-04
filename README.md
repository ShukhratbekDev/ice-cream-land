# Ice Cream Land 🍦

A modern multi-regional e-commerce platform for ice cream sales, built with Next.js 14, TypeScript, and Neon PostgreSQL.

## Features

- 🌍 Multi-Region Support
- 💰 Multi-Currency (USD, UZS)
- 🛒 Shopping Cart Management
- 💳 Secure Checkout Process
- 📱 Responsive Design
- 🔒 Authentication with Clerk
- 📊 Sales Analytics
- 🎨 Modern UI with shadcn/ui
- 🚀 Serverless Architecture
- 🔄 Real-time Updates

## Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Authentication:** Clerk
- **State:** React Query + Zustand
- **Forms:** React Hook Form + Zod

### Backend

- **API:** Next.js API Routes
- **Database:** Neon PostgreSQL (Serverless)
- **ORM:** Drizzle
- **Deployment:** Vercel

### Tools & Services

- **Version Control:** Git
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Analytics:** Vercel Analytics

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ice-cream-land.git
   cd ice-cream-land
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

4. Update environment variables in `.env`:

   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

   DATABASE_URL=
   DIRECT_URL=

   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [Architecture Overview](./docs/architecture/README.md)
- [API Documentation](./docs/api/README.md)
- [Database Schema](./docs/database/README.md)
- [UI Components](./docs/ui/README.md)
- [Testing Guide](./docs/testing/README.md)
- [Deployment Guide](./docs/deployment/README.md)
- [Contributing Guide](./docs/contributing.md)

## Project Structure

```
ice-cream-land-itpu/
├── app/                    # Next.js 14 app directory with app router
│   ├── (auth)/            # Authentication routes and layouts
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── analytics/        # Analytics related components
├── config/               # Configuration files
├── db/                   # Database schema and migrations
├── docs/                 # Project documentation
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared code
├── providers/           # React context providers
├── public/              # Static assets
├── styles/              # Global styles
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── .env.example         # Environment variables template
├── drizzle.config.ts    # Drizzle ORM configuration
├── middleware.ts        # Next.js middleware
├── next.config.mjs      # Next.js configuration
├── package.json         # Project dependencies
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Database Schema

Our database is hosted on Neon PostgreSQL and uses Drizzle ORM. Key tables include:

- `products` - Product information
- `categories` - Product categories
- `orders` - Order details
- `order_items` - Items in each order
- `regions` - Regional settings
- `prices` - Region-specific pricing

> ⚠️ **Note**: We use a single database for all environments. Never run seed commands on the remote database.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guide](./docs/contributing.md) for details on our code of conduct and development process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI Components by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Database hosting by [Neon](https://neon.tech)
- ORM by [Drizzle](https://orm.drizzle.team/)
- Authentication by [Clerk](https://clerk.com/)
- Deployment by [Vercel](https://vercel.com/)
