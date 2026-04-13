import axiosInstance from "./axios";
import type { ProductsResponse } from "../types/product";

const PRODUCTS_PER_PAGE = 10;

export const fetchProducts = async (
  page: number
): Promise<ProductsResponse> => {
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const response = await axiosInstance.get<ProductsResponse>("/products", {
    params: {
      limit: PRODUCTS_PER_PAGE,
      skip,
    },
  });
  return response.data;
};

export { PRODUCTS_PER_PAGE };
