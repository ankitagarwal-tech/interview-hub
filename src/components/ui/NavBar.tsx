import { useCart } from '@/context/CartContext';
import { ShoppingBag, ShoppingCartIcon } from 'lucide-react';
import React from 'react'

export const NavBar = () => {
  const {totalItems}=useCart();
  return (
    <header>
      <div>
        <h1>Product Store</h1>
        <div>
          <ShoppingCartIcon/>
        </div>
      </div>
      NavBar

    </header>
  )
}
