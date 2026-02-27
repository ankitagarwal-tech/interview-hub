import type { Product } from '../../hooks/useProducts';
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: Product[];
    loading: boolean;
    error: string | null;
}

export const ProductList = ({ products, loading, error }: ProductListProps) => {
    if (error) {
        return (
            <div className="w-full p-8 text-center text-red-500 bg-red-50 rounded-lg">
                <p className="font-semibold">Error loading products</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex flex-col rounded-xl border bg-card shadow overflow-hidden h-[400px] animate-pulse">
                        <div className="w-full aspect-square bg-gray-200" />
                        <div className="p-5 flex flex-col flex-grow gap-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4" />
                            <div className="h-4 bg-gray-200 rounded w-full" />
                            <div className="h-4 bg-gray-200 rounded w-2/3" />
                            <div className="mt-auto pt-4 border-t">
                                <div className="h-10 bg-gray-200 rounded w-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="w-full py-16 text-center text-gray-500">
                <h3 className="text-lg font-medium">No products found</h3>
                <p className="mt-2 text-sm">Try checking back later.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
