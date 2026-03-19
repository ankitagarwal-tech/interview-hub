import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import type { Product } from "@/interface/product"
import { Button } from "./ui/button"
import useProductStore from "@/store/product";

interface ProductCardProps {
    product: Product
}

export function ProductCard(props: ProductCardProps) {
    const { product } = props;
    const updateCart = useProductStore((state) => state.updateCart)
    const productsInStore = useProductStore((state) => state.addedProducts)

    const onAddPoduct = (product: Product) => {
        const isProdAlreadyAddedIndex = productsInStore.findIndex(p => p.product.id === product.id)
        if (isProdAlreadyAddedIndex !== -1) {
            const updatedProd = {
                product,
                qty: productsInStore[isProdAlreadyAddedIndex].qty + 1
            }
            // updateCart({
            //     product,
            //     qty: isProdAlreadyAdded.qty + 1
            // })
        } else {
            updateCart({
                product,
                qty: 1
            })

        }
    }

    const onRemovePoduct = (product: Product) => {
    }

    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0 flex flex-col">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={product.images[0]}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                {/* <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                </CardAction> */}
                <CardTitle>{product.title}</CardTitle>
                <CardDescription>
                    {product.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-row justify-end gap-2 mt-auto">
                <Button className="min-w-2" onClick={() => onRemovePoduct(product)}>-</Button>
                <Button className="min-w-2" onClick={() => onAddPoduct(product)}>+</Button>
            </CardFooter>
        </Card>
    )
}
