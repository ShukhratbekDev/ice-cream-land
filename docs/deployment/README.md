# Deployment Guide

This guide outlines the deployment process for the Ice Cream Land e-commerce platform.

## Environment Setup

### Prerequisites

- Node.js 18.x or later
- PostgreSQL 14.x or later
- Git
- Vercel CLI (optional for local deployment testing)

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
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

# Regional Settings
DEFAULT_REGION=UZB
DEFAULT_CURRENCY=UZS
```

### Database Setup

#### Neon PostgreSQL Setup

1. **Production Database**

   - Create new Neon project for production
   - Enable production-ready features:
     - Auto-scaling
     - Automated backups
     - High availability
     - Connection pooling

2. **Environment Setup**

   ```env
   # Production database URL
   DATABASE_URL=postgres://[user]:[password]@[host]/[database]?sslmode=require&pool_timeout=0
   ```

3. **Migration Process**

   ```bash
   # Generate new migration
   npm run drizzle:generate

   # Apply migrations
   npm run drizzle:migrate

   # Seed production data (if needed)
   npm run drizzle:seed
   ```

4. **Backup Strategy**

   - Enable automated backups in Neon dashboard
   - Set appropriate backup frequency
   - Test backup restoration process
   - Document recovery procedures

5. **Monitoring Setup**
   - Enable query insights
   - Set up performance monitoring
   - Configure alert thresholds
   - Monitor connection pools

## Build Process

### Development Build

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

### Production Build

1. Create production build:

```bash
npm run build
```

2. Start production server:

```bash
npm start
```

### Build Optimization

1. **Next.js Optimization**

   - Automatic static optimization
   - Image optimization
   - Code splitting
   - Tree shaking

2. **Performance Considerations**
   - Lazy loading of images
   - Route prefetching
   - API route optimization
   - Database query optimization

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/main.yml`:

````yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: ice_cream_land_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install Dependencies
      run: npm ci

    - name: Run Tests
      run: npm test
      env:
        DATABASE_URL: postgresql://test:test@localhost:5432/ice_cream_land_test
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: ${{ secrets.CLERK_PUBLISHABLE_KEY }}
        CLERK_SECRET_KEY: ${{ secrets.CLERK_SECRET_KEY }}

    - name: Run Linting
      run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v3

    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'

## Testing

> 🚧 **Note**: CI/CD testing pipeline is planned but not yet implemented.

Future test requirements for deployment will include:
- All tests must pass
- Minimum 80% coverage
- No security vulnerabilities
- Performance benchmarks met

Pre-deployment checklist (planned):
1. Run smoke tests
2. Verify database migrations
3. Validate API endpoints
4. Check security compliance

See our [Testing Documentation](../testing/README.md) for future updates.

## Vercel Deployment

1. **Project Setup**
   - Connect your GitHub repository to Vercel
   - Configure environment variables in Vercel dashboard
   - Set up automatic deployments

2. **Environment Configuration**
   - Production database URL
   - Production API keys
   - Regional settings

3. **Deployment Settings**
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm ci`
   - Development command: `npm run dev`

### Monitoring and Logging

1. **Application Monitoring**
   - Vercel Analytics
   - Error tracking (Sentry)
   - Performance monitoring
   - API endpoint monitoring

2. **Database Monitoring**
   - Connection pool metrics
   - Query performance
   - Database size and growth
   - Backup status

3. **Alerts and Notifications**
   - Error rate thresholds
   - Performance degradation
   - Database issues
   - Deployment status

## Security Considerations

1. **Environment Security**
   - Secure environment variables
   - API key rotation
   - Database credential management
   - SSL/TLS configuration

2. **Application Security**
   - Regular dependency updates
   - Security headers configuration
   - CORS policy
   - Rate limiting

3. **Database Security**
   - Connection encryption
   - Backup encryption
   - Access control
   - Query parameterization

## Rollback Procedures

1. **Vercel Rollback**
   ```bash
   vercel rollback
````

2. **Database Rollback**

   ```bash
   npm run db:rollback
   ```

3. **Manual Intervention**
   - Access Vercel dashboard
   - Revert to previous deployment
   - Restore database backup if needed

## Maintenance

1. **Regular Updates**

   - Dependency updates
   - Security patches
   - Feature deployments
   - Database maintenance

2. **Backup Procedures**

   - Database backups
   - Environment configuration backups
   - Code repository backups

3. **Performance Optimization**
   - Regular performance audits
   - Database query optimization
   - Cache optimization
   - CDN configuration

## Troubleshooting

1. **Common Issues**

   - Database connection errors
   - Build failures
   - Authentication issues
   - API endpoint failures

2. **Debug Procedures**

   - Check application logs
   - Review database logs
   - Monitor error tracking
   - Verify environment variables

3. **Support Contacts**
   - Development team
   - Database administrator
   - DevOps team
   - Security team

## Production Considerations

### Scaling Strategies

1. **Database Scaling**

   - Connection pooling optimization
   - Read replicas for heavy queries
   - Database sharding strategy
   - Caching layer implementation

2. **Application Scaling**

   - Horizontal scaling with Vercel
   - CDN configuration
   - Edge functions utilization
   - API route optimization

3. **Cache Strategy**
   - Redis implementation
   - CDN caching rules
   - Static page generation
   - API response caching

### Performance Monitoring

1. **Metrics Collection**

   - Response times
   - Error rates
   - Database performance
   - Cache hit rates

2. **Alerting System**
   - Performance degradation alerts
   - Error spike notifications
   - Database health monitoring
   - SSL certificate expiration

### Disaster Recovery

1. **Backup Strategy**

   ```bash
   # Database backup
   pg_dump -Fc ice_cream_land > backup.dump

   # Restore from backup
   pg_restore -d ice_cream_land backup.dump
   ```

2. **Recovery Procedures**
   - Database restoration
   - Application rollback
   - DNS failover
   - Data consistency verification

## Regional Deployment

### Multi-Region Setup

1. **Database Configuration**

   ```env
   # Primary Region
   DATABASE_URL=postgresql://user:password@primary.host:5432/ice_cream_land

   # Read Replica
   READ_REPLICA_URL=postgresql://user:password@replica.host:5432/ice_cream_land
   ```

2. **CDN Configuration**
   - Regional edge caching
   - Asset optimization
   - Dynamic routing
   - Cache invalidation

### Regional Routing

1. **Geographic Routing**

   ```typescript
   // middleware.ts
   export function middleware(request: NextRequest) {
     const country = request.geo?.country || 'UZ';
     request.nextUrl.searchParams.set('country', country);
     return NextResponse.rewrite(request.nextUrl);
   }
   ```

2. **Content Delivery**
   - Regional asset serving
   - Language-based routing
   - Currency handling
   - Timezone management

## Security Hardening

### Application Security

1. **Headers Configuration**

   ```typescript
   // next.config.js
   const securityHeaders = [
     {
       key: 'X-DNS-Prefetch-Control',
       value: 'on',
     },
     {
       key: 'X-XSS-Protection',
       value: '1; mode=block',
     },
     {
       key: 'X-Frame-Options',
       value: 'SAMEORIGIN',
     },
     {
       key: 'X-Content-Type-Options',
       value: 'nosniff',
     },
     {
       key: 'Referrer-Policy',
       value: 'origin-when-cross-origin',
     },
   ];
   ```

2. **Rate Limiting**

   ```typescript
   import rateLimit from 'express-rate-limit';

   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
   });
   ```

### Database Security

1. **Connection Security**

   ```typescript
   // database.ts
   const pool = new Pool({
     ssl: {
       rejectUnauthorized: false,
       ca: process.env.DB_CA_CERT,
     },
     connectionTimeoutMillis: 5000,
     idleTimeoutMillis: 30000,
   });
   ```

2. **Access Control**
   ```sql
   -- Create read-only user
   CREATE USER readonly WITH PASSWORD 'secure_password';
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly;
   ```

## Database Management

#### ⚠️ Important Database Notes

1. **Single Stage Database**

   - We use a single Neon database for all environments
   - DO NOT run seed commands on the remote database
   - All data changes should be done through the application
   - Backup data before any schema changes

2. **Data Safety**

   - Always test migrations locally first
   - Use transactions for data modifications
   - Never run destructive commands on remote database
   - Coordinate any schema changes with team

3. **Migrations**

   ```bash
   # Local testing
   npm run drizzle:migrate

   # Production - coordinate with team before running
   NODE_ENV=production npm run drizzle:migrate
   ```

## Monitoring Setup

### Application Monitoring

1. **Sentry Integration**

   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 1.0,
     environment: process.env.NODE_ENV,
   });
   ```

2. **Performance Tracking**
   ```typescript
   // Monitor API routes
   export default Sentry.withSentryAPI(async function handler(req: NextApiRequest, res: NextApiResponse) {
     const transaction = Sentry.startTransaction({
       name: 'API Request',
       op: 'http.server',
     });
   });
   ```

### Infrastructure Monitoring

1. **Database Monitoring**

   ```sql
   -- Monitor active connections
   SELECT count(*) FROM pg_stat_activity;

   -- Monitor query performance
   SELECT * FROM pg_stat_statements
   ORDER BY total_exec_time DESC
   LIMIT 10;
   ```

2. **Resource Monitoring**
   - CPU utilization
   - Memory usage
   - Network traffic
   - Disk space

## Maintenance Procedures

### Regular Maintenance

1. **Database Maintenance**

   ```sql
   -- Vacuum analyze
   VACUUM ANALYZE;

   -- Reindex
   REINDEX DATABASE ice_cream_land;
   ```

2. **Dependency Updates**

   ```bash
   # Update dependencies
   npm update

   # Check for vulnerabilities
   npm audit

   # Fix vulnerabilities
   npm audit fix
   ```

### Emergency Procedures

1. **Quick Rollback**

   ```bash
   # Revert deployment
   vercel rollback

   # Restore database
   pg_restore -d ice_cream_land backup.dump
   ```

2. **Incident Response**
   - Error investigation
   - Service restoration
   - Root cause analysis
   - Prevention measures

## Documentation Updates

Remember to keep this deployment documentation updated with:

- New environment variables
- Configuration changes
- Security updates
- Infrastructure modifications
- Performance optimizations
- Monitoring improvements
