import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/products'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="/nested-check-box" element={<NestedCheckBox />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
