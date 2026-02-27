import { useState, useEffect, useCallback } from 'react';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    setPage: (page: number) => void;
    limit: number;
}

export const useProducts = (initialLimit = 10): UseProductsResult => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const limit = initialLimit;

    const fetchProducts = useCallback(async (currentPage: number) => {
        setLoading(true);
        setError(null);
        try {
            const skip = (currentPage - 1) * limit;
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: ProductsResponse = await response.json();
            setProducts(data.products);
            setTotal(data.total);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }, [limit]);

    useEffect(() => {
        fetchProducts(page);
    }, [page, fetchProducts]);

    return { products, loading, error, total, page, setPage, limit };
};
