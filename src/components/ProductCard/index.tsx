import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface ProductCardProps {
    id: number;
    title: string;
    imgUrl: string;
    price: number
    updateCart: ({id, quantity}: {id: number, quantity: number}) => void;
    quantity?: number;
}

export default function ProductCard({id, title, imgUrl, price, updateCart, quantity }: ProductCardProps){
  const localQuantity = quantity ?? 0;
  
  function handleAddToCart(){
    updateCart({id, quantity: 1});
  }
  
  function handleRemoveFromCart(){
    updateCart({id, quantity: -1});
  }
  return (
    <Card className="min-w-64 grow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={imgUrl} alt={title} />
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between items-center">
          <div className="text-lg font-bold">${price}</div>
          <div className="flex justify-between min-w-16 items-center">
            <button onClick={handleAddToCart}>+</button>
            <div>{localQuantity ?? 0}</div>
            <button onClick={handleRemoveFromCart}>-</button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}