

export default function ProductSkeleton() {
    return (
        <div className="border rounded-lg bg-white p-4 shadow-sm animate-pulse">
            <div className="h-40 w-full bg-gray-200 rounded-md" />
            <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
        </div>
    )
}