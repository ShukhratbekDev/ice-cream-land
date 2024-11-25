import { Product, selectRegionsSchema } from '@/db/schema';

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
  await fetch(`/api/products/${product.id}/like`, { method: 'POST' });
}

export async function unlikeProduct(product: Product) {
  await fetch(`/api/products/${product.id}/unlike`, { method: 'POST' });
}

export async function getLikedProducts() {
  const res = await fetch('/api/me/liked-products');
  return (await res.json()) as Product[];
}
