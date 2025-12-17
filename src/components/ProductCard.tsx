import { useMemo } from "react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import type { ICartItem, IProduct } from "@/interface/interface";

export const ProductCard = ({
  product,
  cart,
  addToCart,
  removeFromCart,
}: {
  product: IProduct;
  cart: ICartItem[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (product: IProduct) => void;
}) => {
  const quantityInCart = useMemo(() => {
    const item = cart.find((item) => item.id === product.id);
    return item ? item.quantity : 0;
  }, [cart, product.id]);

  return (
    <Card className="w-full min-w-0 max-w-[320px] md:max-w-none">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <CardTitle className="inline-block truncate max-w-[100%]">
          {product.title}
        </CardTitle>
        <CardDescription className="h-20 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
        <div>{product.price}</div>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <ButtonGroup>
          <Button
            onClick={() => removeFromCart(product)}
            disabled={quantityInCart === 0}
            className="cursor-pointer"
          >
            -
          </Button>
          <div className="mx-2">{quantityInCart}</div>
          <Button onClick={() => addToCart(product)} className="cursor-pointer">
            +
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

// {
//     "id": 1,
//     "title": "Essence Mascara Lash Princess",
//     "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//     "category": "beauty",
//     "price": 9.99,
//     "discountPercentage": 10.48,
//     "rating": 2.56,
//     "stock": 99,
//     "tags": [
//         "beauty",
//         "mascara"
//     ],
//     "brand": "Essence",
//     "sku": "BEA-ESS-ESS-001",
//     "weight": 4,
//     "dimensions": {
//         "width": 15.14,
//         "height": 13.08,
//         "depth": 22.99
//     },
//     "warrantyInformation": "1 week warranty",
//     "shippingInformation": "Ships in 3-5 business days",
//     "availabilityStatus": "In Stock",
//     "reviews": [
//         {
//             "rating": 3,
//             "comment": "Would not recommend!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Eleanor Collins",
//             "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//         },
//         {
//             "rating": 4,
//             "comment": "Very satisfied!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Lucas Gordon",
//             "reviewerEmail": "lucas.gordon@x.dummyjson.com"
//         },
//         {
//             "rating": 5,
//             "comment": "Highly impressed!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Eleanor Collins",
//             "reviewerEmail": "eleanor.collins@x.dummyjson.com"
//         }
//     ],
//     "returnPolicy": "No return policy",
//     "minimumOrderQuantity": 48,
//     "meta": {
//         "createdAt": "2025-04-30T09:41:02.053Z",
//         "updatedAt": "2025-04-30T09:41:02.053Z",
//         "barcode": "5784719087687",
//         "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
//     },
//     "images": [
//         "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
//     ],
//     "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
// }
