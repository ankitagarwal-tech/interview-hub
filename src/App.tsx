import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NestedCheckBox from './NestedCheckbox'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nested-check-box" element={<NestedCheckBox />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
