import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NestedCheckBox from './NestedCheckbox'
import { lazy, createContext, useState, useMemo } from 'react'
import Layout from "@/components/Layout";
import type { Product } from './types/product.tsx';
import { Toaster } from "sonner";
const Products = lazy(() => import('./pages/Products.tsx'))

// Cart/Order Context
export const CartOrderContext = createContext<{
  cartItems: Record<number, any>;
  setCartItems: React.Dispatch<React.SetStateAction<Record<number, any>>>;
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
} | null>(null);

function App() {
  const [cartItems, setCartItems] = useState<Record<number, Product & { quantity: number }>>({});
  const [orders, setOrders] = useState<any[]>([]);

  const contextValue = useMemo(
    () => ({ cartItems, setCartItems, orders, setOrders }),
    [cartItems, orders]
  );

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        expand
      />
      <CartOrderContext.Provider value={contextValue}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/nested-check-box" element={<NestedCheckBox />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartOrderContext.Provider>
    </>
  )
}

export default App
