import ProductGrid from "@/components/Products/ProductGrid.tsx";
import {useQuery} from "@tanstack/react-query";
import api from "@/lib/server.ts";
import {useState} from "react";
import {useStore} from "@/stores/cart.store.ts";
import PlaceOrderButton from "@/components/Products/PlaceOrderButton.tsx";
import CustomModal from "@/components/Products/CustomModal.tsx";

const fetcherFn = async (limit, skip) => {
    return await api.get('/products', {
        params: {
            limit,
            skip
        }
    })
}

const sizes = [5, 10, 20]

export default function ProductPage() {

    const {items, isModalOpen} = useStore()

    const [curPage, setCurPage] = useState(1)
    const [size, setSize] = useState(10)

    const {data, isLoading} = useQuery({ queryKey: ['todos', size, curPage], queryFn: () => fetcherFn(size, curPage) })

    const totalPages = Math.ceil(data?.data?.total / size)

    console.log(items)

    return <div className='p-5'>
        <div className='flex justify-end w-full'>
            <PlaceOrderButton />
        </div>
        <ProductGrid data={data?.data}/>

        {isModalOpen && <CustomModal/>}
    </div>
}