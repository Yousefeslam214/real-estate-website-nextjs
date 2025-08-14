import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="h-64 w-full" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Address */}
        <Skeleton className="h-4 w-1/2" />

        {/* Icons row */}
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Button */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default function PropertiesSkeleton({ length }: { length: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
