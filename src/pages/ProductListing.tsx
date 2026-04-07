import { useEffect, useState } from "react";
import fetchProducts from "@/api/fetchProducts";
import type { Product } from "@/types/product";
import ProductCard from "@/components/product-card";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ProductListing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts(page).then((products) => {
      setProducts(products);
    });
  }, [page]);
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    setPage(page + 1);
  };
  return (
    <div className="p-6 container mx-auto">
      <div>Products</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Pagination>
          <PaginationPrevious onClick={handlePrevious}>
            Previous
          </PaginationPrevious>
          <PaginationNext onClick={handleNext}>Next</PaginationNext>
        </Pagination>
      </div>
    </div>
  );
}

export default ProductListing;
