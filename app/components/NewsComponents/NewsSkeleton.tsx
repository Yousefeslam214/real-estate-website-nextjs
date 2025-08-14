import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonNewsCard() {
  return (
    <article className="bg-gray-50 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg">
      {/* Image placeholder */}
      <div className="relative h-48">
        <Skeleton className="h-full w-full" />
        {/* Category badge placeholder */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Content placeholder */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Summary */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />

        {/* Read more button */}
        <Skeleton className="h-5 w-24 rounded-lg" />
      </div>
    </article>
  );
}

export default function NewsSkeleton({ length }: { length: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length }).map((_, i) => (
        <SkeletonNewsCard key={i} />
      ))}
    </div>
  );
}
