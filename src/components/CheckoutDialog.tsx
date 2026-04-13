import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  title: string;
  price: number;
};

type Props = {
  cart: any;
  products: Product[];
};

export default function CheckoutDialog({ cart, products }: Props) {
  
  console.log("Cart:", cart);
  const [open, setOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filtered = products.filter((product) => cart[product.id] > 0);
    setFilteredProducts(filtered);
  }, [products, cart]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
  });

  const total = filteredProducts.reduce((sum, item) => sum + item.price * cart[item.id], 0);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Order placed successfully!");
    setOpen(false);
  };

  if (isLoading) {
    return <div>Thanks for shopping with us!</div>;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Checkout</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout Details</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <div className="grid gap-4 py-2">
          <div>
            <Label>First Name</Label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div>
            <Label>Birth Date</Label>
            <Input
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* CART SUMMARY */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">Cart Summary</h3>

          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm py-1"
            >
              <span>{item.title} * {cart[item.id]}</span>
              <span>${item.price * cart[item.id]}</span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Confirm Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}