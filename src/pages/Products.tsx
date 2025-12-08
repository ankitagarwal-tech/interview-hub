import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '@/components/ui/ProductCard'
import Pagination from '@/components/ui/Pagination'
import ProductSkeleton from '@/components/ui/ProductSkeleton'

interface Product {
  productId: number | string
  title?: string
  price?: number
  image?: string
  description?: string
  [key: string]: any
}

const LIMIT = 12

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialPage = parseInt(searchParams.get('page') || '1', 10)
  const [page, setPage] = useState(initialPage)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Sync URL query param with page state
    setSearchParams({ page: page.toString() })
  }, [page, setSearchParams])

  useEffect(() => {
    let mounted = true

    const fetchProducts = async () => {
      setLoading(true)
      setError(null)

      try {
        const skip = (page - 1) * LIMIT
        const API_URL = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`

        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`)

        const data = await res.json()

        // Map API data to ProductCard format
        const items: Product[] = (data.products || []).map((p: any) => ({
          productId: p.id,
          title: p.title || p.name,
          price: p.price,
          image: p.images?.[0] || '',
          description: p.description
        }))

        if (mounted) setProducts(items)
      } catch (err: any) {
        if (mounted) setError(err.message || 'Unknown error')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()

    return () => {
      mounted = false
    }
  }, [page])

  const handlePrev = () => setPage(p => Math.max(1, p - 1))
  const handleNext = () => setPage(p => p + 1)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <div className="text-sm text-slate-600">Page {page}</div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700">Error: {error}</p>
          <div className="mt-2">
            <button
              className="inline-flex items-center px-3 py-1.5 rounded bg-red-600 text-white text-sm"
              onClick={() => setPage(1)}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div>
            {products.length === 0 ? (
              <div className="p-8 text-center text-slate-500">No products found.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(p => (
                  <ProductCard key={p.productId} product={p} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          page={page}
          onPrev={handlePrev}
          onNext={handleNext}
          disablePrev={page === 1}
          disableNext={!loading && products.length < LIMIT}
        />
      </div>
    </section>
  )
}
