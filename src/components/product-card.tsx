import type { ChangeEvent } from "react";
import type { Product } from "@/types/product";
import useCart from "@/store/cart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ProductCard({ product }: { product: Product }) {
  const cartItems = useCart((state) => state.cartItems);
  const addToCart = useCart((state) => state.addToCart);
  const updateCart = useCart((state) => state.updateCart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const quantity =
    cartItems.find((item) => item.id === product.id)?.quantity ?? 0;

  const handleAddToCart = () => {
    if (quantity < product.stock) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        stock: product.stock,
        quantity: 1,
        thumbnail: product.thumbnail,
      });
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      if (quantity === 1) {
        removeFromCart(product.id);
        return;
      }

      updateCart({
        id: product.id,
        name: product.title,
        price: product.price,
        stock: product.stock,
        quantity: quantity - 1,
        thumbnail: product.thumbnail,
      });
    }
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = Number(e.target.value);

    if (Number.isNaN(rawValue)) {
      return;
    }

    const value = Math.min(Math.max(rawValue, 0), product.stock);

    if (value === 0) {
      removeFromCart(product.id);
      return;
    }

    updateCart({
      id: product.id,
      name: product.title,
      price: product.price,
      stock: product.stock,
      quantity: value,
      thumbnail: product.thumbnail,
    });
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
                onClick={handleAddToCart}
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
          <p className="mt-2 text-sm text-center text-muted-foreground">
            Available Stock: {product.stock}
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
