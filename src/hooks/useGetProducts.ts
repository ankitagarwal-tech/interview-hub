import {  useEffect, useState } from "react";

const useGetProducts = ({skip, limit}) => {
    // https://dummyjson.com/products?limit=10&skip=10
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal]= useState(0);
    //=====fetch products from dummyjson api =====//
    useEffect(()=>{
        setLoading(true);
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(res => res.json())
        .then (data=>{
            console.log(data.products);
            setProducts(data.products);
            setTotal(data.total);
        })
        .catch(err=>{
            setError(err);
        }).finally(()=>{
            setLoading(false);
        })
    },[limit, skip]);
    return {products, loading, error, total};
}
export default useGetProducts;