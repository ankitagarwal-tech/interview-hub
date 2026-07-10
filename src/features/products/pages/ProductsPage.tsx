import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { PlaceOrderBar } from "@/features/order/components/PlaceOrderBar";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { ProductGrid } from "../components/ProductGrid";
import { ProductsPagination } from "../components/ProductsPagination";
import { PRODUCTS_PAGE_SIZE, useProductsQuery } from "../hooks/useProductsQuery";

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isPlaceholderData } = useProductsQuery(page);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b px-4 py-6 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-sm text-muted-foreground">
          Pick your favorites and adjust quantities before placing an order.
        </p>
      </header>

      <main className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-6">
        {isError && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center text-muted-foreground">
            <AlertTriangle className="size-8" />
            <p>Something went wrong while loading products.</p>
          </div>
        )}

        {isPending && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: PRODUCTS_PAGE_SIZE }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {data && (
          <div
            className={isPlaceholderData ? "opacity-60 transition-opacity" : "transition-opacity"}
          >
            <ProductGrid products={data.products} />
          </div>
        )}

        {data && (
          <ProductsPagination
            page={page}
            pageSize={PRODUCTS_PAGE_SIZE}
            total={data.total}
            onPageChange={setPage}
          />
        )}
      </main>

      <PlaceOrderBar />
    </div>
  );
}
