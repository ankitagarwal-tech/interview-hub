import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, ShoppingCart, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useProductStore from "@/store/product";

const formSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    birthDate: z.date({ message: "Birth date is required." }),
});

export function OrderDialog() {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const { addedProducts, clearCart } = useProductStore();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    const totalAmount = addedProducts.reduce(
        (total, item) => total + item.product.price * item.qty,
        0
    );

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Order submitted:", { user: values, items: addedProducts, total: totalAmount });
            setIsSubmitting(false);
            setIsSuccess(true);
            toast.success("Order placed successfully!", {
                description: `Thank you, ${values.firstName}! Your order for $${totalAmount.toFixed(2)} has been confirmed.`,
            });
            clearCart();
            form.reset();
        }, 1500);
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
        if (!newOpen) {
            // Reset success state when dialog closes
            setTimeout(() => setIsSuccess(false), 300);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button 
                    className="fixed bottom-8 right-8 h-14 px-6 rounded-full shadow-2xl gap-2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
                    disabled={addedProducts.length === 0}
                >
                    <ShoppingCart className="h-5 w-5" />
                    Place Order ({addedProducts.length})
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col p-0 overflow-hidden">
                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-in zoom-in duration-500">
                            <CheckCircle2 className="h-12 w-12" />
                        </div>
                        <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                        <p className="text-muted-foreground">
                            Your order has been placed successfully. A confirmation email has been sent.
                        </p>
                        <Button onClick={() => setOpen(false)} className="mt-4">
                            Return to Shopping
                        </Button>
                    </div>
                ) : (
                    <>
                        <DialogHeader className="p-6 pb-2">
                            <DialogTitle className="text-2xl">Complete Your Order</DialogTitle>
                            <DialogDescription>
                                Review your cart and provide your details to confirm the order.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="px-6 py-2 overflow-hidden flex flex-col">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <ScrollArea className="h-[150px] pr-4 rounded-md border p-2 bg-muted/30">
                                {addedProducts.length === 0 ? (
                                    <p className="text-sm text-center py-8 text-muted-foreground">Your cart is empty.</p>
                                ) : (
                                    <div className="space-y-3">
                                        {addedProducts.map((item) => (
                                            <div key={item.product.id} className="flex justify-between items-start text-sm">
                                                <div className="flex-1">
                                                    <p className="font-medium leading-none">{item.product.title}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">Qty: {item.qty} × ${item.product.price}</p>
                                                </div>
                                                <p className="font-semibold">${(item.product.price * item.qty).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                            <div className="flex justify-between items-center py-4">
                                <span className="font-bold text-lg">Total</span>
                                <span className="font-bold text-lg text-primary">${totalAmount.toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                        </div>

                        <div className="px-6 pb-6 overflow-y-auto">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email ID</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john.doe@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="birthDate"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Birth Date</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter className="pt-4">
                                        <Button type="submit" className="w-full h-11 text-lg" disabled={isSubmitting || addedProducts.length === 0}>
                                            {isSubmitting ? "Processing..." : "Confirm Order"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
