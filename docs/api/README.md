# API Documentation

This directory contains the OpenAPI specification for the Ice Cream Land API.

## Overview

The Ice Cream Land API is a RESTful API that provides endpoints for:

- Product management
- Shopping cart operations
- Order processing
- Multi-region support
- Currency handling (USD, UZS)

## OpenAPI Specification

The complete API specification is available in the [openapi.yaml](./openapi.yaml) file. This specification follows the OpenAPI 3.0.0 standard and includes:

- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements
- Error handling
- Examples

To view the API documentation in a more readable format, you can:

1. Use the [Swagger Editor](https://editor.swagger.io/):

   - Copy the contents of `openapi.yaml`
   - Paste into the editor at https://editor.swagger.io

2. Use Swagger UI locally:

   ```bash
   # Install swagger-ui-watcher globally
   npm install -g swagger-ui-watcher

   # Serve the documentation
   swagger-ui-watcher openapi.yaml
   ```

## Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Base URLs

- Production: `https://api.ice-cream-land.example.com/v1`
- Development: `http://localhost:3000/api`

## Endpoints

### Products

- `GET /products` - List all products
- `POST /products` - Create a new product
- `GET /products/{id}` - Get product details

### Cart

- `GET /cart` - View cart contents
- `POST /cart` - Add item to cart
- `PUT /cart/{id}` - Update cart item
- `DELETE /cart/{id}` - Remove item from cart

### Orders

- `GET /orders` - List orders
- `POST /orders` - Create order
- `GET /orders/{id}` - Get order details

## Error Handling

All errors follow a standard format:

```json
{
  "code": "ERROR_CODE",
  "message": "Human readable error message"
}
```

Common error codes:

- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Invalid input
- `INTERNAL_ERROR` - Server error

## Rate Limiting

API requests are subject to rate limiting:

- Authenticated users: 100 requests per minute
- Unauthenticated users: 20 requests per minute

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

## Versioning

The API uses URL versioning (e.g., `/v1/products`). Breaking changes will be introduced in new API versions.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the API at `http://localhost:3000/api`

## Contributing

Please read our [Contributing Guidelines](../contributing.md) before submitting changes.
