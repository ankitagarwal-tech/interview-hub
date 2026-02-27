import React, { createContext, useContext, useState, type ReactNode } from 'react';

type CartItems = {
    [productId: number]: number; // Maps product ID to quantity
};

interface CartContextType {
    cart: CartItems;
    addToCart: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    getQuantity: (productId: number) => number;
    clearCart: () => void;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItems>({});

    const addToCart = (productId: number) => {
        setCart((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => {
            const currentQuantity = prev[productId] || 0;
            if (currentQuantity <= 1) {
                const newCart = { ...prev };
                delete newCart[productId];
                return newCart;
            }
            return {
                ...prev,
                [productId]: currentQuantity - 1,
            };
        });
    };

    const getQuantity = (productId: number) => cart[productId] || 0;

    const clearCart = () => setCart({});

    const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

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
