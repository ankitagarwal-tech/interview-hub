import { useState } from 'react'
import ProductCard from "./components/ProductCard";
import { products } from "./products";
import { Cart } from "./components/Cart/Cart";

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  quantity?: number;
}

function App() {
  const [itemsinCart, setItemsInCart] = useState<Product[]>([]);

  function updateCart({ id, quantity }: { id: number; quantity: number }) {
    const product = products.find((p) => p.id === id);
    setItemsInCart((prev) => {
      const existingProduct = prev.find((p) => p.id === id);
      if (existingProduct) {
        const newQuantity = (existingProduct.quantity || 0) + quantity;

        if (newQuantity <= 0) {
          return prev.filter((p) => p.id !== id);
        }

        return prev.map((p) =>
          p.id === id ? { ...p, quantity: newQuantity } : p
        );
      } else {
        if (quantity > 0) {
          return [...prev, { ...product!, quantity }];
        }
        return prev;
      }
    });
  }

  return (
    <div className="flex flex-col gap-4 m-h-auto p-8">
      <div>
        <Cart itemsInCart={itemsinCart} />
      </div>
      <div className="flex gap-4 flex-wrap p-8">
        {products.map((product) => {
          const cartItem = itemsinCart.find((item) => item.id === product.id);
          return (
            <ProductCard
              key={product.id}
              title={product.title}
              imgUrl={product.thumbnail}
              price={product.price}
              updateCart={updateCart}
              id={product.id}
              quantity={cartItem?.quantity ?? 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App
