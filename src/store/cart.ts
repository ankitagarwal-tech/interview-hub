import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  thumbnail: string;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const useCart = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item: CartItem) =>
    set((state) => {
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }

      return { cartItems: [...state.cartItems, item] };
    }),
  updateCart: (item: CartItem) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((i) => (i.id === item.id ? { ...i, quantity: item.quantity } : i))
        .filter((i) => i.quantity > 0),
    })),
  removeFromCart: (itemId: number) =>
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== itemId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCart;
