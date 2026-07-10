import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { Product } from "../types/product.types";
import { useResponsiveColumns } from "../hooks/useResponsiveColumns";
import { ProductCard } from "./ProductCard";

const GRID_COLS_CLASS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const ROW_HEIGHT = 420;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

export function ProductGrid({ products }: { products: Product[] }) {
  const columns = useResponsiveColumns();
  const rows = chunk(products, columns);
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 2,
  });

  return (
    <div ref={parentRef} className="h-[calc(100vh-22rem)] min-h-[420px] overflow-y-auto">
      <div
        className="relative w-full"
        style={{ height: rowVirtualizer.getTotalSize() }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            className={`absolute top-0 left-0 grid w-full gap-4 ${GRID_COLS_CLASS[columns]}`}
            style={{
              height: virtualRow.size,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {rows[virtualRow.index].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
