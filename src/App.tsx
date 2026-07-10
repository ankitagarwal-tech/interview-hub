import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home'
import { ProductsPage } from './features/products/pages/ProductsPage'
import { CartProvider } from './features/order/context/CartContext'
import { queryClient } from './lib/queryClient'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App
