import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

// Oncce the item is already in the card we only need to update the quantity

const useCart = create((set) => ({
  cartItems: [],
  addToCart: (item: CartItem) =>
    set((state: CartState) => ({ cartItems: [...state.cartItems, item] })),
  updateCart: (item: CartItem) =>
    set((state: CartState) => ({
      cartItems: state.cartItems.map((i: CartItem) =>
        i.id === item.id ? { ...i, quantity: item.quantity } : i,
      ),
    })),
  removeFromCart: (item: CartItem) =>
    set((state: CartState) => ({
      cartItems: state.cartItems.filter((i: CartItem) => i.id !== item.id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCart;
