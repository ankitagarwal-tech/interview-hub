import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import CheckoutDialog from "@/components/CheckoutDialog";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const { cart, addToCart, removeFromCart, totalItems } = useCart();

  const fetchProducts = async () => {
    await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      <div className="mb-6 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-600">
            Page {page + 1} • Items in cart: {totalItems}
          </p>
        </div>
        <CheckoutDialog />
      </div>

      <ProductCard
        products={products || []}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />

      <div className="my-6 flex justify-center gap-2">
        <Button variant="outline" disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
