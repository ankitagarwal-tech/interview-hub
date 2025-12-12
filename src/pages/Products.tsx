import CustomDialog from "@/components/customDialog";
import { Label } from "@/components/ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { toast as sonnerToast } from "sonner";
import { Loader2,  ChevronLeft, ChevronRight } from "lucide-react";
import AddOrderDetails from "@/features/orders/addOrderDetails";
import ProductCard from "@/features/products/productCard";
import type { Product } from "@/types/product";
import { CartOrderContext } from "@/App";

const CART_STORAGE_KEY = "CART_ITEMS";

const Products = () => {
    const cartOrderCtx = useContext(CartOrderContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [pageDetails, setPageDetails] = useState<{ total: number; skip: number; limit: number }>({ total: 0, skip: 0, limit: 0 });
    const [userDetails, setUserDetails] = useState<{ firstName: string, lastName: string, email: string, birthDate: Date }>({ firstName: '', lastName: '', email: '', birthDate: new Date() });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const [showOrderDialog, setShowOrderDialog] = useState(false);

    // Use context state if available, else fallback to local state (for SSR safety)
    const cartItems = cartOrderCtx?.cartItems ?? {};
    const setCartItems = cartOrderCtx?.setCartItems ?? (() => {});

    // Load cart items from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed && typeof parsed === "object") {
                    setCartItems(parsed);
                }
            } catch { /* ignore */ }
        }
    }, [setCartItems]);

    // Save cart items to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const cartSummary = useMemo(() => {
        const items = Object.values(cartItems);
        const totalPrice = items.reduce((sum, item: any) => sum + item.price * item.quantity, 0);
        return {
            count: items.length,
            totalItems: items.reduce((sum, item: any) => sum + item.quantity, 0),
            totalPrice,
        };
    }, [cartItems]);

    useEffect(() => {
        fetchProducts(pageSize, (currentPage - 1) * pageSize);
    }, [currentPage]);

    const fetchProducts = useCallback(async (limit: number, skip: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const data = await response.json();
            setProducts(data.products);
            setPageDetails({ total: data.total, skip: data.skip, limit: data.limit });
        } finally {
            setLoading(false);
        }
    }, []);

    const handleADDToCart = useCallback((product: Product) => {
        setCartItems((prev: any) => {
            const existing = prev[product.id];
            if (!existing) {
                return { ...prev, [product.id]: { ...product, quantity: 1 } };
            }
            if (existing.quantity < product.stock) {
                return { ...prev, [product.id]: { ...existing, quantity: existing.quantity + 1 } };
            }
            return prev;
        });
    }, [setCartItems]);

    const handleRemoveFromCart = useCallback((product: Product) => {
        setCartItems((prev: any) => {
            const existing = prev[product.id];
            if (!existing) return prev;
            if (existing.quantity === 1) {
                const { [product.id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [product.id]: { ...existing, quantity: existing.quantity - 1 } };
        });
    }, [setCartItems]);

    const handleUserDetailChange = useCallback((key: keyof typeof userDetails, value: any) => {
        setUserDetails(prev => ({ ...prev, [key]: value }));
    }, []);

    // Open dialog when cart has items
    useEffect(() => {
        if (cartSummary.count > 0) setShowOrderDialog(true);
    }, [cartSummary.count]);

    const handleOrderSubmit = useCallback(() => {
        if (!userDetails.firstName || !userDetails.lastName || !userDetails.email) {
            sonnerToast.error("Please fill all customer information fields");
            return;
        }
        sonnerToast.success(`Order Placed Successfully ${userDetails.firstName} ${userDetails.lastName}`, {
            description: `Total Amount: $${cartSummary.totalPrice?.toFixed(2)}`,
           
        });
        setCartItems({});
        setUserDetails({ firstName: '', lastName: '', email: '', birthDate: new Date() });
        setShowOrderDialog(false); 
    }, [userDetails, setCartItems]);


    const handlePrevPage = () => {
        setCurrentPage((p) => Math.max(1, p - 1));
    };
    const handleNextPage = () => {
        if (currentPage * pageSize < pageDetails.total) {
            setCurrentPage((p) => p + 1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-10">
            <TooltipProvider>
                <div className="flex justify-between p-4">
                    {showOrderDialog ? (
                        <CustomDialog
                            title="Order Details"
                            disabled={cartSummary.count === 0}
                            handleSubmit={handleOrderSubmit}
                            confirmDialogTitle="Confirm Order"
                            width="800px"
                        >
                            <div>
                                <div className="bg-[#394551] text-white p-2 rounded mb-4">
                                    <Label className="my-2">Order Summary</Label>
                                </div>
                                {Object.values(cartItems).map((item: any) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.title} x {item.quantity}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-300 mt-4 pt-2 flex justify-between font-bold bg-[#394551] text-white p-2 rounded">
                                    <span>Total:</span>
                                    <span>${cartSummary.totalPrice?.toFixed(2)}</span>
                                </div>
                                <AddOrderDetails userDetails={userDetails} handleUserDetailChange={handleUserDetailChange}></AddOrderDetails>
                            </div>
                        </CustomDialog>
                    ):<></>}
                    <div className="flex items-center space-x-2">
                       
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1 || loading}
                            className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${currentPage === 1 || loading
                                ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400"
                                }`}
                            type="button"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={loading || (currentPage * pageSize >= pageDetails.total)}
                            className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md transition-colors duration-200 ${loading || (currentPage * pageSize >= pageDetails.total)
                                ? "border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed"
                                : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400"
                                }`}
                            type="button"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'>
                            {products.map((product) => {
                                const inCart = cartItems[product.id]?.quantity || 0;
                                const lowStock = product.stock <= 5;
                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        inCart={inCart}
                                        lowStock={lowStock}
                                        handleADDToCart={handleADDToCart}
                                        handleRemoveFromCart={handleRemoveFromCart}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </TooltipProvider>
        </div>
    );
};

export default Products;