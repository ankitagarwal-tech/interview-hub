import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import type { CartItem } from "@/store/cart";
import CartSummaryLineItem from "./cart-summary-line-item";

interface CartSummaryCartStepProps {
  cartItems: CartItem[];
  totalAmount: number;
  onAdd: (itemId: number) => void;
  onRemove: (itemId: number) => void;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>, itemId: number) => void;
  onConfirmOrder: () => void;
  onClose: () => void;
}

export default function CartSummaryCartStep({
  cartItems,
  totalAmount,
  onAdd,
  onRemove,
  onQuantityChange,
  onConfirmOrder,
  onClose,
}: CartSummaryCartStepProps) {
  return (
    <>
      <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
        {cartItems.length === 0 && (
          <div className="py-12">
            <p className="text-center text-lg font-semibold text-muted-foreground">
              Your cart is empty.
            </p>
          </div>
        )}

        {cartItems.map((item) => (
          <CartSummaryLineItem
            key={item.id}
            item={item}
            onAdd={onAdd}
            onRemove={onRemove}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>

      {cartItems.length > 0 && (
        <DialogFooter className="sm:justify-end">
          <div className="w-full">
            <p className="text-right text-base font-semibold mr-2">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <div className="mt-5 flex justify-center">
              <Button
                type="button"
                className="cursor-pointer"
                onClick={onConfirmOrder}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </DialogFooter>
      )}
      {cartItems.length === 0 && (
        <DialogFooter className="sm:justify-center">
          <Button type="button" className="cursor-pointer" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      )}
    </>
  );
}
