// import { Link } from 'react-router-dom';

import { ProductCard } from "@/components/product-card";
import type { ApiResponse, Product } from "@/interface/product";
import { getProducts } from "@/service/product";
import useProductStore from "@/store/product";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
    return useQuery({ queryKey: ['products'], queryFn: () => getProducts() })
}

function Products() {
    // const query = useQuery({ queryKey: ['products'], queryFn: () => getProducts() })

    const { data, isLoading } = useProducts()
    const productsInStore = useProductStore((state) => state.addedProducts)

    return (
        <div className="flex flex-row flex-wrap gap-4">
        {/* <div className="grid grid-cols-4 gap-4"> */}
            {data?.products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default Products;
