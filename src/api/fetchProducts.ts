import type { Product } from "@/types/product";

export const PRODUCTS_PAGE_SIZE = 10;

export interface FetchProductsResult {
  products: Product[];
  total: number;
}

const fetchProducts = async (
  page: number = 1,
  limit: number = PRODUCTS_PAGE_SIZE,
): Promise<FetchProductsResult> => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = (await response.json()) as FetchProductsResult;

  return {
    products: data.products,
    total: data.total,
  };
};

export default fetchProducts;
