import { NextRequest, NextResponse } from "next/server";

/**
 * Swipe API Route
 * 
 * Records swipe actions and checks for matches.
 * Currently uses placeholder logic - replace with Supabase in production.
 */

// In-memory storage for development (replace with Supabase)
const swipes: Map<string, { targetId: string; liked: boolean }[]> = new Map();

// POST /api/swipe - Record a swipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { targetId, liked, compatibilityScore } = body;
    const userId = request.headers.get("x-user-id") || "mock-user";

    if (!targetId || typeof liked !== "boolean") {
      return NextResponse.json(
        { error: "Missing required fields: targetId, liked" },
        { status: 400 }
      );
    }

    // Placeholder: In production, insert into Supabase
    // const { data, error } = await supabase
    //   .from("swipes")
    //   .insert({
    //     user_id: userId,
    //     target_id: targetId,
    //     liked,
    //     compatibility_score: compatibilityScore,
    //   });

    // Store swipe in memory
    const userSwipes = swipes.get(userId) || [];
    userSwipes.push({ targetId, liked });
    swipes.set(userId, userSwipes);

    // Check for mutual match (simulate 30% match rate if liked)
    let isMatch = false;
    let matchExplanation = null;

    if (liked) {
      // Placeholder: In production, check if target liked user back
      // const { data: mutualSwipe } = await supabase
      //   .from("swipes")
      //   .select()
      //   .eq("user_id", targetId)
      //   .eq("target_id", userId)
      //   .eq("liked", true)
      //   .single();

      // Simulate match (30% chance)
      isMatch = Math.random() > 0.7;

      if (isMatch) {
        // Placeholder: In production, generate with LLM
        matchExplanation =
          "You both share similar wedding visions and financial outlooks!";
      }
    }

    return NextResponse.json({
      success: true,
      isMatch,
      matchExplanation,
      swipeId: `swipe-${Date.now()}`,
    });
  } catch (error) {
    console.error("Error recording swipe:", error);
    return NextResponse.json(
      { error: "Failed to record swipe" },
      { status: 500 }
    );
  }
}

// GET /api/swipe - Get swipe history
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id") || "mock-user";

    // Placeholder: In production, query Supabase
    // const { data, error } = await supabase
    //   .from("swipes")
    //   .select("*")
    //   .eq("user_id", userId)
    //   .order("created_at", { ascending: false });

    const userSwipes = swipes.get(userId) || [];

    return NextResponse.json({
      swipes: userSwipes,
      total: userSwipes.length,
    });
  } catch (error) {
    console.error("Error fetching swipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch swipes" },
      { status: 500 }
    );
  }
}
