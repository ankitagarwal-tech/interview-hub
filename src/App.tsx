import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NestedCheckBox from './NestedCheckbox'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nested-check-box" element={<NestedCheckBox />} />
        <Route path="/productPage" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
