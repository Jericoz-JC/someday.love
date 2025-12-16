"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepIndicator, StepDots } from "@/components/onboarding/step-indicator";
import { OptionCard, OptionGrid } from "@/components/onboarding/option-card";
import { VenueCard, VenueGrid } from "@/components/onboarding/venue-card";
import { FamilySlider } from "@/components/onboarding/family-slider";
import { useOnboarding } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";
import {
  GENDERS,
  LOCATIONS,
  BUDGET_TIERS,
  GUEST_COUNTS,
  VENUE_VIBES,
  Gender,
  BudgetTier,
  GuestCount,
  VenueVibe,
} from "@/lib/types";
import { generateNarrative } from "@/lib/tbnlg";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    canProceed,
    totalSteps,
  } = useOnboarding();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    if (!canProceed) return;
    
    setIsSubmitting(true);
    
    // Generate narrative from preferences
    const narrative = generateNarrative({
      budget_tier: data.budget_tier as BudgetTier,
      guest_count: data.guest_count as GuestCount,
      venue_vibe: data.venue_vibe as VenueVibe,
      family_involvement: data.family_involvement,
    });

    // Save profile with mock auth
    completeOnboarding({
      name: data.name,
      age: data.age,
      gender: data.gender as Gender,
      seeking: data.seeking as Gender,
      location: data.location,
      budget_tier: data.budget_tier as BudgetTier,
      guest_count: data.guest_count as GuestCount,
      venue_vibe: data.venue_vibe as VenueVibe,
      family_involvement: data.family_involvement,
      narrative,
    });

    // Navigate to discover
    router.push("/discover");
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-5xl">💜</span>
              <h1 className="text-2xl font-bold">Welcome to SomeDay</h1>
              <p className="text-muted-foreground">
                Let&apos;s find your forever person through wedding vision compatibility
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">What should we call you?</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={data.name}
                  onChange={(e) => updateData({ name: e.target.value })}
                  className="h-14 text-lg"
                  autoFocus
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">About You</h1>
              <p className="text-muted-foreground">
                Tell us a bit about yourself
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="age">How old are you?</Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={100}
                  placeholder="Age"
                  value={data.age || ""}
                  onChange={(e) => updateData({ age: parseInt(e.target.value) || 0 })}
                  className="h-14 text-lg"
                />
              </div>
              <div className="space-y-3">
                <Label>I am a...</Label>
                <OptionGrid columns={2}>
                  {GENDERS.map((gender) => (
                    <OptionCard
                      key={gender.value}
                      icon={gender.value === "woman" ? "👩" : gender.value === "man" ? "👨" : "🧑"}
                      label={gender.label}
                      selected={data.gender === gender.value}
                      onSelect={() => updateData({ gender: gender.value })}
                    />
                  ))}
                </OptionGrid>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold">Location & Preference</h1>
              <p className="text-muted-foreground">
                Where are you and who are you looking for?
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Your location</Label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {LOCATIONS.map((location) => (
                    <button
                      key={location}
                      onClick={() => updateData({ location })}
                      className={`rounded-xl border-2 p-3 text-sm text-left transition-all ${
                        data.location === location
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>I&apos;m interested in...</Label>
                <OptionGrid columns={2}>
                  {GENDERS.map((gender) => (
                    <OptionCard
                      key={gender.value}
                      icon={gender.value === "woman" ? "👩" : gender.value === "man" ? "👨" : "🧑"}
                      label={gender.label}
                      selected={data.seeking === gender.value}
                      onSelect={() => updateData({ seeking: gender.value })}
                    />
                  ))}
                </OptionGrid>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-4xl">💰</span>
              <h1 className="text-2xl font-bold">Wedding Budget</h1>
              <p className="text-muted-foreground">
                Financial alignment is the #1 predictor of relationship success
              </p>
            </div>
            <OptionGrid columns={2}>
              {BUDGET_TIERS.map((tier) => (
                <OptionCard
                  key={tier.value}
                  icon={tier.icon}
                  label={tier.label}
                  sublabel={tier.range}
                  description={tier.tagline}
                  selected={data.budget_tier === tier.value}
                  onSelect={() => updateData({ budget_tier: tier.value })}
                  size="large"
                />
              ))}
            </OptionGrid>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-4xl">👥</span>
              <h1 className="text-2xl font-bold">Guest Count</h1>
              <p className="text-muted-foreground">
                How many people would you want at your celebration?
              </p>
            </div>
            <OptionGrid columns={2}>
              {GUEST_COUNTS.map((count) => (
                <OptionCard
                  key={count.value}
                  icon={count.icon}
                  label={count.label}
                  sublabel={count.range}
                  description={count.description}
                  selected={data.guest_count === count.value}
                  onSelect={() => updateData({ guest_count: count.value })}
                  size="large"
                />
              ))}
            </OptionGrid>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-4xl">✨</span>
              <h1 className="text-2xl font-bold">Venue Vibe</h1>
              <p className="text-muted-foreground">
                Your aesthetic preferences reveal your personality type
              </p>
            </div>
            <VenueGrid>
              {VENUE_VIBES.map((vibe) => (
                <VenueCard
                  key={vibe.value}
                  icon={vibe.icon}
                  label={vibe.label}
                  examples={vibe.examples}
                  personality={vibe.personality}
                  selected={data.venue_vibe === vibe.value}
                  onSelect={() => updateData({ venue_vibe: vibe.value })}
                />
              ))}
            </VenueGrid>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <span className="text-4xl">👨‍👩‍👧‍👦</span>
              <h1 className="text-2xl font-bold">Family Involvement</h1>
              <p className="text-muted-foreground">
                How much should family be involved in major decisions?
              </p>
            </div>
            <FamilySlider
              value={data.family_involvement}
              onChange={(value) => updateData({ family_involvement: value })}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="mx-auto max-w-lg px-4 py-4">
          <StepIndicator currentStep={step} totalSteps={totalSteps} />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        <div className="mx-auto max-w-lg px-4 py-6">
          <AnimatePresence mode="wait" custom={step}>
            <motion.div
              key={step}
              custom={step}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-lg px-4 py-4 space-y-4">
          <div className="flex gap-3">
            {step > 1 && (
              <Button
                variant="outline"
                size="xl"
                onClick={prevStep}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              size="xl"
              onClick={step === totalSteps ? handleComplete : nextStep}
              disabled={!canProceed || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? "Creating profile..."
                : step === totalSteps
                ? "Find Matches ✨"
                : "Continue"}
            </Button>
          </div>
          <StepDots currentStep={step} totalSteps={totalSteps} />
        </div>
      </footer>
    </div>
  );
}
