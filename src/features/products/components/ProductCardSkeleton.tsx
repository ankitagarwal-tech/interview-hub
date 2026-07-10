import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-xl border py-0 pb-4">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="px-4">
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-2 px-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="px-4">
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
}
