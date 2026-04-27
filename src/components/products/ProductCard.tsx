import { Minus, Plus } from "lucide-react"

import { AppButton } from "@/components/shared/AppButton"
import { AppCard } from "@/components/shared/AppCard"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Product = {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
}

type ProductCardProps = {
  product: Product
  quantity: number
  onIncrement: (product: Product) => void
  onDecrement: (product: Product) => void
}

function ProductCard({
  product,
  quantity,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  return (
    <AppCard className="h-full gap-0">
      <div className="aspect-[4/3] w-full bg-muted/40">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-base">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-10 text-xs">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4 text-sm font-medium">
        ${product.price.toFixed(2)}
      </CardContent>

      <CardFooter className="mt-auto gap-2 border-t pt-4">
        <AppButton
          variant="outline"
          size="icon-sm"
          onClick={() => onDecrement(product)}
          disabled={quantity === 0}
          aria-label={`Decrease quantity of ${product.title}`}
        >
          <Minus className="size-4" />
        </AppButton>
        <div className="flex h-8 min-w-9 items-center justify-center rounded-md border border-border px-3 text-sm font-semibold">
          {quantity}
        </div>
        <AppButton
          size="icon-sm"
          onClick={() => onIncrement(product)}
          aria-label={`Increase quantity of ${product.title}`}
        >
          <Plus className="size-4" />
        </AppButton>
      </CardFooter>
    </AppCard>
  )
}

export type { Product }
export { ProductCard }
