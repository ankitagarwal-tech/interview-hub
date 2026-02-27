import { useCart } from '../../context/CartContext';
import type { Product } from '../../hooks/useProducts';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { addToCart, removeFromCart, getQuantity } = useCart();
    const quantity = getQuantity(product.id);

    return (
        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow overflow-hidden h-full">
            <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center p-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="object-contain h-full w-full"
                />
                {product.discountPercentage > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                        -{Math.round(product.discountPercentage)}%
                    </div>
                )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
                        {product.title}
                    </h3>
                    <span className="font-bold text-lg whitespace-nowrap">
                        ${product.price}
                    </span>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 border-t w-full">
                    {quantity > 0 ? (
                        <div className="flex items-center justify-between w-full h-10 bg-gray-50 rounded-lg p-1 border">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-gray-200 text-gray-600 rounded-md"
                                onClick={() => removeFromCart(product.id)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <div className="flex flex-col items-center justify-center min-w-[3rem]">
                                <span className="font-semibold text-sm">{quantity}</span>
                                <span className="text-[10px] text-gray-500 uppercase font-medium leading-none">in cart</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-gray-200 text-gray-600 rounded-md"
                                onClick={() => addToCart(product)}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="w-full h-10 flex items-center gap-2 group transition-all"
                            onClick={() => addToCart(product)}
                        >
                            <Plus className="h-4 w-4 transition-transform group-hover:scale-125 group-active:scale-90" />
                            <span>Add to Cart</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
