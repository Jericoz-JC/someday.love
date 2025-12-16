import { NextRequest, NextResponse } from "next/server";

/**
 * Profile API Route
 * 
 * Handles profile creation and updates.
 * Currently uses placeholder logic - replace with Supabase in production.
 */

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    // TODO: Get clerk ID from auth headers
    const clerkId = request.headers.get("x-clerk-user-id") || "mock-user";

    // Placeholder: In production, query Supabase
    // const { data, error } = await supabase
    //   .from("profiles")
    //   .select("*")
    //   .eq("clerk_id", clerkId)
    //   .single();

    // Mock response for development
    const mockProfile = {
      id: "mock-profile-id",
      clerk_id: clerkId,
      name: "Demo User",
      age: 28,
      gender: "woman",
      seeking: "man",
      location: "Austin, TX",
      budget_tier: "modest",
      guest_count: "intimate",
      venue_vibe: "rustic",
      family_involvement: 3,
      narrative: "I envision a meaningful celebration...",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(mockProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create or update profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clerkId = request.headers.get("x-clerk-user-id") || "mock-user";

    // Validate required fields
    const requiredFields = [
      "name",
      "age",
      "gender",
      "seeking",
      "location",
      "budget_tier",
      "guest_count",
      "venue_vibe",
      "family_involvement",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Placeholder: In production, upsert to Supabase
    // const { data, error } = await supabase
    //   .from("profiles")
    //   .upsert({
    //     clerk_id: clerkId,
    //     ...body,
    //     updated_at: new Date().toISOString(),
    //   })
    //   .select()
    //   .single();

    // TODO: Generate embedding from narrative
    // const embedding = await generateEmbedding(body.narrative);

    const profile = {
      id: "mock-profile-id",
      clerk_id: clerkId,
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error("Error creating profile:", error);
    return NextResponse.json(
      { error: "Failed to create profile" },
      { status: 500 }
    );
  }
}
