import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchProducts } from "../services/productService";

export const PRODUCTS_PAGE_SIZE = 12;

function productsQueryOptions(page: number) {
  return {
    queryKey: ["products", page] as const,
    queryFn: () => fetchProducts(PRODUCTS_PAGE_SIZE, (page - 1) * PRODUCTS_PAGE_SIZE),
  };
}

export function useProductsQuery(page: number) {
  const queryClient = useQueryClient();
  const query = useQuery({
    ...productsQueryOptions(page),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page so pagination feels instant.
  useEffect(() => {
    if (query.data && page * PRODUCTS_PAGE_SIZE < query.data.total) {
      queryClient.prefetchQuery(productsQueryOptions(page + 1));
    }
  }, [page, query.data, queryClient]);

  return query;
}
