import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ecommerce/ProductList';
import { Pagination } from '../components/ecommerce/Pagination';
import { OrderDialog } from '../components/ecommerce/OrderDialog';
import { ShoppingBag } from 'lucide-react';

function Home() {
  const { products, loading, error, total, page, setPage, limit } = useProducts(10);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-16">
      {/* Header Pipeline */}
      <header className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 hidden sm:block">
              Interview Store
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/nested-check-box"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 hidden md:block"
            >
              Nested Checkbox Task
            </Link>
            <OrderDialog />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Our Products</h2>
            <p className="text-gray-500 mt-1">Browse our latest collection.</p>
          </div>
        </div>

        <ProductList products={products} loading={loading} error={error} />

        {(!loading && !error && products.length > 0) && (
          <Pagination
            currentPage={page}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={setPage}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

export default Home;
