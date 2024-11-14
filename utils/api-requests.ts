export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  ingredients: string[];
  category: string;
};
export async function getProducts() {
  const res = await fetch('/api/products');
  return (await res.json()) as Product[];
}
