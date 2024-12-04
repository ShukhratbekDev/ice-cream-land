# API Documentation

This directory contains the OpenAPI specification for the Ice Cream Land API.

## Overview

The Ice Cream Land API provides Next.js API routes for:

- Product listing and details
- Shopping cart management
- Order processing
- User likes management

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

The API uses Clerk for authentication. Protected endpoints require a valid Clerk session.

## Base URL

All API endpoints are relative to: `/api`

## Endpoints

### Products

- `GET /products` - List all products with their categories, ingredients, and user-specific likes
- `GET /products/[id]` - Get detailed product information

### Cart

- `GET /cart` - Get current user's cart with items and product details
- `POST /cart/items` - Add item to cart
- `PUT /cart/items/[id]` - Update cart item quantity
- `DELETE /cart/items/[id]` - Remove item from cart
- `POST /cart/clear` - Clear all items from cart

### Orders

- `POST /orders` - Create a new order

### User

- `GET /me/liked-products` - Get user's liked products

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message"
}
```

Common HTTP Status Codes:

- `401` - Unauthorized (no Clerk session)
- `404` - Resource not found
- `500` - Internal server error

## Data Models

### Product

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    categoryId: string;
    name: string;
  };
  ingredients: {
    name: string;
  }[];
  likes?: {
    userId: string;
  }[];
}
```

### Cart Item

```typescript
interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}
```

## Example Usage

### Fetch Products

```typescript
const response = await fetch('/api/products');
const products = await response.json();
```

### Add to Cart

```typescript
const response = await fetch('/api/cart/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productId: '123',
    quantity: 1,
  }),
});
```

### Update Cart Item

```typescript
const response = await fetch(`/api/cart/items/${itemId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    quantity: 2,
  }),
});
```

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
