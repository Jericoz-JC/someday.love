"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getAuthState,
  mockSignIn,
  mockSignOut,
  AuthState,
  getProfile,
  saveProfile,
  clearMockData,
} from "@/lib/mock-auth";
import { Profile, OnboardingData } from "@/lib/types";

/**
 * Custom hook for authentication
 * Uses mock auth in development, can be replaced with Clerk in production
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    hasCompletedOnboarding: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load auth state from localStorage
    const state = getAuthState();
    setAuthState(state);
    setIsLoading(false);
  }, []);

  const signIn = useCallback(() => {
    const newState = mockSignIn();
    setAuthState(newState);
    return newState;
  }, []);

  const signOut = useCallback(() => {
    const newState = mockSignOut();
    setAuthState(newState);
    return newState;
  }, []);

  const completeOnboarding = useCallback((profileData: Partial<Profile>) => {
    saveProfile(profileData);
    setAuthState(prev => ({ ...prev, hasCompletedOnboarding: true }));
  }, []);

  const getUserProfile = useCallback((): Partial<Profile> | null => {
    return getProfile();
  }, []);

  const resetAllData = useCallback(() => {
    clearMockData();
    setAuthState({
      isAuthenticated: false,
      user: null,
      hasCompletedOnboarding: false,
    });
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    hasCompletedOnboarding: authState.hasCompletedOnboarding,
    isLoading,
    signIn,
    signOut,
    completeOnboarding,
    getUserProfile,
    resetAllData,
  };
}

/**
 * Hook for managing onboarding state
 */
export function useOnboarding() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: "",
    age: 25,
    gender: "",
    seeking: "",
    location: "",
    budget_tier: "",
    guest_count: "",
    venue_vibe: "",
    family_involvement: 3,
  });

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setStep(prev => Math.min(7, prev + 1));
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => Math.max(1, prev - 1));
  }, []);

  const goToStep = useCallback((targetStep: number) => {
    setStep(Math.max(1, Math.min(7, targetStep)));
  }, []);

  const isStepValid = useCallback((stepNum: number): boolean => {
    switch (stepNum) {
      case 1:
        return data.name.trim().length >= 2;
      case 2:
        return data.age >= 18 && data.age <= 100 && data.gender !== "";
      case 3:
        return data.location !== "" && data.seeking !== "";
      case 4:
        return data.budget_tier !== "";
      case 5:
        return data.guest_count !== "";
      case 6:
        return data.venue_vibe !== "";
      case 7:
        return data.family_involvement >= 1 && data.family_involvement <= 5;
      default:
        return false;
    }
  }, [data]);

  const canProceed = isStepValid(step);

  return {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    goToStep,
    canProceed,
    isStepValid,
    totalSteps: 7,
  };
}
