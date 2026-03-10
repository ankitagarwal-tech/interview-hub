import {useState} from "react";
import {useStore} from "@/stores/cart.store.ts";
import * as React from "react";

function ProductItem({data}: any) {

    const {addToCart} = useStore()

    const [quantity, setQuantity] = useState(1)

    const increment = () => {
        setQuantity(prev => prev + 1)
    }

    const decrement = () => {
        setQuantity(prev => {
            const ans = prev - 1

            if (ans < 1) return prev

            return ans
        })
    }

    const addCart = () => {

        addToCart({
            data,
            quantity
        })
    }

    return <div className='h-[400px] shadow rounded p-5 flex flex-col gap-5'>
        <div className="h-1/2 border-b border-gray-300">
            <img className="w-full h-full object-contain" src={data?.images[0]} width='100%' height='50px'/>
        </div>
        <div>
            <p className='text-md truncate'>{data?.title}</p>
        </div>
        <div className='flex gap-4 justify-center items-center'>
            <button onClick={increment}  className='bg-gray-300 rounded-full px-4 pb-1 cursor-pointer hover:bg-gray-400'>+</button>
            <p>{quantity}</p>
            <button onClick={decrement} className='bg-gray-300 rounded-full px-4 pb-1 cursor-pointer hover:bg-gray-400'>-</button>
        </div>

        <div>
            <button
                onClick={addCart}
                className='text-sm w-full text-center bg-rose-500 rounded text-white cursor-pointer py-2'>Add To Cart</button>
        </div>
    </div>
}

export default React.memo(ProductItem);