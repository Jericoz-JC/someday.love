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
const LEGACY_AUTH_STORAGE_KEY = "someday_mock_auth";
const LEGACY_PROFILE_STORAGE_KEY = "someday_mock_profile";
const AUTH_STORAGE_KEY_PREFIX = "someday_mock_auth:";
const PROFILE_STORAGE_KEY_PREFIX = "someday_mock_profile:";

function getAuthStorageKey(clerkUserId?: string | null): string {
  return clerkUserId ? `${AUTH_STORAGE_KEY_PREFIX}${clerkUserId}` : LEGACY_AUTH_STORAGE_KEY;
}

function getProfileStorageKey(clerkUserId?: string | null): string {
  return clerkUserId
    ? `${PROFILE_STORAGE_KEY_PREFIX}${clerkUserId}`
    : LEGACY_PROFILE_STORAGE_KEY;
}

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
export function getAuthState(clerkUserId?: string | null): AuthState {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, user: null, hasCompletedOnboarding: false };
  }
  
  const stored = localStorage.getItem(getAuthStorageKey(clerkUserId));
  if (stored) {
    return JSON.parse(stored);
  }
  return { isAuthenticated: false, user: null, hasCompletedOnboarding: false };
}

/**
 * Mock sign in - instantly authenticates the user
 */
export function mockSignIn(clerkUserId?: string | null): AuthState {
  const state: AuthState = {
    isAuthenticated: true,
    user: MOCK_USER,
    hasCompletedOnboarding: checkOnboardingStatus(clerkUserId),
  };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(getAuthStorageKey(clerkUserId), JSON.stringify(state));
  }
  
  return state;
}

/**
 * Mock sign out
 */
export function mockSignOut(clerkUserId?: string | null): AuthState {
  const state: AuthState = {
    isAuthenticated: false,
    user: null,
    hasCompletedOnboarding: false,
  };
  
  if (typeof window !== "undefined") {
    localStorage.setItem(getAuthStorageKey(clerkUserId), JSON.stringify(state));
  }
  
  return state;
}

/**
 * Check if user has completed onboarding
 */
export function checkOnboardingStatus(clerkUserId?: string | null): boolean {
  if (typeof window === "undefined") return false;
  const profile = localStorage.getItem(getProfileStorageKey(clerkUserId));
  return profile !== null;
}

/**
 * Mark onboarding as complete
 */
export function completeOnboarding(clerkUserId?: string | null): void {
  const state = getAuthState(clerkUserId);
  state.hasCompletedOnboarding = true;
  
  if (typeof window !== "undefined") {
    localStorage.setItem(getAuthStorageKey(clerkUserId), JSON.stringify(state));
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
export function saveProfile(clerkUserId: string, profile: Partial<Profile>): void {
  if (typeof window !== "undefined") {
    const storedProfile: Partial<Profile> = {
      ...profile,
      clerk_id: clerkUserId,
    };
    localStorage.setItem(getProfileStorageKey(clerkUserId), JSON.stringify(storedProfile));
    completeOnboarding(clerkUserId);
  }
}

/**
 * Get user profile from mock storage
 */
export function getProfile(clerkUserId: string): Partial<Profile> | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(getProfileStorageKey(clerkUserId));
  return stored ? JSON.parse(stored) : null;
}

/**
 * Clear all mock data (for testing)
 */
export function clearMockData(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY);
    localStorage.removeItem(LEGACY_PROFILE_STORAGE_KEY);
    localStorage.removeItem("someday_mock_swipes");
    localStorage.removeItem("someday_mock_matches");

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith(AUTH_STORAGE_KEY_PREFIX) || key.startsWith(PROFILE_STORAGE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    }
  }
}

