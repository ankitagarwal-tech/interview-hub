import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Cart, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import CheckoutDialog from "@/components/CheckoutDialog";

export default function ProductPage() {
  //define states
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [cart, setCart] = useState<Cart>({});

  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };

  const updateQty = (id: number, type: "add" | "remove") => {
    setCart((prev: Cart) => {
      const qty = prev[id] || 0;
      return {
        ...prev,
        [id]: type === "add" ? qty + 1 : Math.max(qty - 1, 0),
      };
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <CheckoutDialog cart={cart} products={products} />
      <ProductCard
        products={products || []}
        cart={cart}
        onAdd={(id: number) => updateQty(id, "add")}
        onRemove={(id: number) => updateQty(id, "remove")}
      />
      <div className="flex justify-center gap-2 my-4 ">
        <Button onClick={() => setPage(page + 1)}>Next</Button>
        <Button onClick={() => setPage(page - 1)}>Previous</Button>
      </div>
    </div>
  );
}
