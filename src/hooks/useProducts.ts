import { useState, useEffect, useCallback } from "react";
import { fetchProducts } from "../api/product";
import type { Product } from "../types/product";

interface UseProductsReturn {
  products: Product[];
  total: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  setPage: (page: number) => void;
}

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProducts(page);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch products";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage, loadProducts]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { products, total, currentPage, isLoading, error, setPage };
}
