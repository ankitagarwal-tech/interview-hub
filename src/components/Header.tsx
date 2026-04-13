import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "../context/CartContext";

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="text-lg font-bold tracking-tight">
          Store
        </Link>

        <nav className="flex items-center gap-4">
          <Link to="/products">
            <Button variant="ghost" size="sm">
              Products
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon-sm">
              <ShoppingCart className="size-4" />
            </Button>
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 size-5 justify-center p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
