// User profile types based on the database schema
export type BudgetTier = "micro" | "modest" | "moderate" | "lavish";
export type GuestCount = "elopement" | "intimate" | "medium" | "large";
export type VenueVibe = "rustic" | "modern" | "classic" | "adventure";
export type Gender = "man" | "woman" | "non-binary";

export interface Profile {
  id: string;
  clerk_id: string;
  name: string;
  age: number;
  gender: Gender;
  seeking: Gender;
  location: string;
  budget_tier: BudgetTier;
  guest_count: GuestCount;
  venue_vibe: VenueVibe;
  family_involvement: number; // 1-5 scale
  narrative?: string;
  embedding?: number[];
  created_at: string;
  updated_at: string;
}

export interface Swipe {
  id: string;
  user_id: string;
  target_id: string;
  liked: boolean;
  compatibility_score?: number;
  match_explanation?: string;
  created_at: string;
}

export interface Match {
  id: string;
  profile: Profile;
  compatibility_score: number;
  match_explanation?: string;
  matched_at: string;
}

export interface Candidate {
  id: string;
  name: string;
  age: number;
  venue_vibe: VenueVibe;
  similarity: number;
  budget_tier: BudgetTier;
  guest_count: GuestCount;
  location: string;
}

// Onboarding state
export interface OnboardingData {
  name: string;
  age: number;
  gender: Gender | "";
  seeking: Gender | "";
  location: string;
  budget_tier: BudgetTier | "";
  guest_count: GuestCount | "";
  venue_vibe: VenueVibe | "";
  family_involvement: number;
}

// Budget tier options
export const BUDGET_TIERS: { value: BudgetTier; label: string; range: string; tagline: string; icon: string }[] = [
  { value: "micro", label: "Micro", range: "< $5,000", tagline: "Just us and the sunset", icon: "🌅" },
  { value: "modest", label: "Modest", range: "$5k - $15k", tagline: "Meaningful over extravagant", icon: "🌿" },
  { value: "moderate", label: "Moderate", range: "$15k - $40k", tagline: "Beautiful but balanced", icon: "✨" },
  { value: "lavish", label: "Lavish", range: "$40k+", tagline: "Once in a lifetime celebration", icon: "💎" },
];

// Guest count options
export const GUEST_COUNTS: { value: GuestCount; label: string; range: string; description: string; icon: string }[] = [
  { value: "elopement", label: "Elopement", range: "Just 2", description: "Just the two of us", icon: "💑" },
  { value: "intimate", label: "Intimate", range: "2-20", description: "Only our closest people", icon: "👨‍👩‍👧" },
  { value: "medium", label: "Medium", range: "20-100", description: "Friends and family", icon: "🎉" },
  { value: "large", label: "Large", range: "100+", description: "Everyone we know", icon: "🏟️" },
];

// Venue vibe options
export const VENUE_VIBES: { value: VenueVibe; label: string; examples: string; personality: string; icon: string; image: string }[] = [
  { value: "rustic", label: "Rustic / Boho", examples: "Barn, vineyard, forest", personality: "Authenticity & Nature", icon: "🌾", image: "/venues/rustic.jpg" },
  { value: "modern", label: "Modern / Minimal", examples: "Rooftop, gallery, loft", personality: "Efficiency & Status", icon: "🏙️", image: "/venues/modern.jpg" },
  { value: "classic", label: "Classic / Traditional", examples: "Ballroom, church, estate", personality: "Tradition & Security", icon: "🏛️", image: "/venues/classic.jpg" },
  { value: "adventure", label: "Adventure / Elopement", examples: "Mountain, beach, destination", personality: "Experience & Independence", icon: "⛰️", image: "/venues/adventure.jpg" },
];

// Gender options
export const GENDERS: { value: Gender; label: string }[] = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non-binary", label: "Non-binary" },
];

// Location options (major cities)
export const LOCATIONS: string[] = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "Austin, TX",
  "San Francisco, CA",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
  "Atlanta, GA",
  "Miami, FL",
  "Portland, OR",
  "Nashville, TN",
];
