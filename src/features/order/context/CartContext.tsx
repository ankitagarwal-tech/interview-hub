import { createContext, useMemo, useReducer, type ReactNode } from "react";
import type { Product } from "@/features/products/types/product.types";
import type { CartItem } from "../types/order.types";

interface CartState {
  items: Record<number, CartItem>;
}

type CartAction =
  | { type: "increment"; product: Product }
  | { type: "decrement"; productId: number }
  | { type: "clear" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "increment": {
      const existing = state.items[action.product.id];
      return {
        items: {
          ...state.items,
          [action.product.id]: {
            product: action.product,
            quantity: (existing?.quantity ?? 0) + 1,
          },
        },
      };
    }
    case "decrement": {
      const existing = state.items[action.productId];
      if (!existing) return state;
      const nextQuantity = existing.quantity - 1;
      const items = { ...state.items };
      if (nextQuantity <= 0) {
        delete items[action.productId];
      } else {
        items[action.productId] = { ...existing, quantity: nextQuantity };
      }
      return { items };
    }
    case "clear":
      return { items: {} };
    default:
      return state;
  }
}

export interface CartContextValue {
  items: Record<number, CartItem>;
  lineItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  getQuantity: (productId: number) => number;
  increment: (product: Product) => void;
  decrement: (productId: number) => void;
  clear: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} });

  const value = useMemo<CartContextValue>(() => {
    const lineItems = Object.values(state.items);
    const totalItems = lineItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = lineItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    return {
      items: state.items,
      lineItems,
      totalItems,
      totalPrice,
      getQuantity: (productId: number) => state.items[productId]?.quantity ?? 0,
      increment: (product: Product) => dispatch({ type: "increment", product }),
      decrement: (productId: number) => dispatch({ type: "decrement", productId }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
