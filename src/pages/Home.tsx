import { getProducts } from "@/api/getProducts";
import { PaginationComponent } from "@/components/PaginationComponent";
import { PlaceOrderDialog } from "@/components/PlaceOrderDialog";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import type { ICartItem, IProduct, IUserInfo } from "@/interface/interface";
import { useEffect, useMemo, useState } from "react";

function Home() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
  const [placeOrderDialogOpen, setPlaceOrderDialogOpen] = useState(false);
  const [userForm, setUserForms] = useState<IUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    dob: undefined,
  });
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<ICartItem[]>([]);

  const handlePlaceOrderClick = (open: boolean) => {
    setPlaceOrderDialogOpen(open);
  };

  const addToCart = (product: IProduct) => {
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
  const removeFromCart = (product: IProduct) => {
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
    setProducts(data.products);

    setMaxPageNumber(Math.ceil(data.total / 10));
    setProducts(data.products);
  };

  const totalItemsInCart = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const handleChangeUserForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForms((prev) => ({ ...prev, [name]: value }));
  };

  const handleDobChange = (date: Date | undefined) => {
    setUserForms((prev) => ({ ...prev, dob: date }));
  };

  useEffect(() => {
    fetchProducts(currentPageNumber);
  }, [currentPageNumber]);

  return (
    <>
      <div className="relative mb-2">
        <div className="fixed left-0 right-0 p-5 text-white flex justify-end border-b border-black backdrop-blur">
          <Button
            variant="outline"
            className="bg-black"
            disabled={totalItemsInCart === 0}
            onClick={() => handlePlaceOrderClick(true)}
          >
            Cart ({totalItemsInCart})
          </Button>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] justify-items-center md:justify-items-stretch gap-5 p-4 pt-[90px]">
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
        </div>

        <PaginationComponent
          currentPage={currentPageNumber}
          maxPageNumber={maxPageNumber}
          onPageChange={setCurrentPageNumber}
        />
      </div>
      <PlaceOrderDialog
        open={placeOrderDialogOpen}
        onOpenChange={handlePlaceOrderClick}
        cart={cart}
        userForm={userForm}
        onChangeUserForm={handleChangeUserForm}
        onChangeDob={handleDobChange}
      />
    </>
  );
}

export default Home;
