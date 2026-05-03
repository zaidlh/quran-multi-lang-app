export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="space-y-4 mb-8">
        <div className="h-5 w-36 skeleton rounded-lg" />
        <div className="h-8 w-72 skeleton rounded-lg" />
        <div className="h-4 w-56 skeleton rounded-lg" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl">
            <div className="w-11 h-11 rounded-xl skeleton" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 skeleton rounded" />
              <div className="h-3 w-48 skeleton rounded" />
            </div>
            <div className="w-12 h-5 skeleton rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
