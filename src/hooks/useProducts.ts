import { useState, useEffect } from 'react';
import { ProductsResponse } from '../types/product';

export const useProducts = (page: number, limit: number) => {
    const [data, setData] = useState<ProductsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const skip = (page - 1) * limit;
                const response = await fetch(
                    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [page, limit]);

    return { data, loading, error };
};