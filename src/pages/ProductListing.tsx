import { useEffect, useState } from "react";
import fetchProducts, { PRODUCTS_PAGE_SIZE } from "@/api/fetchProducts";
import type { Product } from "@/types/product";
import ProductCard from "@/components/product-card";
import CartSummaryDialog from "@/components/cart-summary-dialog";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const hasNextPage = page * PRODUCTS_PAGE_SIZE < total;
  const hasPreviousPage = page > 1;

  useEffect(() => {
    setLoading(true);
    fetchProducts(page, PRODUCTS_PAGE_SIZE)
      .then(({ products, total }) => {
        setProducts(products);
        setTotal(total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);
  const handlePrevious = () => {
    if (hasPreviousPage) {
      setPage((p) => p - 1);
    }
  };
  const handleNext = () => {
    if (hasNextPage) {
      setPage((p) => p + 1);
    }
  };
  return (
    <div className="p-6 container mx-auto">
      <nav className="mb-6 flex items-center justify-between rounded-md border px-4 py-3">
        <h1 className="text-lg font-semibold">Products</h1>
        <CartSummaryDialog />
      </nav>
      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-items-stretch lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {!loading && (
        <div className="flex items-center justify-center">
          <Pagination>
            <PaginationPrevious
              aria-disabled={!hasPreviousPage}
              className={
                !hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer "
              }
              onClick={(e) => {
                e.preventDefault();
                handlePrevious();
              }}
            >
              Previous
            </PaginationPrevious>
            <PaginationNext
              aria-disabled={!hasNextPage}
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer "
              }
              onClick={(e) => {
                e.preventDefault();
                handleNext();
              }}
            >
              Next
            </PaginationNext>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ProductListing;
