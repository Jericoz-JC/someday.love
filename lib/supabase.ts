/**
 * Supabase Client Configuration
 * 
 * This file provides the Supabase client setup.
 * Currently configured with placeholder values - replace with actual credentials in production.
 */

import { createClient } from "@supabase/supabase-js";

// Placeholder values - replace with actual environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (for admin operations)
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";
  return createClient(supabaseUrl, serviceRoleKey);
}

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder")
  );
}

// Type definitions for Supabase tables
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          clerk_id: string;
          name: string;
          age: number;
          gender: string;
          seeking: string;
          location: string;
          budget_tier: string;
          guest_count: string;
          venue_vibe: string;
          family_involvement: number;
          narrative: string | null;
          embedding: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      swipes: {
        Row: {
          id: string;
          user_id: string;
          target_id: string;
          liked: boolean;
          compatibility_score: number | null;
          match_explanation: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["swipes"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["swipes"]["Insert"]>;
      };
    };
    Functions: {
      find_matches: {
        Args: {
          user_id: string;
          user_gender: string;
          user_seeking: string;
          user_location: string;
          user_budget: string;
          user_embedding: number[];
          match_limit: number;
        };
        Returns: {
          id: string;
          name: string;
          age: number;
          venue_vibe: string;
          similarity: number;
        }[];
      };
    };
  };
}
