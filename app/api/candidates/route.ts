import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Candidates API Route
 * 
 * Returns potential matches using hybrid search.
 * Currently uses placeholder logic - replace with Supabase pgvector in production.
 */

// Mock candidates for development
const MOCK_CANDIDATES = [
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
];

// GET /api/candidates - Get potential matches
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");

    // Placeholder: In production, call Supabase hybrid search function
    // const { data, error } = await supabase.rpc("find_matches", {
    //   user_id: userId,
    //   user_gender: userProfile.gender,
    //   user_seeking: userProfile.seeking,
    //   user_location: userProfile.location,
    //   user_budget: userProfile.budget_tier,
    //   user_embedding: userProfile.embedding,
    //   match_limit: limit,
    // });

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Return mock candidates
    const candidates = MOCK_CANDIDATES.slice(0, limit);

    return NextResponse.json({
      candidates,
      total: candidates.length,
      hasMore: MOCK_CANDIDATES.length > limit,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

