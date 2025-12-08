import React, { createContext, useContext, useMemo } from 'react'
import useCart from '@/hooks/userCart'

const CartContext = createContext<ReturnType<typeof useCart> | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCart()

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => cart, [cart.cart]) // Only re-create when cart array changes

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCartContext must be used inside CartProvider')
  return context
}