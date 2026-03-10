import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NestedCheckBox from './NestedCheckbox'
import ProductPage from "@/pages/Products/page.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        {/*<Route path="/nested-check-box" element={<NestedCheckBox />} />*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
