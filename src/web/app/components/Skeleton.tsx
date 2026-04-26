interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-zinc-200 dark:bg-zinc-800 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SurahCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

export function VerseSkeleton() {
  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 pb-6 space-y-3">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}
