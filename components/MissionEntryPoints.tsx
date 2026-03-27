"use client";

import Link from "next/link";
import { Luggage, Plane, Armchair, Plug, Map, Sparkles } from "lucide-react";
import { useMissionAware } from "./MissionAwareHome";
import { holmesMissionLockCombo } from "@aurora-studio/starter-core";
import { shouldLockRecipeMissionForMissionPill } from "@/lib/holmes-mission-lock";

const DEFAULT_MISSIONS = [
  { label: "Pack for a trip", href: "/catalogue?q=luggage", icon: Luggage },
  { label: "Weekend away", href: "/catalogue?q=travel", icon: Plane },
  { label: "Comfort in transit", href: "/catalogue?q=travel+comfort", icon: Armchair },
  { label: "Adapters & power", href: "/catalogue?q=adapter", icon: Plug },
  { label: "Guides & maps", href: "/catalogue?q=guide", icon: Map },
] as const;

const ICON_MAP: Record<string, typeof Luggage> = {
  "Pack for a trip": Luggage,
  "Weekend away": Plane,
  "Comfort in transit": Armchair,
  "Adapters & power": Plug,
  "Guides & maps": Map,
  "Travel essentials": Sparkles,
  "Packing checklist": Map,
  "Recipe ideas": Sparkles,
  "Trip bundles": Sparkles,
  "Quick meals": Sparkles,
  "Cook dinner": Sparkles,
  "Quick snacks": Sparkles,
};

/** Mission-based entry points - Holmes-influenced when inference exists, else defaults. */
export function MissionEntryPoints() {
  const homeData = useMissionAware();
  const missions = homeData?.missions?.length
    ? homeData.missions.map((m) => ({
        label: m.label,
        href: m.href,
        icon: ICON_MAP[m.label] ?? Sparkles,
      }))
    : DEFAULT_MISSIONS;

  return (
    <section className="py-8">
      <h2 className="text-[0.62rem] font-semibold text-stone-500 dark:text-aurora-muted uppercase tracking-[0.18em] mb-4">
        Where to begin
      </h2>
      <div className="flex flex-wrap gap-3">
        {missions.map((m) => {
          const Icon = m.icon;
          const href = m.href;
          return (
            <Link
              key={m.label}
              href={href}
              onClick={() => {
                if (shouldLockRecipeMissionForMissionPill(m.label, href)) holmesMissionLockCombo();
              }}
              className="travel-destination-card flex w-full sm:w-auto max-w-full items-center gap-3 px-5 py-3.5 rounded-2xl bg-aurora-surface border border-aurora-border/80 shadow-sm font-medium text-aurora-text"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-aurora-primary/12 to-amber-500/10 text-aurora-primary ring-1 ring-aurora-primary/10">
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0 break-words">{m.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
