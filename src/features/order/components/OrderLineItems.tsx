import { Separator } from "@/components/ui/separator";
import type { CartItem } from "../types/order.types";

export function OrderLineItems({
  lineItems,
  totalPrice,
}: {
  lineItems: CartItem[];
  totalPrice: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="max-h-48 overflow-y-auto pr-1">
        <ul className="flex flex-col gap-3">
          {lineItems.map(({ product, quantity }) => (
            <li key={product.id} className="flex items-center gap-3 text-sm">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="size-10 shrink-0 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="line-clamp-1 font-medium">{product.title}</p>
                <p className="text-xs text-muted-foreground">
                  {quantity} &times; ${product.price.toFixed(2)}
                </p>
              </div>
              <span className="font-semibold">
                ${(quantity * product.price).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
