export function BlogSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-10 bg-muted rounded w-3/4" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" style={{ width: `${100 - i * 10}%` }} />
        ))}
      </div>
      <div className="h-96 bg-muted rounded-lg" />
    </div>
  );
}