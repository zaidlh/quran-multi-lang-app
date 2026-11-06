import { VerseSkeleton } from "../../components/Skeleton";

export default function SurahLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="text-center mb-8 space-y-2">
        <div className="h-10 w-48 mx-auto animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-32 mx-auto animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-40 mx-auto animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="space-y-6">
        {Array.from({ length: 7 }, (_, i) => (
          <VerseSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
