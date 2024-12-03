import { CartItemWithProduct, Product, selectRegionsSchema } from '@/db/schema';

export async function getProducts() {
  const res = await fetch('/api/products');
  return (await res.json()) as Product[];
}

export async function getProduct(id: number) {
  const res = await fetch(`/api/products/${id}`);
  return (await res.json()) as Product;
}

export async function getRegions() {
  const res = await fetch('/api/regions');
  return (await res.json()) as selectRegionsSchema[];
}

export async function likeProduct(product: Product) {
  await fetch(`/api/products/${product.productId}/like`, { method: 'POST' });
}

export async function unlikeProduct(product: Product) {
  await fetch(`/api/products/${product.productId}/unlike`, { method: 'POST' });
}

export async function getLikedProducts() {
  const res = await fetch('/api/me/liked-products');
  return (await res.json()) as Product[];
}

export async function getCart() {
  const res = await fetch('/api/cart');
  return (await res.json()) as Partial<CartItemWithProduct>[];
}

export async function clearCart() {
  const res = await fetch('/api/cart/clear', { method: 'POST' });
  return await res.json();
}

export async function addItemToCart(item: Partial<CartItemWithProduct>) {
  const res = await fetch(`/api/cart/items`, { method: 'POST', body: JSON.stringify(item) });
  return await res.json();
}

export async function updateItemInCart(item: Partial<CartItemWithProduct>) {
  const res = await fetch(`/api/cart/items/${item.productId}`, { method: 'PUT', body: JSON.stringify(item) });
  return await res.json();
}

export async function removeItemFromCart(id: number) {
  const res = await fetch(`/api/cart/items/${id}`, { method: 'DELETE' });
  return await res.json();
}

type CalculatePricePayload = {
  regionId: string;
  price: number;
};

type CalculationResult = {
  originalPrice: number;
  discountAmount: number;
  taxAmount: number;
  finalAmount: number;
  discountPercentage: number;
  taxPercentage: number;
};

export async function fetchFinalPrice(body: CalculatePricePayload) {
  const res = await fetch('/api/calculate-final-price', { method: 'POST', body: JSON.stringify(body) });
  return (await res.json()) as CalculationResult;
}

export type OrderPayload = {
  createdAt: string | Date;
  regionId: string;
};

export async function createOrder(body: OrderPayload) {
  const res = await fetch('/api/orders', { method: 'POST', body: JSON.stringify(body) });
  return await res.json();
}

export async function getAnalytics() {
  const res = await fetch('/api/analytics');
  return await res.json();
}
