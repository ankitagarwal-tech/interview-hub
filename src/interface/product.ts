export interface ApiResponse<T> {
    limit: number;
    skip: number;
    total: number;
    data: T
}

export interface ProductStore {
    addedProducts: AddedProducts[]
    updateCart: (product: AddedProducts[]) => void
}

export interface AddedProducts {
    product: Product;
    qty: number;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: string; // or Date if you parse it
    reviewerName: string;
    reviewerEmail: string;
}

interface Meta {
    createdAt: string; // or Date
    updatedAt: string; // or Date
    barcode: string;
    qrCode: string;
}