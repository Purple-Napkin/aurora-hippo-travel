import { Sparkles } from "lucide-react";

/** Immediate feedback on client navigation until the For You RSC payload streams. */
export default function ForYouLoading() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-10 border-l-[3px] border-aurora-primary/20 pl-5 sm:pl-7 py-2">
        <div className="h-3 w-28 rounded bg-aurora-surface-hover animate-pulse mb-2" />
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-7 h-7 text-aurora-primary shrink-0 opacity-35" aria-hidden />
          <div className="h-9 w-40 sm:w-52 rounded-lg bg-aurora-surface-hover animate-pulse" />
        </div>
        <div className="h-3.5 max-w-2xl rounded bg-aurora-surface-hover animate-pulse" />
        <div className="h-3.5 max-w-xl rounded bg-aurora-surface-hover animate-pulse mt-2" />
        <div className="h-3.5 max-w-lg rounded bg-aurora-surface-hover animate-pulse mt-2" />
      </div>
      <div className="space-y-8">
        <div className="h-20 rounded-2xl bg-aurora-surface-hover animate-pulse" />
        <div className="h-32 rounded-2xl bg-aurora-surface-hover animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] rounded-xl bg-aurora-surface-hover animate-pulse" />
          ))}
        </div>
      </div>
      <p className="sr-only">Loading For you</p>
    </div>
  );
}
