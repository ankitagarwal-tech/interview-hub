import { ProductCard } from "@/components/product-card";
import type { Product } from "@/interface/product";
import { getProducts } from "@/service/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Store } from "lucide-react";
import { OrderDialog } from "@/components/order-dialog";

const LIMIT = 10;

function Products() {
    const [page, setPage] = useState(0);
    const skip = page * LIMIT;

    const { data, isLoading } = useQuery({
        queryKey: ['products', LIMIT, skip],
        queryFn: () => getProducts(LIMIT, skip)
    });

    const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;

    if (isLoading) {
        return <div className="flex justify-center items-center h-64">Loading products...</div>;
    }

    return (
        <div className="min-h-screen bg-background pb-24">
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-8">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Store className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">MarketHub</h1>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {data?.products.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex justify-center items-center gap-4 py-8">
                    <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>
                    <div className="px-4 py-2 bg-muted rounded-full">
                        <span className="text-sm font-semibold">
                            Page {page + 1} of {totalPages}
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={page >= totalPages - 1}
                    >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>

            <OrderDialog />
        </div>
    );
}

export default Products;
