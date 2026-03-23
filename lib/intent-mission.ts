/**
 * Cooking-related Holmes mission keys — recipe-style guidance.
 */
export const COOKING_MISSION_KEYS = new Set([
  "recipe_mission",
  "combo_mission",
  "cook_dinner",
  "cook_dinner_tonight",
]);

export type MissionBand = "low" | "medium" | "high";

export function isCookingMissionKey(key: string | undefined): boolean {
  if (!key) return true;
  return COOKING_MISSION_KEYS.has(key);
}

export const TRAVEL_MISSION_KEYS = new Set(["travel_prep"]);

export function isTravelLikeMission(key: string | undefined): boolean {
  if (!key) return false;
  return TRAVEL_MISSION_KEYS.has(key);
}

function isGroceryEraTrustSummary(summary: string): boolean {
  return (
    /because it'?s (dinner|breakfast|lunch) time/i.test(summary) ||
    /^Breakfast ideas for your morning/i.test(summary) ||
    /^Lunch ideas for your meal/i.test(summary) ||
    /^Cooking tonight\?/i.test(summary)
  );
}

export function alignedMissionTrustLine(
  key: string | undefined,
  label: string,
  apiSummary: string | undefined,
  hasCartItems: boolean
): string {
  const s = apiSummary?.trim() ?? "";

  if (s && isGroceryEraTrustSummary(s)) {
    if (isTravelLikeMission(key)) {
      return "Planning a trip? We've picked travel essentials.";
    }
    return hasCartItems
      ? "Trip-focused picks from your basket and recent views."
      : "Trip-focused picks from your search and browsing.";
  }

  if (isTravelLikeMission(key)) {
    if (!s || isGroceryEraTrustSummary(s)) {
      return "Planning a trip? We've picked travel essentials.";
    }
    return s;
  }

  if (key && isCookingMissionKey(key)) {
    if (s && /^Planning a trip/i.test(s)) {
      return hasCartItems
        ? "Based on items in your basket and recent activity."
        : "Based on your search and browsing.";
    }
    if (s) return s;
    return hasCartItems
      ? "Based on items in your basket and recent activity."
      : "Based on your search and browsing.";
  }

  if (s) return s;
  return hasCartItems
    ? "Based on items in your basket and recent activity."
    : "Based on your search and browsing.";
}

const TRAVEL_COMBO_HOME_KEYS = new Set(["combo_mission", "recipe_mission"]);

export function isTravelComboGuidedMissionKey(key: string | undefined): boolean {
  if (!key) return false;
  return TRAVEL_COMBO_HOME_KEYS.has(key);
}

export function shouldFullComboHomeTakeover(params: {
  mode: string | undefined;
  recipeSlug: string | undefined;
  recipeTitle: string | undefined;
  band: MissionBand | undefined;
  missionKey: string | undefined;
}): boolean {
  if (params.mode !== "recipe_mission" || !params.recipeSlug?.trim() || !params.recipeTitle?.trim()) {
    return false;
  }
  if (params.band !== "high") return false;
  return isTravelComboGuidedMissionKey(params.missionKey);
}

export function shouldMediumComboCompletionRail(params: {
  mode: string | undefined;
  recipeSlug: string | undefined;
  recipeTitle: string | undefined;
  band: MissionBand | undefined;
  missionKey: string | undefined;
}): boolean {
  if (params.mode !== "recipe_mission" || !params.recipeSlug?.trim() || !params.recipeTitle?.trim()) {
    return false;
  }
  if (params.band !== "medium") return false;
  return isTravelComboGuidedMissionKey(params.missionKey);
}
