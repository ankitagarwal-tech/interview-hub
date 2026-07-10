import type { Product } from "@/features/products/types/product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
}
