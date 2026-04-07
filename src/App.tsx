import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NestedCheckBox from "./NestedCheckbox";
import ProductListing from "./pages/ProductListing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-listing" element={<ProductListing />} />
        <Route path="/nested-check-box" element={<NestedCheckBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
