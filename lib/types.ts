import React from 'react';
import {
  SunriseIcon, LeafIcon, SparklesIcon, DiamondIcon,
  CoupleIcon, SmallGroupIcon, PartyIcon, LargeGroupIcon,
  RusticIcon, ModernIcon, ClassicIcon, AdventureIcon,
  WomanIcon, ManIcon, NonBinaryIcon, FamilyIcon
} from '@/components/ui/icons';

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
  { value: "micro", label: "Micro", range: "< $5,000", tagline: "Just us and the sunset", icon: "sunrise" },
  { value: "modest", label: "Modest", range: "$5k - $15k", tagline: "Meaningful over extravagant", icon: "leaf" },
  { value: "moderate", label: "Moderate", range: "$15k - $40k", tagline: "Beautiful but balanced", icon: "sparkles" },
  { value: "lavish", label: "Lavish", range: "$40k+", tagline: "Once in a lifetime celebration", icon: "diamond" },
];

// Guest count options
export const GUEST_COUNTS: { value: GuestCount; label: string; range: string; description: string; icon: string }[] = [
  { value: "elopement", label: "Elopement", range: "Just 2", description: "Just the two of us", icon: "couple" },
  { value: "intimate", label: "Intimate", range: "2-20", description: "Only our closest people", icon: "smallGroup" },
  { value: "medium", label: "Medium", range: "20-100", description: "Friends and family", icon: "party" },
  { value: "large", label: "Large", range: "100+", description: "Everyone we know", icon: "largeGroup" },
];

// Venue vibe options
export const VENUE_VIBES: { value: VenueVibe; label: string; examples: string; personality: string; icon: string; image: string }[] = [
  { value: "rustic", label: "Rustic / Boho", examples: "Barn, vineyard, forest", personality: "Authenticity & Nature", icon: "rustic", image: "/venues/rustic.jpg" },
  { value: "modern", label: "Modern / Minimal", examples: "Rooftop, gallery, loft", personality: "Efficiency & Status", icon: "modern", image: "/venues/modern.jpg" },
  { value: "classic", label: "Classic / Traditional", examples: "Ballroom, church, estate", personality: "Tradition & Security", icon: "classic", image: "/venues/classic.jpg" },
  { value: "adventure", label: "Adventure / Elopement", examples: "Mountain, beach, destination", personality: "Experience & Independence", icon: "adventure", image: "/venues/adventure.jpg" },
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

// Helper function to get icon component by name
export function getIconComponent(iconName: string) {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    "sunrise": SunriseIcon,
    "leaf": LeafIcon,
    "sparkles": SparklesIcon,
    "diamond": DiamondIcon,
    "couple": CoupleIcon,
    "smallGroup": SmallGroupIcon,
    "party": PartyIcon,
    "largeGroup": LargeGroupIcon,
    "rustic": RusticIcon,
    "modern": ModernIcon,
    "classic": ClassicIcon,
    "adventure": AdventureIcon,
    "woman": WomanIcon,
    "man": ManIcon,
    "non-binary": NonBinaryIcon,
    "family": FamilyIcon,
  };
  return iconMap[iconName] || SunriseIcon;
}

// ============================================
// CHAT SYSTEM TYPES (Mock - migrate to Supabase later)
// ============================================

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  type: 'text' | 'image' | 'emoji';
  created_at: string;
  read_at?: string;
}

export interface Conversation {
  id: string;
  match_id: string;
  participant_1: string;
  participant_2: string;
  last_message?: string;
  last_message_at?: string;
  unread_count: number;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: 'match' | 'message' | 'like' | 'system';
  title: string;
  body: string;
  read: boolean;
  data?: Record<string, unknown>;
  created_at: string;
}

// Filter preferences for discover
export interface DiscoverFilters {
  ageRange: [number, number];
  distance: number;
  budgetTiers: BudgetTier[];
  venueVibes: VenueVibe[];
  guestCounts: GuestCount[];
  recentlyActive: boolean;
}

export const DEFAULT_FILTERS: DiscoverFilters = {
  ageRange: [21, 45],
  distance: 50,
  budgetTiers: [],
  venueVibes: [],
  guestCounts: [],
  recentlyActive: false,
};

