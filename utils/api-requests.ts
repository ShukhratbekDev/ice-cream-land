import { selectProductsSchema, selectRegionsSchema } from '@/db/schema';

type RegionalPrice = {
  regionId: string;
  price: number;
  currency: string;
};

type Option = {
  id: number;
  name: string;
};

export type Product = Omit<selectProductsSchema, 'price' | 'rating'> & {
  ingredients: Option[];
  regionalPrices: RegionalPrice[];
  price: number;
  rating: number;
  category: Option;
  [key: string]: unknown;
};

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
