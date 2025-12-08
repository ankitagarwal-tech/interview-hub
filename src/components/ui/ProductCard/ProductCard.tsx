// File: src/components/ProductCard.tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCartContext } from "@/context/cartContext"


interface Props {
  product: any
}

export default function ProductCard({ product }: Props) {
  const { id, title: productTitle, price: productPrice, image: productImage } = product
  const title = productTitle ?? product.name ?? 'Untitled product'
  const price = (productPrice ?? product.amount ?? 0) as number
  const image = productImage ?? product.thumbnail ?? null



  const { addItem, removeItem, updateItemQuantity, getQuantity } = useCartContext()
  const quantity = getQuantity(id)

  const handleIncrement = () => addItem({ id, title, price, image }, 1)
  const handleDecrement = () => {
    if (quantity > 1) updateItemQuantity(id, quantity - 1)
    else removeItem(id)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base truncate">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-40 w-full bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="max-h-full object-contain" />
          ) : (
            <div className="text-sm text-slate-400">No image</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-slate-700">{price !== null ? `$${price}` : ''}</div>
        {quantity > 0 ? (
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={handleDecrement}>-</Button>
            <span className="text-sm w-5 text-center">{quantity}</span>
            <Button size="sm" onClick={handleIncrement}>+</Button>
          </div>
        ) : (
          <Button size="sm" onClick={handleIncrement}>Add</Button>
        )}
      </CardFooter>
    </Card>
  )
}
