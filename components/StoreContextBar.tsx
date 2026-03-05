"use client";

import Link from "next/link";
import { Store, MapPin } from "lucide-react";
import { useStore } from "./StoreContext";

export function StoreContextBar() {
  const { store } = useStore();

  if (store) {
    return (
      <div className="border-b border-aurora-border bg-aurora-bg px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-aurora-muted">
            <Store className="w-4 h-4 shrink-0" />
            <span>Shopping from: {store.name}</span>
            <Link
              href="/stores"
              className="text-aurora-primary hover:underline ml-1 font-medium"
            >
              View Store Details
            </Link>
          </div>
          <Link
            href="/stores"
            className="text-sm font-medium text-aurora-primary hover:underline"
          >
            Change Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-aurora-border bg-aurora-primary/10 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-aurora-text font-medium">
          Select a store to search products and see availability.
        </p>
        <Link
          href="/location"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-aurora-primary text-white font-semibold text-sm hover:bg-aurora-primary-dark transition-colors"
        >
          <MapPin className="w-4 h-4 shrink-0" />
          Set location & choose store
        </Link>
      </div>
    </div>
  );
}
