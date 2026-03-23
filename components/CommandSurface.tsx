"use client";

import Link from "next/link";
import {
  Search,
  RotateCcw,
  Sparkles,
  Luggage,
  Plug,
  Armchair,
  Map,
  Plane,
  Moon,
  Check,
} from "lucide-react";
import {
  SearchDropdown,
  mergeTemplateLogoMask,
  useStore,
  useAuth,
  useVerticalProfile,
  verticalMissionSubtitle,
} from "@aurora-studio/starter-core";
import { useDietaryExclusions } from "./DietaryExclusionsContext";
import { getRecipeSuggestion } from "@/lib/cart-intelligence";
import { useMissionAware } from "./MissionAwareHome";
import { RecipeMissionHero } from "./RecipeMissionHero";
import { getTimeOfDay } from "@aurora-studio/starter-core";
import { holmesMissionLockCombo } from "@aurora-studio/starter-core";
import { shouldLockRecipeMissionForMissionPill } from "@/lib/holmes-mission-lock";
import { shouldFullComboHomeTakeover } from "@/lib/intent-mission";
import {
  fullWidthHeroBandClass,
  splitHeroFallbackTitleClass,
  splitHeroImageClampClass,
  splitHeroLogoWellLinkClass,
  splitHeroRowGapClass,
  splitHeroSectionPaddingClass,
  type HeroSize,
} from "@/lib/commandSurfaceHeroStyles";
import type { StoreFeaturedProject } from "@/lib/store-featured-project";

const POPULAR_LINKS = [
  { label: "Packing cubes", href: "/catalogue?q=packing+cubes" },
  { label: "Plug adapters", href: "/catalogue?q=adapter" },
  { label: "City guides", href: "/catalogue?q=guide" },
  { label: "Power banks", href: "/catalogue?q=power+bank" },
] as const;

function FeaturedBundleCard({ project }: { project: StoreFeaturedProject }) {
  const href = `/for-you/package/${encodeURIComponent(project.slug)}`;
  return (
    <div className="store-featured-project overflow-hidden rounded-xl border border-zinc-200/90 bg-[var(--aurora-surface)] shadow-[0_2px_14px_rgba(15,23,42,0.07)]">
      <Link
        href={href}
        aria-label={`View bundle: ${project.title}`}
        className="group block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-aurora-primary/30 focus-visible:ring-offset-2"
      >
        <div className="store-featured-project__media relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200">
              <Luggage className="h-14 w-14 text-zinc-400" aria-hidden />
            </div>
          )}
        </div>
        <div className="store-featured-project__body p-4 sm:p-5">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-aurora-muted">
            Featured bundle
          </p>
          <h3 className="mt-1.5 font-display text-lg font-bold leading-snug tracking-tight text-aurora-text transition-colors group-hover:text-aurora-primary sm:text-xl line-clamp-2">
            {project.title}
          </h3>
          {project.description ? (
            <p className="mt-2 text-sm leading-snug text-aurora-muted line-clamp-2">{project.description}</p>
          ) : null}
          <span className="store-featured-project__cta mt-4 flex h-11 w-full items-center justify-center rounded-lg text-sm font-bold">
            View bundle
          </span>
        </div>
      </Link>
    </div>
  );
}

function HomeTrustList({ storeName }: { storeName: string | undefined }) {
  const loc = storeName?.trim() || "your store";
  const items = [
    `Gear ready to ship from ${loc}`,
    "Fast dispatch on in-stock lines — order early for travel dates",
    "Carry-on friendly picks where marked on qualifying products",
  ];
  return (
    <ul className="store-home-trust mt-6 space-y-2.5 border-t border-aurora-border/55 pt-6">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-sm leading-snug text-aurora-text">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

const ICON_MAP: Record<string, typeof Luggage> = {
  "Carry-on & luggage": Luggage,
  "Adapters & power": Plug,
  "Comfort on the go": Armchair,
  "Guides & maps": Map,
  "Early flight kit": Plane,
  "Weekend reads": Map,
  "Red-eye comfort": Moon,
  "Luggage & packing": Luggage,
  "Last-minute trip": Plane,
  "Travel essentials": Sparkles,
  "Face wipes": Sparkles,
  "Travel size": Sparkles,
  "Packing checklist": Map,
  "Explore more": Sparkles,
  "New arrivals": Sparkles,
  "Seasonal picks": Sparkles,
  "Healthy options": Sparkles,
  "Breakfast ideas": Sparkles,
  "Recipe ideas": Sparkles,
  "Trip bundles": Sparkles,
  "Dinner now": Sparkles,
  "Dinner in 20 mins": Sparkles,
  "Repeat last shop": RotateCcw,
};

type LocalQuickAction = {
  label: string;
  href: string;
  icon: typeof Luggage;
  authOnly?: boolean;
};

function getDefaultQuickActions(timeOfDay: string): LocalQuickAction[] {
  const afternoon: LocalQuickAction[] = [
    { label: "Carry-on & luggage", href: "/catalogue?q=luggage", icon: Luggage },
    { label: "Adapters & power", href: "/catalogue?q=adapter", icon: Plug },
    { label: "Comfort on the go", href: "/catalogue?q=travel+comfort", icon: Armchair },
    { label: "Guides & maps", href: "/catalogue?q=guide", icon: Map },
  ];
  if (timeOfDay === "morning") {
    return [
      { label: "Early flight kit", href: "/catalogue?q=travel+essentials", icon: Plane },
      { label: "Carry-on & luggage", href: "/catalogue?q=luggage", icon: Luggage },
      { label: "Adapters & power", href: "/catalogue?q=adapter", icon: Plug },
      { label: "Weekend reads", href: "/catalogue?q=guide", icon: Map },
    ];
  }
  if (timeOfDay === "evening") {
    return [
      { label: "Red-eye comfort", href: "/catalogue?q=travel+comfort", icon: Moon },
      { label: "Luggage & packing", href: "/catalogue?q=luggage", icon: Luggage },
      { label: "Last-minute trip", href: "/catalogue?q=travel", icon: Plane },
      { label: "Guides & maps", href: "/catalogue?q=guide", icon: Map },
    ];
  }
  return afternoon;
}

function HeroImageLink({
  href,
  heroImageUrl,
  splitClampClass,
  fullBleed,
  heroSize,
}: {
  href: string;
  heroImageUrl: string | null;
  splitClampClass: string;
  fullBleed: boolean;
  heroSize: HeroSize;
}) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Travel";
  if (fullBleed) {
    return (
      <Link
        href={href}
        className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-b from-aurora-surface to-aurora-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-aurora-primary/50"
        aria-label="Home"
      >
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt=""
            className={mergeTemplateLogoMask(
              heroImageUrl,
              "absolute inset-0 h-full w-full object-cover object-center"
            )}
          />
        ) : (
          <span className="font-display relative z-[1] text-2xl sm:text-4xl font-bold text-aurora-text px-4 text-center">
            {siteName}
          </span>
        )}
      </Link>
    );
  }
  return (
    <Link href={href} className={splitHeroLogoWellLinkClass(heroSize)} aria-label="Home">
      {heroImageUrl ? (
        <img
          src={heroImageUrl}
          alt=""
          className={mergeTemplateLogoMask(
            heroImageUrl,
            `w-auto max-w-full h-auto object-contain mx-auto drop-shadow-sm ${splitClampClass}`
          )}
        />
      ) : (
        <span className={splitHeroFallbackTitleClass(heroSize)}>{siteName}</span>
      )}
    </Link>
  );
}

export function CommandSurface({
  heroImageUrl = null,
  heroLayout = "split",
  heroSize = "default",
  featuredProject = null,
}: {
  heroImageUrl?: string | null;
  heroLayout?: "split" | "full_width";
  heroSize?: HeroSize;
  featuredProject?: StoreFeaturedProject | null;
}) {
  const { store } = useStore();
  const { user } = useAuth();
  const { excludeDietary } = useDietaryExclusions();
  const { dietaryFilteringEnabled, verticalProfile } = useVerticalProfile();
  const excludeForSearch = dietaryFilteringEnabled ? excludeDietary : [];
  const homeData = useMissionAware();
  const timeOfDay = getTimeOfDay();

  const rawActions = homeData?.quickActions?.length
    ? homeData.quickActions.map((a) => ({
        label: a.label,
        href: a.href,
        icon: ICON_MAP[a.label] ?? Sparkles,
        authOnly: a.href === "/account/orders",
      }))
    : getDefaultQuickActions(timeOfDay);

  const quickActions = rawActions.filter((a) => !a.authOnly || user);

  const isFullComboHero =
    !!homeData &&
    shouldFullComboHomeTakeover({
      mode: homeData.mode,
      recipeSlug: homeData.recipeSlug,
      recipeTitle: homeData.recipeTitle,
      band: homeData.activeMission?.band,
      missionKey: homeData.activeMission?.key,
    });

  const formContentInner = (
    <>
      {isFullComboHero && (
        <div className="mb-6">
          <RecipeMissionHero
            recipeTitle={homeData.recipeTitle!}
            recipeSlug={homeData.recipeSlug!}
            compact
          />
        </div>
      )}
      <h1
        className={`font-sans font-bold tracking-tight text-aurora-text mb-2 leading-tight ${
          isFullComboHero
            ? "text-2xl sm:text-3xl md:text-4xl"
            : "travel-home-hero-headline text-xl sm:text-2xl md:text-3xl lg:text-[2rem]"
        }`}
      >
        {isFullComboHero ? "Or something else?" : "Ready for an adventure?"}
      </h1>
      <p className="text-aurora-muted text-sm sm:text-base mb-5 font-medium leading-snug max-w-xl">
        {isFullComboHero
          ? "Let's get you there fast"
          : verticalMissionSubtitle(verticalProfile)}
      </p>

      <div className="relative z-20 mb-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-aurora-muted mb-2.5">
          Shop by trip
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-2xl">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const href = action.href;
            return (
              <Link
                key={action.label}
                href={href}
                onClick={() => {
                  if (shouldLockRecipeMissionForMissionPill(action.label, href)) holmesMissionLockCombo();
                }}
                className="travel-home-task-chip inline-flex min-h-[2.75rem] flex-col items-center justify-center gap-1 rounded-lg border border-aurora-border bg-aurora-surface px-2 py-2.5 text-center text-xs font-semibold text-aurora-text transition-colors hover:border-aurora-primary sm:min-h-[3rem] sm:text-[0.8125rem]"
              >
                <Icon className="h-4 w-4 shrink-0 text-aurora-primary" aria-hidden />
                <span className="leading-tight line-clamp-2">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {!isFullComboHero && (
        <div className="travel-home-popular mb-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-aurora-muted mb-2">
            Popular search
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {POPULAR_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-semibold text-aurora-primary hover:underline underline-offset-2"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10">
        <p className="text-xs font-semibold text-aurora-muted uppercase tracking-widest mb-2">
          Search the catalogue
        </p>
        {store ? (
          <div
            className="rounded-xl border border-aurora-border bg-aurora-surface shadow-sm focus-within:border-aurora-primary/60 focus-within:ring-1 focus-within:ring-aurora-primary/25 transition-all max-w-md overflow-visible relative z-30"
            data-command-search
          >
            <SearchDropdown
              placeholder="luggage, adapter, neck pillow…"
              vendorId={store.id}
              fullWidth
              variant="embedded"
              excludeDietary={excludeForSearch}
              getRecipeSuggestion={getRecipeSuggestion}
            />
          </div>
        ) : (
          <Link
            href="/location"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-aurora-border bg-aurora-surface/80 text-aurora-muted hover:text-aurora-text hover:border-aurora-primary/40 transition-all text-sm"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>Set location to search</span>
          </Link>
        )}
      </div>

      {!isFullComboHero && <HomeTrustList storeName={store?.name} />}
    </>
  );

  const splitClamp = splitHeroImageClampClass(heroSize);
  const displayUrl = heroImageUrl?.trim() || null;

  if (heroLayout === "full_width") {
    return (
      <section className="command-surface-hero bg-gradient-to-b from-aurora-surface to-aurora-bg">
        <div
          className={`relative w-full overflow-hidden bg-aurora-surface/80 border-b border-aurora-border ${fullWidthHeroBandClass(heroSize)}`}
        >
          <HeroImageLink
            href="/"
            heroImageUrl={displayUrl}
            splitClampClass={splitClamp}
            fullBleed
            heroSize={heroSize}
          />
        </div>
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
          <div className="max-w-2xl mx-auto lg:mx-0">{formContentInner}</div>
          {featuredProject ? (
            <div className="mt-10 max-w-md mx-auto lg:mx-0">
              <FeaturedBundleCard project={featuredProject} />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`command-surface-hero px-4 sm:px-6 bg-gradient-to-b from-aurora-surface to-aurora-bg ${splitHeroSectionPaddingClass(heroSize)}`}
    >
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(280px,360px)] xl:grid-cols-[1fr_minmax(300px,400px)] items-start ${splitHeroRowGapClass(heroSize)}`}
      >
        <div className="min-w-0 order-1 flex justify-center lg:justify-start w-full">
          <div className="w-full max-w-2xl lg:max-w-none">{formContentInner}</div>
        </div>

        <aside className="min-w-0 order-2 w-full max-w-md mx-auto lg:max-w-none lg:mx-0 lg:sticky lg:top-24 travel-home-hero-aside">
          {featuredProject ? (
            <FeaturedBundleCard project={featuredProject} />
          ) : (
            <HeroImageLink
              href="/"
              heroImageUrl={displayUrl}
              splitClampClass={splitClamp}
              fullBleed={false}
              heroSize={heroSize}
            />
          )}
        </aside>
      </div>
    </section>
  );
}
