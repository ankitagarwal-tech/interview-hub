import { useEffect, useMemo, useState } from "react"


import { ProductCard, type Product } from "@/components/products/ProductCard"




import { getPaginationItems } from "@/lib/utils"
import { OrderConfirmationDialog } from "../components/products/OrderConfirmationDialog"
import { ProductPagePagination } from "../components/products/ProductPagePagination"

type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}



const PAGE_SIZE = 10





function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [selectedProducts, setSelectedProducts] = useState<Record<number, Product>>(
    {}
  )



  useEffect(() => {
    let mounted = true

    const fetchProducts = async () => {
      setIsLoading(true)
      setErrorMessage("")

      try {
        const skip = (currentPage - 1) * PAGE_SIZE
        const response = await fetch(
          `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
        )

        if (!response.ok) {
          throw new Error("Could not load products. Please try again.")
        }

        const data: ProductsResponse = await response.json()
        if (!mounted) {
          return
        }

        setProducts(data.products)
        setTotalProducts(data.total)
      } catch (error) {
        if (!mounted) {
          return
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unexpected error while loading products."
        )
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    void fetchProducts()

    return () => {
      mounted = false
    }
  }, [currentPage])

  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

  const selectedItems = useMemo(() => {
    return Object.entries(quantities)
      .map(([id, quantity]) => ({
        product: selectedProducts[Number(id)],
        quantity,
      }))
      .filter((entry) => entry.quantity > 0 && Boolean(entry.product))
  }, [quantities, selectedProducts])

  const totalUnits = useMemo(
    () => selectedItems.reduce((sum, entry) => sum + entry.quantity, 0),
    [selectedItems]
  )



  const incrementQuantity = (product: Product) => {
    setQuantities((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] ?? 0) + 1,
    }))

    setSelectedProducts((previous) => ({
      ...previous,
      [product.id]: product,
    }))
  }

  const decrementQuantity = (product: Product) => {
    setQuantities((previous) => {
      const currentQuantity = previous[product.id] ?? 0
      if (currentQuantity <= 1) {
        const next = { ...previous }
        delete next[product.id]
        return next
      }

      return {
        ...previous,
        [product.id]: currentQuantity - 1,
      }
    })
  }





  const paginationItems = getPaginationItems(currentPage, totalPages)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Products
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Browse products, set quantities, and place your order.
          </p>
        </header>

        <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Selected items</p>
            <p className="text-xl font-semibold">{totalUnits}</p>
          </div>
          <OrderConfirmationDialog
            setQuantities={setQuantities}
            setSelectedProducts={setSelectedProducts}
            selectedItems={selectedItems}
            totalUnits={totalUnits}

          />
        </div>

        {isLoading ? (
          <div className="grid min-h-[280px] place-items-center rounded-xl border border-dashed text-sm text-muted-foreground">
            Loading products...
          </div>
        ) : errorMessage ? (
          <div className="grid min-h-[280px] place-items-center rounded-xl border border-destructive/50 bg-destructive/5 px-6 text-center text-sm text-destructive">
            {errorMessage}
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={quantities[product.id] ?? 0}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />
              ))}
            </section>

            <ProductPagePagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              paginationItems={paginationItems}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Home
