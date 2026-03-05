"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartLink() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 text-sm text-aurora-muted hover:text-aurora-text transition-colors font-medium"
    >
      <span>Cart</span>
      {count > 0 && (
        <span className="px-2 py-0.5 rounded-full bg-aurora-primary text-white text-xs font-semibold">
          {count}
        </span>
      )}
    </Link>
  );
}
