
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    brand: string;
    minimumOrderQuantity: number;
}1

export type ProductCardProps = {
    product: Product;
    inCart: number;
    lowStock: boolean;
    handleADDToCart: (product: Product) => void;
    handleRemoveFromCart: (product: Product) => void;
};
