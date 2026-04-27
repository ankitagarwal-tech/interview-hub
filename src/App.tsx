import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { AppToaster } from './components/shared/AppToast'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <AppToaster />
    </BrowserRouter>
  )
}

export default App
