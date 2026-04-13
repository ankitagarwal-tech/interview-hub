import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartWithProduct, Product } from "@/lib/types";

type CartContextValue = {
  cart: CartWithProduct;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartWithProduct>({});

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart[product.id];

      if (!existingItem) {
        return {
          ...prevCart,
          [product.id]: { product, quantity: 1 },
        };
      }

      return {
        ...prevCart,
        [product.id]: {
          product: existingItem.product,
          quantity: existingItem.quantity + 1,
        },
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart[productId];

      if (!existingItem) {
        return prevCart;
      }

      if (existingItem.quantity <= 1) {
        const updatedCart = { ...prevCart };
        delete updatedCart[productId];
        return updatedCart;
      }

      return {
        ...prevCart,
        [productId]: {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        },
      };
    });
  };

  const clearCart = () => {
    setCart({});
  };

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
