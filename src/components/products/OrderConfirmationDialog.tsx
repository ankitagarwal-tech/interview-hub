import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppButton } from "@/components/shared/AppButton";
import { AppInputField } from "@/components/shared/AppInputField";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { showOrderPlacedToast } from "@/components/shared/AppToast";
import type { Product } from "@/components/products/ProductCard";

type OrderFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
};

const initialFormValues: OrderFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
};

export const OrderConfirmationDialog = ({
  setQuantities,
  setSelectedProducts,
  selectedItems,
  totalUnits,
}: {
  setQuantities: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setSelectedProducts: React.Dispatch<
    React.SetStateAction<Record<number, Product>>
  >;
  selectedItems: {
    product?: Product;
    quantity: number;
  }[];
  totalUnits: number;
}) => {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [orderFormValues, setOrderFormValues] =
    useState<OrderFormValues>(initialFormValues);

  const handleOrderFormChange = (
    field: keyof OrderFormValues,
    value: string,
  ) => {
    setOrderFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleConfirmOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsOrderDialogOpen(false);
    setQuantities({});
    setSelectedProducts({});
    setOrderFormValues(initialFormValues);
    showOrderPlacedToast();
  };
  const orderTotalAmount = useMemo(
    () =>
      selectedItems.reduce(
        (
          sum: number,
          entry: { product?: { price: number }; quantity: number },
        ) => sum + (entry.product?.price ?? 0) * entry.quantity,
        0,
      ),
    [selectedItems],
  );
  return (
    <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
      <AppButton
        onClick={() => setIsOrderDialogOpen(true)}
        disabled={totalUnits === 0}
      >
        Place Order
      </AppButton>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Summary</DialogTitle>
          <DialogDescription>
            Review items and enter your details to confirm.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
          {selectedItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No products selected yet.
            </p>
          ) : (
            selectedItems.map(
              ({
                product,
                quantity,
              }: {
                product?: { id: number; title: string; price: number };
                quantity: number;
              }) => (
                <div
                  key={product?.id}
                  className="flex items-center justify-between gap-4 border-b border-border/60 pb-2 text-sm last:border-b-0 last:pb-0"
                >
                  <span className="line-clamp-1">{product?.title}</span>
                  <span className="shrink-0 font-medium">
                    {quantity} x ${product?.price.toFixed(2)}
                  </span>
                </div>
              ),
            )
          )}

          <div className="flex items-center justify-between border-t border-border/70 pt-3 text-sm font-semibold">
            <span>Total</span>
            <span>${orderTotalAmount.toFixed(2)}</span>
          </div>
        </div>

        <form className="grid gap-4" onSubmit={handleConfirmOrder}>
          <div className="grid gap-4 sm:grid-cols-2">
            <AppInputField
              id="firstName"
              label="First Name"
              value={orderFormValues.firstName}
              onChange={(event) =>
                handleOrderFormChange("firstName", event.target.value)
              }
              placeholder="John"
              required
            />
            <AppInputField
              id="lastName"
              label="Last Name"
              value={orderFormValues.lastName}
              onChange={(event) =>
                handleOrderFormChange("lastName", event.target.value)
              }
              placeholder="Doe"
              required
            />
          </div>

          <AppInputField
            id="email"
            type="email"
            label="Email ID"
            value={orderFormValues.email}
            onChange={(event) =>
              handleOrderFormChange("email", event.target.value)
            }
            placeholder="john@example.com"
            required
          />

          <AppInputField
            id="birthDate"
            type="date"
            min="2000-01-01"
            label="Birth date"
            value={orderFormValues.birthDate}
            onChange={(event) =>
              handleOrderFormChange("birthDate", event.target.value)
            }
            required
          />

          <DialogFooter>
            <AppButton
              type="submit"
              disabled={selectedItems.length === 0}
              fullWidth
              className="sm:w-auto"
            >
              Confirm Order
            </AppButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
