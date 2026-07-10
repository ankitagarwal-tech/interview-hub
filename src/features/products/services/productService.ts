import axios from "axios";
import type { ProductsResponse } from "../types/product.types";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export async function fetchProducts(
  limit: number,
  skip: number
): Promise<ProductsResponse> {
  const { data } = await api.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });
  return data;
}
