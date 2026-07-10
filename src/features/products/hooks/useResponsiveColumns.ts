import { useEffect, useState } from "react";

// Mirrors Tailwind's sm/lg/xl breakpoints so the virtualized grid always
// chunks products into the same number of columns CSS is actually rendering.
const BREAKPOINTS: [minWidth: number, columns: number][] = [
  [1280, 4],
  [1024, 3],
  [640, 2],
];

function getColumns(width: number) {
  for (const [minWidth, columns] of BREAKPOINTS) {
    if (width >= minWidth) return columns;
  }
  return 1;
}

export function useResponsiveColumns() {
  const [columns, setColumns] = useState(() =>
    typeof window === "undefined" ? 4 : getColumns(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setColumns(getColumns(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return columns;
}
