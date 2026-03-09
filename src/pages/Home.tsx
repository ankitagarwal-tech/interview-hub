import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ProductCard } from "../components/ProductCard";
import { CartIcon } from "../components/CartIcon";
import { CheckoutDialog } from "../components/CheckoutDialog";
import type { Product } from "../types";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products?limit=10&skip=10"
        );
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
        setActivePage(1);
        setTotalProducts(data.total);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
        console.log(err);
      }
    };

    fetchInitialProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-destructive">{error}</p>
      </div>
    );
  }

  const getNextProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${activePage * 10}`
      );
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background m-10">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Product Store</h1>
          <CartIcon onClick={() => setCheckoutOpen(true)} />
        </div>
      </header>

      <Pagination>
        <PaginationContent>
          <main className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center mt-10 gap-2">
              {Array.from({ length: Math.ceil(totalProducts / 10) }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={i + 1 === activePage}
                    onClick={() => {
                      getNextProducts();
                      setActivePage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>
          </main>
        </PaginationContent>
      </Pagination>

      <CheckoutDialog open={checkoutOpen} onOpenChange={setCheckoutOpen} />
    </div>
  );
}

export default Home;
