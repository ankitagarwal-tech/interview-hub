import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
    quantities: Record<number, number>;
    onIncrement: (productId: number) => void;
    onDecrement: (productId: number) => void;
}

export const ProductGrid = ({
    products,
    quantities,
    onIncrement,
    onDecrement,
}: ProductGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    quantity={quantities[product.id] || 0}
                    onIncrement={() => onIncrement(product.id)}
                    onDecrement={() => onDecrement(product.id)}
                />
            ))}
        </div>
    );
};