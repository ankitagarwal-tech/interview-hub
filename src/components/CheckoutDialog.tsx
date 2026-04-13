import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
export default function CheckoutDialog() {
  const { cart, clearCart, totalItems } = useCart();
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  const cartItems = Object.values(cart);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Order placed successfully!");
    clearCart();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={totalItems === 0}>
          Checkout {totalItems > 0 ? `(${totalItems})` : ""}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout Details</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <div className="grid gap-4 py-2">
          <div>
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div>
            <Label>Birth Date</Label>
            <Input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CART SUMMARY */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">Cart Summary</h3>

          {cartItems.length === 0 && (
            <p className="text-sm text-slate-500">No products in cart.</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="flex justify-between text-sm py-1"
            >
              <span>
                {item.product.title} * {item.quantity}
              </span>
              <span>${item.product.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}