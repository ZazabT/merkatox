export default function ProductCardSkeleton() {
  return (
    <div className="bg-white border rounded-lg overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col grow space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Rating */}
        <div className="h-4 bg-gray-200 rounded w-1/3" />

        {/* Spacer */}
        <div className="grow" />

        {/* Price */}
        <div className="h-6 bg-gray-200 rounded w-1/2" />
        
        {/* Stock */}
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}
