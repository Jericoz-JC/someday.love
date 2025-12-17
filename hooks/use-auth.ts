"use client";

import { useState, useCallback, useMemo } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  mockSignOut,
  checkOnboardingStatus,
  completeOnboarding as markOnboardingComplete,
  getProfile,
  saveProfile,
  clearMockData,
  type MockUser,
} from "@/lib/mock-auth";
import { Profile } from "@/lib/types";

export function useAuth() {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const clerk = useClerk();
  const isLoading = !clerkLoaded;
  const [, forceRefresh] = useState(0);

  const isAuthenticated = Boolean(clerkUser);
  const user: MockUser | null = useMemo(() => {
    if (!clerkUser) return null;
    return {
      id: clerkUser.id,
      clerkId: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || "",
      name:
        clerkUser.fullName ||
        clerkUser.firstName ||
        clerkUser.primaryEmailAddress?.emailAddress ||
        "User",
    };
  }, [clerkUser]);
  const hasCompletedOnboarding = clerkUser ? checkOnboardingStatus(clerkUser.id) : false;

  const signIn = useCallback(() => {
    // This will be handled by Clerk's SignInButton component
    // But we can still sync the state after Clerk handles it
    if (clerkUser) {
      const newState = {
        isAuthenticated: true,
        user,
        hasCompletedOnboarding: checkOnboardingStatus(clerkUser.id),
      };
      return newState;
    }
    return { isAuthenticated: false, user: null, hasCompletedOnboarding: false };
  }, [clerkUser, user]);

  const signOut = useCallback(async () => {
    const clerkUserId = clerkUser?.id ?? null;
    try {
      await clerk.signOut();
    } catch (error) {
      console.error("Error signing out from Clerk:", error);
    }
    mockSignOut(clerkUserId);
    forceRefresh((v) => v + 1);
  }, [clerk, clerkUser]);

  const completeOnboarding = useCallback(
    (profile?: Partial<Profile>) => {
      const clerkUserId = clerkUser?.id;
      if (clerkUserId && profile) {
        saveProfile(clerkUserId, profile);
      }
      markOnboardingComplete(clerkUserId);
      forceRefresh((v) => v + 1);
    },
    [clerkUser]
  );

  const getUserProfile = useCallback((): Partial<Profile> | null => {
    if (!clerkUser?.id) return null;
    return getProfile(clerkUser.id);
  }, [clerkUser]);

  const resetAllData = useCallback(() => {
    clearMockData();
    forceRefresh((v) => v + 1);
  }, []);

  return {
    isAuthenticated,
    hasCompletedOnboarding,
    isLoading,
    user,
    signIn,
    signOut,
    completeOnboarding,
    getUserProfile,
    resetAllData,
  };
}

// Onboarding hook for managing onboarding state
export function useOnboarding() {
  const { user: clerkUser } = useUser();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<Profile>>({});
  const totalSteps = 7 as const;

  const updateData = useCallback((updates: Partial<Profile>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((newStep: number) => {
    setStep(newStep);
  }, []);

  const canProceed = (() => {
    if (step === 1) return Boolean(data.name && String(data.name).trim().length > 0);
    if (step === 2) return Boolean(data.age && data.age >= 18 && data.gender);
    if (step === 3) return Boolean(data.location && data.seeking);
    if (step === 4) return Boolean(data.budget_tier);
    if (step === 5) return Boolean(data.guest_count);
    if (step === 6) return Boolean(data.venue_vibe);
    if (step === 7) return data.family_involvement !== undefined && data.family_involvement !== null;
    return false;
  })();

  const saveOnboardingData = useCallback(() => {
    if (!clerkUser?.id) return;
    saveProfile(clerkUser.id, data);
  }, [clerkUser, data]);

  return {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    saveOnboardingData,
    canProceed,
    totalSteps,
  };
}
