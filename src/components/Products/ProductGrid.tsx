import ProductItem from "@/components/Products/ProductItem.tsx";

type TProps = {
    data: any
}

export default function ProductGrid({data}: TProps) {

    return <div className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] md: lg: p-5 gap-5'>
        {
            data?.products?.map(e => {
                return <ProductItem key={e.id} data={e}/>
            })
        }
    </div>
}