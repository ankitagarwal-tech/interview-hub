import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Product } from "@/interface/product"
import { Button } from "./ui/button"
import useProductStore from "@/store/product";
import { Plus, Minus, ShoppingCart } from "lucide-react";

interface ProductCardProps {
    product: Product
}

export function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const addToCart = useProductStore((state) => state.addToCart)
    const removeFromCart = useProductStore((state) => state.removeFromCart)
    const productsInStore = useProductStore((state) => state.addedProducts)

    const cartItem = productsInStore.find(p => p.product.id === product.id)
    const quantity = cartItem ? cartItem.qty : 0

    return (
        <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-square">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                        ${product.price}
                    </span>
                    <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full shadow-sm capitalize">
                        {product.category}
                    </span>
                </div>
            </div>
            <CardHeader className="flex-grow p-4">
                <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                    {product.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="p-4 pt-0 flex flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2 border rounded-md p-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromCart(product.id)}
                        disabled={quantity === 0}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold text-sm">
                        {quantity}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => addToCart(product)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                {quantity > 0 && (
                    <div className="flex items-center text-primary animate-in fade-in zoom-in duration-200">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span className="text-xs font-bold">${(product.price * quantity).toFixed(2)}</span>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}
