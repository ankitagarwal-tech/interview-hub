import { createContext,useContext,useState,type ReactNode } from "react";

import { type Product } from "../api/productApi";

interface CartContextType{
    cartItems:Product[];
    addToCart:(product:Product)=>void;
    removeFromCart:(productId:number)=>void;
    totalItems:number;
    getQuantity:(productId:number)=>number;
}

const CartContext=createContext<CartContextType | undefined>(undefined);

export const CartProvider=({children}:{children:ReactNode})=>{
    const [cartItems,setCartItems]=useState<Product[]>([]);

    const addToCart=(product:Product)=>{
        setCartItems((prevItems)=>{
            const existing =prevItems.find(item=>item.id===product.id);
            if(existing){
                return prevItems.map(item=>item.id===product.id?
                    {...item,quantity:item.quanity+1}:item);
            }
            return [...prevItems,{...product,quanity:1}];});
    };

    const removeFromCart=(productId:number)=>{
        setCartItems((prevItems)=> prevItems
        .map(item=>item.id===productId?{...item,
            quanity:item.quanity-1}:item).filter(item=>item.quanity>0))
       
            
    };

    const getQuantity=(productId:number)=>{
        const product=cartItems.find(item=>item.id===productId);
        return product?product.quanity:0;
    }

    const totalItems=cartItems.reduce((total,item)=>total+item.quanity,0);

 

    return(
        <CartContext.Provider value={{cartItems,addToCart,removeFromCart,
        totalItems,getQuantity}}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart=()=>{
    const context=useContext(CartContext);
    if(context===undefined){
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}