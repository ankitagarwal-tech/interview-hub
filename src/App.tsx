import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NestedCheckBox from "./NestedCheckbox";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nested-check-box" element={<NestedCheckBox />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
