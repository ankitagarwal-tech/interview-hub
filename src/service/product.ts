import type { ApiResponse, Product } from "@/interface/product";

export function getProducts(limit: number = 10, skip: number = 0): Promise<ApiResponse<Product>> {
    return fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`).then(d => d.json())
}