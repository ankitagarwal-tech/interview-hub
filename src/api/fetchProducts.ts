import type { Product } from "@/types/product";

const fetchProducts = async (page: number = 1, limit: number = 10) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data.products as Product[];
};

export default fetchProducts;
