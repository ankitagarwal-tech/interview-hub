import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] gap-6 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Welcome to the Store
      </h1>
      <p className="max-w-md text-lg text-muted-foreground">
        Discover amazing products at great prices. Browse our curated collection
        and place your order today.
      </p>
      <Link to="/products">
        <Button size="lg">
          Browse Products
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    </div>
  );
}

export default Home;
