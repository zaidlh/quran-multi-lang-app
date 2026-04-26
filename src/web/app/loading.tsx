import { SurahCardSkeleton } from "./components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-12 space-y-3">
        <div className="h-6 w-40 mx-auto animate-pulse rounded-full bg-surface-elevated" />
        <div className="h-10 w-80 mx-auto animate-pulse rounded-lg bg-surface-elevated" />
        <div className="h-5 w-64 mx-auto animate-pulse rounded-lg bg-surface-elevated" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <SurahCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
