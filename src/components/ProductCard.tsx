import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { CartWithProduct, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function ProductList({
  products,
  onAdd,
  onRemove,
  cart,
}: {
  products: Product[];
  onAdd: (product: Product) => void;
  onRemove: (id: number) => void;
  cart: CartWithProduct;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <Card
          key={product.id}
          className="rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md"
        >
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
              {cart[product.id] ? `Added: (${cart[product.id].quantity})` : ""}
            </p>
            <Button onClick={() => onAdd(product)}>+ </Button>
            <Button
              className="ml-2"
              variant="outline"
              onClick={() => onRemove(product.id)}
            >
              -
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
