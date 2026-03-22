/**
 * Mission → catalogue config for progressive narrowing.
 * When narrowCatalog is true, categories are reordered by priority.
 */

export const MISSION_CATEGORY_PRIORITY: Record<string, string[]> = {
  travel_prep: ["template-travel-luggage", "template-travel-accessories", "template-travel-guides"],
  recipe_mission: ["template-travel-accessories", "template-travel-luggage", "template-travel-guides"],
  urgent_replenishment: [],
  ready_to_pay: [],
  routine_shop: [],
  browsing: [],
  discovery: [],
};

export const MISSION_FOCUS_QUERY: Record<string, string> = {
  travel_prep: "travel essentials",
  recipe_mission: "travel comfort",
  urgent_replenishment: "essentials",
  ready_to_pay: "",
  routine_shop: "essentials",
  browsing: "",
  discovery: "new arrivals",
};
