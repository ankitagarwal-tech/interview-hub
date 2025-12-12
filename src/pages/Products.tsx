import CustomDialog from "@/components/customDialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    stock: number;
    brand: string;
    minimumOrderQuantity: number;
}
const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [pageDetails, setPageDetails] = useState<{ total: number; skip: number; limit: number }>({ total: 0, skip: 0, limit: 0 });
    const [cartItems, setCartItems] = useState<{ [key: number]: Product & { quantity: number } }>({});
    const [date, setDate] = useState(new Date());
    const [orders, setOrders] = useState<{ [key: string]: { [key: number]: Product & { quantity: number } } }[]>([]);
    const [userDetails, setUserDetails] = useState<{ firstName: string, lastName: string, email: string, birthDate: Date }>({ firstName: '', lastName: '', email: '', birthDate: new Date() });
    useEffect(() => {
        fetchProducts(10, 10);
    }, []);

    const fetchProducts = async (limit: number, skip: number) => {
        const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        const data = await response.json();
        setProducts(data.products);
        setPageDetails({ total: data.total, skip: data.skip, limit: data.limit });
    }



    const handleADDToCart = (product: Product) => {
        // Logic to add item to cart
        if (!cartItems[product.id]) {
            setCartItems({
                ...cartItems,
                [product.id]: { ...product, quantity: 1 }
            });
        } else {
            setCartItems({
                ...cartItems,
                [product.id]: { ...cartItems[product.id], quantity: cartItems[product.id].quantity + 1 }
            });
        }
    }
    const handleRemoveFromCart = (product: Product) => {
        if (cartItems[product.id] && cartItems[product.id].quantity === 1) {
            const newCartItems = { ...cartItems };
            delete newCartItems[product.id];
            setCartItems(newCartItems);
        } else if (cartItems[product.id]) {
            setCartItems({
                ...cartItems,
                [product.id]: { ...cartItems[product.id], quantity: cartItems[product.id].quantity - 1 }
            });
        }
    };



    return <>
        <div className="flex justify-between p-4">
            <CustomDialog
                title="Order Details"
                disabled={!Object.keys(cartItems).length}
                handleSubmit={() => {
                    if (!userDetails.firstName || !userDetails.lastName || !userDetails.email) {
                        toast.error("Please fill all customer information fields");
                        return;
                    } else {
                        console.log(userDetails, "userDetails");
                        toast(`Order Placed Successfully ${userDetails.firstName} ${userDetails.lastName}`, {
                            description: "Sunday, December 03, 2023 at 9:00 AM",
                            action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                            },
                        })
                        setCartItems({});

                    }
                }}

            >

                <div>
                    <div className="bg-[#394551] text-white p-2 rounded mb-4">
                        <Label className="my-2">Order Summary</Label>
                    </div>
                    {
                        Object.values(cartItems).map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))
                    }
                    <div className="border-t border-gray-300 mt-4 pt-2 flex justify-between font-bold bg-[#394551] text-white p-2 rounded">
                        <span>Total:</span>
                        <span>${Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0)}</span>
                    </div>
                </div>
                <div className=" p-2 rounded mt-4">
                    <Label className="my-2">Customer Information</Label>
                    <div className="grid gap-3 mt-2">
                        <Label htmlFor="first-name-1">First Name</Label>
                        <Input id="first-name-1" name="firstName" defaultValue="" onChange={(e) => {
                            setUserDetails((prev) => ({ ...prev, firstName: e.target.value }))
                        }} />
                    </div>
                    <div className="grid gap-3 mt-2">
                        <Label htmlFor="last-name-1">Last Name</Label>
                        <Input id="last-name-1" name="lastName" defaultValue="" onChange={(e) => {
                            setUserDetails((prev) => ({ ...prev, lastName: e.target.value }))
                        }} />
                    </div>
                    <div className="grid gap-3 mt-2">
                        <Label htmlFor="email-1">Email ID</Label>
                        <Input id="email-1" name="email" defaultValue="" onChange={(e) => {
                            setUserDetails((prev) => ({ ...prev, email: e.target.value }))
                        }} />
                    </div>
                    <div className="grid gap-3 mt-2">

                        <Label htmlFor="birthDate">Birth Date</Label>
                        <div className={cn(
                            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

                        )} >
                            <Popover>
                                <PopoverTrigger><Label htmlFor="birth-date-1">Birth Date {date.toDateString()}</Label></PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        mode="single"
                                        selected={userDetails.birthDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setUserDetails((prev) => ({ ...prev, birthDate: date }));
                                            }
                                        }}
                                        className="rounded-lg border"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>


                    </div>
                </div>

            </CustomDialog>
            <div>{Object.keys(cartItems).length > 0 ? `${Object.keys(cartItems).length} Product added` : ''}

                {Object.values(cartItems).reduce((total, item) => total + item.quantity, 0) > 0 ? ` | Total Items: ${Object.values(cartItems).reduce((total, item) => total + item.quantity, 0)}` : ''}

                {Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0) > 0 ? ` | Total Price: $${Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0)}` : ''}
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
            {
                products.map((product) => (
                    <div key={product.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }} className="shadow-lg p-4 rounded-lg flex flex-col justify-between  ">
                        <div className="flex justify-between items-center mb-4">
                            <img src={product.thumbnail} alt={product.title} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                            <span style={{ fontWeight: "bold", fontSize: "18px" }}>${product.price}</span>
                        </div>
                        <h2>{product.title}</h2>
                        <Label className="mb-2">In Stock: {product.stock}</Label>
                        <Label>Brand: {product.brand}</Label>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <p>Min. Order Quantity: {product.minimumOrderQuantity}</p>

                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                style={{
                                    backgroundColor: "#394551",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                disabled={cartItems[product.id] && cartItems[product.id].quantity >= product.stock}
                                onClick={() => handleADDToCart(product)}

                            >
                                +
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#394551",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}
                                disabled={!cartItems[product.id]}
                                onClick={() => handleRemoveFromCart(product)}

                            >
                                -
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>



    </>
}
export default Products



//     {
//     "id": 11,
//     "title": "Annibale Colombo Bed",
//     "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
//     "category": "furniture",
//     "price": 1899.99,
//     "discountPercentage": 8.57,
//     "rating": 4.77,
//     "stock": 88,
//     "tags": [
//         "furniture",
//         "beds"
//     ],
//     "brand": "Annibale Colombo",
//     "sku": "FUR-ANN-ANN-011",
//     "weight": 10,
//     "dimensions": {
//         "width": 28.16,
//         "height": 25.36,
//         "depth": 17.28
//     },
//     "warrantyInformation": "1 year warranty",
//     "shippingInformation": "Ships in 1 month",
//     "availabilityStatus": "In Stock",
//     "reviews": [
//         {
//             "rating": 2,
//             "comment": "Would not recommend!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Christopher West",
//             "reviewerEmail": "christopher.west@x.dummyjson.com"
//         },
//         {
//             "rating": 4,
//             "comment": "Highly impressed!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Vivian Carter",
//             "reviewerEmail": "vivian.carter@x.dummyjson.com"
//         },
//         {
//             "rating": 1,
//             "comment": "Poor quality!",
//             "date": "2025-04-30T09:41:02.053Z",
//             "reviewerName": "Mason Wright",
//             "reviewerEmail": "mason.wright@x.dummyjson.com"
//         }
//     ],
//     "returnPolicy": "No return policy",
//     "minimumOrderQuantity": 1,
//     "meta": {
//         "createdAt": "2025-04-30T09:41:02.053Z",
//         "updatedAt": "2025-04-30T09:41:02.053Z",
//         "barcode": "3610757456581",
//         "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
//     },
//     "images": [
//         "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp",
//         "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/2.webp",
//         "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/3.webp"
//     ],
//     "thumbnail": "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp"
// }