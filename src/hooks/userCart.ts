// File: src/hooks/useCart.ts
import { useState, useEffect } from 'react'

export interface CartItem {
    id: string | number
    title: string
    price: number
    image?: string
    quantity: number
    [key: string]: any
}

const CART_KEY = 'cart'

const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(CART_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

export default function useCart() {
    const [cart, setCart] = useState<CartItem[]>(getStoredCart) 

    // Load cart from localStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_KEY)
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart))
            } catch {
                setCart([])
            }
        }
    }, [])

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart))
    }, [cart])

    // Add or increment item
    const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
        setCart((prev: any) => {
            const existing = prev.find((i: any) => i.id === item.id)
            if (existing) {
                return prev.map((i: any) =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                )
            }
            return [...prev, { ...item, quantity }]
        })
    }

    // Remove item
    const removeItem = (productId: string | number) => {
        setCart(prev => prev.filter(i => i.id !== productId))
    }

    // Update quantity
    const updateItemQuantity = (productId: string | number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }
        setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i))
    }

    // Clear cart
    const clearCart = () => setCart([])

    // Get total items (sum of quantities)
    const getTotalItems = () => cart.reduce((sum, i) => sum + i.quantity, 0)

    // Get total price
    const getTotalPrice = () => cart.reduce((sum, i) => sum + i.quantity * i.price, 0)

    // Get quantity of a specific product
    const getQuantity = (productId: string | number) => {
        const item = cart.find(i => i.id === productId)
        return item ? item.quantity : 0
    }

    return {
        cart,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getQuantity
    }
}
