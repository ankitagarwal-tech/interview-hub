import AllProducts from "@/components/AllProducts/AllProducts";
import Cart from "@/components/Cart/Cart";

function Home() {
  
  return (
    <div className="max-w-4xl mx-auto py-8">
      <Cart />
      <AllProducts />
    </div>
  );
}

export default Home;
