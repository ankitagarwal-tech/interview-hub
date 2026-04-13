import { ProductCard } from "../components/ProductCard";
import { Pagination } from "../components/Pagination";
import { useProducts } from "../hooks/useProducts";

function Products() {
  const { products, total, currentPage, isLoading, error, setPage } =
    useProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Products
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse our collection of {total} products
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-[360px] animate-pulse rounded-xl border bg-muted"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {products.length === 0 && !error && (
            <p className="py-12 text-center text-muted-foreground">
              No products found.
            </p>
          )}

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              total={total}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
