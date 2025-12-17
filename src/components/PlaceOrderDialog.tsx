import type { ICartItem } from "@/interface/interface";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "./ui/dialog";
import { useMemo } from "react";
import { UserInfoForms } from "./UserInfoForms";
import type { IUserInfo } from "@/interface/interface";
import { Button } from "./ui/button";

interface PlaceOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: ICartItem[];
  userForm: IUserInfo;
  onChangeUserForm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDob: (date: Date | undefined) => void;
}

export const PlaceOrderDialog = ({
  open,
  onOpenChange,
  cart,
  userForm,
  onChangeUserForm,
  onChangeDob,
}: PlaceOrderDialogProps) => {
  const totalAmount = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] md:w-[80vw] md:max-w-none sm:max-w-[425px] max-h-[100vh] md:max-h-[85vh] flex flex-col overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-12 flex-1 gap-2 min-h-0">
          <div className="col-span-12 min-h-[400px] md:col-span-7 p-2 flex flex-col md:min-h-0">
            <div className="flex-1 overflow-y-auto border border-gray-300 p-2 min-h-0">
              {!!cart.length &&
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="mb-2 flex items-center border-b border-gray-200 pb-2"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover mr-4"
                    />
                    <div>
                      <div className="font-medium">{item.title}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Total Price: {item.price * item.quantity}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-4 flex justify-between font-semibold">
              <div>Total Amount:</div>
              <div>{totalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-5 p-2 ">
            <UserInfoForms
              onChangeUserForm={onChangeUserForm}
              onChangeDob={onChangeDob}
              firstName={userForm.firstName}
              lastName={userForm.lastName}
              email={userForm.email}
              dob={userForm.dob}
            />
            <Button className="mt-3 w-full" type="submit">
              Place Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
