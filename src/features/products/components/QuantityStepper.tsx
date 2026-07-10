import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/order/hooks/useCart";
import type { Product } from "../types/product.types";

export function QuantityStepper({ product }: { product: Product }) {
  const { getQuantity, increment, decrement } = useCart();
  const quantity = getQuantity(product.id);

  return (
    <div className="flex items-center justify-center gap-3 rounded-md border bg-muted/40 py-1.5">
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={`Remove one ${product.title}`}
        disabled={quantity === 0}
        onClick={() => decrement(product.id)}
      >
        <Minus />
      </Button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums">
        {quantity}
      </span>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label={`Add one ${product.title}`}
        onClick={() => increment(product)}
      >
        <Plus />
      </Button>
    </div>
  );
}
