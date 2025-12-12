import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ProductCardProps } from "@/types/product";
import { BadgeCheck, ShoppingCart, Minus, Plus, Package, Layers, Hash } from "lucide-react";
import React, { memo } from "react";

const ProductCard: React.FC<ProductCardProps> = memo(
    ({ product, inCart, lowStock, handleADDToCart, handleRemoveFromCart }) => {
        return (
            <div
                className="relative flex flex-col bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-400 transition-all duration-200 group overflow-hidden"
                style={{ minHeight: 300 }}
            >
                <div className="relative flex justify-center items-center bg-gradient-to-br from-blue-50 to-white p-4">

                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="rounded-lg object-cover w-full h-30 border border-gray-100 cursor-pointer"
                        draggable={false}
                        loading="lazy"
                    />

                    {lowStock && (
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold shadow">
                            <BadgeCheck className="w-3 h-3" /> Low Stock
                        </div>
                    )}
                    {inCart > 0 && (
                        <div className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full shadow animate-pulse bg-blue-600">
                            <ShoppingCart className="w-3 h-3 inline-block mr-1" />
                            {inCart}
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col px-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-semibold text-lg truncate flex-1">{product.title}</h2>

                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 mb-1">
                        <Label className="text-xs flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded">
                            <Package className="w-3 h-3 text-blue-500" />
                            {product.brand}
                        </Label>
                        <Label className="text-xs flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded">
                            <Layers className="w-3 h-3 text-green-600" />
                            In Stock: {product.stock}
                        </Label>
                        <Label className="text-xs flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded">
                            <Hash className="w-3 h-3 text-yellow-600" />
                            Min. Qty: {product.minimumOrderQuantity}
                        </Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-lg text-[#394551]">${product.price}</span>
                        <div className="flex gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="icon"
                                        size="icon"
                                        disabled={inCart === 0}
                                        onClick={() => handleRemoveFromCart(product)}
                                        aria-label="Remove from cart"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Remove from cart</span>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="icon"
                                        size="icon"
                                        disabled={inCart >= product.stock}
                                        onClick={() => handleADDToCart(product)}
                                        aria-label="Add to cart"
                                        className="transition-transform hover:scale-110"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <span>Add to cart</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

export default ProductCard;