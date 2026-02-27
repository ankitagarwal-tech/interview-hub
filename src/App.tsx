import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NestedCheckBox from './NestedCheckbox'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nested-check-box" element={<NestedCheckBox />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
