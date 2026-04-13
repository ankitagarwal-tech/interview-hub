import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { OrderDialog } from "../components/OrderDialog";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, totalItems, totalPrice, incrementItem, decrementItem } =
    useCart();
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <ShoppingBag className="size-16 text-muted-foreground" />
        <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add some products to get started.
        </p>
        <Link to="/products" className="mt-6">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl">
        Shopping Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <Card key={product.id} className="flex-row items-center p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="size-20 shrink-0 rounded-lg object-cover"
              />
              <CardContent className="flex flex-1 flex-col gap-2 p-0 px-4">
                <h3 className="font-semibold">{product.title}</h3>
                <p className="text-sm text-muted-foreground">
                  ${product.price.toFixed(2)} each
                </p>
              </CardContent>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => decrementItem(product.id)}
                >
                  {quantity === 1 ? (
                    <Trash2 className="size-3" />
                  ) : (
                    <Minus className="size-3" />
                  )}
                </Button>
                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon-sm"
                  onClick={() => incrementItem(product.id)}
                >
                  <Plus className="size-3" />
                </Button>
              </div>
              <p className="ml-4 w-20 text-right font-semibold">
                ${(product.price * quantity).toFixed(2)}
              </p>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Items ({totalItems})
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={() => setOrderDialogOpen(true)}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <OrderDialog
        open={orderDialogOpen}
        onOpenChange={setOrderDialogOpen}
      />
    </div>
  );
}

export default Cart;
