import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "../hooks/useCart";
import type { CustomerDetails } from "../types/order.types";
import { validateCustomerDetails } from "../utils/validateCustomerDetails";
import { CustomerDetailsForm } from "./CustomerDetailsForm";
import { OrderLineItems } from "./OrderLineItems";

const EMPTY_DETAILS: CustomerDetails = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
};

interface OrderSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderSummaryDialog({ open, onOpenChange }: OrderSummaryDialogProps) {
  const { lineItems, totalPrice, clear } = useCart();
  const [details, setDetails] = useState<CustomerDetails>(EMPTY_DETAILS);
  const [errors, setErrors] = useState<ReturnType<typeof validateCustomerDetails>>({});

  const handleChange = (field: keyof CustomerDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDetails(EMPTY_DETAILS);
      setErrors({});
    }
    onOpenChange(nextOpen);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateCustomerDetails(details);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    toast.success("Order placed successfully!", {
      description: `Thanks ${details.firstName}, your order of $${totalPrice.toFixed(2)} is confirmed.`,
    });
    clear();
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <form onSubmit={handleConfirm} className="flex flex-col gap-5">
          <DialogHeader>
            <DialogTitle>Order summary</DialogTitle>
            <DialogDescription>
              Review your items and enter your details to place the order.
            </DialogDescription>
          </DialogHeader>

          <OrderLineItems lineItems={lineItems} totalPrice={totalPrice} />

          <CustomerDetailsForm
            values={details}
            errors={errors}
            onChange={handleChange}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Confirm order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
