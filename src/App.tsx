import { Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products'

import CartSummary from './components/ui/CartSummary'


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">My Store</h1>
          <nav>
            <Link to="/products" className="text-sm text-slate-700 hover:underline">
              Products
            </Link>
          </nav>
          <nav><CartSummary /></nav>
        </div>
      </header>


      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}

