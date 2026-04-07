import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/store/cart";

interface CartSummaryLineItemProps {
  item: CartItem;
  onAdd: (itemId: number) => void;
  onRemove: (itemId: number) => void;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>, itemId: number) => void;
}

export default function CartSummaryLineItem({
  item,
  onAdd,
  onRemove,
  onQuantityChange,
}: CartSummaryLineItemProps) {
  return (
    <div className="rounded-md border p-3 grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto_6.5rem] sm:items-center">
      <div className="flex min-w-0 flex-row gap-2 items-center">
        <img width={50} height={50} src={item.thumbnail} alt={item.name} />
        <p className="font-medium truncate" title={item.name}>
          {item.name}
        </p>
        <p className="shrink-0 text-sm text-muted-foreground">
          ${item.price.toFixed(2)} each
        </p>
      </div>
      <div className="flex flex-row gap-2 items-center sm:justify-self-center">
        <Button variant="outline" onClick={() => onRemove(item.id)}>
          -
        </Button>
        <Input
          className="w-20 text-center"
          type="number"
          value={item.quantity}
          onChange={(e) => onQuantityChange(e, item.id)}
        />
        <Button variant="outline" onClick={() => onAdd(item.id)}>
          +
        </Button>
      </div>
      <p className="text-right text-sm font-medium tabular-nums sm:w-[6.5rem]">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}
