import { useState } from "react";
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
            data-state={checkState === "indeterminate" ? "indeterminate" : undefined}
            onCheckedChange={() => handleToggle(node)}
            className={checkState === "indeterminate" ? "data-[state=indeterminate]:bg-blue-300" : ""}
          />
          <span>{node.label}</span>
        </label>
        {node.children && (
          <ul>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Nested Checkbox</h2>
      <ul className="space-y-1">
        {CHECKBOX_DATA.map((node) => renderNode(node))}
      </ul>
    </div>
  );
}

export default NestedCheckBox;
