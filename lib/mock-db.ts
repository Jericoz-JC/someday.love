/**
 * Mock Database Module
 * 
 * This module provides placeholder data and mock database operations.
 * Replace with actual Supabase implementation in production.
 */

import { Profile, Candidate, Match, Swipe, BudgetTier, GuestCount, VenueVibe, Gender } from "./types";

const SWIPES_STORAGE_KEY = "someday_mock_swipes";
const MATCHES_STORAGE_KEY = "someday_mock_matches";

// Generate mock candidates for the discover page
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Alex",
    age: 28,
    venue_vibe: "rustic",
    similarity: 0.92,
    budget_tier: "modest",
    guest_count: "intimate",
    location: "Austin, TX",
  },
  {
    id: "cand-2",
    name: "Jordan",
    age: 31,
    venue_vibe: "modern",
    similarity: 0.87,
    budget_tier: "moderate",
    guest_count: "medium",
    location: "Austin, TX",
  },
  {
    id: "cand-3",
    name: "Taylor",
    age: 26,
    venue_vibe: "adventure",
    similarity: 0.85,
    budget_tier: "micro",
    guest_count: "elopement",
    location: "Austin, TX",
  },
  {
    id: "cand-4",
    name: "Morgan",
    age: 29,
    venue_vibe: "classic",
    similarity: 0.83,
    budget_tier: "lavish",
    guest_count: "large",
    location: "Austin, TX",
  },
  {
    id: "cand-5",
    name: "Riley",
    age: 27,
    venue_vibe: "rustic",
    similarity: 0.81,
    budget_tier: "modest",
    guest_count: "medium",
    location: "Austin, TX",
  },
  {
    id: "cand-6",
    name: "Casey",
    age: 30,
    venue_vibe: "modern",
    similarity: 0.79,
    budget_tier: "moderate",
    guest_count: "intimate",
    location: "Austin, TX",
  },
  {
    id: "cand-7",
    name: "Quinn",
    age: 25,
    venue_vibe: "adventure",
    similarity: 0.77,
    budget_tier: "micro",
    guest_count: "elopement",
    location: "Austin, TX",
  },
  {
    id: "cand-8",
    name: "Avery",
    age: 32,
    venue_vibe: "classic",
    similarity: 0.75,
    budget_tier: "lavish",
    guest_count: "medium",
    location: "Austin, TX",
  },
];

// Mock matches
const MOCK_MATCHES: Match[] = [
  {
    id: "match-1",
    profile: {
      id: "cand-1",
      clerk_id: "clerk_cand_1",
      name: "Alex",
      age: 28,
      gender: "woman",
      seeking: "man",
      location: "Austin, TX",
      budget_tier: "modest",
      guest_count: "intimate",
      venue_vibe: "rustic",
      family_involvement: 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    compatibility_score: 92,
    match_explanation: "You both value intimate celebrations and prefer rustic, authentic venues. Your financial outlooks align well, suggesting strong compatibility on major life decisions.",
    matched_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
];

/**
 * Get candidates for the discover page
 * In production, this would call the Supabase hybrid search function
 */
export async function getCandidates(userId: string): Promise<Candidate[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get already swiped candidates
  const swipes = getSwipes();
  const swipedIds = new Set(swipes.map(s => s.target_id));
  
  // Filter out already swiped candidates
  return MOCK_CANDIDATES.filter(c => !swipedIds.has(c.id));
}

/**
 * Record a swipe
 */
export async function recordSwipe(
  userId: string,
  targetId: string,
  liked: boolean,
  compatibilityScore?: number
): Promise<{ isMatch: boolean }> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const swipe: Swipe = {
    id: `swipe-${Date.now()}`,
    user_id: userId,
    target_id: targetId,
    liked,
    compatibility_score: compatibilityScore,
    created_at: new Date().toISOString(),
  };
  
  // Save swipe to localStorage
  const swipes = getSwipes();
  swipes.push(swipe);
  if (typeof window !== "undefined") {
    localStorage.setItem(SWIPES_STORAGE_KEY, JSON.stringify(swipes));
  }
  
  // Simulate match (30% chance if liked)
  const isMatch = liked && Math.random() > 0.7;
  
  if (isMatch) {
    // Add to matches
    const candidate = MOCK_CANDIDATES.find(c => c.id === targetId);
    if (candidate) {
      const match: Match = {
        id: `match-${Date.now()}`,
        profile: {
          id: candidate.id,
          clerk_id: `clerk_${candidate.id}`,
          name: candidate.name,
          age: candidate.age,
          gender: "woman", // Mock
          seeking: "man", // Mock
          location: candidate.location,
          budget_tier: candidate.budget_tier,
          guest_count: candidate.guest_count,
          venue_vibe: candidate.venue_vibe,
          family_involvement: 3,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        compatibility_score: candidate.similarity * 100,
        match_explanation: generateMatchExplanation(candidate),
        matched_at: new Date().toISOString(),
      };
      
      const matches = getMatches();
      matches.push(match);
      if (typeof window !== "undefined") {
        localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches));
      }
    }
  }
  
  return { isMatch };
}

/**
 * Get all swipes
 */
export function getSwipes(): Swipe[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(SWIPES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

/**
 * Get all matches
 */
export function getMatches(): Match[] {
  if (typeof window === "undefined") return [...MOCK_MATCHES];
  const stored = localStorage.getItem(MATCHES_STORAGE_KEY);
  const savedMatches = stored ? JSON.parse(stored) : [];
  return [...MOCK_MATCHES, ...savedMatches];
}

/**
 * Generate a match explanation (mock LLM response)
 */
function generateMatchExplanation(candidate: Candidate): string {
  const explanations: Record<VenueVibe, string> = {
    rustic: `You both appreciate authenticity and natural beauty. ${candidate.name}'s preference for rustic venues suggests a grounded, nature-loving personality that aligns with your values.`,
    modern: `You share a love for contemporary aesthetics and efficiency. ${candidate.name}'s modern taste indicates someone who values innovation and clean design, matching your style.`,
    classic: `You both cherish tradition and timeless elegance. ${candidate.name}'s classic preferences suggest someone who values heritage and established customs, just like you.`,
    adventure: `You share a spirit of adventure and spontaneity. ${candidate.name}'s love for unique experiences indicates a free-spirited personality that matches your energy.`,
  };
  
  return explanations[candidate.venue_vibe];
}

/**
 * Create or update user profile
 * In production, this would upsert to Supabase
 */
export async function upsertProfile(profile: Partial<Profile>): Promise<Profile> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const fullProfile: Profile = {
    id: profile.id || `profile-${Date.now()}`,
    clerk_id: profile.clerk_id || "mock-clerk-id",
    name: profile.name || "User",
    age: profile.age || 25,
    gender: profile.gender || "woman",
    seeking: profile.seeking || "man",
    location: profile.location || "Austin, TX",
    budget_tier: profile.budget_tier || "modest",
    guest_count: profile.guest_count || "intimate",
    venue_vibe: profile.venue_vibe || "rustic",
    family_involvement: profile.family_involvement || 3,
    narrative: profile.narrative,
    created_at: profile.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  return fullProfile;
}

/**
 * Get user profile by clerk ID
 */
export async function getProfileByClerkId(clerkId: string): Promise<Profile | null> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, this would query Supabase
  if (typeof window === "undefined") return null;
  
  const stored = localStorage.getItem(`someday_mock_profile:${clerkId}`);
  return stored ? JSON.parse(stored) : null;
}

