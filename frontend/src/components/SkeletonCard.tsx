export default function SkeletonCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4 flex items-center justify-between animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-4 w-32 bg-slate-700 rounded" />
        <div className="h-3 w-24 bg-slate-800 rounded" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-6 w-16 bg-slate-700 rounded-full" />
        <div className="h-3 w-12 bg-slate-800 rounded" />
        <div className="h-4 w-4 bg-slate-800 rounded" />
      </div>
    </div>
  );
}
