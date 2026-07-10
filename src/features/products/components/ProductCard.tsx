import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Product } from "../types/product.types";
import { QuantityStepper } from "./QuantityStepper";

export function ProductCard({ product }: { product: Product }) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

   console.log("ProductCard rendered for product:", product.title, "with discounted price:", discountedPrice);

  return (
    <Card className="h-full gap-3 overflow-hidden py-0 pb-4">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge variant="secondary" className="absolute top-2 left-2 capitalize">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <div className="px-4">
        <QuantityStepper product={product} />
      </div>

      <CardContent className="flex flex-1 flex-col gap-1 px-4">
        <h3 className="line-clamp-1 text-sm font-semibold">{product.title}</h3>
        <p className="line-clamp-2 min-h-[2.5rem] text-xs text-muted-foreground">
          {product.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
          <span className="text-muted-foreground/70">
            &middot; {product.stock} in stock
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex items-baseline gap-2 px-4">
        <span className="text-lg font-bold">${discountedPrice.toFixed(2)}</span>
        {product.discountPercentage > 0 && (
          <span className="text-xs text-muted-foreground line-through">
            ${product.price.toFixed(2)}
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
