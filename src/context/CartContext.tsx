import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '../hooks/useProducts';

export type CartItem = {
    product: Product;
    quantity: number;
};

export type CartItems = {
    [productId: number]: CartItem;
};

interface CartContextType {
    cart: CartItems;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    getQuantity: (productId: number) => number;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItems>({});

    const addToCart = (product: Product) => {
        setCart((prev) => ({
            ...prev,
            [product.id]: {
                product,
                quantity: (prev[product.id]?.quantity || 0) + 1,
            },
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => {
            const currentItem = prev[productId];
            if (!currentItem) return prev;

            if (currentItem.quantity <= 1) {
                const newCart = { ...prev };
                delete newCart[productId];
                return newCart;
            }
            return {
                ...prev,
                [productId]: {
                    ...currentItem,
                    quantity: currentItem.quantity - 1,
                },
            };
        });
    };

    const getQuantity = (productId: number) => cart[productId]?.quantity || 0;

    const clearCart = () => setCart({});

    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, getQuantity, clearCart, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
