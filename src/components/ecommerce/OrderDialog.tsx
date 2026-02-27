import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../hooks/useProducts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ShoppingCart } from 'lucide-react';

interface OrderDialogProps {
    products: Product[];
}

export const OrderDialog = ({ products }: OrderDialogProps) => {
    const { cart, totalItems, clearCart } = useCart();
    const [open, setOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
    });

    const cartProducts = useMemo(() => {
        return Object.entries(cart).map(([productId, quantity]) => {
            const product = products.find((p) => p.id === Number(productId));
            return {
                product,
                quantity,
            };
        }).filter((item) => item.product !== undefined);
    }, [cart, products]);

    const totalPrice = useMemo(() => {
        return cartProducts.reduce((sum, { product, quantity }) => {
            return sum + (product?.price || 0) * quantity;
        }, 0);
    }, [cartProducts]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email) {
            alert("Please fill required fields (First Name & Email)");
            return;
        }

        // Process order (Simulated)
        alert(`Order placed successfully for ${formData.firstName}! Total: $${totalPrice.toFixed(2)}`);

        // Reset and close
        clearCart();
        setFormData({ firstName: '', lastName: '', email: '', birthDate: '' });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="relative flex items-center gap-2 pr-6" size="lg">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Place Order</span>
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold border-2 border-white">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Order Summary</DialogTitle>
                    <DialogDescription>
                        Review your order and enter details to confirm.
                    </DialogDescription>
                </DialogHeader>

                {totalItems === 0 ? (
                    <div className="py-6 text-center text-gray-500">
                        Your cart is empty. Add some products to place an order!
                    </div>
                ) : (
                    <form onSubmit={handleConfirmOrder} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3 max-h-[150px] overflow-y-auto pr-2">
                            {cartProducts.map(({ product, quantity }) => (
                                <div key={product!.id} className="flex justify-between items-center text-sm border-b pb-2">
                                    <div className="flex flex-col">
                                        <span className="font-medium line-clamp-1">{product!.title}</span>
                                        <span className="text-gray-500 text-xs">Qty: {quantity}</span>
                                    </div>
                                    <span className="font-semibold whitespace-nowrap">
                                        ${(product!.price * quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                            <div className="flex justify-between items-center font-bold text-lg pt-2 mt-2 border-t border-gray-900 border-dashed">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="grid gap-4 bg-gray-50 p-4 rounded-lg -mx-4 sm:mx-0">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email">Email ID *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="birthDate">Birth Date</Label>
                                <Input
                                    id="birthDate"
                                    name="birthDate"
                                    type="date"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    max="1991-01-01"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                                Confirm Order
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};
