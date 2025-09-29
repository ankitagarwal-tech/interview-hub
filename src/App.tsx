import { useState, useMemo } from 'react';
import { ShoppingCart, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { OrderSummaryDialog } from './components/OrderSummaryDialog';
import { Button } from './components/ui/button';
import { CartItem, OrderFormData } from './types/product';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { data, loading, error } = useProducts(currentPage, itemsPerPage);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const cartItems: CartItem[] = useMemo(() => {
    if (!data) return [];
    return data.products
      .filter(product => quantities[product.id] > 0)
      .map(product => ({
        product,
        quantity: quantities[product.id],
      }));
  }, [data, quantities]);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (productId: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: number) => {
    setQuantities(prev => {
      const newQuantity = (prev[productId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page when changing items per page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      return;
    }
    setDialogOpen(true);
  };

  const handleConfirmOrder = (formData: OrderFormData) => {
    console.log('Order confirmed:', {
      customer: formData,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    });

    setOrderSuccess(true);
    setDialogOpen(false);
    setQuantities({});

    setTimeout(() => {
      setOrderSuccess(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Products Store
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Browse our amazing collection
              </p>
            </div>

            <div className="flex items-center gap-4">
              {totalCartItems > 0 && (
                <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
                  <ShoppingCart className="h-5 w-5 text-slate-700" />
                  <span className="font-semibold text-slate-900">
                    {totalCartItems} {totalCartItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              )}

              <Button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                size="lg"
                className="gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Place Order</span>
                {totalCartItems > 0 && (
                  <span className="sm:hidden">({totalCartItems})</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {orderSuccess && (
        <div className="container mx-auto px-4 mt-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-900">Order placed successfully!</p>
              <p className="text-sm text-green-700">
                Thank you for your purchase. We'll send you a confirmation email shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Error loading products
              </h2>
              <p className="text-slate-600">{error}</p>
            </div>
          </div>
        ) : data && data.products.length > 0 ? (
          <div className="space-y-8">
            <ProductGrid
              products={data.products}
              quantities={quantities}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />

            <div className="flex justify-center pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                totalItems={data.total}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-600">No products found</p>
          </div>
        )}
      </main>

      {/* Order Dialog */}
      <OrderSummaryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        cartItems={cartItems}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-slate-600">
            © 2025 Products Store. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;