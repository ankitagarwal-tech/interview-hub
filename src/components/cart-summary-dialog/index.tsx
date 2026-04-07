import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCart from "@/store/cart";
import CartSummaryCartStep from "./cart-summary-cart-step";
import CartSummaryCheckoutStep from "./cart-summary-checkout-step";
import CartSummarySuccessStep from "./cart-summary-success-step";
import { validateCheckoutForm } from "./validate-checkout";

type DialogStep = "cart" | "checkout" | "success";

export default function CartSummaryDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<DialogStep>("cart");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [formError, setFormError] = useState("");

  const cartItems = useCart((state) => state.cartItems);
  const addToCart = useCart((state) => state.addToCart);
  const updateCart = useCart((state) => state.updateCart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const resetDialogState = () => {
    setStep("cart");
    setName("");
    setEmail("");
    setBirthDate("");
    setFormError("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetDialogState();
    }
  };

  const handleAdd = (itemId: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item || item.quantity >= item.stock) {
      return;
    }

    addToCart({ ...item, quantity: 1 });
  };

  const handleRemove = (itemId: number) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) {
      return;
    }

    if (item.quantity === 1) {
      removeFromCart(item.id);
      return;
    }

    updateCart({ ...item, quantity: item.quantity - 1 });
  };

  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement>,
    itemId: number,
  ) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!item) {
      return;
    }

    const rawValue = Number(e.target.value);
    if (Number.isNaN(rawValue)) {
      return;
    }

    const value = Math.min(Math.max(rawValue, 0), item.stock);
    if (value === 0) {
      removeFromCart(item.id);
      return;
    }

    updateCart({ ...item, quantity: value });
  };

  const handleGoToCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    setFormError("");
    setStep("checkout");
  };

  const handleSubmitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    const error = validateCheckoutForm(name, email, birthDate);
    if (error) {
      setFormError(error);
      return;
    }

    clearCart();
    setStep("success");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {cartItems.length > 0 && (
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Place Order</Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-2xl">
        {step === "success" ? (
          <CartSummarySuccessStep onClose={() => handleOpenChange(false)} />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                {step === "cart" ? "Cart Summary" : "Your details"}
              </DialogTitle>
              <DialogDescription>
                {step === "cart"
                  ? "Review your items and update quantities before checkout."
                  : "Enter your name, email, and date of birth to complete your order."}
              </DialogDescription>
            </DialogHeader>

            {step === "cart" && (
              <CartSummaryCartStep
                cartItems={cartItems}
                totalAmount={totalAmount}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onQuantityChange={handleQuantityChange}
                onConfirmOrder={handleGoToCheckout}
                onClose={() => handleOpenChange(false)}
              />
            )}

            {step === "checkout" && (
              <CartSummaryCheckoutStep
                name={name}
                email={email}
                birthDate={birthDate}
                formError={formError}
                onNameChange={setName}
                onEmailChange={setEmail}
                onBirthDateChange={setBirthDate}
                onSubmit={handleSubmitOrder}
                onBack={() => {
                  setFormError("");
                  setStep("cart");
                }}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
