import { SurahCardSkeleton } from "./components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="text-center mb-8 space-y-2">
        <div className="h-8 w-64 mx-auto animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-80 mx-auto animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 12 }, (_, i) => (
          <SurahCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
