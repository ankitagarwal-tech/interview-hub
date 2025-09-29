import { useState } from 'react';
import { CheckCircle2, Package } from 'lucide-react';
import type { CartItem, OrderFormData } from '../types/product';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface OrderSummaryDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    cartItems: CartItem[];
    onConfirmOrder: (formData: OrderFormData) => void;
}

export const OrderSummaryDialog = ({
    open,
    onOpenChange,
    cartItems,
    onConfirmOrder,
}: OrderSummaryDialogProps) => {
    const [formData, setFormData] = useState<OrderFormData>({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
    });

    const [errors, setErrors] = useState<Partial<OrderFormData>>({});

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const validateForm = (): boolean => {
        const newErrors: Partial<OrderFormData> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.birthDate) {
            newErrors.birthDate = 'Birth date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            onConfirmOrder(formData);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                birthDate: '',
            });
            setErrors({});
        }
    };

    const handleInputChange = (field: keyof OrderFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Package className="h-6 w-6" />
                        Order Summary
                    </DialogTitle>
                    <DialogDescription>
                        Review your order and complete your details below
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-lg">Items ({totalItems})</h3>
                        <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-3 bg-slate-50">
                            {cartItems.map(item => (
                                <div
                                    key={item.product.id}
                                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                                >
                                    <div className="flex items-center gap-3 flex-1">
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.title}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">
                                                {item.product.title}
                                            </p>
                                            <p className="text-xs text-slate-600">
                                                ${item.product.price.toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="font-semibold text-sm ml-2">
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t-2 border-slate-900">
                            <span className="font-bold text-lg">Total</span>
                            <span className="font-bold text-2xl text-slate-900">
                                ${totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Customer Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h3 className="font-semibold text-lg">Customer Details</h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className={errors.firstName ? 'border-red-500' : ''}
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-red-500">{errors.firstName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className={errors.lastName ? 'border-red-500' : ''}
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-red-500">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="birthDate" className="text-sm font-medium">
                                Birth Date <span className="text-red-500">*</span>
                            </label>
                            <Input
                                id="birthDate"
                                type="date"
                                value={formData.birthDate}
                                onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                className={errors.birthDate ? 'border-red-500' : ''}
                                min="1990-01-01"
                                max="1999-12-31"
                            />
                            {errors.birthDate && (
                                <p className="text-xs text-red-500">{errors.birthDate}</p>
                            )}
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Confirm Order
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};