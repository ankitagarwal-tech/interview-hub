import useCartContext from "@/hooks/useCartContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity } = useCartContext();
  console.log({ cart });
  return (
    <div>
      {/* <Button variant={"outline"}>Cart {cart.length}</Button> */}
      {/* Display cart items */}
      <Dialog>
        {/* <form> */}
          <DialogTrigger asChild>
            <Button variant={"outline"}>Cart {cart.length}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] scroll-auto overflow-scroll">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div>
              {cart.map((item) => (
                <div key={item?.id} className="border p-2 my-2">
                  <Card className="w-[300px]">
                    <div className="font-bold">{item?.title}</div>
                    <div>Quantity: {item?.purchasedQuantity}</div>
                    <CardContent>
                      <img src={item?.thumbnail} alt={item?.title} />
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      {/* increase and decrease quantity buttons */}
                      <Button onClick={() => increaseQuantity(item?.id)}>
                        +
                      </Button>
                      {item?.purchasedQuantity}
                      <Button onClick={() => decreaseQuantity(item?.id)}>
                        -
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        {/* </form> */}
      </Dialog>
    </div>
  );
};

export default Cart;
