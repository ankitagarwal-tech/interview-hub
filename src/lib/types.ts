
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
  
  export interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface Review {
    rating: number;
    comment: string;
    date: string; // or Date if you parse it
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface Meta {
    createdAt: string; // or Date
    updatedAt: string; // or Date
    barcode: string;
    qrCode: string;
  }

  export type Cart = {
    [key: number]: number;
  }

  export interface CartItem {
    product: Product;
    quantity: number;
  }

  export type CartWithProduct = {
    [key: number]: CartItem;
  };
  