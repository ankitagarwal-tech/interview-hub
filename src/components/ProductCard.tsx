import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, incrementItem, decrementItem, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          loading="lazy"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
      </div>

      <CardContent className="space-y-2">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.title}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{"★".repeat(Math.round(product.rating))}</span>
          <span>({product.rating})</span>
        </div>
      </CardContent>

      <CardFooter>
        {quantity === 0 ? (
          <Button
            className="w-full"
            size="sm"
            onClick={() => addItem(product)}
          >
            <Plus className="size-4" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex w-full items-center justify-between">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => decrementItem(product.id)}
            >
              <Minus className="size-4" />
            </Button>
            <span className="text-sm font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => incrementItem(product.id)}
            >
              <Plus className="size-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
