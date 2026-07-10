import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../hooks/useCart";
import { OrderSummaryDialog } from "./OrderSummaryDialog";

export function PlaceOrderBar() {
  const { totalItems, totalPrice } = useCart();
  const [open, setOpen] = useState(false);

  if (totalItems === 0) return null;

  return (
    <>
      <div className="sticky bottom-0 left-0 z-40 flex items-center justify-between gap-4 border-t bg-background/95 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur sm:px-6">
        <div className="flex items-center gap-2 text-sm">
          <ShoppingCart className="size-4" />
          <span className="font-medium">
            {totalItems} item{totalItems > 1 ? "s" : ""}
          </span>
          <span className="text-muted-foreground">&middot;</span>
          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <Button onClick={() => setOpen(true)}>Place order</Button>
      </div>

      <OrderSummaryDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
