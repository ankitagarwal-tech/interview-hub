interface Payload {
    skip: number;
    limit?: number;
}


interface Response {
    limit: number;
    skip: number;
    total: number;
    products: Array<any>; 
}

export const getProducts = async (payload: Payload): Promise<Response> => {
    const { limit=10, skip } = payload;
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    const data = await response.json();
    return data;
}

