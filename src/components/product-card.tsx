import type { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(0);

  //   product.stock is the maximum quantity of the product that can be added to the cart
  const handleAddToCart = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  //   product.stock is the maximum quantity of the product that can be added to the cart
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > product.stock) {
      setQuantity(product.stock);
    } else {
      setQuantity(value);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardContent>
          <img src={product.thumbnail} alt={product.title} />
          <div className="flex flex-row text-center justify-center items-center">
            <p className="text-lg font-bold">$ {product.price}</p>
          </div>
          {quantity > 0 && (
            <div className="flex flex-row gap-2 mt-2">
              <Button
                className="cursor-pointer"
                onClick={handleRemoveFromCart}
                variant="outline"
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <Button
                className="cursor-pointer"
                onClick={handleQuantityChange}
                variant="outline"
              >
                +
              </Button>
            </div>
          )}
          {quantity === 0 && (
            <Button
              variant="outline"
              className="w-full mt-2 hover:bg-primary hover:text-white cursor-pointer"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
