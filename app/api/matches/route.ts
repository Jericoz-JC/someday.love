import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * Matches API Route
 * 
 * Returns mutual matches for the authenticated user.
 * Currently uses placeholder logic - replace with Supabase in production.
 */

// Mock matches for development
const MOCK_MATCHES = [
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
    },
    compatibility_score: 92,
    match_explanation:
      "You both value intimate celebrations and prefer rustic, authentic venues. Your financial outlooks align well, suggesting strong compatibility on major life decisions.",
    matched_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "match-2",
    profile: {
      id: "cand-2",
      clerk_id: "clerk_cand_2",
      name: "Jordan",
      age: 31,
      gender: "woman",
      seeking: "man",
      location: "Austin, TX",
      budget_tier: "moderate",
      guest_count: "medium",
      venue_vibe: "modern",
      family_involvement: 4,
    },
    compatibility_score: 87,
    match_explanation:
      "You share a love for contemporary aesthetics and balanced celebrations. Your similar approach to family involvement suggests compatible boundary styles.",
    matched_at: new Date(Date.now() - 172800000).toISOString(),
  },
];

// GET /api/matches - Get all matches
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Placeholder: In production, query Supabase for mutual matches
    // const { data, error } = await supabase
    //   .from("swipes")
    //   .select(`
    //     id,
    //     compatibility_score,
    //     match_explanation,
    //     created_at,
    //     target:target_id (
    //       id,
    //       name,
    //       age,
    //       location,
    //       venue_vibe,
    //       budget_tier,
    //       guest_count
    //     )
    //   `)
    //   .eq("user_id", userId)
    //   .eq("liked", true)
    //   .in(
    //     "target_id",
    //     supabase
    //       .from("swipes")
    //       .select("user_id")
    //       .eq("target_id", userId)
    //       .eq("liked", true)
    //   );

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json({
      matches: MOCK_MATCHES,
      total: MOCK_MATCHES.length,
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

