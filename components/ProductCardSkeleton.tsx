export default function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted/50" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col grow space-y-3">
        {/* Category */}
        <div className="h-3 bg-muted/50 rounded w-1/4" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-muted/50 rounded w-3/4" />
          <div className="h-4 bg-muted/50 rounded w-1/2" />
        </div>

        {/* Rating */}
        <div className="h-4 bg-muted/50 rounded w-1/3" />

        {/* Spacer */}
        <div className="grow" />

        {/* Price */}
        <div className="h-6 bg-muted/50 rounded w-1/2" />
        
        {/* Stock */}
        <div className="h-4 bg-muted/50 rounded w-2/3" />
      </div>
    </div>
  );
}
