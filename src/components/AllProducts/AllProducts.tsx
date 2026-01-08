import useGetProducts from "@/hooks/useGetProducts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import useCartContext from "@/hooks/useCartContext";

const LIMIT = 10;
const AllProducts = () => {
  const [page, setPage] = useState(0);
  const skip = page * LIMIT;
  const { products, loading, error, total } = useGetProducts({
    skip,
    limit: LIMIT,
  });
  const { addToCart } = useCartContext();
  console.log({ products, loading, error, total });
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {/* pagination Button */}
      <div className="flex gap-4 mb-4">
        <Button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </Button>
        Page {page + 1} of {Math.ceil(total / LIMIT)}
        <Button
          disabled={page * LIMIT + products.length >= total}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product: any) => (
          <Card key={product.id} className="w-[300px]">
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription>{product.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <img src={product.thumbnail} alt={product.title} />
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button onClick={() => addToCart(product)} className="w-full">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
