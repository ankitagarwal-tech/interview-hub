import {useEffect, useState} from "react";
import {fetchProducts,type Product} from "../api/productApi";

export default function useProduct(page:number){
    const [products,setProducts]=useState<Product[]>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const [error,setError]=useState<string | null>(null);
    const [total,setTotal]=useState<number>(0);

    useEffect(()=>{
        const fetchData=async()=>{
            setLoading(true);
            setError(null);
            try{
                const data=await fetchProducts(page);
                setProducts(data.products);
                setTotal(data.total);
            }catch(err:any){
                setError(err.message || "Something went wrong");
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[page]);

    return {products,loading,error,total};
}