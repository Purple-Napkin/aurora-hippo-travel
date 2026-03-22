"use client";

import Link from "next/link";
import { useCart } from "@aurora-studio/starter-core";
import { HolmesContextualWell } from "@/components/HolmesContextualWell";
import { RecipePicker } from "@/components/RecipePicker";
import { BasketBundlePlaceholder } from "@/components/BasketBundlePlaceholder";
import { CompleteYourMeal } from "@/components/CompleteYourMeal";
import { ForgotSuggestions } from "@/components/ForgotSuggestions";
import { Sparkles } from "lucide-react";

/** Client-only parts of For You page (cart-dependent). */
export function ForYouClientContent({
  belowTitle,
  sections,
}: {
  belowTitle?: React.ReactNode;
  sections: React.ReactNode;
}) {
  const { items } = useCart();
  const hasCartItems = items.length > 0;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-10 border-l-[3px] border-aurora-primary/30 pl-5 sm:pl-7 py-2">
        <p className="text-xs uppercase tracking-[0.2em] text-aurora-muted mb-2">Trip desk</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-aurora-text flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-aurora-primary shrink-0" aria-hidden />
          For you
        </h1>
        <p className="text-aurora-muted mt-3 max-w-2xl leading-relaxed text-sm sm:text-base">
          A short note with trip bundles, extras, and ideas that fit what you&apos;re already adding
          — not a separate &ldquo;combos&rdquo; aisle.
        </p>
        {belowTitle}
      </div>

      <div className="space-y-8">
        <HolmesContextualWell variant="for-you" />

        {hasCartItems && (
          <>
            <section id="combo-picker" className="scroll-mt-24">
              <RecipePicker />
            </section>
            <section id="basket-bundle" className="mb-6">
              <div data-holmes="basket-bundle" className="min-h-[1px]" />
              <BasketBundlePlaceholder />
            </section>
            <CompleteYourMeal />
            <ForgotSuggestions />
          </>
        )}

        {sections}
      </div>

      {hasCartItems && (
        <div className="mt-10 pt-6 border-t border-aurora-border">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-component bg-aurora-accent text-aurora-bg font-semibold hover:opacity-90 transition-opacity"
          >
            View basket ({items.length} {items.length === 1 ? "item" : "items"}) →
          </Link>
        </div>
      )}
    </div>
  );
}
