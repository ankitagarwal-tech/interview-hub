import { Minus, Plus, Star } from 'lucide-react';
import type { Product } from '@/types/product';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
    product: Product;
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

export const ProductCard = ({
    product,
    quantity,
    onIncrement,
    onDecrement
}: ProductCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                        -{product.discountPercentage.toFixed(0)}%
                    </Badge>
                )}
            </div>

            <CardContent className="p-4 flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 flex-grow">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                    {product.description}
                </p>

                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                        <span className="text-sm text-slate-500 line-through">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <span className="text-xs">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onDecrement}
                        disabled={quantity === 0}
                        className="h-9 w-9"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>

                    <span className="font-semibold text-lg w-8 text-center">
                        {quantity}
                    </span>

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={onIncrement}
                        disabled={quantity >= product.stock}
                        className="h-9 w-9"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {quantity > 0 && (
                    <span className="text-sm font-medium text-slate-700">
                        ${(product.price * quantity).toFixed(2)}
                    </span>
                )}
            </CardFooter>
        </Card>
    );
};