/**
 * Mock Authentication Module
 * 
 * This module provides a bypass for Clerk authentication during development.
 * Replace with actual Clerk implementation in production.
 */

import { Profile } from "./types";

// Mock user for development
const MOCK_USER = {
  id: "mock-user-123",
  clerkId: "clerk_mock_123",
  email: "demo@someday.love",
  name: "Demo User",
};

// Storage key for mock auth state
const AUTH_STORAGE_KEY = "someday_mock_auth";
const PROFILE_STORAGE_KEY = "someday_mock_profile";

export interface MockUser {
  id: string;
  clerkId: string;
  email: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: MockUser | null;
  hasCompletedOnboarding: boolean;
}

/**
 * Get current auth state from localStorage
 */
export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null, hasCompletedOnboarding: false };
  }
  
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { isAuthenticated: false, user: null, hasCompletedOnboarding: false };
}

/**
 * Mock sign in - instantly authenticates the user
 */
export function mockSignIn(): AuthState {
  const state: AuthState = {
    isAuthenticated: true,
    user: MOCK_USER,
    hasCompletedOnboarding: checkOnboardingStatus(),
  };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }
  
  return state;
}

/**
 * Mock sign out
 */
export function mockSignOut(): AuthState {
  const state: AuthState = {
    isAuthenticated: false,
    user: null,
    hasCompletedOnboarding: false,
  };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }
  
  return state;
}

/**
 * Check if user has completed onboarding
 */
export function checkOnboardingStatus(): boolean {
  if (typeof window === "undefined") return false;
  const profile = localStorage.getItem(PROFILE_STORAGE_KEY);
  return profile !== null;
}

/**
 * Mark onboarding as complete
 */
export function completeOnboarding(): void {
  const state = getAuthState();
  state.hasCompletedOnboarding = true;
  
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
  }
}

/**
 * Get current user's clerk ID for database operations
 */
export function getCurrentClerkId(): string | null {
  const state = getAuthState();
  return state.user?.clerkId ?? null;
}

/**
 * Save user profile to mock storage
 */
export function saveProfile(profile: Partial<Profile>): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    completeOnboarding();
  }
}

/**
 * Get user profile from mock storage
 */
export function getProfile(): Partial<Profile> | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

/**
 * Clear all mock data (for testing)
 */
export function clearMockData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(PROFILE_STORAGE_KEY);
    localStorage.removeItem("someday_mock_swipes");
    localStorage.removeItem("someday_mock_matches");
  }
}
