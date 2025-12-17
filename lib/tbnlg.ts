/**
 * Template-Based Natural Language Generation (TBNLG)
 * 
 * Converts structured wedding preferences into coherent narratives
 * for semantic embedding and matching.
 */

import { BudgetTier, GuestCount, VenueVibe } from "./types";

// Budget tier templates
const BUDGET_TEMPLATES: Record<BudgetTier, string> = {
  micro: "an intimate, budget-conscious celebration under $5,000, prioritizing connection over spectacle",
  modest: "a meaningful celebration between $5,000 and $15,000, valuing substance over extravagance",
  moderate: "a beautiful, balanced celebration between $15,000 and $40,000, blending elegance with practicality",
  lavish: "a grand celebration where budget is secondary to vision, creating an unforgettable experience",
};

// Guest count templates
const GUEST_TEMPLATES: Record<GuestCount, string> = {
  elopement: "with just the two of us, prioritizing intimacy over audience",
  intimate: "with only our closest loved ones (under 20 people), keeping the circle small and meaningful",
  medium: "with friends and family (20-100 people), balancing intimacy with community celebration",
  large: "with everyone we love (100+ people), embracing a grand celebration of our community",
};

// Venue vibe templates
const VENUE_TEMPLATES: Record<VenueVibe, string> = {
  rustic: "is authentic and connected to nature - think barns, vineyards, or forest clearings. I value genuineness over glamour",
  modern: "is sleek and contemporary - rooftops, galleries, or minimalist spaces. I appreciate efficiency and clean aesthetics",
  classic: "is timeless and traditional - elegant ballrooms, historic estates, or classic churches. I honor heritage and established customs",
  adventure: "is unconventional and experience-driven - mountaintops, beaches, or surprise destinations. I prioritize adventure over convention",
};

// Family involvement templates
const FAMILY_TEMPLATES: Record<number, string> = {
  1: "I strongly value independence and making decisions as a couple, with minimal family input on major choices",
  2: "I prefer making decisions primarily as a couple, welcoming family opinions but maintaining boundaries",
  3: "I balance family involvement with personal autonomy, valuing input while maintaining final say",
  4: "I appreciate significant family involvement and consider their perspectives important in major decisions",
  5: "I deeply value family input and tradition, seeing our families as integral to major life decisions",
};

/**
 * Generate a narrative from structured preferences
 */
export function generateNarrative(preferences: {
  budget_tier: BudgetTier;
  guest_count: GuestCount;
  venue_vibe: VenueVibe;
  family_involvement: number;
}): string {
  const budgetText = BUDGET_TEMPLATES[preferences.budget_tier];
  const guestText = GUEST_TEMPLATES[preferences.guest_count];
  const venueText = VENUE_TEMPLATES[preferences.venue_vibe];
  const familyText = FAMILY_TEMPLATES[Math.min(5, Math.max(1, preferences.family_involvement))];
  
  return `I envision ${budgetText} ${guestText}. My ideal atmosphere ${venueText}. ${familyText}.`;
}

/**
 * Generate compatibility insight between two profiles
 */
export function generateCompatibilityInsight(
  userPrefs: {
    budget_tier: BudgetTier;
    guest_count: GuestCount;
    venue_vibe: VenueVibe;
    family_involvement: number;
  },
  matchPrefs: {
    budget_tier: BudgetTier;
    guest_count: GuestCount;
    venue_vibe: VenueVibe;
    family_involvement: number;
  }
): string {
  const insights: string[] = [];
  
  // Budget alignment
  if (userPrefs.budget_tier === matchPrefs.budget_tier) {
    insights.push("Strong financial alignment - you share similar views on wedding spending, a key predictor of long-term compatibility");
  } else {
    const budgetDiff = getBudgetDifference(userPrefs.budget_tier, matchPrefs.budget_tier);
    if (budgetDiff <= 1) {
      insights.push("Close financial perspectives - your budget expectations are within a comfortable range");
    }
  }
  
  // Guest count alignment
  if (userPrefs.guest_count === matchPrefs.guest_count) {
    insights.push("Matching social styles - you both envision similar celebration sizes, suggesting compatible approaches to community");
  }
  
  // Venue vibe alignment
  if (userPrefs.venue_vibe === matchPrefs.venue_vibe) {
    insights.push("Aesthetic harmony - your venue preferences reveal aligned personality traits and values");
  }
  
  // Family involvement alignment
  const familyDiff = Math.abs(userPrefs.family_involvement - matchPrefs.family_involvement);
  if (familyDiff <= 1) {
    insights.push("Compatible boundary styles - you share similar views on family involvement in major decisions");
  }
  
  if (insights.length === 0) {
    insights.push("Complementary differences - your varied preferences could bring balance and fresh perspectives to the relationship");
  }
  
  return insights.join(". ") + ".";
}

function getBudgetDifference(a: BudgetTier, b: BudgetTier): number {
  const order: BudgetTier[] = ["micro", "modest", "moderate", "lavish"];
  return Math.abs(order.indexOf(a) - order.indexOf(b));
}

/**
 * Get psychometric signals from preferences
 */
export function getPsychometricSignals(preferences: {
  budget_tier: BudgetTier;
  guest_count: GuestCount;
  venue_vibe: VenueVibe;
  family_involvement: number;
}): {
  financialWorldview: string;
  socialStyle: string;
  aestheticPersonality: string;
  boundaryStyle: string;
} {
  const financialSignals: Record<BudgetTier, string> = {
    micro: "Pragmatic & minimalist",
    modest: "Balanced & value-conscious",
    moderate: "Quality-focused & practical",
    lavish: "Experience-prioritizing & generous",
  };
  
  const socialSignals: Record<GuestCount, string> = {
    elopement: "Deeply private & couple-centric",
    intimate: "Selective & quality-focused connections",
    medium: "Community-oriented & balanced",
    large: "Extroverted & inclusive",
  };
  
  const aestheticSignals: Record<VenueVibe, string> = {
    rustic: "INFP - Authentic & nature-connected",
    modern: "INTJ - Efficient & status-aware",
    classic: "ISFJ - Traditional & security-seeking",
    adventure: "ESTP - Experience-driven & independent",
  };
  
  const boundarySignals: Record<number, string> = {
    1: "Highly autonomous",
    2: "Independence-leaning",
    3: "Balanced integration",
    4: "Family-connected",
    5: "Deeply family-integrated",
  };
  
  return {
    financialWorldview: financialSignals[preferences.budget_tier],
    socialStyle: socialSignals[preferences.guest_count],
    aestheticPersonality: aestheticSignals[preferences.venue_vibe],
    boundaryStyle: boundarySignals[Math.min(5, Math.max(1, preferences.family_involvement))],
  };
}

