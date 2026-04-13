import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Cart, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function ProductList({
  products,
  onAdd,
  onRemove,
  cart,
}: {
  products: Product[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  cart: Cart;
}) {
  console.log("Cart:", cart);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="rounded-2xl shadow-sm">
          <CardHeader>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <CardTitle className="mt-2">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-lg font-semibold">
              ${product.price}{" "}
              {cart[product.id] ? `Added: (${cart[product.id]})` : ""}
            </p>
            <Button onClick={() => onAdd(product.id)}>+ </Button>
            <Button className="ml-2" onClick={() => onRemove(product.id)}>
              -
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
