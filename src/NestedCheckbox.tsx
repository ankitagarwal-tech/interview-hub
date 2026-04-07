import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";

interface CheckboxNode {
  id: string;
  label: string;
  children?: CheckboxNode[];
}

// Define your nested checkbox structure here
const CHECKBOX_DATA: CheckboxNode[] = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      {
        id: "citrus",
        label: "Citrus",
        children: [
          { id: "orange", label: "Orange" },
          { id: "lemon", label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "broccoli", label: "Broccoli" },
    ],
  },
];

function NestedCheckBox() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const getCheckState = (node: CheckboxNode): boolean | "indeterminate" => {
    // Your implementation here

    return false; // Placeholder
  };

  const handleToggle = (node: CheckboxNode) => {};

  const renderNode = (node: CheckboxNode, depth: number = 0) => {
    const checkState = getCheckState(node);

    return (
      <li key={node.id} style={{ marginLeft: depth * 24 }} className="py-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={checkState === true}
            data-state={
              checkState === "indeterminate" ? "indeterminate" : undefined
            }
            onCheckedChange={() => handleToggle(node)}
            className={
              checkState === "indeterminate"
                ? "data-[state=indeterminate]:bg-blue-300"
                : ""
            }
          />
          <span>{node.label}</span>
        </label>
        {node.children && (
          <ul>{node.children.map((child) => renderNode(child, depth + 1))}</ul>
        )}
      </li>
    );
  };

  const [products, setproducts] = useState<any>([]);

  const [cart, setcart] = useState<any>({});
  const addToCart = (id: string) => {
    setcart((prev: any) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const inscrease = (id: string) => {
    setcart((prev: any) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrease = (id: string) => {
    setcart((prev: any) => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10&skip=10")
      .then((res) => res.json())
      .then((data) => setproducts(data?.products))
      .catch((err) => console.log(err));
  }, []);

  console.log(products, "getting products");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Nested Checkbox</h2>
      <ul className="space-y-1">
        {CHECKBOX_DATA.map((node) => renderNode(node))}
      </ul>

      <div className="flex justify-between items-center p-4 shadow-md rounded-lg">
        <h1 className="text-xl font-bold">My store</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 p-4">
        {products?.map((product: any) => {
          const qty = cart[product.id] || 0;
          return (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              {qty === 0 ? (
                <button
                  onClick={() => addToCart(product.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrease(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{qty}</span>
                  <button
                    onClick={() => inscrease(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NestedCheckBox;
