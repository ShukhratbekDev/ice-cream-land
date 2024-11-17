export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  ingredients: string[];
  category: string;
};
export async function getProducts() {
  const res = await fetch('/api/products');
  return (await res.json()) as Product[];
}
