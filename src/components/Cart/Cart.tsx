import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Product } from "@/App";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

import { toast } from "sonner";

export function Cart({ itemsInCart }: { itemsInCart: Product[] }) {
    const handleSubmit = () => {
        toast.success("Order placed successfully");
    };
  return (
    <Dialog>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <DialogTrigger asChild>
          <Button variant="outline">Place Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cart</DialogTitle>
            <DialogDescription>
              Review your cart and place your order.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-4">
              {itemsInCart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>{item.title}</div>
                  <div className="flex min-w-22 justify-between gap-4">
                  <div>{item.quantity}</div>
                  <div>{item.price * 2}</div>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="grid gap-4">
                <div>Personal Information</div>
                <Input type='text' placeholder='First Name' />
                <Input type='text' placeholder='Last Name' />
                <Input type='email' placeholder='Email' />
                <Input type='date' placeholder='Birth Date' />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSubmit}>Confirm Order</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
