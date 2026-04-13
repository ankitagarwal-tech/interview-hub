import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useCart } from "../context/CartContext";
import type { OrderFormData, CartItem } from "../types/product";
import { Calendar } from "./ui/calendar";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function OrderSummaryItem({ item }: { item: CartItem }) {
  const lineTotal = item.product.price * item.quantity;
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="truncate max-w-[200px]">
        {item.product.title} x {item.quantity}
      </span>
      <span className="font-medium">${lineTotal.toFixed(2)}</span>
    </div>
  );
}

export function OrderDialog({ open, onOpenChange }: OrderDialogProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
  };

  const handleClose = () => {
    if (isSubmitted) {
      clearCart();
    }
    setFormData({ firstName: "", lastName: "", email: "", birthDate: "" });
    setErrors({});
    setIsSubmitted(false);
    onOpenChange(false);
  };

  const updateField = (
    field: keyof OrderFormData,
    value: string,
    type?: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 1stjan 2010

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Confirmed!</DialogTitle>
            <DialogDescription>
              Thank you, {formData.firstName}! Your order has been placed
              successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg
                className="size-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              A confirmation email will be sent to {formData.email}.
            </p>
            <p className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</p>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleClose}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Place Your Order</DialogTitle>
          <DialogDescription>
            Review your order and fill in your details.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-40 space-y-2 overflow-y-auto border-b pb-3">
          {items.map((item) => (
            <OrderSummaryItem key={item.product.id} item={item} />
          ))}
        </div>
        <div className="flex items-center justify-between border-b pb-3 font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                aria-invalid={!!errors.firstName}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                aria-invalid={!!errors.lastName}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Birth Date</Label>
            {/* <Input
              id="birthDate"
              // type="date"
              value={formData.birthDate}
              onChange={() => setShowDatePicker(!showDatePicker)}
              aria-invalid={!!errors.birthDate}
              max="2010-01-01"

            /> */}

            <Button onClick={() => setShowDatePicker(!showDatePicker)}>
              {formData.birthDate ? formData.birthDate : "Select the date"}
            </Button>

            {showDatePicker && (
              <Calendar
                mode="single"
                selected={new Date(formData.birthDate)}
                onSelect={(e) =>
                  updateField(
                    "birthDate",
                    e ? new Date(e).toISOString() : new Date().toISOString(),
                  )
                }
                className="rounded-lg border"
              />
            )}

            {errors.birthDate && (
              <p className="text-xs text-destructive">{errors.birthDate}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Confirm Order
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
