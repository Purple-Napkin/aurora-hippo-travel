"use client";

import Link from "next/link";
import { useMissionAware } from "./MissionAwareHome";
import { ListChecks } from "lucide-react";

/**
 * Holmes-influenced shopping list templates. Shown when inference matches
 * (e.g. "Travel essentials" when travel prep detected from cart).
 */
export function ShoppingListTemplates() {
  const homeData = useMissionAware();
  const templates = homeData?.shoppingListTemplates;

  if (!templates?.length) return null;

  return (
    <section className="py-6">
      <h2 className="text-[0.62rem] font-semibold text-stone-500 dark:text-aurora-muted uppercase tracking-[0.18em] mb-4">
        Packing shortlists
      </h2>
      <div className="flex flex-wrap gap-3">
        {templates.map((t) => {
          const searchQuery = t.searchTerms?.length
            ? t.searchTerms.join(" ")
            : t.label.toLowerCase().replace(/\s+/g, "+");
          const href = `/catalogue?q=${encodeURIComponent(searchQuery)}`;
          return (
            <Link
              key={t.slug}
              href={href}
              className="travel-destination-card flex w-full sm:w-auto max-w-full items-center gap-3 px-5 py-3.5 rounded-2xl bg-aurora-surface border border-aurora-border/80 shadow-sm font-medium text-aurora-text"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-primary/12 to-amber-500/10 text-aurora-primary ring-1 ring-aurora-primary/10">
                <ListChecks className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <span className="block break-words">{t.label}</span>
                {t.description && (
                  <span className="block break-words text-xs text-aurora-muted font-normal mt-0.5">
                    {t.description}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
