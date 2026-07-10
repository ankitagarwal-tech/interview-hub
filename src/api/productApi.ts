import { BASE_URL,PRODUCT_LIMIT } from "@/lib/constant";

export interface Product{
    id:number;
    title:string;
    price:number;
    image:string[]
    quanity:number;
}

export interface ProductResponse{
    products:Product[];
    total:number;
    skip:number;
    limit:number;
}
export async function fetchProducts(page:number):Promise<ProductResponse>{
const skip=(page-1)*PRODUCT_LIMIT;
const response=await fetch(`${BASE_URL}?limit=${PRODUCT_LIMIT}&skip=${skip}`);
if(!response.ok){
    throw new Error("Failed to fetch products");
}
const data:ProductResponse=await response.json();
return data;
}