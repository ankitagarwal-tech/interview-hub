import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";

interface CartIconProps {
  onClick: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { getCartCount } = useCart();
  const count = getCartCount();

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-accent rounded-md transition-colors"
      aria-label="Shopping cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <Badge
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          variant="destructive"
        >
          {count}
        </Badge>
      )}
    </button>
  );
};
