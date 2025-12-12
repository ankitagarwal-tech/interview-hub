import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NestedCheckBox from './NestedCheckbox'
import { lazy } from 'react'
const Products=lazy(() => import('./pages/Products.tsx'))

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/nested-check-box" element={<NestedCheckBox />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
