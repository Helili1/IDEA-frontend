export interface Product {
  _id: string;
  slug: string;
  name: string;
  article?: string;
  category: string;
  price: number;
  oldPrice?: number;
  image?: string;
  colors: string[];
  material?: string;
  dimensions?: { width: number; height: number; depth: number };
  inStock: boolean;
  isNewItem: boolean;
  isHit: boolean;
  description?: string;
}

const API = import.meta.env.VITE_API_URL || '';

export async function fetchProducts(params?: Record<string, string>): Promise<Product[]> {
  const query = params && Object.keys(params).length ? '?' + new URLSearchParams(params) : '';
  const res = await fetch(`${API}/api/products${query}`);
  if (!res.ok) throw new Error('Не удалось загрузить товары');
  return res.json();
}

export async function fetchProduct(slug: string): Promise<Product> {
  const res = await fetch(`${API}/api/products/${slug}`);
  if (!res.ok) throw new Error('Товар не найден');
  return res.json();
}