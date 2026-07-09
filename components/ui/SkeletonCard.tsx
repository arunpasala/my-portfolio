type SkeletonCardProps = {
  className?: string;
};

export default function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl ${className}`}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-8 w-3/4 rounded-xl bg-white/10" />
        <div className="h-4 w-full rounded-xl bg-white/10" />
        <div className="h-4 w-5/6 rounded-xl bg-white/10" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-28 rounded-2xl bg-white/10" />
          <div className="h-10 w-24 rounded-2xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}