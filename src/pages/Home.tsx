import { getProducts } from "@/api/getProducts";
import { ProductCard } from "@/components/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

function Home() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState(1);

  const [products, setProducts] = useState<any[]>([]);

  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    const isInCart = cart.find((item) => item.id === product.id);
    if (isInCart) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  const removeFromCart = (product: any) => {
    const isInCart = cart.find((item) => item.id === product.id);
    if (isInCart && isInCart.quantity > 1) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      const newCart = cart.filter((item) => item.id !== product.id);
      setCart(newCart);
    }
  };

  const fetchProducts = async (pageNumber: number) => {
    const data = await getProducts({ skip: (pageNumber - 1) * 10 });
    console.log(data.products);
    setProducts(data.products);

    setMaxPageNumber(Math.ceil(data.total / 10));
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts(currentPageNumber);
  }, [currentPageNumber]);

  return (
    <div className="position-relative mb-70px">
      <div className="position-sticky top-0 left-0 right-0 bg-black p-5">
        Place Order
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        {!!products.length &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ))}

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPageNumber === 1}
                onClick={() => setCurrentPageNumber((prev) => prev - 1)}
              />
            </PaginationItem>

            {Array.from({ length: maxPageNumber }).map((_, index) => (
              <PaginationItem
                key={index}
                onClick={() => setCurrentPageNumber(index + 1)}
              >
                <PaginationLink isActive={currentPageNumber === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                aria-disabled={currentPageNumber === maxPageNumber}
                onClick={() => setCurrentPageNumber((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default Home;
