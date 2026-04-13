import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NestedCheckBox from './NestedCheckbox'
import ProductPage from './pages/ProductPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nested-check-box" element={<NestedCheckBox />} />
          <Route path="/productPage" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
