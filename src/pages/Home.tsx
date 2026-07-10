import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <ShoppingBag className="size-8" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to the Shop
        </h1>
        <p className="max-w-md text-muted-foreground">
          Browse our catalog, pick your quantities, and place an order in just a
          few clicks.
        </p>
      </div>
      <Button asChild size="lg">
        <Link to="/products">
          Browse products
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}

export default Home;
