import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { Plus, Minus } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();

  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <CardTitle className="text-lg">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground">
            Brand: {product.brand}
          </p>
          <p className="text-sm text-muted-foreground">
            Stock: {product.stock}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-sm">⭐ {product.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => removeFromCart(product.id)}
          disabled={quantity === 0}
          className="h-10 w-10"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-semibold min-w-[2rem] text-center">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addToCart(product)}
          className="h-10 w-10"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
